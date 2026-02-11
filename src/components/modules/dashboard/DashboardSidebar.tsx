"use client";

import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Roles } from "@/constants/roles";
import { ShoppingBag } from "lucide-react";

const navLinks = [
  {
    title: "",
    role: Roles.CUSTOMER,
    routes: [
      {
        title: "Orders",
        path: "/dashboard/orders",
      },
      {
        title: "Wishlist",
        path: "/dashboard/wishlist",
      },
    ],
  },
  {
    title: "Account Management",
    role: Roles.CUSTOMER,
    routes: [
      {
        title: "Manage Profile",
        path: "/dashboard/profile",
      },
      {
        title: "Addresses",
        path: "/dashboard/address",
      },
    ],
  },
];

export default function DashboardSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="p-6 flex items-center gap-2">
          <div className="w-10 h-10 bg-teal-500 rounded-lg flex items-center justify-center">
            <ShoppingBag className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-gray-900">LUXE.</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {navLinks.map((group, index) => (
          <SidebarGroup key={index}>
            <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">{group.title}</p>
            <SidebarMenu>
              {group.routes.map((route) => (
                <SidebarMenuItem key={route.path}>
                  <SidebarMenuButton asChild className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-gray-600 hover:bg-gray-50 transition-all">
                    <Link href={route.path}>{route.title}</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter />
    </Sidebar>
  );
}
