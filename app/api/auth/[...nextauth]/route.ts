import NextAuth, { DefaultSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { db } from "../../../../firebase/config";
import { collection, query, where,getDoc, getDocs, addDoc,doc } from "firebase/firestore";
import { Session, User } from "next-auth"; // Import necessary types



const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET!,
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        if (account?.provider === "google") {
          const user_db = collection(db, "users");
          const check_user = query(user_db, where("email", "==", user.email));
          const querySnapshot = await getDocs(check_user);

          if (querySnapshot.empty) {
            const saved_data = await addDoc(user_db, {
              name: user.name!,
              email: user.email!,
              profilePictureUrl: user.image!,
              uid: user.id!,
              // @ts-ignore
              emailVerified: profile?.email_verified!,
            });
            console.log("User added to the database", saved_data);
          } else {
            console.log("User already exists");
          }
        }
      } catch (error) {
        console.error("Error during sign in:", error);
      }
      return true; // Return true to allow sign in
    },
  },
});

export { handler as GET, handler as POST };