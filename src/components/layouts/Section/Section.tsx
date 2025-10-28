import styles from "./index.module.scss";

type Props = {
    children: React.ReactNode;
};

export function Section({ children }: Props) {
    return <section className={styles.section}>{children}</section>;
}
