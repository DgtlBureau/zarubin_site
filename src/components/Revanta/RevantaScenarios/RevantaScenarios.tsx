import { REVANTA_VIDEOS } from '@/src/data/revanta/routes';
import { RevantaScenario } from '@/src/data/revanta/types';
import { RevantaIcon } from '../RevantaIcons';
import { Reveal } from '../ui/Reveal';
import {
  EYEBROW_CLASS,
  H2_CLASS,
  RevantaContainer,
  RevantaSection,
} from '../ui/layout';
import { ScenarioVideo } from './ScenarioVideo';

const Steps = ({ steps }: { steps: string[] }) => (
  <ol className='mt-[22px] flex flex-col'>
    {steps.map((step, idx) => {
      const last = idx === steps.length - 1;
      return (
        <li key={step} className='flex gap-[16px]'>
          <div className='flex flex-col items-center'>
            <span className='flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-full bg-revanta-blue font-inter text-[14px] font-semibold leading-none text-white'>
              {idx + 1}
            </span>
            {!last && <span className='w-[2px] flex-1 bg-revanta-ink/10' />}
          </div>
          <span
            className={`pt-[4px] font-inter text-[17px] leading-[1.45] text-revanta-ink/75 tablet:text-[18px] ${
              last ? '' : 'pb-[20px]'
            }`}
          >
            {step}
          </span>
        </li>
      );
    })}
  </ol>
);

type Props = {
  items: RevantaScenario[];
  /** Section heading; omitted for continuation blocks split by other sections. */
  heading?: string;
  /** Row index of the first item, keeps the left/right rhythm across splits. */
  startIndex?: number;
  id?: string;
};

/**
 * Scenario rows: the recording in a browser frame on one side, the tag,
 * title, description and numbered click path on the other. Sides alternate.
 */
export const RevantaScenarios = ({
  items,
  heading,
  startIndex = 0,
  id,
}: Props) => {
  if (items.length === 0) return null;

  return (
    <RevantaSection id={id} className='scroll-mt-[100px] desktop:py-[80px]'>
      <RevantaContainer>
        {heading && (
          <Reveal>
            <span className={EYEBROW_CLASS}>Scenarios</span>
            <h2 className={`mt-[14px] ${H2_CLASS}`}>{heading}</h2>
          </Reveal>
        )}

        <div
          className={`flex flex-col gap-[64px] tablet:gap-[88px] ${
            heading ? 'mt-[36px] tablet:mt-[52px]' : ''
          }`}
        >
          {items.map((s, i) => {
            const reverse = (startIndex + i) % 2 === 1;
            return (
              <Reveal key={s.video}>
                <div className='grid grid-cols-1 items-center gap-[20px] tablet:grid-cols-2 tablet:gap-[32px] desktop:gap-[48px]'>
                  <div
                    className={`mx-auto w-full max-w-[620px] ${
                      reverse ? 'tablet:order-2' : ''
                    }`}
                  >
                    <ScenarioVideo
                      video={`${REVANTA_VIDEOS}/${s.video}.mp4`}
                      poster={`${REVANTA_VIDEOS}/${s.video}-poster.webp`}
                      title={s.title}
                    />
                  </div>
                  <div className={reverse ? 'tablet:order-1' : undefined}>
                    {s.tag && (
                      <span className='font-inter text-[14px] font-semibold uppercase tracking-[0.08em] text-revanta-ink/40'>
                        {s.tag}
                      </span>
                    )}
                    <div className='mt-[12px] flex items-start gap-[14px]'>
                      {s.icon && (
                        <span className='flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-full bg-revanta-blue/10 text-revanta-blue'>
                          <RevantaIcon
                            name={s.icon}
                            className='h-[26px] w-[26px]'
                          />
                        </span>
                      )}
                      <h3 className='pt-[4px] font-inter text-[27px] font-medium leading-[1.15] tracking-[-0.015em] text-revanta-ink tablet:text-[31px] desktop:text-[36px]'>
                        {s.title}
                      </h3>
                    </div>
                    <p className='mt-[14px] font-inter text-[18px] leading-[1.55] text-revanta-ink/55 tablet:text-[20px]'>
                      {s.text}
                    </p>
                    {s.steps && s.steps.length > 0 && (
                      <Steps steps={s.steps} />
                    )}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </RevantaContainer>
    </RevantaSection>
  );
};
