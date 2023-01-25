import { FormEvent, useState } from 'react'
import Head from 'next/head'
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
      </Head>
      <main>
        <>
        <h1>GitHub REST API</h1>
        <form onSubmit={(event) => handleSubmit(event)}>
          <input 
            type="text" 
            value={userSearch.user}
            onChange={(event) => setUserSearch(prev => ({user: event.target.value, submitted: prev.submitted}))}
            placeholder='Search by user...'
          />
          <button>Submit</button>
        </form>
        {userData && (
          <div>
            {Object.entries(userData).map(([key, value]) => (
              <div key={key}>
                <p>{key}: {value == null ? "null" : value}</p>
              </div>
            ))}
          </div>
        )}
        </>
      </main>
    </>
  )
}
