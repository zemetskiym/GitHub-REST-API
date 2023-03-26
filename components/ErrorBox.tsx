import styles from "../styles/components/ErrorBox.module.css"
import Image from "next/image"

export default function ErrorBox ({error, setError}: {error: string | null, setError: React.Dispatch<React.SetStateAction<string | null>>}): JSX.Element | null {
    // If no error exists, return without an element
    if (error == null) {return null}

    // If an error exists, return the error box
    return (
        <div id={styles.errorBox} onClick={() => setError(null)}>
            <div id={styles.topSection}>
                <Image src="/alert-fill.svg" alt="" height={20} width={20} />
                <small id={styles.title}>Error</small>
            </div>
            <small id={styles.message}>{error}</small>
        </div>
    )
}