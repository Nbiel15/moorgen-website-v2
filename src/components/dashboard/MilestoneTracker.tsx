import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronDown, ChevronUp, Camera, Calendar, ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

type MilestoneStatus = "completed" | "in-progress" | "upcoming";

interface Milestone {
  id: string;
  title: string;
  status: MilestoneStatus;
  date: string;
  description: string;
  photos: { id: number; label: string }[];
  progress?: number;
}

const milestones: Milestone[] = [
  {
    id: "site-analysis",
    title: "Site Analysis",
    status: "completed",
    date: "Oct 2024",
    description: "Complete property assessment and smart home planning.",
    photos: [
      { id: 1, label: "Site Survey" },
      { id: 2, label: "Electrical Mapping" },
    ],
    progress: 100,
  },
  {
    id: "wiring",
    title: "Wiring & Infrastructure",
    status: "completed",
    date: "Nov 2024",
    description: "Installation of backbone wiring and network infrastructure.",
    photos: [
      { id: 1, label: "Cable Routing" },
      { id: 2, label: "Panel Setup" },
      { id: 3, label: "Network Hub" },
    ],
    progress: 100,
  },
  {
    id: "device-installation",
    title: "Device Installation",
    status: "in-progress",
    date: "Dec 2024 - Jan 2025",
    description: "Installing smart switches, sensors, and control panels throughout the villa.",
    photos: [
      { id: 1, label: "Smart Switches" },
      { id: 2, label: "Sensor Placement" },
    ],
    progress: 65,
  },
  {
    id: "fine-tuning",
    title: "Fine-tuning & Handover",
    status: "upcoming",
    date: "Feb 2025",
    description: "System optimization, testing, and final handover to owner.",
    photos: [],
    progress: 0,
  },
];

