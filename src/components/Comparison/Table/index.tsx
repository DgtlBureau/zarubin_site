const CheckIcon = () => (
  <span className='flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/20'>
    <svg
      className='h-3.5 w-3.5 text-green-400'
      fill='none'
      stroke='currentColor'
      viewBox='0 0 24 24'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={3}
        d='M5 13l4 4L19 7'
      />
    </svg>
  </span>
);

const CrossIcon = () => (
  <span className='flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-500/20'>
    <svg
      className='h-3.5 w-3.5 text-red-400'
      fill='none'
      stroke='currentColor'
      viewBox='0 0 24 24'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={3}
        d='M6 18L18 6M6 6l12 12'
      />
    </svg>
  </span>
);

const NeutralIcon = () => (
  <span className='flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-yellow-500/20'>
    <svg
      className='h-3.5 w-3.5 text-yellow-400'
      fill='none'
      stroke='currentColor'
      viewBox='0 0 24 24'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={3}
        d='M20 12H4'
      />
    </svg>
  </span>
);

type RowData = {
  task: string;
  inhouse: { text: string; type: 'negative' | 'neutral' | 'positive' };
  brightbyte: { text: string; type: 'negative' | 'neutral' | 'positive' };
  bigfour: { text: string; type: 'negative' | 'neutral' | 'positive' };
};

type SectionData = {
  title: string;
  rows: RowData[];
};

const comparisonData: SectionData[] = [
  {
    title: 'Discovery & Strategy',
    rows: [
      {
        task: 'Requirement Analysis',
        inhouse: { text: 'Deep domain knowledge', type: 'positive' },
        brightbyte: { text: 'Strategic partnership approach', type: 'positive' },
        bigfour: { text: 'Comprehensive but prolonged', type: 'neutral' },
      },
      {
        task: 'Technical Architecture',
        inhouse: { text: 'Limited by team expertise', type: 'neutral' },
        brightbyte: { text: 'Best-in-class solutions', type: 'positive' },
        bigfour: { text: 'Enterprise-grade complexity', type: 'neutral' },
      },
      {
        task: 'Strategic Consulting',
        inhouse: { text: 'Internal perspective only', type: 'neutral' },
        brightbyte: { text: 'Cross-industry insights', type: 'positive' },
        bigfour: { text: 'Premium advisory services', type: 'positive' },
      },
    ],
  },
  {
    title: 'Design Excellence',
    rows: [
      {
        task: 'UX Research & Design',
        inhouse: { text: 'Resource-constrained', type: 'neutral' },
        brightbyte: { text: 'User-centric methodology', type: 'positive' },
        bigfour: { text: 'Process-heavy approach', type: 'neutral' },
      },
      {
        task: 'Visual Identity',
        inhouse: { text: 'Consistency challenges', type: 'neutral' },
        brightbyte: { text: 'Award-winning design', type: 'positive' },
        bigfour: { text: 'Corporate standards', type: 'neutral' },
      },
    ],
  },
  {
    title: 'Engineering',
    rows: [
      {
        task: 'Code Quality',
        inhouse: { text: 'Varies by talent', type: 'neutral' },
        brightbyte: { text: 'Senior-level standards', type: 'positive' },
        bigfour: { text: 'Rigorous but slower', type: 'positive' },
      },
      {
        task: 'Technology Stack',
        inhouse: { text: 'Legacy constraints', type: 'negative' },
        brightbyte: { text: 'Modern & scalable', type: 'positive' },
        bigfour: { text: 'Enterprise ecosystems', type: 'neutral' },
      },
      {
        task: 'System Integration',
        inhouse: { text: 'Internal systems focus', type: 'neutral' },
        brightbyte: { text: 'Seamless connectivity', type: 'positive' },
        bigfour: { text: 'Complex implementations', type: 'neutral' },
      },
    ],
  },
  {
    title: 'Quality Assurance',
    rows: [
      {
        task: 'Testing Coverage',
        inhouse: { text: 'Often deprioritized', type: 'negative' },
        brightbyte: { text: 'Comprehensive QA', type: 'positive' },
        bigfour: { text: 'Extensive protocols', type: 'positive' },
      },
      {
        task: 'CI/CD & Automation',
        inhouse: { text: 'Setup overhead', type: 'neutral' },
        brightbyte: { text: 'Built-in from day one', type: 'positive' },
        bigfour: { text: 'Enterprise pipelines', type: 'positive' },
      },
    ],
  },
  {
    title: 'Delivery & Support',
    rows: [
      {
        task: 'Time to Market',
        inhouse: { text: 'Hiring bottlenecks', type: 'negative' },
        brightbyte: { text: 'Rapid deployment', type: 'positive' },
        bigfour: { text: 'Methodical rollout', type: 'neutral' },
      },
      {
        task: 'Ongoing Partnership',
        inhouse: { text: 'Always available', type: 'positive' },
        brightbyte: { text: 'Dedicated success team', type: 'positive' },
        bigfour: { text: 'Retainer-based', type: 'neutral' },
      },
      {
        task: 'Scalability',
        inhouse: { text: 'Recruitment dependent', type: 'negative' },
        brightbyte: { text: 'Flexible team scaling', type: 'positive' },
        bigfour: { text: 'Resource availability', type: 'neutral' },
      },
    ],
  },
  {
    title: 'Project Governance',
    rows: [
      {
        task: 'Agile Execution',
        inhouse: { text: 'Culture dependent', type: 'neutral' },
        brightbyte: { text: 'Proven methodology', type: 'positive' },
        bigfour: { text: 'Structured frameworks', type: 'neutral' },
      },
      {
        task: 'Transparency',
        inhouse: { text: 'Full visibility', type: 'positive' },
        brightbyte: { text: 'Real-time dashboards', type: 'positive' },
        bigfour: { text: 'Formal reporting', type: 'neutral' },
      },
      {
        task: 'Risk Management',
        inhouse: { text: 'Single point of failure', type: 'negative' },
        brightbyte: { text: 'Proactive mitigation', type: 'positive' },
        bigfour: { text: 'Comprehensive coverage', type: 'positive' },
      },
    ],
  },
];

