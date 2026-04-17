import teamImage from '@/public/assets/images/about/card/card_remote.webp';
import { LinkArrow } from '@/src/ui-kit/LinkArrow/LinkArrow';
import classNames from 'classnames';
import Image from 'next/image';
import styles from './Internship.module.css';

export const Internship = () => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.InternContainer}>
        <h3 className={styles.title}>internship for students</h3>
        <p className='mt-[19px] font-inter text-[20px] leading-[1.2]'>
          We are looking for motivated engineers and researchers passionate
          about AI agents, large language models, and compliance automation.
          Whether you have experience with Claude API, RAG systems, or are
          just starting your AI journey — we welcome builders ready to ship.
        </p>
        <div className='mt-[auto] w-fit'>
          <LinkArrow title='Submit an Application' link='/career#contact-form' />
        </div>
      </div>
      <div className={styles.listContainer}>
        <ul className={styles.numList}>
          <li className={styles.numItem}>
            <span className={styles.num}>1</span>
            <div className={styles.numContent}>
              <h3 className={classNames(styles.title, styles.blackTitle)}>
                Look at the vacancies
              </h3>
              <span className={`${styles.tag} font-inter`}>
                #FindYourRole
              </span>
            </div>
          </li>
          <li className={styles.numItem}>
            <span className={styles.num}>2</span>
            <div className={styles.numContent}>
              <h3 className={classNames(styles.title, styles.blackTitle)}>
                Read our articles
              </h3>
              <span className={`${styles.tag} font-inter`}>
                #LearnFromShipping
              </span>
            </div>
          </li>
          <li className={styles.numItem}>
            <span className={styles.num}>3</span>
            <div className={styles.numContent}>
              <h3 className={classNames(styles.title, styles.blackTitle)}>
                Send a CV
              </h3>
              <span className={`${styles.tag} font-inter`}>
                #JoinTheTeam
              </span>
            </div>
          </li>
        </ul>
      </div>
      <div className={styles.finalContainer}>
        <h3 className={styles.title}>
          We are looking for people who build AI agents, not just talk about them
        </h3>
        <Image
          src={teamImage}
          width={150}
          height={120}
          alt='team'
          quality={100}
          className={styles.teamImage}
        />
      </div>
    </div>
  );
};
