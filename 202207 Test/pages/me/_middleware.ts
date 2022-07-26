import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const hasLogin = req.cookies.hasLoginCookie;
  if (hasLogin) {
    return NextResponse.next();
  }
  return NextResponse.redirect("/");
}
