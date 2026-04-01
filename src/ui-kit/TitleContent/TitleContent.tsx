import classNames from 'classnames';
import styles from './TitleContent.module.css';

interface Props {
  title: string;
  tags: string[];
  light?: boolean;
}

export const TitleContent = ({ title, tags, light }: Props) => {
  return (
    <div className={styles.mainContainer}>
      <h2
        className={classNames(
          styles.title,
          light ? 'text-[var(--second-blue)]' : 'text-[var(--primary)]',
        )}
      >
        {title}
      </h2>
      <ul className={styles.list}>
        {tags.map((tag, idx) => (
          <li key={idx} className={styles.item}>
            <span
              className={classNames(
                'inline-block p-[10px] font-inter text-[16px] leading-[1.25] tablet:text-[24px] tablet:leading-[1.16] ',
                light ? 'bg-[var(--light-blue)]' : 'bg-[var(--second-blue)]',
              )}
            >
              {tag}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};
