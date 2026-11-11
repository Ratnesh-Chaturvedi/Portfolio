/**
 * High-definition SVGs encoded as data URIs for Generative AI & LLM Skills.
 * RAG Architecture, Vector Embeddings, Vector Databases, LLMs & Agents, Prompt Engineering.
 */

// 1. RAG (Retrieval-Augmented Generation) Icon
const ragSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
  <defs>
    <linearGradient id="ragGrad" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#a855f7"/>
      <stop offset="100%" stop-color="#06b6d4"/>
    </linearGradient>
    <linearGradient id="docGrad" x1="12" y1="8" x2="40" y2="48" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#3b0764"/>
      <stop offset="100%" stop-color="#1e1b4b"/>
    </linearGradient>
  </defs>
  <!-- Base Document -->
  <rect x="12" y="8" width="28" height="38" rx="4" fill="url(#docGrad)" stroke="#a855f7" stroke-width="2"/>
  <!-- Document Content Lines -->
  <line x1="18" y1="16" x2="30" y2="16" stroke="#c084fc" stroke-width="2" stroke-linecap="round"/>
  <line x1="18" y1="22" x2="34" y2="22" stroke="#e9d5ff" stroke-width="1.8" stroke-linecap="round"/>
  <line x1="18" y1="28" x2="32" y2="28" stroke="#e9d5ff" stroke-width="1.8" stroke-linecap="round"/>
  <line x1="18" y1="34" x2="26" y2="34" stroke="#a855f7" stroke-width="1.8" stroke-linecap="round"/>
  <!-- Retrieval Search Beam -->
  <circle cx="38" cy="38" r="13" fill="#0f172a" stroke="url(#ragGrad)" stroke-width="2.5"/>
  <circle cx="38" cy="38" r="7" fill="none" stroke="#06b6d4" stroke-width="1.5" stroke-dasharray="2 3"/>
  <line x1="47" y1="47" x2="56" y2="56" stroke="url(#ragGrad)" stroke-width="3" stroke-linecap="round"/>
  <!-- Generation AI Spark -->
  <path d="M38 31 L39.5 35.5 L44 37 L39.5 38.5 L38 43 L36.5 38.5 L32 37 L36.5 35.5 Z" fill="#38bdf8"/>
</svg>`;

// 2. Vector Embeddings Icon
const embeddingsSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
  <defs>
    <linearGradient id="vecGrad" x1="10" y1="54" x2="54" y2="10" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#8b5cf6"/>
      <stop offset="50%" stop-color="#ec4899"/>
      <stop offset="100%" stop-color="#38bdf8"/>
    </linearGradient>
  </defs>
  <!-- 3D Hyperspace Coordinate Axes -->
  <line x1="12" y1="52" x2="12" y2="12" stroke="#64748b" stroke-width="2" stroke-linecap="round"/>
  <line x1="12" y1="52" x2="54" y2="52" stroke="#64748b" stroke-width="2" stroke-linecap="round"/>
  <line x1="12" y1="52" x2="36" y2="30" stroke="#64748b" stroke-width="1.5" stroke-linecap="round" stroke-dasharray="3 3"/>
  <!-- Main Vector Arrow -->
  <line x1="12" y1="52" x2="46" y2="18" stroke="url(#vecGrad)" stroke-width="3" stroke-linecap="round"/>
  <polygon points="46,18 38,20 44,26" fill="#38bdf8"/>
  <!-- Semantic Embedding Cluster Points -->
  <circle cx="46" cy="18" r="4.5" fill="#38bdf8"/>
  <circle cx="46" cy="18" r="7" stroke="#38bdf8" stroke-width="1" stroke-opacity="0.5"/>
  <circle cx="28" cy="24" r="3" fill="#c084fc"/>
  <circle cx="34" cy="38" r="3.5" fill="#f472b6"/>
  <circle cx="22" cy="40" r="2.5" fill="#818cf8"/>
  <circle cx="48" cy="34" r="3" fill="#a78bfa"/>
  <!-- Distance Cosine Connections -->
  <line x1="46" y1="18" x2="28" y2="24" stroke="#c084fc" stroke-width="1.2" stroke-dasharray="2 3" stroke-opacity="0.7"/>
  <line x1="46" y1="18" x2="48" y2="34" stroke="#a78bfa" stroke-width="1.2" stroke-dasharray="2 3" stroke-opacity="0.7"/>
  <line x1="28" y1="24" x2="34" y2="38" stroke="#ec4899" stroke-width="1" stroke-dasharray="2 2" stroke-opacity="0.6"/>
</svg>`;

