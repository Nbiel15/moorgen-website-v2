import { motion } from "framer-motion";
import DashboardLayout from "@/components/layout/DashboardLayout";
import WelcomeBanner from "@/components/dashboard/WelcomeBanner";
import ArchitectProfile from "@/components/dashboard/ArchitectProfile";
import QuickStatusPanel from "@/components/dashboard/QuickStatusPanel";
import OverallProgressSummary from "@/components/dashboard/OverallProgressSummary";
import MilestoneTracker from "@/components/dashboard/MilestoneTracker";
import RightPanel from "@/components/dashboard/RightPanel";

const LifestyleDashboard = () => {
  return (
    <DashboardLayout showRightPanel rightPanel={<RightPanel />}>
      <div className="p-3 sm:p-4 md:p-6 lg:p-8">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="max-w-4xl mx-auto space-y-4 sm:space-y-5"
        >
          {/* ROW 1: Welcome Banner */}
          <WelcomeBanner />

          {/* ROW 2: Two-column layout - Architect (dark) + Status Panel (light) */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* Left: Architect Profile - narrower */}
            <div className="md:col-span-2">
              <ArchitectProfile />
            </div>
            
            {/* Right: Quick Status Panel - wider */}
            <div className="md:col-span-3">
              <QuickStatusPanel />
            </div>
          </div>

          {/* ROW 3: Overall Progress Summary */}
          <OverallProgressSummary />

          {/* ROW 4: Milestone Tracker */}
          <MilestoneTracker />
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default LifestyleDashboard;
