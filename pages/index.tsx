import { FormEvent, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'

export default function Home() {
  type UserSearch = {user: string, submitted: boolean}
  const [userSearch, setUserSearch] = useState<UserSearch>({user: "", submitted: false})
  const [userData, setUserData] = useState<null | object>(null)

  async function fetchData() {
    const response: Response = await fetch(`https://api.github.com/users/${userSearch.user}`)
    const data: object = await response.json()
    setUserData(data)
    console.log(data)
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    fetchData()
  }

  return (
    <>
      <Head>
        <title>GitHub REST API</title>
        <meta name="description" content="A simple REST API for collecting public GitHub user information." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preload" href="Mona-Sans.woff2" as="font" type="font/woff2" crossOrigin="anonymous"></link>
      </Head>
      <main>
        <>
        <h1 id={styles.title}>GitHub REST API</h1>
        <form id={styles.form} onSubmit={(event) => handleSubmit(event)}>
          <input 
            id={styles.input}
            type="text" 
            value={userSearch.user}
            onChange={(event) => setUserSearch(prev => ({user: event.target.value, submitted: prev.submitted}))}
            placeholder='Search by user...'
          />
          <button id={styles.submit}>
            <b>Submit</b>
          </button>
        </form>
        {userData && (
          <>
          {!userData.hasOwnProperty("message") && <div id={styles.profile}>
            <div className={styles.center}>
              <Image id={styles.profilePic} alt="Avatar URL" src={`${(userData as any).avatar_url}`} width={300} height={300} />
            </div>
            <h3 id={styles.name}>{(userData as any).name}</h3>
            <h4 id={styles.login}>{(userData as any).login}</h4>
            {(userData as any).location && <p id={styles.bio}>{(userData as any).bio}</p>}
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
          </div>}
          <div id={styles.data}>
            {Object.entries(userData).map(([key, value]) => (
              <div key={key} className={styles.keyValue}>
                <span className={styles.key}>{key}:</span>
                <div className={styles.vr}></div>
                <span className={styles.value}>{value == null ? "null" : value}</span>
              </div>
            ))}
          </div>
          </>
        )}
        </>
      </main>
    </>
  )
}
