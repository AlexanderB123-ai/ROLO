// Helper function to get date N days ago
const daysAgo = (days) => new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();

// Helper function to get date N days from now
const daysFromNow = (days) => new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

export const seedContacts = [
  // ============================================================
  // IMPORTANCE 5 — Inner Circle (8 contacts)
  // ============================================================
  {
    id: 'seed-contact-1',
    name: "Marcus Thompson",
    relationship_type: "friend",
    how_we_met: "Best friend since freshman year at Stuyvesant High School. Sat next to each other in AP Calc and never stopped talking.",
    interests: ["Rock climbing", "Mechanical keyboards", "Hip-hop production"],
    work: "Junior Software Engineer at Datadog",
    birthday: "2004-06-15",
    significant_other: "Aisha",
    last_interaction: {
      approximate_date: daysAgo(3),
      description: "Grabbed ramen at Ichiran after work, talked about his plan to propose to Aisha"
    },
    open_threads: [
      "Ask if he found a ring yet",
      "Send him that climbing gym groupon I saw",
      "Follow up on whether Datadog approved his transfer to the platform team"
    ],
    life_updates: [
      "Planning to propose to Aisha this summer",
      "Got his first patent filed at Datadog",
      "Training for a V7 boulder problem at Brooklyn Boulders"
    ],
    tags: ["High school", "Best friend", "Tech"],
    importance: 5,
    created_at: Date.now(),
    interactions: [
      { date: daysAgo(3).split('T')[0], summary: "Ramen at Ichiran, he showed me the ring styles he's considering" },
      { date: daysAgo(10).split('T')[0], summary: "Climbing session at Brooklyn Boulders, he sent his V6 project" },
      { date: daysAgo(22).split('T')[0], summary: "Double date with him and Aisha — Korean BBQ in K-Town" },
      { date: daysAgo(45).split('T')[0], summary: "Helped him prep for his Datadog performance review" }
    ]
  },
  {
    id: 'seed-contact-2',
    name: "Sofia Reyes",
    relationship_type: "friend",
    how_we_met: "College roommate freshman year at NYU. She's from San Juan and we bonded over being homesick the first week.",
    interests: ["Poetry", "Salsa dancing", "Thrift shopping"],
    work: "Editorial Assistant at Penguin Random House",
    birthday: daysFromNow(2),
    significant_other: null,
    last_interaction: {
      approximate_date: daysAgo(6),
      description: "Went to a poetry open mic at Nuyorican Poets Cafe, she performed a new piece"
    },
    open_threads: [
      "Plan her birthday dinner — she wants to try that new Peruvian spot in the Village",
      "Read the short story she sent me last week",
      "Ask if she heard back from the Iowa Writers' Workshop"
    ],
    life_updates: [
      "Applied to Iowa Writers' Workshop MFA program",
      "Got a poem published in The New Yorker — huge deal",
      "Moving to a new apartment in Bushwick next month"
    ],
    tags: ["College", "Close friend", "Creative"],
    importance: 5,
    created_at: Date.now(),
    interactions: [
      { date: daysAgo(6).split('T')[0], summary: "Poetry open mic at Nuyorican, her piece about her grandmother was incredible" },
      { date: daysAgo(15).split('T')[0], summary: "Helped her pack boxes for the Bushwick move" },
      { date: daysAgo(28).split('T')[0], summary: "Celebrated her New Yorker poem over wine at her place" },
      { date: daysAgo(50).split('T')[0], summary: "Salsa dancing at SOBs for her cousin's birthday" }
    ]
  },
  {
    id: 'seed-contact-3',
    name: "Daniel Park",
    relationship_type: "friend",
    how_we_met: "High school basketball team. He was point guard, I was shooting guard. Still play pickup together.",
    interests: ["Basketball", "Sneaker collecting", "Day trading"],
    work: "Analyst at JPMorgan Chase",
    birthday: "2004-01-09",
    significant_other: null,
    last_interaction: {
      approximate_date: daysAgo(2),
      description: "Pickup basketball at West 4th Street courts, then got Halal Guys after"
    },
    open_threads: [
      "He wants to start a sneaker resale side hustle — see if he's serious",
      "Ask how his CFA studying is going"
    ],
    life_updates: [
      "Studying for the CFA Level 1 exam",
      "Moved to a studio in FiDi to be closer to the office",
      "His dad's dry cleaning business is expanding to a second location"
    ],
    tags: ["High school", "Basketball", "Close friend"],
    importance: 5,
    created_at: Date.now(),
    interactions: [
      { date: daysAgo(2).split('T')[0], summary: "Pickup ball at West 4th, he crossed me up twice" },
      { date: daysAgo(9).split('T')[0], summary: "Watched Knicks game at his place with wings and beer" },
      { date: daysAgo(18).split('T')[0], summary: "Helped him set up his new apartment in FiDi" },
      { date: daysAgo(35).split('T')[0], summary: "Late night diner run, talked about his dad's business" }
    ]
  },
  {
    id: 'seed-contact-4',
    name: "Leila Adebayo",
    relationship_type: "family",
    how_we_met: "Family — older sister. Three years ahead of me, always looking out.",
    interests: ["Interior design", "Marathon running", "Documentary films"],
    work: "UX Designer at Spotify",
    birthday: "2001-08-20",
    significant_other: "Tomás",
    last_interaction: {
      approximate_date: daysAgo(1),
      description: "FaceTime call — she's stressed about planning her engagement party"
    },
    open_threads: [
      "Help her pick a venue for the engagement party",
      "Send her that documentary about Dieter Rams she'd love",
      "Ask how training for the Brooklyn Half is going"
    ],
    life_updates: [
      "Got engaged to Tomás in December",
      "Leading a major redesign of Spotify's playlist experience",
      "Training for the Brooklyn Half Marathon in May"
    ],
    tags: ["Family", "Sister"],
    importance: 5,
    created_at: Date.now(),
    interactions: [
      { date: daysAgo(1).split('T')[0], summary: "FaceTime about engagement party venues" },
      { date: daysAgo(7).split('T')[0], summary: "Sunday family dinner at Mom and Dad's" },
      { date: daysAgo(14).split('T')[0], summary: "Went to a furniture store with her to pick out a couch" },
      { date: daysAgo(30).split('T')[0], summary: "Her birthday dinner at Carbone — the whole family came" }
    ]
  },
  {
    id: 'seed-contact-5',
    name: "James Adebayo",
    relationship_type: "family",
    how_we_met: "Family — Dad. Nigerian immigrant, came to NYC in the 90s. Works harder than anyone I know.",
    interests: ["Chess", "Nigerian cooking", "Jazz"],
    work: "Civil Engineer at AECOM",
    birthday: "1972-03-04",
    significant_other: "Grace",
    last_interaction: {
      approximate_date: daysAgo(4),
      description: "Sunday dinner at home, he made jollof rice and we played chess after"
    },
    open_threads: [
      "Ask about his project — the new bridge inspection in Jersey",
      "Plan a father-son jazz night at Blue Note"
    ],
    life_updates: [
      "Got a commendation from his firm for the Hudson Yards infrastructure work",
      "Talking about retiring in 5 years and maybe going back to Lagos part-time"
    ],
    tags: ["Family", "Dad"],
    importance: 5,
    created_at: Date.now(),
    interactions: [
      { date: daysAgo(4).split('T')[0], summary: "Sunday dinner, jollof rice and chess — he won in 22 moves" },
      { date: daysAgo(11).split('T')[0], summary: "Drove him to Home Depot for the bathroom renovation supplies" },
      { date: daysAgo(18).split('T')[0], summary: "Watched a jazz documentary together on the couch" }
    ]
  },
  {
    id: 'seed-contact-6',
    name: "Grace Adebayo",
    relationship_type: "family",
    how_we_met: "Family — Mom. Nurse at NYU Langone. The most caring person alive.",
    interests: ["Gardening", "Gospel music", "Nollywood movies"],
    work: "Registered Nurse at NYU Langone",
    birthday: "1975-10-17",
    significant_other: "James",
    last_interaction: {
      approximate_date: daysAgo(4),
      description: "Sunday dinner, she asked me about my classes and whether I'm eating enough"
    },
    open_threads: [
      "Help her set up the rooftop garden this spring",
      "Send her that gospel playlist I found on Spotify"
    ],
    life_updates: [
      "Got her 20-year pin at NYU Langone",
      "Starting a community garden project in the neighborhood",
      "Wants to visit her sister in Houston this summer"
    ],
    tags: ["Family", "Mom"],
    importance: 5,
    created_at: Date.now(),
    interactions: [
      { date: daysAgo(4).split('T')[0], summary: "Sunday dinner, she packed me leftovers as usual" },
      { date: daysAgo(8).split('T')[0], summary: "Called to check in, she told me about the garden project" },
      { date: daysAgo(14).split('T')[0], summary: "Helped her FaceTime Auntie Nkem in Houston" }
    ]
  },
  {
    id: 'seed-contact-7',
    name: "Nina Vasquez",
    relationship_type: "friend",
    how_we_met: "Study abroad prep program junior year. She's from the Bronx but we connected over both being nervous about traveling.",
    interests: ["Photography", "Hiking", "True crime podcasts"],
    work: "Photographer's Assistant at a SoHo studio",
    birthday: daysFromNow(5),
    significant_other: null,
    last_interaction: {
      approximate_date: daysAgo(8),
      description: "She shot my new headshots in Central Park, looked amazing"
    },
    open_threads: [
      "Plan her birthday — she mentioned wanting to do karaoke in K-Town",
      "Ask if she booked the gig shooting that wedding in the Catskills",
      "See the final edits of my headshots"
    ],
    life_updates: [
      "Building her photography portfolio to go freelance full-time",
      "Got her first paid wedding photography gig",
      "Adopted a cat named Frida"
    ],
    tags: ["Close friend", "Creative", "Bronx"],
    importance: 5,
    created_at: Date.now(),
    interactions: [
      { date: daysAgo(8).split('T')[0], summary: "Headshot session in Central Park, then iced coffee at Think" },
      { date: daysAgo(20).split('T')[0], summary: "Walked around the Met together, she was scouting shoot locations" },
      { date: daysAgo(40).split('T')[0], summary: "Movie night at her place, watched Rear Window" },
      { date: daysAgo(65).split('T')[0], summary: "Helped her build her photography website" }
    ]
  },
  {
    id: 'seed-contact-8',
    name: "Ethan Nakamura",
    relationship_type: "friend",
    how_we_met: "CS study group freshman year at NYU. Pulled all-nighters together in Bobst Library more times than I can count.",
    interests: ["Game development", "Anime", "Ramen"],
    work: "Game Developer Intern at Riot Games (starting this summer)",
    birthday: "2004-12-03",
    significant_other: null,
    last_interaction: {
      approximate_date: daysAgo(5),
      description: "Pair-programmed on our hackathon project at his apartment"
    },
    open_threads: [
      "Help him prep for the Riot Games internship — starts in June",
      "Play the indie game he's been developing",
      "Plan a ramen crawl before he leaves for LA"
    ],
    life_updates: [
      "Got the Riot Games internship offer — moving to LA for the summer",
      "Shipping his first indie game on itch.io",
      "Won the NYU Game Center showcase award"
    ],
    tags: ["College", "CS", "Close friend"],
    importance: 5,
    created_at: Date.now(),
    interactions: [
      { date: daysAgo(5).split('T')[0], summary: "Pair-programmed at his place, ordered Dominos at 2am" },
      { date: daysAgo(12).split('T')[0], summary: "NYU Game Center showcase — his game won best design" },
      { date: daysAgo(25).split('T')[0], summary: "Ramen at Ippudo to celebrate his Riot offer" },
      { date: daysAgo(40).split('T')[0], summary: "Study session for algorithms final at Bobst" }
    ]
  },

  // ============================================================
  // IMPORTANCE 4 — Close Friends & Key People (10 contacts)
  // ============================================================
  {
    id: 'seed-contact-9',
    name: "Priya Chakraborty",
    relationship_type: "friend",
    how_we_met: "Met at a hackathon at Columbia sophomore year. She goes to Columbia but we've stayed close.",
    interests: ["Machine learning", "Bollywood dance", "Baking"],
    work: "Research Assistant at Columbia CS Department",
    birthday: "2004-04-28",
    significant_other: null,
    last_interaction: {
      approximate_date: daysAgo(12),
      description: "Studied together at Hungarian Pastry Shop, she brought homemade samosas"
    },
    open_threads: [
      "Ask how her ML research paper submission went",
      "Try the cardamom cookies she promised to bake",
      "Check if she's going to the Bollywood dance showcase"
    ],
    life_updates: [
      "Submitting her first ML research paper to NeurIPS",
      "Teaching a Bollywood dance class at Columbia",
      "Considering PhD programs for next year"
    ],
    tags: ["College", "Tech", "Hackathon"],
    importance: 4,
    created_at: Date.now(),
    interactions: [
      { date: daysAgo(12).split('T')[0], summary: "Study session at Hungarian Pastry Shop with homemade samosas" },
      { date: daysAgo(30).split('T')[0], summary: "Watched her Bollywood dance performance at Columbia" },
      { date: daysAgo(55).split('T')[0], summary: "Hackathon at Cornell Tech — our team placed 3rd" }
    ]
  },
  {
    id: 'seed-contact-10',
    name: "Kwame Mensah",
    relationship_type: "friend",
    how_we_met: "Freshman dorm neighbor at NYU. From Accra originally, moved to Brooklyn when he was 12.",
    interests: ["Afrobeats", "Soccer", "Streetwear"],
    work: "Marketing Coordinator at Nike NYC",
    birthday: daysFromNow(9),
    significant_other: "Jasmine",
    last_interaction: {
      approximate_date: daysAgo(15),
      description: "Watched the Champions League match at Banter Bar in Williamsburg"
    },
    open_threads: [
      "Plan something for his birthday — he mentioned wanting to go to a rooftop bar",
      "Ask if he got the Nike employee discount code he promised me",
      "Check if he and Jasmine are still planning the Ghana trip"
    ],
    life_updates: [
      "Working on a big Nike campaign for the NYC marathon",
      "Planning a trip to Ghana with Jasmine to visit family",
      "Started a streetwear blog on the side"
    ],
    tags: ["College", "Dorm", "Soccer"],
    importance: 4,
    created_at: Date.now(),
    interactions: [
      { date: daysAgo(15).split('T')[0], summary: "Champions League watch at Banter Bar, Arsenal lost and he was devastated" },
      { date: daysAgo(35).split('T')[0], summary: "Went to a sneaker drop together at Kith" },
      { date: daysAgo(60).split('T')[0], summary: "His birthday pregame last year — rooftop in Williamsburg" }
    ]
  },
  {
    id: 'seed-contact-11',
    name: "Dr. Rachel Okonkwo",
    relationship_type: "mentor",
    how_we_met: "My CS professor at NYU. Taught my intro to AI class and became a real mentor.",
    interests: ["AI ethics", "Running", "Contemporary art"],
    work: "Associate Professor of Computer Science at NYU",
    birthday: null,
    significant_other: null,
    last_interaction: {
      approximate_date: daysAgo(20),
      description: "Office hours chat about my senior thesis direction and career plans"
    },
    open_threads: [
      "Send her my thesis draft by end of month",
      "Ask for her thoughts on the AI startup vs. grad school decision",
      "See if she needs a TA for next semester's AI ethics course"
    ],
    life_updates: [
      "Got tenure at NYU last fall",
      "Published a paper on algorithmic bias in hiring systems",
      "Keynote speaker at NeurIPS this year"
    ],
    tags: ["Mentor", "NYU", "AI"],
    importance: 4,
    created_at: Date.now(),
    interactions: [
      { date: daysAgo(20).split('T')[0], summary: "Office hours — discussed thesis direction, she recommended three papers" },
      { date: daysAgo(50).split('T')[0], summary: "Attended her guest lecture on AI regulation" },
      { date: daysAgo(90).split('T')[0], summary: "Coffee at Think Coffee to discuss summer research opportunities" }
    ]
  },
  {
    id: 'seed-contact-12',
    name: "Tomás Silva",
    relationship_type: "friend",
    how_we_met: "Leila's fiance. Met him at a family barbecue two summers ago. Brazilian guy, incredibly warm.",
    interests: ["Brazilian jiu-jitsu", "Cooking", "Surfing"],
    work: "Physical Therapist at Hospital for Special Surgery",
    birthday: "2000-05-11",
    significant_other: "Leila",
    last_interaction: {
      approximate_date: daysAgo(7),
      description: "Sunday dinner with the family, he brought his famous brigadeiros"
    },
    open_threads: [
      "Ask about the engagement party planning — he's handling the catering side",
      "He offered to teach me basic BJJ — set up a time",
      "Ask about the surfing trip to Montauk he's planning"
    ],
    life_updates: [
      "Engaged to Leila",
      "Got promoted to senior PT at HSS",
      "Planning a group surfing trip to Montauk"
    ],
    tags: ["Family-adjacent", "Future brother-in-law"],
    importance: 4,
    created_at: Date.now(),
    interactions: [
      { date: daysAgo(7).split('T')[0], summary: "Sunday dinner, his brigadeiros were incredible as always" },
      { date: daysAgo(25).split('T')[0], summary: "Watched UFC at his and Leila's place" },
      { date: daysAgo(60).split('T')[0], summary: "Helped him pick out the engagement ring" }
    ]
  },
  {
    id: 'seed-contact-13',
    name: "Aaliyah Washington",
    relationship_type: "friend",
    how_we_met: "Met through Marcus — she's in his climbing group. From Bed-Stuy. Funniest person I know.",
    interests: ["Stand-up comedy", "Climbing", "Vinyl records"],
    work: "Paralegal at a civil rights law firm in downtown Brooklyn",
    birthday: "2003-11-22",
    significant_other: null,
    last_interaction: {
      approximate_date: daysAgo(10),
      description: "Saw her do a 5-minute set at an open mic at The Creek in LIC"
    },
    open_threads: [
      "Ask when her next open mic is — I want to bring people",
      "She's applying to law school — see where she's at with that",
      "Send her that Chappelle special she hasn't seen"
    ],
    life_updates: [
      "Doing stand-up open mics regularly now",
      "Applying to law school for fall — wants to do civil rights law",
      "Started collecting vinyl, building an impressive jazz collection"
    ],
    tags: ["Friend", "Comedy", "Climbing crew"],
    importance: 4,
    created_at: Date.now(),
    interactions: [
      { date: daysAgo(10).split('T')[0], summary: "Her open mic set at The Creek — the bit about subway etiquette killed" },
      { date: daysAgo(25).split('T')[0], summary: "Group climbing session with her and Marcus" },
      { date: daysAgo(45).split('T')[0], summary: "Vinyl shopping in the East Village, she found a Miles Davis original" }
    ]
  },
  {
    id: 'seed-contact-14',
    name: "Yuki Tanaka",
    relationship_type: "friend",
    how_we_met: "Exchange student from Kyoto in my Japanese class at NYU. She stayed for grad school.",
    interests: ["Calligraphy", "Tea ceremony", "Indie films"],
    work: "Graduate Student in East Asian Studies at NYU",
    birthday: "2003-07-14",
    significant_other: null,
    last_interaction: {
      approximate_date: daysAgo(18),
      description: "Went to Film Forum to see a Kurosawa restoration, got matcha after"
    },
    open_threads: [
      "Ask if she's presenting at the graduate symposium",
      "She recommended a book on wabi-sabi — find it",
      "Plan to go to the Japanese tea garden in Brooklyn Botanic"
    ],
    life_updates: [
      "Writing her master's thesis on modern Japanese cinema",
      "Teaching calligraphy workshops at Japan Society",
      "Thinking about doing her PhD at Berkeley"
    ],
    tags: ["College", "International", "Film"],
    importance: 4,
    created_at: Date.now(),
    interactions: [
      { date: daysAgo(18).split('T')[0], summary: "Kurosawa double feature at Film Forum, matcha at Cha An" },
      { date: daysAgo(38).split('T')[0], summary: "Attended her calligraphy workshop at Japan Society" },
      { date: daysAgo(70).split('T')[0], summary: "Study session at Bobst, she helped me with Japanese homework" }
    ]
  },
  {
    id: 'seed-contact-15',
    name: "Omar Hassan",
    relationship_type: "friend",
    how_we_met: "High school debate team. From Bay Ridge, Brooklyn. We used to ride the subway together after practice.",
    interests: ["Political journalism", "Chess", "Middle Eastern cooking"],
    work: "Staff Writer at The City (NYC news outlet)",
    birthday: "2004-02-20",
    significant_other: null,
    last_interaction: {
      approximate_date: daysAgo(22),
      description: "Met for shawarma at his favorite spot in Bay Ridge, debated politics for three hours"
    },
    open_threads: [
      "Read his latest article about housing policy in NYC",
      "He wants to start a chess club — see if he's still on that",
      "Ask about his grandmother — she was in the hospital last month"
    ],
    life_updates: [
      "Got hired full-time at The City after interning",
      "His article on tenant rights got picked up by NY Mag",
      "Grandmother recovering from hip surgery"
    ],
    tags: ["High school", "Debate", "Journalism"],
    importance: 4,
    created_at: Date.now(),
    interactions: [
      { date: daysAgo(22).split('T')[0], summary: "Shawarma in Bay Ridge, three-hour political debate as usual" },
      { date: daysAgo(50).split('T')[0], summary: "Celebrated his NY Mag feature at a bar in Park Slope" },
      { date: daysAgo(80).split('T')[0], summary: "Called to check in when his grandma was hospitalized" }
    ]
  },
  {
    id: 'seed-contact-16',
    name: "Camille Dubois",
    relationship_type: "friend",
    how_we_met: "Study abroad in Paris fall semester. She's French but moved to NYC after graduation.",
    interests: ["Wine", "Contemporary dance", "Architecture"],
    work: "Junior Architect at SHoP Architects",
    birthday: daysFromNow(11),
    significant_other: null,
    last_interaction: {
      approximate_date: daysAgo(14),
      description: "Wine and cheese night at her Williamsburg apartment with a small group"
    },
    open_threads: [
      "Plan her birthday — she wants a low-key dinner",
      "Visit the SHoP Architects office tour she offered",
      "Ask about the dance performance she's in next month"
    ],
    life_updates: [
      "Working on a major residential tower project in Hudson Yards",
      "Performing in a contemporary dance show in April",
      "Got her green card approved"
    ],
    tags: ["Study abroad", "Paris", "Creative"],
    importance: 4,
    created_at: Date.now(),
    interactions: [
      { date: daysAgo(14).split('T')[0], summary: "Wine night at her place, she opened a great Bordeaux" },
      { date: daysAgo(35).split('T')[0], summary: "Architecture walking tour of the High Line she led" },
      { date: daysAgo(75).split('T')[0], summary: "Dinner at Balthazar — she said it reminded her of home" }
    ]
  },
  {
    id: 'seed-contact-17',
    name: "Isaiah Brooks",
    relationship_type: "family",
    how_we_met: "Family — younger cousin from Atlanta. He's 19, just started at Georgia Tech.",
    interests: ["Robotics", "Basketball", "Sneakers"],
    work: "Student at Georgia Tech (Mechanical Engineering)",
    birthday: "2006-09-03",
    significant_other: null,
    last_interaction: {
      approximate_date: daysAgo(16),
      description: "FaceTime call, he's struggling with Dynamics and I helped him through a problem set"
    },
    open_threads: [
      "Send him the textbook PDF he asked for",
      "Check how his robotics competition went",
      "See if he's coming to NYC for spring break"
    ],
    life_updates: [
      "Joined Georgia Tech's robotics competition team",
      "Struggling with his engineering classes but pushing through",
      "Might come to NYC for spring break"
    ],
    tags: ["Family", "Cousin", "Engineering"],
    importance: 4,
    created_at: Date.now(),
    interactions: [
      { date: daysAgo(16).split('T')[0], summary: "FaceTime tutoring session for his Dynamics class" },
      { date: daysAgo(45).split('T')[0], summary: "Texted about the NBA draft picks" },
      { date: daysAgo(90).split('T')[0], summary: "Saw him at Thanksgiving in Atlanta" }
    ]
  },
  {
    id: 'seed-contact-18',
    name: "Hannah Goldstein",
    relationship_type: "friend",
    how_we_met: "High school AP English class. We were always competing for the highest grade. Now we're just friends.",
    interests: ["Film editing", "Yoga", "Board games"],
    work: "Assistant Editor at A24 Films",
    birthday: "2004-03-30",
    significant_other: "Ben",
    last_interaction: {
      approximate_date: daysAgo(11),
      description: "Board game night at her and Ben's place — she destroyed us at Settlers of Catan"
    },
    open_threads: [
      "Ask what A24 project she's working on now — she was being secretive",
      "Plan the next board game night — it's my turn to host",
      "See if she wants to do the yoga class in Prospect Park"
    ],
    life_updates: [
      "Working on a major A24 release — can't say which one",
      "Moved in with Ben in Park Slope",
      "Started doing yoga teacher training on weekends"
    ],
    tags: ["High school", "Film", "Board games"],
    importance: 4,
    created_at: Date.now(),
    interactions: [
      { date: daysAgo(11).split('T')[0], summary: "Board game night — Settlers of Catan, she won again" },
      { date: daysAgo(30).split('T')[0], summary: "Saw a movie at Metrograph, her treat since she gets A24 screeners" },
      { date: daysAgo(55).split('T')[0], summary: "Helped her and Ben move into their Park Slope apartment" }
    ]
  },

  // ============================================================
  // IMPORTANCE 3 — Regular Friends & Colleagues (12 contacts)
  // ============================================================
  {
    id: 'seed-contact-19',
    name: "David Kim",
    relationship_type: "friend",
    how_we_met: "Neighborhood friend growing up. His family's deli is on the corner of my block.",
    interests: ["Guitar", "Songwriting", "Korean BBQ"],
    work: "Music Teacher at a middle school in Harlem",
    birthday: "2003-02-18",
    significant_other: "Lisa",
    last_interaction: {
      approximate_date: daysAgo(28),
      description: "Saw his band play at Mercury Lounge — they were actually good"
    },
    open_threads: [
      "Ask about the EP recording progress",
      "Congratulate him on his engagement to Lisa",
      "Plan to catch another show"
    ],
    life_updates: [
      "Band is recording first EP at a studio in Greenpoint",
      "Got engaged to Lisa last month",
      "His music students won a city-wide competition"
    ],
    tags: ["Neighborhood", "Music", "Childhood"],
    importance: 3,
    created_at: Date.now(),
    interactions: [
      { date: daysAgo(28).split('T')[0], summary: "Mercury Lounge show — they played an original that gave me chills" },
      { date: daysAgo(55).split('T')[0], summary: "Grabbed Korean BBQ at his family's spot, talked about the EP" },
      { date: daysAgo(5).split('T')[0], summary: "Texted to congratulate on the engagement" }
    ]
  },
  {
    id: 'seed-contact-20',
    name: "Zara Osman",
    relationship_type: "colleague",
    how_we_met: "We interned together at a startup last summer. She's sharp and ambitious.",
    interests: ["Product management", "Podcasts", "Rock climbing"],
    work: "Product Manager Intern at Figma (returning this summer)",
    birthday: "2004-06-05",
    significant_other: null,
    last_interaction: {
      approximate_date: daysAgo(25),
      description: "Coffee at Blue Bottle in SoHo to talk about PM career paths"
    },
    open_threads: [
      "She asked me to review her Figma internship presentation",
      "Introduce her to Marcus — they'd get along climbing",
      "Ask about the PM book club she started"
    ],
    life_updates: [
      "Returning to Figma for a full-time PM role this summer",
      "Started a PM book club with other NYU students",
      "Launched a side project — a tool for freelancer invoicing"
    ],
    tags: ["Work", "PM", "Startup"],
    importance: 3,
    created_at: Date.now(),
    interactions: [
      { date: daysAgo(25).split('T')[0], summary: "Coffee at Blue Bottle, career advice conversation" },
      { date: daysAgo(60).split('T')[0], summary: "Co-presented at the NYU entrepreneurship showcase" },
      { date: daysAgo(100).split('T')[0], summary: "Last day of our summer internship — team dinner" }
    ]
  },
  {
    id: 'seed-contact-21',
    name: "Trevor Washington",
    relationship_type: "friend",
    how_we_met: "Gym buddy at Equinox near campus. We spot each other on bench press days.",
    interests: ["Powerlifting", "Nutrition", "Podcasts"],
    work: "Personal Trainer at Equinox",
    birthday: "2002-08-15",
    significant_other: null,
    last_interaction: {
      approximate_date: daysAgo(4),
      description: "Leg day at the gym, he's prepping for a powerlifting meet"
    },
    open_threads: [
      "Ask about the powerlifting competition — it's in two weeks",
      "He recommended a protein powder brand — look it up",
      "See if he wants to do the Spartan Race in May"
    ],
    life_updates: [
      "Training for his first sanctioned powerlifting meet",
      "Getting his nutrition certification",
      "Thinking about opening his own gym eventually"
    ],
    tags: ["Gym", "Fitness"],
    importance: 3,
    created_at: Date.now(),
    interactions: [
      { date: daysAgo(4).split('T')[0], summary: "Leg day — he hit a 405 squat PR" },
      { date: daysAgo(8).split('T')[0], summary: "Chest and back day, talked about the powerlifting meet" },
      { date: daysAgo(14).split('T')[0], summary: "Post-gym smoothies, he told me about the nutrition cert" },
      { date: daysAgo(20).split('T')[0], summary: "Morning cardio session, rare for both of us" }
    ]
  },
  {
    id: 'seed-contact-22',
    name: "Mei-Lin Zhang",
    relationship_type: "friend",
    how_we_met: "Art history class at NYU. She always had the most interesting takes during discussion.",
    interests: ["Painting", "Museum hopping", "Dim sum"],
    work: "Gallery Assistant at David Zwirner",
    birthday: "2004-05-19",
    significant_other: null,
    last_interaction: {
      approximate_date: daysAgo(30),
      description: "Went to the new exhibit at the Whitney together"
    },
    open_threads: [
      "Ask about the group show she's curating",
      "She invited me to a gallery opening next Friday",
      "Try that dim sum spot in Flushing she keeps recommending"
    ],
    life_updates: [
      "Curating her first group show at a pop-up gallery in Bushwick",
      "Got a studio space in Gowanus for her own painting",
      "Applied to MFA programs at RISD and Yale"
    ],
    tags: ["College", "Art", "Museums"],
    importance: 3,
    created_at: Date.now(),
    interactions: [
      { date: daysAgo(30).split('T')[0], summary: "Whitney Museum — the new installation was mind-blowing" },
      { date: daysAgo(60).split('T')[0], summary: "Visited her new studio space in Gowanus" },
      { date: daysAgo(95).split('T')[0], summary: "Art history study group for the midterm" }
    ]
  },
  {
    id: 'seed-contact-23',
    name: "Raj Patel",
    relationship_type: "colleague",
    how_we_met: "TA for my data structures class. Saved my grade with his review sessions.",
    interests: ["Competitive programming", "Cricket", "Biryani"],
    work: "Software Engineer at Bloomberg",
    birthday: daysFromNow(7),
    significant_other: null,
    last_interaction: {
      approximate_date: daysAgo(35),
      description: "Got biryani at a spot in Jackson Heights, he told me about Bloomberg's tech stack"
    },
    open_threads: [
      "Plan a birthday dinner for him",
      "He offered to refer me for a Bloomberg internship — send him my resume",
      "Ask about the cricket league he joined"
    ],
    life_updates: [
      "Starting his second year at Bloomberg, already got promoted",
      "Joined a cricket league in Van Cortlandt Park",
      "Mentoring freshmen in NYU's CS department"
    ],
    tags: ["NYU", "CS", "Tech"],
    importance: 3,
    created_at: Date.now(),
    interactions: [
      { date: daysAgo(35).split('T')[0], summary: "Biryani in Jackson Heights, talked about Bloomberg and career stuff" },
      { date: daysAgo(70).split('T')[0], summary: "He gave a tech talk at NYU about terminal systems" },
      { date: daysAgo(120).split('T')[0], summary: "Data structures review session before the final — he's a lifesaver" }
    ]
  },
  {
    id: 'seed-contact-24',
    name: "Saoirse Murphy",
    relationship_type: "friend",
    how_we_met: "Irish exchange student in my writing seminar. She writes the most beautiful prose I've ever read.",
    interests: ["Creative writing", "Whiskey", "Long walks"],
    work: "MFA Student in Creative Writing at The New School",
    birthday: "2003-04-01",
    significant_other: null,
    last_interaction: {
      approximate_date: daysAgo(19),
      description: "Writers' workshop at McNally Jackson bookstore, then whiskey at a speakeasy in the West Village"
    },
    open_threads: [
      "Read her new short story she emailed me",
      "Ask about her thesis deadline",
      "She wants to visit Ireland this summer — see if she's booked flights"
    ],
    life_updates: [
      "Working on her MFA thesis — a collection of short stories",
      "Got a story published in Granta",
      "Considering staying in NYC after graduation"
    ],
    tags: ["Writing", "International", "Creative"],
    importance: 3,
    created_at: Date.now(),
    interactions: [
      { date: daysAgo(19).split('T')[0], summary: "Writers' workshop then whiskey at Employees Only" },
      { date: daysAgo(42).split('T')[0], summary: "Book reading at McNally Jackson, she asked amazing questions" },
      { date: daysAgo(80).split('T')[0], summary: "Irish pub crawl she organized for St. Patrick's Day" }
    ]
  },
  {
    id: 'seed-contact-25',
    name: "Andre Williams",
    relationship_type: "friend",
    how_we_met: "AAU basketball when we were 14. He went to Brooklyn Tech, I went to Stuy, but we always stayed cool.",
    interests: ["Basketball coaching", "Sneakers", "Music production"],
    work: "Assistant Basketball Coach at a high school in East New York",
    birthday: "2004-01-25",
    significant_other: "Destiny",
    last_interaction: {
      approximate_date: daysAgo(40),
      description: "Watched his team play in the city semifinals — they lost by 3 in overtime"
    },
    open_threads: [
      "Check in — he was really down after the semifinal loss",
      "Ask about the summer basketball camp he's planning",
      "See if he and Destiny want to do a double date"
    ],
    life_updates: [
      "His high school team had their best season in 10 years",
      "Producing beats in his bedroom studio, some are actually fire",
      "Moving in with Destiny this summer"
    ],
    tags: ["Basketball", "AAU", "Brooklyn"],
    importance: 3,
    created_at: Date.now(),
    interactions: [
      { date: daysAgo(40).split('T')[0], summary: "City semifinal game — heartbreaking loss, he was gutted" },
      { date: daysAgo(65).split('T')[0], summary: "Pickup basketball, then pizza at L&B Spumoni in Brooklyn" },
      { date: daysAgo(110).split('T')[0], summary: "Listened to his beats at his apartment — he's getting good" }
    ]
  },
  {
    id: 'seed-contact-26',
    name: "Elena Rossi",
    relationship_type: "friend",
    how_we_met: "Study abroad in Paris — she's Italian and was in the same program. We traveled through Europe together.",
    interests: ["Pasta making", "Fashion", "Soccer"],
    work: "Fashion Merchandising at Saks Fifth Avenue",
    birthday: "2003-12-10",
    significant_other: null,
    last_interaction: {
      approximate_date: daysAgo(32),
      description: "She came to NYC for work, we got dinner at an Italian spot in the West Village"
    },
    open_threads: [
      "She's thinking about moving to NYC permanently — check in on that",
      "Send her the pasta recipe I promised",
      "Plan to visit her in Milan if I go to Europe this summer"
    ],
    life_updates: [
      "Got transferred to the Saks NYC office from Milan",
      "Debating whether to stay in NYC or go back to Italy",
      "Learning to make pasta from scratch from her nonna's recipes"
    ],
    tags: ["Study abroad", "Paris", "International"],
    importance: 3,
    created_at: Date.now(),
    interactions: [
      { date: daysAgo(32).split('T')[0], summary: "Dinner at Via Carota — she said it reminded her of Rome" },
      { date: daysAgo(90).split('T')[0], summary: "Video call catching up, she told me about the NYC transfer" },
      { date: daysAgo(180).split('T')[0], summary: "Last day in Paris — group dinner with the whole study abroad crew" }
    ]
  },
  {
    id: 'seed-contact-27',
    name: "Chris Novak",
    relationship_type: "colleague",
    how_we_met: "Co-founded the NYU Startup Club together sophomore year.",
    interests: ["Entrepreneurship", "Surfing", "Cold brew"],
    work: "Co-founder of a fintech startup (pre-seed stage)",
    birthday: "2004-07-08",
    significant_other: null,
    last_interaction: {
      approximate_date: daysAgo(17),
      description: "Brainstorming session at a coffee shop about his startup pitch deck"
    },
    open_threads: [
      "Review his pitch deck before the Y Combinator application deadline",
      "Introduce him to my sister's friend who's a VC associate",
      "Ask how the technical co-founder search is going"
    ],
    life_updates: [
      "Applying to Y Combinator with his fintech idea",
      "Raised $50K from friends and family",
      "Dropped out of NYU to go full-time on the startup"
    ],
    tags: ["NYU", "Startup", "Entrepreneurship"],
    importance: 3,
    created_at: Date.now(),
    interactions: [
      { date: daysAgo(17).split('T')[0], summary: "Pitch deck review at Blank Street Coffee, gave him honest feedback" },
      { date: daysAgo(40).split('T')[0], summary: "Startup Club panel event we organized together" },
      { date: daysAgo(75).split('T')[0], summary: "Long walk through Washington Square Park talking about his decision to drop out" }
    ]
  },
  {
    id: 'seed-contact-28',
    name: "Lucia Fernandez",
    relationship_type: "friend",
    how_we_met: "Salsa dancing class in the East Village. Sofia dragged me there and I met Lucia.",
    interests: ["Salsa dancing", "Social work", "Cooking"],
    work: "Social Worker at a community center in Washington Heights",
    birthday: "2002-10-09",
    significant_other: "Miguel",
    last_interaction: {
      approximate_date: daysAgo(24),
      description: "Salsa night at SOBs, she taught me a new turn pattern"
    },
    open_threads: [
      "She invited me to volunteer at the community center's youth program",
      "Ask about the social work conference she attended",
      "Try the empanadas she promised to make for the group"
    ],
    life_updates: [
      "Got promoted to program director at the community center",
      "Presented at a national social work conference",
      "She and Miguel adopted a rescue dog named Coco"
    ],
    tags: ["Salsa", "Community", "Social work"],
    importance: 3,
    created_at: Date.now(),
    interactions: [
      { date: daysAgo(24).split('T')[0], summary: "Salsa at SOBs, she was patient teaching me new moves" },
      { date: daysAgo(50).split('T')[0], summary: "Dinner at her place in Washington Heights — Miguel cooked" },
      { date: daysAgo(85).split('T')[0], summary: "Volunteered at the community center holiday event" }
    ]
  },
  {
    id: 'seed-contact-29',
    name: "Jordan Taylor",
    relationship_type: "friend",
    how_we_met: "Met through a mutual friend at a house party in Bushwick. They're a DJ.",
    interests: ["DJing", "Electronic music", "Thrifting"],
    work: "Freelance DJ / Barista at Devocion Coffee",
    birthday: daysFromNow(3),
    significant_other: null,
    last_interaction: {
      approximate_date: daysAgo(13),
      description: "They DJed a warehouse party in Gowanus, it went until 4am"
    },
    open_threads: [
      "Plan their birthday thing — they want a small gathering at their place",
      "Ask about the residency at Nowadays they auditioned for",
      "They want to teach me basic DJ skills — set up a time"
    ],
    life_updates: [
      "Auditioning for a residency at Nowadays in Ridgewood",
      "Building a following on SoundCloud with their mixes",
      "Thinking about moving to Berlin for the music scene"
    ],
    tags: ["Music", "Bushwick", "Nightlife"],
    importance: 3,
    created_at: Date.now(),
    interactions: [
      { date: daysAgo(13).split('T')[0], summary: "Warehouse party in Gowanus, they dropped an insane house set" },
      { date: daysAgo(35).split('T')[0], summary: "Got coffee at Devocion while they were working, planned the party" },
      { date: daysAgo(60).split('T')[0], summary: "Thrift shopping in Williamsburg, found a vintage bomber jacket" }
    ]
  },
  {
    id: 'seed-contact-30',
    name: "Nkechi Eze",
    relationship_type: "family",
    how_we_met: "Family — aunt on Dad's side. Lives in Houston. She's the life of every family party.",
    interests: ["Cooking", "Church choir", "Real estate"],
    work: "Real Estate Agent in Houston, TX",
    birthday: "1970-06-28",
    significant_other: "Uncle Emeka",
    last_interaction: {
      approximate_date: daysAgo(45),
      description: "FaceTime call for her birthday, the whole family sang to her"
    },
    open_threads: [
      "She wants us to visit Houston this summer",
      "Send her the family photos from Thanksgiving",
      "Ask about the new house she's selling — she was excited about the commission"
    ],
    life_updates: [
      "Sold the most expensive house of her career last quarter",
      "Her daughter Adaeze is graduating from med school",
      "Planning a big family reunion in Lagos for Christmas"
    ],
    tags: ["Family", "Aunt", "Houston"],
    importance: 3,
    created_at: Date.now(),
    interactions: [
      { date: daysAgo(45).split('T')[0], summary: "FaceTime birthday call, whole family sang" },
      { date: daysAgo(120).split('T')[0], summary: "Thanksgiving in Atlanta, she cooked enough food for 30 people" },
      { date: daysAgo(200).split('T')[0], summary: "Phone call, she told me about the Lagos reunion idea" }
    ]
  },

  // ============================================================
  // IMPORTANCE 2 — Casual Friends & Acquaintances (12 contacts)
  // ============================================================
  {
    id: 'seed-contact-31',
    name: "Tyler Brennan",
    relationship_type: "acquaintance",
    how_we_met: "Friend of a friend. Met at Daniel's birthday party last year. Works in finance.",
    interests: ["Golf", "Craft beer", "Fantasy football"],
    work: "Associate at Deloitte Consulting",
    birthday: null,
    significant_other: null,
    last_interaction: {
      approximate_date: daysAgo(65),
      description: "Ran into him at a bar in Murray Hill, chatted for 20 minutes"
    },
    open_threads: [
      "He mentioned a consulting info session — might be worth checking out"
    ],
    life_updates: [
      "Just finished a big project for a healthcare client"
    ],
    tags: ["Acquaintance", "Finance"],
    importance: 2,
    created_at: Date.now(),
    interactions: [
      { date: daysAgo(65).split('T')[0], summary: "Ran into him at a Murray Hill bar" },
      { date: daysAgo(150).split('T')[0], summary: "Daniel's birthday party — we talked about fantasy football" }
    ]
  },
  {
    id: 'seed-contact-32',
    name: "Jasmine Okafor",
    relationship_type: "acquaintance",
    how_we_met: "Kwame's girlfriend. Met her at a cookout at their place. She's really sweet.",
    interests: ["Nursing", "Afrobeats", "Hair braiding"],
    work: "Nursing Student at Hunter College",
    birthday: null,
    significant_other: "Kwame",
    last_interaction: {
      approximate_date: daysAgo(15),
      description: "She was at the Champions League watch party with Kwame"
    },
    open_threads: [
      "She offered to introduce me to her friend who works at Google — follow up"
    ],
    life_updates: [
      "Finishing her nursing degree this spring",
      "Planning the Ghana trip with Kwame"
    ],
    tags: ["Kwame's girlfriend", "Nursing"],
    importance: 2,
    created_at: Date.now(),
    interactions: [
      { date: daysAgo(15).split('T')[0], summary: "Champions League watch party, chatted about her nursing clinicals" },
      { date: daysAgo(60).split('T')[0], summary: "Kwame's cookout at their place, she made jollof that rivaled my dad's" }
    ]
  },
  {
    id: 'seed-contact-33',
    name: "Ben Shapira",
    relationship_type: "acquaintance",
    how_we_met: "Hannah's boyfriend. Met him at a board game night. He's a doctor.",
    interests: ["Board games", "Running", "Science fiction"],
    work: "Resident at NYU Langone (Internal Medicine)",
    birthday: null,
    significant_other: "Hannah",
    last_interaction: {
      approximate_date: daysAgo(11),
      description: "Board game night at their place, he taught us a new strategy game"
    },
    open_threads: [
      "He's running the NYC marathon — ask how training is going"
    ],
    life_updates: [
      "In his second year of residency, says the hours are brutal",
      "Training for the NYC marathon in November"
    ],
    tags: ["Hannah's boyfriend", "Board games"],
    importance: 2,
    created_at: Date.now(),
    interactions: [
      { date: daysAgo(11).split('T')[0], summary: "Board game night, he introduced us to Wingspan" },
      { date: daysAgo(55).split('T')[0], summary: "Helped Hannah and Ben move to Park Slope" }
    ]
  },
  {
    id: 'seed-contact-34',
    name: "Marco DiStefano",
    relationship_type: "acquaintance",
    how_we_met: "Neighbor in my apartment building. Older Italian guy, always cooking something incredible.",
    interests: ["Italian cooking", "Opera", "Woodworking"],
    work: "Retired — former restaurant owner",
    birthday: null,
    significant_other: null,
    last_interaction: {
      approximate_date: daysAgo(9),
      description: "He brought over a plate of homemade carbonara — said I looked too skinny"
    },
    open_threads: [
      "He offered to teach me how to make fresh pasta — take him up on it",
      "Ask about the bookshelf he's building"
    ],
    life_updates: [
      "Building furniture in his apartment workshop",
      "His son is getting married in Sicily this fall"
    ],
    tags: ["Neighbor", "Cooking"],
    importance: 2,
    created_at: Date.now(),
    interactions: [
      { date: daysAgo(9).split('T')[0], summary: "He brought over carbonara, we chatted in the hallway for 30 min" },
      { date: daysAgo(40).split('T')[0], summary: "Helped him carry groceries up the stairs" },
      { date: daysAgo(90).split('T')[0], summary: "He invited me in for espresso and showed me his woodworking" }
    ]
  },
  {
    id: 'seed-contact-35',
    name: "Aisha Williams",
    relationship_type: "acquaintance",
    how_we_met: "Marcus's girlfriend. She's pre-med at Columbia. We've hung out through Marcus a bunch of times.",
    interests: ["Pre-med", "Baking", "K-pop"],
    work: "Student at Columbia (Pre-Med)",
    birthday: daysFromNow(12),
    significant_other: "Marcus",
    last_interaction: {
      approximate_date: daysAgo(3),
      description: "She was at the ramen dinner with me and Marcus"
    },
    open_threads: [
      "She's applying to med schools — ask how it's going",
      "Her birthday is coming up — coordinate with Marcus on a surprise"
    ],
    life_updates: [
      "Applying to medical schools, stressed about the MCAT",
      "Volunteers at a free clinic in Harlem on weekends"
    ],
    tags: ["Marcus's girlfriend", "Columbia"],
    importance: 2,
    created_at: Date.now(),
    interactions: [
      { date: daysAgo(3).split('T')[0], summary: "Ramen at Ichiran with Marcus, she told us about her MCAT prep" },
      { date: daysAgo(22).split('T')[0], summary: "Double date — Korean BBQ in K-Town" },
      { date: daysAgo(50).split('T')[0], summary: "She brought cookies to the climbing gym hangout" }
    ]
  },
  {
    id: 'seed-contact-36',
    name: "Sam Oduya",
    relationship_type: "colleague",
    how_we_met: "We worked on a group project together in our databases class. He carried us on the SQL portion.",
    interests: ["Data engineering", "Afrobeats", "Cooking"],
    work: "Data Engineering Intern at Stripe",
    birthday: "2004-11-15",
    significant_other: null,
    last_interaction: {
      approximate_date: daysAgo(42),
      description: "Grabbed lunch on campus and compared internship offers"
    },
    open_threads: [
      "Ask how the Stripe internship is going",
      "He wanted to start a data visualization side project together"
    ],
    life_updates: [
      "Started his Stripe internship, loving the engineering culture",
      "Learning Rust on the side"
    ],
    tags: ["NYU", "CS", "Databases"],
    importance: 2,
    created_at: Date.now(),
    interactions: [
      { date: daysAgo(42).split('T')[0], summary: "Lunch on campus, swapped internship stories" },
      { date: daysAgo(80).split('T')[0], summary: "Late night in Bobst finishing our database project" }
    ]
  },
  {
    id: 'seed-contact-37',
    name: "Destiny Monroe",
    relationship_type: "acquaintance",
    how_we_met: "Andre's girlfriend. Met her at a basketball game. She's a hairstylist in Flatbush.",
    interests: ["Hair styling", "Reality TV", "Brunch"],
    work: "Hairstylist at a salon in Flatbush",
    birthday: null,
    significant_other: "Andre",
    last_interaction: {
      approximate_date: daysAgo(40),
      description: "She was at Andre's team's semifinal game, we sat together"
    },
    open_threads: [
      "She offered to give me a fresh cut at a discount — I should go"
    ],
    life_updates: [
      "Saving up to open her own salon",
      "Moving in with Andre this summer"
    ],
    tags: ["Andre's girlfriend", "Brooklyn"],
    importance: 2,
    created_at: Date.now(),
    interactions: [
      { date: daysAgo(40).split('T')[0], summary: "Semifinal game, she was louder than the whole student section" },
      { date: daysAgo(110).split('T')[0], summary: "Group dinner after Andre's birthday" }
    ]
  },
  {
    id: 'seed-contact-38',
    name: "Jake Morrison",
    relationship_type: "acquaintance",
    how_we_met: "Sat next to each other on a flight back from a conference in San Francisco. We talked the whole 5 hours.",
    interests: ["Venture capital", "Hiking", "Coffee"],
    work: "Associate at Andreessen Horowitz",
    birthday: null,
    significant_other: null,
    last_interaction: {
      approximate_date: daysAgo(75),
      description: "He texted me after I posted about the hackathon, offered to connect me with founders"
    },
    open_threads: [
      "Follow up on his offer to connect me with early-stage founders",
      "Send him Chris Novak's pitch deck — could be a fit"
    ],
    life_updates: [
      "Moved from SF to NYC for a16z's new office"
    ],
    tags: ["VC", "Networking", "Tech"],
    importance: 2,
    created_at: Date.now(),
    interactions: [
      { date: daysAgo(75).split('T')[0], summary: "Texted about the hackathon, he offered founder introductions" },
      { date: daysAgo(130).split('T')[0], summary: "5-hour flight conversation about startups and life" }
    ]
  },
  {
    id: 'seed-contact-39',
    name: "Fatima Al-Rashid",
    relationship_type: "colleague",
    how_we_met: "Met at the NYU Hackathon last semester. She's incredible at UI design.",
    interests: ["UI design", "Arabic calligraphy", "Meditation"],
    work: "Design Intern at Airbnb",
    birthday: "2004-09-22",
    significant_other: null,
    last_interaction: {
      approximate_date: daysAgo(48),
      description: "She critiqued my portfolio website design — brutally honest but helpful"
    },
    open_threads: [
      "Ask how the Airbnb internship is going",
      "She wanted to collaborate on a design project — circle back"
    ],
    life_updates: [
      "Interning at Airbnb in their NYC design office",
      "Teaching Arabic calligraphy workshops at the Islamic Center"
    ],
    tags: ["Hackathon", "Design", "NYU"],
    importance: 2,
    created_at: Date.now(),
    interactions: [
      { date: daysAgo(48).split('T')[0], summary: "Portfolio review session at a coffee shop, her feedback was gold" },
      { date: daysAgo(100).split('T')[0], summary: "NYU Hackathon — we were on the same team, placed 2nd" }
    ]
  },
  {
    id: 'seed-contact-40',
    name: "Ryan O'Brien",
    relationship_type: "acquaintance",
    how_we_met: "Friend of Omar's. Irish-American guy from Woodside, Queens. Funny as hell.",
    interests: ["Stand-up comedy", "Boxing", "Irish history"],
    work: "Bartender at a pub in Woodside",
    birthday: null,
    significant_other: null,
    last_interaction: {
      approximate_date: daysAgo(55),
      description: "Ran into him at Omar's article celebration party in Park Slope"
    },
    open_threads: [
      "He said he's starting boxing classes — I said I'd go with him sometime"
    ],
    life_updates: [
      "Saving up money to travel through Ireland",
      "Taking boxing classes in Astoria"
    ],
    tags: ["Omar's friend", "Queens"],
    importance: 2,
    created_at: Date.now(),
    interactions: [
      { date: daysAgo(55).split('T')[0], summary: "Omar's celebration party, Ryan told the funniest story about his pub" },
      { date: daysAgo(130).split('T')[0], summary: "First met at a dinner Omar organized" }
    ]
  },
  {
    id: 'seed-contact-41',
    name: "Adaeze Eze",
    relationship_type: "family",
    how_we_met: "Family — cousin from Houston. Auntie Nkechi's daughter. She's graduating from med school this spring.",
    interests: ["Medicine", "Fashion", "Afrobeats"],
    work: "Medical Student at Baylor College of Medicine (graduating)",
    birthday: "2000-04-15",
    significant_other: null,
    last_interaction: {
      approximate_date: daysAgo(50),
      description: "FaceTime call — she was celebrating matching into a residency program at Mt. Sinai"
    },
    open_threads: [
      "Congratulate her again on the Mt. Sinai match — she'll be in NYC!",
      "Plan a welcome-to-NYC dinner for when she moves",
      "Ask when the graduation ceremony is — Mom wants to go"
    ],
    life_updates: [
      "Matched into internal medicine residency at Mt. Sinai",
      "Moving to NYC in June",
      "Graduating from Baylor in May"
    ],
    tags: ["Family", "Cousin", "Houston"],
    importance: 2,
    created_at: Date.now(),
    interactions: [
      { date: daysAgo(50).split('T')[0], summary: "FaceTime celebration for her residency match at Mt. Sinai" },
      { date: daysAgo(120).split('T')[0], summary: "Thanksgiving in Atlanta, she told me about the match process" },
      { date: daysAgo(250).split('T')[0], summary: "Visited Houston, she gave me a campus tour of Baylor" }
    ]
  },
  {
    id: 'seed-contact-42',
    name: "Lisa Chen",
    relationship_type: "acquaintance",
    how_we_met: "David Kim's fiancee. She teaches violin and always has the most calming energy.",
    interests: ["Violin", "Classical music", "Tea"],
    work: "Violin Teacher, private lessons in Manhattan",
    birthday: null,
    significant_other: "David",
    last_interaction: {
      approximate_date: daysAgo(28),
      description: "She was at David's Mercury Lounge show, we chatted during the break"
    },
    open_threads: [
      "She mentioned wanting to organize a music salon — ask about that"
    ],
    life_updates: [
      "Got engaged to David",
      "Performing with a chamber ensemble at Carnegie Hall in May"
    ],
    tags: ["David's fiancee", "Music"],
    importance: 2,
    created_at: Date.now(),
    interactions: [
      { date: daysAgo(28).split('T')[0], summary: "Mercury Lounge show, she told me about the Carnegie Hall performance" },
      { date: daysAgo(80).split('T')[0], summary: "Korean BBQ with David and Lisa, she brought homemade mooncakes" }
    ]
  },

  // ============================================================
  // IMPORTANCE 1 — Distant Acquaintances (8 contacts)
  // ============================================================
  {
    id: 'seed-contact-43',
    name: "Brendan Cole",
    relationship_type: "acquaintance",
    how_we_met: "Met at a networking event at WeWork in SoHo. He handed me his business card.",
    interests: ["Real estate", "Golf"],
    work: "Real Estate Broker at Douglas Elliman",
    birthday: null,
    significant_other: null,
    last_interaction: {
      approximate_date: daysAgo(120),
      description: "Brief LinkedIn message exchange about NYC real estate market"
    },
    open_threads: [],
    life_updates: [],
    tags: ["Networking", "Real estate"],
    importance: 1,
    created_at: Date.now(),
    interactions: [
      { date: daysAgo(120).split('T')[0], summary: "LinkedIn message about real estate" },
      { date: daysAgo(180).split('T')[0], summary: "Met at WeWork networking event" }
    ]
  },
  {
    id: 'seed-contact-44',
    name: "Michelle Park",
    relationship_type: "acquaintance",
    how_we_met: "Met at a party in the East Village through a friend of a friend. She's a dental student.",
    interests: ["Dentistry", "Barre classes"],
    work: "Dental Student at NYU College of Dentistry",
    birthday: null,
    significant_other: null,
    last_interaction: {
      approximate_date: daysAgo(95),
      description: "Bumped into her at a coffee shop near NYU, said hi"
    },
    open_threads: [],
    life_updates: [],
    tags: ["Acquaintance", "NYU"],
    importance: 1,
    created_at: Date.now(),
    interactions: [
      { date: daysAgo(95).split('T')[0], summary: "Quick hello at a coffee shop" },
      { date: daysAgo(160).split('T')[0], summary: "Met at a house party in the East Village" }
    ]
  },
  {
    id: 'seed-contact-45',
    name: "Derek Johnson",
    relationship_type: "acquaintance",
    how_we_met: "Uber driver who gave me the best life advice at 2am. We exchanged numbers but haven't hung out.",
    interests: ["Philosophy", "Driving"],
    work: "Uber Driver / Part-time philosophy student at CUNY",
    birthday: null,
    significant_other: null,
    last_interaction: {
      approximate_date: daysAgo(140),
      description: "He texted me a philosophy quote out of nowhere, I replied and we chatted briefly"
    },
    open_threads: [
      "He invited me to a philosophy discussion group at CUNY — might be interesting"
    ],
    life_updates: [],
    tags: ["Random", "Philosophy"],
    importance: 1,
    created_at: Date.now(),
    interactions: [
      { date: daysAgo(140).split('T')[0], summary: "Text exchange about a Nietzsche quote" },
      { date: daysAgo(200).split('T')[0], summary: "Best Uber ride of my life — talked about free will for 45 min" }
    ]
  },
  {
    id: 'seed-contact-46',
    name: "Vivian Tran",
    relationship_type: "acquaintance",
    how_we_met: "She works at the boba shop near campus. We've chatted enough to know each other's names.",
    interests: ["Boba", "K-dramas"],
    work: "Barista at Kung Fu Tea near NYU",
    birthday: null,
    significant_other: null,
    last_interaction: {
      approximate_date: daysAgo(7),
      description: "Got my usual order, she asked about my classes"
    },
    open_threads: [
      "She mentioned she's applying to NYU nursing — wish her luck next time"
    ],
    life_updates: [
      "Applying to NYU's nursing program"
    ],
    tags: ["Local", "Boba shop"],
    importance: 1,
    created_at: Date.now(),
    interactions: [
      { date: daysAgo(7).split('T')[0], summary: "Got boba, chatted about school" },
      { date: daysAgo(20).split('T')[0], summary: "She gave me a free boba on my birthday" }
    ]
  },
  {
    id: 'seed-contact-47',
    name: "Professor Alan Whitfield",
    relationship_type: "mentor",
    how_we_met: "Taught my first-year writing seminar at NYU. Old-school professor, brilliant but intimidating.",
    interests: ["Literature", "Pipe smoking", "Classical music"],
    work: "Professor of English at NYU",
    birthday: null,
    significant_other: null,
    last_interaction: {
      approximate_date: daysAgo(150),
      description: "Emailed him about a book recommendation, he responded with a list of 12"
    },
    open_threads: [
      "Read at least 3 of the 12 books he recommended"
    ],
    life_updates: [
      "Publishing a new book on American modernist literature"
    ],
    tags: ["NYU", "Professor", "Writing"],
    importance: 1,
    created_at: Date.now(),
    interactions: [
      { date: daysAgo(150).split('T')[0], summary: "Email exchange about book recommendations" },
      { date: daysAgo(300).split('T')[0], summary: "Office hours — he said my final essay was the best in the class" }
    ]
  },
  {
    id: 'seed-contact-48',
    name: "Kevin Zhao",
    relationship_type: "acquaintance",
    how_we_met: "Met at a tech meetup in Flatiron. He's building a social app and wanted to talk about it.",
    interests: ["Startups", "Table tennis"],
    work: "Full-stack Developer at a seed-stage startup",
    birthday: null,
    significant_other: null,
    last_interaction: {
      approximate_date: daysAgo(85),
      description: "He DMed me on Twitter about a React library he thought I'd find useful"
    },
    open_threads: [
      "Check out the React library he recommended"
    ],
    life_updates: [],
    tags: ["Tech", "Meetup"],
    importance: 1,
    created_at: Date.now(),
    interactions: [
      { date: daysAgo(85).split('T')[0], summary: "Twitter DM about a React library" },
      { date: daysAgo(130).split('T')[0], summary: "Tech meetup in Flatiron, exchanged ideas about his social app" }
    ]
  },
  {
    id: 'seed-contact-49',
    name: "Gabrielle Moreau",
    relationship_type: "acquaintance",
    how_we_met: "Camille's friend from the Paris architecture school. Met her once at Camille's wine night.",
    interests: ["Architecture", "Wine", "Photography"],
    work: "Architecture Intern at Foster + Partners NYC office",
    birthday: null,
    significant_other: null,
    last_interaction: {
      approximate_date: daysAgo(14),
      description: "Brief chat at Camille's wine and cheese night"
    },
    open_threads: [],
    life_updates: [
      "Just moved to NYC from Paris for her internship"
    ],
    tags: ["Camille's friend", "French"],
    importance: 1,
    created_at: Date.now(),
    interactions: [
      { date: daysAgo(14).split('T')[0], summary: "Camille's wine night, she told me about adjusting to NYC" }
    ]
  },
  {
    id: 'seed-contact-50',
    name: "Miguel Herrera",
    relationship_type: "acquaintance",
    how_we_met: "Lucia's husband. Quiet guy, but a phenomenal cook. From Puebla originally.",
    interests: ["Mexican cooking", "Soccer", "Gardening"],
    work: "Line Cook at a Mexican restaurant in the West Village",
    birthday: daysFromNow(1),
    significant_other: "Lucia",
    last_interaction: {
      approximate_date: daysAgo(24),
      description: "He cooked birria tacos when I went to their place for salsa night"
    },
    open_threads: [
      "His birthday is tomorrow — send a text",
      "He wants to show me how to make mole from scratch"
    ],
    life_updates: [
      "Working toward becoming sous chef at the restaurant",
      "Growing chili peppers on their fire escape"
    ],
    tags: ["Lucia's husband", "Cooking"],
    importance: 1,
    created_at: Date.now(),
    interactions: [
      { date: daysAgo(24).split('T')[0], summary: "Salsa night at their place, his birria was the best I've ever had" },
      { date: daysAgo(85).split('T')[0], summary: "Community center holiday event, he brought tamales" }
    ]
  }
];

export function loadSeedData() {
  return seedContacts;
}
