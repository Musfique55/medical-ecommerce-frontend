import DashboardHeader from "@/components/modules/dashboard/DashboardHeader";
import DashboardSidebar from "@/components/modules/dashboard/DashboardSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { getSession } from "@/services/user/user.services";
import { Suspense } from "react";

export const dynamic = "force-dynamic";
const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const sessionPromise = getSession();

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Suspense fallback={<div>loading...</div>}>
          <DashboardSidebar sessionPromise={sessionPromise} />
        </Suspense>
        <div className="flex-1 flex flex-col min-w-0">
          <Suspense fallback={<div>loading...</div>}>
            <DashboardHeader sessionPromise={sessionPromise} />
          </Suspense>
          {children}
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
