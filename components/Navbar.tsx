import styles from "../styles/components/Navbar.module.css"
import Image from "next/image"
import Link from "next/link"
import { useSession, signIn, signOut } from "next-auth/react"

export default function Navbar (): JSX.Element {
    const { data: session } = useSession()

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
                {!session && <li onClick={() => signIn()} className={styles.navLink}>
                    Sign in
                </li>}
                {session && <li onClick={() => signOut()} className={styles.navLink}>
                    Sign out
                </li>}
            </ul>
        </nav>
    )
}