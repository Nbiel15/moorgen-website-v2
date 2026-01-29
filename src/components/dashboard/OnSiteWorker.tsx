import { motion } from "framer-motion";
import { Users } from "lucide-react";

interface Worker {
  id: string;
  initials: string;
  status: "active" | "break";
}

const workers: Worker[] = [
  { id: "1", initials: "MW", status: "active" },
  { id: "2", initials: "KS", status: "active" },
  { id: "3", initials: "NA", status: "break" },
];

const OnSiteWorker = () => {
  const activeCount = workers.filter((w) => w.status === "active").length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.05 }}
      className="h-full bg-white/80 backdrop-blur-md rounded-xl p-3 sm:p-4 border border-border/50 shadow-sm"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <p className="text-[8px] sm:text-[9px] text-charcoal/50 uppercase tracking-wider font-medium">
          On-Site Team
        </p>
        <span className="flex items-center gap-1 text-[8px] text-emerald-600">
          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
          Live
        </span>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-lg bg-charcoal/5 flex items-center justify-center">
          <Users className="w-4 h-4 text-charcoal/60" />
        </div>
        <div>
          <p className="text-lg font-serif text-charcoal leading-none">{activeCount}</p>
          <p className="text-[9px] text-charcoal/50">of {workers.length} active</p>
        </div>
      </div>

      {/* Worker Avatars */}
      <div className="flex items-center gap-1">
        {workers.map((worker) => (
          <div
            key={worker.id}
            className={`w-7 h-7 rounded-full flex items-center justify-center text-[9px] font-medium border-2 ${
              worker.status === "active"
                ? "bg-charcoal text-white border-emerald-400"
                : "bg-charcoal/10 text-charcoal/60 border-amber-400"
            }`}
          >
            {worker.initials}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default OnSiteWorker;
