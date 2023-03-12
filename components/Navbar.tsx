// Importing necessary dependencies and styles
import styles from "../styles/components/Navbar.module.css"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { useSession, signIn, signOut } from "next-auth/react"
import { useAppContext } from '@/components/context'

// Defining the Navbar component
export default function Navbar (): JSX.Element {
    // Retrieving the user's session data
    const { data: session } = useSession()

    // Destructuring app context for userSearch, userData, and repoData
    const { searchState, userState, repoState } = useAppContext()
    const [userSearch, setUserSearch] = searchState
    const [userData, setUserData] = userState
    const [repoData, setRepoData] = repoState

    // Setting state for mobile dropdown menu
    const [mobileDropdown, setMobileDropdown] = useState<Boolean>(false)

    // Function to reset state for mobile layout
    function resetState() {
        setUserSearch({user: "", submitted: false})
        setUserData(null)
        setRepoData(null)
    }

    // Rendering the navbar with links and optional sign in/out button
    return (
        <nav id={styles.nav}>
            {/* Navbar sections for desktop viewport (>500 px) */}
            <ul className={styles.navDesktopSection}>
                <li>
                    <Link href="/">
                        <Image alt="" src="/github.svg" height={30} width={30} />
                    </Link>
                </li>
            </ul>
            <ul className={styles.navDesktopSection}>
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

            {/* Navbar sections for mobile viewport (<=500 px) */}
            <ul className={styles.navMobileSection}>
                <li>
                    <Link href="/">
                        <Image alt="" src="/github.svg" height={25} width={25} />
                    </Link>
                </li>
            </ul>
            <ul className={styles.navMobileSection}>
                <li>
                    <Image onClick={() => resetState()} alt="Search" id={styles.search} src="/search.svg" height={25} width={25} />
                </li>
                <li>
                    <Image onClick={() => setMobileDropdown(!mobileDropdown)} alt="Menu" id={styles.hamburger} src="/hamburger.svg" height={25} width={25} />
                </li>
            </ul>

            {/* Render mobile dropdown menu if state is true */}
            {mobileDropdown == true && 
                <ul id={styles.dropdown}>
                    <li className={styles.dropdownItem} id={styles.dropdownDocumentation}>
                        <Link target="_blank" href="https://docs.github.com/rest">
                        Documentation
                        </Link>
                    </li>
                    <li className={styles.dropdownItem}>
                        <Link target="_blank" href="https://github.com/zemetskiym/github-rest-api">
                            Repository source
                        </Link>
                    </li>
                    {/* Rendering the sign in button if the user is not signed in */}
                    {!session && <li onClick={() => signIn()} className={styles.dropdownItem}>
                        Sign in
                    </li>}
                    {/* Rendering the sign out button if the user is signed in */}
                    {session && <li onClick={() => signOut()} className={styles.dropdownItem}>
                        Sign out
                    </li>}
                </ul>
            }
        </nav>
    )
}
