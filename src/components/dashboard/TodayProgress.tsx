import { motion } from "framer-motion";
import { CheckCircle2, Clock } from "lucide-react";

interface ProgressItem {
  id: string;
  title: string;
  time: string;
  status: "completed" | "in-progress";
}

const todayItems: ProgressItem[] = [
  { id: "1", title: "Switch Install", time: "09:45", status: "completed" },
  { id: "2", title: "Cable Routing", time: "11:30", status: "completed" },
  { id: "3", title: "Panel Mount", time: "14:00", status: "in-progress" },
];

const TodayProgress = () => {
  const completedCount = todayItems.filter((item) => item.status === "completed").length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="h-full bg-white/80 backdrop-blur-md rounded-xl p-3 sm:p-4 border border-border/50 shadow-sm"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <p className="text-[8px] sm:text-[9px] text-charcoal/50 uppercase tracking-wider font-medium">
          Today's Tasks
        </p>
        <span className="text-[9px] text-charcoal/40">
          {completedCount}/{todayItems.length}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="h-1.5 bg-charcoal/10 rounded-full mb-3 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${(completedCount / todayItems.length) * 100}%` }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="h-full bg-gradient-to-r from-champagne-gold to-amber-500 rounded-full"
        />
      </div>

      {/* Task List - Minimal */}
      <div className="space-y-1.5">
        {todayItems.map((item) => (
          <div
            key={item.id}
            className={`flex items-center gap-2 text-[10px] ${
              item.status === "in-progress" ? "text-champagne-gold font-medium" : "text-charcoal/60"
            }`}
          >
            {item.status === "completed" ? (
              <CheckCircle2 className="w-3 h-3 text-charcoal/40" />
            ) : (
              <Clock className="w-3 h-3 text-champagne-gold" />
            )}
            <span className="truncate flex-1">{item.title}</span>
            <span className="text-[9px] text-charcoal/40">{item.time}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default TodayProgress;
