import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";

export const authOptions = {
    providers: [
        Credentials({
            credentials: {
                email: {type: "email"},
                password: {type: "password"}
            },
            async authorize(credentials){
                let user = null

                user = {
                    email: credentials.email
                }
                return user
            }
        })
    ]
}

export const handler = NextAuth(authOptions)
const GET = handler
const POST = handler

export {GET, POST} 