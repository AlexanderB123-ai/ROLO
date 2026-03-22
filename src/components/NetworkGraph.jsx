import { useContext, useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ContactsContext } from '../context/ContactsContext';
import { formatRolodexName, getRolodexInitials } from '../utils/nameFormatter';
import { getRelationshipColor, calculateDrift } from '../utils/drift';
import { Send, Loader2, X, MessageCircle, Sparkles, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';

// ─── Helper: find shared attributes between two contacts ───
function getSharedAttributes(a, b) {
  const shared = [];

  const aInterests = (a.interests || []).map(i => i.toLowerCase());
  const bInterests = (b.interests || []).map(i => i.toLowerCase());
  aInterests.filter(i => bInterests.includes(i)).forEach(i => shared.push({ type: 'interest', value: i }));

  const aTags = (a.tags || []).map(t => t.toLowerCase());
  const bTags = (b.tags || []).map(t => t.toLowerCase());
  aTags.filter(t => bTags.includes(t)).forEach(t => shared.push({ type: 'tag', value: t }));

  if (a.relationship_type && b.relationship_type &&
      a.relationship_type.toLowerCase() === b.relationship_type.toLowerCase()) {
    shared.push({ type: 'relationship', value: a.relationship_type });
  }

  if (a.work && b.work) {
    const aCompany = a.work.split(/[-–—,]/)[0].trim().toLowerCase();
    const bCompany = b.work.split(/[-–—,]/)[0].trim().toLowerCase();
    if (aCompany && bCompany && aCompany === bCompany) {
      shared.push({ type: 'work', value: a.work.split(/[-–—,]/)[0].trim() });
    }
  }

  return shared;
}

// ─── Build edges including "You" center node ───
function buildEdges(contacts) {
  const edges = [];
  const YOU_ID = '__you__';

  // Edges between contacts
  for (let i = 0; i < contacts.length; i++) {
    for (let j = i + 1; j < contacts.length; j++) {
      const shared = getSharedAttributes(contacts[i], contacts[j]);
      if (shared.length > 0) {
        edges.push({
          source: contacts[i].id,
          target: contacts[j].id,
          shared,
          strength: shared.length,
          isYouEdge: false,
        });
      }
    }
  }

  // Every contact connects to "You"
  contacts.forEach(c => {
    edges.push({
      source: YOU_ID,
      target: c.id,
      shared: [{ type: 'you', value: c.relationship_type || 'contact' }],
      strength: 0.5,
      isYouEdge: true,
    });
  });

  return edges;
}

const YOU_ID = '__you__';

// ─── Force-directed layout with strong center gravity ───
function useForceLayout(contacts, edges, canvasWidth, canvasHeight) {
  const [positions, setPositions] = useState({});

  useEffect(() => {
    if (contacts.length === 0 || canvasWidth === 0) return;

    const centerX = canvasWidth / 2;
    const centerY = canvasHeight / 2;

    // All nodes = "You" + contacts
    const allNodes = [{ id: YOU_ID }, ...contacts];

    const pos = {};
    // "You" starts at center
    pos[YOU_ID] = { x: centerX, y: centerY, vx: 0, vy: 0 };

    // Contacts start in a wide circle
    contacts.forEach((node, i) => {
      const angle = (2 * Math.PI * i) / contacts.length;
      const radius = Math.min(canvasWidth, canvasHeight) * 0.35;
      pos[node.id] = {
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle),
        vx: 0,
        vy: 0,
      };
    });

    // Simulation params — more repulsion = more spacing
    const iterations = 200;
    const repulsion = 18000;
    const attraction = 0.004;
    const youAttraction = 0.002;
    const damping = 0.82;
    const centerGravity = 0.03;

    for (let iter = 0; iter < iterations; iter++) {
      // Repulsion between all nodes
      for (let i = 0; i < allNodes.length; i++) {
        for (let j = i + 1; j < allNodes.length; j++) {
          const a = pos[allNodes[i].id];
          const b = pos[allNodes[j].id];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const dist = Math.max(Math.sqrt(dx * dx + dy * dy), 1);
          const force = repulsion / (dist * dist);
          const fx = (dx / dist) * force;
          const fy = (dy / dist) * force;
          // Don't move "You" as much
          if (allNodes[i].id !== YOU_ID) { a.vx -= fx; a.vy -= fy; }
          if (allNodes[j].id !== YOU_ID) { b.vx += fx; b.vy += fy; }
        }
      }

      // Attraction along edges
      edges.forEach(edge => {
        const a = pos[edge.source];
        const b = pos[edge.target];
        if (!a || !b) return;
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const dist = Math.max(Math.sqrt(dx * dx + dy * dy), 1);
        const str = edge.isYouEdge ? youAttraction : attraction;
        const force = dist * str * edge.strength;
        const fx = (dx / dist) * force;
        const fy = (dy / dist) * force;
        if (edge.source !== YOU_ID) { a.vx += fx; a.vy += fy; }
        if (edge.target !== YOU_ID) { b.vx -= fx; b.vy -= fy; }
      });

      // Strong center gravity pulls everything back
      allNodes.forEach(node => {
        if (node.id === YOU_ID) return;
        const p = pos[node.id];
        p.vx += (centerX - p.x) * centerGravity;
        p.vy += (centerY - p.y) * centerGravity;
      });

      // Apply velocity
      allNodes.forEach(node => {
        if (node.id === YOU_ID) return;
        const p = pos[node.id];
        p.vx *= damping;
        p.vy *= damping;
        p.x += p.vx;
        p.y += p.vy;
        const pad = 60;
        p.x = Math.max(pad, Math.min(canvasWidth - pad, p.x));
        p.y = Math.max(pad, Math.min(canvasHeight - pad, p.y));
      });

      // Keep "You" locked at center
      pos[YOU_ID].x = centerX;
      pos[YOU_ID].y = centerY;
    }

    const finalPositions = {};
    allNodes.forEach(node => {
      finalPositions[node.id] = { x: pos[node.id].x, y: pos[node.id].y };
    });

    setPositions(finalPositions);
  }, [contacts, edges, canvasWidth, canvasHeight]);

  return positions;
}

