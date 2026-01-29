import { motion } from "framer-motion";
import DashboardLayout from "@/components/layout/DashboardLayout";
import WelcomeBanner from "@/components/dashboard/WelcomeBanner";
import ArchitectProfile from "@/components/dashboard/ArchitectProfile";
import OnSiteWorker from "@/components/dashboard/OnSiteWorker";
import TodayProgress from "@/components/dashboard/TodayProgress";
import OverallProgressSummary from "@/components/dashboard/OverallProgressSummary";
// import SmartPanelControls from "@/components/dashboard/SmartPanelControls"; // HIDDEN: temporarily disabled
import MilestoneTracker from "@/components/dashboard/MilestoneTracker";
import RightPanel from "@/components/dashboard/RightPanel";
// import ChatWithEngineerButton from "@/components/ChatWithEngineerButton"; // HIDDEN: moved to navbar

const LifestyleDashboard = () => {
  return (
    <DashboardLayout showRightPanel rightPanel={<RightPanel />}>
      <div className="p-3 sm:p-4 md:p-6 lg:p-8">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="max-w-5xl mx-auto space-y-4 sm:space-y-5 md:space-y-6"
        >
          {/* ROW 1: Welcome Banner - Full Width */}
          <WelcomeBanner />

          {/* ROW 2: Compact Info Cards - 3 columns on desktop, stacked on mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <ArchitectProfile />
            <OnSiteWorker />
            <TodayProgress />
          </div>

          {/* ROW 3: Overall Progress Summary (All Progressbar) - Full Width */}
          <OverallProgressSummary />

          {/* HIDDEN: Smart Panel Controls temporarily disabled
          <SmartPanelControls />
          */}

          {/* ROW 4: Project Milestone Tracker (Progress) - Full Width */}
          <MilestoneTracker />
        </motion.div>
      </div>

      {/* HIDDEN: Floating Chat Button - moved to navbar
      <ChatWithEngineerButton />
      */}
    </DashboardLayout>
  );
};

export default LifestyleDashboard;
