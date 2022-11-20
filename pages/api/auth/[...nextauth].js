import NextAuth from 'next-auth';
import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '../../../prisma/prisma';

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD
        }
      },
      from: process.env.EMAIL_FROM
    }),

  ],
  pages: {
    signIn: "/signin",
  },
  database: process.env.DATABASE_URL,
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token, user }) {
      const indexAt = user.email.indexOf('@');
      const newName = user.email.slice(0, indexAt);
      session.user.id = user.id;
      session.user.name = newName;
      return session;
    },
  },
  debug: true,
});