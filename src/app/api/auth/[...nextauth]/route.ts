import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import LinkedIn from "next-auth/providers/linkedin"

const authOptions = {
    // Configure one or more authentication providers
    providers: [
            GoogleProvider({
                clientId: process.env.GOOGLE_CLIENT_ID ?? "",
                clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
            }),
            LinkedIn({
                clientId: process.env.LINKEDIN_CLIENT_ID ?? "",
                clientSecret: process.env.LINKEDIN_CLIENT_SECRET ?? "",
                authorization: { params: { scope: 'openid profile email' } },
                issuer: 'https://www.linkedin.com/oauth',
                jwks_endpoint: "https://www.linkedin.com/oauth/openid/jwks",
                async profile(profile) {
                    return {
                        id: profile.sub,
                        name: `${profile.localizedFirstName} ${profile.localizedLastName}`,
                        email: profile.emailAddress,
                        image: profile.profilePicture?.['displayImage~']?.elements?.[0]?.identifiers?.[0]?.identifier ?? null,
                    }
                },
            })
        // ...add more providers here
    ],
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/auth/signin',
    },
    debug: true,
    callbacks: {
        async jwt({ token, user }) {
          if (user) token.role = user.role;
          return token;
        },
        async session({ session, token }) {
          if (session?.user) session.user.role = token.role;
          return session;
        },
      },
}
export const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
