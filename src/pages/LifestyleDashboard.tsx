import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import WelcomeBanner from "@/components/dashboard/WelcomeBanner";
import QuickScenes from "@/components/dashboard/QuickScenes";
import ProgressCircle from "@/components/dashboard/ProgressCircle";
import FieldUpdates from "@/components/dashboard/FieldUpdates";
import RightPanel from "@/components/dashboard/RightPanel";
import MobileNav from "@/components/dashboard/MobileNav";

const LifestyleDashboard = () => {
  return (
    <div className="min-h-screen bg-[#FAFAFA] flex">
      {/* Sidebar - Desktop */}
      <DashboardSidebar />

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6 lg:p-8 pb-24 lg:pb-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Welcome Banner */}
          <WelcomeBanner />

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Quick Scenes */}
            <QuickScenes />

            {/* Progress Circle */}
            <ProgressCircle />
          </div>

          {/* Field Updates - Full Width */}
          <FieldUpdates />

          {/* Mobile Profile Card */}
          <div className="xl:hidden bg-gradient-to-br from-charcoal to-charcoal/90 rounded-3xl p-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-champagne-gold/30 to-champagne-gold/10 border-2 border-champagne-gold/50 flex items-center justify-center">
                <span className="font-serif text-xl text-white">A</span>
              </div>
              <div>
                <h3 className="font-serif text-lg text-white">Adrian Wijaya</h3>
                <p className="text-champagne-gold text-xs tracking-widest uppercase">
                  Project Owner
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Right Panel - Desktop */}
      <RightPanel />

      {/* Mobile Navigation */}
      <MobileNav />
    </div>
  );
};

export default LifestyleDashboard;
