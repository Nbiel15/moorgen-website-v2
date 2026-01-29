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
  { id: "1", title: "Switch Install - Master", description: "6 panels done", time: "09:45", status: "completed", hasPhoto: true },
  { id: "2", title: "Cable Routing - 2F", description: "CAT6 complete", time: "11:30", status: "completed", hasPhoto: true },
  { id: "3", title: "Panel Mount - Living", description: "In progress", time: "14:00", status: "in-progress", hasPhoto: false },
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
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-champagne-gold" />
          <h3 className="font-serif text-sm sm:text-base text-charcoal">Today</h3>
          <span className="text-[9px] sm:text-[10px] text-charcoal/50">({completedCount}/{todayItems.length})</span>
        </div>
        <span className="text-[9px] text-charcoal/40">
          {new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" })}
        </span>
      </div>

      {/* Compact Timeline */}
      <div className="space-y-1.5">
        {todayItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 + index * 0.05 }}
            className={`flex items-center gap-2 p-2 rounded-lg border ${
              item.status === "in-progress"
                ? "bg-champagne-gold/5 border-champagne-gold/30"
                : "bg-white/50 border-border/30"
            }`}
          >
            {/* Status Icon */}
            {item.status === "completed" ? (
              <CheckCircle2 className="w-4 h-4 text-charcoal flex-shrink-0" />
            ) : (
              <Clock className="w-4 h-4 text-champagne-gold flex-shrink-0" />
            )}

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <p className="text-xs font-medium text-charcoal truncate">{item.title}</p>
                {item.status === "in-progress" && (
                  <span className="text-[8px] font-semibold text-champagne-gold">LIVE</span>
                )}
              </div>
              <p className="text-[9px] text-charcoal/50">{item.description} • {item.time}</p>
            </div>

            {/* Photo indicator */}
            {item.hasPhoto && (
              <Camera className="w-3.5 h-3.5 text-charcoal/30 flex-shrink-0" />
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default TodayProgress;
