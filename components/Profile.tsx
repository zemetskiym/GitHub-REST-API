import styles from "../styles/components/Profile.module.css"
import Image from "next/image"

export default function Profile (userData: object): any {
  return (
    <>
      <div id={styles.profile}>
        <div className={styles.center}>
          <Image id={styles.profilePic} alt="Avatar URL" src={`${(userData as any).avatar_url}`} width={300} height={300} />
        </div>
        <h3 id={styles.name}>{(userData as any).name}</h3>
        <h4 id={styles.login}>{(userData as any).login}</h4>
        {(userData as any).bio && <p id={styles.bio}>{(userData as any).bio}</p>}
        <p id={styles.followers}>
          {(userData as any).followers}
          <span style={{color: "#8b949e"}}> followers </span>
          &bull; {" "}
          {(userData as any).following} 
          <span style={{color: "#8b949e"}}> following </span>
        </p>
        {(userData as any).location && <p className={styles.additionalInfo}>{(userData as any).location}</p>}
        {(userData as any).email && <p className={styles.additionalInfo}>{(userData as any).email}</p>}
        {(userData as any).blog && 
          <a target="_blank" href={`${(userData as any).blog}`}><p className={styles.additionalInfo}>{(userData as any).blog}</p></a>
        }
        {(userData as any).twitter_username && <p className={styles.additionalInfo}>@{(userData as any).twitter_username}</p>}
      </div>
    </>
  )
}
