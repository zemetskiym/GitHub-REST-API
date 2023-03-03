// Importing necessary dependencies and styles
import styles from "../styles/components/Navbar.module.css"
import Image from "next/image"
import Link from "next/link"
import { useSession, signIn, signOut } from "next-auth/react"

// Defining the Navbar component
export default function Navbar (): JSX.Element {
    // Retrieving the user's session data
    const { data: session } = useSession()

    // Rendering the navbar with links and optional sign in/out button
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
                    <Link id={styles.documentation} className={styles.navLink} target="_blank" href="https://docs.github.com/rest">
                        Documentation
                    </Link>
                </li>
                <li>
                    <Link className={styles.navLink} target="_blank" href="https://github.com/zemetskiym/github-rest-api">
                        Repository source
                    </Link>
                </li>
                {/* Rendering the sign in button if the user is not signed in */}
                {!session && <li onClick={() => signIn()} className={styles.navLink}>
                    Sign in
                </li>}
                {/* Rendering the sign out button if the user is signed in */}
                {session && <li onClick={() => signOut()} className={styles.navLink}>
                    Sign out
                </li>}
            </ul>
        </nav>
    )
}
