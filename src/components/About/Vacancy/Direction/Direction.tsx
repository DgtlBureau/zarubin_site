'use client';
import { LinkArrow } from '@/src/ui-kit/LinkArrow/LinkArrow';

import classNames from 'classnames';
import styles from './Direction.module.css';
// import Link from 'next/link'

export const Direction = () => {
  const scrollToContacts = () => {
    const contactsSection = document.getElementById('contacts');
    if (contactsSection) {
      contactsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      <ul className={styles.directionWrapper}>
        <li onClick={scrollToContacts} className='cursor-pointer'>
          <div className={classNames(styles.directionBox, styles.partner)}>
            <h3 className={`${styles.tag} font-inter`}>To the Partner</h3>
            <p className={`${styles.description} font-inter`}>
              Do you want to work with us? Leave a request or send an e-mail{' '}
            </p>
            <p className='mt-[32px] hidden w-fit'>
              <LinkArrow title='More' link='#' />
            </p>
          </div>
        </li>
        <li onClick={scrollToContacts} className='cursor-pointer'>
          <div className={classNames(styles.directionBox, styles.expert)}>
            <h3 className={`${styles.tag} font-inter`}>To the expert</h3>
            <p className={`${styles.description} font-inter`}>
              {`Read about how to get to us and what jobs are available on the
              'Careers' link`}
            </p>
            <p className='mt-[32px] hidden w-fit'>
              <LinkArrow title='More' link='#' />
            </p>
          </div>
        </li>
      </ul>
    </div>
  );
};
