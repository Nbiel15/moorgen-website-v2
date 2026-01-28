import { motion } from "framer-motion";
import { TrendingUp, Calendar, Target, Clock } from "lucide-react";

interface ProgressMetric {
  label: string;
  value: string;
  subLabel: string;
  icon: React.ReactNode;
  color: "gold" | "charcoal" | "emerald";
}

const metrics: ProgressMetric[] = [
  {
    label: "Overall Progress",
    value: "68%",
    subLabel: "On schedule",
    icon: <TrendingUp className="w-4 h-4" />,
    color: "gold",
  },
  {
    label: "Days Remaining",
    value: "42",
    subLabel: "Est. completion",
    icon: <Calendar className="w-4 h-4" />,
    color: "charcoal",
  },
  {
    label: "Milestones Done",
    value: "3/5",
    subLabel: "Phases completed",
    icon: <Target className="w-4 h-4" />,
    color: "emerald",
  },
  {
    label: "Work Hours",
    value: "240",
    subLabel: "Total logged",
    icon: <Clock className="w-4 h-4" />,
    color: "charcoal",
  },
];

const OverallProgressSummary = () => {
  const getColorClasses = (color: ProgressMetric["color"]) => {
    switch (color) {
      case "gold":
        return {
          bg: "from-champagne-gold/20 to-champagne-gold/5",
          text: "text-champagne-gold",
          border: "border-champagne-gold/30",
        };
      case "emerald":
        return {
          bg: "from-emerald-500/10 to-emerald-500/5",
          text: "text-emerald-600",
          border: "border-emerald-500/20",
        };
      case "charcoal":
      default:
        return {
          bg: "from-charcoal/10 to-charcoal/5",
          text: "text-charcoal/80",
          border: "border-border",
        };
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.25 }}
      className="bg-white/80 backdrop-blur-md rounded-2xl md:rounded-3xl p-4 sm:p-5 md:p-6 border border-border/50 shadow-[0_8px_40px_rgba(0,0,0,0.06)]"
    >
      {/* Header */}
      <div className="flex items-center gap-2.5 mb-4 sm:mb-5">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-charcoal/10 to-charcoal/5 flex items-center justify-center">
          <TrendingUp className="w-4 h-4 text-charcoal/70" />
        </div>
        <h3 className="font-serif text-base sm:text-lg text-charcoal">Project Overview</h3>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
        {metrics.map((metric, index) => {
          const colors = getColorClasses(metric.color);

          return (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.08 }}
              className={`relative p-3 sm:p-4 rounded-xl bg-gradient-to-br ${colors.bg} border ${colors.border} overflow-hidden group hover:shadow-md transition-shadow`}
            >
              {/* Icon */}
              <div className={`${colors.text} mb-2 opacity-70`}>{metric.icon}</div>

              {/* Value */}
              <p className="font-serif text-xl sm:text-2xl lg:text-3xl text-charcoal mb-0.5">
                {metric.value}
              </p>

              {/* Label */}
              <p className="text-[10px] sm:text-xs text-charcoal/70 font-medium">{metric.label}</p>
              <p className="text-[9px] sm:text-[10px] text-charcoal/40 mt-0.5">{metric.subLabel}</p>

              {/* Decorative element */}
              <div className="absolute -right-2 -bottom-2 w-12 h-12 rounded-full bg-gradient-to-tl from-white/40 to-transparent opacity-50" />
            </motion.div>
          );
        })}
      </div>

      {/* Progress Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-4 sm:mt-5 pt-4 sm:pt-5 border-t border-border/30"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-charcoal/60">Installation Progress</span>
          <span className="text-xs font-medium text-champagne-gold">68%</span>
        </div>
        <div className="h-2 bg-charcoal/5 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "68%" }}
            transition={{ duration: 1.2, delay: 0.7, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-champagne-gold via-amber-400 to-champagne-gold rounded-full relative"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default OverallProgressSummary;
