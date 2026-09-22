import { RevantaPageContent } from '@/src/data/revanta/types';
import { Reveal } from '../ui/Reveal';
import { H2_CLASS, RevantaContainer, RevantaSection } from '../ui/layout';

type Comparison = NonNullable<RevantaPageContent['comparison']>;

const tone = (value: string) =>
  value === 'No'
    ? 'text-revanta-ink/40'
    : value === 'Limited'
      ? 'text-revanta-ink/55'
      : 'text-revanta-ink/80';

/** Honest side-by-side table with a named competitor. */
export const RevantaComparison = ({
  comparison,
}: {
  comparison: Comparison;
}) => (
  <RevantaSection>
    <RevantaContainer>
      <Reveal>
        <h2 className={H2_CLASS}>{comparison.heading}</h2>
        <p className='mt-[16px] max-w-[62ch] font-inter text-[18px] leading-[1.55] text-revanta-ink/55 tablet:text-[20px]'>
          {comparison.intro}
        </p>
      </Reveal>
      <Reveal className='mt-[36px] tablet:mt-[48px]'>
        <div className='overflow-x-auto rounded-[12px] border border-revanta-ink/[0.08]'>
          <table className='w-full min-w-[620px] border-collapse text-left font-inter'>
            <thead>
              <tr className='border-b border-revanta-ink/10 bg-[#f4f5f8]'>
                <th
                  scope='col'
                  className='w-[34%] px-[20px] py-[16px] text-[13px] font-semibold uppercase tracking-[0.08em] text-revanta-ink/45 tablet:px-[28px]'
                >
                  Job
                </th>
                <th
                  scope='col'
                  className='w-[28%] px-[20px] py-[16px] text-[13px] font-semibold uppercase tracking-[0.08em] text-revanta-ink/45 tablet:px-[28px]'
                >
                  {comparison.competitor}
                </th>
                <th
                  scope='col'
                  className='bg-revanta-blue/[0.06] px-[20px] py-[16px] text-[13px] font-semibold uppercase tracking-[0.08em] text-revanta-blue tablet:px-[28px]'
                >
                  Revanta
                </th>
              </tr>
            </thead>
            <tbody>
              {comparison.rows.map((row) => (
                <tr
                  key={row.job}
                  className='border-b border-revanta-ink/[0.08] last:border-0'
                >
                  <th
                    scope='row'
                    className='px-[20px] py-[18px] text-[16px] font-medium leading-[1.4] text-revanta-ink tablet:px-[28px] tablet:text-[17px]'
                  >
                    {row.job}
                  </th>
                  <td
                    className={`px-[20px] py-[18px] text-[16px] leading-[1.45] tablet:px-[28px] ${tone(row.them)}`}
                  >
                    {row.them}
                  </td>
                  <td
                    className={`bg-revanta-blue/[0.04] px-[20px] py-[18px] text-[16px] leading-[1.45] tablet:px-[28px] ${tone(row.us)}`}
                  >
                    {row.us}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {comparison.note && (
          <p className='mt-[14px] font-inter text-[14px] text-revanta-ink/45'>
            {comparison.note}
          </p>
        )}
      </Reveal>
    </RevantaContainer>
  </RevantaSection>
);
