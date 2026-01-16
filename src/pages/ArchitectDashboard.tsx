import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ArchitectLayout from "@/components/layout/ArchitectLayout";
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
  Circle,
  Sparkles,
  ArrowUpRight,
  Send
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
  progress?: number;
}

interface ChatMessage {
  id: string;
  text: string;
  sender: "architect" | "other";
  senderName: string;
  avatar: string;
  timestamp: string;
}

// Data
const topCards = [
  {
    title: "Active Projects",
    value: "3",
    subtitle: "Currently in progress",
    icon: Briefcase,
    accent: "from-champagne-gold/20 to-champagne-gold/5",
    iconColor: "text-champagne-gold",
  },
  {
    title: "Pending Validations",
    value: "2",
    subtitle: "Phases need approval",
    icon: ClipboardCheck,
    accent: "from-champagne-gold/20 to-champagne-gold/5",
    iconColor: "text-champagne-gold",
  },
  {
    title: "New Shared Files",
    value: "5",
    subtitle: "Diagrams received",
    icon: FileImage,
    accent: "from-champagne-gold/20 to-champagne-gold/5",
    iconColor: "text-champagne-gold",
  },
  {
    title: "Next Field Sync",
    value: "Oct 20",
    subtitle: "Scheduled meeting",
    icon: Calendar,
    accent: "from-champagne-gold/20 to-champagne-gold/5",
    iconColor: "text-champagne-gold",
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
    progress: 100,
  },
  {
    id: "2",
    title: "Electrical Pre-Wiring",
    status: "completed",
    date: "Sep 28, 2024",
    description: "Installation of dedicated smart home circuits, CAT6 cabling, and preparation for panel mounting locations.",
    validated: true,
    progress: 100,
  },
  {
    id: "3",
    title: "Panel Installation - Living Areas",
    status: "in-progress",
    date: "Oct 12, 2024",
    description: "Milan Series touch panels installation in main living room, dining area, and master suite entrance.",
    validated: false,
    progress: 65,
  },
  {
    id: "4",
    title: "Lighting Integration",
    status: "pending",
    date: "Oct 25, 2024",
    description: "Connection of all lighting circuits to smart controllers and scene programming.",
    validated: false,
    progress: 0,
  },
  {
    id: "5",
    title: "Final Commissioning",
    status: "pending",
    date: "Nov 5, 2024",
    description: "System-wide testing, owner training, and handover documentation.",
    validated: false,
    progress: 0,
  },
];