const summaryData: RowData[] = [
  {
    task: 'Overall Excellence',
    inhouse: { text: 'Team dependent', type: 'neutral' },
    brightbyte: { text: 'Consistently exceptional', type: 'positive' },
    bigfour: { text: 'Premium tier', type: 'positive' },
  },
  {
    task: 'Speed to Value',
    inhouse: { text: 'Slow ramp-up', type: 'negative' },
    brightbyte: { text: 'Immediate impact', type: 'positive' },
    bigfour: { text: 'Extended timelines', type: 'negative' },
  },
  {
    task: 'Monthly Investment',
    inhouse: { text: '$15-25k+ (salaries)', type: 'negative' },
    brightbyte: { text: '$8-15k (flexible)', type: 'positive' },
    bigfour: { text: '$50-100k+', type: 'negative' },
  },
  {
    task: 'ROI Timeline',
    inhouse: { text: '12-18 months', type: 'negative' },
    brightbyte: { text: '3-6 months', type: 'positive' },
    bigfour: { text: '18-24 months', type: 'negative' },
  },
  {
    task: 'Strategic Value',
    inhouse: { text: 'Operational focus', type: 'neutral' },
    brightbyte: { text: 'Growth acceleration', type: 'positive' },
    bigfour: { text: 'Transformation expertise', type: 'positive' },
  },
];

const getIcon = (type: 'negative' | 'neutral' | 'positive') => {
  switch (type) {
    case 'positive':
      return <CheckIcon />;
    case 'negative':
      return <CrossIcon />;
    case 'neutral':
      return <NeutralIcon />;
  }
};

const TableHeader = () => (
  <thead>
    <tr>
      <th className='w-[25%] px-4 py-5 text-left font-unbound text-[14px] font-bold leading-[1.2] text-white/60 tablet:px-5 tablet:text-[16px] desktop:text-[18px]'>
        Criteria
      </th>
      <th className='w-[25%] px-4 py-5 text-left font-proxima text-[14px] font-semibold leading-[1.2] text-white/60 tablet:px-5 tablet:text-[16px] desktop:text-[18px]'>
        In-House Team
      </th>
      <th className='w-[25%] bg-main-blue/10 px-4 pb-5 pt-3 text-center tablet:px-5'>
        <div className='flex flex-col items-center gap-2'>
          <span className='whitespace-nowrap rounded-full bg-main-blue px-4 py-1 text-[10px] font-bold uppercase tracking-wider text-white tablet:text-[11px]'>
            Best Value
          </span>
          <span className='font-proxima text-[14px] font-bold leading-[1.2] text-main-blue tablet:text-[16px] desktop:text-[18px]'>
            The BrightByte
          </span>
        </div>
      </th>
      <th className='w-[25%] px-4 py-5 text-left font-proxima text-[14px] font-semibold leading-[1.2] text-white/60 tablet:px-5 tablet:text-[16px] desktop:text-[18px]'>
        Big 4 Consultancy
      </th>
    </tr>
  </thead>
);

