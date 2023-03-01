// Importing styles module and Image component from Next.js
import styles from "../styles/components/Profile.module.css"
import Image from "next/image"

// Defining the interface for the Profile component's props
interface Profile {
  avatar_url: string,
  name: string | null,
  login: string,
  bio: string | null,
  followers: number | boolean,
  following: number | boolean,
  company: string | null,
  location: string | null,
  email: string | null,
  blog: string | boolean,
  twitter_username: string | null
}

// Defining the Profile component and its props
export default function Profile (userData: Partial<Profile>): JSX.Element {
  return (
    <>
      <div id={styles.profile}>
        <div className={styles.picContainer}>
          {/* Displaying user avatar image using the Image component */}
          <Image id={styles.profilePic} alt="Avatar URL" src={`${userData.avatar_url}`} width={300} height={300} />
        </div>
        <div id={styles.info}>
          {/* Displaying user name and login */}
          <h3 id={styles.name}>{userData.name}</h3>
          <h4 id={styles.login}>{userData.login}</h4>
          {/* Displaying user bio if available */}
          {userData.bio && <p id={styles.bio}>{userData.bio}</p>}
          {/* Displaying user follower and following counts */}
          <p id={styles.followers}>
            {userData.followers}
            <span style={{color: "#8b949e"}}> followers </span>
            &bull; {" "}
            {userData.following} 
            <span style={{color: "#8b949e"}}> following </span>
          </p>
          {/* Displaying user company if available */}
          {userData.company && 
          <div className={styles.additionalInfo}>
            <Image alt="" src="/organization.svg" height={15} width={15}  className={styles.infoImage} />
            <p className={styles.infoText}>{userData.company}</p>
          </div>
          }
          {/* Displaying user location if available */}
          {userData.location && 
          <div className={styles.additionalInfo}>
            <Image alt="" src="/location.svg" height={15} width={15} className={styles.infoImage} />
            <p className={styles.infoText}>{userData.location}</p>
          </div>
          }
          {/* Displaying user email if available */}
          {userData.email && 
          <div className={styles.additionalInfo}>
            <Image alt="" src="/mail.svg" height={15} width={15} className={styles.infoImage} />
            <p className={styles.infoText}>{userData.email}</p>
          </div>
          }
          {/* Displaying user blog if available */}
          {userData.blog && 
          <div className={styles.additionalInfo}>
            <Image alt="" src="/link.svg" height={15} width={15} className={styles.infoImage} />
            <a target="_blank" href={`${userData.blog}`}><p className={styles.infoText}>{userData.blog}</p></a>
          </div>
          }
          {/* Displaying user Twitter username if available */}
          {userData.twitter_username && 
          <div className={styles.additionalInfo}>
            <Image alt="" src="/twitter.svg" height={15} width={15} className={styles.infoImage} />
            <p className={styles.infoText}>@{userData.twitter_username}</p>
          </div>
          }
        </div>
      </div>
    </>
  )
}