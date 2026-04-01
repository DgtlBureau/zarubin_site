import styles from './VirtualTable.module.css';

interface Data {
  id: number;
  title: string;
  description: string[];
}

interface Props {
  data: Data[];
}

export const VirtualTable = ({ data }: Props) => {
  return (
    <div className={styles.table}>
      <ul className={styles.list}>
        {data.map((item) => (
          <li key={item.id} className={styles.item}>
            <h3 className={`${styles.title} font-inter`}>
              {item.title}
              <span className={styles.titleNumber}>{`0${item.id}`}</span>
            </h3>
            <ul className={styles.sublist}>
              {item.description.map((descr, idx) => (
                <li key={idx} className={styles.subItem}>
                  <p className={`${styles.description} font-inter`}>
                    {descr}
                  </p>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};
