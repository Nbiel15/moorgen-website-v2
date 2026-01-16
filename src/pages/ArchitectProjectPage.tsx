import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronDown, 
  Camera, 
  Send, 
  Download, 
  History, 
  CheckCircle2, 
  Clock, 
  Circle,
  MessageCircle,
  User,
  FileText,
  Layers,
  Zap
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import ArchitectLayout from "@/components/layout/ArchitectLayout";

type PhaseStatus = "completed" | "in-progress" | "pending";

interface Phase {
  id: string;
  title: string;
  status: PhaseStatus;
  date: string;
  description: string;
  isActive?: boolean;
}

interface ChatMessage {
  id: string;
  sender: string;
  message: string;
  time: string;
  isEngineer?: boolean;
}

interface Document {
  id: string;
  name: string;
  type: string;
  version: string;
  lastUpdated: string;
}

const phases: Phase[] = [
  {
    id: "site-analysis",
    title: "Site Analysis & Planning",
    status: "completed",
    date: "15 Oct 2024",
    description: "Initial site survey completed. Electrical load calculations verified."
  },
  {
    id: "wiring",
    title: "Wiring Infrastructure",
    status: "completed",
    date: "28 Oct 2024",
    description: "CAT6 and power wiring installed to all smart panel locations."
  },
  {
    id: "installation",
    title: "Device Installation",
    status: "in-progress",
    date: "In Progress",
    description: "Installing Milan Series smart panels across 12 zones.",
    isActive: true
  },
  {
    id: "integration",
    title: "System Integration",
    status: "pending",
    date: "Est. 10 Dec 2024",
    description: "Connect all devices to central hub and configure scenes."
  },
  {
    id: "handover",
    title: "Final Handover",
    status: "pending",
    date: "Est. 20 Dec 2024",
    description: "Client training and documentation delivery."
  }
];

const ownerMessages: ChatMessage[] = [
  { id: "1", sender: "You", message: "Good morning, I've uploaded the revised lighting plan.", time: "09:15 AM", isEngineer: false },
  { id: "2", sender: "Owner", message: "Thank you! The gold accent lighting looks perfect.", time: "09:22 AM", isEngineer: false },
  { id: "3", sender: "You", message: "Installation team arrives at 2 PM today.", time: "10:45 AM", isEngineer: false }
];

const engineerMessages: ChatMessage[] = [
  { id: "1", sender: "Wayan", message: "Panel installation at Zone 3 complete. Moving to Zone 4.", time: "11:30 AM", isEngineer: true },
  { id: "2", sender: "You", message: "Great progress! Please capture photos of the wiring.", time: "11:35 AM", isEngineer: false },
  { id: "3", sender: "Wayan", message: "Photos uploaded. Need clarification on dimmer placement.", time: "11:42 AM", isEngineer: true }
];

const documents: Document[] = [
  { id: "1", name: "Villa Uluwatu - Master DWG Blueprint", type: "DWG", version: "v3.2", lastUpdated: "12 Nov 2024" },
  { id: "2", name: "Electrical Wiring Diagram - All Floors", type: "PDF", version: "v2.1", lastUpdated: "08 Nov 2024" },
  { id: "3", name: "Milan Series 3D Panel Models", type: "3DS", version: "v1.5", lastUpdated: "01 Nov 2024" },
  { id: "4", name: "Smart Scene Configuration Matrix", type: "XLSX", version: "v1.8", lastUpdated: "10 Nov 2024" }
];

