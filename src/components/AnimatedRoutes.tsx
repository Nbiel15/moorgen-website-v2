import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Index from "@/pages/Index";
import LifestyleDashboard from "@/pages/LifestyleDashboard";
// import Controls from "@/pages/Controls"; // HIDDEN: Controls page temporarily disabled
import AdvancedDeviceControl from "@/pages/AdvancedDeviceControl";
import AdvancedLightingControl from "@/pages/AdvancedLightingControl";
import ProjectJourney from "@/pages/ProjectJourney";
import EngineerChat from "@/pages/EngineerChat";
import ArchitectDashboard from "@/pages/ArchitectDashboard";
import ArchitectProjectPage from "@/pages/ArchitectProjectPage";
import ArchitectReportingPage from "@/pages/ArchitectReportingPage";
import ArchitectMessages from "@/pages/ArchitectMessages";
import ArchitectResources from "@/pages/ArchitectResources";
import Support from "@/pages/Support";
import NotFound from "@/pages/NotFound";
import PageTransition from "./PageTransition";

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Index /></PageTransition>} />
        <Route path="/lifestyle-dashboard" element={<PageTransition><LifestyleDashboard /></PageTransition>} />
        {/* HIDDEN: Controls route temporarily disabled - redirect to home */}
        <Route path="/controls" element={<Navigate to="/lifestyle-dashboard" replace />} />
        <Route path="/advanced-control" element={<PageTransition><AdvancedDeviceControl /></PageTransition>} />
        <Route path="/lighting-control" element={<PageTransition><AdvancedLightingControl /></PageTransition>} />
        <Route path="/progress" element={<PageTransition><ProjectJourney /></PageTransition>} />
        <Route path="/engineer-chat" element={<PageTransition><EngineerChat /></PageTransition>} />
        <Route path="/architect-dashboard" element={<PageTransition><ArchitectDashboard /></PageTransition>} />
        <Route path="/architect-project" element={<PageTransition><ArchitectProjectPage /></PageTransition>} />
        <Route path="/architect-reporting" element={<PageTransition><ArchitectReportingPage /></PageTransition>} />
        <Route path="/architect-messages" element={<PageTransition><ArchitectMessages /></PageTransition>} />
        <Route path="/architect-resources" element={<PageTransition><ArchitectResources /></PageTransition>} />
        <Route path="/support" element={<PageTransition><Support /></PageTransition>} />
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
