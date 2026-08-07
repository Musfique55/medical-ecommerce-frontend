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
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";
import { Roles } from "@/constants/roles";
import { ShoppingBag, LogOut, ChevronDown, ChevronRight } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { use, useState } from "react";
import { User } from "@/types";
import { logout } from "@/services/auth/auth.services";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const navLinks = [
  {
    title: "",
    role: Roles.CUSTOMER,
    routes: [
      {
        title: "Dashboard",
        path: "/customer/dashboard",
      },
      {
        title: "Orders",
        path: "/customer/orders",
      },
    ],
  },
  {
    title: "",
    role: Roles.ADMIN,
    routes: [
      {
        title: "Dashboard",
        path: "/admin/dashboard",
      },
      {
        title: "Users",
        path: "/admin/users",
      },
    ],
  },
  {
    title: "",
    role: Roles.SELLER,
    routes: [
      {
        title: "Dashboard",
        path: "/seller/dashboard",
      },
      {
        title: "Products",
        path: "/seller/products",
      },
      {
        title: "Orders",
        path: "/seller/orders",
        routes: [
          {
            title: "Active Orders",
            path: "/seller/orders/active",
            isActive: true,
          },
          {
            title: "All Orders",
            path: "/seller/orders",
            isActive: false,
          },
        ],
      },
    ],
  },
  {
    title: "Account Management",
    role: [Roles.CUSTOMER, Roles.ADMIN, Roles.SELLER],
    routes: [
      {
        title: "Profile",
        path: "/profile",
      },
    ],
  },
];

export default function DashboardSidebar({
  sessionPromise,
}: {
  sessionPromise: Promise<{ data: User | null }>;
}) {
  const pathname = usePathname();
  const session = use(sessionPromise);
  const role = session?.data?.role as string;
  const router = useRouter();
  const queryClient = useQueryClient();

  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  const isMenuOpen = (path: string) => {
    if (openMenus[path] !== undefined) return openMenus[path];
    return pathname?.includes(path);
  };

  const toggleMenu = (path: string) => {
    setOpenMenus((prev) => ({ ...prev, [path]: !isMenuOpen(path) }));
  };

  const handleLogOut = async () => {
    const res = await logout();
    if (res?.success) {
      toast.success(res?.message);
      queryClient.clear();
      router.push("/auth/login");
    }
  };

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
        {navLinks
          .filter((group) =>
            Array.isArray(group.role)
              ? group.role.includes(role)
              : group.role === role,
          )
          .map((group, index) => (
            <SidebarGroup key={index}>
              <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                {group.title}
              </p>
              <SidebarMenu>
                {group.routes.map((route: any) => {
                  const hasSubRoutes = route.routes && route.routes.length > 0;
                  const isOpen = isMenuOpen(route.path);

                  return (
                    <SidebarMenuItem
                      className={`${pathname === route.path && !hasSubRoutes ? "bg-teal-500/20 rounded-md" : ""}`}
                      key={route.path}
                    >
                      {hasSubRoutes ? (
                        <SidebarMenuButton
                          onClick={() => toggleMenu(route.path)}
                          className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg text-left transition-all font-semibold cursor-pointer ${
                            pathname?.includes(route.path)
                              ? "text-teal-600"
                              : "text-gray-600 hover:bg-gray-50"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            {route.title}
                          </div>
                          {isOpen ? (
                            <ChevronDown className="w-4 h-4" />
                          ) : (
                            <ChevronRight className="w-4 h-4" />
                          )}
                        </SidebarMenuButton>
                      ) : (
                        <SidebarMenuButton
                          asChild
                          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all font-semibold ${
                            pathname === route.path
                              ? "text-teal-600"
                              : "text-gray-600 hover:bg-gray-50"
                          }`}
                        >
                          <Link href={route.path}>{route.title}</Link>
                        </SidebarMenuButton>
                      )}

                      {/* Render Nested Routes */}
                      {hasSubRoutes && isOpen && (
                        <SidebarMenuSub>
                          {route.routes.map((subRoute: any) => (
                            <SidebarMenuSubItem key={subRoute.path}>
                              <SidebarMenuSubButton
                                asChild
                                isActive={pathname === subRoute.path}
                                className={`font-medium ${pathname === subRoute.path ? "text-teal-600 bg-teal-500/10" : "text-gray-500 hover:text-gray-900"}`}
                              >
                                <Link href={subRoute.path}>
                                  {subRoute.title}
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      )}
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroup>
          ))}
      </SidebarContent>

      <SidebarFooter className="border-t border-gray-100 p-4">
        {session?.data && (
          <div className="flex items-center gap-3 mb-3 px-2">
            <div className="w-9 h-9 rounded-full bg-teal-500 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
              {session.data.image ? (
                <img
                  src={session.data.image}
                  alt={session.data.name}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                session.data.name.charAt(0).toUpperCase()
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-800 truncate">
                {session.data.name}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {session.data.email}
              </p>
            </div>
          </div>
        )}
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={handleLogOut}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all font-semibold text-red-600 hover:text-red-700 hover:bg-red-50 cursor-pointer"
            >
              <LogOut className="w-5 h-5 text-red-500" />
              <span>Log Out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
