import { motion } from "framer-motion";
import { TrendingUp, Calendar, Target, Clock } from "lucide-react";

const OverallProgressSummary = () => {
  const progressValue = 68;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 sm:p-5 border border-border/40 shadow-sm"
    >
      {/* Header with main progress */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-champagne-gold/20 to-champagne-gold/5 flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-champagne-gold" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-charcoal">Project Overview</h3>
            <p className="text-[10px] text-charcoal/40">Smart Home Installation</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-2xl font-heading text-charcoal">{progressValue}%</p>
            <p className="text-[10px] text-emerald-600 font-medium">On Track</p>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-2 bg-charcoal/5 rounded-full overflow-hidden mb-4">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progressValue}%` }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-champagne-gold to-amber-400 rounded-full relative"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1.5 }}
          />
        </motion.div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3">
        <div className="text-center p-3 rounded-xl bg-charcoal/[0.03] border border-charcoal/5">
          <div className="flex items-center justify-center gap-1 text-charcoal/40 mb-1.5">
            <Calendar className="w-3.5 h-3.5" />
          </div>
          <p className="text-lg font-heading text-charcoal">42</p>
          <p className="text-[10px] text-charcoal/40">Days Left</p>
        </div>
        
        <div className="text-center p-3 rounded-xl bg-charcoal/[0.03] border border-charcoal/5">
          <div className="flex items-center justify-center gap-1 text-charcoal/40 mb-1.5">
            <Target className="w-3.5 h-3.5" />
          </div>
          <p className="text-lg font-heading text-charcoal">3/5</p>
          <p className="text-[10px] text-charcoal/40">Milestones</p>
        </div>
        
        <div className="text-center p-3 rounded-xl bg-charcoal/[0.03] border border-charcoal/5">
          <div className="flex items-center justify-center gap-1 text-charcoal/40 mb-1.5">
            <Clock className="w-3.5 h-3.5" />
          </div>
          <p className="text-lg font-heading text-charcoal">240</p>
          <p className="text-[10px] text-charcoal/40">Hours</p>
        </div>
      </div>
    </motion.div>
  );
};

export default OverallProgressSummary;
