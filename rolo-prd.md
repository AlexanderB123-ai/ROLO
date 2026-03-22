# ROLO — Product Requirements Document

**Grayscale Hackathon | March 22, 2026**
**Track: Attention**
**Team Size: 2**

---

## 1. The Tension (Dark vs. Light)

**The Dark Side:** AI-powered social media has replaced genuine human connection with passive consumption. Algorithms optimize to keep you scrolling through strangers' highlight reels instead of reaching out to the people who actually matter. The average American spends 2+ hours/day on social media but reports having fewer close friendships than any previous generation. The U.S. Surgeon General declared loneliness a public health epidemic, with social isolation increasing mortality risk by 26%. COVID accelerated this — an entire generation learned to substitute screens for face-to-face connection, and the habit stuck. You see Jake's Instagram story and feel like you're keeping up, but you haven't actually called him in four months.

**The Light Side:** The same AI that traps your attention in algorithmically-curated feeds can be redirected to strengthen the relationships those algorithms have eroded. Rolo uses AI not to keep you engaged with an app, but to push you *out of the app and into real conversations.*

**One-line pitch:** "Social media uses AI to keep you scrolling past your friends. Rolo uses AI to make you call them."

---

## 2. Product Overview

**Rolo** (short for Rolodex) is a voice-first personal relationship manager that uses AI to help you maintain and deepen your real-world connections. Unlike contact lists (which are static) or social media (which substitutes performative interaction for genuine connection), Rolo treats your relationships as living things that need active care.

**Core loop:**
1. **Capture** — Voice-first: hit record, talk about a person naturally, AI structures it into a rich profile
2. **Surface** — Dashboard shows who's drifting, who you haven't reached out to, upcoming birthdays
3. **Act** — AI drafts personalized messages (individual or batch), suggests meetups, and plans group hangouts
4. **Update** — After interactions, voice-log what happened so Rolo gets smarter over time

---

## 3. Onboarding: The "Start With Five" Philosophy

The #1 killer of personal relationship tools is the feeling that you need to catalog your entire social life before the app is useful. Rolo solves this with multiple low-friction entry points:

### 3.1 "Start With Five" First Launch
On first open, Rolo says: *"Don't add everyone. Think of 5 people you've been meaning to reach out to."* The user voice-records about five people in under 3 minutes. The app immediately feels populated and useful — the dashboard has faces, drift indicators, and actionable suggestions from minute one.

### 3.2 Batch Voice Dump
Instead of adding one person at a time, users can ramble about an entire friend group in a single recording:

> "So my high school crew — there's Jake, Maya, and Chris. Jake's really into rock climbing and just started at Goldman. Maya got into Columbia Law last month, she's super excited. Chris is working at his dad's restaurant in Westchester but he wants to get out and move to the city..."

The AI detects multiple people in a single transcript and auto-splits them into separate profiles. 60 seconds of talking, three rich profiles created. The prompt instructs the AI to identify distinct individuals and create separate structured outputs for each.

### 3.3 Contact Import (Skeleton Profiles)
On first launch, Rolo can import from phone contacts to pull:
- Names
- Phone numbers
- Birthdays (if stored)
- Profile photos

This creates "skeleton" profiles — empty cards with a name and face, ready to be enriched. Users don't need to fill them all in. They voice-fill the ones that matter, and the rest sit as lightweight entries they can enrich later or never.

### 3.4 "Just Had Coffee" Mode (Organic Growth)
The app isn't designed for a big cataloging session. The natural use case is: you just hung out with someone, you open Rolo, you voice-log for 20 seconds about what you talked about. Over a few weeks, your most active relationships naturally populate themselves because those are the people you're actually seeing. The friends who matter most fill themselves in.

### 3.5 AI-Prompted Memory Jogs
After adding a few people, the AI nudges with associative prompts:
- "You mentioned Jake from high school. Anyone else from that group you want to add?"
- "You added 3 work friends — is there anyone from your team you're close with that's missing?"

