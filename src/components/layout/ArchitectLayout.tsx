import ArchitectSidebar from "@/components/dashboard/ArchitectSidebar";
import ArchitectMobileNav from "@/components/dashboard/ArchitectMobileNav";

interface ArchitectLayoutProps {
  children: React.ReactNode;
}

const ArchitectLayout = ({ children }: ArchitectLayoutProps) => {
  return (
    <div className="min-h-screen bg-[#FAFAFA] flex w-full">
      {/* Architect Sidebar - Desktop */}
      <ArchitectSidebar />

      {/* Main Content */}
      <main className="flex-1 pb-24 lg:pb-0 overflow-y-auto">
        {children}
      </main>

      {/* Mobile Navigation */}
      <ArchitectMobileNav />
    </div>
  );
};

export default ArchitectLayout;
