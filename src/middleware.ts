import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicPaths = ["/", "/auth/login", "/auth/callback"];
//로그인된 상태일 때 접근 안되도록
const authPaths = ["/auth/login"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  console.log("모든 쿠키:", req.cookies.getAll());

  const token = req.cookies.get("ACCESS_TOKEN")?.value;
  const isAuthenticated = !!token;
  const isPublicPath = publicPaths.some(
    (path) => pathname === path || pathname.startsWith(path)
  );
  const isAuthPath = authPaths.some((path) => pathname.startsWith(path));

  if (!isAuthenticated) {
    if (!isPublicPath) {
      const loginUrl = new URL("/auth/login", req.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  } else {
    if (isAuthPath) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}

// middleware가 적용될 경로
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