People remember friends in clusters (school friends, work friends, gym friends), so Rolo leverages that by prompting group-by-group rather than one-by-one.

---

## 4. Core Features (Hackathon Scope — 6 hours)

### 4.1 Voice-to-Profile Creation (HERO FEATURE)
**User flow:** User taps a microphone button → speaks freely about a person (or multiple people) → AI processes the transcript and auto-generates structured contact profile(s).

**Single-person example input (voice):**
> "So my friend Jake, we went to high school together. He's really into rock climbing and just started a new job at Goldman Sachs in their tech division. His birthday is March 15th. He's dating someone named Sarah. Last time we hung out was like two months ago when we grabbed dinner in the city. He mentioned he was training for some climbing competition."

**AI-generated profile:**
- **Name:** Jake
- **How we met:** High school
- **Interests:** Rock climbing (training for competition)
- **Work:** Goldman Sachs — tech division (new role)
- **Birthday:** March 15
- **Relationship:** Dating Sarah
- **Last interaction:** ~2 months ago — dinner in NYC
- **Open threads:** Climbing competition (follow up on how it went)
- **Tags:** Close friend, High school

**Batch example input (voice):**
> "My college roommates — there's Priya, she's in med school at Mount Sinai now and always stressed but she loves trying new restaurants. And then Dave, he moved to Austin and works at a startup doing something with AI. I haven't talked to Dave since like November."

**AI-generated:** Two separate profiles for Priya and Dave, each with extracted details and Priya tagged as more recent contact than Dave (who gets an immediate drift alert).

### 4.2 Relationship Dashboard
Visual grid/list of all contacts with key indicators:

- **Rolo rings:** Contacts displayed in concentric rings based on closeness. Inner ring = closest relationships, outer ring = acquaintances. This visual *is* the Rolodex metaphor — your people, organized by how close they are.
- **Drift alerts:** Contacts you haven't interacted with recently fade in opacity or pulse gently. The longer the gap, the more they fade. A friend you haven't talked to in 3 months is visually disappearing — because in real life, they kind of are.
- **Upcoming birthdays:** Highlighted with countdown badges
- **Open threads:** Small badges showing unresolved conversation topics ("Jake's climbing comp — ask how it went")
- **Quick stats:** "You have 23 people in Rolo. 7 are drifting. 2 birthdays this week."

### 4.3 AI Outreach Suggestions
When a user selects a contact and taps "Reach Out," AI generates personalized suggestions based on:
- Their interests and recent life events (from the profile)
- How long it's been since last contact
- Open conversation threads
- Current context (time of year, day of week)

**Example suggestions for Jake:**
1. **Quick text:** "Jake's climbing competition was recently — text him: 'Hey man, how'd the comp go? Been meaning to ask'"
2. **Make plans:** "You haven't hung out in 2 months. He works in FiDi — suggest a lunch next week"
3. **Belated birthday:** "His birthday was March 15 — send a belated note, reference the climbing: 'Happy belated bro, hope you celebrated on top of a wall somewhere'"

### 4.4 Birthday Tracker
- List view of upcoming birthdays with countdown
- AI-generated birthday message suggestions that are *personal* — based on what you've told Rolo about them, not "Happy birthday! Hope it's a great one!"
- Example: "Maya's birthday is in 3 days. She just got into Columbia Law. Suggested message: 'Happy birthday Maya!! Future lawyer era 🎂 so proud of you'"

### 4.5 Interaction Logger (Voice Update)
After catching up with someone, quick voice log:
> "Just had coffee with Jake. He said the climbing comp went well, placed 3rd. He's thinking about switching teams at Goldman. Sarah and him are moving in together."

AI automatically updates the profile: last interaction date refreshed, new life updates added, new open threads created ("follow up on team switch," "ask about the move with Sarah"), drift indicator resets.

### 4.6 Meetup Suggestions (1-on-1)
From any contact's profile, tap **"Plan a Meetup"** and the AI generates three hangout ideas tailored to what you know about them — their interests, location, recent life events, and how long it's been since you last saw them.

