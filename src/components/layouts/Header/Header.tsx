import styles from "./index.module.scss";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import MyIcon from "@/assets/svg/girigiri.svg";

export function Header() {
    return (
        <div className={styles.header}>
            <div className={styles.container}>
                <div className={styles.burger}>
                    <button>
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
                <ul className={styles.navList}>
                    <li>
                        <Link href={"https://github.com/4okimi7uki"} target="blank">
                            <FaGithub className={styles.navIcon} />
                        </Link>
                    </li>
                    <li>
                        <Link href={"https://x.com/0000ff_ki"} target="blank">
                            <FaXTwitter className={styles.navIcon} />
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}
