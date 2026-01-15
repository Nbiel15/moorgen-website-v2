import { useState } from "react";
import { Check, Clock, AlertCircle, Image, Send, Paperclip, Users, Calendar, Activity, Target, ChevronDown, ChevronUp, Camera } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";

type MilestoneStatus = "completed" | "in-progress" | "pending";

interface Phase {
  id: string;
  title: string;
  targetDate: string;
  status: MilestoneStatus;
  statusDate: string;
  description: string;
  photos: string[];
  approved: boolean;
}

const phases: Phase[] = [
  {
    id: "1",
    title: "Site Analysis",
    targetDate: "15 Aug 2024",
    status: "completed",
    statusDate: "12 Aug 2024",
    description: "Complete electrical survey and smart home infrastructure mapping.",
    photos: [
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400",
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
    ],
    approved: true,
  },
  {
    id: "2",
    title: "Wiring & Infrastructure",
    targetDate: "30 Sep 2024",
    status: "completed",
    statusDate: "30 Sep 2024",
    description: "Installation of all smart home wiring, network cables, and power distribution.",
    photos: [
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
    ],
    approved: true,
  },
  {
    id: "3",
    title: "Device Installation",
    targetDate: "15 Nov 2024",
    status: "in-progress",
    statusDate: "In Progress",
    description: "Installing Moorgen smart panels, sensors, and control units throughout the villa.",
    photos: [
      "https://images.unsplash.com/photo-1558002038-1055907df827?w=400",
    ],
    approved: false,
  },
  {
    id: "4",
    title: "Fine-tuning & Handover",
    targetDate: "20 Dec 2024",
    status: "pending",
    statusDate: "Pending",
    description: "System calibration, scene programming, and final handover to owner.",
    photos: [],
    approved: false,
  },
];

const chatMessages = [
  {
    id: "1",
    sender: "engineer",
    name: "Engineer Wayan",
    message: "The Living Room panels are being configured now. The Milan Series installation is proceeding smoothly.",
    time: "10:30 AM",
    avatar: "W",
  },
  {
    id: "2",
    sender: "user",
    name: "You",
    message: "Excellent! Please send photos once completed.",
    time: "10:45 AM",
    avatar: "A",
  },
];

