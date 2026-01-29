import { motion } from "framer-motion";
import { Users, CheckCircle2, Clock, Zap, ArrowRight } from "lucide-react";

interface Worker {
  id: string;
  initials: string;
  name: string;
  role: string;
  status: "active" | "break";
  task: string;
}

interface Task {
  id: string;
  title: string;
  time: string;
  status: "completed" | "in-progress" | "upcoming";
}

const workers: Worker[] = [
  { id: "1", initials: "MW", name: "Made Wirawan", role: "Lead Electrician", status: "active", task: "Panel Wiring" },
  { id: "2", initials: "KS", name: "Kadek Surya", role: "Smart Panel Tech", status: "active", task: "Switch Config" },
  { id: "3", initials: "NA", name: "Nyoman Adi", role: "Cable Specialist", status: "break", task: "Break" },
];

const tasks: Task[] = [
  { id: "1", title: "Master Bedroom Switches", time: "08:30", status: "completed" },
  { id: "2", title: "Living Room Panels", time: "10:15", status: "completed" },
  { id: "3", title: "Kitchen Control Unit", time: "14:00", status: "in-progress" },
  { id: "4", title: "Outdoor Lighting Setup", time: "16:30", status: "upcoming" },
];

const QuickStatusPanel = () => {
  const activeWorkers = workers.filter((w) => w.status === "active").length;
  const completedTasks = tasks.filter((t) => t.status === "completed").length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15 }}
      className="space-y-4"
    >
      {/* Team Section - Horizontal Cards */}
      <div className="bg-gradient-to-br from-charcoal to-charcoal/95 rounded-2xl p-5 border border-charcoal/20 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-champagne-gold/20 flex items-center justify-center">
              <Users className="w-4 h-4 text-champagne-gold" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-white">On-Site Team</h3>
              <p className="text-[10px] text-white/50">{activeWorkers} active now</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-[10px] text-emerald-400 font-medium">Live</span>
          </div>
        </div>

        {/* Worker Cards - Horizontal Scroll on Mobile */}
        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1">
          {workers.map((worker, index) => (
            <motion.div
              key={worker.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className={`flex-shrink-0 w-[140px] sm:w-auto sm:flex-1 p-3 rounded-xl border transition-all duration-300 ${
                worker.status === "active"
                  ? "bg-white/10 border-champagne-gold/30 hover:border-champagne-gold/50"
                  : "bg-white/5 border-white/10"
              }`}
            >
              <div className="flex items-center gap-2.5 mb-2">
                <div className="relative">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold ${
                      worker.status === "active"
                        ? "bg-champagne-gold text-charcoal"
                        : "bg-white/20 text-white/60"
                    }`}
                  >
                    {worker.initials}
                  </div>
                  <div
                    className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-charcoal ${
                      worker.status === "active" ? "bg-emerald-400" : "bg-amber-400"
                    }`}
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-white truncate">{worker.name}</p>
                  <p className="text-[10px] text-white/40 truncate">{worker.role}</p>
                </div>
              </div>
              <div className={`text-[10px] px-2 py-1 rounded-md text-center ${
                worker.status === "active"
                  ? "bg-champagne-gold/20 text-champagne-gold"
                  : "bg-white/10 text-white/50"
              }`}>
                {worker.task}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Today's Activity - Timeline Style */}
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-5 border border-border/40 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-champagne-gold/20 to-champagne-gold/5 flex items-center justify-center">
              <Zap className="w-4 h-4 text-champagne-gold" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-charcoal">Today's Activity</h3>
              <p className="text-[10px] text-charcoal/40">{completedTasks} of {tasks.length} completed</p>
            </div>
          </div>
          <button className="flex items-center gap-1 text-[10px] text-champagne-gold hover:text-champagne-gold-dark transition-colors">
            View All
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-[18px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-emerald-400 via-champagne-gold to-charcoal/20 rounded-full" />

          <div className="space-y-3">
            {tasks.map((task, index) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className={`relative flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${
                  task.status === "in-progress"
                    ? "bg-champagne-gold/10 border border-champagne-gold/30"
                    : task.status === "completed"
                    ? "bg-charcoal/[0.02]"
                    : "bg-transparent"
                }`}
              >
                {/* Status Icon */}
                <div
                  className={`relative z-10 w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                    task.status === "completed"
                      ? "bg-emerald-100 text-emerald-600"
                      : task.status === "in-progress"
                      ? "bg-champagne-gold text-white shadow-lg shadow-champagne-gold/30"
                      : "bg-charcoal/10 text-charcoal/40"
                  }`}
                >
                  {task.status === "completed" ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : task.status === "in-progress" ? (
                    <Zap className="w-4 h-4" />
                  ) : (
                    <Clock className="w-4 h-4" />
                  )}
                </div>

                {/* Task Info */}
                <div className="flex-1 min-w-0">
                  <p
                    className={`text-sm font-medium truncate ${
                      task.status === "completed"
                        ? "text-charcoal/60"
                        : task.status === "in-progress"
                        ? "text-charcoal"
                        : "text-charcoal/40"
                    }`}
                  >
                    {task.title}
                  </p>
                  <p className="text-[10px] text-charcoal/40">{task.time}</p>
                </div>

                {/* Status Badge */}
                <div
                  className={`text-[9px] font-medium px-2 py-1 rounded-full shrink-0 ${
                    task.status === "completed"
                      ? "bg-emerald-100 text-emerald-700"
                      : task.status === "in-progress"
                      ? "bg-champagne-gold/20 text-champagne-gold-dark"
                      : "bg-charcoal/5 text-charcoal/40"
                  }`}
                >
                  {task.status === "completed"
                    ? "Done"
                    : task.status === "in-progress"
                    ? "In Progress"
                    : "Upcoming"}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default QuickStatusPanel;
