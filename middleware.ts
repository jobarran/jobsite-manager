import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export default async function middleware(req: NextRequest) {

  console.log(process.env.NODE_ENV)

  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    //TODO: change cookieName
    cookieName: process.env.NODE_ENV === 'production' ? '__Secure-next-auth.session-token' : 'next-auth.session-token'
    // cookieName: 'next-auth.session-token'
})

if (!session) {
    // await db.disconnect()
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