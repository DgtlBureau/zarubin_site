import {
  REVANTA_CLIENT_LOGOS,
  RevantaClientLogo,
} from '@/src/data/revanta/testimonials';

const LogoItem = ({ client }: { client: RevantaClientLogo }) => {
  const box =
    'group flex h-[112px] w-[230px] shrink-0 items-center justify-center px-[16px] tablet:h-[140px] tablet:w-[320px] tablet:px-[24px]';
  const img = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={client.mark}
      alt={client.name}
      title={client.name}
      loading='lazy'
      className='h-auto max-h-[86px] w-auto max-w-[132px] object-contain transition-transform duration-300 group-hover:scale-[1.05] tablet:max-h-[112px] tablet:max-w-[172px]'
    />
  );

  return client.url ? (
    <a
      href={client.url}
      target='_blank'
      rel='noopener noreferrer'
      aria-label={client.name}
      className={box}
    >
      {img}
    </a>
  ) : (
    <span className={box}>{img}</span>
  );
};

/** Club marks on a dark strip right under the hero, scrolling in a loop. */
export const RevantaClientLogos = () => {
  // The set is duplicated so a -50% shift makes a seamless loop.
  const set = [...REVANTA_CLIENT_LOGOS, ...REVANTA_CLIENT_LOGOS];
  const track = [...set, ...set];

  return (
    <section
      aria-label='Clubs that use our software'
      className='relative overflow-hidden bg-black pb-[56px] pt-[24px] tablet:pb-[80px] tablet:pt-[32px]'
    >
      <div
        aria-hidden='true'
        className='pointer-events-none absolute inset-x-0 top-[-140px] h-[340px] bg-[radial-gradient(60%_100%_at_50%_0%,rgba(59,91,246,0.18),transparent_70%)]'
      />
      <div className='relative [mask-image:linear-gradient(to_right,transparent,black_7%,black_93%,transparent)]'>
        <div className='marquee-row overflow-hidden'>
          <div className='marquee-track'>
            {track.map((client, idx) => (
              <LogoItem key={`${client.name}-${idx}`} client={client} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
