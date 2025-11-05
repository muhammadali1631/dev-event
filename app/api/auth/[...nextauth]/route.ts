import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import User from "@/database/user.model";
import connectDB from "@/lib/mongodb";

const handler = NextAuth({
  
  providers: [
    // 🔹 Google Provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    // 🔹 Credentials Provider
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectDB();

        // Find user by email
        const user = await User.findOne({ email: credentials?.email }).select("+password");
        if (!user) throw new Error("No user found");

        // Compare password
        const isValid = await bcrypt.compare(
          credentials?.password || "",
          user.password || ""
        );
        if (!isValid) throw new Error("Invalid password");

        return user;
      },
    }),
  ],

  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    // ✅ Save Google user to MongoDB
    async signIn({ user, account }) {
      await connectDB();

      if (account?.provider === "google") {
        const existingUser = await User.findOne({ email: user.email });

        if (!existingUser) {
          await User.create({
            name: user.name || "Unnamed User",
            email: user.email,
            image: typeof user.image === "string" ? user.image : null,
            provider: "google",
            password: null,
          });
        }
      }

      return true;
    },

    // ✅ Attach user info to JWT
    async jwt({ token, user }) {
      if (user) {
        token.name = user.name ?? null;
        token.email = user.email ?? null;
        token.image = typeof user.image === "string" ? user.image : null;
      }
      return token;
    },

    // ✅ Make user info available in session
    async session({ session, token }) {
      if (token) {
        session.user = {
          name: token.name ?? null,
          email: token.email ?? null,
          image: typeof token.image === "string" ? token.image : null,
        };
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
