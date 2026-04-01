import Link from 'next/link';
import styles from './Items.module.css';

const expertiseData = [
  {
    id: 1,
    title: 'IT Consulting',
    items: [
      { title: 'vCIO', link: '#vco' },
      {
        title: 'Creating and configuring business processes',
        link: '#business-process',
      },
      { title: 'Completing projects', link: '#risk-managment' },
    ],
  },
  {
    id: 2,
    title: 'System analytics and development',
    items: [
      { title: 'Custom development', link: '#custom' },
      { title: 'System integration', link: '#integration' },
      { title: 'Scalable architecture', link: '#architecture' },
      { title: 'Mobile applications', link: '#mobile' },
    ],
  },
];

export const Items = () => {
  return (
    <ul className='grid grid-cols-2'>
      {expertiseData.map((expertise) => (
        <li key={expertise.id} className={`${styles.item} font-inter`}>
          <h3 className={styles.title}>{expertise.title}</h3>
          <ul className={styles.subList}>
            {expertise.items.map((item, idx) => (
              <li key={idx} className={styles.subItem}>
                <Link
                  href={item.link}
                  className={`${styles.tag} hover:underline`}
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
};
