import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { dbUsers } from "@/database";




export const authOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [    
        Credentials({
            name: 'Custon Login',
            credentials: {
                email: { label:'Email', type:'email', placeholder: 'email@google.com' },
                password: { label:'Password', type:'password', placeholder:'Password' },
            },
            async authorize(credentials) {
                return await dbUsers.checkUserEmailPassword(
                    credentials!.email, 
                    credentials!.password 
                ) as any
            },
            
        }),     
  ],

  pages: {
    signIn: '/auth/login',
  },

  session: {
    maxAge: 2592000, // 30 dias
    strategy: 'jwt',
    updateAge: 86400, // 1 dia
  },

  callbacks: {

    async jwt({ token, user }: any) {
      return { ...token, ...user };
    },
    async session({ session, token, user }: any) {
      // Send properties to the client, like an access_token from a provider.
      session.user = token;
      console.log(session)
      return session;
    },
  },
};

export default NextAuth(authOptions as any);