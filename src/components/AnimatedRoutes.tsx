import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Index from "@/pages/Index";
import LifestyleDashboard from "@/pages/LifestyleDashboard";
import TechnicalWorkspace from "@/pages/TechnicalWorkspace";
import Controls from "@/pages/Controls";
import AdvancedDeviceControl from "@/pages/AdvancedDeviceControl";
import ProjectJourney from "@/pages/ProjectJourney";
import EngineerChat from "@/pages/EngineerChat";
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
        <Route path="/technical-workspace" element={<PageTransition><TechnicalWorkspace /></PageTransition>} />
        <Route path="/controls" element={<PageTransition><Controls /></PageTransition>} />
        <Route path="/advanced-control" element={<PageTransition><AdvancedDeviceControl /></PageTransition>} />
        <Route path="/progress" element={<PageTransition><ProjectJourney /></PageTransition>} />
        <Route path="/engineer-chat" element={<PageTransition><EngineerChat /></PageTransition>} />
        <Route path="/support" element={<PageTransition><Support /></PageTransition>} />
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
