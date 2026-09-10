export type SkillGroup = {
  title: string;
  skills: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Backend",
    skills: [
      "Node.js",
      "Express.js",
      "FastAPI",
      "PostgreSQL",
      "Redis",
      "BullMQ",
      "Docker",
      "REST APIs",
    ],
  },
  {
    title: "Frontend",
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
    ],
  },
  {
    title: "Core CS",
    skills: [
      "Data Structures",
      "Algorithms",
      "SQL",
      "Git",
    ],
  },
  {
    title: "Applied AI / GenAI",
    skills: [
      "RAG Pipelines",
      "Google ADK",
      "MCP",
      "LLM Integration",
      "Sentence-Transformers",
      "Vector Databases",
      "RAGAS",
      "DeepEval",
    ],
  },
];

