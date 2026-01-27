import { motion } from "framer-motion";
import DashboardLayout from "@/components/layout/DashboardLayout";
import WelcomeBanner from "@/components/dashboard/WelcomeBanner";
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
          className="max-w-4xl mx-auto space-y-4 sm:space-y-5 md:space-y-6"
        >
          {/* BAR 1: Welcome Area */}
          <WelcomeBanner />

          {/* HIDDEN: Smart Panel Controls temporarily disabled
          <SmartPanelControls />
          */}

          {/* BAR 3: Project Milestone Tracker */}
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