**Example for Jake (loves climbing, works in FiDi):**
1. **Activity-based:** "Jake's into climbing — suggest trying the new bouldering gym on the Lower East Side this Saturday"
2. **Low-effort:** "He works in FiDi and you're nearby — grab a quick lunch at Shake Shack, no planning needed"
3. **Catch-up:** "It's been 2 months — suggest a Friday night dinner where you can actually talk. He'd probably bring Sarah, so pick somewhere with good group energy"

Each suggestion includes a draft invite message the user can copy and text directly.

### 4.7 Group Hangout Planner
Select 2–5 friends from your Rolo and tap **"Plan a Group Hangout."** The AI cross-references everyone's interests, locations, and schedules (if known) and suggests group activities that work for the mix of people.

**Example — selecting Jake (climbing, FiDi), Maya (foodie, Columbia), Chris (wants to leave Westchester):**
> "All three are in the NYC area. Jake and Chris would both enjoy something active, and Maya loves trying new food. Suggestion: Saturday afternoon at Chelsea Piers (climbing wall for Jake and Chris) followed by dinner at a new spot in Chelsea (Maya's pick). Draft group text: 'hey what are you guys doing saturday? thinking chelsea piers then dinner — been too long since we all hung out'"

The AI finds the **overlap** between people — shared interests, compatible energy levels, geographic proximity — and turns it into a concrete plan.

### 4.8 Batch Reconnect (Draft All Messages at Once)
The most powerful outreach feature in Rolo. When you've been off the grid and need to reconnect with multiple people at once:

1. **Auto-detect:** The dashboard shows a "Reconnect" button when 3+ friends are drifting. Tap it.
2. **Select people:** Choose which drifting friends you want to reach out to (or select all).
3. **AI drafts everything:** Rolo generates a personalized message for each person — no two are the same. Each message references something specific from that person's profile.
4. **Review and send:** All drafts appear in a scrollable list. Edit any message, then tap "Copy" next to each one to paste into your texting app.

**Example — 4 friends drifting:**

| Friend | Draft Message |
|--------|-------------|
| Jake | "Hey man, been meaning to ask — how'd the climbing comp go? Let's grab lunch in FiDi soon" |
| Maya | "Future lawyer!! How's Columbia treating you? Let's get dinner and catch up properly" |
| Chris | "Bro I feel like I haven't seen you since forever. You still thinking about moving to the city? Let's talk about it over food" |
| Priya | "Hey! How's med school going? I know you're slammed but we need to try that new Thai place you mentioned" |

The key insight: the hardest part of reconnecting isn't wanting to — it's figuring out what to say to each person. Rolo eliminates that friction entirely. You spend 30 seconds reviewing drafts instead of 20 minutes staring at blank text boxes.

---

## 5. Addressing the Privacy Objection

This will come up in judging. Here is the framing:

### The Objection
"Isn't it creepy to have files on all your friends? What about data collection?"

### The Rebuttal (for the pitch)
"You already have this information — it's scattered across your brain, your texts, your Notes app, and your memory, which fails. Rolo doesn't collect data *about* other people. It captures *your own knowledge* about *your own relationships.* The data comes from you, stays with you, and serves you. It's a private journal for your friendships — closer to a diary than a social network. No other user ever sees your Rolo. There's no feed, no followers, no profile anyone can look up. It's yours."

### Technical Privacy Design
- All data stored locally on-device (in production: encrypted local storage)
- Voice recordings are transcribed and discarded — only the structured data is kept
- No server-side storage of personal information in production vision
- No social features that expose your data to other users
- No data sold to advertisers (Rolo's business model is subscription, not ads)
- You can delete any profile or all data instantly

### Why This Is the Opposite of Social Media
| | Social Media | Rolo |
|---|---|---|
| Who creates the data? | The platform harvests it from everyone | You provide your own knowledge |
| Who sees it? | Everyone (or advertisers) | Only you |
| What's the business model? | Sell your attention and data | Subscription (you're the customer, not the product) |
| What's the goal? | Keep you scrolling | Get you off the app and into a real conversation |

