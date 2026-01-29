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
  { id: "1", name: "Made W.", role: "Electrical", status: "active", checkInTime: "07:30" },
  { id: "2", name: "Kadek S.", role: "Panel Tech", status: "active", checkInTime: "08:00" },
  { id: "3", name: "Nyoman A.", role: "Network", status: "break", checkInTime: "07:45" },
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
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <HardHat className="w-4 h-4 text-charcoal/70" />
          <h3 className="font-serif text-sm sm:text-base text-charcoal">Workers</h3>
          <span className="text-[9px] sm:text-[10px] text-charcoal/50">({activeCount}/{workers.length})</span>
        </div>
        <span className="text-[9px] text-emerald-600 flex items-center gap-1">
          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
          Live
        </span>
      </div>

      {/* Worker List - Compact */}
      <div className="space-y-1.5">
        {workers.map((worker, index) => (
          <motion.div
            key={worker.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 + index * 0.05 }}
            className="flex items-center justify-between p-2 rounded-lg bg-white/50 border border-border/30"
          >
            <div className="flex items-center gap-2">
              <Avatar className="w-7 h-7 border border-border">
                <AvatarFallback className="bg-charcoal/5 text-charcoal/70 text-[10px] font-medium">
                  {worker.name.split(" ").map((n) => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-xs font-medium text-charcoal">{worker.name}</p>
                <p className="text-[9px] text-charcoal/50">{worker.role}</p>
              </div>
            </div>
            {getStatusBadge(worker.status)}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default OnSiteWorker;
