import styles from './index.module.scss';
import { Section } from '../Section';
import dayjs from 'dayjs';
import { HeadingTitle } from '@/components/elements/HeadingTitle';
import { HiBuildingOffice } from 'react-icons/hi2';
import { BiSolidBuildingHouse } from 'react-icons/bi';
import { LiaIndustrySolid, LiaUniversitySolid } from 'react-icons/lia';

type BioType = {
  startDate: string;
  endDate?: string;
  title: string;
  role?: string;
  details?: string;
  icon: React.ReactNode;
};

const BIO = [
  {
    startDate: dayjs('2016-04-01').format('YYYY/MM'),
    endDate: dayjs('2020-03-01').format('YYYY/MM'),
    title: '芝浦工業大学',
    icon: <LiaUniversitySolid className={styles.icon} />,
    role: 'システム理工学部 数理科学科'
  },
  {
    startDate: dayjs('2020-04-01').format('YYYY/MM'),
    endDate: dayjs('2021-12-01').format('YYYY/MM'),
    title: '株式会社アウトソーシングテクノロジー',
    icon: <HiBuildingOffice className={styles.icon} />,
    role: '技術講師 / エンジニア教育・研修'
  },
  {
    startDate: dayjs('2021-12-01').format('YYYY/MM'),
    endDate: dayjs('2023-12-01').format('YYYY/MM'),
    title: '自動車サプライヤー企業（客先常駐）',
    icon: <LiaIndustrySolid className={styles.icon} />,
    role: '車載組込みソフトウェアエンジニア / C言語による開発'
  },
  {
    startDate: dayjs('2024-01-01').format('YYYY/MM'),
    endDate: dayjs('2024-07-01').format('YYYY/MM'),
    title: '株式会社GOOYA',
    icon: <HiBuildingOffice className={styles.icon} />,
    role: 'Webエンジニア / ローコード開発'
  },
  {
    startDate: dayjs('2024-08-01').format('YYYY/MM'),
    endDate: dayjs('2025-07-01').format('YYYY/MM'),
    title: '株式会社KIREI produce',
    icon: <HiBuildingOffice className={styles.icon} />,
    role: '社内SE / インフラ・社内システム改善、Web開発'
  },
  {
    startDate: dayjs('2025-09-01').format('YYYY/MM'),
    endDate: '現在',
    title: 'chot Inc.',
    icon: <BiSolidBuildingHouse className={styles.icon} />,
    role: 'フロントエンドエンジニア / 受託開発（Webシステム）'
  }
] satisfies ReadonlyArray<BioType>;
export function About() {
  return (
    <Section>
      <HeadingTitle title="About" type="h1" align="center" />
      <div className={styles.wrapper}>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus numquam soluta, quas dignissimos eius quia
          deserunt suscipit quaerat praesentium impedit optio enim iste rerum, dolorem ex perferendis hic ipsum et.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus numquam soluta, quas dignissimos eius quia
          deserunt suscipit quaerat praesentium impedit optio enim iste rerum, dolorem ex perferendis hic ipsum et.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus numquam soluta, quas dignissimos eius quia
          deserunt suscipit quaerat praesentium impedit optio enim iste rerum, dolorem ex perferendis hic ipsum et.
        </p>
      </div>

      <HeadingTitle title="History" type="h2" align="center" />
      <div className={styles.historyListWrapper}>
        <ul className={styles.historyList}>
          {BIO.sort((a, b) => dayjs(b.startDate).diff(a.startDate)).map((item) => {
            return (
              <li key={item.title} className={styles.bioListItem}>
                <div className={styles.iconArea}>
                  <div className={styles.bar} />
                  <div>{item.icon}</div>
                  <div className={styles.bar} />
                </div>
                <div className={styles.contentArea}>
                  <time dateTime={item.startDate} className={styles.interval}>
                    {item.startDate} {item.endDate && ` - ${item.endDate}`}
                  </time>
                  <h3 className={styles.orgTitle}>{item.title}</h3>
                  <p>{item.role && <div> - {item.role}</div>}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
