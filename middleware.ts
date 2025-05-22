import { type NextRequest, NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"

// Define protected routes that require authentication
const protectedRoutes = ["/dashboard", "/dashboard/tasks", "/dashboard/calls"]

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname

  // Check if the requested path is a protected route
  const isProtectedRoute = protectedRoutes.some((route) => path === route || path.startsWith(`${route}/`))

  // Get the session token
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET || "your-fallback-secret-do-not-use-in-production",
  })

  const isAuthenticated = !!token

  // If the route is protected and the user is not authenticated, redirect to login
  if (isProtectedRoute && !isAuthenticated) {
    const url = new URL("/auth/login", req.url)
    url.searchParams.set("callbackUrl", path)
    return NextResponse.redirect(url)
  }

  // If the user is authenticated and trying to access login, redirect to dashboard
  if (isAuthenticated && path === "/auth/login") {
    const url = new URL("/dashboard", req.url)
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

// Configure which routes the middleware should run on
export const config = {
  matcher: ["/dashboard/:path*", "/auth/login"],
}

