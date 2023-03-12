import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Navbar from '@/components/Navbar'
import { SessionProvider } from "next-auth/react"
import { AppWrapper } from '@/components/context'

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <AppWrapper>
      <SessionProvider session={session}>
        <Navbar />
        <Component {...pageProps} />
      </SessionProvider>
    </AppWrapper>
  )
}
