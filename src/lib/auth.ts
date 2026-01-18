import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    async signIn({ profile }) {
      if (profile?.email === process.env.ALLOWED_GOOGLE_ADMIN) {
        return true;
      }
      return false;
    },

    async redirect({ url, baseUrl }) {
      // Always redirect to dashboard after login
      return "/admin/";
    },
  },

  pages: {
    signIn: "/admin/login",
  },
};