const ownerMessages: ChatMessage[] = [
  { id: "1", text: "Good morning! When can we expect the living room panels to be ready?", sender: "other", senderName: "James Wilson", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face", timestamp: "9:30 AM" },
  { id: "2", text: "The installation is progressing well. We anticipate completion by end of week.", sender: "architect", senderName: "You", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face", timestamp: "9:45 AM" },
  { id: "3", text: "Perfect. Will the champagne gold finish match the samples?", sender: "other", senderName: "James Wilson", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face", timestamp: "10:00 AM" },
];

const engineerMessages: ChatMessage[] = [
  { id: "1", text: "Architect, the CAT6 runs are complete. Ready for panel mounting.", sender: "other", senderName: "Michael Chen", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face", timestamp: "8:15 AM" },
  { id: "2", text: "Excellent work. Please ensure 50mm clearance from the frame edges.", sender: "architect", senderName: "You", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face", timestamp: "8:30 AM" },
  { id: "3", text: "Confirmed. Sending photos of the mounting templates now.", sender: "other", senderName: "Michael Chen", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face", timestamp: "8:45 AM" },
];

const resources = [
  { name: "Milan Series CAD Files", type: "ZIP", size: "24.5 MB", icon: "📐" },
  { name: "Moorgen Wiring Templates", type: "PDF", size: "8.2 MB", icon: "📋" },
  { name: "Installation Guidelines", type: "PDF", size: "3.1 MB", icon: "📖" },
  { name: "Scene Programming Reference", type: "PDF", size: "1.8 MB", icon: "⚡" },
];

const ArchitectDashboard = () => {
  const [phases, setPhases] = useState<Phase[]>(initialPhases);
  const [expandedPhases, setExpandedPhases] = useState<string[]>(["3"]);
  const [chatTab, setChatTab] = useState<ChatTab>("owner");
  const [chatInput, setChatInput] = useState("");
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

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
    return <Circle className="w-5 h-5 text-charcoal/20" />;
  };

  const currentMessages = chatTab === "owner" ? ownerMessages : engineerMessages;

  return (
    <ArchitectLayout>
      <div className="p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8 font-heading max-w-[1600px] mx-auto">
        {/* Header with Greeting */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative"
        >
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <motion.div 
                className="flex items-center gap-2 mb-2"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Sparkles className="w-4 h-4 text-champagne-gold" />
                <span className="text-xs uppercase tracking-[0.2em] text-champagne-gold font-medium">
                  Architect Portal
                </span>
              </motion.div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-heading text-moorgen-black tracking-tight">
                Good morning, <span className="text-champagne-gold">Architect</span>
              </h1>
              <p className="text-charcoal/60 font-heading mt-1 sm:mt-2 text-sm sm:text-base">
                3 projects active • 2 validations pending
              </p>
            </div>
            
            {/* Quick Stats Pill */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="hidden sm:flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-champagne-gold/10 to-transparent border border-champagne-gold/20"
            >
              <div className="flex -space-x-2">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-600 text-[10px] font-bold border-2 border-white">2</div>
                <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-600 text-[10px] font-bold border-2 border-white">1</div>
              </div>
              <span className="text-xs text-charcoal/70">phases this week</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Top Cards - Glass Morphism Style */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {topCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onHoverStart={() => setHoveredCard(index)}
              onHoverEnd={() => setHoveredCard(null)}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="relative group cursor-pointer"
            >
              {/* Card Background */}
              <div className={`absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-br ${card.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-white/80 backdrop-blur-sm p-4 sm:p-6 border border-charcoal/5 shadow-sm hover:shadow-xl hover:shadow-charcoal/5 transition-all duration-500">
                {/* Decorative gradient orb */}
                <div className={`absolute -top-10 -right-10 w-24 h-24 rounded-full bg-gradient-to-br ${card.accent} blur-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-500`} />
                
                {/* Icon */}
                <div className={`relative z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br ${card.accent} flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <card.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${card.iconColor}`} />
                </div>
                
                {/* Content */}
                <p className="relative z-10 text-charcoal/60 text-xs sm:text-sm font-heading">{card.title}</p>
                <p className="relative z-10 text-2xl sm:text-3xl font-heading text-moorgen-black mt-1">{card.value}</p>
                <p className="relative z-10 text-charcoal/40 text-[10px] sm:text-xs font-heading mt-1 sm:mt-2">{card.subtitle}</p>
                
                {/* Hover arrow */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: hoveredCard === index ? 1 : 0, x: hoveredCard === index ? 0 : -10 }}
                  className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6"
                >
                  <ArrowUpRight className={`w-4 h-4 sm:w-5 sm:h-5 ${card.iconColor}`} />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
          {/* Timeline Section */}
          <div className="xl:col-span-2 order-2 xl:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-charcoal/5 p-4 sm:p-6 lg:p-8 shadow-sm"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 sm:mb-8">
                <div>
                  <h2 className="text-lg sm:text-xl font-heading text-moorgen-black">
                    Project Journey
                  </h2>
                  <p className="text-xs sm:text-sm text-charcoal/50 mt-1">Villa Uluwatu • Bali, Indonesia</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-champagne-gold/10 border border-champagne-gold/20">
                  <div className="w-2 h-2 rounded-full bg-champagne-gold animate-pulse" />
                  <span className="text-xs text-champagne-gold font-medium">65% Complete</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="relative h-2 rounded-full bg-charcoal/5 mb-6 sm:mb-8 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "65%" }}
                  transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-champagne-gold to-amber-400 rounded-full"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
              </div>

              {/* Vertical Timeline */}
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-4 sm:left-6 top-0 bottom-0 w-px bg-gradient-to-b from-champagne-gold via-champagne-gold/30 to-transparent" />

                <div className="space-y-3 sm:space-y-4">
                  {phases.map((phase, index) => (
                    <motion.div
                      key={phase.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="relative"
                    >
                      {/* Status dot */}
                      <motion.div 
                        className={`absolute left-0 sm:left-2 top-3 sm:top-4 z-10 w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                          phase.status === "in-progress" 
                            ? "bg-gradient-to-br from-champagne-gold/20 to-amber-100 border-2 border-champagne-gold shadow-lg shadow-champagne-gold/20" 
                            : phase.validated 
                              ? "bg-gradient-to-br from-emerald-100 to-emerald-50 border-2 border-emerald-400"
                              : "bg-white border-2 border-charcoal/10"
                        }`}
                        whileHover={{ scale: 1.1 }}
                      >
                        {getStatusIcon(phase.status, phase.validated)}
                      </motion.div>

                      {/* Content card */}
                      <div className="ml-12 sm:ml-16">
                        <motion.button
                          onClick={() => togglePhase(phase.id)}
                          className="w-full text-left"
                          whileTap={{ scale: 0.99 }}
                        >
                          <div className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl transition-all duration-300 ${
                            phase.status === "in-progress"
                              ? "bg-gradient-to-r from-champagne-gold/10 via-amber-50/50 to-transparent border border-champagne-gold/20 shadow-sm"
                              : phase.status === "pending"
                                ? "bg-charcoal/[0.02] hover:bg-charcoal/[0.04] border border-transparent"
                                : "bg-white hover:bg-gray-50/80 border border-charcoal/5 hover:border-charcoal/10"
                          }`}>
                            <div className="flex items-start sm:items-center justify-between gap-2">
                              <div className="flex-1 min-w-0">
                                <h3 className={`font-heading text-sm sm:text-base leading-tight ${
                                  phase.status === "pending" ? "text-charcoal/50" : "text-moorgen-black"
                                }`}>
                                  {phase.title}
                                </h3>
                                <div className="flex flex-wrap items-center gap-2 mt-1.5">
                                  <span className="text-[10px] sm:text-xs text-charcoal/50 font-heading">
                                    {phase.date}
                                  </span>
                                  {phase.status === "in-progress" && (
                                    <span className="px-2 py-0.5 rounded-full bg-champagne-gold/20 text-champagne-gold text-[10px] font-medium">
                                      In Progress
                                    </span>
                                  )}
                                  {phase.validated && (
                                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-600 text-[10px] font-medium">
                                      Validated
                                    </span>
                                  )}
                                </div>
                              </div>
                              <ChevronDown
                                className={`w-4 h-4 sm:w-5 sm:h-5 text-charcoal/30 transition-transform duration-300 flex-shrink-0 ${
                                  expandedPhases.includes(phase.id) ? "rotate-180" : ""
                                }`}
                              />
                            </div>
                          </div>
                        </motion.button>

                        <AnimatePresence>
                          {expandedPhases.includes(phase.id) && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="p-3 sm:p-4 pt-2">
                                <p className="text-xs sm:text-sm text-charcoal/70 font-heading leading-relaxed">
                                  {phase.description}
                                </p>
                                
                                {/* Progress bar for in-progress */}
                                {phase.status === "in-progress" && (
                                  <div className="mt-4">
                                    <div className="flex justify-between text-[10px] sm:text-xs text-charcoal/50 mb-1.5">
                                      <span>Progress</span>
                                      <span>{phase.progress}%</span>
                                    </div>
                                    <div className="h-1.5 rounded-full bg-charcoal/5 overflow-hidden">
                                      <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${phase.progress}%` }}
                                        transition={{ delay: 0.2, duration: 0.5 }}
                                        className="h-full bg-gradient-to-r from-champagne-gold to-amber-400 rounded-full"
                                      />
                                    </div>
                                  </div>
                                )}
                                
                                {/* Validate Quality Button */}
                                {phase.status !== "pending" && !phase.validated && (
                                  <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-4"
                                  >
                                    <Button
                                      onClick={() => handleValidate(phase.id)}
                                      className="bg-gradient-to-r from-moorgen-black to-charcoal text-white font-heading text-xs sm:text-sm hover:from-charcoal hover:to-moorgen-black shadow-lg shadow-charcoal/20 group"
                                    >
                                      <CheckCircle2 className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                                      Validate Quality
                                      <Sparkles className="w-3 h-3 ml-2 text-champagne-gold" />
                                    </Button>
                                  </motion.div>
                                )}

                                {phase.validated && (
                                  <motion.div 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="mt-4 flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-50 border border-emerald-200"
                                  >
                                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                    <span className="text-xs sm:text-sm font-heading text-emerald-700">Quality Validated</span>
                                  </motion.div>
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
          <div className="xl:col-span-1 order-1 xl:order-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-charcoal/5 overflow-hidden shadow-sm h-[400px] sm:h-[450px] xl:h-[600px] flex flex-col"
            >
              {/* Chat Toggle */}
              <div className="relative flex bg-charcoal/[0.02]">
                {/* Sliding indicator */}
                <motion.div
                  className="absolute bottom-0 h-0.5 bg-gradient-to-r from-champagne-gold to-amber-400"
                  initial={false}
                  animate={{
                    left: chatTab === "owner" ? "0%" : "50%",
                    width: "50%",
                  }}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                />
                
                <button
                  onClick={() => setChatTab("owner")}
                  className={`flex-1 py-3 sm:py-4 px-3 sm:px-4 flex items-center justify-center gap-2 font-heading text-xs sm:text-sm transition-all relative ${
                    chatTab === "owner"
                      ? "text-moorgen-black"
                      : "text-charcoal/40 hover:text-charcoal/60"
                  }`}
                >
                  <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all ${
                    chatTab === "owner" ? "bg-champagne-gold/20" : "bg-charcoal/5"
                  }`}>
                    <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                  <span>Owner Chat</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </button>
                <button
                  onClick={() => setChatTab("engineer")}
                  className={`flex-1 py-3 sm:py-4 px-3 sm:px-4 flex items-center justify-center gap-2 font-heading text-xs sm:text-sm transition-all ${
                    chatTab === "engineer"
                      ? "text-moorgen-black"
                      : "text-charcoal/40 hover:text-charcoal/60"
                  }`}
                >
                  <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all ${
                    chatTab === "engineer" ? "bg-champagne-gold/20" : "bg-charcoal/5"
                  }`}>
                    <Wrench className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                  <span>Engineer Chat</span>
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 p-3 sm:p-4 overflow-y-auto space-y-3 sm:space-y-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={chatTab}
                    initial={{ opacity: 0, x: chatTab === "owner" ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: chatTab === "owner" ? 20 : -20 }}
                    className="space-y-3 sm:space-y-4"
                  >
                    {currentMessages.map((message, index) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`flex gap-2 sm:gap-3 ${message.sender === "architect" ? "flex-row-reverse" : "flex-row"}`}
                      >
                        {/* Avatar */}
                        <motion.div whileHover={{ scale: 1.1 }} className="flex-shrink-0">
                          <img
                            src={message.avatar}
                            alt={message.senderName}
                            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover border-2 border-white shadow-md"
                          />
                        </motion.div>
                        
                        <div className={`max-w-[80%] sm:max-w-[75%] ${message.sender === "architect" ? "items-end" : "items-start"}`}>
                          {/* Name */}
                          <p className={`text-[10px] sm:text-xs font-heading mb-1 ${
                            message.sender === "architect" ? "text-right text-charcoal/40" : "text-left text-charcoal/40"
                          }`}>
                            {message.senderName}
                          </p>
                          
                          <motion.div
                            whileHover={{ scale: 1.01 }}
                            className={`p-3 sm:p-4 ${
                              message.sender === "architect"
                                ? "bg-gradient-to-br from-moorgen-black to-charcoal text-white rounded-2xl rounded-tr-md"
                                : "bg-charcoal/[0.04] text-moorgen-black rounded-2xl rounded-tl-md border border-charcoal/5"
                            }`}
                          >
                            <p className="text-xs sm:text-sm font-heading leading-relaxed">{message.text}</p>
                            <p className={`text-[10px] sm:text-xs mt-1.5 sm:mt-2 font-heading ${
                              message.sender === "architect" ? "text-white/40" : "text-charcoal/30"
                            }`}>
                              {message.timestamp}
                            </p>
                          </motion.div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Input */}
              <div className="p-3 sm:p-4 border-t border-charcoal/5 bg-white/50">
                <div className="flex gap-2">
                  <Input
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 font-heading text-xs sm:text-sm border-charcoal/10 focus:border-champagne-gold/40 rounded-xl bg-white"
                  />
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      size="icon"
                      className="bg-gradient-to-br from-moorgen-black to-charcoal hover:from-charcoal hover:to-moorgen-black rounded-xl shadow-lg shadow-charcoal/20"
                      disabled={!chatInput.trim()}
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </motion.div>
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
          className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-moorgen-black via-charcoal to-moorgen-black p-5 sm:p-6 lg:p-8 border border-champagne-gold/10"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-champagne-gold/10 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-champagne-gold/5 to-transparent rounded-full blur-3xl" />
          
          {/* Corner accents */}
          <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-champagne-gold/30 rounded-tl-lg" />
          <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-champagne-gold/30 rounded-tr-lg" />
          <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-champagne-gold/30 rounded-bl-lg" />
          <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-champagne-gold/30 rounded-br-lg" />

          <div className="relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 sm:mb-6">
              <h3 className="text-lg sm:text-xl font-heading text-white flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-champagne-gold/20 flex items-center justify-center">
                  <Download className="w-5 h-5 text-champagne-gold" />
                </div>
                Architect Resources
              </h3>
              <span className="text-xs text-champagne-gold/60">4 files available</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {resources.map((resource, index) => (
                <motion.button
                  key={resource.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/5 backdrop-blur-sm border border-champagne-gold/10 hover:border-champagne-gold/30 hover:bg-white/10 transition-all text-left group"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-champagne-gold/20 to-amber-500/10 flex items-center justify-center text-xl sm:text-2xl group-hover:scale-110 transition-transform">
                    {resource.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-heading text-xs sm:text-sm truncate group-hover:text-champagne-gold transition-colors">{resource.name}</p>
                    <p className="text-white/30 text-[10px] sm:text-xs font-heading mt-0.5">
                      {resource.type} • {resource.size}
                    </p>
                  </div>
                  <Download className="w-4 h-4 text-white/30 group-hover:text-champagne-gold group-hover:animate-bounce transition-colors" />
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </ArchitectLayout>
  );
};

export default ArchitectDashboard;
