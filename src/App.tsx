import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import LifestyleDashboard from "./pages/LifestyleDashboard";
import TechnicalWorkspace from "./pages/TechnicalWorkspace";
import Controls from "./pages/Controls";
import AdvancedDeviceControl from "./pages/AdvancedDeviceControl";
import ProjectJourney from "./pages/ProjectJourney";
import Documents from "./pages/Documents";
import Support from "./pages/Support";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/lifestyle-dashboard" element={<LifestyleDashboard />} />
          <Route path="/technical-workspace" element={<TechnicalWorkspace />} />
          <Route path="/controls" element={<Controls />} />
          <Route path="/advanced-control" element={<AdvancedDeviceControl />} />
          <Route path="/progress" element={<ProjectJourney />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/support" element={<Support />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
