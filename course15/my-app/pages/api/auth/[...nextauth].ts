import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID??="",
      clientSecret: process.env.GOOGLE_SECRET??=""
    })
  ],
  theme: {
    colorScheme: "light",
  },
  callbacks: {
    async jwt({ token }) {
      token.userRole = "admin"
      return token
    },
  },
}

export default NextAuth(authOptions)

// clientId: "552309206082-24i112jigc6gv0ptaik2meqomm7fqk9t.apps.googleusercontent.com",
// clientSecret: "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",

// clientId: process.env.GOOGLE_ID?process.env.GOOGLE_ID:"",
// clientSecret: process.env.GOOGLE_SECRET?process.env.GOOGLE_SECRET:"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",
