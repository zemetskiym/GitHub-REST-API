// Import required modules and components
import { FormEvent, useState } from 'react'
import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import Overview from '@/components/Overview'
import Profile from '@/components/Profile'
import SectionNav from '@/components/SectionNav'
import DataList from '@/components/DataList'
import Repositories from '@/components/Repositories'
import { useAppContext } from '@/components/context'

export default function Home() {

  // Define a type for the user search state
  type UserSearch = {user: string, submitted: boolean}

  // Set the initial state for user search, section, user data and repository data
  const [userSearch, setUserSearch] = useState<UserSearch>({user: "", submitted: false})
  const { userState, repoState } = useAppContext()
  const [userData, setUserData] = userState
  const [repoData, setRepoData] = repoState
  const [section, setSection] = useState<string>("overview")

  // Fetch user and repository data from the GitHub REST API
  async function fetchData() {
    let userResponse: Response = await fetch(`https://api.github.com/users/${userSearch.user}`)
    let userData: object = await userResponse.json()

    // Set the user data state if the user exists
    if (!userData.hasOwnProperty('message')) setUserData(userData)

    // If the user doesn't exist, display an alert message
    if (userData.hasOwnProperty('message')) alert("Invalid username. Please try again.")

    let repositoryResponse: Response = await fetch(`https://api.github.com/users/${userSearch.user}/repos`)
    let repositoryData: object = await repositoryResponse.json()

    // Set the repository data state if the repository data exists
    if (!repositoryData.hasOwnProperty('message')) setRepoData(repositoryData)
  }

  // Fetch data and prevent refresh on form submission
  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    fetchData()
  }

  // Set the position of the form based on whether user data exists
  const positionForm = {
    alignItems: userData ? "flex-start" : "center"
  }

  // Return the Home component with the necessary elements and components
  return (
    <>
      <Head>
        <title>GitHub REST API</title>
        <meta name="description" content="Discover your Github statistics with our website. Enter your Github username and get a detailed breakdown of your repositories, contributions, and more. Stay updated on your Github activity, all in one place, with our simple and easy-to-use API integration with Github" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/github.svg" />
        <link rel="preload" href="Mona-Sans.woff2" as="font" type="font/woff2" crossOrigin="anonymous"></link>
      </Head>
      <main id={styles.main} style={positionForm}> 
        <div id={styles.layoutSidebar}>
          {!userData && <div id={styles.intro} style={!userData ? {flexDirection: "column"} : {}}>
            <h1 id={styles.title}>GitHub REST API</h1>
            <p id={styles.description}>Easily search and access public Github user data with this tool, which collects and sections the data. No data is saved by our website for privacy.</p>
            <form id={styles.form} onSubmit={(event) => handleSubmit(event)}>
              <input 
                id={styles.input}
                type="text" 
                value={userSearch.user}
                onChange={(event) => setUserSearch(prev => ({user: event.target.value, submitted: prev.submitted}))}
                placeholder='Search by user...'
              />
              <button id={styles.submit}>
                Submit
              </button>
            </form>
          </div>}

        {userData && (
          <>
          {!userData.hasOwnProperty("message") && <Profile {...userData} />}
          </>
        )}
        </div>

        {/* If userdata exists, display the correct section */}
        {userData && 
          <div id={styles.layoutMain}>
            <SectionNav section={section} setSection={setSection} />
            {section == "overview" && <Overview {...userData} />}
            {section == "repositories" && repoData != null && <Repositories repoData={repoData} />}
            {section == "data" && <DataList {...userData} />}
          </div> 
        }
      </main>
    </>
  )
}
