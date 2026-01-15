import { useState } from "react";
import { ArrowLeft, Check, Clock, AlertCircle, Image, Send, Paperclip, X } from "lucide-react";
import { Link } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface Phase {
  id: string;
  title: string;
  targetDate: string;
  currentStatus: "completed" | "on-track" | "delayed";
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
    currentStatus: "completed",
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
    currentStatus: "on-track",
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
    currentStatus: "delayed",
    statusDate: "28 Nov 2024",
    description: "Installation of all Moorgen smart panels, sensors, and control units.",
    photos: [
      "https://images.unsplash.com/photo-1558002038-1055907df827?w=400",
    ],
    approved: false,
  },
  {
    id: "4",
    title: "Fine-tuning",
    targetDate: "20 Dec 2024",
    currentStatus: "on-track",
    statusDate: "20 Dec 2024",
    description: "System calibration, scene programming, and final testing.",
    photos: [],
    approved: false,
  },
];

const chatMessages = [
  {
    id: "1",
    sender: "engineer",
    name: "Marcus Chen",
    message: "Hello Mr. Adrian, the Milan Series panels for the Living Room are now installed. Any feedback?",
    time: "10:30 AM",
  },
];

const ProjectJourney = () => {
  const [selectedPhase, setSelectedPhase] = useState<Phase | null>(null);
  const [approvedPhases, setApprovedPhases] = useState<string[]>(["1", "2"]);
  const [chatInput, setChatInput] = useState("");
  const progress = 85;
  const circumference = 2 * Math.PI * 70;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const handleApprove = (phaseId: string) => {
    if (!approvedPhases.includes(phaseId)) {
      setApprovedPhases([...approvedPhases, phaseId]);
    }
  };

  const getStatusIcon = (status: Phase["currentStatus"]) => {
    switch (status) {
      case "completed":
        return <Check className="w-5 h-5" />;
      case "on-track":
        return <Clock className="w-5 h-5" />;
      case "delayed":
        return <AlertCircle className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status: Phase["currentStatus"]) => {
    switch (status) {
      case "completed":
        return "bg-accent text-accent-foreground";
      case "on-track":
        return "bg-accent text-accent-foreground";
      case "delayed":
        return "bg-destructive text-destructive-foreground";
    }
  };

  const getDateColor = (status: Phase["currentStatus"]) => {
    switch (status) {
      case "completed":
        return "text-accent";
      case "on-track":
        return "text-accent";
      case "delayed":
        return "text-destructive";
    }
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Main Content - Left Side */}
        <div className="flex-1 flex flex-col">
          {/* Fixed Header */}
          <header className="bg-card border-b border-border px-6 md:px-10 py-8 sticky top-0 z-10">
            <div className="max-w-4xl">
              <Link
                to="/lifestyle-dashboard"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm font-sans tracking-wide">Back to Dashboard</span>
              </Link>

              <div className="flex flex-col md:flex-row md:items-center gap-8">
                {/* Progress Circle */}
                <div className="relative w-40 h-40 shrink-0">
                  <svg className="w-full h-full -rotate-90">
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      fill="none"
                      stroke="hsl(var(--border))"
                      strokeWidth="8"
                    />
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      fill="none"
                      stroke="hsl(var(--accent))"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      className="transition-all duration-1000 ease-out"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="font-serif text-4xl font-semibold text-foreground">{progress}%</span>
                    <span className="text-sm font-sans text-muted-foreground">Complete</span>
                  </div>
                </div>

                {/* Header Text */}
                <div>
                  <h1 className="font-serif text-3xl md:text-4xl text-foreground mb-3">Project Journey</h1>
                  <p className="font-serif text-xl text-accent">
                    Overall Project Deadline: <span className="font-semibold">20 December 2024</span>
                  </p>
                </div>
              </div>
            </div>
          </header>

          {/* Scrollable Timeline */}
          <main className="flex-1 overflow-y-auto px-6 md:px-10 py-10">
            <div className="max-w-4xl">
              <h2 className="font-serif text-2xl text-foreground mb-8">Project Phases</h2>

              {/* Timeline */}
              <div className="relative">
                {/* Vertical Line */}
                <div className="absolute left-6 top-0 bottom-0 w-px bg-border" />

                {/* Phase Cards */}
                <div className="space-y-6">
                  {phases.map((phase, index) => (
                    <div key={phase.id} className="relative pl-16">
                      {/* Timeline Node */}
                      <div
                        className={`absolute left-3 w-7 h-7 rounded-full flex items-center justify-center ${getStatusColor(phase.currentStatus)}`}
                      >
                        {getStatusIcon(phase.currentStatus)}
                      </div>

                      {/* Card */}
                      <div className="bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                          <div>
                            <h3 className="font-serif text-xl text-foreground mb-1">{phase.title}</h3>
                            <p className="font-sans text-sm text-muted-foreground">{phase.description}</p>
                          </div>

                          {/* Approval Badge */}
                          {approvedPhases.includes(phase.id) && (
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-accent/10 rounded-full shrink-0">
                              <Check className="w-4 h-4 text-accent" />
                              <span className="font-sans text-sm font-medium text-accent">Approved</span>
                            </div>
                          )}
                        </div>

                        {/* Dates */}
                        <div className="flex flex-wrap gap-6 mb-5">
                          <div>
                            <span className="font-sans text-xs uppercase tracking-wider text-muted-foreground">Target Date</span>
                            <p className="font-sans text-sm font-medium text-foreground mt-1">{phase.targetDate}</p>
                          </div>
                          <div>
                            <span className="font-sans text-xs uppercase tracking-wider text-muted-foreground">Current Status</span>
                            <p className={`font-sans text-sm font-medium mt-1 ${getDateColor(phase.currentStatus)}`}>
                              {phase.currentStatus === "completed" ? "Completed" : phase.statusDate}
                              {phase.currentStatus === "delayed" && " (Delayed)"}
                            </p>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-wrap gap-3">
                          <Button
                            variant="outline"
                            size="sm"
                            className="font-sans text-sm gap-2"
                            onClick={() => setSelectedPhase(phase)}
                            disabled={phase.photos.length === 0}
                          >
                            <Image className="w-4 h-4" />
                            View Field Photos ({phase.photos.length})
                          </Button>

                          {!approvedPhases.includes(phase.id) && (
                            <Button
                              size="sm"
                              className="font-sans text-sm gap-2 bg-foreground text-background hover:bg-foreground/90"
                              onClick={() => handleApprove(phase.id)}
                            >
                              <Check className="w-4 h-4" />
                              Digital Approve
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </main>
        </div>

        {/* Right Sidebar - Engineer Chat */}
        <aside className="w-full lg:w-96 bg-card border-l border-border flex flex-col">
          {/* Chat Header */}
          <div className="p-6 border-b border-border">
            <h2 className="font-serif text-xl text-foreground mb-4">Direct Engineer Communication</h2>

            {/* Engineer Profile */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-foreground flex items-center justify-center text-background font-serif text-lg">
                M
              </div>
              <div>
                <p className="font-sans font-medium text-foreground">Marcus Chen</p>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="font-sans text-sm text-muted-foreground">Online</span>
                </div>
              </div>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {chatMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                    msg.sender === "user"
                      ? "bg-foreground text-background"
                      : "bg-muted text-foreground"
                  }`}
                >
                  {msg.sender === "engineer" && (
                    <p className="font-sans text-xs font-medium text-accent mb-1">{msg.name}</p>
                  )}
                  <p className="font-sans text-sm">{msg.message}</p>
                  <p className="font-sans text-xs text-muted-foreground mt-2">{msg.time}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-muted rounded-full transition-colors">
                <Paperclip className="w-5 h-5 text-muted-foreground" />
              </button>
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 px-4 py-3 bg-muted rounded-full font-sans text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <button className="p-3 bg-foreground text-background rounded-full hover:bg-foreground/90 transition-colors">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </aside>
      </div>

      {/* Photo Gallery Dialog */}
      <Dialog open={!!selectedPhase} onOpenChange={() => setSelectedPhase(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl">
              {selectedPhase?.title} - Field Photos
            </DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            {selectedPhase?.photos.map((photo, index) => (
              <div key={index} className="aspect-square rounded-xl overflow-hidden">
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
