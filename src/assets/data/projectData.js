import { imageAsset } from "../images/imagesAsset";
import { aiSkillsIcons } from "../images/aiSkillsIcons";

/**
 * Enhanced universal skill icon resolver.
 * Maps any technology string to authentic local brand SVGs/WebP/PNGs.
 * Fallbacks gracefully if an unknown technology is passed.
 */
export const getSkillIcon = (skillName) => {
  const normalized = (skillName || "").toLowerCase().replace(/[\s.-]/g, "");

  // Frontend & Core
  if (normalized.includes("react")) return imageAsset.reactImg;
  if (normalized.includes("next")) return aiSkillsIcons.nextjs;
  if (normalized.includes("typescript")) return aiSkillsIcons.typescript;
  if (normalized.includes("js3d") || normalized === "javascript" || normalized === "js") return imageAsset.jsImg;
  if (normalized.includes("html")) return imageAsset.htmlImg;
  if (normalized.includes("css")) return imageAsset.cssImg;
  if (normalized.includes("tailwind")) return imageAsset.tailwindImg;
  if (normalized.includes("gsap")) return imageAsset.gsapImg;
  if (normalized.includes("framer")) return imageAsset.framerImg;
  if (normalized.includes("three")) return aiSkillsIcons.threejs;

  // Backend & Databases
  if (normalized.includes("node")) return imageAsset.nodejsImg;
  if (normalized.includes("express")) return imageAsset.expressImg;
  if (normalized.includes("mongo")) return imageAsset.mongodbImg;
  if (normalized.includes("python")) return imageAsset.pythonImg;
  if (normalized.includes("java") && !normalized.includes("script")) return imageAsset.javaImg;
  if (normalized.includes("c++") || normalized.includes("cpp")) return imageAsset.cppImg;
  if (normalized === "c") return imageAsset.cImg;
  if (normalized.includes("supabase")) return imageAsset.supabaseImg;
  if (normalized.includes("appwrite")) return imageAsset.appwriteImg;

  // Cloud, Auth & Tooling
  if (normalized.includes("vercel")) return imageAsset.vercelImg;
  if (normalized.includes("inngest")) return imageAsset.inngest;
  if (normalized.includes("clerk")) return aiSkillsIcons.clerk;
  if (normalized.includes("vscode")) return imageAsset.vscodeImg;
  if (normalized.includes("git") && !normalized.includes("hub")) return imageAsset.gitImg;
  if (normalized.includes("github")) return imageAsset.githubImg;
  if (normalized.includes("postman")) return imageAsset.postmanImg;
  if (normalized.includes("email")) return aiSkillsIcons.emailjs;

  // AI & Modern Stack
  if (normalized.includes("gemini")) return aiSkillsIcons.gemini;
  if (normalized.includes("rag")) return aiSkillsIcons.rag;
  if (normalized.includes("vector") || normalized.includes("embed")) return aiSkillsIcons.vectorDb;
  if (normalized.includes("voice") || normalized.includes("speech") || normalized.includes("audio")) return aiSkillsIcons.llm;
  if (normalized.includes("socket")) return imageAsset.nodejsImg;
  if (normalized.includes("modal")) return imageAsset.pythonImg;
  if (normalized.includes("llm") || normalized.includes("agent") || normalized.includes("ai")) return aiSkillsIcons.llm;

  return imageAsset.reactImg;
};

/**
 * Scalable Project Portfolio Data
 * Easily add as many new projects as desired by appending objects to this array.
 */