---

## 6. Stretch Features (Mention in Pitch as Vision)

These show judges the product's full potential even if not built in 6 hours:

### 6.1 Text/iMessage Analysis
- With user permission, analyze messaging patterns to detect:
  - Friends who text you that you haven't responded to
  - Recurring topics someone brings up (they care about these things)
  - Frequency decay — friends you used to text daily that you now text monthly
- All analysis happens on-device, no messages stored on servers

### 6.2 Smart Reminders
- "You told Rolo you want to stay close with Jake, but you haven't reached out in 3 weeks"
- "Maya mentioned her job interview was this week — check in on how it went"
- Contextual nudges: "It's Friday evening — good time to make weekend plans with your inner circle"

### 6.3 Relationship Health Score
- Composite metric: interaction frequency, reciprocity, conversation depth, alignment between desired closeness and actual closeness
- Weekly digest: "3 inner-circle friends are drifting — here's who to reach out to"

### 6.4 Group Dynamics
- See friend groups as clusters
- Identify friends who don't know each other but might get along
- Plan group hangouts with AI-suggested activities based on shared interests

---

## 7. Technical Architecture

### 7.1 Stack
| Layer | Technology | Rationale |
|-------|-----------|-----------|
| Frontend | React (JSX) | Fast to build, team knows it |
| Voice Input | Web Speech API (browser-native) | Zero dependencies, works on mobile browsers |
| AI Processing | Claude API (Sonnet) | Structured extraction from voice, outreach suggestions, batch splitting |
| Data Storage | localStorage + React state | No backend DB needed for hackathon demo |
| Styling | Tailwind CSS | Rapid UI development |

### 7.2 System Flow
```
[User speaks into mic]
        ↓
[Web Speech API → transcript text]
        ↓
[Send to Claude API with structured extraction prompt]
        ↓
[Claude returns JSON — single profile or array of profiles if batch]
        ↓
[Store in React state + localStorage]
        ↓
[Dashboard renders contact cards in Rolo rings with drift indicators]
        ↓
[User actions from dashboard:]
  → Tap contact → "Reach Out" → Claude generates outreach suggestions
  → Tap contact → "Plan a Meetup" → Claude generates hangout ideas
  → Select multiple → "Plan Group Hangout" → Claude finds overlap + suggests plans
  → Tap "Reconnect" → Select drifting friends → Claude drafts all messages at once
        ↓
[User copies messages, reaches out IRL]
        ↓
[Returns to voice-log the interaction → profiles update → drift resets]
```

### 7.3 Key API Prompts

**Voice-to-Profile Prompt (Single or Batch):**
```
You are Rolo, a personal relationship intelligence assistant. The user just 
recorded a voice memo about one or more people in their life. 

If the transcript mentions MULTIPLE distinct people, create a separate profile 
for each. Return an array of profiles.

For each person, extract:
- name (string)
- relationship_type (friend, family, colleague, mentor, acquaintance)
- how_we_met (string, if mentioned)
- interests (array of strings)
- work (string: company + role if mentioned)
- birthday (date string if mentioned, null otherwise)
- significant_other (string if mentioned)
- last_interaction (object: approximate_date string, description string)
- open_threads (array: things to follow up on — infer these from context)
- life_updates (array: recent changes or events in their life)
- tags (array: auto-generated relevant labels like "college", "gym buddy")
- importance (1-5 scale, inferred from emotional language, detail level, and 
  how the user talks about them)
- memory_jog_suggestions (array: prompts like "Anyone else from [group]?")

Return valid JSON only. For open_threads, actively infer follow-up 
opportunities even if the user doesn't explicitly state them. If someone 
"just started" a job, an open thread is "ask how the new job is going." 
If someone is "training for" something, the thread is "ask how it went."
```

