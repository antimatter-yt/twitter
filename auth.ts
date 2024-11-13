import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcrypt from 'bcryptjs'
import prisma from "./lib/prismadb"
import Google from "next-auth/providers/google"
import GitHub from "next-auth/providers/github"
import { PrismaAdapter } from "@auth/prisma-adapter"

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google,
    GitHub,
    Credentials({
      credentials: {
        email: { label: "Email", type: "text", placeholder: "you@example.com" },
        password: { label: "Password", type: "password", placeholder: "Password" },
      },
      authorize: async (credentials: Partial<Record<"email" | "password", unknown>>) => {
        const email = credentials.email as string; 
        const password = credentials.password as string; 

        if (!email || !password) {
          throw new Error("Invalid Credentials");
        }
        
        const user = await prisma.user.findUnique({
          where: {
            email: email
          }
        });
        
        if (!user || !user.hashedPassword) {
          throw new Error("Invalid Credentials");
        }
        
        const isPasswordCorrect = await bcrypt.compare(password, user.hashedPassword);
        if (!isPasswordCorrect) {
          throw new Error("Password does not match");
        }
        
        const transformedUser = {
          id: user.id,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          name: user.name,
          email: user.email,
          username: user.username ?? undefined,
          bio: user.bio,
          emailVerified: user.emailVerified,
          hasNotifications: user.hasNotifications,
        };
        console.log(transformedUser)

        return transformedUser;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user.id?.toString(); 
        token.isVerified = user.isVerified;
        token.username = user.username;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
        session.user.isVerified = token.isVerified;
        session.user.username = token.username;
        session.user.email = token.email;
      }
      return session;
    },
  },
  pages: {
    signIn: '/'
  },
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt"
  }
});
