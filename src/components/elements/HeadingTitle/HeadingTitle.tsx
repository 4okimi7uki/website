import clsx from "clsx";
import styles from "./index.module.scss";
import { ElementType } from "react";

type Props = {
    title: string;
    type?: "h1" | "h2" | "h3" | "h4";
    align?: "center" | "left" | "right";
};

export function HeadingTitle({ title, type = "h1", align = "left" }: Props) {
    const Tag = type as ElementType;
    return <Tag className={clsx(styles.headTitle, styles[type], align && styles[`align-${align}`])}>{title}</Tag>;
}
