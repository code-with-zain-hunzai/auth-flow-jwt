import { NextRequest, NextResponse } from "next/server";
import { Routes } from "@/routes/authRoutes";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  console.log(token);

  if (
    request.nextUrl.pathname === Routes.HOME ||
    request.nextUrl.pathname === Routes.TODOS
  ) {
    if (!token) {
      return NextResponse.redirect(new URL(Routes.SIGNIN, request.url));
    }
  }

  if (
    token &&
    [Routes.SIGNIN, Routes.SIGNUP].includes(request.nextUrl.pathname)
  ) {
    return NextResponse.redirect(new URL(Routes.TODOS, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/todos", "/signin", "/signup"],
};
