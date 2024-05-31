import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  
  // If the token is not present or has expired, redirect to the login page
//   if (!token) {
//     const loginUrl = new URL('/auth/signin', req.url);
//     return NextResponse.redirect(loginUrl);
//   }

  // Allow the request to proceed if the token is valid
  return NextResponse.next();
}

export const config = {
  matcher: ['/:path*'], // Apply middleware to protected routes
};
