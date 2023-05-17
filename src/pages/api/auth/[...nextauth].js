import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

const bcrypt = require("bcrypt");

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
        const user = await prisma.user.findFirst({
          where: {
            email: credentials.username,
          },
        });

        if (!user) {
          return null;
        }

        const match = await bcrypt.compare(credentials.password, user.password);

        if (!match) {
          return null;
        }

        return user;
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
    // newUser: "/auth/new-user",
  },
};

export default NextAuth(authOptions);