const TableRow = ({
  row,
  isEven,
}: {
  row: RowData;
  isEven: boolean;
}) => (
  <tr className={isEven ? 'bg-white/[0.03]' : ''}>
    <td className='w-[25%] px-4 py-4 font-proxima text-[12px] font-semibold leading-[1.3] text-white tablet:px-5 tablet:text-[14px] desktop:text-[16px]'>
      {row.task}
    </td>
    <td className='w-[25%] px-4 py-4 tablet:px-5'>
      <div className='flex items-center gap-2'>
        {getIcon(row.inhouse.type)}
        <span className='font-proxima text-[12px] leading-[1.3] text-white/50 tablet:text-[14px] desktop:text-[16px]'>
          {row.inhouse.text}
        </span>
      </div>
    </td>
    <td className='w-[25%] bg-main-blue/10 px-4 py-4 tablet:px-5'>
      <div className='flex items-center justify-center gap-2'>
        {getIcon(row.brightbyte.type)}
        <span className='font-proxima text-[12px] font-medium leading-[1.3] text-white tablet:text-[14px] desktop:text-[16px]'>
          {row.brightbyte.text}
        </span>
      </div>
    </td>
    <td className='w-[25%] px-4 py-4 tablet:px-5'>
      <div className='flex items-center gap-2'>
        {getIcon(row.bigfour.type)}
        <span className='font-proxima text-[12px] leading-[1.3] text-white/50 tablet:text-[14px] desktop:text-[16px]'>
          {row.bigfour.text}
        </span>
      </div>
    </td>
  </tr>
);

const SectionTable = ({ section }: { section: SectionData }) => (
  <div className='mb-6 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm'>
    <div className='border-b border-white/10 bg-white/[0.03] px-4 py-4 tablet:px-5'>
      <h3 className='font-unbound text-[16px] font-bold text-white tablet:text-[18px] desktop:text-[20px]'>
        {section.title}
      </h3>
    </div>
    <div className='overflow-x-auto'>
      <table className='w-full min-w-[700px]'>
        <tbody>
          {section.rows.map((row, idx) => (
            <TableRow key={row.task} row={row} isEven={idx % 2 === 1} />
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default function Table() {
  return (
    <div className='py-8'>
      {/* Main Header */}
      <div className='mb-8 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]'>
        <div className='overflow-x-auto'>
          <table className='w-full min-w-[700px]'>
            <TableHeader />
          </table>
        </div>
      </div>

      {/* Comparison Sections */}
      {comparisonData.map((section) => (
        <SectionTable key={section.title} section={section} />
      ))}

      {/* Summary Section */}
      <div className='mt-10 overflow-hidden rounded-2xl border-2 border-main-blue/30 bg-gradient-to-b from-main-blue/10 to-transparent'>
        <div className='border-b border-main-blue/20 bg-main-blue/10 px-4 py-4 tablet:px-5'>
          <h3 className='font-unbound text-[18px] font-bold text-white tablet:text-[20px] desktop:text-[24px]'>
            The Bottom Line
          </h3>
        </div>
        <div className='overflow-x-auto'>
          <table className='w-full min-w-[700px]'>
            <tbody>
              {summaryData.map((row, idx) => (
                <TableRow key={row.task} row={row} isEven={idx % 2 === 1} />
              ))}
            </tbody>
          </table>
        </div>

        {/* Client's Choice Badge */}
        <div className='border-t border-main-blue/20 bg-main-blue/5 py-6'>
          <div className='flex flex-col items-center gap-2'>
            <span className='rounded-full bg-main-blue px-6 py-2 font-proxima text-[16px] font-bold text-white tablet:text-[18px] desktop:text-[20px]'>
              Client&apos;s Choice
            </span>
            <span className='font-proxima text-[14px] text-white/60'>
              Enterprise quality. Startup agility. Smart investment.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
