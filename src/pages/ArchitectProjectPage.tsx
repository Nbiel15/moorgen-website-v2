import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronDown, 
  Camera, 
  Send, 
  Download, 
  History, 
  CheckCircle2, 
  Clock, 
  Circle,
  MessageCircle,
  User,
  FileText,
  Layers,
  Zap
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import ArchitectLayout from "@/components/layout/ArchitectLayout";
import FloatingReportButton from "@/components/FloatingReportButton";

type PhaseStatus = "approved" | "pending-approval" | "rejected" | "pending";

interface Phase {
  id: string;
  title: string;
  status: PhaseStatus;
  date: string;
  description: string;
  isActive?: boolean;
  submittedBy?: string;
  progressPhoto?: string;
}

interface ChatMessage {
  id: string;
  sender: string;
  message: string;
  time: string;
  isEngineer?: boolean;
}

interface Document {
  id: string;
  name: string;
  type: string;
  version: string;
  lastUpdated: string;
}

const initialPhases: Phase[] = [
  {
    id: "site-analysis",
    title: "Site Analysis & Planning",
    status: "approved",
    date: "15 Oct 2024",
    description: "Initial site survey completed. Electrical load calculations verified.",
    submittedBy: "Engineer Wayan",
    progressPhoto: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80"
  },
  {
    id: "wiring",
    title: "Wiring Infrastructure",
    status: "approved",
    date: "28 Oct 2024",
    description: "CAT6 and power wiring installed to all smart panel locations.",
    submittedBy: "Engineer Wayan",
    progressPhoto: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=80"
  },
  {
    id: "installation",
    title: "Device Installation",
    status: "pending-approval",
    date: "Awaiting Review",
    description: "Installing Milan Series smart panels across 12 zones.",
    isActive: true,
    submittedBy: "Engineer Wayan",
    progressPhoto: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"
  },
  {
    id: "integration",
    title: "System Integration",
    status: "pending",
    date: "Est. 10 Dec 2024",
    description: "Connect all devices to central hub and configure scenes."
  },
  {
    id: "handover",
    title: "Final Handover",
    status: "pending",
    date: "Est. 20 Dec 2024",
    description: "Client training and documentation delivery."
  }
];

const ownerMessages: ChatMessage[] = [
  { id: "1", sender: "You", message: "Good morning, I've uploaded the revised lighting plan.", time: "09:15 AM", isEngineer: false },
  { id: "2", sender: "Owner", message: "Thank you! The gold accent lighting looks perfect.", time: "09:22 AM", isEngineer: false },
  { id: "3", sender: "You", message: "Installation team arrives at 2 PM today.", time: "10:45 AM", isEngineer: false }
];

const engineerMessages: ChatMessage[] = [
  { id: "1", sender: "Wayan", message: "Panel installation at Zone 3 complete. Moving to Zone 4.", time: "11:30 AM", isEngineer: true },
  { id: "2", sender: "You", message: "Great progress! Please capture photos of the wiring.", time: "11:35 AM", isEngineer: false },
  { id: "3", sender: "Wayan", message: "Photos uploaded. Need clarification on dimmer placement.", time: "11:42 AM", isEngineer: true }
];

const documents: Document[] = [
  { id: "1", name: "Villa Uluwatu - Master DWG Blueprint", type: "DWG", version: "v3.2", lastUpdated: "12 Nov 2024" },
  { id: "2", name: "Electrical Wiring Diagram - All Floors", type: "PDF", version: "v2.1", lastUpdated: "08 Nov 2024" },
  { id: "3", name: "Milan Series 3D Panel Models", type: "3DS", version: "v1.5", lastUpdated: "01 Nov 2024" },
  { id: "4", name: "Smart Scene Configuration Matrix", type: "XLSX", version: "v1.8", lastUpdated: "10 Nov 2024" }
];

