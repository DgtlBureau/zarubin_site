import { REVANTA_BASE, REVANTA_IMAGES } from '@/src/data/revanta/routes';
import Image from 'next/image';
import Link from 'next/link';
import { EMBLEM_GLOW_CLASS } from './layout';

/** Header/footer logo: glowing emblem + white wordmark, links to the hub. */
export const RevantaBrand = ({ onClick }: { onClick?: () => void }) => (
  <Link
    href={REVANTA_BASE}
    aria-label='Revanta'
    onClick={onClick}
    className='flex items-center gap-[10px]'
  >
    <Image
      src={`${REVANTA_IMAGES}/emblem-white.webp`}
      alt=''
      width={1002}
      height={632}
      priority
      className={`h-[34px] w-auto desktop:h-[38px] ${EMBLEM_GLOW_CLASS}`}
    />
    <Image
      src={`${REVANTA_IMAGES}/wordmark-white.webp`}
      alt=''
      width={1611}
      height={235}
      priority
      className='h-[17px] w-auto desktop:h-[19px]'
    />
  </Link>
);
