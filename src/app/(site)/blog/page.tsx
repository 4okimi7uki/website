import { BlogTop } from '@/features/blog/components/BlogTop';
import styles from './index.module.scss';

export default function blog() {
  return (
    <div className={styles.container}>
      <BlogTop />
    </div>
  );
}
