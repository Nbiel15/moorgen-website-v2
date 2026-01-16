import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Clock, Send, Paperclip, ChevronDown, Eye, Camera, TrendingUp, Calendar as CalendarIcon, Users, Wifi, MessageCircle, Sparkles, ArrowRight, MapPin, Shield } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
type MilestoneStatus = "completed" | "in-progress" | "pending";
interface Phase {
  id: string;
  title: string;
  targetDate: string;
  status: MilestoneStatus;
  statusDate: string;
  description: string;
  photos: string[];
  approved: boolean;
  technician: string;
  progress?: number;
}
const phases: Phase[] = [{
  id: "1",
  title: "Site Analysis",
  targetDate: "15 Aug 2024",
  status: "completed",
  statusDate: "12 Aug 2024",
  description: "Complete electrical survey and smart home infrastructure mapping.",
  photos: ["https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400", "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400"],
  approved: true,
  technician: "Wayan Sudarta",
  progress: 100
}, {
  id: "2",
  title: "Wiring & Infrastructure",
  targetDate: "30 Sep 2024",
  status: "completed",
  statusDate: "30 Sep 2024",
  description: "Installation of all smart home wiring, network cables, and power distribution.",
  photos: ["https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400"],
  approved: true,
  technician: "Made Kusuma",
  progress: 100
}, {
  id: "3",
  title: "Device Installation",
  targetDate: "15 Nov 2024",
  status: "in-progress",
  statusDate: "In Progress",
  description: "Installing Moorgen smart panels, sensors, and control units throughout the villa.",
  photos: ["https://images.unsplash.com/photo-1558002038-1055907df827?w=400"],
  approved: false,
  technician: "Wayan Sudarta",
  progress: 65
}, {
  id: "4",
  title: "Fine-tuning & Handover",
  targetDate: "20 Dec 2024",
  status: "pending",
  statusDate: "Pending",
  description: "System calibration, scene programming, and final handover to owner.",
  photos: [],
  approved: false,
  technician: "Assigned",
  progress: 0
}];
const evidenceData = [{
  phase: "Site Analysis",
  technician: "Wayan Sudarta",
  date: "12 Aug 2024",
  status: "Approved",
  hasPhoto: true
}, {
  phase: "Wiring",
  technician: "Made Kusuma",
  date: "30 Sep 2024",
  status: "Approved",
  hasPhoto: true
}, {
  phase: "Device Installation",
  technician: "Wayan Sudarta",
  date: "In Progress",
  status: "Pending",
  hasPhoto: true
}];
const ProjectJourney = () => {
  const navigate = useNavigate();
  const [selectedPhase, setSelectedPhase] = useState<Phase | null>(null);
  const [chatInput, setChatInput] = useState("");
  const [showFloatingChat, setShowFloatingChat] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const [expandedPhases, setExpandedPhases] = useState<Set<string>>(() => {
    const initialExpanded = new Set<string>();
    phases.forEach(phase => {
      if (phase.status === "in-progress") {
        initialExpanded.add(phase.id);
      }
    });
    return initialExpanded;
  });
  const togglePhase = (phaseId: string) => {
    setExpandedPhases(prev => {
      const newSet = new Set(prev);
      if (newSet.has(phaseId)) {
        newSet.delete(phaseId);
      } else {
        newSet.add(phaseId);
      }
      return newSet;
    });
  };
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setShowFloatingChat(!entry.isIntersecting);
    }, {
      threshold: 0.1
    });
    if (chatRef.current) {
      observer.observe(chatRef.current);
    }
    return () => observer.disconnect();
  }, []);
  const scrollToChat = () => {
    chatRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  const getStatusStyles = (status: MilestoneStatus) => {
    switch (status) {
      case "completed":
        return {
          bg: "bg-charcoal",
          icon: <div className="w-2 h-2 bg-white rounded-full" />,
          line: "bg-charcoal",
          badge: "bg-charcoal/10 text-charcoal"
        };
      case "in-progress":
        return {
          bg: "bg-gradient-to-br from-champagne-gold to-amber-500",
          icon: <motion.div animate={{
            scale: [1, 1.3, 1]
          }} transition={{
            duration: 1.5,
            repeat: Infinity
          }} className="w-2 h-2 bg-white rounded-full" />,
          line: "bg-gradient-to-b from-champagne-gold to-border",
          badge: "bg-champagne-gold/15 text-champagne-gold"
        };
      case "pending":
        return {
          bg: "bg-muted border-2 border-border",
          icon: <Clock className="w-3 h-3 text-muted-foreground" />,
          line: "bg-border",
          badge: "bg-muted text-muted-foreground"
        };
    }
  };
  const completedCount = phases.filter(p => p.status === "completed").length;
  const totalProgress = Math.round(completedCount / phases.length * 100 + (phases.find(p => p.status === "in-progress")?.progress || 0) / phases.length);
  return <DashboardLayout>
      <div className="min-h-screen bg-background">
        {/* Premium Header - Same style as Controls page */}
        <header className="relative overflow-hidden border-b border-border/50 bg-gradient-to-br from-background via-background to-muted/30">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-72 md:w-96 h-72 md:h-96 bg-gradient-to-bl from-champagne-gold/5 via-transparent to-transparent rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-48 md:w-64 h-48 md:h-64 bg-gradient-to-tr from-champagne-gold/10 to-transparent rounded-full blur-2xl" />
          
          <div className="relative mx-auto w-full max-w-7xl px-4 py-6 md:px-8 md:py-10">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 md:gap-6">
              {/* Title Section */}
              <motion.div initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.5
            }}>
                <div className="flex items-center gap-2 mb-2">
                  <motion.div animate={{
                  scale: [1, 1.2, 1]
                }} transition={{
                  duration: 2,
                  repeat: Infinity
                }} className="w-1.5 h-1.5 rounded-full bg-champagne-gold" />
                  <p className="text-[10px] sm:text-xs text-champagne-gold tracking-[0.3em] uppercase font-body">Project Journey</p>
                </div>
                <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-foreground">
                  Installation Progress
                </h1>
                <p className="text-muted-foreground font-body mt-2 text-xs sm:text-sm md:text-base flex items-center gap-2">
                  <MapPin className="w-3 h-3 text-champagne-gold" />
                  Villa Seminyak Smart Home Installation
                </p>
              </motion.div>

              {/* Progress Badge */}
              
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="mx-auto w-full max-w-7xl px-4 py-6 md:px-8 pb-24 lg:pb-8">
          {/* Summary Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
            {/* Card 1: Total Progress */}
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.1
          }} className="group relative overflow-hidden rounded-2xl md:rounded-3xl p-4 md:p-5 bg-charcoal text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-champagne-gold/20 rounded-full blur-2xl group-hover:bg-champagne-gold/30 transition-colors duration-500" />
              <div className="relative">
                <div className="flex items-center gap-1.5 mb-2 md:mb-3">
                  <TrendingUp className="w-4 h-4 text-champagne-gold" />
                  <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-white/60">Total Progress</span>
                </div>
                <p className="font-heading text-2xl md:text-3xl font-bold">{totalProgress}%</p>
                <p className="text-[9px] sm:text-[10px] text-champagne-gold mt-0.5 flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5" />
                  +4.2% from last week
                </p>
              </div>
            </motion.div>

            {/* Card 2: Handover Date */}
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.15
          }} className="group relative overflow-hidden rounded-2xl md:rounded-3xl p-4 md:p-5 bg-card border border-border hover:border-champagne-gold/30 hover:shadow-lg transition-all duration-300">
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-muted/50 rounded-full blur-2xl group-hover:bg-champagne-gold/10 transition-colors duration-500" />
              <div className="relative">
                <div className="flex items-center gap-1.5 mb-2 md:mb-3">
                  <CalendarIcon className="w-4 h-4 text-champagne-gold" />
                  <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-muted-foreground">Handover Date</span>
                </div>
                <p className="font-heading text-lg md:text-xl font-bold text-foreground">20 Dec 2024</p>
                <p className="text-[9px] sm:text-[10px] text-muted-foreground mt-0.5">45 Days Remaining</p>
              </div>
            </motion.div>

            {/* Card 3: Active Engineers */}
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.2
          }} className="group relative overflow-hidden rounded-2xl md:rounded-3xl p-4 md:p-5 bg-card border border-border hover:border-champagne-gold/30 hover:shadow-lg transition-all duration-300">
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-muted/50 rounded-full blur-2xl group-hover:bg-champagne-gold/10 transition-colors duration-500" />
              <div className="relative">
                <div className="flex items-center gap-1.5 mb-2 md:mb-3">
                  <Users className="w-4 h-4 text-champagne-gold" />
                  <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-muted-foreground">Active Engineers</span>
                </div>
                <p className="font-heading text-lg md:text-xl font-bold text-foreground">3 People</p>
                <p className="text-[9px] sm:text-[10px] text-green-600 mt-0.5 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                  All on-site
                </p>
              </div>
            </motion.div>

            {/* Card 4: System Status */}
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.25
          }} className="group relative overflow-hidden rounded-2xl md:rounded-3xl p-4 md:p-5 bg-card border border-border hover:border-champagne-gold/30 hover:shadow-lg transition-all duration-300">
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-muted/50 rounded-full blur-2xl group-hover:bg-champagne-gold/10 transition-colors duration-500" />
              <div className="relative">
                <div className="flex items-center gap-1.5 mb-2 md:mb-3">
                  <Shield className="w-4 h-4 text-green-500" />
                  <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-muted-foreground">System Status</span>
                </div>
                <p className="font-heading text-lg md:text-xl font-bold text-foreground">98% Online</p>
                <div className="flex items-center gap-0.5 mt-1">
                  {[...Array(6)].map((_, i) => <motion.div key={i} initial={{
                  scaleY: 0
                }} animate={{
                  scaleY: 1
                }} transition={{
                  delay: 0.3 + i * 0.1
                }} className="flex-1 h-1.5 rounded-full bg-green-500" style={{
                  opacity: 0.4 + i * 0.12
                }} />)}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-6">
            {/* Timeline */}
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.3
          }} className="lg:col-span-2 bg-card rounded-2xl md:rounded-3xl p-4 sm:p-5 md:p-6 border border-border/50 shadow-sm">
              <div className="flex items-center justify-between mb-5 md:mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-champagne-gold/20 to-champagne-gold/5 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-champagne-gold" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg md:text-xl text-foreground">Project Timeline</h3>
                    <p className="text-[10px] sm:text-xs text-muted-foreground">Installation milestones & progress</p>
                  </div>
                </div>
              </div>

              <div className="relative space-y-2">
                {phases.map((phase, index) => {
                const styles = getStatusStyles(phase.status);
                const isLast = index === phases.length - 1;
                const isInProgress = phase.status === "in-progress";
                const isExpanded = expandedPhases.has(phase.id);
                return <motion.div key={phase.id} initial={{
                  opacity: 0,
                  x: -20
                }} animate={{
                  opacity: 1,
                  x: 0
                }} transition={{
                  delay: 0.1 + index * 0.1
                }} className="relative flex gap-3 sm:gap-4">
                      {/* Timeline Line & Dot */}
                      <div className="flex flex-col items-center">
                        <motion.div whileHover={{
                      scale: 1.1
                    }} className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full ${styles.bg} flex items-center justify-center z-10 shadow-lg`}>
                          {styles.icon}
                        </motion.div>
                        {!isLast && <div className={`w-0.5 flex-1 ${styles.line}`} />}
                      </div>

                      {/* Content */}
                      <div className={`flex-1 ${isLast ? 'pb-0' : 'pb-2'}`}>
                        <div className={`rounded-xl md:rounded-2xl border transition-all duration-300 overflow-hidden ${isInProgress ? "border-champagne-gold bg-gradient-to-r from-champagne-gold/5 to-transparent shadow-[0_0_30px_rgba(212,175,55,0.1)]" : "border-border hover:border-muted-foreground/30 hover:bg-muted/20"}`}>
                          {/* Header */}
                          <button onClick={() => togglePhase(phase.id)} className="w-full p-3 sm:p-4 text-left flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <h4 className="font-heading font-semibold text-sm sm:text-base text-foreground">{phase.title}</h4>
                                {isInProgress && <motion.span animate={{
                              opacity: [1, 0.7, 1]
                            }} transition={{
                              duration: 2,
                              repeat: Infinity
                            }} className={`px-2 py-0.5 text-[9px] sm:text-[10px] font-semibold uppercase rounded-full ${styles.badge} flex items-center gap-1`}>
                                    <Sparkles className="w-2.5 h-2.5" />
                                    Active
                                  </motion.span>}
                                {phase.status === "completed" && <span className={`px-2 py-0.5 text-[9px] sm:text-[10px] font-semibold uppercase rounded-full ${styles.badge}`}>
                                    Done
                                  </span>}
                              </div>
                              <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5">Target: {phase.targetDate}</p>
                              
                              {/* Progress bar for in-progress */}
                              {isInProgress && phase.progress && <div className="mt-2 w-full max-w-[200px]">
                                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                                    <motion.div initial={{
                                width: 0
                              }} animate={{
                                width: `${phase.progress}%`
                              }} transition={{
                                duration: 1,
                                delay: 0.5
                              }} className="h-full bg-gradient-to-r from-champagne-gold to-amber-400 rounded-full" />
                                  </div>
                                  <p className="text-[9px] text-champagne-gold mt-1">{phase.progress}% complete</p>
                                </div>}
                            </div>
                            <motion.div animate={{
                          rotate: isExpanded ? 180 : 0
                        }} transition={{
                          duration: 0.2
                        }}>
                              <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
                            </motion.div>
                          </button>

                          {/* Expandable Content */}
                          <AnimatePresence>
                            {isExpanded && <motion.div initial={{
                          height: 0,
                          opacity: 0
                        }} animate={{
                          height: "auto",
                          opacity: 1
                        }} exit={{
                          height: 0,
                          opacity: 0
                        }} transition={{
                          duration: 0.3
                        }} className="overflow-hidden">
                                <div className="px-3 sm:px-4 pb-3 sm:pb-4 border-t border-border/50">
                                  <p className="text-xs sm:text-sm text-muted-foreground mt-3 mb-3">{phase.description}</p>
                                  <div className="flex items-center gap-2 text-[10px] sm:text-xs text-muted-foreground mb-3">
                                    <Users className="w-3 h-3" />
                                    <span>Technician: {phase.technician}</span>
                                  </div>
                                  {phase.photos.length > 0 && <Button variant="outline" size="sm" onClick={e => {
                              e.stopPropagation();
                              setSelectedPhase(phase);
                            }} className="text-[10px] sm:text-xs h-7 sm:h-8 rounded-lg border-champagne-gold/30 text-champagne-gold hover:bg-champagne-gold/10">
                                      <Camera className="w-3 h-3 mr-1.5" />
                                      View Evidence
                                    </Button>}
                                </div>
                              </motion.div>}
                          </AnimatePresence>
                        </div>
                      </div>
                    </motion.div>;
              })}
              </div>
            </motion.div>

            {/* Calendar Widget */}
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.4
          }} className="bg-card rounded-2xl md:rounded-3xl p-4 sm:p-5 border border-border/50 shadow-sm">
              <div className="flex items-center gap-3 mb-4 md:mb-5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-champagne-gold/20 to-champagne-gold/5 flex items-center justify-center">
                  <CalendarIcon className="w-4 h-4 text-champagne-gold" />
                </div>
                <div>
                  <h3 className="font-serif text-base md:text-lg text-foreground">Upcoming Deadline</h3>
                  <p className="text-[10px] text-muted-foreground">Next milestone target</p>
                </div>
              </div>

              {/* Mini Calendar */}
              <div className="bg-muted/30 rounded-xl p-3 sm:p-4 mb-4">
                <div className="text-center mb-3">
                  <p className="text-[10px] sm:text-xs uppercase tracking-wider text-muted-foreground">December 2024</p>
                </div>
                <div className="grid grid-cols-7 gap-1 text-center mb-2">
                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => <span key={i} className="text-[9px] sm:text-[10px] text-muted-foreground">{d}</span>)}
                </div>
                <div className="grid grid-cols-7 gap-1 text-center">
                  {[...Array(31)].map((_, i) => {
                  const day = i + 1;
                  const isHighlight = day === 20;
                  const isPast = day < 15;
                  return <motion.span key={i} whileHover={{
                    scale: 1.1
                  }} className={`text-[10px] sm:text-xs py-1 sm:py-1.5 rounded-lg cursor-pointer transition-colors ${isHighlight ? "bg-champagne-gold text-white font-semibold shadow-lg" : isPast ? "text-muted-foreground/40" : "text-foreground hover:bg-muted"}`}>
                        {day}
                      </motion.span>;
                })}
                </div>
              </div>

              {/* Next Milestone Info */}
              <div className="border border-champagne-gold/30 rounded-xl p-3 sm:p-4 bg-gradient-to-br from-champagne-gold/5 to-transparent">
                <div className="flex items-center gap-2 mb-2">
                  <motion.div animate={{
                  scale: [1, 1.2, 1]
                }} transition={{
                  duration: 2,
                  repeat: Infinity
                }} className="w-6 h-6 rounded-full bg-gradient-to-br from-champagne-gold to-amber-500 flex items-center justify-center shadow-lg">
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </motion.div>
                  <p className="font-heading font-semibold text-foreground text-xs sm:text-sm">Fine-tuning & Handover</p>
                </div>
                <p className="text-[10px] sm:text-xs text-muted-foreground">System calibration and final handover.</p>
                <div className="mt-3 pt-3 border-t border-champagne-gold/20">
                  <p className="text-[10px] sm:text-xs text-champagne-gold font-medium">Target: December 20, 2024</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
            {/* Evidence Table */}
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.5
          }} className="lg:col-span-2 bg-card rounded-2xl md:rounded-3xl p-4 sm:p-5 md:p-6 border border-border/50 shadow-sm">
              <div className="flex items-center justify-between mb-4 md:mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-champagne-gold/20 to-champagne-gold/5 flex items-center justify-center">
                    <Camera className="w-4 h-4 text-champagne-gold" />
                  </div>
                  <div>
                    <h3 className="font-serif text-base md:text-lg text-foreground">Latest Field Evidence</h3>
                    <p className="text-[10px] text-muted-foreground">Documentation from on-site work</p>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[400px]">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left text-[10px] sm:text-xs uppercase tracking-wider text-muted-foreground py-2 sm:py-3 px-2">Phase</th>
                      <th className="text-left text-[10px] sm:text-xs uppercase tracking-wider text-muted-foreground py-2 sm:py-3 px-2 hidden sm:table-cell">Technician</th>
                      <th className="text-left text-[10px] sm:text-xs uppercase tracking-wider text-muted-foreground py-2 sm:py-3 px-2">Status</th>
                      <th className="text-right text-[10px] sm:text-xs uppercase tracking-wider text-muted-foreground py-2 sm:py-3 px-2">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {evidenceData.map((item, index) => <motion.tr key={index} initial={{
                    opacity: 0,
                    x: -10
                  }} animate={{
                    opacity: 1,
                    x: 0
                  }} transition={{
                    delay: 0.6 + index * 0.1
                  }} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                        <td className="py-3 sm:py-4 px-2">
                          <span className="text-xs sm:text-sm text-foreground font-medium">{item.phase}</span>
                        </td>
                        <td className="py-3 sm:py-4 px-2 hidden sm:table-cell">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-charcoal flex items-center justify-center text-white text-[10px]">
                              {item.technician.charAt(0)}
                            </div>
                            <span className="text-xs sm:text-sm text-foreground">{item.technician}</span>
                          </div>
                        </td>
                        <td className="py-3 sm:py-4 px-2">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-semibold uppercase ${item.status === "Approved" ? "bg-charcoal/10 text-charcoal" : "bg-champagne-gold/15 text-champagne-gold"}`}>
                            {item.status === "Approved" && <Check className="w-2.5 h-2.5" />}
                            {item.status}
                          </span>
                        </td>
                        <td className="py-3 sm:py-4 px-2 text-right">
                          <Button variant="ghost" size="sm" className="text-[10px] sm:text-xs h-7 sm:h-8 text-champagne-gold hover:text-champagne-gold hover:bg-champagne-gold/10" onClick={() => {
                        const phase = phases.find(p => p.title.includes(item.phase.split(" ")[0]));
                        if (phase) setSelectedPhase(phase);
                      }}>
                            <Eye className="w-3 h-3 mr-1" />
                            View
                          </Button>
                        </td>
                      </motion.tr>)}
                  </tbody>
                </table>
              </div>
            </motion.div>

            {/* Engineer Chat */}
            
          </div>
        </main>

        {/* Photo Gallery Dialog */}
        <Dialog open={!!selectedPhase} onOpenChange={() => setSelectedPhase(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="font-heading text-xl">{selectedPhase?.title} - Field Evidence</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              {selectedPhase?.photos.map((photo, index) => <motion.div key={index} initial={{
              opacity: 0,
              scale: 0.9
            }} animate={{
              opacity: 1,
              scale: 1
            }} transition={{
              delay: index * 0.1
            }} className="relative aspect-video rounded-xl overflow-hidden group">
                  <img src={photo} alt={`Evidence ${index + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>)}
            </div>
            {selectedPhase?.photos.length === 0 && <div className="text-center py-8 text-muted-foreground">
                <Camera className="w-10 h-10 mx-auto mb-2 opacity-30" />
                <p className="text-sm">No photos available yet</p>
              </div>}
          </DialogContent>
        </Dialog>

        {/* Floating Chat Button */}
        <motion.button onClick={() => navigate('/engineer-chat')} initial={{
        y: 20,
        opacity: 0
      }} animate={{
        y: 0,
        opacity: 1
      }} whileHover={{
        scale: 1.05
      }} whileTap={{
        scale: 0.95
      }} className="fixed bottom-24 lg:bottom-8 right-4 sm:right-6 z-50 flex items-center gap-2 px-4 py-3 bg-charcoal text-white rounded-full shadow-xl">
          <MessageCircle className="w-5 h-5" />
          <span className="text-sm font-medium hidden sm:inline">Chat with Engineer</span>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
        </motion.button>
      </div>
    </DashboardLayout>;
};
export default ProjectJourney;