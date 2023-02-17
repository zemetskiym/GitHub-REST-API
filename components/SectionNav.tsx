import styles from "../styles/components/SectionNav.module.css";
import Image from "next/image";

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
                <li className={styles.sectionItem} style={underlineSelection("overview")} onClick={() => setSection("overview")}>
                    <Image className={styles.icon} src="/book.svg" alt="" height={15} width={15} />
                    Overview
                </li>
                <li className={styles.sectionItem} style={underlineSelection("repositories")} onClick={() => setSection("repositories")}>
                    <Image className={styles.icon} src="/repo.svg" alt="" height={15} width={15} />
                    Repositories
                </li>
                <li className={styles.sectionItem} style={underlineSelection("data")} onClick={() => setSection("data")}>
                    <Image className={styles.icon} src="/code.svg" alt="" height={15} width={15} />
                    Data
                </li>
            </ul>
        </nav>
    )
}