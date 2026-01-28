import { motion } from "framer-motion";
import { Zap, Camera, CheckCircle2, Clock, ArrowUpRight } from "lucide-react";

interface ProgressItem {
  id: string;
  title: string;
  description: string;
  time: string;
  status: "completed" | "in-progress";
  hasPhoto?: boolean;
  photoUrl?: string;
}

const todayItems: ProgressItem[] = [
  {
    id: "1",
    title: "Smart Switch Installation - Master Bedroom",
    description: "6 switch panels installed and configured",
    time: "09:45",
    status: "completed",
    hasPhoto: true,
  },
  {
    id: "2",
    title: "Network Cable Routing - 2nd Floor",
    description: "CAT6 cables routed through ceiling",
    time: "11:30",
    status: "completed",
    hasPhoto: true,
  },
  {
    id: "3",
    title: "Control Panel Mounting - Living Area",
    description: "Main hub installation in progress",
    time: "14:00",
    status: "in-progress",
    hasPhoto: false,
  },
];

const TodayProgress = () => {
  const completedCount = todayItems.filter((item) => item.status === "completed").length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white/80 backdrop-blur-md rounded-2xl md:rounded-3xl p-4 sm:p-5 md:p-6 border border-border/50 shadow-[0_8px_40px_rgba(0,0,0,0.06)]"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="w-8 h-8 rounded-xl bg-gradient-to-br from-champagne-gold/20 to-champagne-gold/5 flex items-center justify-center"
          >
            <Zap className="w-4 h-4 text-champagne-gold" />
          </motion.div>
          <div>
            <h3 className="font-serif text-base sm:text-lg text-charcoal">Today's Progress</h3>
            <p className="text-[10px] sm:text-xs text-charcoal/50">
              {completedCount} of {todayItems.length} tasks completed
            </p>
          </div>
        </div>
        <span className="text-[10px] sm:text-xs text-charcoal/40 bg-charcoal/5 px-2.5 py-1 rounded-full">
          {new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" })}
        </span>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-[18px] sm:left-[22px] top-3 bottom-3 w-px bg-gradient-to-b from-champagne-gold/40 via-border to-border/30" />

        <div className="space-y-3 sm:space-y-4">
          {todayItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 + index * 0.1 }}
              className="relative flex gap-3 sm:gap-4"
            >
              {/* Status Icon */}
              <div className="relative z-10 flex-shrink-0">
                {item.status === "completed" ? (
                  <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-charcoal flex items-center justify-center shadow-lg">
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                ) : (
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-champagne-gold to-amber-500 flex items-center justify-center shadow-lg shadow-champagne-gold/20"
                  >
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </motion.div>
                )}
              </div>

              {/* Content */}
              <div
                className={`flex-1 p-3 sm:p-4 rounded-xl border transition-all ${
                  item.status === "in-progress"
                    ? "bg-gradient-to-r from-champagne-gold/5 to-transparent border-champagne-gold/30 shadow-[0_0_20px_rgba(212,175,55,0.08)]"
                    : "bg-white/50 border-border/30"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h4 className="text-sm font-medium text-charcoal">{item.title}</h4>
                      {item.status === "in-progress" && (
                        <motion.span
                          animate={{ opacity: [1, 0.6, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider text-champagne-gold"
                        >
                          Live
                        </motion.span>
                      )}
                    </div>
                    <p className="text-[10px] sm:text-xs text-charcoal/60">{item.description}</p>
                    <p className="text-[9px] sm:text-[10px] text-charcoal/40 mt-1.5">{item.time}</p>
                  </div>

                  {/* Photo indicator */}
                  {item.hasPhoto && (
                    <button className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-charcoal/5 to-charcoal/10 border border-border/50 flex items-center justify-center hover:border-champagne-gold/50 hover:shadow-md transition-all group">
                      <Camera className="w-4 h-4 text-charcoal/40 group-hover:text-champagne-gold transition-colors" />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default TodayProgress;
