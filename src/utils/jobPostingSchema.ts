import { BASE_URL } from './alias';

interface JobPostingData {
  title: string;
  description: string;
  skills: string[];
}

const JOB_POSTINGS: JobPostingData[] = [
  {
    title: 'AI Agent Engineer',
    description:
      'Build multi-agent systems with Claude API, Anthropic SDK, and MCP servers. Design agentic workflows for compliance automation in FinTech and HealthTech. Work with tool use, multi-model orchestration, and production-grade agent infrastructure.',
    skills: [
      'Claude API',
      'Anthropic SDK',
      'MCP Servers',
      'Multi-Agent Systems',
      'Agentic Workflows',
      'Python',
      'TypeScript',
    ],
  },
  {
    title: 'LLM Fine-Tuning Engineer',
    description:
      'Fine-tune large language models for regulated industries using domain-specific datasets. Build RAG pipelines, embeddings, and vector search with Pinecone, Weaviate, and ChromaDB. Evaluate models with domain-specific benchmarks and compliance requirements.',
    skills: [
      'LLM Fine-Tuning',
      'RAG Systems',
      'Vector Databases',
      'Embeddings',
      'LangChain',
      'Hugging Face',
      'Python',
    ],
  },
  {
    title: 'Compliance AI Developer',
    description:
      'Build AI systems for FinTech and HealthTech that pass SOC2, HIPAA, and FDA audits. Implement audit trails, data governance, and automated risk scoring pipelines. Ensure AI agent outputs meet regulatory standards.',
    skills: [
      'SOC2',
      'HIPAA',
      'FDA 21 CFR Part 11',
      'Audit Trails',
      'Data Governance',
      'AI Compliance',
      'Python',
    ],
  },
  {
    title: 'Full-Stack AI Product Engineer',
    description:
      'Ship AI-powered products end-to-end using Next.js, FastAPI, and LLM integrations. Use Cursor, Claude Code, and Anthropic SDK as daily development tools. Build production interfaces for AI agent systems.',
    skills: [
      'Next.js',
      'FastAPI',
      'Claude Code',
      'Cursor',
      'Anthropic SDK',
      'React',
      'TypeScript',
    ],
  },
  {
    title: 'AI Solutions Architect',
    description:
      'Design architecture for enterprise AI agent deployments at scale. Multi-model orchestration across Claude, GPT, and Gemini. Build MCP server infrastructure and define compliance patterns for regulated industries.',
    skills: [
      'System Architecture',
      'Claude API',
      'Gemini API',
      'MCP Servers',
      'Enterprise AI',
      'Multi-Agent Systems',
      'Compliance',
    ],
  },
];

export function generateJobPostingSchema() {
  const datePosted = '2026-04-01';

  return JOB_POSTINGS.map((job) => ({
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: job.title,
    description: job.description,
    datePosted,
    employmentType: 'FULL_TIME',
    jobLocationType: 'TELECOMMUTE',
    applicantLocationRequirements: {
      '@type': 'Country',
      name: 'Worldwide',
    },
    hiringOrganization: {
      '@type': 'Organization',
      name: 'The BrightByte',
      sameAs: `${BASE_URL}`,
      logo: `${BASE_URL}/assets/images/icons/favicon.svg`,
    },
    skills: job.skills.join(', '),
    industry: 'Artificial Intelligence, FinTech, HealthTech, RegTech',
    url: `${BASE_URL}/career`,
  }));
}
