import { signIn } from 'next-auth/react';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function signInWithEmail(email: string, password: string) {
  const result = await signIn('credentials', { email, password, redirect: false });
  if (result?.error) return { ok: false as const, error: 'Invalid email or password.' };
  return { ok: true as const, error: null };
}

export async function signUpWithEmail(email: string, password: string, name: string) {
  const res = await fetch('/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, name }),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    return { ok: false as const, error: data.error || 'Registration failed.' };
  }
  return signInWithEmail(email, password);
}

export async function signInWithGoogle() {
  await signIn('google', { redirect: false });
  return { ok: true as const, error: null };
}

export const authOptions: NextAuthOptions = {
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          const rows = await prisma.$queryRaw`
            SELECT id, email, name, password, role FROM users WHERE email = ${credentials.email} LIMIT 1
          ` as any[];

          const user = rows[0];
          if (!user || !user.password) return null;

          const isValid = await bcrypt.compare(credentials.password, user.password);
          if (!isValid) return null;

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          };
        } catch {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    // Add role and id to the JWT token
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
      }
      return token;
    },
    // Expose id and role on the session object
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
};
