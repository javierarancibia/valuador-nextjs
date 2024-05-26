import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { signIn } from "next-auth/react"
import connectMongoDB from "../../../../../lib/mongodb"
import AppUser from "../../../../../models/appUser"

const authOptions = {
    // Configure one or more authentication providers
    providers: [
            GoogleProvider({
                clientId: process.env.GOOGLE_CLIENT_ID ?? "",
                clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
            }),
        // ...add more providers here
    ],
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/auth/signin',
    },
    callbacks: {
        async signIn(params: any) {
            const { user, account } = params
            if (account.provider === "google") {
                try {
                    const { name, email } = user
                    await connectMongoDB();
                    const appUserExists = await AppUser.findOne({ email })

                    if (!appUserExists) {
                        const res = await fetch('http://localhost:3000/api/user', {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ date: new Date(), name, email })
                        })
                        if (res.ok) {
                            return true;
                        } else {
                            console.error('Failed to save user data.');
                            return false;
                        }
                    } else {
                        console.log("User already exists");
                        
                    }
                } catch (error) {
                    console.error('Error during sign in:', error);
                    return false;
                }
            }
            return true;
        }
    }
}
export const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
