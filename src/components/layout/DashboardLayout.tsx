import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import MobileNav from "@/components/dashboard/MobileNav";

interface DashboardLayoutProps {
  children: React.ReactNode;
  showRightPanel?: boolean;
  rightPanel?: React.ReactNode;
}

const DashboardLayout = ({ children, showRightPanel = false, rightPanel }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-[#FAFAFA] flex w-full">
      {/* Sidebar - Desktop */}
      <DashboardSidebar />

      {/* Main Content */}
      <main className="flex-1 pb-24 lg:pb-0 overflow-y-auto">
        {children}
      </main>

      {/* Optional Right Panel */}
      {showRightPanel && rightPanel}

      {/* Mobile Navigation */}
      <MobileNav />
    </div>
  );
};

export default DashboardLayout;