const ProjectJourney = () => {
  const [selectedPhase, setSelectedPhase] = useState<Phase | null>(null);
  const [approvedPhases, setApprovedPhases] = useState<string[]>(["1", "2"]);
  const [expandedId, setExpandedId] = useState<string | null>("3");
  const [chatInput, setChatInput] = useState("");
  
  const progress = 85;
  const circumference = 2 * Math.PI * 36;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const handleApprove = (phaseId: string) => {
    if (!approvedPhases.includes(phaseId)) {
      setApprovedPhases([...approvedPhases, phaseId]);
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const getStatusStyles = (status: MilestoneStatus) => {
    switch (status) {
      case "completed":
        return {
          bg: "bg-foreground",
          icon: <Check className="w-4 h-4 text-background" />,
          line: "bg-foreground",
        };
      case "in-progress":
        return {
          bg: "bg-[#D4AF37]",
          icon: <div className="w-2 h-2 bg-background rounded-full animate-pulse" />,
          line: "bg-gradient-to-b from-[#D4AF37] to-border",
        };
      case "pending":
        return {
          bg: "bg-background border-2 border-border",
          icon: <div className="w-2 h-2 bg-muted-foreground/30 rounded-full" />,
          line: "bg-border",
        };
    }
  };

  const nextMilestone = phases.find(p => p.status === "in-progress" || p.status === "pending");

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-[#FAFAFA]">
        <div className="flex flex-col lg:flex-row">
          {/* Main Content Area */}
          <div className="flex-1 p-6 lg:p-8">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="font-serif text-3xl lg:text-4xl text-foreground mb-2">Project Journey</h1>
              <p className="font-sans text-muted-foreground">Track your smart home installation progress</p>
            </div>

            {/* Summary Cards Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {/* Card 1: Overall Progress - Obsidian Black */}
              <Card className="bg-foreground text-background border-0 shadow-lg">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-sans text-xs uppercase tracking-wider text-background/60 mb-1">Overall Progress</p>
                      <p className="font-serif text-3xl font-semibold">{progress}%</p>
                      <p className="font-sans text-xs text-[#D4AF37] mt-1">On Track</p>
                    </div>
                    <div className="relative w-16 h-16">
                      <svg className="w-full h-full -rotate-90">
                        <circle
                          cx="32"
                          cy="32"
                          r="28"
                          fill="none"
                          stroke="rgba(255,255,255,0.1)"
                          strokeWidth="4"
                        />
                        <circle
                          cx="32"
                          cy="32"
                          r="28"
                          fill="none"
                          stroke="#D4AF37"
                          strokeWidth="4"
                          strokeLinecap="round"
                          strokeDasharray={2 * Math.PI * 28}
                          strokeDashoffset={2 * Math.PI * 28 - (progress / 100) * 2 * Math.PI * 28}
                          className="transition-all duration-1000 ease-out"
                        />
                      </svg>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Card 2: Handover Countdown */}
              <Card className="bg-card border border-border shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-[#D4AF37]" />
                    </div>
                    <div>
                      <p className="font-sans text-xs uppercase tracking-wider text-muted-foreground mb-1">Handover Countdown</p>
                      <p className="font-serif text-2xl font-semibold text-foreground">45 Days</p>
                      <p className="font-sans text-xs text-muted-foreground mt-1">Target: 20 Dec 2024</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Card 3: Field Team */}
              <Card className="bg-card border border-border shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-foreground/5 flex items-center justify-center">
                      <Users className="w-5 h-5 text-foreground" />
                    </div>
                    <div>
                      <p className="font-sans text-xs uppercase tracking-wider text-muted-foreground mb-1">Field Team</p>
                      <p className="font-serif text-2xl font-semibold text-foreground">3 Engineers</p>
                      <p className="font-sans text-xs text-green-600 mt-1">All Active</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Card 4: System Health */}
              <Card className="bg-card border border-border shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                      <Activity className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-sans text-xs uppercase tracking-wider text-muted-foreground mb-1">System Health</p>
                      <p className="font-serif text-2xl font-semibold text-foreground">Online</p>
                      <p className="font-sans text-xs text-green-600 mt-1">All Systems Operational</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Timeline Section */}
            <div className="bg-card rounded-2xl border border-border shadow-sm p-6 lg:p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="font-serif text-2xl text-foreground">The Journey</h2>
                  <p className="font-sans text-sm text-muted-foreground mt-1">Installation milestones & progress</p>
                </div>
              </div>

              {/* Vertical Timeline */}
              <div className="relative space-y-4">
                {phases.map((phase, index) => {
                  const styles = getStatusStyles(phase.status);
                  const isExpanded = expandedId === phase.id;
                  const isInProgress = phase.status === "in-progress";
                  const isLast = index === phases.length - 1;

                  return (
                    <div key={phase.id} className="relative">
                      {/* Connecting Line */}
                      {!isLast && (
                        <div 
                          className={`absolute left-4 top-10 w-0.5 h-[calc(100%-16px)] ${styles.line}`}
                        />
                      )}

                      {/* Milestone Card */}
                      <div
                        className={`relative rounded-xl border transition-all duration-300 ${
                          isInProgress 
                            ? "border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.1)]" 
                            : "border-border hover:border-muted-foreground/30"
                        }`}
                      >
                        <button
                          onClick={() => toggleExpand(phase.id)}
                          className="w-full flex items-center gap-4 p-4 text-left"
                        >
                          {/* Status Icon */}
                          <div
                            className={`w-8 h-8 rounded-full ${styles.bg} flex items-center justify-center flex-shrink-0`}
                          >
                            {styles.icon}
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 flex-wrap">
                              <h4 className="font-sans font-medium text-foreground">{phase.title}</h4>
                              {isInProgress && (
                                <span className="px-2.5 py-0.5 bg-[#D4AF37]/15 text-[#D4AF37] text-[10px] font-semibold uppercase tracking-wider rounded-full">
                                  In Progress
                                </span>
                              )}
                              {approvedPhases.includes(phase.id) && (
                                <span className="px-2.5 py-0.5 bg-foreground/5 text-foreground text-[10px] font-semibold uppercase tracking-wider rounded-full flex items-center gap-1">
                                  <Check className="w-3 h-3" /> Approved
                                </span>
                              )}
                            </div>
                            <p className="font-sans text-xs text-muted-foreground mt-0.5">
                              Target: {phase.targetDate}
                            </p>
                          </div>

                          {/* Expand Icon */}
                          <div className="flex-shrink-0 text-muted-foreground">
                            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                          </div>
                        </button>

                        {/* Expanded Content */}
                        {isExpanded && (
                          <div className="px-4 pb-4 pt-0">
                            <div className="pl-12 space-y-4">
                              <p className="font-sans text-sm text-muted-foreground">{phase.description}</p>

                              {/* Status Info */}
                              <div className="flex items-center gap-6 text-sm">
                                <div>
                                  <span className="font-sans text-xs uppercase tracking-wider text-muted-foreground">Status</span>
                                  <p className={`font-sans font-medium mt-0.5 ${
                                    phase.status === "completed" ? "text-foreground" :
                                    phase.status === "in-progress" ? "text-[#D4AF37]" :
                                    "text-muted-foreground"
                                  }`}>
                                    {phase.statusDate}
                                  </p>
                                </div>
                              </div>

                              {/* Action Buttons */}
                              <div className="flex flex-wrap gap-3 pt-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="font-sans text-sm gap-2 rounded-lg"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedPhase(phase);
                                  }}
                                  disabled={phase.photos.length === 0}
                                >
                                  <Camera className="w-4 h-4" />
                                  View Field Evidence ({phase.photos.length})
                                </Button>

                                {!approvedPhases.includes(phase.id) && phase.status !== "pending" && (
                                  <Button
                                    size="sm"
                                    className="font-sans text-sm gap-2 bg-foreground text-background hover:bg-foreground/90 rounded-lg"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleApprove(phase.id);
                                    }}
                                  >
                                    <Check className="w-4 h-4" />
                                    Digital Approve
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <aside className="w-full lg:w-80 xl:w-96 border-t lg:border-t-0 lg:border-l border-border bg-card flex flex-col">
            {/* Next Milestone Card */}
            <div className="p-6 border-b border-border">
              <div className="flex items-center gap-2 mb-4">
                <Target className="w-4 h-4 text-[#D4AF37]" />
                <h3 className="font-serif text-lg text-foreground">Next Milestone</h3>
              </div>
              
              {nextMilestone && (
                <div className="bg-[#FAFAFA] rounded-xl p-4 border border-border">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-[#D4AF37] flex items-center justify-center">
                      <div className="w-2 h-2 bg-background rounded-full animate-pulse" />
                    </div>
                    <div>
                      <p className="font-sans font-medium text-foreground text-sm">{nextMilestone.title}</p>
                      <p className="font-sans text-xs text-muted-foreground">{nextMilestone.targetDate}</p>
                    </div>
                  </div>
                  <p className="font-sans text-xs text-muted-foreground">{nextMilestone.description}</p>
                </div>
              )}
            </div>

            {/* Engineer Chat */}
            <div className="flex-1 flex flex-col min-h-[400px]">
              <div className="p-6 border-b border-border">
                <h3 className="font-serif text-lg text-foreground mb-4">Direct Engineer Chat</h3>
                
                {/* Engineer Profile */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-foreground flex items-center justify-center text-background font-sans font-medium text-sm">
                    W
                  </div>
                  <div>
                    <p className="font-sans font-medium text-foreground text-sm">Engineer Wayan</p>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                      <span className="font-sans text-xs text-muted-foreground">Online</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {chatMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex gap-2 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {msg.sender !== "user" && (
                      <div className="w-7 h-7 rounded-full bg-foreground flex items-center justify-center text-background font-sans text-xs flex-shrink-0">
                        {msg.avatar}
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 ${
                        msg.sender === "user"
                          ? "bg-foreground text-background rounded-br-md"
                          : "bg-[#FAFAFA] border border-border text-foreground rounded-bl-md"
                      }`}
                    >
                      <p className="font-sans text-sm leading-relaxed">{msg.message}</p>
                      <p className={`font-sans text-[10px] mt-1.5 ${
                        msg.sender === "user" ? "text-background/50" : "text-muted-foreground"
                      }`}>{msg.time}</p>
                    </div>
                    {msg.sender === "user" && (
                      <div className="w-7 h-7 rounded-full bg-[#D4AF37] flex items-center justify-center text-background font-sans text-xs flex-shrink-0">
                        {msg.avatar}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <div className="p-4 border-t border-border">
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-muted rounded-full transition-colors">
                    <Paperclip className="w-4 h-4 text-muted-foreground" />
                  </button>
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 px-4 py-2.5 bg-[#FAFAFA] border border-border rounded-full font-sans text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/30 focus:border-[#D4AF37]"
                  />
                  <button className="p-2.5 bg-foreground text-background rounded-full hover:bg-foreground/90 transition-colors">
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Photo Gallery Dialog */}
      <Dialog open={!!selectedPhase} onOpenChange={() => setSelectedPhase(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl">
              {selectedPhase?.title} - Field Evidence
            </DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            {selectedPhase?.photos.map((photo, index) => (
              <div key={index} className="aspect-square rounded-xl overflow-hidden border border-border">
                <img
                  src={photo}
                  alt={`${selectedPhase.title} photo ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default ProjectJourney;
