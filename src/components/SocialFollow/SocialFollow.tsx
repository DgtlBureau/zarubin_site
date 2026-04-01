'use client';

import Facebook from '@/public/assets/images/social/facebook-icon.svg';
import Linkedin from '@/public/assets/images/social/linkedin-icon.svg';
import Twitter from '@/public/assets/images/social/twitter-icon.svg';
import { BASE_URL } from '@/src/utils/alias';
import { usePathname } from 'next/navigation';

interface Props {
  isRight?: boolean;
}

const SHARING = {
  FACEBOOK_SHARE: 'https://www.facebook.com/sharer/sharer.php?u=',
  TWITTER: 'https://twitter.com/intent/tweet?&url=',
  LINKEDIN_SHARE: 'https://www.linkedin.com/sharing/share-offsite/?url=',
};

const URL = BASE_URL;

export const SocialFollow = ({ isRight = false }: Props) => {
  const pathName = usePathname();

  return (
    <div
      className={`relative flex w-full flex-col ${isRight && 'tablet:items-end'} z-[5] gap-[12px]`}
    >
      <span
        className={`font-inter text-[12px] leading-[1] text-text-dark ${isRight && 'text-[18px] tablet:text-end tablet:text-[20px]'} font-bold tablet:text-[16px]`}
      >
        Did you find this post interesting? Share it!
      </span>
      <ul className='flex gap-[20px]'>
        <li>
          <a
            href={`${SHARING.FACEBOOK_SHARE + URL + pathName}`}
            rel='noopener'
            target='_blank'
            className='z-[20]'
          >
            <Facebook className='w-[24px]' />
          </a>
        </li>
        <li>
          <a
            href={`${SHARING.TWITTER + URL + pathName}`}
            target='_blank'
            rel='noopener'
          >
            <Twitter className='w-[24px]' />
          </a>
        </li>
        <li>
          <a
            href={`${SHARING.LINKEDIN_SHARE + URL + pathName}`}
            rel='noopener'
            target='_blank'
          >
            <Linkedin className='w-[24px]' />
          </a>
        </li>
      </ul>
    </div>
  );
};
