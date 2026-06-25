import NextAuth from 'next-auth';
import { authOptions } from '@/lib/auth';

const handler = NextAuth(authOptions);

// Next.js App Router requires exporting GET and POST separately
export { handler as GET, handler as POST };
