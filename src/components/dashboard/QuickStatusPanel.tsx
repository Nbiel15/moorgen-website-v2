import { motion } from "framer-motion";
import { Users, CheckCircle2, Clock, Zap } from "lucide-react";

interface Worker {
  id: string;
  initials: string;
  name: string;
  status: "active" | "break";
}

interface Task {
  id: string;
  title: string;
  status: "completed" | "in-progress";
}

const workers: Worker[] = [
  { id: "1", initials: "MW", name: "Made", status: "active" },
  { id: "2", initials: "KS", name: "Kadek", status: "active" },
  { id: "3", initials: "NA", name: "Nyoman", status: "break" },
];

const tasks: Task[] = [
  { id: "1", title: "Switch Installation", status: "completed" },
  { id: "2", title: "Cable Routing", status: "completed" },
  { id: "3", title: "Panel Mounting", status: "in-progress" },
];

const QuickStatusPanel = () => {
  const activeWorkers = workers.filter((w) => w.status === "active").length;
  const completedTasks = tasks.filter((t) => t.status === "completed").length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15 }}
      className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 sm:p-5 border border-border/40 shadow-sm"
    >
      {/* Two column layout */}
      <div className="grid grid-cols-2 gap-4">
        {/* Left: Workers */}
        <div>
          <div className="flex items-center gap-1.5 mb-3">
            <Users className="w-3.5 h-3.5 text-charcoal/50" />
            <span className="text-[9px] text-charcoal/50 uppercase tracking-wider">Team</span>
            <span className="ml-auto flex items-center gap-1 text-[8px] text-emerald-600">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              Live
            </span>
          </div>
          
          {/* Worker avatars with status */}
          <div className="flex -space-x-2">
            {workers.map((worker, index) => (
              <motion.div
                key={worker.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + index * 0.05 }}
                className="relative"
                title={worker.name}
              >
                <div
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-[10px] font-medium border-2 border-white shadow-sm ${
                    worker.status === "active"
                      ? "bg-charcoal text-white"
                      : "bg-charcoal/20 text-charcoal/60"
                  }`}
                >
                  {worker.initials}
                </div>
                <div
                  className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${
                    worker.status === "active" ? "bg-emerald-500" : "bg-amber-400"
                  }`}
                />
              </motion.div>
            ))}
          </div>
          
          <p className="text-[10px] text-charcoal/40 mt-2">
            {activeWorkers} of {workers.length} on site
          </p>
        </div>

        {/* Right: Today's Tasks */}
        <div>
          <div className="flex items-center gap-1.5 mb-3">
            <Zap className="w-3.5 h-3.5 text-champagne-gold" />
            <span className="text-[9px] text-charcoal/50 uppercase tracking-wider">Today</span>
            <span className="ml-auto text-[10px] text-champagne-gold font-medium">
              {completedTasks}/{tasks.length}
            </span>
          </div>
          
          {/* Task list mini */}
          <div className="space-y-1.5">
            {tasks.map((task) => (
              <div
                key={task.id}
                className={`flex items-center gap-2 ${
                  task.status === "in-progress" ? "text-champagne-gold" : "text-charcoal/50"
                }`}
              >
                {task.status === "completed" ? (
                  <CheckCircle2 className="w-3.5 h-3.5" />
                ) : (
                  <Clock className="w-3.5 h-3.5" />
                )}
                <span className={`text-[10px] sm:text-[11px] truncate ${
                  task.status === "in-progress" ? "font-medium" : ""
                }`}>
                  {task.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default QuickStatusPanel;
