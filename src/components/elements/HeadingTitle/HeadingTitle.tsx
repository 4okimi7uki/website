import clsx from "clsx";
import styles from "./index.module.scss";

type Props = {
    title: string;
    type: "h1" | "h2" | "h3" | "h4";
};

function selectHead({ type, title }: Props) {
    switch (type) {
        case "h1":
            return <h1 className={clsx(styles.headTitle, styles.h1)}>{title}</h1>;
        case "h2":
            return <h2 className={clsx(styles.headTitle, styles.h2)}>{title}</h2>;
        case "h3":
            return <h3 className={clsx(styles.headTitle, styles.h3)}>{title}</h3>;
        case "h4":
            return <h4 className={clsx(styles.headTitle, styles.h4)}>{title}</h4>;
        default:
            return <h1 className={clsx(styles.headTitle, styles.h1)}>{title}</h1>;
    }
}
export function HeadingTitle({ title, type }: Props) {
    return selectHead({ type, title });
}
