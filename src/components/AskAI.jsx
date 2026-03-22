import { useContext, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ContactsContext } from '../context/ContactsContext';
import { calculateDrift } from '../utils/drift';
import { Send, Loader2, Sparkles } from 'lucide-react';

export default function AskAI() {
  const { contacts } = useContext(ContactsContext);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `Hey! I know all about your ${contacts.length} contacts. Ask me anything — like "Who should I invite to a hiking trip?" or "Find people who work in tech" or "Plan a dinner party for 6 people with shared interests."`
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY;
      if (!API_KEY) throw new Error('No API key');

      const contactsSummary = contacts.map(c => ({
        name: c.name,
        relationship_type: c.relationship_type,
        interests: c.interests,
        work: c.work,
        tags: c.tags,
        importance: c.importance,
        how_we_met: c.how_we_met,
        life_updates: c.life_updates,
        open_threads: c.open_threads,
        days_since_contact: calculateDrift(c.last_interaction?.approximate_date),
      }));

      const systemPrompt = `You are Rolo's AI assistant. You have access to the user's contact network. Help them with social planning, finding connections between people, suggesting guest lists, and understanding their network.

Here are all their contacts:
${JSON.stringify(contactsSummary, null, 2)}

Guidelines:
- Be conversational and warm, like a friend who knows everyone
- When suggesting people, explain WHY they'd be a good fit
- Reference specific interests, tags, and connections
- For party/event planning, consider shared interests and relationship dynamics
- Format lists clearly with bullet points
- Keep responses concise but helpful`;

      const conversationHistory = messages.concat({ role: 'user', content: userMessage });
      const apiMessages = conversationHistory.map(m => ({ role: m.role, content: m.content }));

      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 15000);

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-6-20250219',
          max_tokens: 1024,
          system: systemPrompt,
          messages: apiMessages,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeout);

      if (!response.ok) throw new Error(`API error: ${response.status}`);
      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.content[0].text }]);
    } catch (err) {
      console.error('Chat error:', err);
      const fallbackMsg = err.name === 'AbortError'
        ? 'Request timed out. Try a simpler question or check your connection.'
        : 'I couldn\'t process that right now. Make sure your API key is set in .env as VITE_ANTHROPIC_API_KEY.';
      setMessages(prev => [...prev, { role: 'assistant', content: fallbackMsg }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-warm-900 mb-2">Ask Rolo</h1>
          <p className="text-warm-500">Plan events, find connections, explore your network</p>
        </motion.div>

        {/* Chat */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl border border-warm-200/60 shadow-sm flex flex-col overflow-hidden"
          style={{ height: 'calc(100vh - 260px)', minHeight: '400px' }}
        >
          {/* Chat header */}
          <div className="flex items-center gap-3 px-5 py-3 border-b border-warm-100">
            <div className="w-8 h-8 rounded-lg gradient-brand flex items-center justify-center">
              <Sparkles size={14} className="text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-warm-800 text-sm">Rolo AI</h3>
              <p className="text-xs text-warm-400">{contacts.length} contacts loaded</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                  msg.role === 'user'
                    ? 'gradient-brand text-white rounded-br-md'
                    : 'bg-warm-50 text-warm-700 rounded-bl-md'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-warm-50 rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-2">
                  <Loader2 size={14} className="text-brand animate-spin" />
                  <span className="text-sm text-warm-400">Thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="px-4 py-3 border-t border-warm-100">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
                placeholder="Ask about your network..."
                className="flex-1 px-4 py-2.5 rounded-xl bg-warm-50 border border-warm-200/60 text-sm text-warm-700 placeholder:text-warm-400 focus:outline-none focus:border-brand/30 focus:ring-2 focus:ring-brand/10 transition-all"
                disabled={isLoading}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                aria-label="Send message"
                className="w-10 h-10 rounded-xl gradient-brand text-white flex items-center justify-center shadow-sm shadow-brand/20 hover:shadow-md transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:-translate-y-0.5 disabled:hover:translate-y-0"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
