import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Detail from "@models/details";
import { connectToDB } from "@utils/database.js";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      authorize: async (credentials) => {
        await connectToDB(); // Connect to your MongoDB

        const user = await Detail.findOne({
          email: credentials.username,
        }).exec();

        if (user) {
          if (user.password === credentials.password) {
            // Sign the user in
            return Promise.resolve(user);
          } else {
            throw new Error("Incorrect Password!");
          }
        } else {
          throw new Error("No User Found!");
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  // jwt: {
  //   signingKey: { kty: "oct", kid: "--", alg: "HS256", k: "--" },
  //   verificationOptions: {
  //     algorithms: ["HS256"],
  //   },
  //   secret: process.env.JWT_SECRET,
  // },
  pages: {
    signIn: "/",
    error: "/auth/error",
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      // store the user id from MongoDB to session
      const sessionUser = await Detail.findOne({ email: session.user.email });
      session.accessToken = token.accessToken;
      session.user.id = sessionUser._id.toString();
      session.user.phone = sessionUser.phone;

      return session;
    },
  },
});

export { handler as GET, handler as POST };
