import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import { prisma } from "../../../../server/db/client";

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Email", type: "email", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const users = await prisma.user.findMany();

        const userExist = users.find(
          (userFromDB) => userFromDB.email === credentials.username
        );

        if (userExist) {
          return userExist;
        } else {
          return null;
        }
      },
    }),
  ],
  pages: {
    newUser: "/auth/new-user",
  },
};

export default NextAuth(authOptions);
