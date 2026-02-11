import { NextRequest, NextResponse } from "next/server";
import { userServices } from "./services/user/user.services";
import { Roles } from "./constants/roles";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  let isAdmin = false;
  let isSeller = false;
  let isCustomer = false;
  let isAuthenticated = false;

  const { data } = await userServices.getSession();
  if (data) {
    isAuthenticated = true;
    if (data.user.role === Roles.ADMIN) {
      isAdmin = true;
    }

    if (data.user.role === Roles.SELLER) {
      isSeller = true;
    }

    if (data.user.role === Roles.CUSTOMER) {
      isCustomer = true;
    }
  }

  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const role = data.user.role;

  if (pathname === "/dashboard") {
    if (role === Roles.CUSTOMER)
      return NextResponse.redirect(new URL("/dashboard/customer", request.url));
    if (role === Roles.SELLER)
      return NextResponse.redirect(new URL("/dashboard/seller", request.url));
    if (role === Roles.ADMIN)
      return NextResponse.redirect(new URL("/dashboard/admin", request.url));
  }

  if (isAdmin && !pathname.startsWith("/dashboard/admin")) {
    return NextResponse.redirect(new URL("/dashboard/admin", request.url));
  }

  if (isSeller && !pathname.startsWith("/dashboard/seller")) {
    return NextResponse.redirect(new URL("/dashboard/seller", request.url));
  }

  if (isCustomer && !pathname.startsWith("/dashboard/customer")) {
    return NextResponse.redirect(new URL("/dashboard/customer", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/checkout", "/dashboard", "/dashboard/:path*"],
};