**Outreach Suggestion Prompt:**
```
You are a thoughtful friend helping someone maintain their relationships. 
Given this contact profile:

{contact_json}

Today's date is {date}. Days since last interaction: {days_ago}.

Generate 3 specific, natural outreach suggestions. Each must:
1. Reference something specific from the profile (never generic)
2. Sound like advice from a close friend, not a CRM notification
3. Include a draft message they could copy and text/send
4. Vary in effort: one quick text, one phone call idea, one in-person hangout

Return as JSON array: 
[{ type, suggestion, draft_message, reasoning }]
```

**Birthday Message Prompt:**
```
Generate a birthday message for this person based on what the user knows 
about them. It should feel personal and specific — reference their interests, 
recent life events, or inside context. Never generic. Keep it casual and warm.

Profile: {contact_json}

Return: { message: string, personalization_note: string }
```

**Meetup Suggestion Prompt (1-on-1):**
```
You are a thoughtful friend helping someone plan a hangout. Given this 
contact profile:

{contact_json}

Today's date is {date}. Days since last seen: {days_ago}.

Generate 3 meetup suggestions. Each must:
1. Be based on the person's specific interests, location, or life situation
2. Include a concrete activity, suggested day/time, and location if possible
3. Vary in effort level: one spontaneous/low-effort, one activity-based, 
   one proper catch-up
4. Include a draft invite message they could text

Return as JSON array:
[{ type, activity, suggestion, draft_invite, effort_level }]
```

**Group Hangout Prompt:**
```
You are helping someone plan a group hangout. Here are the profiles of 
the friends they want to bring together:

{contacts_json_array}

Today's date is {date}.

Analyze the group and suggest 2 group activity ideas. For each:
1. Find overlapping interests or compatible energy levels across the group
2. Suggest a concrete plan (activity + location + time)
3. Explain why this works for the specific mix of people
4. Write a casual group text message they could send to everyone

Return as JSON array:
[{ activity, plan, why_it_works, draft_group_text }]
```

**Batch Reconnect Prompt:**
```
You are helping someone reconnect with multiple friends they've been 
neglecting. For each contact below, generate a personalized reconnect 
message.

Contacts:
{contacts_json_array}

Rules:
1. Each message must reference something SPECIFIC from that person's 
   profile (an interest, life event, open thread, or shared memory)
2. Messages should feel natural and casual — like a real text, not a 
   template
3. Vary the tone and approach — don't start every message the same way
4. Keep messages under 2-3 sentences — long texts feel forced
5. No two messages should have the same structure or opening

Return as JSON array:
[{ contact_name, draft_message, personalization_note }]
```

---

## 8. UI/UX Design Direction

### 8.1 Design Principles
- **Warm, not corporate** — Friendships, not sales leads. No CRM aesthetics.
- **Voice-first** — Primary input is speaking, not typing. Big mic button, minimal forms.
- **Outward-facing** — Every screen pushes toward action (reaching out), not toward time-in-app.
- **Anti-engagement** — Success = how little you use Rolo, because you're busy with friends.
- **Zero-guilt onboarding** — Never make the user feel like they need to add everyone. Start with 5.

### 8.2 Key Screens (Hackathon MVP)

**Screen 1: First Launch / "Start With Five"**
- Warm welcome: "Rolo helps you stay close to the people who matter."
- Prompt: "Think of 5 people you've been meaning to reach out to."
- Option to import contacts (skeleton profiles) or skip
- Big mic button: "Tell me about them"
- Progress: 0/5 → fills up as profiles are created

**Screen 2: The Rolo (Home Dashboard)**
- Your name/avatar in the center
- Contacts arranged in concentric rings by importance
  - Inner ring: closest (importance 4–5)
  - Middle ring: good friends (importance 3)
  - Outer ring: acquaintances (importance 1–2)
- Drifting contacts fade in opacity — the longer the silence, the more they disappear
- Tapping a contact opens their profile
- Floating action button: mic icon for adding/updating
- Top bar: birthday countdown ticker ("Maya's birthday in 3 days")
- Quick stats bar: "23 people · 7 drifting · 2 birthdays this week"

