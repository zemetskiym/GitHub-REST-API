import styles from "../styles/components/Repositories.module.css"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"

export default function Repositories({ repoData }: any): JSX.Element {
    // Set up state for search bar
    const [search, setSearch] = useState<string>("")

    // Define Repo interface for type checking
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

    // Function to capitalize the first letter of a string
    function capitalize(string: string) {
        return string?.charAt(0).toUpperCase() + string.slice(1)
    }

    return (
        // Wrapper div for entire component
        <div id={styles.repositories}>
            {/* Search bar form */}
            <form id={styles.form}>
                <input onChange={(event) => {setSearch(event.target.value)}} type="text" id={styles.searchbar} placeholder="Find a repository..." />
            </form>
            {/* Filter through repoData and display matching repositories */}
            {repoData.filter((object: Repo) => {
                // Return all repositories if search bar is empty
                if (search == "") return object
                // Otherwise, only return repositories whose names contain the search term (case-insensitive)
                if (object.name.toLowerCase().includes(search.toLowerCase())) return object
            }).map((object: object) => 
            {
            // Cast object as Partial<Repo> to avoid type errors when optional properties are undefined
            let repo = object as Partial<Repo>
            return(
                // Repository container div with key set to repo ID
                <div className={styles.repository} key={repo.id}>
                    {/* Repository name, linked to HTML URL */}
                    <div className={styles.title}>
                        <Link href={`${repo.html_url}`} target="_blank"><h2 className={styles.name}>{repo.name}</h2></Link>
                        {/* If visibility property exists, display it (capitalized) */}
                        {repo.visibility && <div className={styles.visibility}>{capitalize(repo.visibility)}</div>}
                    </div>
                    {/* Repository description */}
                    <p className={styles.description}>{repo.description}</p>
                    {/* Repository topics */}
                    {repo.topics?.map(x => <span className={styles.topics}>{x}</span>)}
                    {/* Additional repository information */}
                    <div className={styles.additionalInfo}>
                        {/* Repository language, if it exists */}
                        {repo.language && <small className={styles.language}>{repo.language}</small>}
                        {/* Repository forks count, if it exists and is greater than 0 */}
                        {repo.forks_count != undefined && repo.forks_count > 0 && 
                        <>
                            <Image alt="" src="/repo-forked.svg" height={18} width={18} className={styles.icon} />
                            <small className={styles.language}>{repo.forks_count}</small>
                        </>
                        }
                        {/* Repository license, if it exists */}
                        {repo.license && 
                        <>
                            <Image alt="" src="/law.svg" height={18} width={18} className={styles.icon} />
                            <small className={styles.license}>{repo.license && repo.license.name}</small>
                        </>
                        }
                        {/* Repository last updated time */}
                        <small className={styles.updatedAt}>Updated {repo.updated_at}</small>
                    </div>
                </div>
            )
            }
            )}
        </div>
    )
}
