// Importing CSS styles from a module
import styles from "../styles/components/DataList.module.css"

// Interface defining the properties of a User object
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

// Function that determines the color of the data based on its type
function determineDataColor(key: string, value: null | number | boolean | string): object {
  const style = {
    color: value === null ? '#939395' : 
    typeof value == "number" || typeof value == "boolean" ? '#86de74' : '#ff7de9',
  };

  return (
    // JSX element that displays the key-value pair with the appropriate style
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

// Component that displays a list of data
export default function DataList(userData: Partial<User>): JSX.Element {
  return (
    <div id={styles.data}>
      {/* Mapping over the entries of the userData object and displaying the key-value pairs */}
      {Object.entries(userData).map(([key, value]) => (
        <div key={key}>
          <>
            {/* Invoking the determineDataColor function to determine the color of the data */}
            {determineDataColor(key, value)}
          </>
        </div>
      ))}
    </div>
  )
}
