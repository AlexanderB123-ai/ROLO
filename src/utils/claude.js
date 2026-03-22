const API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY;
const API_URL = 'https://api.anthropic.com/v1/messages';
const MODEL = 'claude-sonnet-4-5-20250929';

async function callClaude(systemPrompt, userMessage, maxTokens = 1024) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true'
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: maxTokens,
        messages: [{ role: 'user', content: userMessage }],
        system: systemPrompt
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API error ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    return data.content[0].text;
  } catch (error) {
    console.error('Claude API error:', error);
    throw error;
  }
}

export async function extractProfile(transcript) {
  const systemPrompt = `You are Rolo, a personal relationship intelligence assistant. The user recorded a voice memo about one or more people in their life.

If the transcript mentions MULTIPLE distinct people, create a separate profile for each. Return an array of profiles.

For each person, extract:
- name (string)
- relationship_type (friend | family | colleague | mentor | acquaintance)
- how_we_met (string | null)
- interests (string[])
- work (string | null — company + role if mentioned)
- birthday (string | null — any date format)
- significant_other (string | null)
- last_interaction ({ approximate_date: string | null, description: string | null })
- open_threads (string[] — things to follow up on. ACTIVELY INFER these. If someone "just started" a job → "ask how the new job is going." If someone is "training for" something → "ask how it went.")
- life_updates (string[] — recent changes or events)
- tags (string[] — auto-generated labels like "college", "gym buddy", "work")
- importance (number 1-5, inferred from emotional language, detail level, how the user talks about them)

Return ONLY valid JSON. No markdown, no explanation. Either a single object or an array of objects.`;

  try {
    const response = await callClaude(systemPrompt, transcript, 1024);
    // Remove any markdown code blocks if present
    const cleanedResponse = response.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    const parsed = JSON.parse(cleanedResponse);
    return Array.isArray(parsed) ? parsed : [parsed];
  } catch (error) {
    console.error('Error extracting profile:', error);
    throw error;
  }
}

export async function generateOutreachSuggestions(contact, daysSinceLastContact) {
  const systemPrompt = `You are a thoughtful friend helping someone maintain their relationships. Given this contact profile and the days since last interaction, generate 3 specific outreach suggestions.

Rules:
1. Reference something SPECIFIC from the profile — never generic
2. Sound like advice from a close friend, not a CRM
3. Include a draft message they could copy and text
4. Vary effort: one quick text, one call idea, one in-person hangout

Return ONLY valid JSON array: [{ type: "text"|"call"|"hangout", suggestion: string, draft_message: string, reasoning: string }]`;

  try {
    const userMessage = `Contact profile: ${JSON.stringify(contact)}\nDays since last interaction: ${daysSinceLastContact}`;
    const response = await callClaude(systemPrompt, userMessage, 1024);
    const cleanedResponse = response.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    return JSON.parse(cleanedResponse);
  } catch (error) {
    console.error('Error generating outreach suggestions:', error);
    throw error;
  }
}

export async function generateBirthdayMessage(contact) {
  const systemPrompt = `Generate a birthday message for this person based on what the user knows about them. Reference their interests, recent life events, or shared context. Never generic. Keep it casual and warm.

Return ONLY valid JSON: { message: string }`;

  try {
    const userMessage = `Contact profile: ${JSON.stringify(contact)}`;
    const response = await callClaude(systemPrompt, userMessage, 512);
    const cleanedResponse = response.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    return JSON.parse(cleanedResponse);
  } catch (error) {
    console.error('Error generating birthday message:', error);
    throw error;
  }
}
