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
      'Build multi-agent systems with Claude API, Anthropic SDK, and MCP servers. Design agentic workflows for sports clubs, ticketing and fan engagement. Work with tool use, multi-model orchestration, and production-grade agent infrastructure.',
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
      'Fine-tune large language models on club, ticketing and fan data. Build RAG pipelines, embeddings, and vector search with Pinecone, Weaviate, and ChromaDB. Evaluate models on domain benchmarks.',
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
    title: 'Integrations Engineer',
    description:
      'Connect ticketing, payments, CRM and loyalty systems for sports clubs and venues. Build automation pipelines, data syncs and reporting on top of them. Keep integrations stable through the season.',
    skills: [
      'REST APIs',
      'Webhooks',
      'Payment Integrations',
      'Ticketing Systems',
      'CRM Integration',
      'Data Pipelines',
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
      'Design architecture for enterprise AI agent deployments at scale. Multi-model orchestration across Claude, GPT, and Gemini. Build MCP server infrastructure and integration patterns for sports clubs and venues.',
    skills: [
      'System Architecture',
      'Claude API',
      'Gemini API',
      'MCP Servers',
      'Enterprise AI',
      'Multi-Agent Systems',
      'System Integration',
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
    industry: 'Sports Technology, Entertainment, Artificial Intelligence',
    url: `${BASE_URL}/career`,
  }));
}
