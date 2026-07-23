export interface CompanyKit {
  id: string;
  name: string;
  logo: string;
  color: string;
  bgGradient: string;
  borderColor: string;
  tagline: string;
  focusAreas: string[];
  evaluationStyle: string;
  questionPool: {
    title: string;
    category: string;
    difficulty: "EASY" | "MEDIUM" | "HARD";
    questionText: string;
    hint: string;
  }[];
}

export const COMPANY_KITS: CompanyKit[] = [
  {
    id: "google",
    name: "Google Track",
    logo: "🌐",
    color: "from-blue-500 to-emerald-500",
    bgGradient: "bg-gradient-to-br from-blue-950/40 via-zinc-900 to-emerald-950/30",
    borderColor: "border-blue-500/30",
    tagline: "Scalable Data Structures, Algorithmic Thinking & System Elegance",
    focusAreas: ["Algorithms & Data Structures", "Distributed Systems", "Edge Case Handling", "Clean Architecture"],
    evaluationStyle: "Evaluates optimal time/space complexity, modular code, and clear step-by-step problem breakdown.",
    questionPool: [
      {
        title: "LRU Cache Implementation with O(1) Operations",
        category: "Data Structures",
        difficulty: "HARD",
        questionText: "Design and implement a Data Structure for Least Recently Used (LRU) Cache with O(1) time complexity for get and put operations.",
        hint: "Combine a Doubly Linked List for element ordering with a HashMap for instant O(1) key lookup.",
      },
      {
        title: "Google Search Autocomplete System Design",
        category: "System Design",
        difficulty: "HARD",
        questionText: "Design Google Search Autocomplete suggestions system serving 100K queries/sec with sub-50ms latency.",
        hint: "Use a Trie data structure cached in Redis cluster with asynchronous search log ingestion via Kafka.",
      },
    ],
  },
  {
    id: "amazon",
    name: "Amazon Track",
    logo: "📦",
    color: "from-amber-500 to-orange-600",
    bgGradient: "bg-gradient-to-br from-amber-950/40 via-zinc-900 to-orange-950/30",
    borderColor: "border-amber-500/30",
    tagline: "16 Leadership Principles, High-Throughput E-Commerce & Customer Obsession",
    focusAreas: ["Customer Obsession", "Bias for Action", "High Scalability", "Operational Excellence"],
    evaluationStyle: "Evaluates behavioral STAR narrative against Amazon LP standards alongside production-grade resilience.",
    questionPool: [
      {
        title: "Amazon Prime Day Flash Sale System",
        category: "System Design",
        difficulty: "HARD",
        questionText: "Design a high-concurrency inventory reservation system for Amazon Prime Day flash sales preventing overselling under 500K peak TPS.",
        hint: "Use Redis Lua scripts for atomic inventory decrement, optimistic DB locking, and Kafka event streaming.",
      },
      {
        title: "Behavioral: Disagreement & Customer Impact",
        category: "Behavioral & LPs",
        difficulty: "MEDIUM",
        questionText: "Describe a time when you disagreed with a technical decision by a senior peer or manager. How did you handle it and keep customer outcome first?",
        hint: "Frame using STAR method highlighting data-driven benchmarks and Amazon's Have Backbone; Disagree and Commit LP.",
      },
    ],
  },
  {
    id: "microsoft",
    name: "Microsoft Track",
    logo: "🪟",
    color: "from-sky-500 to-blue-600",
    bgGradient: "bg-gradient-to-br from-sky-950/40 via-zinc-900 to-blue-950/30",
    borderColor: "border-sky-500/30",
    tagline: "Enterprise Cloud Systems, Azure Integration & Pragmatic Engineering",
    focusAreas: ["Object-Oriented Design", "Cloud Native & Microservices", "API Quality", "Collaboration"],
    evaluationStyle: "Evaluates solid OOP design patterns, backward compatibility, and structured enterprise development.",
    questionPool: [
      {
        title: "Design Microsoft Teams Notifications Gateway",
        category: "System Design",
        difficulty: "HARD",
        questionText: "Design a multi-channel push notification service for Microsoft Teams handling web, mobile, and desktop clients.",
        hint: "Use WebSockets/SSE connections, Azure Event Hubs, and idempotent payload delivery.",
      },
      {
        title: "Design a Scalable Rate Limiter Middleware",
        category: "System Design & Coding",
        difficulty: "MEDIUM",
        questionText: "Implement an enterprise API Rate Limiter supporting Token Bucket or Sliding Window Log algorithms.",
        hint: "Utilize Redis sorted sets for sub-millisecond sliding window request timestamp tracking.",
      },
    ],
  },
  {
    id: "meta",
    name: "Meta / Facebook Track",
    logo: "♾️",
    color: "from-blue-600 to-violet-600",
    bgGradient: "bg-gradient-to-br from-blue-950/40 via-zinc-900 to-violet-950/30",
    borderColor: "border-blue-500/40",
    tagline: "High-Speed Coding, Social Graph Processing & Ultra-Scale Systems",
    focusAreas: ["Rapid Problem Solving", "Graph Algorithms", "Global Data Consistency", "Real-Time Feeds"],
    evaluationStyle: "Evaluates rapid bug-free implementation, edge case speed, and massive scale social infrastructure intuition.",
    questionPool: [
      {
        title: "News Feed System Architecture (2B Users)",
        category: "System Design",
        difficulty: "HARD",
        questionText: "Design the Meta News Feed system providing real-time posts from friends and followed pages to 2 billion daily active users.",
        hint: "Use hybrid Push model for normal users and Pull model for high-follower celebrities to balance write amplification.",
      },
      {
        title: "Find Shortest Connection Path (Social Graph)",
        category: "Algorithms",
        difficulty: "MEDIUM",
        questionText: "Given a social graph of 1 billion profiles, find the shortest path (degrees of separation) between two users.",
        hint: "Apply Bidirectional Breadth-First Search (BFS) to reduce search space exponentially compared to standard BFS.",
      },
    ],
  },
  {
    id: "stripe",
    name: "Stripe Track",
    logo: "💳",
    color: "from-indigo-500 to-purple-600",
    bgGradient: "bg-gradient-to-br from-indigo-950/40 via-zinc-900 to-purple-950/30",
    borderColor: "border-indigo-500/40",
    tagline: "Clean API Ergonomics, Idempotency & Financial Transaction Safety",
    focusAreas: ["API Elegance", "Financial Idempotency", "Concurrency Safety", "Production Debugging"],
    evaluationStyle: "Evaluates API contract design, strict error handling, and transactional exactness under failure modes.",
    questionPool: [
      {
        title: "Idempotent Payment API Gateway",
        category: "API Design & Engineering",
        difficulty: "HARD",
        questionText: "Design a payment processing API endpoint ensuring strict idempotency so duplicate POST requests never double-charge customers.",
        hint: "Use Idempotency-Key headers, atomic DB lock reservations, and cached response payloads.",
      },
      {
        title: "Design a Multi-Currency Ledger Engine",
        category: "System Design",
        difficulty: "HARD",
        questionText: "Design a double-entry accounting ledger system guaranteeing immutable transaction records and zero floating-point discrepancies.",
        hint: "Store money amounts as integer cents in big decimal form and enforce double-entry (Debit = Credit) invariants.",
      },
    ],
  },
];
