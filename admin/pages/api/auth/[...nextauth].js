import NextAuth from 'next-auth';

import CredentialsProvider from "next-auth/providers/credentials";
import { redirect } from 'next/dist/server/api-utils';
export default NextAuth({
  providers: [
    CredentialsProvider({
    
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },

      },
      
      authorize: async (credentials) => {
        // Implement your own logic for username/password validation
        const { username, password } = credentials;

        if (username === 'admin' && password === 'password') {
          return { name: 'John Doe' }; // Return user object on successful login
        } else {
          return null;
          throw new Error('Invalid credentials'); // Throw error on failed login
        }
      },
    }),
  ],
  callbacks: {
    session: ({ session, token, user }) => {
      return session;
    },
  },
  
  pages: {
  signIn: '/login',
  signOut: '/auth/signOut',
  error: '/auth/error', // Error code passed in query string as ?error=
  verifyRequest: '/auth/verify-request', // (used for check email message)
  newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
}

});

