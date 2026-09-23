import DashLogo from '@/public/assets/images/revanta/competitors/dash-platform.svg';
import PlayMetricsLogo from '@/public/assets/images/revanta/competitors/playmetrics.svg';
import { REVANTA_IMAGES } from '@/src/data/revanta/routes';
import { RevantaPageContent } from '@/src/data/revanta/types';
import { Check, Minus } from 'lucide-react';
import Image from 'next/image';
import { Reveal } from '../ui/Reveal';
import { H2_CLASS, RevantaContainer, RevantaSection } from '../ui/layout';

type Comparison = NonNullable<RevantaPageContent['comparison']>;

/* Оговорка — не победа: «Limited» и «Built per project» не носят нашу галочку,
   иначе таблица обещает больше, чем продукт умеет. */
const QUALIFIED = /^Limited$|per project/i;

/**
 * Палитра — та же, что в блоке «Today / With Revanta» на этих же страницах:
 * серая карточка у чужой стороны, тёмно-синяя подложка у нашей. Своих цветов
 * таблица не приносит.
 */
const Value = ({
  value,
  mine,
  edge,
}: {
  value: string;
  mine?: boolean;
  edge?: boolean;
}) => {
  const negative = value === 'No' || value.startsWith('No,');
  // Not confirmed either way on the competitor's public pages: neutral, not a red 'No'.
  const unknown = value.startsWith('Not shown');
  const weak = QUALIFIED.test(value);
  const muted = negative || unknown || weak || !mine;

  return (
    <span className='flex items-start gap-[10px]'>
      <span
        className={`mt-[2px] shrink-0 ${
          negative && !mine
            ? 'text-[#C2564C]'
            : unknown
              ? 'text-revanta-ink/30'
              : muted
                ? 'text-revanta-ink/30'
                : mine
                  ? 'text-revanta-accent'
                  : 'text-revanta-blue'
        }`}
      >
        {negative || unknown ? (
          <Minus
            className='h-[18px] w-[18px]'
            strokeWidth={2}
            aria-hidden='true'
          />
        ) : (
          <Check
            className='h-[18px] w-[18px]'
            strokeWidth={2.2}
            aria-hidden='true'
          />
        )}
      </span>
      <span
        className={`font-inter text-[16px] leading-[1.5] ${
          negative
            ? mine
              ? 'text-revanta-ink/40'
              : 'text-[#B44A41]'
            : unknown
              ? 'text-revanta-ink/45'
              : weak
                ? 'text-revanta-ink/50'
                : mine
                  ? `text-revanta-ink/85 ${edge ? 'font-medium' : ''}`
                  : 'text-revanta-ink/55'
        }`}
      >
        {value}
      </span>
    </span>
  );
};

const LABEL_CLASS =
  'font-inter text-[13px] font-semibold uppercase tracking-[0.08em]';

/**
 * Знак конкурента вместо его названия заглавными. Все три логотипа сделаны
 * под тёмный фон и в оригинале белые, поэтому стоят как есть, на тёмной
 * плашке: перекрашивать чужой знак — значит показывать не их логотип.
 * У FanMaker вектора в открытом доступе нет, только PNG в высоком разрешении.
 */
const COMPETITOR_LOGOS: Record<
  string,
  { Svg?: typeof PlayMetricsLogo; src?: string; height: string; mobile: string }
> = {
  PlayMetrics: { Svg: PlayMetricsLogo, height: 'h-[15px]', mobile: 'h-[10px]' },
  'Dash Platform': { Svg: DashLogo, height: 'h-[26px]', mobile: 'h-[18px]' },
  FanMaker: {
    src: '/assets/images/revanta/competitors/fanmaker-white.png',
    height: 'h-[16px]',
    mobile: 'h-[11px]',
  },
};

/** Плашка под белый знак: без неё логотип конкурента не виден на светлой карточке. */
const CHIP_CLASS =
  'inline-flex items-center rounded-[8px] bg-revanta-ink px-[12px] py-[8px]';

