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


  return NextResponse.next();
}

export const config = {
  matcher: "/checkout",
};