// 3. Vector Database Icon (Pinecone / Chroma / Milvus / Qdrant style)
const vectorDbSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
  <defs>
    <linearGradient id="dbGrad" x1="12" y1="10" x2="52" y2="54" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#a855f7"/>
      <stop offset="100%" stop-color="#2563eb"/>
    </linearGradient>
  </defs>
  <!-- Database Top Lid -->
  <ellipse cx="32" cy="16" rx="20" ry="7" fill="#1e1b4b" stroke="url(#dbGrad)" stroke-width="2"/>
  <!-- Top Tier Wall -->
  <path d="M12 16 v12 c0 4 9 7 20 7 s20 -3 20 -7 v-12" fill="#0f172a" stroke="url(#dbGrad)" stroke-width="2"/>
  <!-- Bottom Tier Wall -->
  <path d="M12 28 v14 c0 4 9 7 20 7 s20 -3 20 -7 v-14" fill="#090d16" stroke="url(#dbGrad)" stroke-width="2"/>
  <!-- Internal HNSW High-D Vector Nodes -->
  <circle cx="24" cy="22" r="2.5" fill="#38bdf8"/>
  <circle cx="40" cy="22" r="2.5" fill="#38bdf8"/>
  <circle cx="32" cy="27" r="3" fill="#c084fc"/>
  <line x1="24" y1="22" x2="32" y2="27" stroke="#38bdf8" stroke-width="1.2"/>
  <line x1="40" y1="22" x2="32" y2="27" stroke="#38bdf8" stroke-width="1.2"/>
  <!-- Bottom Index Graph -->
  <circle cx="22" cy="35" r="2" fill="#ec4899"/>
  <circle cx="34" cy="38" r="2.5" fill="#a855f7"/>
  <circle cx="42" cy="34" r="2" fill="#06b6d4"/>
  <line x1="22" y1="35" x2="34" y2="38" stroke="#a855f7" stroke-width="1"/>
  <line x1="34" y1="38" x2="42" y2="34" stroke="#06b6d4" stroke-width="1"/>
</svg>`;

// 4. LLMs & GenAI Agents Icon (Neural Spark / Brain / Gemini emblem)
const llmGenAiSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
  <defs>
    <linearGradient id="sparkGrad" x1="8" y1="8" x2="56" y2="56" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#ec4899"/>
      <stop offset="50%" stop-color="#a855f7"/>
      <stop offset="100%" stop-color="#06b6d4"/>
    </linearGradient>
  </defs>
  <!-- Hexagonal AI Chip Core -->
  <polygon points="32,6 52,17 52,41 32,52 12,41 12,17" fill="#0f172a" stroke="url(#sparkGrad)" stroke-width="2.2"/>
  <!-- Central Generative Intelligence Spark -->
  <path d="M32 14 C32 24, 25 31, 15 31 C25 31, 32 38, 32 48 C32 38, 39 31, 49 31 C39 31, 32 24, 32 14 Z" fill="url(#sparkGrad)"/>
  <!-- Inner Brilliance -->
  <circle cx="32" cy="31" r="3.5" fill="#ffffff"/>
  <!-- Neural Satellite Nodes -->
  <circle cx="16" cy="19" r="2" fill="#38bdf8"/>
  <circle cx="48" cy="19" r="2" fill="#ec4899"/>
  <circle cx="48" cy="39" r="2" fill="#c084fc"/>
  <circle cx="16" cy="39" r="2" fill="#a855f7"/>
  <line x1="16" y1="19" x2="23" y2="24" stroke="#38bdf8" stroke-width="1" stroke-opacity="0.6"/>
  <line x1="48" y1="19" x2="41" y2="24" stroke="#ec4899" stroke-width="1" stroke-opacity="0.6"/>
</svg>`;

// 5. Prompt & Context Engineering Icon
const promptSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
  <defs>
    <linearGradient id="promptGrad" x1="8" y1="14" x2="56" y2="50" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#3b82f6"/>
      <stop offset="50%" stop-color="#8b5cf6"/>
      <stop offset="100%" stop-color="#06b6d4"/>
    </linearGradient>
  </defs>
  <!-- Terminal Window Frame -->
  <rect x="8" y="12" width="48" height="40" rx="6" fill="#0b0f19" stroke="url(#promptGrad)" stroke-width="2"/>
  <!-- Terminal Top Header Bar -->
  <line x1="8" y1="22" x2="56" y2="22" stroke="#334155" stroke-width="1.2"/>
  <circle cx="15" cy="17" r="1.8" fill="#ef4444"/>
  <circle cx="21" cy="17" r="1.8" fill="#f59e0b"/>
  <circle cx="27" cy="17" r="1.8" fill="#10b981"/>
  <!-- Prompt Command Symbol > -->
  <path d="M16 29 L23 34 L16 39" stroke="#38bdf8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
  <!-- Blinking Cursor -->
  <line x1="26" y1="39" x2="35" y2="39" stroke="#a855f7" stroke-width="2.5" stroke-linecap="round"/>
  <!-- AI Response Star -->
  <path d="M42 27 L43.2 30.5 L47 31.5 L43.2 32.5 L42 36 L40.8 32.5 L37 31.5 L40.8 30.5 Z" fill="#ec4899"/>
  <!-- Token Response Dots -->
  <circle cx="20" cy="46" r="1.5" fill="#94a3b8"/>
  <circle cx="26" cy="46" r="1.5" fill="#94a3b8"/>
  <circle cx="32" cy="46" r="1.5" fill="#94a3b8"/>
  <circle cx="38" cy="46" r="1.5" fill="#94a3b8"/>
</svg>`;

export const aiSkillsIcons = {
  rag: `data:image/svg+xml;utf8,${encodeURIComponent(ragSvg)}`,
  embeddings: `data:image/svg+xml;utf8,${encodeURIComponent(embeddingsSvg)}`,
  vectorDb: `data:image/svg+xml;utf8,${encodeURIComponent(vectorDbSvg)}`,
  llm: `data:image/svg+xml;utf8,${encodeURIComponent(llmGenAiSvg)}`,
  prompt: `data:image/svg+xml;utf8,${encodeURIComponent(promptSvg)}`,
};