**Screen 3: Voice Input (Full Screen)**
- Clean recording interface — waveform animation while speaking
- Live transcript appearing as user speaks
- "Done" button → processes transcript
- Loading state: "Building profile..." with extracted details appearing one by one
- If batch detected: "Found 3 people in your recording" → shows all three cards

**Screen 4: Contact Profile**
- Name, photo (from contacts or placeholder), relationship type badge
- Key details cards: Work, Interests, Birthday, Significant Other
- "Open Threads" section with actionable items
- Interaction timeline (most recent first)
- Two action buttons:
  - "Reach Out" → triggers AI outreach suggestions
  - "Update" → opens voice recorder to log new info

**Screen 5: Outreach Suggestions**
- 3 cards, each with: type icon (text/call/hangout), suggestion text, draft message
- "Copy Message" button on each card
- "I Reached Out" button → logs interaction, resets drift timer, prompts for voice update

**Screen 6: Meetup Planner (1-on-1)**
- Triggered from contact profile → "Plan a Meetup" button
- 3 hangout idea cards, each with: activity type, concrete plan, draft invite
- "Copy Invite" button on each
- "I Made Plans" button → logs upcoming meetup on the contact's timeline

**Screen 7: Group Hangout Planner**
- Multi-select screen: pick 2–5 friends from your Rolo
- "Plan Something" button → AI analyzes the group
- Shows: interest overlap summary ("Jake and Chris both like active stuff, Maya loves food")
- 2 group activity suggestions with draft group text
- "Copy Group Text" button

**Screen 8: Batch Reconnect**
- Triggered from dashboard when 3+ friends are drifting, or manually via "Reconnect" button
- Select which drifting friends to include (checkboxes, pre-selects all drifting)
- "Draft Messages" → AI generates personalized message for each
- Scrollable list of draft cards: friend name, their last interaction date, the draft message
- "Edit" to tweak any draft, "Copy" to grab it for texting
- "Mark All Sent" to log interactions and reset drift timers

**Screen 9: Birthdays**
- Chronological list of upcoming birthdays
- Each entry shows: name, date, countdown, and a pre-generated personal message
- "Send" copies message to clipboard

---

## 9. Hackathon Demo Script (5 minutes)

### Opening — The Personal Hook (45 seconds)
"In six months, I'm heading to NYU. My best friends are scattering — Jake's going to Michigan, Maya's at Columbia, Chris is staying home. Every friendship I have is about to go long-distance. And here's the thing — I *know* I'm going to lose some of them. Not because I don't care, but because life gets busy, and out of sight becomes out of mind. Social media will trick me into thinking I'm staying connected — I'll see their stories, like their posts — but I won't actually *talk* to them. That's the illusion. And it's already happening to all of us."

### The Problem — Zoom Out (30 seconds)
"The Surgeon General called loneliness an epidemic. Our generation has more followers than ever and fewer real friendships. COVID replaced real connection with screens, and the algorithms kept it that way — because your attention on their platform is worth more than your friendship with Jake. That's the dark side of AI in the attention economy."

### The Product — Live Demo (90 seconds)
"This is Rolo — short for Rolodex. Your AI-powered friendship keeper."

[Show the "Start With Five" screen]
"Rolo doesn't ask you to catalog your whole life. It says: think of 5 people you've been meaning to reach out to. That's it."

[Hit the mic button, speak for 15 seconds about a friend]
[Show the AI-generated profile appearing — name, interests, open threads, everything structured]
"I talked for 15 seconds. Rolo now knows enough to help me be a better friend to Jake."

[Show the dashboard — contacts in rings, some fading]
"This is my Rolo. See how Jake is fading? That means I haven't reached out in a while. He's literally drifting out of my orbit. And look — Maya's birthday is in 3 days and Rolo already wrote a personal message referencing her getting into Columbia Law."

