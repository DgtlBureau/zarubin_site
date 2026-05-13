interface ITechnology {
  id: number;
  title: string;
  description: string;
}

export const TechnologyData: ITechnology[] = [
  {
    id: 1,
    title: 'AI & LLMs',
    description:
      'Claude API, Anthropic SDK, OpenAI API, Gemini API, LangChain, LlamaIndex, Hugging Face, Fine-Tuning, RAG',
  },
  {
    id: 2,
    title: 'Agent Frameworks',
    description:
      'Claude Code, Cursor, MCP Servers, Tool Use, CrewAI, AutoGen, Multi-Agent Systems, Agentic Workflows',
  },
  {
    id: 3,
    title: 'Engineering',
    description:
      'Python, TypeScript, Next.js, FastAPI, React, Node.js, PostgreSQL, Pinecone, Weaviate, ChromaDB',
  },
  {
    id: 4,
    title: 'MLOps & Compliance',
    description:
      'Docker, Kubernetes, CI/CD, GitHub Actions, SOC2, HIPAA, FDA 21 CFR Part 11, Audit Trails, Grafana, Prometheus',
  },
];