/** Подпись колонки конкурента: знак, если он у нас есть, иначе название. */
const CompetitorLabel = ({
  name,
  mobile,
}: {
  name: string;
  mobile?: boolean;
}) => {
  const logo = COMPETITOR_LOGOS[name];
  if (!logo) {
    return <span className={`${LABEL_CLASS} text-revanta-ink/40`}>{name}</span>;
  }
  const size = mobile ? logo.mobile : logo.height;
  return (
    <span
      className={`${CHIP_CLASS} ${mobile ? 'px-[8px] py-[6px]' : ''}`}
      title={name}
    >
      {logo.Svg ? (
        <logo.Svg className={`${size} w-auto`} role='img' aria-label={name} />
      ) : (
        <Image
          src={logo.src as string}
          alt={name}
          width={1000}
          height={188}
          sizes='120px'
          loading='eager'
          className={`${size} w-auto`}
        />
      )}
    </span>
  );
};

/** Фирменный знак вместо набранного заглавными слова: шрифт логотипа — картинка. */
const Wordmark = ({ className }: { className?: string }) => (
  <Image
    src={`${REVANTA_IMAGES}/wordmark-dark.webp`}
    alt='Revanta'
    width={1611}
    height={235}
    sizes='120px'
    loading='eager'
    className={className}
  />
);