const projectData = [
  {
  id: "learning-room",
  title: "Learning Room",
  category: "Collaborative Learning Platform",
  year: "2026",
  color: "#6366f1",
  glowColor: "rgba(99, 102, 241, 0.4)",
  description:
    "A collaborative learning space where students connect, create rooms, and learn together in real time. Features interactive whiteboards, live room discussions, shared notes, and collaborative study tools designed to make learning more engaging and productive.",
  projectImage: imageAsset.learningRoom,
  skills: [
    "React",
    "JavaScript",
    "Node.js",
    "Express.js",
    "MongoDB",
    "Socket.IO"
  ],
  liveDemo: "https://learning-roomai.vercel.app/",
  codeDemo: "https://github.com/Ratnesh-Chaturvedi/Learning-Room-",
},
 {
  id: "voice-ai",
  title: "Voice AI",
  category: "AI-Powered Voice Generation",
  year: "2026",
  color: "#f05038",
  glowColor: "rgba(240, 80, 56, 0.45)",
  description:
    "An AI-powered voice platform that transforms text into natural-sounding speech and enables personalized voice cloning. Users can generate expressive audio, create and manage custom voices, and interact with intelligent speech capabilities through an intuitive interface.",
  projectImage: imageAsset.voiceAi,
  skills: [
    "NextJS",
    "TypeScript",
    "Python",
    "Modal",
    "AI Voice Processing"
  ],
  liveDemo: "https://voice-ai-steel.vercel.app/",
  codeDemo: "https://github.com/Ratnesh-Chaturvedi/Voice-AI",
},
  {
    id: "hospital",
    title: "Hospital Management Web App",
    category: "Full-Stack Healthcare Platform",
    year: "2025",
    color: "#00bae2",
    glowColor: "rgba(0, 186, 226, 0.4)",
    description:
      "Comprehensive doctor-patient consultation and appointment booking platform with real-time schedule management, role-based dashboards, and responsive medical records.",
    projectImage: imageAsset.project1,
    skill: ["ReactJS", "NodeJs", "MongoDB", "Express", "Vercel"],
    liveDemo: "https://doctor-appointment-booking-six-kappa.vercel.app/",
    codeDemo: "https://github.com/Ratnesh-Chaturvedi/Hospital-frontend",
  },
  {
    id: "connectin",
    title: "ConnectIn Social Media Web App",
    category: "Full-Stack Social Network",
    year: "2025 - 2026",
    color: "#38bdf8",
    glowColor: "rgba(56, 189, 248, 0.4)",
    description:
      "Modern professional networking platform featuring real-time post feeds, media attachments, background event scheduling with Inngest, and secure Clerk authentication.",
    projectImage: imageAsset.project5,
    skill: ["ReactJS", "NodeJs", "MongoDB", "Express", "Vercel", "Inngest", "Clerk"],
    liveDemo: "https://connectin-ten.vercel.app/",
    codeDemo: "https://github.com/Ratnesh-Chaturvedi/ConnectIn-Social-Media-WebApp",
  },
  {
    id: "k72",
    title: "K72.ca Agency Frontend Clone",
    category: "Creative Motion & WebGL Experience",
    year: "2025",
    color: "#ffc300",
    glowColor: "rgba(255, 195, 0, 0.4)",
    description:
      "Award-winning agency recreation showcasing fluid physics cursor dynamics, precision GSAP ScrollTrigger timeline choreography, and interactive typographic layouts.",
    projectImage: imageAsset.project2,
    skill: ["ReactJS", "GSAP", "Tailwind CSS"],
    liveDemo: "https://k72-ca-frontend.vercel.app/",
    codeDemo: "https://github.com/Ratnesh-Chaturvedi/K72.ca-Frontend",
  },
  {
    id: "gemini",
    title: "Gemini AI Studio UI Clone",
    category: "Generative AI Conversational UI",
    year: "2025",
    color: "#a855f7",
    glowColor: "rgba(168, 85, 247, 0.45)",
    description:
      "Full-fidelity Google Gemini AI web client integrating real-time generative prompt streaming, syntax-highlighted code blocks, and adaptive glassmorphism design.",
    projectImage: imageAsset.project3,
    skill: ["ReactJS", "Tailwind CSS", "Gemini API"],
    liveDemo: "https://github.com/Ratnesh-Chaturvedi/Gemini-Ui-Clone",
    codeDemo: "https://github.com/Ratnesh-Chaturvedi/Gemini-Ui-Clone",
  },
  {
    id: "portfolio",
    title: "Interactive 3D Portfolio @2026",
    category: "WebGL & Motion Architecture",
    year: "2026",
    color: "#f05038",
    glowColor: "rgba(240, 80, 56, 0.45)",
    description:
      "Cutting-edge personal portfolio powered by a procedural 3D dot-matrix Three.js globe, dynamic SVG constellation skill paths, and circular project timeline navigation.",
    projectImage: imageAsset.project4,
    skill: ["ReactJS", "Three.js", "GSAP", "Tailwind CSS", "VSCode"],
    liveDemo: "https://ratnesh-chaturvedi-portfolio.vercel.app/",
    codeDemo: "https://github.com/Ratnesh-Chaturvedi",
  },
];

export default projectData;
