# CLAUDE.md — Rolo

## What This Is
Rolo (short for Rolodex) is an AI-powered personal relationship manager being built for the **Pioneering Minds AI Grayscale Hackathon** on March 22, 2026 in NYC. We have **6 hours of build time** (10:30am–4:30pm). Every decision should optimize for a working, demoable product by 4:00pm.

## The Hackathon Context
- **Track:** Attention
- **Theme:** The dual nature of AI — what it builds for us vs. against us
- **Dark side:** AI-powered social media replaced genuine human connection with passive scrolling. Loneliness epidemic.
- **Light side:** Rolo uses the same AI to actively rebuild real-world relationships through voice capture, drift detection, and personalized outreach suggestions.
- **Judges will ask:** "What harmful pattern exists today, and how does your product push the other direction?"
- **Team size:** 2 developers
- **Deadline:** Code submission at 4:30pm, live pitches at 4:00–5:30pm

## Tech Stack
- **Frontend:** React (JSX) with Tailwind CSS
- **Voice Input:** Web Speech API (browser-native, zero dependencies)
- **AI Processing:** Claude API — Sonnet 4.6 (`claude-sonnet-4-6-20250219`) for all runtime API calls
- **Data Storage:** React state + localStorage (no backend database needed)
- **No backend server required** — all API calls can be made client-side for the hackathon. In production, you'd route through a backend proxy to protect the API key.

## API Configuration
- **Model for all runtime calls:** `claude-sonnet-4-6-20250219`
- **DO NOT use Opus for runtime calls** — too slow and expensive for live demo
- **API endpoint:** `https://api.anthropic.com/v1/messages`
- **Required headers:**
  ```
  Content-Type: application/json
  x-api-key: [USER_API_KEY]
  anthropic-version: 2023-06-01
  anthropic-dangerous-direct-browser-access: true
  ```
- **Max tokens:** 1024 for profile extraction, 1024 for outreach suggestions, 512 for birthday messages
- **The API key will be stored in an environment variable or config file — never hardcoded in committed code**

## Core Features (Priority Order — Build in This Order)

### P0 — Must Have for Demo (Build First)
1. **Voice-to-Profile Creation (HERO FEATURE)**
   - User taps mic button → speaks freely about a person → Web Speech API transcribes → transcript sent to Claude API → AI returns structured JSON profile
   - Must support BATCH mode: user talks about multiple people in one recording, AI splits into separate profiles
   - Profile fields: name, relationship_type, how_we_met, interests[], work, birthday, significant_other, last_interaction{date, description}, open_threads[], life_updates[], tags[], importance(1-5)
   - This is the #1 demo moment — it must work flawlessly

2. **Rolo Dashboard (Home Screen)**
   - Contacts displayed in concentric rings by importance (inner = closest, outer = acquaintances)
   - Drift visualization: contacts fade in opacity based on days since last interaction
   - Quick stats bar: total contacts, number drifting, upcoming birthdays
   - Tapping a contact opens their profile

3. **AI Outreach Suggestions**
   - User taps "Reach Out" on a contact → Claude generates 3 personalized suggestions
   - Each suggestion: type (text/call/hangout), suggestion text, draft message, reasoning
   - Suggestions MUST reference specific details from the profile (never generic)
   - Vary effort levels: quick text, phone call, in-person hangout

### P1 — Nice to Have (Build If Time Permits)
4. **Birthday Tracker** — List of upcoming birthdays with AI-generated personal messages
5. **Interaction Logger** — Voice-update after catching up with someone, AI updates their profile
6. **Interaction Calendar** — Monthly calendar view displaying all interactions with contacts. Shows avatars/initials on dates with activity, color-coded by relationship type. Displays upcoming birthdays. Includes interaction streak counter to gamify staying connected. Empty days are visually distinct to create motivation. Built from scratch with CSS Grid (no external calendar libraries).
7. **"Start With Five" Onboarding** — First-launch flow prompting user to add just 5 people
8. **Contact Import** — Pull names/numbers/birthdays from phone contacts as skeleton profiles
9. **Plan Something (Meetup Feature)** — Select 2-5 contacts, AI suggests hangout ideas based on shared interests, location, and how long since the group last met. Includes "Group drift alerts" for friend groups that haven't connected recently, and low-effort nudge suggestions like "send a meme to the group chat" to reduce activation energy.

### P2 — Mention in Pitch Only
- Text/iMessage analysis for messaging pattern detection
- Smart reminders based on open threads
- Relationship health score
- Group dynamics visualization

## Key API Prompts

### Voice-to-Profile System Prompt
```
You are Rolo, a personal relationship intelligence assistant. The user recorded a voice memo about one or more people in their life.

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

Return ONLY valid JSON. No markdown, no explanation. Either a single object or an array of objects.
```

### Outreach Suggestions System Prompt
```
You are a thoughtful friend helping someone maintain their relationships. Given this contact profile and the days since last interaction, generate 3 specific outreach suggestions.

Rules:
1. Reference something SPECIFIC from the profile — never generic
2. Sound like advice from a close friend, not a CRM
3. Include a draft message they could copy and text
4. Vary effort: one quick text, one call idea, one in-person hangout

Return ONLY valid JSON array: [{ type: "text"|"call"|"hangout", suggestion: string, draft_message: string, reasoning: string }]
```

