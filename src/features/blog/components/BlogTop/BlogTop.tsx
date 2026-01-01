import { HeadingTitle } from '@/components/elements/HeadingTitle';
import React, { useMemo } from 'react';
import styles from './index.module.scss';
import { Section } from '@/components/layouts/Section';
import Link from 'next/link';
import dayjs from 'dayjs';

const microCMSContents = [
  {
    id: 'aaa',
    title: '年末',
    createdAt: dayjs()
  },
  {
    id: 'bbb',
    title: 'popopop',
    createdAt: dayjs()
  }
];

type Articles = {
  id: string;
  title: string;
  createdAt: dayjs.Dayjs;
};

type ArticlesByYear = Record<number, Articles[]>;

const groupedByYear = (articles: Articles[]): ArticlesByYear => {
  const group: ArticlesByYear = {};

  for (const i of articles) {
    const year = Number(i.createdAt.format('YYYY').toString());
    if (!group[year]) {
      group[year] = [];
    }
    group[year].push(i);
  }
  return group;
};

export function BlogTop() {
  const groupedArticlesByYear = useMemo(() => groupedByYear(microCMSContents), []);

  return (
    <Section>
      <HeadingTitle title="blog" type="h3" align="center" />
      <ul className={styles.list}>
        {Object.entries(groupedArticlesByYear).map(([key, v]) => {
          return v.map((item, idx) => {
            return (
              <li key={item.id} className={styles.listItem}>
                <Link href={`blog/${item.id}`}>
                  <div className={styles.year}>{idx === 0 && key}</div>
                  <div className={styles.titleContents}>
                    <span>{item.title}</span>
                  </div>
                </Link>
              </li>
            );
          });
        })}
      </ul>
    </Section>
  );
}
