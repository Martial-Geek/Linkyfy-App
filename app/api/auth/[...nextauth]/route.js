import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import Detail from "@models/details";
import { connectToDB } from "@utils/database.js";
import bcrypt from "bcrypt";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      prompt: "select_account",
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      authorize: async (credentials) => {
        await connectToDB(); // Connect to your MongoDB

        const user = await Detail.findOne({
          email: credentials.username,
        }).exec();

        if (user) {
          const passwordMatch = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (passwordMatch) {
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
    async signIn({ profile, credentials }) {
      try {
        await connectToDB();

        if (profile) {
          // check if user already exists
          const userExists = await Detail.findOne({ email: profile.email });

          // if not, create a new document and save user in MongoDB
          if (!userExists) {
            await Detail.create({
              email: profile.email,
              name: profile.name,
            });
          }
          return true;
        }

        if (credentials) return true;
      } catch (error) {
        console.log("Error checking if user exists: ", error.message);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
