import DashboardHeader from "@/components/modules/dashboard/DashboardHeader";
import DashboardSidebar from "@/components/modules/dashboard/DashboardSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { getSession } from "@/services/user/user.services";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const sessionPromise = getSession();

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <DashboardHeader sessionPromise={sessionPromise} />
          {children}
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
