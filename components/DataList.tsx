import styles from "../styles/components/DataList.module.css"

interface User {
    login: string,
    id: number,
    node_id: string,
    avatar_url: string,
    gravatar_id: boolean | string,
    url: string,
    html_url: string,
    followers_url: string,
    following_url: string,
    gists_url: string,
    starred_url: string,
    subscriptions_url: string,
    organizations_url: string,
    repos_url: string,
    events_url: string,
    received_events_url: string,
    type: string,
    site_admin: boolean,
    name: string | null,
    company: string | null,
    location: string | null,
    email: string | null,
    hireable: boolean,
    bio: string | null,
    twitter_username: string | null,
    public_repos: number | false,
    public_gists: number | false,
    followers: number | false,
    following: number | false,
    created_at: string,
    updated_at: string
}

export default function DataList(userData: User): JSX.Element {
    function determineDataColor(key: string, value: null | number | boolean | string): object {
        const style = {
          color: value === null ? '#939395' : 
          typeof value == "number" || typeof value == "boolean" ? '#86de74' : '#ff7de9',
        };
    
        return (
          <div className={styles.keyValue}>
            <span className={styles.key}>{key}:</span>
            <span style={style} className={styles.value}>
              {
                value == null ? "null" :
                value == false ? "false" :
                value == true ? "true" :
                typeof value == "string" ? `"${value}"` : value
              }
            </span>
          </div>
        )
    }

    return (
        <div id={styles.secondSection}>
          <div id={styles.data}>
            {Object.entries(userData).map(([key, value]) => (
              <div key={key}>
                <>
                {determineDataColor(key, value)}
                </>
              </div>
            ))}
          </div>
        </div>
    )
}