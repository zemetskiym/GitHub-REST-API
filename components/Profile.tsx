import styles from "../styles/components/Profile.module.css"
import Image from "next/image"

interface Profile {
  avatar_url: string,
  name: string | null,
  login: string,
  bio: string | null,
  followers: number | boolean,
  following: number | boolean,
  location: string | null,
  email: string | null,
  blog: string | boolean,
  twitter_username: string | null
}

export default function Profile (userData: Partial<Profile>): any {
  return (
    <>
      <div id={styles.profile}>
        <div className={styles.center}>
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
        {userData.location && <p className={styles.additionalInfo}>{userData.location}</p>}
        {userData.email && <p className={styles.additionalInfo}>{userData.email}</p>}
        {userData.blog && 
          <a target="_blank" href={`${userData.blog}`}><p className={styles.additionalInfo}>{userData.blog}</p></a>
        }
        {userData.twitter_username && <p className={styles.additionalInfo}>@{userData.twitter_username}</p>}
      </div>
    </>
  )
}
