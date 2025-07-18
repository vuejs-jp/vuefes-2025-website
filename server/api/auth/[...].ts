import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "../../db/orm";
import { NuxtAuthHandler } from "#auth";
import { useRuntimeConfig } from "#imports";

declare module "next-auth" {
  interface Session {
    userId: string;
  }
}

export default NuxtAuthHandler({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  adapter: DrizzleAdapter(db) as any,
  secret: useRuntimeConfig().authSecret,
  providers: [
    // @ts-expect-error Use .default here for it to work during SSR.
    GithubProvider.default({
      clientId: useRuntimeConfig().githubClientId,
      clientSecret: useRuntimeConfig().githubClientSecret,
    }),
    // @ts-expect-error Use .default here for it to work during SSR.
    GoogleProvider.default({
      clientId: useRuntimeConfig().googleClientId,
      clientSecret: useRuntimeConfig().googleClientSecret,
    }),
  ],
  pages: {
    signIn: "/namecard",
    signOut: "/namecard",
    error: "/namecard",
  },
  callbacks: {
    async session({ session, user }) {
      // Add userId to the session object
      session.userId = user.id;
      return session;
    },
  },
});
