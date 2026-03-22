// Fallback data for demo if API fails or is slow

export const fallbackProfileExtraction = [
  {
    name: "Sample Friend",
    relationship_type: "friend",
    how_we_met: "College",
    interests: ["Music", "Cooking", "Travel"],
    work: "Software Engineer at Tech Co",
    birthday: "1998-06-15",
    significant_other: null,
    last_interaction: {
      approximate_date: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
      description: "Had coffee and caught up"
    },
    open_threads: [
      "Ask about new job",
      "Plan weekend trip together"
    ],
    life_updates: [
      "Just moved to new apartment",
      "Started learning guitar"
    ],
    tags: ["College", "Friend"],
    importance: 4
  }
];

export const fallbackOutreachSuggestions = [
  {
    type: "text",
    suggestion: "Send a quick text to check in and reference something specific from their life",
    draft_message: "Hey! Been thinking about you. How's everything going? Would love to catch up soon!",
    reasoning: "Simple and warm opening that shows you care"
  },
  {
    type: "call",
    suggestion: "Give them a call when you have 15-20 minutes free",
    draft_message: "Call them during a time when you can have a relaxed conversation",
    reasoning: "Voice connection is more personal than text"
  },
  {
    type: "hangout",
    suggestion: "Suggest meeting up in person to reconnect properly",
    draft_message: "Hey! Want to grab coffee or lunch sometime this week? It's been too long!",
    reasoning: "In-person connection is the strongest way to rebuild the relationship"
  }
];

export const fallbackBirthdayMessage = {
  message: "Happy birthday! Hope you have an amazing day! Let's celebrate soon 🎉"
};
