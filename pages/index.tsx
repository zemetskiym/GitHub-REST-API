import { FormEvent, useState } from 'react'
import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import Profile from '@/components/Profile'
import DataList from '@/components/DataList'
import Repositories from '@/components/Repositories'

export default function Home() {
  type UserSearch = {user: string, submitted: boolean}
  const [userSearch, setUserSearch] = useState<UserSearch>({user: "", submitted: false})
  const [userData, setUserData] = useState<null | object>(null)
  const [repoData, setRepoData] = useState<null | object>(null)
  const [section, setSection] = useState<string>("repositories")

  async function fetchData() {
    let userResponse: Response = await fetch(`https://api.github.com/users/${userSearch.user}`)
    let userData: object = await userResponse.json()
    if (!userData.hasOwnProperty('message')) setUserData(userData)
    if (userData.hasOwnProperty('message')) alert("Invalid username. Please try again.")

    let repositoryResponse: Response = await fetch(`https://api.github.com/users/${userSearch.user}/repos`)
    let repositoryData: object = await repositoryResponse.json()
    if (!repositoryData.hasOwnProperty('message')) setRepoData(repositoryData)
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    fetchData()
  }

  const positionForm = {
    alignItems: userData ? "flex-start" : "center"
  }

  return (
    <>
      <Head>
        <title>GitHub REST API</title>
        <meta name="description" content="Discover your Github statistics with our website. Enter your Github username and get a detailed breakdown of your repositories, contributions, and more. Stay updated on your Github activity, all in one place, with our simple and easy-to-use API integration with Github" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" />
        <link rel="preload" href="Mona-Sans.woff2" as="font" type="font/woff2" crossOrigin="anonymous"></link>
      </Head>
      <main id={styles.main} style={positionForm}> 
        <div id={styles.layoutSidebar}>
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
          {!userData.hasOwnProperty("message") && <Profile {...userData} />}
          </>
        )}
        </div>

        {userData && 
          <div id={styles.layoutMain}>
            {section == "repositories" && repoData != null && <Repositories {...repoData} />}
            {section == "data" && <DataList {...userData} />}
          </div> 
        }
      </main>
    </>
  )
}
