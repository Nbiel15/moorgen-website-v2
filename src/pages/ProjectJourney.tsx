import { useState } from "react";
import { Check, Clock, Search, Bell, Send, Paperclip, ChevronRight, Eye, Camera, TrendingUp, Calendar as CalendarIcon, Users, Wifi, MessageCircle } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
  technician: string;
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
    ],
    approved: true,
    technician: "Wayan Sudarta",
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
    ],
    approved: true,
    technician: "Made Kusuma",
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
    technician: "Wayan Sudarta",
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
    technician: "Assigned",
  },
];

const evidenceData = [
  { phase: "Site Analysis", technician: "Wayan Sudarta", date: "12 Aug 2024", status: "Approved", hasPhoto: true },
  { phase: "Wiring", technician: "Made Kusuma", date: "30 Sep 2024", status: "Approved", hasPhoto: true },
  { phase: "Device Installation", technician: "Wayan Sudarta", date: "In Progress", status: "Pending", hasPhoto: true },
];

const ProjectJourney = () => {
  const [selectedPhase, setSelectedPhase] = useState<Phase | null>(null);
  const [chatInput, setChatInput] = useState("");

  const getStatusStyles = (status: MilestoneStatus) => {
    switch (status) {
      case "completed":
        return {
          bg: "bg-foreground",
          icon: <Check className="w-3 h-3 text-background" />,
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
          bg: "bg-muted border-2 border-border",
          icon: <Clock className="w-3 h-3 text-muted-foreground" />,
          line: "bg-border",
        };
    }
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-[#F5F5F5]">

        {/* Main Content */}
        <div className="p-6 max-w-7xl mx-auto">
          {/* Page Title */}
          <div className="mb-6">
            <h1 className="font-heading text-2xl lg:text-3xl text-foreground">Project Progress</h1>
            <p className="font-body text-sm text-muted-foreground mt-1">Villa Seminyak Smart Home Installation</p>
          </div>

          {/* Top Row: 4 Summary Cards */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {/* Card 1: Total Progress - Black */}
            <Card className="bg-foreground text-background border-0 shadow-lg">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-4 h-4 text-[#D4AF37]" />
                  <span className="font-body text-xs uppercase tracking-wider text-background/60">Total Progress</span>
                </div>
                <p className="font-heading text-4xl font-bold">85%</p>
                <p className="font-body text-xs text-[#D4AF37] mt-1">+4.2% from last week</p>
              </CardContent>
            </Card>

            {/* Card 2: Handover Date */}
            <Card className="bg-white border border-border shadow-sm">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <CalendarIcon className="w-4 h-4 text-[#D4AF37]" />
                  <span className="font-body text-xs uppercase tracking-wider text-muted-foreground">Handover Date</span>
                </div>
                <p className="font-heading text-2xl font-bold text-foreground">20 Dec 2024</p>
                <p className="font-body text-xs text-muted-foreground mt-1">45 Days Remaining</p>
              </CardContent>
            </Card>

            {/* Card 3: Active Engineers */}
            <Card className="bg-white border border-border shadow-sm">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Users className="w-4 h-4 text-[#D4AF37]" />
                  <span className="font-body text-xs uppercase tracking-wider text-muted-foreground">Active Engineers</span>
                </div>
                <p className="font-heading text-2xl font-bold text-foreground">3 People</p>
                <p className="font-body text-xs text-green-600 mt-1">All on-site</p>
              </CardContent>
            </Card>

            {/* Card 4: System Status */}
            <Card className="bg-white border border-border shadow-sm">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Wifi className="w-4 h-4 text-green-500" />
                  <span className="font-body text-xs uppercase tracking-wider text-muted-foreground">System Status</span>
                </div>
                <p className="font-heading text-2xl font-bold text-foreground">98% Online</p>
                <div className="flex items-center gap-1 mt-2">
                  {[...Array(6)].map((_, i) => (
                    <div 
                      key={i} 
                      className="flex-1 h-1.5 rounded-full bg-green-500"
                      style={{ opacity: 0.4 + (i * 0.12) }}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Middle Section: Timeline + Calendar */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Left: Project Journey Timeline */}
            <Card className="lg:col-span-2 bg-white border border-border shadow-sm">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="font-heading text-xl text-foreground">Project Journey Timeline</CardTitle>
                    <p className="font-body text-sm text-muted-foreground">Installation milestones & progress</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => document.getElementById('engineer-chat')?.scrollIntoView({ behavior: 'smooth' })}
                    className="font-body text-xs h-8 rounded-lg border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37]/10"
                  >
                    <MessageCircle className="w-3 h-3 mr-1.5" />
                    Chat with Engineer
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="relative space-y-1">
                  {phases.map((phase, index) => {
                    const styles = getStatusStyles(phase.status);
                    const isLast = index === phases.length - 1;
                    const isInProgress = phase.status === "in-progress";

                    return (
                      <div key={phase.id} className="relative flex gap-4">
                        {/* Timeline Line & Dot */}
                        <div className="flex flex-col items-center">
                          <div className={`w-7 h-7 rounded-full ${styles.bg} flex items-center justify-center z-10`}>
                            {styles.icon}
                          </div>
                          {!isLast && (
                            <div className={`w-0.5 flex-1 min-h-[60px] ${styles.line}`} />
                          )}
                        </div>

                        {/* Content */}
                        <div className={`flex-1 pb-6 ${isLast ? 'pb-0' : ''}`}>
                          <div className={`p-4 rounded-xl border transition-all ${
                            isInProgress 
                              ? "border-[#D4AF37] bg-[#D4AF37]/5" 
                              : "border-border hover:border-muted-foreground/30"
                          }`}>
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <div className="flex items-center gap-2">
                                  <h4 className="font-heading font-semibold text-foreground">{phase.title}</h4>
                                  {isInProgress && (
                                    <span className="px-2 py-0.5 bg-[#D4AF37]/15 text-[#D4AF37] text-[10px] font-semibold uppercase rounded-full">
                                      Active
                                    </span>
                                  )}
                                </div>
                                <p className="font-body text-xs text-muted-foreground mt-0.5">
                                  Target: {phase.targetDate}
                                </p>
                              </div>
                              {phase.status === "completed" && (
                                <span className="flex items-center gap-1 text-xs text-foreground/70 font-body">
                                  <Check className="w-3 h-3" />
                                  Completed
                                </span>
                              )}
                            </div>
                            <p className="font-body text-sm text-muted-foreground mb-3">{phase.description}</p>
                            {phase.photos.length > 0 && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setSelectedPhase(phase)}
                                className="font-body text-xs h-8 rounded-lg"
                              >
                                <Camera className="w-3 h-3 mr-1.5" />
                                View Evidence
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Right: Upcoming Deadline Calendar */}
            <Card className="bg-white border border-border shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="font-heading text-xl text-foreground">Upcoming Deadline</CardTitle>
                <p className="font-body text-sm text-muted-foreground">Next milestone target</p>
              </CardHeader>
              <CardContent className="pt-0">
                {/* Mini Calendar */}
                <div className="bg-[#F5F5F5] rounded-xl p-4 mb-4">
                  <div className="text-center mb-3">
                    <p className="font-body text-xs uppercase tracking-wider text-muted-foreground">October 2024</p>
                  </div>
                  <div className="grid grid-cols-7 gap-1 text-center mb-2">
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                      <span key={i} className="font-body text-[10px] text-muted-foreground">{d}</span>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-1 text-center">
                    {[...Array(31)].map((_, i) => {
                      const day = i + 1;
                      const isHighlight = day === 19;
                      const isPast = day < 15;
                      return (
                        <span 
                          key={i} 
                          className={`font-body text-xs py-1.5 rounded-lg ${
                            isHighlight 
                              ? "bg-[#D4AF37] text-background font-semibold" 
                              : isPast 
                                ? "text-muted-foreground/40" 
                                : "text-foreground"
                          }`}
                        >
                          {day}
                        </span>
                      );
                    })}
                  </div>
                </div>

                {/* Next Milestone Info */}
                <div className="border border-[#D4AF37]/30 rounded-xl p-4 bg-[#D4AF37]/5">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-full bg-[#D4AF37] flex items-center justify-center">
                      <div className="w-2 h-2 bg-background rounded-full animate-pulse" />
                    </div>
                    <p className="font-heading font-semibold text-foreground text-sm">Fine-tuning & Handover</p>
                  </div>
                  <p className="font-body text-xs text-muted-foreground">System calibration and final handover to owner.</p>
                  <div className="mt-3 pt-3 border-t border-[#D4AF37]/20">
                    <p className="font-body text-xs text-[#D4AF37] font-medium">Target: December 20, 2024</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Bottom Row: Evidence Table + Chat */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: Latest Field Evidence */}
            <Card className="lg:col-span-2 bg-white border border-border shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="font-heading text-xl text-foreground">Latest Field Evidence</CardTitle>
                <p className="font-body text-sm text-muted-foreground">Documentation from on-site work</p>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left font-body text-xs uppercase tracking-wider text-muted-foreground py-3 px-2">Phase</th>
                        <th className="text-left font-body text-xs uppercase tracking-wider text-muted-foreground py-3 px-2">Technician</th>
                        <th className="text-left font-body text-xs uppercase tracking-wider text-muted-foreground py-3 px-2">Date</th>
                        <th className="text-left font-body text-xs uppercase tracking-wider text-muted-foreground py-3 px-2">Status</th>
                        <th className="text-right font-body text-xs uppercase tracking-wider text-muted-foreground py-3 px-2">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {evidenceData.map((item, index) => (
                        <tr key={index} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                          <td className="py-4 px-2">
                            <span className="font-body text-sm text-foreground font-medium">{item.phase}</span>
                          </td>
                          <td className="py-4 px-2">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-full bg-foreground flex items-center justify-center text-background text-[10px] font-body">
                                {item.technician.charAt(0)}
                              </div>
                              <span className="font-body text-sm text-foreground">{item.technician}</span>
                            </div>
                          </td>
                          <td className="py-4 px-2">
                            <span className="font-body text-sm text-muted-foreground">{item.date}</span>
                          </td>
                          <td className="py-4 px-2">
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase ${
                              item.status === "Approved" 
                                ? "bg-foreground/10 text-foreground" 
                                : "bg-[#D4AF37]/15 text-[#D4AF37]"
                            }`}>
                              {item.status === "Approved" && <Check className="w-2.5 h-2.5" />}
                              {item.status}
                            </span>
                          </td>
                          <td className="py-4 px-2 text-right">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="font-body text-xs h-8 text-[#D4AF37] hover:text-[#D4AF37] hover:bg-[#D4AF37]/10"
                              onClick={() => {
                                const phase = phases.find(p => p.title.includes(item.phase.split(" ")[0]));
                                if (phase) setSelectedPhase(phase);
                              }}
                            >
                              <Eye className="w-3 h-3 mr-1" />
                              View Photo
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Right: Direct Engineer Chat */}
            <Card id="engineer-chat" className="bg-white border border-border shadow-sm flex flex-col">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="font-heading text-xl text-foreground">Direct Engineer Chat</CardTitle>
                  <MessageCircle className="w-4 h-4 text-[#D4AF37]" />
                </div>
                {/* Engineer Profile */}
                <div className="flex items-center gap-3 mt-3 p-3 bg-[#F5F5F5] rounded-xl">
                  <div className="w-10 h-10 rounded-full bg-foreground flex items-center justify-center text-background font-body font-medium">
                    W
                  </div>
                  <div>
                    <p className="font-heading font-semibold text-foreground text-sm">Wayan Sudarta</p>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                      <span className="font-body text-xs text-muted-foreground">Online • Lead Engineer</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col pt-0 min-h-0">
                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto space-y-3 mb-4 max-h-[200px]">
                  <div className="flex gap-2">
                    <div className="w-6 h-6 rounded-full bg-foreground flex items-center justify-center text-background text-[10px] flex-shrink-0 mt-1">
                      W
                    </div>
                    <div className="bg-[#F5F5F5] rounded-2xl rounded-bl-sm px-3 py-2 max-w-[85%]">
                      <p className="font-body text-sm text-foreground">Wiring for the master suite is now 100% verified. All panels tested and operational.</p>
                      <p className="font-body text-[10px] text-muted-foreground mt-1">10:30 AM</p>
                    </div>
                  </div>
                  <div className="flex gap-2 justify-end">
                    <div className="bg-foreground text-background rounded-2xl rounded-br-sm px-3 py-2 max-w-[85%]">
                      <p className="font-body text-sm">Excellent work! Please proceed to living room.</p>
                      <p className="font-body text-[10px] text-background/50 mt-1">10:45 AM</p>
                    </div>
                    <div className="w-6 h-6 rounded-full bg-[#D4AF37] flex items-center justify-center text-background text-[10px] flex-shrink-0 mt-1">
                      A
                    </div>
                  </div>
                </div>

                {/* Chat Input */}
                <div className="flex items-center gap-2 pt-3 border-t border-border">
                  <button className="p-2 hover:bg-muted rounded-full transition-colors">
                    <Paperclip className="w-4 h-4 text-muted-foreground" />
                  </button>
                  <Input
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 bg-[#F5F5F5] border-0 rounded-xl font-body text-sm h-9"
                  />
                  <button className="p-2 bg-foreground text-background rounded-full hover:bg-foreground/90 transition-colors">
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Photo Gallery Dialog */}
        <Dialog open={!!selectedPhase} onOpenChange={() => setSelectedPhase(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="font-heading text-xl">{selectedPhase?.title} - Field Evidence</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {selectedPhase?.photos.map((photo, index) => (
                <div key={index} className="relative aspect-video rounded-xl overflow-hidden">
                  <img src={photo} alt={`Evidence ${index + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            {selectedPhase?.photos.length === 0 && (
              <div className="text-center py-8 text-muted-foreground font-body">
                <Camera className="w-10 h-10 mx-auto mb-2 opacity-30" />
                <p>No photos available yet</p>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default ProjectJourney;
