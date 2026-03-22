// Helper function to get date N days ago
const daysAgo = (days) => new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();

// Helper function to get date N days from now
const daysFromNow = (days) => new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

export const seedContacts = [
  // Inner circle - High importance (4-5), drifting
  {
    id: crypto.randomUUID(),
    name: "Jake Thompson",
    relationship_type: "friend",
    how_we_met: "High school",
    interests: ["Rock climbing", "Tech", "Hiking"],
    work: "Goldman Sachs - Tech Division",
    birthday: "1999-03-15",
    significant_other: "Sarah",
    last_interaction: {
      approximate_date: daysAgo(60),
      description: "Dinner in NYC, talked about his climbing competition"
    },
    open_threads: [
      "Ask how climbing comp went",
      "Follow up on Goldman team switch",
      "Ask about moving in with Sarah"
    ],
    life_updates: [
      "Just started at Goldman Sachs",
      "Training for climbing competition",
      "Moving in with Sarah soon"
    ],
    tags: ["High school", "Close friend"],
    importance: 5,
    created_at: Date.now()
  },

  // Inner circle - Birthday coming up
  {
    id: crypto.randomUUID(),
    name: "Maya Chen",
    relationship_type: "friend",
    how_we_met: "College roommates",
    interests: ["Law", "Reading", "Trying new restaurants"],
    work: "Columbia Law School (Student)",
    birthday: daysFromNow(3), // 3 days from now
    significant_other: null,
    last_interaction: {
      approximate_date: daysAgo(14),
      description: "Coffee catch-up, she's excited about Columbia Law"
    },
    open_threads: [
      "Congratulate on Columbia Law acceptance"
    ],
    life_updates: [
      "Got into Columbia Law",
      "Starting this fall",
      "Looking for apartments near campus"
    ],
    tags: ["College", "Close friend"],
    importance: 5,
    created_at: Date.now()
  },

  // Inner circle - Recent contact
  {
    id: crypto.randomUUID(),
    name: "Alex Rivera",
    relationship_type: "friend",
    how_we_met: "Gym",
    interests: ["Fitness", "Basketball", "Cooking"],
    work: "Personal Trainer at Equinox",
    birthday: "1998-07-22",
    significant_other: null,
    last_interaction: {
      approximate_date: daysAgo(5),
      description: "Basketball at the park, planning to cook dinner next week"
    },
    open_threads: [
      "Plan dinner together next week"
    ],
    life_updates: [
      "Got promoted to head trainer",
      "Thinking about starting own fitness business"
    ],
    tags: ["Gym", "Close friend"],
    importance: 5,
    created_at: Date.now()
  },

  // Inner circle - Family
  {
    id: crypto.randomUUID(),
    name: "Emma (Sister)",
    relationship_type: "family",
    how_we_met: "Family",
    interests: ["Art", "Photography", "Travel"],
    work: "Freelance Graphic Designer",
    birthday: "2001-11-08",
    significant_other: "Jordan",
    last_interaction: {
      approximate_date: daysAgo(7),
      description: "Sunday family dinner, showed us her latest design project"
    },
    open_threads: [
      "Ask about the design project for tech startup",
      "See if she needs help with portfolio website"
    ],
    life_updates: [
      "Got a big client - tech startup rebrand",
      "Planning trip to Japan in summer"
    ],
    tags: ["Family", "Sister"],
    importance: 5,
    created_at: Date.now()
  },

  // Middle ring - Colleague, drifting
  {
    id: crypto.randomUUID(),
    name: "Chris Martinez",
    relationship_type: "colleague",
    how_we_met: "Work",
    interests: ["Gaming", "Coffee", "Podcasts"],
    work: "Software Engineer at Microsoft",
    birthday: "1997-04-12",
    significant_other: null,
    last_interaction: {
      approximate_date: daysAgo(75),
      description: "Grabbed coffee after work, discussed new project"
    },
    open_threads: [
      "Ask how the migration project is going"
    ],
    life_updates: [
      "Leading database migration project",
      "Thinking about switching teams"
    ],
    tags: ["Work", "Colleague"],
    importance: 3,
    created_at: Date.now()
  },

  // Middle ring - College friend
  {
    id: crypto.randomUUID(),
    name: "Priya Patel",
    relationship_type: "friend",
    how_we_met: "College",
    interests: ["Medicine", "Cooking", "Yoga"],
    work: "Medical Student at Mount Sinai",
    birthday: "1999-09-30",
    significant_other: null,
    last_interaction: {
      approximate_date: daysAgo(45),
      description: "Video call, she's stressed about exams but doing well"
    },
    open_threads: [
      "Check in about med school exams",
      "Try that new Thai restaurant she mentioned"
    ],
    life_updates: [
      "Finishing second year of med school",
      "Considering specializing in pediatrics",
      "Started teaching yoga on weekends"
    ],
    tags: ["College", "Friend"],
    importance: 4,
    created_at: Date.now()
  },

  // Middle ring - Friend from home
  {
    id: crypto.randomUUID(),
    name: "David Kim",
    relationship_type: "friend",
    how_we_met: "Neighborhood",
    interests: ["Music", "Guitar", "Songwriting"],
    work: "Music Teacher",
    birthday: "1998-02-18",
    significant_other: "Lisa",
    last_interaction: {
      approximate_date: daysAgo(30),
      description: "Went to his band's show, they were great"
    },
    open_threads: [
      "Ask about the EP recording",
      "Plan to catch another show"
    ],
    life_updates: [
      "Band is recording first EP",
      "Got engaged to Lisa",
      "Looking for bigger venue for shows"
    ],
    tags: ["Neighborhood", "Friend", "Music"],
    importance: 3,
    created_at: Date.now()
  },

  // Outer ring - Acquaintance
  {
    id: crypto.randomUUID(),
    name: "Sam Johnson",
    relationship_type: "acquaintance",
    how_we_met: "Mutual friend party",
    interests: ["Marketing", "Social media"],
    work: "Social Media Manager",
    birthday: null,
    significant_other: null,
    last_interaction: {
      approximate_date: daysAgo(90),
      description: "Met at party, exchanged numbers"
    },
    open_threads: [],
    life_updates: [],
    tags: ["Acquaintance"],
    importance: 2,
    created_at: Date.now()
  },

  // Outer ring - Mentor, infrequent but valuable
  {
    id: crypto.randomUUID(),
    name: "Dr. Sarah Williams",
    relationship_type: "mentor",
    how_we_met: "University advisor",
    interests: ["Research", "Teaching", "Writing"],
    work: "Professor at NYU",
    birthday: null,
    significant_other: null,
    last_interaction: {
      approximate_date: daysAgo(120),
      description: "Coffee meeting to discuss career advice"
    },
    open_threads: [
      "Send update on job search",
      "Ask for recommendation letter"
    ],
    life_updates: [
      "Published new book on AI ethics"
    ],
    tags: ["Mentor", "University"],
    importance: 4,
    created_at: Date.now()
  },

  // Middle ring - Birthday in past (for testing)
  {
    id: crypto.randomUUID(),
    name: "Rachel Foster",
    relationship_type: "friend",
    how_we_met: "Dance class",
    interests: ["Dance", "Fashion", "Travel"],
    work: "Fashion Buyer at Nordstrom",
    birthday: daysFromNow(10), // 10 days from now
    significant_other: null,
    last_interaction: {
      approximate_date: daysAgo(20),
      description: "Went to dance class together"
    },
    open_threads: [
      "Plan birthday celebration"
    ],
    life_updates: [
      "Got promoted to senior buyer",
      "Planning trip to Paris Fashion Week"
    ],
    tags: ["Dance", "Friend"],
    importance: 3,
    created_at: Date.now()
  }
];

export function loadSeedData() {
  return seedContacts;
}