const ArchitectProjectPage = () => {
  const { toast } = useToast();
  const [expandedPhases, setExpandedPhases] = useState<string[]>(["installation"]);
  const [validationStates, setValidationStates] = useState<Record<string, boolean>>({});
  const [remarks, setRemarks] = useState<Record<string, string>>({});
  const [chatInput, setChatInput] = useState("");

  const togglePhase = (phaseId: string) => {
    setExpandedPhases(prev => 
      prev.includes(phaseId) 
        ? prev.filter(id => id !== phaseId)
        : [...prev, phaseId]
    );
  };

  const handlePublishUpdate = (phaseTitle: string) => {
    toast({
      title: "Update Published",
      description: "Progress report successfully synced to Owner Dashboard.",
    });
  };

  const handleCapturePhoto = () => {
    toast({
      title: "Camera Ready",
      description: "Opening camera for field photo capture...",
    });
  };

  const getStatusIcon = (status: PhaseStatus) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-5 h-5 text-champagne-gold" />;
      case "in-progress":
        return <Clock className="w-5 h-5 text-champagne-gold animate-pulse" />;
      case "pending":
        return <Circle className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <ArchitectLayout>
      <div className="min-h-screen bg-[#FAFAFA] p-6 lg:p-8">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-heading text-3xl lg:text-4xl text-charcoal mb-2">
            Villa Uluwatu - Technical Management
          </h1>
          <p className="font-body text-moorgen-muted">
            Real-time project tracking and collaboration hub
          </p>
        </motion.div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Project Health Card - Black */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="bg-charcoal text-white border-0 rounded-3xl shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-body text-sm text-gray-400 mb-1">Project Health</p>
                    <p className="font-heading text-3xl text-white">85%</p>
                  </div>
                  <div className="relative w-16 h-16">
                    <svg className="w-16 h-16 transform -rotate-90">
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        stroke="#333"
                        strokeWidth="4"
                        fill="none"
                      />
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        stroke="#D4AF37"
                        strokeWidth="4"
                        fill="none"
                        strokeDasharray={`${85 * 1.76} ${100 * 1.76}`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center font-body text-xs text-champagne-gold">
                      85%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Days to Handover Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-white border border-gray-100 rounded-3xl shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <p className="font-body text-sm text-moorgen-muted mb-1">Days to Handover</p>
                <p className="font-heading text-3xl text-charcoal">45 Days</p>
                <p className="font-body text-xs text-moorgen-muted mt-2">Target: 20 Dec 2024</p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Pending Validations Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-white border border-gray-100 rounded-3xl shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <p className="font-body text-sm text-moorgen-muted mb-1">Pending Validations</p>
                <p className="font-heading text-3xl text-charcoal">2 Tasks</p>
                <p className="font-body text-xs text-champagne-gold mt-2">Action Required</p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Next Inspection Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="bg-white border border-gray-100 rounded-3xl shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <p className="font-body text-sm text-moorgen-muted mb-1">Next Field Inspection</p>
                <p className="font-heading text-3xl text-charcoal">Tomorrow</p>
                <p className="font-body text-xs text-moorgen-muted mt-2">09:00 AM - Zone 4</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Project Journey Timeline */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="bg-white border border-gray-100 rounded-3xl shadow-lg">
                <CardContent className="p-6">
                  <h2 className="font-heading text-xl text-charcoal mb-6 flex items-center gap-2">
                    <Layers className="w-5 h-5 text-champagne-gold" />
                    Project Journey Timeline
                  </h2>

                  <div className="space-y-4">
                    {phases.map((phase, index) => (
                      <motion.div
                        key={phase.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * index }}
                        className={`relative border rounded-3xl overflow-hidden transition-all ${
                          phase.isActive 
                            ? "border-champagne-gold border-2 shadow-md" 
                            : "border-gray-100"
                        }`}
                      >
                        {/* Timeline connector */}
                        {index < phases.length - 1 && (
                          <div className="absolute left-8 top-full w-0.5 h-4 bg-gray-200 z-10" />
                        )}

                        {/* Phase Header */}
                        <button
                          onClick={() => togglePhase(phase.id)}
                          className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-center gap-4">
                            {getStatusIcon(phase.status)}
                            <div className="text-left">
                              <h3 className="font-heading text-base text-charcoal">
                                {phase.title}
                              </h3>
                              <p className="font-body text-sm text-moorgen-muted">
                                {phase.date}
                              </p>
                            </div>
                          </div>
                          <ChevronDown 
                            className={`w-5 h-5 text-gray-400 transition-transform ${
                              expandedPhases.includes(phase.id) ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        {/* Expanded Content */}
                        <AnimatePresence>
                          {expandedPhases.includes(phase.id) && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="px-4 pb-4 space-y-4">
                                <p className="font-body text-sm text-moorgen-muted">
                                  {phase.description}
                                </p>

                                {/* On-Site Tools */}
                                <div className="bg-[#FAFAFA] rounded-2xl p-4 space-y-4">
                                  {/* Capture Photo Button */}
                                  <Button
                                    onClick={handleCapturePhoto}
                                    variant="outline"
                                    className="w-full justify-start gap-2 font-body rounded-xl border-gray-200 hover:border-champagne-gold hover:text-champagne-gold"
                                  >
                                    <Camera className="w-4 h-4" />
                                    Capture Field Photo
                                  </Button>

                                  {/* Design Remark Textarea */}
                                  <div>
                                    <label className="font-body text-sm text-moorgen-muted mb-2 block">
                                      Architect's Design Remark
                                    </label>
                                    <Textarea
                                      placeholder="Add your professional notes here..."
                                      value={remarks[phase.id] || ""}
                                      onChange={(e) => setRemarks(prev => ({ ...prev, [phase.id]: e.target.value }))}
                                      className="font-body text-sm rounded-xl border-gray-200 focus:border-champagne-gold resize-none"
                                      rows={3}
                                    />
                                  </div>

                                  {/* Validation Toggle */}
                                  <div className="flex items-center justify-between">
                                    <span className="font-body text-sm text-charcoal">
                                      Professional Validation
                                    </span>
                                    <Switch
                                      checked={validationStates[phase.id] || false}
                                      onCheckedChange={(checked) => 
                                        setValidationStates(prev => ({ ...prev, [phase.id]: checked }))
                                      }
                                      className="data-[state=checked]:bg-champagne-gold"
                                    />
                                  </div>

                                  {/* Publish Button */}
                                  <Button
                                    onClick={() => handlePublishUpdate(phase.title)}
                                    className="w-full font-body bg-champagne-gold hover:bg-champagne-gold/90 text-charcoal rounded-xl"
                                  >
                                    <Zap className="w-4 h-4 mr-2" />
                                    Publish Live Update to Owner
                                  </Button>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar - Collaboration Hub */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Card className="bg-white border border-gray-100 rounded-3xl shadow-lg sticky top-6">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-heading text-lg text-charcoal flex items-center gap-2">
                      <MessageCircle className="w-5 h-5 text-champagne-gold" />
                      Collaboration Hub
                    </h2>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <span className="font-body text-xs text-moorgen-muted">Wayan Live</span>
                    </div>
                  </div>

                  <Tabs defaultValue="engineer" className="w-full">
                    <TabsList className="w-full bg-gray-100 rounded-xl p-1">
                      <TabsTrigger 
                        value="owner" 
                        className="flex-1 font-body text-sm rounded-lg data-[state=active]:bg-white data-[state=active]:text-charcoal"
                      >
                        Client/Owner
                      </TabsTrigger>
                      <TabsTrigger 
                        value="engineer" 
                        className="flex-1 font-body text-sm rounded-lg data-[state=active]:bg-white data-[state=active]:text-charcoal"
                      >
                        Moorgen Engineer
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="owner" className="mt-4">
                      <ScrollArea className="h-64 pr-2">
                        <div className="space-y-3">
                          {ownerMessages.map((msg) => (
                            <div
                              key={msg.id}
                              className={`flex ${msg.sender === "You" ? "justify-end" : "justify-start"}`}
                            >
                              <div
                                className={`max-w-[85%] rounded-2xl p-3 ${
                                  msg.sender === "You"
                                    ? "bg-white border-2 border-champagne-gold"
                                    : "bg-gray-100"
                                }`}
                              >
                                <p className="font-body text-xs text-moorgen-muted mb-1">
                                  {msg.sender}
                                </p>
                                <p className="font-body text-sm text-charcoal">
                                  {msg.message}
                                </p>
                                <p className="font-body text-xs text-gray-400 mt-1 text-right">
                                  {msg.time}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </TabsContent>

                    <TabsContent value="engineer" className="mt-4">
                      <ScrollArea className="h-64 pr-2">
                        <div className="space-y-3">
                          {engineerMessages.map((msg) => (
                            <div
                              key={msg.id}
                              className={`flex ${msg.sender === "You" ? "justify-end" : "justify-start"}`}
                            >
                              <div
                                className={`max-w-[85%] rounded-2xl p-3 ${
                                  msg.isEngineer
                                    ? "bg-charcoal text-white"
                                    : "bg-white border-2 border-champagne-gold"
                                }`}
                              >
                                <p className={`font-body text-xs mb-1 ${
                                  msg.isEngineer ? "text-gray-400" : "text-moorgen-muted"
                                }`}>
                                  {msg.sender} {msg.isEngineer && "• Live on Site"}
                                </p>
                                <p className={`font-body text-sm ${
                                  msg.isEngineer ? "text-white" : "text-charcoal"
                                }`}>
                                  {msg.message}
                                </p>
                                <p className={`font-body text-xs mt-1 text-right ${
                                  msg.isEngineer ? "text-gray-500" : "text-gray-400"
                                }`}>
                                  {msg.time}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </TabsContent>
                  </Tabs>

                  {/* Chat Input */}
                  <div className="mt-4 flex gap-2">
                    <input
                      type="text"
                      placeholder="Type a message..."
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      className="flex-1 font-body text-sm px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:border-champagne-gold"
                    />
                    <Button
                      size="icon"
                      className="bg-champagne-gold hover:bg-champagne-gold/90 text-charcoal rounded-xl"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* Footer - Technical Vault */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-8"
        >
          <Card className="bg-white border border-gray-100 rounded-3xl shadow-lg">
            <CardContent className="p-6">
              <h2 className="font-heading text-xl text-charcoal mb-6 flex items-center gap-2">
                <FileText className="w-5 h-5 text-champagne-gold" />
                Technical Documents & Assets
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-left font-heading text-sm text-moorgen-muted pb-3">Document Name</th>
                      <th className="text-left font-heading text-sm text-moorgen-muted pb-3">Type</th>
                      <th className="text-left font-heading text-sm text-moorgen-muted pb-3">Version</th>
                      <th className="text-left font-heading text-sm text-moorgen-muted pb-3">Last Updated</th>
                      <th className="text-right font-heading text-sm text-moorgen-muted pb-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {documents.map((doc) => (
                      <tr key={doc.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                        <td className="py-4 font-body text-sm text-charcoal">{doc.name}</td>
                        <td className="py-4">
                          <span className="font-body text-xs px-2 py-1 bg-gray-100 rounded-lg text-moorgen-muted">
                            {doc.type}
                          </span>
                        </td>
                        <td className="py-4 font-body text-sm text-champagne-gold">{doc.version}</td>
                        <td className="py-4 font-body text-sm text-moorgen-muted">{doc.lastUpdated}</td>
                        <td className="py-4">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="font-body text-xs rounded-lg border-gray-200 hover:border-champagne-gold hover:text-champagne-gold"
                            >
                              <Download className="w-3 h-3 mr-1" />
                              Download
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="font-body text-xs text-moorgen-muted hover:text-champagne-gold"
                            >
                              <History className="w-3 h-3 mr-1" />
                              History
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </ArchitectLayout>
  );
};

export default ArchitectProjectPage;
