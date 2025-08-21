import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { dbConnect } from "@/lib/dbConnect";
import bcrypt from "bcryptjs";

export const authOptions = {
  // Authentication providers
  providers: [
    // 1️⃣ Credentials (email/password)
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "you@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        // Connect to MongoDB
        const usersCollection = await dbConnect("users");
        const user = await usersCollection.findOne({ email: credentials.email });

        if (!user) return null;

        // Compare hashed password
        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) return null;

        // Return user object for NextAuth session
        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          image: user.image || null,
        };
      },
    }),

    // 2️⃣ Google OAuth
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  pages: {
    signIn: "/login", // Custom login page
  },

  session: {
    strategy: "jwt", // JWT sessions
  },

  callbacks: {
    // Add extra properties to JWT
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;
      }
      return token;
    },

    // Make token available in session
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.image;
      }
      return session;
    },

    // Optional: handle Google OAuth first login
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        const usersCollection = await dbConnect("users");

        // Check if user exists
        const existingUser = await usersCollection.findOne({ email: user.email });
        if (!existingUser) {
          // Create new user document
          await usersCollection.insertOne({
            name: user.name,
            email: user.email,
            image: user.image,
            provider: "google",
            createdAt: new Date(),
          });
        }
      }
      return true;
    },
  },

  debug: false, // Set to true to see NextAuth logs
};
