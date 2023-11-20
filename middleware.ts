import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export default async function middleware(req: NextRequest) {

  console.log(process.env.NODE_ENV)
  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    //todo: change cookieName
    cookieName: 'next-auth.session-token'
})

console.log(session)

if (!session) {
    const requestedPage = req.nextUrl.pathname;
    const url = req.nextUrl.clone();

    url.pathname = `/auth/login`;
    //url.searchParams.append("callbackUrl", req.url)
    //console.log(url)
    return NextResponse.redirect(url);
  }
 
  return NextResponse.next();

}

export const config = { matcher: [ "/", "/user/:id*", '/employee', '/project/:idProject' ]}