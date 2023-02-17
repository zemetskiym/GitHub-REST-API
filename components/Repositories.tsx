import styles from "../styles/components/Repositories.module.css"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"

export default function Repositories({ repoData }: any): JSX.Element {
    const [search, setSearch] = useState<string>("")
    interface Repo {
        id: number,
        name: string,
        html_url: string,
        visibility: string,
        description: string | null,
        topics: string[],
        language: string,
        forks_count: number,
        license: {name: string} | null,
        updated_at: string,
    }

    function capitalize(string: string) {
        return string?.charAt(0).toUpperCase() + string.slice(1)
    }

    return (
        <div id={styles.repositories}>
            <form id={styles.form}>
                <input onChange={(event) => {setSearch(event.target.value)}} type="text" id={styles.searchbar} placeholder="Find a repository..." />
            </form>
            {repoData.map((object: object) => 
            {
            let repo = object as Partial<Repo>
            return(
                <div className={styles.repository} key={repo.id}>
                    <div className={styles.title}>
                        <Link href={`${repo.html_url}`} target="_blank"><h2 className={styles.name}>{repo.name}</h2></Link>
                        {repo.visibility && <div className={styles.visibility}>{capitalize(repo.visibility)}</div>}
                    </div>
                    <p className={styles.description}>{repo.description}</p>
                    {repo.topics?.map(x => <span className={styles.topics}>{x}</span>)}
                    <div className={styles.additionalInfo}>
                        {repo.language && <small className={styles.language}>{repo.language}</small>}
                        {repo.forks_count != undefined && repo.forks_count > 0 && 
                        <>
                            <Image alt="" src="/repo-forked.svg" height={18} width={18} className={styles.icon} />
                            <small className={styles.language}>{repo.forks_count}</small>
                        </>
                        }
                        {repo.license && 
                        <>
                            <Image alt="" src="/law.svg" height={18} width={18} className={styles.icon} />
                            <small className={styles.license}>{repo.license && repo.license.name}</small>
                        </>
                        }
                        <small className={styles.updatedAt}>Updated {repo.updated_at}</small>
                    </div>
                </div>
            )
            }
            )}
        </div>
    )
}