[Tap the "Reconnect" button — show 4 drifting friends selected]
"Here's the killer feature. I've got 4 friends drifting right now. I hit Reconnect, and Rolo drafts a personalized message for every single one of them — each one referencing something specific I told the app about that person. Jake gets asked about his climbing comp. Maya gets congratulated on Columbia. No two messages are the same. I just review, copy, and send. What used to take 20 minutes of staring at blank text boxes now takes 30 seconds."

[Tap Jake → show "Plan a Meetup" → show hangout suggestions]
"And Rolo doesn't just help me text — it helps me actually see people. I tap Jake, hit 'Plan a Meetup,' and it knows he loves climbing and works in FiDi, so it suggests a bouldering gym nearby this weekend."

### The Tension (45 seconds)
"Here's the tension we're exploring. The AI that powers Instagram's algorithm — the one that decided you should see a stranger's vacation photo instead of reminding you to call your best friend — that same technology powers Rolo. We're using the same AI, but optimizing for the opposite outcome. Instagram optimizes for time-on-screen. Rolo optimizes for time-with-friends. We built an app whose measure of success is how *little* you use it."

### Addressing Privacy (20 seconds)
"Someone might ask — isn't it creepy to keep files on your friends? But you already have this information. It's just scattered across your memory, your texts, and your Notes app. Rolo doesn't collect data about other people — it organizes *your own knowledge* about *your own relationships.* No one sees your Rolo but you. There's no feed, no followers. It's a private journal for your friendships."

### Close (15 seconds)
"Rolo is AI that makes you more human, not less. Every notification is a push outward — toward a phone call, a coffee, a text that says 'I was thinking about you.' That's the version of AI we want to build."

---

## 10. Build Plan (6-Hour Sprint)

| Time | Task | Dev 1 | Dev 2 |
|------|------|-------|-------|
| 10:30–11:00 | Setup | React project, Tailwind, routing | Claude API integration, voice prompt engineering |
| 11:00–12:00 | Core Build | Voice input screen + Web Speech API | AI profile extraction (single + batch), JSON parsing |
| 12:00–13:00 | LUNCH | Discuss UI, refine prompts, plan dashboard layout | |
| 13:00–14:00 | Dashboard + Profiles | Rolo rings visualization + drift indicators | Contact profile page + outreach suggestions |
| 14:00–15:00 | Key Features | Batch Reconnect screen (multi-select + draft list) | Meetup suggestion UI + group hangout planner |
| 15:00–15:45 | Polish | End-to-end testing, bug fixes | Pre-load 8–10 demo contacts with rich data |
| 15:45–16:15 | Rehearse | Run through pitch 3x, time it, refine | Ensure demo flow is smooth, have backup data |
| 16:15–16:30 | Submit | Final submission | |

### Must-Have for Demo (Cut Everything Else If Needed)
1. **Voice-to-profile** — The hero moment. Must work flawlessly.
2. **Dashboard with drift visualization** — The emotional hook. Fading friends = powerful visual.
3. **Batch Reconnect** — The "wow" moment. Draft personalized messages for all drifting friends at once.
4. **Outreach suggestions (single contact)** — Shows the AI is genuinely useful for individual reach-outs.

### Nice-to-Have (Build If Time Permits)
5. Meetup suggestions (1-on-1 hangout planner)
6. Group hangout planner (multi-friend activity matcher)
7. Birthday tracker with personal messages
8. Batch voice dump (multiple people in one recording)
9. Interaction logger / voice update

### Pre-Demo Prep (Critical)
- Pre-load 8–10 contacts with rich data so the dashboard looks full and alive
- Have 2–3 contacts already "drifting" to show the visual effect
- Set one birthday to be 2–3 days away
- Pre-test voice-to-profile with 5 different inputs to ensure reliability
- Have one completely live voice creation ready for the demo (practice the 15-second speech)