/** Honest side-by-side table with a named competitor. */
export const RevantaComparison = ({
  comparison,
}: {
  comparison: Comparison;
}) => {
  /* Врезка собирается из тех же строк, что и таблица: приписать себе работу,
     которой нет в сравнении, нельзя. Счёта «пять-три» тут нет намеренно —
     считать очки против чужого продукта нечестно, а вот назвать, что мы
     делаем лучше, и подсветить эти строки — по делу. */
  const edges = comparison.rows.filter((row) => row.edge === 'us');

  return (
    <RevantaSection>
      <RevantaContainer>
        <Reveal>
          <h2 className={H2_CLASS}>{comparison.heading}</h2>
          <p className='mt-[16px] max-w-[62ch] font-inter text-[18px] leading-[1.55] text-revanta-ink/55 tablet:text-[20px]'>
            {comparison.intro}
          </p>
          {edges.length > 0 && (
            <div className='mt-[28px] rounded-[14px] border border-revanta-accent/25 bg-revanta-accent/[0.06] p-[24px] tablet:p-[28px]'>
              <span className={`${LABEL_CLASS} text-revanta-accent`}>
                Where Revanta is ahead
              </span>
              <ul
                className={`mt-[16px] grid grid-cols-1 gap-x-[32px] gap-y-[12px] ${edges.length > 1 ? 'tablet:grid-cols-2' : ''}`}
              >
                {edges.map((row) => (
                  <li key={row.job} className='flex items-start gap-[10px]'>
                    <Check
                      className='mt-[3px] h-[18px] w-[18px] shrink-0 text-revanta-accent'
                      strokeWidth={2.4}
                      aria-hidden='true'
                    />
                    <span className='font-inter text-[17px] leading-[1.45] text-revanta-ink/85'>
                      <span className='font-medium'>{row.job}</span>
                      <span className='text-revanta-ink/50'>: {row.us}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Reveal>

        <Reveal className='mt-[36px] tablet:mt-[48px]'>
          {/* Десктоп: две карточки рядом — та же пара, что в блоке «Today / With Revanta». */}
          <div className='-mx-[14px] hidden tablet:block'>
            <table className='w-full table-fixed border-separate border-spacing-x-[14px] border-spacing-y-0 text-left font-inter'>
              <colgroup>
                <col className='w-[34%]' />
                <col className='w-[30%]' />
                <col className='w-[36%]' />
              </colgroup>
              <thead>
                {/* Знаки разной высоты — выравниваем по одной коробке, иначе
                    логотип конкурента и наш стоят на разных уровнях. */}
                <tr>
                  <th
                    scope='col'
                    className='px-[14px] pb-[16px] pt-[18px] align-middle'
                  >
                    <span className='flex h-[40px] items-center'>
                      <span className={`${LABEL_CLASS} text-revanta-ink/35`}>
                        The job
                      </span>
                    </span>
                  </th>
                  <th
                    scope='col'
                    className='rounded-t-[12px] border-x border-t border-revanta-ink/[0.08] bg-[#f7f8fb] px-[24px] pb-[16px] pt-[18px] align-middle'
                  >
                    <span className='flex h-[40px] items-center'>
                      <CompetitorLabel name={comparison.competitor} />
                    </span>
                  </th>
                  <th
                    scope='col'
                    className='rounded-t-[12px] border-x border-t border-revanta-accent/25 bg-revanta-accent/[0.05] px-[24px] pb-[16px] pt-[18px] align-middle'
                  >
                    <span className='flex h-[40px] items-center'>
                      <Wordmark className='h-[19px] w-auto' />
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparison.rows.map((row) => (
                  <tr key={row.job} className='align-top'>
                    <th
                      scope='row'
                      className='border-t border-revanta-ink/[0.08] px-[14px] py-[22px] text-left font-inter text-[17px] font-medium leading-[1.4] text-revanta-ink'
                    >
                      {row.job}
                    </th>
                    <td
                      className={`border-x border-t border-revanta-ink/[0.08] px-[24px] py-[22px] ${
                        row.them === 'No'
                          ? 'bg-[#C2564C]/[0.06]'
                          : row.edge === 'them'
                            ? 'bg-revanta-blue/[0.07]'
                            : 'bg-[#f7f8fb]'
                      }`}
                    >
                      <Value value={row.them} />
                    </td>
                    <td
                      className={`border-x border-t border-revanta-accent/[0.14] px-[24px] py-[22px] ${
                        row.edge === 'us'
                          ? 'bg-revanta-accent/[0.10]'
                          : 'bg-revanta-accent/[0.04]'
                      }`}
                    >
                      <Value value={row.us} mine edge={row.edge === 'us'} />
                    </td>
                  </tr>
                ))}
                {/* Низ карточек: закругление и рамка, не срезая последнюю строку. */}
                <tr aria-hidden='true'>
                  <td />
                  <td className='h-[16px] rounded-b-[12px] border-x border-b border-revanta-ink/[0.08] bg-[#f7f8fb]' />
                  <td className='h-[16px] rounded-b-[12px] border-x border-b border-revanta-accent/25 bg-revanta-accent/[0.04]' />
                </tr>
              </tbody>
            </table>
          </div>

          {/* Мобильный: список работ с двумя строчками ответов, без коробок. */}
          <ul className='border-t border-revanta-ink/[0.08] tablet:hidden'>
            {comparison.rows.map((row) => (
              <li
                key={row.job}
                className='border-b border-revanta-ink/[0.08] py-[18px]'
              >
                <p className='font-inter text-[17px] font-medium leading-[1.35] text-revanta-ink'>
                  {row.job}
                </p>
                <div className='mt-[12px] flex flex-col gap-[10px]'>
                  <div className='flex items-start gap-[10px]'>
                    <span className='mt-[4px] w-[104px] shrink-0'>
                      <Wordmark className='h-[14px] w-auto' />
                    </span>
                    <Value value={row.us} mine edge={row.edge === 'us'} />
                  </div>
                  <div className='flex items-start gap-[10px]'>
                    <span className='mt-[4px] w-[104px] shrink-0'>
                      <CompetitorLabel name={comparison.competitor} mobile />
                    </span>
                    <Value value={row.them} />
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {comparison.note && (
            <p className='mt-[18px] font-inter text-[14px] text-revanta-ink/40'>
              {comparison.note}
            </p>
          )}
        </Reveal>
      </RevantaContainer>
    </RevantaSection>
  );
};
