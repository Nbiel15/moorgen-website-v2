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

// Right Sidebar Component
const RightSidebar = () => {
  const [chatInput, setChatInput] = useState("");
  const nextMilestone = phases.find(p => p.status === "in-progress" || p.status === "pending");

  return (
    <aside className="hidden xl:flex w-80 flex-col border-l border-border bg-card">
      {/* Next Milestone Card */}
      <div className="p-5 border-b border-border">
        <div className="flex items-center gap-2 mb-4">
          <Target className="w-4 h-4 text-[#D4AF37]" />
          <h3 className="font-serif text-base text-foreground">Next Milestone</h3>
        </div>
        
        {nextMilestone && (
          <div className="bg-muted/50 rounded-xl p-4 border border-border">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-7 h-7 rounded-full bg-[#D4AF37] flex items-center justify-center">
                <div className="w-2 h-2 bg-background rounded-full animate-pulse" />
              </div>
              <div>
                <p className="font-sans font-medium text-foreground text-sm">{nextMilestone.title}</p>
                <p className="font-sans text-xs text-muted-foreground">{nextMilestone.targetDate}</p>
              </div>
            </div>
            <p className="font-sans text-xs text-muted-foreground leading-relaxed">{nextMilestone.description}</p>
          </div>
        )}
      </div>

      {/* Engineer Chat */}
      <div className="flex-1 flex flex-col min-h-0">
        <div className="p-5 border-b border-border">
          <h3 className="font-serif text-base text-foreground mb-3">Direct Engineer Chat</h3>
          
          {/* Engineer Profile */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-foreground flex items-center justify-center text-background font-sans font-medium text-sm">
              W
            </div>
            <div>
              <p className="font-sans font-medium text-foreground text-sm">Engineer Wayan</p>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
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
                <div className="w-6 h-6 rounded-full bg-foreground flex items-center justify-center text-background font-sans text-[10px] flex-shrink-0 mt-1">
                  {msg.avatar}
                </div>
              )}
              <div
                className={`max-w-[85%] rounded-2xl px-3 py-2 ${
                  msg.sender === "user"
                    ? "bg-foreground text-background rounded-br-sm"
                    : "bg-muted border border-border text-foreground rounded-bl-sm"
                }`}
              >
                <p className="font-sans text-xs leading-relaxed">{msg.message}</p>
                <p className={`font-sans text-[10px] mt-1 ${
                  msg.sender === "user" ? "text-background/50" : "text-muted-foreground"
                }`}>{msg.time}</p>
              </div>
              {msg.sender === "user" && (
                <div className="w-6 h-6 rounded-full bg-[#D4AF37] flex items-center justify-center text-background font-sans text-[10px] flex-shrink-0 mt-1">
                  {msg.avatar}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Chat Input */}
        <div className="p-3 border-t border-border">
          <div className="flex items-center gap-2">
            <button className="p-1.5 hover:bg-muted rounded-full transition-colors">
              <Paperclip className="w-4 h-4 text-muted-foreground" />
            </button>
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 px-3 py-2 bg-muted border border-border rounded-full font-sans text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37]"
            />
            <button className="p-2 bg-foreground text-background rounded-full hover:bg-foreground/90 transition-colors">
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

const ProjectJourney = () => {
  const [selectedPhase, setSelectedPhase] = useState<Phase | null>(null);
  const [approvedPhases, setApprovedPhases] = useState<string[]>(["1", "2"]);
  const [expandedId, setExpandedId] = useState<string | null>("3");
  
  const progress = 85;

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
          icon: <Check className="w-3.5 h-3.5 text-background" />,
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

  return (
    <DashboardLayout showRightPanel rightPanel={<RightSidebar />}>
      <div className="p-4 lg:p-6 xl:p-8 max-w-5xl">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="font-serif text-2xl lg:text-3xl text-foreground mb-1">Project Journey</h1>
          <p className="font-sans text-sm text-muted-foreground">Track your smart home installation progress</p>
        </div>

        {/* Summary Cards Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mb-6">
          {/* Card 1: Overall Progress - Obsidian Black */}
          <Card className="bg-foreground text-background border-0 shadow-md col-span-2 lg:col-span-1">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-sans text-[10px] uppercase tracking-wider text-background/60 mb-0.5">Overall Progress</p>
                  <p className="font-serif text-2xl lg:text-3xl font-semibold">{progress}%</p>
                  <p className="font-sans text-xs text-[#D4AF37] mt-0.5">On Track</p>
                </div>
                <div className="relative w-14 h-14">
                  <svg className="w-full h-full -rotate-90">
                    <circle cx="28" cy="28" r="24" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="4" />
                    <circle
                      cx="28" cy="28" r="24" fill="none" stroke="#D4AF37" strokeWidth="4" strokeLinecap="round"
                      strokeDasharray={2 * Math.PI * 24}
                      strokeDashoffset={2 * Math.PI * 24 - (progress / 100) * 2 * Math.PI * 24}
                      className="transition-all duration-1000 ease-out"
                    />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Card 2: Handover Countdown */}
          <Card className="bg-card border border-border shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-4 h-4 text-[#D4AF37]" />
                </div>
                <div className="min-w-0">
                  <p className="font-sans text-[10px] uppercase tracking-wider text-muted-foreground">Countdown</p>
                  <p className="font-serif text-xl font-semibold text-foreground">45 Days</p>
                  <p className="font-sans text-[10px] text-muted-foreground truncate">20 Dec 2024</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Card 3: Field Team */}
          <Card className="bg-card border border-border shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-foreground/5 flex items-center justify-center flex-shrink-0">
                  <Users className="w-4 h-4 text-foreground" />
                </div>
                <div className="min-w-0">
                  <p className="font-sans text-[10px] uppercase tracking-wider text-muted-foreground">Field Team</p>
                  <p className="font-serif text-xl font-semibold text-foreground">3 Active</p>
                  <p className="font-sans text-[10px] text-green-600">Engineers</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Card 4: System Health */}
          <Card className="bg-card border border-border shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-green-500/10 flex items-center justify-center flex-shrink-0">
                  <Activity className="w-4 h-4 text-green-600" />
                </div>
                <div className="min-w-0">
                  <p className="font-sans text-[10px] uppercase tracking-wider text-muted-foreground">System</p>
                  <p className="font-serif text-xl font-semibold text-foreground">Online</p>
                  <p className="font-sans text-[10px] text-green-600">All OK</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Timeline Section */}
        <Card className="border border-border shadow-sm">
          <CardContent className="p-4 lg:p-6">
            <div className="mb-6">
              <h2 className="font-serif text-xl text-foreground">The Journey</h2>
              <p className="font-sans text-xs text-muted-foreground mt-0.5">Installation milestones & progress</p>
            </div>

            {/* Vertical Timeline */}
            <div className="relative space-y-3">
              {phases.map((phase, index) => {
                const styles = getStatusStyles(phase.status);
                const isExpanded = expandedId === phase.id;
                const isInProgress = phase.status === "in-progress";
                const isLast = index === phases.length - 1;

                return (
                  <div key={phase.id} className="relative">
                    {/* Connecting Line */}
                    {!isLast && (
                      <div className={`absolute left-[15px] top-8 w-0.5 h-[calc(100%-8px)] ${styles.line}`} />
                    )}

                    {/* Milestone Card */}
                    <div
                      className={`relative rounded-xl border transition-all duration-300 ${
                        isInProgress 
                          ? "border-[#D4AF37] bg-[#D4AF37]/[0.02] shadow-[0_0_15px_rgba(212,175,55,0.08)]" 
                          : "border-border hover:border-muted-foreground/30 bg-card"
                      }`}
                    >
                      <button
                        onClick={() => toggleExpand(phase.id)}
                        className="w-full flex items-center gap-3 p-3 lg:p-4 text-left"
                      >
                        {/* Status Icon */}
                        <div className={`w-8 h-8 rounded-full ${styles.bg} flex items-center justify-center flex-shrink-0`}>
                          {styles.icon}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="font-sans font-medium text-foreground text-sm">{phase.title}</h4>
                            {isInProgress && (
                              <span className="px-2 py-0.5 bg-[#D4AF37]/15 text-[#D4AF37] text-[9px] font-semibold uppercase tracking-wider rounded-full">
                                In Progress
                              </span>
                            )}
                            {approvedPhases.includes(phase.id) && (
                              <span className="px-2 py-0.5 bg-foreground/5 text-foreground/70 text-[9px] font-medium uppercase tracking-wider rounded-full flex items-center gap-0.5">
                                <Check className="w-2.5 h-2.5" /> Approved
                              </span>
                            )}
                          </div>
                          <p className="font-sans text-xs text-muted-foreground mt-0.5">Target: {phase.targetDate}</p>
                        </div>

                        {/* Expand Icon */}
                        <div className="flex-shrink-0 text-muted-foreground">
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </div>
                      </button>

                      {/* Expanded Content */}
                      {isExpanded && (
                        <div className="px-3 lg:px-4 pb-4 pt-0">
                          <div className="pl-11 space-y-3">
                            <p className="font-sans text-sm text-muted-foreground">{phase.description}</p>

                            {/* Status Info */}
                            <div className="flex items-center gap-4 text-sm">
                              <div>
                                <span className="font-sans text-[10px] uppercase tracking-wider text-muted-foreground">Status</span>
                                <p className={`font-sans text-sm font-medium ${
                                  phase.status === "completed" ? "text-foreground" :
                                  phase.status === "in-progress" ? "text-[#D4AF37]" :
                                  "text-muted-foreground"
                                }`}>
                                  {phase.statusDate}
                                </p>
                              </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-wrap gap-2 pt-1">
                              <Button
                                variant="outline"
                                size="sm"
                                className="font-sans text-xs gap-1.5 h-8 rounded-lg"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedPhase(phase);
                                }}
                                disabled={phase.photos.length === 0}
                              >
                                <Camera className="w-3.5 h-3.5" />
                                Evidence ({phase.photos.length})
                              </Button>

                              {!approvedPhases.includes(phase.id) && phase.status !== "pending" && (
                                <Button
                                  size="sm"
                                  className="font-sans text-xs gap-1.5 h-8 bg-foreground text-background hover:bg-foreground/90 rounded-lg"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleApprove(phase.id);
                                  }}
                                >
                                  <Check className="w-3.5 h-3.5" />
                                  Approve
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
          </CardContent>
        </Card>

        {/* Mobile Chat Card - Only visible on smaller screens */}
        <Card className="xl:hidden mt-6 border border-border shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-4 h-4 text-[#D4AF37]" />
              <h3 className="font-serif text-base text-foreground">Engineer Chat</h3>
            </div>
            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl">
              <div className="w-9 h-9 rounded-full bg-foreground flex items-center justify-center text-background font-sans font-medium text-sm">
                W
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-sans font-medium text-foreground text-sm">Engineer Wayan</p>
                <p className="font-sans text-xs text-muted-foreground truncate">The Living Room panels are being configured...</p>
              </div>
              <Button size="sm" variant="outline" className="shrink-0 h-8 text-xs">
                Open Chat
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Photo Gallery Dialog */}
      <Dialog open={!!selectedPhase} onOpenChange={() => setSelectedPhase(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-serif text-xl">
              {selectedPhase?.title} - Field Evidence
            </DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
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
