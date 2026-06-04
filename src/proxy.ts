import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createProxyClient } from "@/lib/supabase/proxy";

// Private routes that require authentication
const PRIVATE_PATHS = ["/", "/tasks", "/courses"];
// Public routes that do NOT require authentication
const PUBLIC_PATHS = ["/login", "/register"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isPrivate = PRIVATE_PATHS.includes(pathname);
  const isPublic = PUBLIC_PATHS.includes(pathname);

  // Pass through unrelated paths
  if (!isPrivate && !isPublic) {
    return NextResponse.next();
  }

  // Create a mutable response so @supabase/ssr can write session cookies
  const response = NextResponse.next({
    request: { headers: request.headers },
  });

  const supabase = createProxyClient(request, response);

  // Refresh session if it exists — this updates auth cookies on the response
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Unauthenticated user trying to access a private route → redirect to /login
  if (isPrivate && !user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Authenticated user visiting a public route (login/register) → redirect to /
  if (isPublic && user) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all paths except static files, images, and Next.js internals.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
