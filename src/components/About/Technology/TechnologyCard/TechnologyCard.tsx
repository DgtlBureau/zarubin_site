import classNames from 'classnames';
import styles from './TechnologyCard.module.css';

interface IData {
  id: number;
  title: string;
  description: string;
}

interface Props {
  data: IData;
}

export const TechnologyCard = ({ data }: Props) => {
  return (
    <div
      className={classNames(styles.card, data.id % 2 === 0 && styles.reverse)}
    >
      <h3
        className={classNames(
          styles.cardTitle,
          data.id % 2 === 0 && styles.titleReverse,
        )}
      >
        {data.title}
      </h3>
      <p className={`${styles.cardDescription} font-inter`}>
        {data.description}
      </p>
    </div>
  );
};
