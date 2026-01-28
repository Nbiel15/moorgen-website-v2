import { motion } from "framer-motion";
import { HardHat, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Worker {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  status: "active" | "break" | "completed";
  checkInTime: string;
}

const workers: Worker[] = [
  {
    id: "1",
    name: "Made Wirawan",
    role: "Electrical Lead",
    status: "active",
    checkInTime: "07:30",
  },
  {
    id: "2",
    name: "Kadek Surya",
    role: "Smart Panel Tech",
    status: "active",
    checkInTime: "08:00",
  },
  {
    id: "3",
    name: "Nyoman Arta",
    role: "Network Installer",
    status: "break",
    checkInTime: "07:45",
  },
];

const OnSiteWorker = () => {
  const activeCount = workers.filter((w) => w.status === "active").length;

  const getStatusBadge = (status: Worker["status"]) => {
    switch (status) {
      case "active":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-500/10 text-emerald-600 text-[9px] sm:text-[10px] font-medium rounded-full">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            On Site
          </span>
        );
      case "break":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-500/10 text-amber-600 text-[9px] sm:text-[10px] font-medium rounded-full">
            <Clock className="w-2.5 h-2.5" />
            Break
          </span>
        );
      case "completed":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-charcoal/10 text-charcoal/60 text-[9px] sm:text-[10px] font-medium rounded-full">
            <CheckCircle2 className="w-2.5 h-2.5" />
            Done
          </span>
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15 }}
      className="bg-white/80 backdrop-blur-md rounded-2xl md:rounded-3xl p-4 sm:p-5 md:p-6 border border-border/50 shadow-[0_8px_40px_rgba(0,0,0,0.06)]"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-charcoal/10 to-charcoal/5 flex items-center justify-center">
            <HardHat className="w-4 h-4 text-charcoal/70" />
          </div>
          <div>
            <h3 className="font-serif text-base sm:text-lg text-charcoal">On-Site Workers</h3>
            <p className="text-[10px] sm:text-xs text-charcoal/50">
              {activeCount} of {workers.length} currently active
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1 text-[10px] sm:text-xs text-charcoal/40">
          <Clock className="w-3 h-3" />
          <span>Live</span>
        </div>
      </div>

      {/* Worker List */}
      <div className="space-y-2 sm:space-y-3">
        {workers.map((worker, index) => (
          <motion.div
            key={worker.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            className="flex items-center gap-3 p-2.5 sm:p-3 rounded-xl bg-white/50 border border-border/30 hover:border-champagne-gold/30 transition-colors"
          >
            <Avatar className="w-9 h-9 sm:w-10 sm:h-10 border border-border">
              <AvatarImage src={worker.avatar} alt={worker.name} />
              <AvatarFallback className="bg-gradient-to-br from-charcoal/10 to-charcoal/5 text-charcoal/70 text-xs font-medium">
                {worker.name.split(" ").map((n) => n[0]).join("")}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="text-sm font-medium text-charcoal truncate">{worker.name}</h4>
                {getStatusBadge(worker.status)}
              </div>
              <p className="text-[10px] sm:text-xs text-charcoal/50 mt-0.5">
                {worker.role} • Check-in {worker.checkInTime}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default OnSiteWorker;
