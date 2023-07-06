import NextAuth from "next-auth" // Importing NextAuth library
import GithubProvider from "next-auth/providers/github" // Importing the Github provider from NextAuth

export const authOptions = {
  providers: [
    GithubProvider({ // Configuring the Github provider
      clientId: process.env.GITHUB_ID, // Setting the Github client ID using environment variable
      clientSecret: process.env.GITHUB_SECRET, // Setting the Github client secret using environment variable
    }),
  ],
}

export default NextAuth(authOptions) // Exporting the NextAuth instance configured with the provided options