import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { 
  Briefcase, 
  ClipboardCheck, 
  FileImage, 
  Calendar,
  ChevronDown,
  Check,
  MessageCircle,
  Download,
  User,
  Wrench,
  CheckCircle2,
  Clock,
  Circle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

// Types
type PhaseStatus = "completed" | "in-progress" | "pending";
type ChatTab = "owner" | "engineer";

interface Phase {
  id: string;
  title: string;
  status: PhaseStatus;
  date: string;
  description: string;
  validated: boolean;
}

interface ChatMessage {
  id: string;
  text: string;
  sender: "architect" | "other";
  timestamp: string;
}

// Data
const topCards = [
  {
    title: "Active Projects",
    value: "3",
    subtitle: "Currently in progress",
    icon: Briefcase,
    gradient: "from-[#0a0a0a] via-[#1a1a1a] to-[#0a0a0a]",
  },
  {
    title: "Pending Validations",
    value: "2",
    subtitle: "Phases need approval",
    icon: ClipboardCheck,
    gradient: "from-[#1a1a1a] via-[#252525] to-[#1a1a1a]",
  },
  {
    title: "New Shared Files",
    value: "5",
    subtitle: "Diagrams received",
    icon: FileImage,
    gradient: "from-[#1a1a1a] via-[#252525] to-[#1a1a1a]",
  },
  {
    title: "Next Field Sync",
    value: "Oct 20",
    subtitle: "Scheduled meeting",
    icon: Calendar,
    gradient: "from-[#1a1a1a] via-[#252525] to-[#1a1a1a]",
  },
];

const initialPhases: Phase[] = [
  {
    id: "1",
    title: "Site Analysis & Initial Assessment",
    status: "completed",
    date: "Sep 15, 2024",
    description: "Comprehensive site survey including electrical infrastructure assessment, wall compositions, and smart integration points mapping.",
    validated: true,
  },
  {
    id: "2",
    title: "Electrical Pre-Wiring",
    status: "completed",
    date: "Sep 28, 2024",
    description: "Installation of dedicated smart home circuits, CAT6 cabling, and preparation for panel mounting locations.",
    validated: true,
  },
  {
    id: "3",
    title: "Panel Installation - Living Areas",
    status: "in-progress",
    date: "Oct 12, 2024",
    description: "Milan Series touch panels installation in main living room, dining area, and master suite entrance.",
    validated: false,
  },
  {
    id: "4",
    title: "Lighting Integration",
    status: "pending",
    date: "Oct 25, 2024",
    description: "Connection of all lighting circuits to smart controllers and scene programming.",
    validated: false,
  },
  {
    id: "5",
    title: "Final Commissioning",
    status: "pending",
    date: "Nov 5, 2024",
    description: "System-wide testing, owner training, and handover documentation.",
    validated: false,
  },
];

const ownerMessages: ChatMessage[] = [
  { id: "1", text: "Good morning! When can we expect the living room panels to be ready?", sender: "other", timestamp: "9:30 AM" },
  { id: "2", text: "The installation is progressing well. We anticipate completion by end of week.", sender: "architect", timestamp: "9:45 AM" },
  { id: "3", text: "Perfect. Will the champagne gold finish match the samples?", sender: "other", timestamp: "10:00 AM" },
];

const engineerMessages: ChatMessage[] = [
  { id: "1", text: "Architect, the CAT6 runs are complete. Ready for panel mounting.", sender: "other", timestamp: "8:15 AM" },
  { id: "2", text: "Excellent work. Please ensure 50mm clearance from the frame edges.", sender: "architect", timestamp: "8:30 AM" },
  { id: "3", text: "Confirmed. Sending photos of the mounting templates now.", sender: "other", timestamp: "8:45 AM" },
];

const resources = [
  { name: "Milan Series CAD Files", type: "ZIP", size: "24.5 MB" },
  { name: "Moorgen Wiring Templates", type: "PDF", size: "8.2 MB" },
  { name: "Installation Guidelines", type: "PDF", size: "3.1 MB" },
  { name: "Scene Programming Reference", type: "PDF", size: "1.8 MB" },
];

const ArchitectDashboard = () => {
  const [phases, setPhases] = useState<Phase[]>(initialPhases);
  const [expandedPhases, setExpandedPhases] = useState<string[]>(["3"]);
  const [chatTab, setChatTab] = useState<ChatTab>("owner");
  const [chatInput, setChatInput] = useState("");

  const togglePhase = (phaseId: string) => {
    setExpandedPhases(prev =>
      prev.includes(phaseId)
        ? prev.filter(id => id !== phaseId)
        : [...prev, phaseId]
    );
  };

  const handleValidate = (phaseId: string) => {
    setPhases(prev =>
      prev.map(phase =>
        phase.id === phaseId ? { ...phase, validated: true } : phase
      )
    );
    toast.success("Phase validated successfully", {
      description: "Quality approval has been recorded.",
    });
  };

  const getStatusIcon = (status: PhaseStatus, validated: boolean) => {
    if (validated) return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
    if (status === "completed") return <Check className="w-5 h-5 text-champagne-gold" />;
    if (status === "in-progress") return <Clock className="w-5 h-5 text-champagne-gold animate-pulse" />;
    return <Circle className="w-5 h-5 text-white/30" />;
  };

  const currentMessages = chatTab === "owner" ? ownerMessages : engineerMessages;

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 space-y-8 font-heading">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl lg:text-4xl font-heading text-moorgen-black tracking-tight">
            Architect Dashboard
          </h1>
          <p className="text-moorgen-black/60 font-heading mt-2">
            Project oversight and quality validation
          </p>
        </motion.div>

        {/* Top Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {topCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${card.gradient} p-6 border border-champagne-gold/20`}
            >
              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                <div className="absolute top-2 right-2 w-8 h-8 border-t border-r border-champagne-gold/30" />
              </div>
              
              <card.icon className="w-8 h-8 text-champagne-gold mb-4" />
              <p className="text-white/60 text-sm font-heading">{card.title}</p>
              <p className="text-3xl font-heading text-white mt-1">{card.value}</p>
              <p className="text-white/40 text-xs font-heading mt-2">{card.subtitle}</p>
            </motion.div>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Timeline Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl border border-champagne-gold/10 p-6 shadow-sm"
            >
              <h2 className="text-xl font-heading text-moorgen-black mb-6">
                Detailed Project Journey — Villa Uluwatu
              </h2>

              {/* Vertical Timeline */}
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-[22px] top-0 bottom-0 w-px bg-gradient-to-b from-champagne-gold/40 via-champagne-gold/20 to-transparent" />

                <div className="space-y-4">
                  {phases.map((phase, index) => (
                    <motion.div
                      key={phase.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="relative"
                    >
                      {/* Status dot */}
                      <div className="absolute left-0 top-4 z-10 w-11 h-11 rounded-full bg-white border-2 border-champagne-gold/30 flex items-center justify-center">
                        {getStatusIcon(phase.status, phase.validated)}
                      </div>

                      {/* Content card */}
                      <div className="ml-16">
                        <button
                          onClick={() => togglePhase(phase.id)}
                          className="w-full text-left"
                        >
                          <div className={`p-4 rounded-xl transition-all duration-300 ${
                            phase.status === "in-progress"
                              ? "bg-gradient-to-r from-champagne-gold/10 to-transparent border border-champagne-gold/20"
                              : "bg-gray-50 hover:bg-gray-100 border border-transparent"
                          }`}>
                            <div className="flex items-center justify-between">
                              <div>
                                <h3 className="font-heading text-moorgen-black text-sm lg:text-base">
                                  {phase.title}
                                </h3>
                                <p className="text-xs text-moorgen-black/50 font-heading mt-1">
                                  {phase.date}
                                </p>
                              </div>
                              <ChevronDown
                                className={`w-5 h-5 text-moorgen-black/40 transition-transform duration-300 ${
                                  expandedPhases.includes(phase.id) ? "rotate-180" : ""
                                }`}
                              />
                            </div>
                          </div>
                        </button>

                        <AnimatePresence>
                          {expandedPhases.includes(phase.id) && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="p-4 pt-2">
                                <p className="text-sm text-moorgen-black/70 font-heading leading-relaxed">
                                  {phase.description}
                                </p>
                                
                                {/* Validate Quality Button */}
                                {phase.status !== "pending" && !phase.validated && (
                                  <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-4"
                                  >
                                    <Button
                                      onClick={() => handleValidate(phase.id)}
                                      className="bg-gradient-to-r from-champagne-gold to-champagne-gold/80 text-moorgen-black font-heading text-sm hover:from-champagne-gold/90 hover:to-champagne-gold/70"
                                    >
                                      <CheckCircle2 className="w-4 h-4 mr-2" />
                                      Validate Quality
                                    </Button>
                                  </motion.div>
                                )}

                                {phase.validated && (
                                  <div className="mt-4 flex items-center gap-2 text-emerald-600">
                                    <CheckCircle2 className="w-4 h-4" />
                                    <span className="text-sm font-heading">Quality Validated</span>
                                  </div>
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Dual Chat Panel */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-2xl border border-champagne-gold/10 overflow-hidden shadow-sm h-[500px] flex flex-col"
            >
              {/* Chat Toggle */}
              <div className="flex border-b border-champagne-gold/10">
                <button
                  onClick={() => setChatTab("owner")}
                  className={`flex-1 py-4 px-4 flex items-center justify-center gap-2 font-heading text-sm transition-all ${
                    chatTab === "owner"
                      ? "bg-champagne-gold/10 text-moorgen-black border-b-2 border-champagne-gold"
                      : "text-moorgen-black/50 hover:text-moorgen-black/70"
                  }`}
                >
                  <User className="w-4 h-4" />
                  Owner Chat
                </button>
                <button
                  onClick={() => setChatTab("engineer")}
                  className={`flex-1 py-4 px-4 flex items-center justify-center gap-2 font-heading text-sm transition-all ${
                    chatTab === "engineer"
                      ? "bg-champagne-gold/10 text-moorgen-black border-b-2 border-champagne-gold"
                      : "text-moorgen-black/50 hover:text-moorgen-black/70"
                  }`}
                >
                  <Wrench className="w-4 h-4" />
                  Engineer Chat
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 p-4 overflow-y-auto space-y-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={chatTab}
                    initial={{ opacity: 0, x: chatTab === "owner" ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: chatTab === "owner" ? 20 : -20 }}
                    className="space-y-4"
                  >
                    {currentMessages.map((message, index) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`flex ${message.sender === "architect" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[85%] p-3 rounded-2xl ${
                            message.sender === "architect"
                              ? "bg-gradient-to-br from-[#1a1a1a] to-[#252525] text-white"
                              : "bg-gray-100 text-moorgen-black"
                          }`}
                        >
                          <p className="text-sm font-heading leading-relaxed">{message.text}</p>
                          <p className={`text-xs mt-1 font-heading ${
                            message.sender === "architect" ? "text-white/50" : "text-moorgen-black/40"
                          }`}>
                            {message.timestamp}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Input */}
              <div className="p-4 border-t border-champagne-gold/10">
                <div className="flex gap-2">
                  <Input
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 font-heading text-sm border-champagne-gold/20 focus:border-champagne-gold/40"
                  />
                  <Button
                    size="icon"
                    className="bg-moorgen-black hover:bg-moorgen-black/90"
                    disabled={!chatInput.trim()}
                  >
                    <MessageCircle className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Footer Card - Architect Resources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#0a0a0a] rounded-2xl p-6 lg:p-8 border border-champagne-gold/20"
        >
          {/* Decorative corners */}
          <div className="relative">
            <div className="absolute -top-6 -left-6 w-12 h-12 border-l border-t border-champagne-gold/30" />
            <div className="absolute -top-6 -right-6 w-12 h-12 border-r border-t border-champagne-gold/30" />
          </div>

          <h3 className="text-xl font-heading text-white mb-6 flex items-center gap-3">
            <Download className="w-5 h-5 text-champagne-gold" />
            Architect Resources
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {resources.map((resource, index) => (
              <motion.button
                key={resource.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                whileHover={{ scale: 1.02, backgroundColor: "rgba(212, 175, 55, 0.1)" }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-champagne-gold/10 hover:border-champagne-gold/30 transition-all text-left group"
              >
                <div className="w-10 h-10 rounded-lg bg-champagne-gold/10 flex items-center justify-center">
                  <Download className="w-5 h-5 text-champagne-gold group-hover:animate-bounce" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-heading text-sm truncate">{resource.name}</p>
                  <p className="text-white/40 text-xs font-heading mt-0.5">
                    {resource.type} • {resource.size}
                  </p>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Decorative corners */}
          <div className="relative">
            <div className="absolute -bottom-6 -left-6 w-12 h-12 border-l border-b border-champagne-gold/30" />
            <div className="absolute -bottom-6 -right-6 w-12 h-12 border-r border-b border-champagne-gold/30" />
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default ArchitectDashboard;
