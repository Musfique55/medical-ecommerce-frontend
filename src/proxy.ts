import { NextRequest, NextResponse } from "next/server";
import { jwtUtils } from "./utils/jwtUtils";
import {
  getDefaultRoute,
  isAuthRoute,
  Roles,
  routesOwner,
} from "./utils/authUtils";
import { Roles as userRoles } from "./constants/roles";
import { isExpiringSoon } from "./utils/tokenUtils";
import { newRefreshToken } from "./services/auth/auth.services";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;
  let user = null;
  let isValidToken = false;
  const isAuth = isAuthRoute(pathname);

  if (accessToken) {
    isValidToken = jwtUtils.verifyToken(accessToken);
    user = jwtUtils.decodeToken(accessToken);
  } else {
    if (!isValidToken && refreshToken) {
      user = jwtUtils.decodeToken(refreshToken);
    }
  }

  // proactively refresh token
  if (
    (!isValidToken && refreshToken) ||
    (accessToken && (await isExpiringSoon(accessToken)))
  ) {
    try {
      const refreshed = await newRefreshToken();
      if(refreshed.success){
        const response = NextResponse.next();
        response.headers.set("x-token-refreshed","1");
        response.cookies.set({
          name : "accessToken",
          value : refreshed.data.accessToken,
          sameSite : "none",
          httpOnly : true,
          path : "/",
          secure : true
        })
        response.cookies.set({
          name : "refreshToken",
          value : refreshed.data.refreshToken,
          sameSite : "none",
          httpOnly : true,
          path : "/",
          secure : true
        })
        response.cookies.set({
          name : "better-auth.session_token",
          value : refreshed.data.token,
          sameSite : "none",
          httpOnly : true,
          path : "/",
          secure : true
        })
      }
    } catch (error) {
      console.log("error on refreshing token",error);
    }
  }
  if ((isValidToken || refreshToken) && isAuth) {
    return NextResponse.redirect(
      new URL(getDefaultRoute(user!.role as Roles), request.url),
    );
  }

  if (routesOwner(pathname) !== null && !isValidToken && !refreshToken) {
    const url = new URL("/auth/login", request.url);
    url.searchParams.append("redirect", pathname);
    return NextResponse.redirect(url);
  }

  if (user) {
    if (user.emailVerified === false) {
      return NextResponse.redirect(new URL("/auth/verify-pin", request.url));
    }

    if (routesOwner(pathname) === "ADMIN" && user.role !== userRoles.ADMIN) {
      return NextResponse.redirect(
        new URL(getDefaultRoute(user.role as Roles), request.url),
      );
    }

    if (
      routesOwner(pathname) === "CUSTOMER" &&
      user.role !== userRoles.CUSTOMER
    ) {
      return NextResponse.redirect(
        new URL(getDefaultRoute(user.role as Roles), request.url),
      );
    }

    if (routesOwner(pathname) === "SELLER" && user.role !== userRoles.SELLER) {
      return NextResponse.redirect(
        new URL(getDefaultRoute(user.role as Roles), request.url),
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (unless you want to proxy API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
