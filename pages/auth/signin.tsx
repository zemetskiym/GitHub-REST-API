import { signIn } from 'next-auth/react'
import Image from 'next/image';
import styles from "../../styles/components/signin.module.css"

export default function LoginPage() {
  return (
    <div id={styles.main}>
        <div id={styles.logos}>
            <Image alt="" src="/github.svg" height={60} width={60} />
            <Image id={styles.shield} alt="" src="/shield.svg" height={60} width={60} />
        </div>
        <div id={styles.textContainer}>
            <h2 id={styles.title}>Increase the Github rate limit and grant access to protected resources</h2>
            <p id={styles.description}>Securely login using your Github account with our website. We use the Github OAuth provider through next-auth, ensuring your information is never shared or stored on our servers. You can revoke access at any time, giving you complete control over your data.</p>
            <button id={styles.signinBtn} onClick={() => signIn("github", { callbackUrl: `${process.env.NEXTAUTH_URL}/api/auth/callback/github`, scope: "read:user" })}>Sign in with GitHub</button>
        </div>
    </div>
  );
}