const MilestoneTracker = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const inProgressRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (inProgressRef.current && containerRef.current) {
      const container = containerRef.current;
      const element = inProgressRef.current;
      const offset = element.offsetTop - container.offsetTop - 20;
      container.scrollTo({ top: offset, behavior: "smooth" });
    }
  }, []);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const getStatusStyles = (status: MilestoneStatus) => {
    switch (status) {
      case "completed":
        return {
          border: "border-green-500/30",
          bg: "bg-gradient-to-br from-green-500 to-emerald-600",
          iconBg: "bg-green-500/10",
          icon: <Check className="w-4 h-4 text-white" />,
        };
      case "in-progress":
        return {
          border: "border-champagne-gold",
          bg: "bg-gradient-to-br from-champagne-gold to-amber-500",
          iconBg: "bg-champagne-gold/10",
          icon: <motion.div 
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-2 h-2 bg-white rounded-full" 
          />,
        };
      case "upcoming":
        return {
          border: "border-border",
          bg: "bg-gradient-to-br from-gray-200 to-gray-300",
          iconBg: "bg-gray-100",
          icon: <div className="w-2 h-2 bg-gray-400 rounded-full" />,
        };
    }
  };

  const completedCount = milestones.filter(m => m.status === "completed").length;
  const totalCount = milestones.length;
  const overallProgress = Math.round((completedCount / totalCount) * 100);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="bg-white/80 backdrop-blur-md rounded-2xl md:rounded-3xl p-5 sm:p-6 border border-border/50 shadow-[0_8px_40px_rgba(0,0,0,0.06)]"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 md:mb-6">
        <div className="flex items-center gap-3">
          <motion.div 
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="w-8 h-8 rounded-xl bg-gradient-to-br from-champagne-gold/20 to-champagne-gold/5 flex items-center justify-center"
          >
            <Calendar className="w-4 h-4 text-champagne-gold" />
          </motion.div>
          <h3 className="font-serif text-lg md:text-xl text-charcoal">Project Journey</h3>
        </div>
        
        {/* Progress indicator */}
        <div className="flex items-center gap-3">
          <div className="flex-1 sm:w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${overallProgress}%` }}
              transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-champagne-gold to-amber-400 rounded-full"
            />
          </div>
          <span className="text-xs font-medium text-charcoal/60">{overallProgress}%</span>
        </div>
      </div>

      {/* Milestones */}
      <div
        ref={containerRef}
        className="max-h-[350px] sm:max-h-[400px] overflow-y-auto pr-2 space-y-2 sm:space-y-3 scrollbar-hide"
      >
        {milestones.map((milestone, index) => {
          const styles = getStatusStyles(milestone.status);
          const isExpanded = expandedId === milestone.id;
          const isInProgress = milestone.status === "in-progress";

          return (
            <motion.div
              key={milestone.id}
              ref={isInProgress ? inProgressRef : null}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
              className={`rounded-xl md:rounded-2xl border ${styles.border} transition-all duration-300 overflow-hidden ${
                isInProgress ? "shadow-[0_0_30px_rgba(212,175,55,0.15)] bg-gradient-to-r from-champagne-gold/5 to-transparent" : "bg-white/50"
              }`}
            >
              <button
                onClick={() => toggleExpand(milestone.id)}
                className="w-full flex items-center gap-3 sm:gap-4 p-3 sm:p-4 text-left hover:bg-white/50 transition-colors"
              >
                {/* Status Icon */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full ${styles.bg} flex items-center justify-center flex-shrink-0 shadow-lg`}
                >
                  {styles.icon}
                </motion.div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-medium text-sm sm:text-base text-charcoal truncate">{milestone.title}</h4>
                    {isInProgress && (
                      <motion.span 
                        animate={{ opacity: [1, 0.7, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="px-2 py-0.5 bg-champagne-gold/20 text-champagne-gold text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider rounded-full flex items-center gap-1"
                      >
                        <Sparkles className="w-2.5 h-2.5" />
                        In Progress
                      </motion.span>
                    )}
                  </div>
                  <p className="text-[10px] sm:text-xs text-charcoal/50 mt-0.5">{milestone.date}</p>
                  
                  {/* Progress bar for in-progress */}
                  {isInProgress && milestone.progress && (
                    <div className="mt-2 w-full max-w-[200px]">
                      <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${milestone.progress}%` }}
                          transition={{ duration: 1, delay: 0.3 }}
                          className="h-full bg-gradient-to-r from-champagne-gold to-amber-400 rounded-full"
                        />
                      </div>
                      <p className="text-[9px] text-champagne-gold mt-1">{milestone.progress}% complete</p>
                    </div>
                  )}
                </div>

                {/* Expand Icon */}
                <motion.div 
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0 text-charcoal/30"
                >
                  <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
                </motion.div>
              </button>

              {/* Expanded Content */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-3 sm:px-4 pb-3 sm:pb-4 pt-0">
                      <div className="pl-11 sm:pl-14">
                        <p className="text-xs sm:text-sm text-charcoal/70 mb-4">{milestone.description}</p>

                        {milestone.photos.length > 0 ? (
                          <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-hide">
                            {milestone.photos.map((photo, photoIndex) => (
                              <motion.div
                                key={photo.id}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: photoIndex * 0.1 }}
                                className="flex-shrink-0 w-20 sm:w-24 group cursor-pointer"
                              >
                                <div className="aspect-square rounded-lg sm:rounded-xl bg-gradient-to-br from-charcoal/5 to-charcoal/10 border border-border flex items-center justify-center group-hover:border-champagne-gold/50 group-hover:shadow-lg transition-all duration-300">
                                  <Camera className="w-5 h-5 sm:w-6 sm:h-6 text-charcoal/30 group-hover:text-champagne-gold transition-colors" />
                                </div>
                                <p className="text-[9px] sm:text-[10px] text-charcoal/50 text-center mt-1 truncate">
                                  {photo.label}
                                </p>
                              </motion.div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-xs text-charcoal/40 italic">
                            Photos will be added when this phase begins.
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* View More Link */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-4 sm:mt-5 pt-3 sm:pt-4 border-t border-border/50 flex justify-end"
      >
        <Link
          to="/progress"
          className="group flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-champagne-gold hover:text-charcoal transition-colors duration-300"
        >
          <span>View Full Journey</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default MilestoneTracker;