### Risk Mitigation
| Risk | Mitigation |
|------|-----------|
| Web Speech API fails on demo day | Pre-record a transcript, paste it in as fallback. Note "voice-first in production" |
| Claude API slow/down | Pre-cache one profile creation result and one batch reconnect result. Do one live, one cached |
| Time crunch (behind schedule) | Cut meetup planner + group hangout + birthday tracker. Voice-to-profile, dashboard, and batch reconnect are the three demo moments that win it |
| Wi-Fi issues at venue | Test on phone hotspot. Pre-load demo data that doesn't need API |
| Batch reconnect feels generic | Test with 5+ different contact profiles. Refine prompt to ensure no two messages share structure or opening |

---

## 11. Competitive Landscape

| Product | What It Does | Why Rolo Wins |
|---------|-------------|---------------|
| Apple Contacts | Static contact list | Zero intelligence, no relationship tracking, no AI, no voice |
| Instagram/Facebook | Social feed | Passive consumption, not active connection. The problem, not the solution |
| Clay (clay.earth) | Professional CRM | Built for networking and sales. $20/month. Corporate feel |
| Dex (getdex.com) | Personal CRM | Manual data entry kills adoption. No voice input. No AI suggestions |
| Monica HQ | Open-source personal CRM | Complex self-hosted setup. No voice. No AI. High friction |

**Rolo's advantages:**
- **Voice-first** = zero friction (talk, don't type)
- **AI-powered profile creation** = no manual entry
- **"Start With Five"** = no overwhelming onboarding
- **Batch Reconnect** = draft personalized messages for all drifting friends in one tap
- **Meetup planner** = turns relationship data into real-world plans
- **Group hangout matching** = finds what friends have in common and builds plans around it
- **Friendship-optimized** = warm, personal, not a sales tool
- **Anti-engagement design** = pushes you out of the app

---

## 12. Judging Criteria Alignment

The judges will ask: *"What harmful pattern exists today — and how does your product push the other direction?"*

| Criteria | Rolo's Answer |
|----------|---------------|
| **Clear harmful pattern** | AI-powered social media replaced genuine connection with passive scrolling. Loneliness epidemic. |
| **Product pushes the other direction** | Same AI technology actively rebuilds real relationships through voice capture, drift detection, and personalized outreach |
| **AI-native** | Voice-to-profile extraction, batch person splitting, personalized outreach generation, batch reconnect drafting, meetup planning, group hangout matching, birthday messages, drift detection |
| **Dual nature of AI** | Instagram AI keeps you scrolling past friends. Rolo AI makes you call them. Same tech, opposite goals. |
| **Real-world usefulness** | Every person in the room has friends they've been meaning to reach out to |
| **Demo-ability** | Voice input → instant profile (wow moment). Fading friends on dashboard (emotional hook). Batch reconnect drafts 4 personalized messages at once (practical power). Meetup planner turns knowledge into real-world plans. |
| **Personal narrative** | Builder is heading to college in 6 months — every friendship going long-distance. Rolo is how he keeps them. |

---

## 13. Key Pitch Lines to Rehearse

- "Social media uses AI to keep you scrolling past your friends. Rolo uses AI to make you call them."
- "We built an app whose measure of success is how little you use it."
- "In six months every friendship I have goes long-distance. Rolo is how I make sure I don't lose them."
- "Rolo doesn't collect data about other people. It organizes your own knowledge about your own relationships. It's a diary for your friendships, not a social network."
- "Instagram optimizes for time-on-screen. Rolo optimizes for time-with-friends."
- "Don't add everyone. Start with five people you've been meaning to reach out to. Three minutes. That's it."
- "Every notification Rolo sends is a push outward — toward a phone call, a coffee, a text that says 'I was thinking about you.'"
- "What used to take 20 minutes of staring at blank text boxes — figuring out what to say to 5 friends you've been neglecting — Rolo does in 30 seconds."
- "Rolo doesn't just help you remember your friends. It helps you actually see them — with meetup ideas based on what they love, where they are, and how long it's been."
- "Select three friends, hit 'Plan a Group Hangout,' and Rolo finds what they have in common and builds a plan around it."
