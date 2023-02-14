import styles from "../styles/components/SectionNav.module.css";

interface Props {
  section: string
  setSection: React.Dispatch<React.SetStateAction<string>>
}

export default function SectionNav({ section, setSection }: Props): JSX.Element {
    function underlineSelection (item: string) {
        if (section == item) return ({borderColor: "#f78166"})
        else return ({border: "none"})
    }

    return (
        <nav id={styles.sectionNav}>
            <ul id={styles.sectionList}>
                <li className={styles.sectionItem} style={underlineSelection("overview")} onClick={() => setSection("overview")}>Overview</li>
                <li className={styles.sectionItem} style={underlineSelection("repositories")} onClick={() => setSection("repositories")}>Repositories</li>
                <li className={styles.sectionItem} style={underlineSelection("data")} onClick={() => setSection("data")}>Data</li>
            </ul>
        </nav>
    )
}