import styles from "../styles/components/Profile.module.css"
import Image from "next/image"

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

export default function Profile (userData: Partial<Profile>): JSX.Element {
  return (
    <>
      <div id={styles.profile}>
        <div className={styles.picContainer}>
          <Image id={styles.profilePic} alt="Avatar URL" src={`${userData.avatar_url}`} width={300} height={300} />
        </div>
        <h3 id={styles.name}>{userData.name}</h3>
        <h4 id={styles.login}>{userData.login}</h4>
        {userData.bio && <p id={styles.bio}>{userData.bio}</p>}
        <p id={styles.followers}>
          {userData.followers}
          <span style={{color: "#8b949e"}}> followers </span>
          &bull; {" "}
          {userData.following} 
          <span style={{color: "#8b949e"}}> following </span>
        </p>
        
        {userData.company && 
        <div className={styles.additionalInfo}>
          <Image alt="" src="/organization.svg" height={15} width={15}  className={styles.infoImage} />
          <p className={styles.infoText}>{userData.company}</p>
        </div>
        }
        {userData.location && 
        <div className={styles.additionalInfo}>
          <Image alt="" src="/location.svg" height={15} width={15} className={styles.infoImage} />
          <p className={styles.infoText}>{userData.location}</p>
        </div>
        }
        {userData.email && 
        <div className={styles.additionalInfo}>
          <Image alt="" src="/mail.svg" height={15} width={15} className={styles.infoImage} />
          <p className={styles.infoText}>{userData.email}</p>
        </div>
        }
        {userData.blog && 
        <div className={styles.additionalInfo}>
          <Image alt="" src="/link.svg" height={15} width={15} className={styles.infoImage} />
          <a target="_blank" href={`${userData.blog}`}><p className={styles.infoText}>{userData.blog}</p></a>
        </div>
        }
        {userData.twitter_username && 
        <div className={styles.additionalInfo}>
          <Image alt="" src="/twitter.svg" height={15} width={15} className={styles.infoImage} />
          <p className={styles.infoText}>@{userData.twitter_username}</p>
        </div>
        }
      </div>
    </>
  )
}
