import styles from "../styles/components/Navbar.module.css"
import Image from "next/image"
import Link from "next/link"

export default function Navbar (): JSX.Element {
    return (
        <nav id={styles.nav}>
            <ul className={styles.navSection}>
                <li>
                    <Link href="/">
                        <Image alt="" src="/github.svg" height={30} width={30} />
                    </Link>
                </li>
            </ul>
            <ul className={styles.navSection}>
                <li>
                    <Link className={styles.navLink} target="_blank" href="https://docs.github.com/rest">
                        Documentation
                    </Link>
                </li>
                <li>
                    <Link className={styles.navLink} target="_blank" href="https://github.com/zemetskiym/github-rest-api">
                        Repository source
                    </Link>
                </li>
            </ul>
        </nav>
    )
}