// ─── Draw grid pattern on SVG ───
function GridPattern({ width, height, offsetX = 0, offsetY = 0 }) {
  const spacing = 24;
  const lines = [];
  for (let x = offsetX; x <= offsetX + width; x += spacing) {
    lines.push(<line key={`v-${x}`} x1={x} y1={offsetY} x2={x} y2={offsetY + height} stroke="#E8E0D8" strokeWidth={0.5} />);
  }
  for (let y = offsetY; y <= offsetY + height; y += spacing) {
    lines.push(<line key={`h-${y}`} x1={offsetX} y1={y} x2={offsetX + width} y2={y} stroke="#E8E0D8" strokeWidth={0.5} />);
  }
  return <g>{lines}</g>;
}

// ─── AI Chat Component ───
function AIChat({ contacts, onClose }) {
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

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-5-20250929',
          max_tokens: 1024,
          system: systemPrompt,
          messages: apiMessages,
        }),
      });

      if (!response.ok) throw new Error(`API error: ${response.status}`);
      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.content[0].text }]);
    } catch (err) {
      console.error('Chat error:', err);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I couldn\'t process that. Make sure your API key is set in .env as VITE_ANTHROPIC_API_KEY.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="bg-white rounded-2xl border border-warm-200/60 shadow-lg flex flex-col overflow-hidden"
      style={{ height: '480px' }}
    >
      <div className="flex items-center justify-between px-5 py-3 border-b border-warm-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg gradient-brand flex items-center justify-center">
            <Sparkles size={14} className="text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-warm-800 text-sm">Rolo AI</h3>
            <p className="text-xs text-warm-400">Ask about your network</p>
          </div>
        </div>
        <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-warm-100 text-warm-400 hover:text-warm-600 transition-colors">
          <X size={16} />
        </button>
      </div>

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
            className="w-10 h-10 rounded-xl gradient-brand text-white flex items-center justify-center shadow-sm shadow-brand/20 hover:shadow-md transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:-translate-y-0.5 disabled:hover:translate-y-0"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main Network Graph Component ───
export default function NetworkGraph() {
  const { contacts, setSelectedContact, setCurrentView } = useContext(ContactsContext);
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [hoveredNode, setHoveredNode] = useState(null);
  const [hoveredEdge, setHoveredEdge] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const panStart = useRef({ x: 0, y: 0 });

  const edges = useMemo(() => buildEdges(contacts), [contacts]);
  const positions = useForceLayout(contacts, edges, dimensions.width, dimensions.height);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const updateSize = () => setDimensions({ width: container.clientWidth, height: container.clientHeight });
    updateSize();
    const ro = new ResizeObserver(updateSize);
    ro.observe(container);
    return () => ro.disconnect();
  }, []);

  const getNodeConnections = useCallback((nodeId) => {
    return edges.filter(e => (e.source === nodeId || e.target === nodeId) && !e.isYouEdge);
  }, [edges]);

  const handleMouseDown = (e) => {
    if (e.target.closest('.node-interactive')) return;
    setIsPanning(true);
    panStart.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
  };
  const handleMouseMove = (e) => {
    if (!isPanning) return;
    setPan({ x: e.clientX - panStart.current.x, y: e.clientY - panStart.current.y });
  };
  const handleMouseUp = () => setIsPanning(false);

  const handleContactClick = (contact) => {
    setSelectedContact(contact);
    setCurrentView('profile');
  };

  const allAttributes = useMemo(() => {
    const attrs = new Set();
    edges.filter(e => !e.isYouEdge).forEach(e => e.shared.forEach(s => attrs.add(s.type)));
    return Array.from(attrs);
  }, [edges]);

  const edgeColor = (type) => {
    switch (type) {
      case 'interest': return '#DD571C';
      case 'tag': return '#3B82F6';
      case 'work': return '#22C55E';
      case 'relationship': return '#8B5CF6';
      case 'you': return '#D6CFC7';
      default: return '#9C8B7A';
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-warm-900 mb-2">Network</h1>
          <p className="text-warm-500">See how your people connect to each other</p>
        </motion.div>

        {/* Legend + Controls */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap items-center justify-between gap-4 mb-4"
        >
          <div className="flex flex-wrap gap-3 text-xs">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-warm-800" />
              <span className="text-warm-500 font-medium">You</span>
            </div>
            {[
              { type: 'interest', label: 'Shared Interest' },
              { type: 'tag', label: 'Shared Tag' },
              { type: 'work', label: 'Same Workplace' },
              { type: 'relationship', label: 'Same Type' },
            ].filter(l => allAttributes.includes(l.type)).map(item => (
              <div key={item.type} className="flex items-center gap-1.5">
                <div className="w-6 h-0.5 rounded-full" style={{ background: edgeColor(item.type) }} />
                <span className="text-warm-500">{item.label}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setZoom(z => Math.max(0.3, z - 0.15))}
              className="p-2 rounded-xl bg-white border border-warm-200/60 text-warm-500 hover:text-warm-700 hover:border-warm-300 transition-colors shadow-sm"
            >
              <ZoomOut size={16} />
            </button>
            <button
              onClick={() => setZoom(z => Math.min(2.5, z + 0.15))}
              className="p-2 rounded-xl bg-white border border-warm-200/60 text-warm-500 hover:text-warm-700 hover:border-warm-300 transition-colors shadow-sm"
            >
              <ZoomIn size={16} />
            </button>
            <button
              onClick={() => { setZoom(1); setPan({ x: 0, y: 0 }); }}
              className="p-2 rounded-xl bg-white border border-warm-200/60 text-warm-500 hover:text-warm-700 hover:border-warm-300 transition-colors shadow-sm"
            >
              <Maximize2 size={16} />
            </button>
          </div>
        </motion.div>

        {/* Graph — opaque white bg with grid */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-warm-50 rounded-2xl border border-warm-200/60 shadow-sm overflow-hidden mb-6"
          style={{ height: '560px' }}
        >
          <div
            ref={containerRef}
            className="w-full h-full relative select-none"
            style={{ cursor: isPanning ? 'grabbing' : 'grab' }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {dimensions.width > 0 && (
              <svg width={dimensions.width} height={dimensions.height} className="absolute inset-0">
                <g transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`}>
                  {/* Grid background — moves with pan/zoom */}
                  <GridPattern width={dimensions.width * 3} height={dimensions.height * 3} offsetX={-dimensions.width} offsetY={-dimensions.height} />
                  {/* "You" connection lines — subtle */}
                  {edges.filter(e => e.isYouEdge).map((edge, i) => {
                    const from = positions[edge.source];
                    const to = positions[edge.target];
                    if (!from || !to) return null;
                    const isHighlighted = hoveredNode === edge.target || selectedNode === edge.target;

                    return (
                      <line
                        key={`you-edge-${i}`}
                        x1={from.x} y1={from.y}
                        x2={to.x} y2={to.y}
                        stroke="#D6CFC7"
                        strokeWidth={isHighlighted ? 2 : 1}
                        strokeOpacity={isHighlighted ? 0.6 : 0.25}
                        strokeDasharray="3 6"
                        strokeLinecap="round"
                      />
                    );
                  })}

                  {/* Contact-to-contact edges */}
                  {edges.filter(e => !e.isYouEdge).map((edge, i) => {
                    const from = positions[edge.source];
                    const to = positions[edge.target];
                    if (!from || !to) return null;

                    const isHovered = hoveredEdge === i ||
                      hoveredNode === edge.source || hoveredNode === edge.target ||
                      selectedNode === edge.source || selectedNode === edge.target;

                    return (
                      <line
                        key={`edge-${i}`}
                        x1={from.x} y1={from.y}
                        x2={to.x} y2={to.y}
                        stroke={edgeColor(edge.shared[0]?.type)}
                        strokeWidth={isHovered ? 3.5 : 2}
                        strokeOpacity={isHovered ? 0.9 : 0.6}
                        strokeDasharray={edge.strength === 1 ? '4 4' : 'none'}
                        onMouseEnter={() => setHoveredEdge(i)}
                        onMouseLeave={() => setHoveredEdge(null)}
                        className="transition-all duration-200 cursor-pointer"
                        style={{ pointerEvents: 'stroke' }}
                        strokeLinecap="round"
                      />
                    );
                  })}

                  {/* "You" center node */}
                  {positions[YOU_ID] && (
                    <g className="node-interactive">
                      <circle
                        cx={positions[YOU_ID].x}
                        cy={positions[YOU_ID].y}
                        r={30}
                        fill="#2D2520"
                      />
                      <circle
                        cx={positions[YOU_ID].x}
                        cy={positions[YOU_ID].y}
                        r={34}
                        fill="none"
                        stroke="#2D2520"
                        strokeWidth={2}
                        strokeOpacity={0.15}
                      />
                      <text
                        x={positions[YOU_ID].x}
                        y={positions[YOU_ID].y}
                        textAnchor="middle"
                        dy="0.35em"
                        fill="white"
                        fontWeight="800"
                        fontSize={13}
                        style={{ pointerEvents: 'none' }}
                      >
                        YOU
                      </text>
                    </g>
                  )}

                  {/* Contact nodes */}
                  {contacts.map((contact) => {
                    const pos = positions[contact.id];
                    if (!pos) return null;

                    const relColor = getRelationshipColor(contact.relationship_type);
                    const isHovered = hoveredNode === contact.id;
                    const isSelected = selectedNode === contact.id;
                    const connections = getNodeConnections(contact.id);
                    const nodeRadius = 22 + Math.min(connections.length * 3, 12);

                    return (
                      <g
                        key={contact.id}
                        className="node-interactive"
                        style={{ cursor: 'pointer' }}
                        onMouseEnter={() => setHoveredNode(contact.id)}
                        onMouseLeave={() => setHoveredNode(null)}
                        onClick={() => setSelectedNode(selectedNode === contact.id ? null : contact.id)}
                        onDoubleClick={() => handleContactClick(contact)}
                      >
                        {(isHovered || isSelected) && (
                          <circle
                            cx={pos.x} cy={pos.y}
                            r={nodeRadius + 6}
                            fill="none"
                            stroke={relColor.hex}
                            strokeWidth={2}
                            strokeOpacity={0.3}
                          />
                        )}
                        <circle
                          cx={pos.x} cy={pos.y}
                          r={nodeRadius}
                          fill={relColor.hex}
                          fillOpacity={isHovered || isSelected ? 1 : 0.9}
                          className="transition-all duration-200"
                        />
                        <text
                          x={pos.x} y={pos.y}
                          textAnchor="middle" dy="0.35em"
                          fill="white" fontWeight="700"
                          fontSize={nodeRadius > 28 ? 13 : 11}
                          style={{ pointerEvents: 'none' }}
                        >
                          {getRolodexInitials(contact.name)}
                        </text>
                        <text
                          x={pos.x} y={pos.y + nodeRadius + 16}
                          textAnchor="middle"
                          fill="#4A3F37" fontWeight="600" fontSize={11}
                          style={{ pointerEvents: 'none' }}
                        >
                          {formatRolodexName(contact.name)}
                        </text>
                      </g>
                    );
                  })}
                </g>
              </svg>
            )}

            {/* Edge tooltip */}
            {hoveredEdge !== null && edges.filter(e => !e.isYouEdge)[hoveredEdge] && (() => {
              const edge = edges.filter(e => !e.isYouEdge)[hoveredEdge];
              const from = positions[edge.source];
              const to = positions[edge.target];
              if (!from || !to) return null;
              const midX = ((from.x + to.x) / 2) * zoom + pan.x;
              const midY = ((from.y + to.y) / 2) * zoom + pan.y;
              const sourceContact = contacts.find(c => c.id === edge.source);
              const targetContact = contacts.find(c => c.id === edge.target);

              return (
                <div
                  className="absolute bg-warm-900 text-white text-xs rounded-xl px-3 py-2 pointer-events-none shadow-lg z-20"
                  style={{ left: midX, top: midY - 10, transform: 'translate(-50%, -100%)' }}
                >
                  <div className="font-semibold mb-1">
                    {sourceContact?.name?.split(' ')[0]} & {targetContact?.name?.split(' ')[0]}
                  </div>
                  {edge.shared.map((s, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: edgeColor(s.type) }} />
                      <span className="capitalize">{s.type}: {s.value}</span>
                    </div>
                  ))}
                </div>
              );
            })()}

            {/* Selected node panel */}
            {selectedNode && selectedNode !== YOU_ID && (() => {
              const contact = contacts.find(c => c.id === selectedNode);
              if (!contact) return null;
              const connections = getNodeConnections(selectedNode);
              const connectedContacts = connections.map(e => {
                const otherId = e.source === selectedNode ? e.target : e.source;
                return { contact: contacts.find(c => c.id === otherId), shared: e.shared };
              }).filter(c => c.contact);

              return (
                <div className="absolute top-4 right-4 w-72 bg-white rounded-2xl border border-warm-200/60 shadow-lg p-5 z-20">
                  <button
                    onClick={() => setSelectedNode(null)}
                    className="absolute top-3 right-3 p-1 rounded-lg text-warm-400 hover:text-warm-600 hover:bg-warm-100 transition-colors"
                  >
                    <X size={14} />
                  </button>
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-sm"
                      style={{ background: getRelationshipColor(contact.relationship_type).hex }}
                    >
                      {getRolodexInitials(contact.name)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-warm-800 text-sm">{formatRolodexName(contact.name)}</h3>
                      <p className="text-xs text-warm-400 capitalize">{contact.relationship_type}</p>
                    </div>
                  </div>

                  {connectedContacts.length > 0 ? (
                    <>
                      <p className="text-xs font-semibold text-warm-500 uppercase tracking-wider mb-2">
                        Connected to ({connectedContacts.length})
                      </p>
                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        {connectedContacts.map(({ contact: c, shared }) => (
                          <div
                            key={c.id}
                            className="flex items-center gap-2 p-2 rounded-lg bg-warm-50 cursor-pointer hover:bg-warm-100 transition-colors"
                            onClick={() => handleContactClick(c)}
                          >
                            <div
                              className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold"
                              style={{ background: getRelationshipColor(c.relationship_type).hex }}
                            >
                              {c.name.charAt(0)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-xs font-medium text-warm-700 truncate">{c.name.split(' ')[0]}</div>
                              <div className="flex flex-wrap gap-1 mt-0.5">
                                {shared.map((s, i) => (
                                  <span key={i} className="text-[10px] px-1.5 py-0.5 rounded bg-warm-100 text-warm-500">{s.value}</span>
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <p className="text-xs text-warm-400">No shared connections with other contacts.</p>
                  )}

                  <button
                    onClick={() => handleContactClick(contact)}
                    className="w-full mt-4 py-2 rounded-xl gradient-brand text-white text-xs font-medium shadow-sm shadow-brand/20 hover:shadow-md transition-all"
                  >
                    View Profile
                  </button>
                </div>
              );
            })()}
          </div>
        </motion.div>

        {/* AI Chat */}
        <div className="max-w-2xl mx-auto">
          <AnimatePresence>
            {showChat ? (
              <AIChat key="chat" contacts={contacts} onClose={() => setShowChat(false)} />
            ) : (
              <motion.button
                key="toggle"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                onClick={() => setShowChat(true)}
                className="w-full bg-white rounded-2xl border border-warm-200/60 shadow-sm p-5 flex items-center gap-4 text-left hover:shadow-md hover:border-brand/20 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl gradient-brand flex items-center justify-center text-white shadow-md shadow-brand/20 transition-transform group-hover:scale-105">
                  <MessageCircle size={20} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-warm-800">Ask Rolo AI</h3>
                  <p className="text-sm text-warm-500">Plan a party, find connections, explore your network</p>
                </div>
                <span className="text-warm-300 group-hover:text-brand group-hover:translate-x-1 transition-all text-lg">&rarr;</span>
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="grid grid-cols-3 gap-4 mt-6 max-w-2xl mx-auto"
        >
          {[
            { value: contacts.length, label: 'People' },
            { value: edges.filter(e => !e.isYouEdge).length, label: 'Connections' },
            { value: edges.filter(e => !e.isYouEdge).reduce((max, e) => Math.max(max, e.strength), 0), label: 'Strongest Link' },
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-2xl border border-warm-200/60 shadow-sm p-5 text-center">
              <div className="text-2xl font-bold text-brand mb-1">{stat.value}</div>
              <div className="text-xs text-warm-500 font-medium">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
