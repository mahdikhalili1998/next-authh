import UserInfo from "@/models/userInfo";
import ConnectDB from "@/utils/ConnectDB";
import { verifyPassword } from "@/utils/password";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import clientPromise from "@/lib/db";
import { MongoDBAdapter } from "@auth/mongodb-adapter";

const authOptions = {
  session: { strategy: "jwt" },
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),

    CredentialsProvider({
      async authorize(creditials, req) {
        const { email, password } = creditials;
        console.log(email);
        try {
          await ConnectDB();
        } catch (error) {
          throw new Error("can not connect to db");
        }
        if (!email || !password) throw new Error("invalid Data");
        const user = await UserInfo.findOne({ email: email });
        if (!user) throw new Error("user does not exist");
        const isValid = await verifyPassword(password, user.password);
        if (!isValid) throw new Error("username or password is incorrect");
        return email;
      },
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
};

export default NextAuth(authOptions);
