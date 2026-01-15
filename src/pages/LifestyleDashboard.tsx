import DashboardLayout from "@/components/layout/DashboardLayout";
import WelcomeBanner from "@/components/dashboard/WelcomeBanner";
import SmartPanelControls from "@/components/dashboard/SmartPanelControls";
import MilestoneTracker from "@/components/dashboard/MilestoneTracker";
import RightPanel from "@/components/dashboard/RightPanel";
const LifestyleDashboard = () => {
  return <DashboardLayout showRightPanel rightPanel={<RightPanel />}>
      <div className="p-4 md:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* BAR 1: Welcome Area */}
          <WelcomeBanner />

          {/* BAR 2: Smart Panel Controls */}
          <SmartPanelControls />

          {/* BAR 3: Project Milestone Tracker */}
          <MilestoneTracker />

          {/* Mobile Profile Card */}
          
        </div>
      </div>
    </DashboardLayout>;
};
export default LifestyleDashboard;