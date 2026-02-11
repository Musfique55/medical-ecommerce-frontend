import DashboardHeader from "@/components/modules/dashboard/DashboardHeader";
import DashboardSidebar from "@/components/modules/dashboard/DashboardSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <SidebarProvider>
        <SidebarTrigger />
        <div className="flex">
          <DashboardSidebar />
          <div>
            <DashboardHeader />
            {children}
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default DashboardLayout;
