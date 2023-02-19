import NextAuth, { AuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

interface CustomAuthOptions extends AuthOptions {
  baseUrl: string;
}

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  baseUrl: process.env.NEXTAUTH_URL,
  pages: {
    signIn: '/auth/signin',
  },
} as CustomAuthOptions);
