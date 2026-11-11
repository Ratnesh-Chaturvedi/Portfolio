import { imageAsset } from "../images/imagesAsset";
import { aiSkillsIcons } from "../images/aiSkillsIcons";

/**
 * 8 Continental & Polar Domains ordered in a continuous geographical rotation around Earth:
 * 0: North America (lon -97) - Frontend Ecosystem
 * 1: South America (lon -60) - Creative Motion & 3D
 * 2: Europe (lon 15) - Backend & Services
 * 3: Africa (lon 20) - Core Languages
 * 4: Asia (lon 95) - Database & BaaS
 * 5: Oceania (lon 135) - Developer Experience
 * 6: Antarctica (lat -72, lon 0) - Deployment & Cloud
 * 7: Arctic AI Core (lat 78, lon 0) - Generative AI & LLMs
 */
export const CONTINENTS_DATA = [
  {
    id: "na",
    name: "North America",
    domain: "Frontend Ecosystem",
    tagline: "Fluid, Responsive & Component-Driven UI",
    icon: "ri-layout-masonry-line",
    color: "#0ae448",
    glowColor: "rgba(10, 228, 72, 0.4)",
    badgeColor: "bg-[#0ae448]/15 border-[#0ae448]/40 text-[#0ae448]",
    center: { lat: 38, lon: -97 },
    rotX: 0.55,
    rotY: 1.69,
    description:
      "Crafting high-performance, fluid user interfaces with modern React architectures, reactive state management, and utility-first styling.",
    skills: [
      { name: "Next.js", icon: aiSkillsIcons.nextjs, tag: "Full-Stack React & SSR" },
      { name: "React.js", icon: imageAsset.reactImg, tag: "Primary Framework" },
      { name: "TypeScript", icon: aiSkillsIcons.typescript, tag: "Type-Safe UI" },
      { name: "Tailwind CSS", icon: imageAsset.tailwindImg, tag: "Utility First" },
      { name: "JavaScript", icon: imageAsset.jsImg, tag: "ES6+ Modern" },
    ],
    polygons: [
      // Alaska & Canada mainland & USA
      [
        [71, -165], [71, -141], [60, -140], [58, -136], [54, -130], [48, -124],
        [38, -123], [34, -120], [32, -117], [30, -115], [23, -110], [24, -106],
        [21, -105], [16, -98], [16, -94], [14, -92], [10, -84], [8, -77],
        [9, -79], [12, -86], [16, -88], [18, -91], [19, -96], [22, -97],
        [26, -97], [29, -94], [30, -89], [25, -81], [25, -80], [30, -81],
        [35, -75], [41, -72], [44, -66], [47, -64], [47, -53], [52, -55],
        [58, -62], [60, -65], [62, -75], [63, -80], [58, -80], [52, -82],
        [51, -89], [56, -90], [58, -94], [64, -89], [66, -86], [69, -94],
        [70, -130], [71, -165]
      ],
      // Greenland
      [
        [83, -30], [82, -20], [76, -20], [70, -25], [60, -44], [65, -52],
        [70, -55], [76, -60], [78, -70], [82, -60], [83, -30]
      ],
      // Florida
      [[31, -81], [25, -80], [25, -82], [30, -85], [31, -81]]
    ]
  },
  {
    id: "sa",
    name: "South America",
    domain: "Creative Motion & 3D",
    tagline: "Cinematic Scroll & WebGL Magic",
    icon: "ri-magic-line",
    color: "#ffc300",
    glowColor: "rgba(255, 195, 0, 0.4)",
    badgeColor: "bg-[#ffc300]/15 border-[#ffc300]/40 text-[#ffc300]",
    center: { lat: -15, lon: -60 },
    rotX: -0.26,
    rotY: 1.05,
    description:
      "Creating award-winning digital interactions with GSAP ScrollTrigger, physical spring dynamics in Framer Motion, and real-time Three.js graphics.",
    skills: [
      { name: "GSAP & ScrollTrigger", icon: imageAsset.gsapImg, tag: "Scroll Orchestration" },
      { name: "Framer Motion", icon: imageAsset.framerImg, tag: "Reactive Physics" },
      { name: "Three.js / WebGL", icon: imageAsset.jsImg, tag: "Interactive 3D" },
    ],
    polygons: [
      // South America Mainland
      [
        [12, -72], [10, -75], [8, -77], [2, -77], [-5, -81], [-14, -76],
        [-18, -70], [-23, -70], [-33, -72], [-42, -74], [-46, -75], [-53, -74],
        [-55, -67], [-52, -68], [-46, -66], [-38, -58], [-34, -53], [-30, -50],
        [-23, -43], [-20, -40], [-13, -39], [-8, -35], [-5, -35], [-2, -44],
        [0, -50], [4, -52], [6, -58], [10, -62], [11, -71], [12, -72]
      ]
    ]
  },
  {
    id: "eu",
    name: "Europe",
    domain: "Backend & Services",
    tagline: "Event-Driven APIs & Microservices",
    icon: "ri-server-line",
    color: "#ff4d6d",
    glowColor: "rgba(255, 77, 109, 0.4)",
    badgeColor: "bg-[#ff4d6d]/15 border-[#ff4d6d]/40 text-[#ff4d6d]",
    center: { lat: 50, lon: 15 },
    rotX: 0.87,
    rotY: -0.26,
    description:
      "Engineering robust RESTful APIs, asynchronous event workflows with Inngest, scalable server architectures, and production Express services.",
    skills: [
      { name: "Node.js", icon: imageAsset.nodejsImg, tag: "Runtime Architecture" },
      { name: "Express.js", icon: imageAsset.expressImg, tag: "REST APIs" },
      { name: "Inngest", icon: imageAsset.inngest, tag: "Event Workflows" },
    ],
    polygons: [
      // Mainland Europe & Iberia
      [
        [71, 28], [68, 14], [63, 9], [58, 6], [54, 9], [54, 14], [56, 12],
        [54, 9], [53, 6], [51, 2], [48, -4], [43, -9], [37, -9], [36, -6],
        [36, -2], [41, 1], [43, 3], [43, 9], [44, 12], [41, 15], [40, 18],
        [38, 24], [40, 26], [42, 28], [46, 30], [46, 38], [54, 38], [60, 30],
        [65, 30], [71, 28]
      ],
      // British Isles
      [[58, -5], [58, -2], [55, -1], [51, 1], [50, -5], [54, -5], [58, -5]],
      // Scandinavia
      [[71, 25], [68, 14], [62, 10], [58, 8], [58, 15], [62, 18], [66, 24], [71, 25]]
    ]
  },
  {
    id: "af",
    name: "Africa",
    domain: "Core Languages",
    tagline: "Algorithms, Systems & Clean Syntax",
    icon: "ri-code-s-slash-line",
    color: "#38bdf8",
    glowColor: "rgba(56, 189, 248, 0.4)",
    badgeColor: "bg-[#38bdf8]/15 border-[#38bdf8]/40 text-[#38bdf8]",
    center: { lat: 5, lon: 20 },
    rotX: 0.09,
    rotY: -0.35,
    description:
      "Deep foundation in low-level and high-level programming languages, algorithmic problem solving, memory management, and OOP paradigms.",
    skills: [
      { name: "Python", icon: imageAsset.pythonImg, tag: "AI, Data & Backend" },
      { name: "TypeScript", icon: aiSkillsIcons.typescript, tag: "Strict Static Typing" },
      { name: "JavaScript", icon: imageAsset.jsImg, tag: "Modern Full-Stack" },
      { name: "C++", icon: imageAsset.cppImg, tag: "OOP & Performance" },
      { name: "C", icon: imageAsset.cImg, tag: "Systems Programming" },
    ],
    polygons: [
      // Africa Mainland
      [
        [37, 10], [36, 3], [35, -5], [31, -10], [28, -13], [21, -17],
        [15, -17], [12, -16], [5, -10], [4, 2], [4, 7], [2, 9],
        [-5, 12], [-9, 13], [-16, 12], [-23, 14], [-28, 16], [-34, 18],
        [-34, 26], [-30, 31], [-25, 33], [-15, 40], [-10, 40], [-4, 39],
        [2, 44], [11, 51], [12, 44], [15, 40], [22, 38], [28, 34],
        [31, 32], [32, 24], [32, 15], [37, 10]
      ],
      // Madagascar
      [[-12, 49], [-16, 49], [-25, 47], [-25, 44], [-16, 44], [-12, 49]]
    ]
  },
  {
    id: "as",
    name: "Asia",
    domain: "Database & BaaS",
    tagline: "Scalable Data Stores & Cloud Backends",
    icon: "ri-database-2-line",
    color: "#e056fd",
    glowColor: "rgba(224, 86, 253, 0.4)",
    badgeColor: "bg-[#e056fd]/15 border-[#e056fd]/40 text-[#e056fd]",
    center: { lat: 35, lon: 95 },
    rotX: 0.61,
    rotY: -1.66,
    description:
      "Designing flexible NoSQL document schemas, relational PostgreSQL stores with Supabase, authentication layers, and real-time Appwrite databases.",
    skills: [
      { name: "MongoDB", icon: imageAsset.mongodbImg, tag: "NoSQL Database" },
      { name: "Appwrite", icon: imageAsset.appwriteImg, tag: "BaaS & Auth" },
      { name: "Supabase", icon: imageAsset.supabaseImg, tag: "Postgres BaaS" },
    ],
    polygons: [
      // Asia Mainland & Siberia & India & China
      [
        [42, 28], [41, 36], [37, 36], [34, 35], [31, 35], [28, 34], [27, 45],
        [24, 57], [22, 59], [15, 53], [12, 44], [20, 40], [25, 45], [28, 48],
        [30, 48], [30, 56], [25, 62], [25, 68], [23, 70], [16, 73], [8, 77],
        [13, 80], [16, 82], [22, 88], [21, 92], [16, 96], [10, 99], [1, 104],
        [8, 105], [16, 108], [22, 108], [22, 114], [30, 122], [37, 126],
        [40, 124], [40, 129], [42, 131], [47, 135], [54, 140], [59, 143],
        [60, 165], [66, 170], [66, -170], [70, -179], [72, 130], [76, 100],
        [73, 80], [60, 60], [55, 40], [46, 38], [42, 28]
      ],
      // Japan
      [[45, 142], [43, 145], [35, 140], [33, 132], [35, 135], [40, 140], [45, 142]]
    ]
  },
  {
    id: "oc",
    name: "Oceania",
    domain: "Developer Experience",
    tagline: "Tooling, Versioning & Productivity",
    icon: "ri-tools-line",
    color: "#fb8500",
    glowColor: "rgba(251, 133, 0, 0.4)",
    badgeColor: "bg-[#fb8500]/15 border-[#fb8500]/40 text-[#fb8500]",
    center: { lat: -25, lon: 135 },
    rotX: -0.44,
    rotY: -2.36,
    description:
      "Streamlined developer environment utilizing advanced VS Code setups, Git branch management, GitHub CI/CD, and rigorous API test suites with Postman.",
    skills: [
      { name: "VS Code", icon: imageAsset.vscodeImg, tag: "Editor Optimization" },
      { name: "Git", icon: imageAsset.gitImg, tag: "Version Control" },
      { name: "GitHub", icon: imageAsset.githubImg, tag: "Collaboration & Actions" },
      { name: "Postman", icon: imageAsset.postmanImg, tag: "API Debugging" },
    ],
    polygons: [
      // Australia
      [
        [-12, 136], [-12, 142], [-15, 145], [-20, 149], [-25, 153], [-30, 153],
        [-37, 150], [-39, 146], [-38, 141], [-35, 137], [-35, 134], [-32, 132],
        [-32, 125], [-35, 117], [-34, 115], [-28, 114], [-22, 114], [-20, 119],
        [-15, 124], [-15, 130], [-12, 136]
      ],
      // New Zealand
      [[-35, 173], [-38, 178], [-41, 175], [-46, 168], [-43, 171], [-38, 175], [-35, 173]]
    ]
  },
  {
    id: "an",
    name: "Antarctica",
    domain: "Deployment & Cloud",
    tagline: "Global Edge Hosting & Reliability",
    icon: "ri-cloud-line",
    color: "#00bae2",
    glowColor: "rgba(0, 186, 226, 0.4)",
    badgeColor: "bg-[#00bae2]/15 border-[#00bae2]/40 text-[#00bae2]",
    center: { lat: -72, lon: 0 },
    rotX: -1.25,
    rotY: -4.32,
    description:
      "Global serverless distribution through Vercel, automated staging environments, DNS configuration, and production edge caching.",
    skills: [
      { name: "Vercel", icon: imageAsset.vercelImg, tag: "Edge Network" },
      { name: "CI/CD & Hosting", icon: imageAsset.githubImg, tag: "Continuous Delivery" },
    ],
    polygons: [
      [
        [-65, -64], [-63, -57], [-68, -60], [-70, -75], [-72, -100], [-74, -130],
        [-77, -160], [-80, -180], [-85, -180], [-85, 180], [-80, 180], [-75, 160],
        [-67, 140], [-66, 110], [-66, 90], [-68, 70], [-70, 40], [-70, 10],
        [-70, -10], [-72, -30], [-65, -64]
      ]
    ]
  },
  {
    id: "ai",
    name: "Arctic AI Core",
    domain: "Generative AI & LLMs",
    tagline: "RAG Architecture, Vector Search & Autonomous Agents",
    icon: "ri-brain-line",
    color: "#a855f7",
    glowColor: "rgba(168, 85, 247, 0.45)",
    badgeColor: "bg-[#a855f7]/15 border-[#a855f7]/40 text-[#a855f7]",
    center: { lat: 78, lon: 0 },
    rotX: 1.35,
    rotY: -6.28,
    description:
      "Engineering production GenAI architectures with Retrieval-Augmented Generation (RAG), high-dimensional vector embeddings, semantic vector stores, and autonomous LLM agents.",
    skills: [
      { name: "RAG Architecture", icon: aiSkillsIcons.rag, tag: "Hybrid Retrieval & Context" },
      { name: "Vector Embeddings", icon: aiSkillsIcons.embeddings, tag: "Dense Semantic Vectors" },
      { name: "Vector Databases", icon: aiSkillsIcons.vectorDb, tag: "ChromaDB, Pinecone & Qdrant" },
      { name: "LLMs & GenAI", icon: aiSkillsIcons.llm, tag: "Gemini, LangChain & Agents" },
      { name: "Prompt Engineering", icon: aiSkillsIcons.prompt, tag: "Few-Shot & Chain-of-Thought" },
    ],
    polygons: [
      // Arctic Circle, Svalbard & Polar Ice Cap
      [
        [88, -180], [88, 180], [80, 180], [74, 140], [74, 80],
        [76, 30], [80, 15], [82, 0], [80, -25], [76, -45],
        [74, -80], [74, -135], [80, -180], [88, -180]
      ]
    ]
  }
];

/**
 * Checks if a [lat, lon] coordinate is inside a polygon.
 */
export function pointInPolygon(pt, poly) {
  const [lat, lon] = pt;
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [yi, xi] = poly[i];
    const [yj, xj] = poly[j];
    const intersect =
      yi > lat !== yj > lat &&
      lon < ((xj - xi) * (lat - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}

/**
 * Identifies which continent a given (lat, lon) belongs to.
 * Returns continent object or null.
 */
export function getContinentAt(lat, lon) {
  for (const continent of CONTINENTS_DATA) {
    for (const poly of continent.polygons) {
      if (pointInPolygon([lat, lon], poly)) {
        return continent;
      }
    }
  }
  return null;
}
