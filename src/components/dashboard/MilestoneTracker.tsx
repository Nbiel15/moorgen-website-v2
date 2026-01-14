import { useState, useEffect, useRef } from "react";
import { Check, ChevronDown, ChevronUp, Camera } from "lucide-react";
import { Link } from "react-router-dom";

type MilestoneStatus = "completed" | "in-progress" | "upcoming";

interface Milestone {
  id: string;
  title: string;
  status: MilestoneStatus;
  date: string;
  description: string;
  photos: { id: number; label: string }[];
}

const milestones: Milestone[] = [
  {
    id: "site-analysis",
    title: "Site Analysis",
    status: "completed",
    date: "Oct 2024",
    description: "Complete property assessment and smart home planning.",
    photos: [
      { id: 1, label: "Site Survey" },
      { id: 2, label: "Electrical Mapping" },
    ],
  },
  {
    id: "wiring",
    title: "Wiring & Infrastructure",
    status: "completed",
    date: "Nov 2024",
    description: "Installation of backbone wiring and network infrastructure.",
    photos: [
      { id: 1, label: "Cable Routing" },
      { id: 2, label: "Panel Setup" },
      { id: 3, label: "Network Hub" },
    ],
  },
  {
    id: "device-installation",
    title: "Device Installation",
    status: "in-progress",
    date: "Dec 2024 - Jan 2025",
    description: "Installing smart switches, sensors, and control panels throughout the villa.",
    photos: [
      { id: 1, label: "Smart Switches" },
      { id: 2, label: "Sensor Placement" },
    ],
  },
  {
    id: "fine-tuning",
    title: "Fine-tuning & Handover",
    status: "upcoming",
    date: "Feb 2025",
    description: "System optimization, testing, and final handover to owner.",
    photos: [],
  },
];

const MilestoneTracker = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const inProgressRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Auto-scroll to in-progress item
    if (inProgressRef.current && containerRef.current) {
      const container = containerRef.current;
      const element = inProgressRef.current;
      const offset = element.offsetTop - container.offsetTop - 20;
      container.scrollTo({ top: offset, behavior: "smooth" });
    }
  }, []);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const getStatusStyles = (status: MilestoneStatus) => {
    switch (status) {
      case "completed":
        return {
          border: "border-[#E5E5E5]",
          bg: "bg-charcoal",
          icon: <Check className="w-4 h-4 text-white" />,
        };
      case "in-progress":
        return {
          border: "border-champagne-gold border-2",
          bg: "bg-champagne-gold/20",
          icon: <div className="w-2 h-2 bg-champagne-gold rounded-full animate-pulse" />,
        };
      case "upcoming":
        return {
          border: "border-[#E5E5E5]",
          bg: "bg-white",
          icon: <div className="w-2 h-2 bg-charcoal/20 rounded-full" />,
        };
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 border border-[#E5E5E5] shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-serif text-xl text-charcoal">Project Milestone Tracker</h3>
      </div>

      <div
        ref={containerRef}
        className="max-h-[400px] overflow-y-auto pr-2 space-y-3 scrollbar-hide"
      >
        {milestones.map((milestone, index) => {
          const styles = getStatusStyles(milestone.status);
          const isExpanded = expandedId === milestone.id;
          const isInProgress = milestone.status === "in-progress";

          return (
            <div
              key={milestone.id}
              ref={isInProgress ? inProgressRef : null}
              className={`rounded-2xl ${styles.border} transition-all duration-300 ${
                isInProgress ? "shadow-[0_0_20px_rgba(212,175,55,0.15)]" : ""
              }`}
            >
              <button
                onClick={() => toggleExpand(milestone.id)}
                className="w-full flex items-center gap-4 p-4 text-left"
              >
                {/* Status Icon */}
                <div
                  className={`w-8 h-8 rounded-full ${styles.bg} flex items-center justify-center flex-shrink-0 ${
                    milestone.status !== "completed" ? "border border-[#E5E5E5]" : ""
                  }`}
                >
                  {styles.icon}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium text-charcoal truncate">{milestone.title}</h4>
                    {isInProgress && (
                      <span className="px-2 py-0.5 bg-champagne-gold/20 text-champagne-gold text-[10px] font-semibold uppercase tracking-wider rounded-full">
                        In Progress
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-charcoal/50 mt-0.5">{milestone.date}</p>
                </div>

                {/* Expand Icon */}
                <div className="flex-shrink-0 text-charcoal/30">
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </div>
              </button>

              {/* Expanded Content */}
              {isExpanded && (
                <div className="px-4 pb-4 pt-0">
                  <div className="pl-12">
                    <p className="text-sm text-charcoal/70 mb-4">{milestone.description}</p>

                    {milestone.photos.length > 0 ? (
                      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                        {milestone.photos.map((photo) => (
                          <div
                            key={photo.id}
                            className="flex-shrink-0 w-24 group cursor-pointer"
                          >
                            <div className="aspect-square rounded-xl bg-gradient-to-br from-charcoal/5 to-charcoal/10 border border-[#E5E5E5] flex items-center justify-center group-hover:border-champagne-gold/50 transition-colors">
                              <Camera className="w-6 h-6 text-charcoal/30 group-hover:text-champagne-gold transition-colors" />
                            </div>
                            <p className="text-[10px] text-charcoal/50 text-center mt-1 truncate">
                              {photo.label}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-charcoal/40 italic">
                        Photos will be added when this phase begins.
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* View More Link */}
      <div className="mt-5 pt-4 border-t border-[#E5E5E5] text-right">
        <Link
          to="/progress"
          className="inline-block text-xs uppercase tracking-[0.15em] text-champagne-gold hover:text-charcoal transition-colors duration-300 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-px after:bg-current after:scale-x-0 after:origin-right hover:after:scale-x-100 hover:after:origin-left after:transition-transform after:duration-300"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          View More
        </Link>
      </div>

      {/* Timeline connector */}
      <div className="absolute left-10 top-20 bottom-8 w-px bg-gradient-to-b from-charcoal/20 via-champagne-gold/50 to-charcoal/10 hidden" />
    </div>
  );
};

export default MilestoneTracker;
