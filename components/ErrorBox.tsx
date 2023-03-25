import styles from "../styles/components/ErrorBox.module.css"

export default function ErrorBox ({error, setError}: {error: string | null, setError: React.Dispatch<React.SetStateAction<string | null>>}): JSX.Element | null {
    // If no error exists, return without an element
    if (error == null) {return null}

    // If an error exists, return the error box
    return (
        <div id={styles.errorBox} onClick={() => setError(null)}>
            <small id={styles.title}>Error</small>
            <small id={styles.message}>{error}</small>
        </div>
    )
}