### Birthday Message System Prompt
```
Generate a birthday message for this person based on what the user knows about them. Reference their interests, recent life events, or shared context. Never generic. Keep it casual and warm.

Return ONLY valid JSON: { message: string }
```

### Plan Something (Meetup) System Prompt
```
The user wants to get a group together. Given these contact profiles, suggest 3 hangout ideas that account for shared interests, locations, and group dynamics.

Rules:
1. Find genuine overlaps in interests across the group
2. Suggest specific venues/activities, not vague ideas
3. Include one low-effort option (group text, quick coffee), one medium (dinner, activity), one high-effort (day trip, event)
4. If the group hasn't met in a long time, acknowledge that and suggest something that makes reconnecting easy, not intimidating

Return ONLY valid JSON array: [{ activity: string, description: string, effort_level: "low"|"medium"|"high", shared_interests_leveraged: string[], suggested_message: string }]
```

## UI/UX Design Principles
- **Warm, not corporate.** This is about friendships, not sales leads. Use warm colors, rounded corners, friendly typography. No CRM aesthetics.
- **Voice-first.** The mic button should be prominent and obvious on every screen. Speaking is the primary input, not typing.
- **Anti-engagement.** Success = less time in app. Every screen pushes toward real-world action.
- **Mobile-friendly.** The demo may run on a laptop, but design as if it's a phone app. Clean, simple, thumb-friendly.
- **Concentric rings** for the dashboard are the signature visual. Inner ring = closest friends. Outer ring = acquaintances. Fading = drifting.
- Use a clean sans-serif font. Color palette: warm tones — think sunset/golden amber for the inner ring, cooler/grayer tones for the outer ring and drifting contacts.

## Pre-Demo Data
Before the live pitch, pre-load 8–10 contacts with rich data so the dashboard looks full. Include:
- 3-4 inner circle friends with detailed profiles and recent interactions
- 2-3 middle ring friends, one actively drifting (last interaction 2+ months ago)
- 2 outer ring acquaintances
- 1 birthday coming up in the next 3 days
- At least 2 contacts with open threads
- This data should be loadable from a JSON file or hardcoded seed data function

## Code Style & Conventions
- Use functional React components with hooks (useState, useEffect, useContext)
- Tailwind CSS for all styling — no separate CSS files
- Store all contacts in a React context or top-level state, persisted to localStorage
- API key stored in a `.env` file as `REACT_APP_ANTHROPIC_API_KEY` or `VITE_ANTHROPIC_API_KEY`
- All Claude API calls should go through a single utility function (`src/utils/claude.js`) for consistency
- Handle API errors gracefully — show a friendly message, never crash the demo
- Keep components modular: VoiceInput, Dashboard, ContactProfile, OutreachSuggestions, BirthdayTracker, PlanSomething

## File Structure
```
rolo/
├── src/
│   ├── components/
│   │   ├── VoiceInput.jsx         # Voice recording + transcript display
│   │   ├── Dashboard.jsx          # Concentric rings view + stats
│   │   ├── ContactCard.jsx        # Individual contact in dashboard
│   │   ├── ContactProfile.jsx     # Full profile view
│   │   ├── OutreachSuggestions.jsx # AI-generated reach-out ideas
│   │   ├── InteractionCalendar.jsx # Monthly calendar with interaction tracking
│   │   ├── BirthdayTracker.jsx    # Upcoming birthdays list
│   │   ├── PlanSomething.jsx      # Group meetup suggestions
│   │   └── Onboarding.jsx         # "Start With Five" first launch
│   ├── utils/
│   │   ├── claude.js              # All Claude API calls
│   │   ├── storage.js             # localStorage helpers
│   │   └── seedData.js            # Pre-loaded demo contacts
│   ├── context/
│   │   └── ContactsContext.jsx    # Global contacts state
│   ├── App.jsx
│   └── index.jsx
├── .env                           # API key (gitignored)
├── CLAUDE.md                      # This file
├── package.json
└── README.md
```

## Critical Reminders
- **SPEED OVER PERFECTION.** This is a 6-hour hackathon. Ship working features, not perfect code. No tests, no TypeScript, no over-engineering.
- **DEMO-DRIVEN DEVELOPMENT.** Before building any feature, ask: "Will this show up in the 5-minute pitch?" If no, skip it.
- **PRE-LOAD DEMO DATA.** Never rely on creating everything live. Have rich seed data ready.
- **VOICE INPUT IS THE HERO.** If only one thing works perfectly, it should be: speak → see profile appear. That's the wow moment.
- **HANDLE API FAILURES.** If Claude API is slow or down, have pre-cached responses as fallback so the demo never breaks.
- **KEEP IT SIMPLE.** Single-page app vibes. No routing library needed — use conditional rendering based on state (currentView: "dashboard" | "profile" | "voice" | "outreach" | "plan").

## The Pitch (For Context)
The pitch opens with: "In six months, I'm heading to NYU. My best friends are scattering across the country. Social media will trick me into thinking I'm staying connected — I'll see their stories, like their posts — but I won't actually talk to them. That's the illusion."

The key line: "Social media uses AI to keep you scrolling past your friends. Rolo uses AI to make you call them."

The closer: "We built an app whose measure of success is how little you use it."

Everything we build should serve this narrative.



When you design the Front end take screenshots of the provided images and use them as a reference for the design. and then take a screenshot and compare and continue to refine until they are simmilar. Use creative freedom to make it good. 