const ArchitectProjectPage = () => {
  const { toast } = useToast();
  const [phases, setPhases] = useState<Phase[]>(initialPhases);
  const [expandedPhases, setExpandedPhases] = useState<string[]>(["installation"]);
  const [validationStates, setValidationStates] = useState<Record<string, boolean>>({});
  const [remarks, setRemarks] = useState<Record<string, string>>({});
  const [chatInput, setChatInput] = useState("");

  const togglePhase = (phaseId: string) => {
    setExpandedPhases(prev => 
      prev.includes(phaseId) 
        ? prev.filter(id => id !== phaseId)
        : [...prev, phaseId]
    );
  };

  const handlePublishUpdate = (phaseTitle: string) => {
    toast({
      title: "Update Published",
      description: "Progress report successfully synced to Owner Dashboard.",
    });
  };

  const handleCapturePhoto = () => {
    toast({
      title: "Camera Ready",
      description: "Opening camera for field photo capture...",
    });
  };

  const getStatusIcon = (status: PhaseStatus) => {
    switch (status) {
      case "approved":
        return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
      case "pending-approval":
        return <Clock className="w-5 h-5 text-champagne-gold animate-pulse" />;
      case "rejected":
        return <Circle className="w-5 h-5 text-rose-500" />;
      case "pending":
        return <Circle className="w-5 h-5 text-gray-400" />;
    }
  };

  const handleApprove = (phaseId: string) => {
    setPhases(prev => prev.map(p => 
      p.id === phaseId ? { ...p, status: "approved" as PhaseStatus, date: new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }) } : p
    ));
    toast({
      title: "Phase Approved",
      description: "The phase has been approved and the owner has been notified.",
    });
  };

  const handleReject = (phaseId: string) => {
    setPhases(prev => prev.map(p => 
      p.id === phaseId ? { ...p, status: "rejected" as PhaseStatus } : p
    ));
    toast({
      title: "Phase Rejected",
      description: "The phase has been rejected. Please provide feedback.",
      variant: "destructive"
    });
  };

  const getStatusBadge = (status: PhaseStatus) => {
    switch (status) {
      case "approved":
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-emerald-100 text-emerald-700">Approved</span>;
      case "pending-approval":
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-amber-100 text-amber-700">Pending Approval</span>;
      case "rejected":
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-rose-100 text-rose-700">Rejected</span>;
      case "pending":
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-600">Not Submitted</span>;
    }
  };

  return (
    <ArchitectLayout>
      {/* Premium Header with Gradient */}
      <header className="relative overflow-hidden border-b border-border/50 bg-gradient-to-br from-background via-background to-muted/30">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-accent/5 via-transparent to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-gradient-to-tr from-accent/10 to-transparent rounded-full blur-2xl" />
        
        <div className="relative mx-auto w-full max-w-7xl px-4 py-8 md:px-8 md:py-10">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-6"
          >
            {/* Title Section */}
            <div className="animate-fade-in">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                <p className="text-xs text-accent tracking-[0.3em] uppercase font-body">Project Management</p>
              </div>
              <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl text-foreground">
                Villa Uluwatu
              </h1>
              <p className="text-muted-foreground font-body mt-2 text-sm md:text-base">
                Real-time project tracking and collaboration hub
              </p>
            </div>
          </motion.div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl px-4 py-6 md:px-8 pb-24 lg:pb-8">

        {/* Summary Cards - 2x2 Grid */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
          {/* Project Health Card - Black */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            whileHover={{ scale: 1.02, y: -4 }}
          >
            <Card className="bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] text-white border-0 rounded-2xl sm:rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 h-full">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-body text-xs sm:text-sm text-gray-400 mb-1">Project Health</p>
                    <p className="font-heading text-2xl sm:text-3xl lg:text-4xl text-white">85%</p>
                  </div>
                  <div className="relative w-12 h-12 sm:w-16 sm:h-16">
                    <svg className="w-12 h-12 sm:w-16 sm:h-16 transform -rotate-90">
                      <circle
                        cx="50%"
                        cy="50%"
                        r="40%"
                        stroke="#333"
                        strokeWidth="4"
                        fill="none"
                      />
                      <circle
                        cx="50%"
                        cy="50%"
                        r="40%"
                        stroke="#D4AF37"
                        strokeWidth="4"
                        fill="none"
                        strokeDasharray={`${85 * 1.76} ${100 * 1.76}`}
                        strokeLinecap="round"
                        className="drop-shadow-[0_0_8px_rgba(212,175,55,0.5)]"
                      />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center font-body text-[10px] sm:text-xs text-[#D4AF37]">
                      85%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Days to Handover Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.02, y: -4 }}
          >
            <Card className="bg-white border border-gray-100 rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 h-full relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-[#D4AF37]/10 to-transparent" />
              <CardContent className="p-4 sm:p-6 relative">
                <p className="font-body text-xs sm:text-sm text-muted-foreground mb-1">Days to Handover</p>
                <p className="font-heading text-2xl sm:text-3xl lg:text-4xl text-[#1A1A1A]">45</p>
                <p className="font-body text-[10px] sm:text-xs text-muted-foreground mt-1 sm:mt-2">Target: 20 Dec 2024</p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Pending Validations Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.02, y: -4 }}
          >
            <Card className="bg-white border border-gray-100 rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 h-full relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-amber-500/10 to-transparent" />
              <CardContent className="p-4 sm:p-6 relative">
                <p className="font-body text-xs sm:text-sm text-muted-foreground mb-1">Pending Approvals</p>
                <p className="font-heading text-2xl sm:text-3xl lg:text-4xl text-[#1A1A1A]">2</p>
                <p className="font-body text-[10px] sm:text-xs text-[#D4AF37] mt-1 sm:mt-2 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-pulse" />
                  Action Required
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Next Inspection Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.02, y: -4 }}
          >
            <Card className="bg-white border border-gray-100 rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 h-full relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-emerald-500/10 to-transparent" />
              <CardContent className="p-4 sm:p-6 relative">
                <p className="font-body text-xs sm:text-sm text-muted-foreground mb-1">Next Inspection</p>
                <p className="font-heading text-2xl sm:text-3xl lg:text-4xl text-[#1A1A1A]">Tomorrow</p>
                <p className="font-body text-[10px] sm:text-xs text-muted-foreground mt-1 sm:mt-2">09:00 AM - Zone 4</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 gap-4 sm:gap-6">
          {/* Approval Project */}
          <div className="w-full">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="bg-white/80 backdrop-blur-sm border border-gray-100 rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-[#1A1A1A] to-[#2A2A2A] p-4 sm:p-6">
                  <h2 className="font-heading text-lg sm:text-xl text-white flex items-center gap-3">
                    <div className="p-2 bg-[#D4AF37]/20 rounded-xl">
                      <Layers className="w-4 h-4 sm:w-5 sm:h-5 text-[#D4AF37]" />
                    </div>
                    Approval Project
                  </h2>
                </div>
                <CardContent className="p-3 sm:p-6">
                  <ScrollArea className="h-[400px] sm:h-[450px] pr-2 sm:pr-4">
                    <div className="space-y-3 sm:space-y-4">
                    {phases.map((phase, index) => (
                      <motion.div
                        key={phase.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * index }}
                        whileHover={{ scale: 1.01 }}
                        className={`relative border rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300 ${
                          phase.isActive 
                            ? "border-[#D4AF37] border-2 shadow-lg shadow-[#D4AF37]/10 bg-gradient-to-r from-[#D4AF37]/5 to-transparent" 
                            : "border-gray-100 hover:border-gray-200 hover:shadow-md"
                        }`}
                      >
                        {/* Timeline connector */}
                        {index < phases.length - 1 && (
                          <div className="absolute left-6 sm:left-8 top-full w-0.5 h-3 sm:h-4 bg-gray-200 z-10" />
                        )}

                        {/* Phase Header */}
                        <button
                          onClick={() => togglePhase(phase.id)}
                          className="w-full flex items-center justify-between p-3 sm:p-4 hover:bg-gray-50/50 transition-colors"
                        >
                          <div className="flex items-center gap-2 sm:gap-4">
                            <div className={`p-1.5 sm:p-2 rounded-lg sm:rounded-xl ${
                              phase.status === 'approved' ? 'bg-emerald-100' : 
                              phase.status === 'pending-approval' ? 'bg-amber-100' :
                              phase.status === 'rejected' ? 'bg-rose-100' : 'bg-gray-100'
                            }`}>
                              {getStatusIcon(phase.status)}
                            </div>
                            <div className="text-left">
                              <div className="flex items-center gap-2 flex-wrap">
                                <h3 className="font-heading text-sm sm:text-base text-[#1A1A1A]">
                                  {phase.title}
                                </h3>
                                <span className="hidden sm:inline-flex">{getStatusBadge(phase.status)}</span>
                              </div>
                              <p className="font-body text-xs sm:text-sm text-muted-foreground">
                                {phase.submittedBy ? `Submitted by ${phase.submittedBy}` : phase.date}
                              </p>
                              <span className="sm:hidden mt-1 inline-flex">{getStatusBadge(phase.status)}</span>
                            </div>
                          </div>
                          <ChevronDown 
                            className={`w-4 h-4 sm:w-5 sm:h-5 text-gray-400 transition-transform duration-300 ${
                              expandedPhases.includes(phase.id) ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        {/* Expanded Content */}
                        <AnimatePresence>
                          {expandedPhases.includes(phase.id) && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="px-3 sm:px-4 pb-3 sm:pb-4 space-y-3 sm:space-y-4">
                                <p className="font-body text-xs sm:text-sm text-muted-foreground">
                                  {phase.description}
                                </p>

                                {/* On-Site Tools */}
                                <div className="bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-xl sm:rounded-2xl p-3 sm:p-4 space-y-3 sm:space-y-4">
                                  {/* Progress Photo */}
                                  {phase.progressPhoto ? (
                                    <div className="space-y-2">
                                      <label className="font-body text-xs sm:text-sm text-muted-foreground block flex items-center gap-2">
                                        <Camera className="w-3 h-3 sm:w-4 sm:h-4 text-[#D4AF37]" />
                                        Progress Photo
                                      </label>
                                      <motion.div 
                                        className="relative rounded-xl overflow-hidden shadow-lg"
                                        whileHover={{ scale: 1.02 }}
                                        transition={{ duration: 0.2 }}
                                      >
                                        <img 
                                          src={phase.progressPhoto} 
                                          alt={`${phase.title} progress`}
                                          className="w-full h-40 sm:h-48 object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                                        <div className="absolute bottom-0 left-0 right-0 p-3">
                                          <p className="text-white text-xs font-body">
                                            Submitted by {phase.submittedBy || "Engineer"}
                                          </p>
                                        </div>
                                      </motion.div>
                                    </div>
                                  ) : (
                                    <div className="flex items-center justify-center h-24 sm:h-32 bg-gray-100 rounded-xl border-2 border-dashed border-gray-300">
                                      <p className="text-xs sm:text-sm text-gray-400 font-body">No progress photo submitted</p>
                                    </div>
                                  )}

                                  {/* Design Remark Textarea */}
                                  <div>
                                    <label className="font-body text-xs sm:text-sm text-muted-foreground mb-2 block">
                                      Architect's Design Remark
                                    </label>
                                    <Textarea
                                      placeholder="Add your professional notes here..."
                                      value={remarks[phase.id] || ""}
                                      onChange={(e) => setRemarks(prev => ({ ...prev, [phase.id]: e.target.value }))}
                                      className="font-body text-xs sm:text-sm rounded-xl border-gray-200 focus:border-[#D4AF37] focus:ring-[#D4AF37]/20 resize-none bg-white"
                                      rows={3}
                                    />
                                  </div>

                                  {/* Validation Toggle */}
                                  <div className="flex items-center justify-between p-2 sm:p-3 bg-white rounded-xl border border-gray-100">
                                    <span className="font-body text-xs sm:text-sm text-[#1A1A1A]">
                                      Professional Validation
                                    </span>
                                    <Switch
                                      checked={validationStates[phase.id] || false}
                                      onCheckedChange={(checked) => 
                                        setValidationStates(prev => ({ ...prev, [phase.id]: checked }))
                                      }
                                      className="data-[state=checked]:bg-[#D4AF37]"
                                    />
                                  </div>

                                  {/* Approval Buttons */}
                                  {phase.status === "pending-approval" && (
                                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2">
                                      <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                        <Button
                                          onClick={() => handleApprove(phase.id)}
                                          className="w-full font-body bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-xl shadow-lg shadow-emerald-500/25 text-xs sm:text-sm"
                                        >
                                          <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                                          Approve
                                        </Button>
                                      </motion.div>
                                      <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                        <Button
                                          onClick={() => handleReject(phase.id)}
                                          variant="outline"
                                          className="w-full font-body border-rose-300 text-rose-600 hover:bg-rose-50 rounded-xl text-xs sm:text-sm"
                                        >
                                          <Circle className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                                          Reject
                                        </Button>
                                      </motion.div>
                                    </div>
                                  )}

                                  {/* Publish Button - only for approved phases */}
                                  {phase.status === "approved" && (
                                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                      <Button
                                        onClick={() => handlePublishUpdate(phase.title)}
                                        className="w-full font-body bg-gradient-to-r from-[#D4AF37] to-[#C4A030] hover:from-[#C4A030] hover:to-[#B8942A] text-[#1A1A1A] rounded-xl shadow-lg shadow-[#D4AF37]/25 text-xs sm:text-sm"
                                      >
                                        <Zap className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                                        Publish to Owner
                                      </Button>
                                    </motion.div>
                                  )}
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </motion.div>
          </div>

        </div>

        {/* Footer - Technical Vault */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-8"
        >
          <Card className="bg-white border border-gray-100 rounded-3xl shadow-lg">
            <CardContent className="p-6">
              <h2 className="font-heading text-xl text-charcoal mb-6 flex items-center gap-2">
                <FileText className="w-5 h-5 text-champagne-gold" />
                Technical Documents & Assets
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-left font-heading text-sm text-moorgen-muted pb-3">Document Name</th>
                      <th className="text-left font-heading text-sm text-moorgen-muted pb-3">Type</th>
                      <th className="text-left font-heading text-sm text-moorgen-muted pb-3">Version</th>
                      <th className="text-left font-heading text-sm text-moorgen-muted pb-3">Last Updated</th>
                      <th className="text-right font-heading text-sm text-moorgen-muted pb-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {documents.map((doc) => (
                      <tr key={doc.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                        <td className="py-4 font-body text-sm text-charcoal">{doc.name}</td>
                        <td className="py-4">
                          <span className="font-body text-xs px-2 py-1 bg-gray-100 rounded-lg text-moorgen-muted">
                            {doc.type}
                          </span>
                        </td>
                        <td className="py-4 font-body text-sm text-champagne-gold">{doc.version}</td>
                        <td className="py-4 font-body text-sm text-moorgen-muted">{doc.lastUpdated}</td>
                        <td className="py-4">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="font-body text-xs rounded-lg border-gray-200 hover:border-champagne-gold hover:text-champagne-gold"
                            >
                              <Download className="w-3 h-3 mr-1" />
                              Download
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="font-body text-xs text-moorgen-muted hover:text-champagne-gold"
                            >
                              <History className="w-3 h-3 mr-1" />
                              History
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
      <FloatingReportButton />
    </ArchitectLayout>
  );
};

export default ArchitectProjectPage;
