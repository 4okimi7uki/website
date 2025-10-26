import styles from "./index.module.scss";

type props = {
    title: string;
    type: "h1" | "h2" | "h3";
};
export function HeadingTitle({ title, type }: props) {
    return <div className={styles.title}>{title}</div>;
}
