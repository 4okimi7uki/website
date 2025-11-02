import { Section } from "../Section";
import styles from "./index.module.scss";
import Image from "next/image";
import me from "../../../../public/Mizuki_chop.gif";

export function Top() {
    return (
        <Section>
            <div className={styles.wrapper}>
                <div className={styles.imgArea}>
                    <Image src={me} alt="" width={320} height={320} />
                </div>
                <div className={styles.myNameArea}>
                    <div>
                        <h1 className={styles.name}>Mizuki Aoki</h1>
                        <hr />
                        <p className={styles.role}>Software Engineer</p>
                    </div>
                </div>
            </div>
        </Section>
    );
}
