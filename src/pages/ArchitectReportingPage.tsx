import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, 
  Calendar, 
  Camera, 
  Save, 
  Send, 
  Eye, 
  EyeOff,
  Trash2,
  MessageCircle,
  User,
  Wrench,
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  Loader2
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import ArchitectLayout from "@/components/layout/ArchitectLayout";

interface Milestone {
  id: string;
  phaseTitle: string;
  targetDate: string;
  description: string;
  status: "pending" | "in-progress" | "completed" | "delayed";
  imageUrl: string | null;
  architectRemark: string;
  isDraft: boolean;
}

interface ChatMessage {
  id: string;
  sender: string;
  message: string;
  time: string;
  isEngineer?: boolean;
}

const ArchitectReportingPage = () => {
  const { toast } = useToast();
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [previewMode, setPreviewMode] = useState(false);
  const [activeChat, setActiveChat] = useState<"owner" | "engineer">("owner");

  const ownerMessages: ChatMessage[] = [
    { id: "1", sender: "You", message: "Good morning! I'll be sending today's progress report shortly.", time: "09:00 AM" },
    { id: "2", sender: "Owner", message: "Perfect, looking forward to the updates on the lighting installation.", time: "09:15 AM" },
  ];

  const engineerMessages: ChatMessage[] = [
    { id: "1", sender: "Wayan", message: "All panels calibrated and ready for your inspection.", time: "08:30 AM", isEngineer: true },
    { id: "2", sender: "You", message: "Great work! I'll document this in today's report.", time: "08:45 AM" },
  ];

  const addNewMilestone = () => {
    const newMilestone: Milestone = {
      id: Date.now().toString(),
      phaseTitle: "",
      targetDate: "",
      description: "",
      status: "pending",
      imageUrl: null,
      architectRemark: "",
      isDraft: true
    };
    setMilestones([...milestones, newMilestone]);
  };

  const updateMilestone = (id: string, field: keyof Milestone, value: string | boolean) => {
    setMilestones(milestones.map(m => 
      m.id === id ? { ...m, [field]: value } : m
    ));
  };

  const deleteMilestone = (id: string) => {
    setMilestones(milestones.filter(m => m.id !== id));
    toast({
      title: "Milestone Removed",
      description: "The milestone has been deleted from your report.",
    });
  };

  const handleImageUpload = (id: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateMilestone(id, "imageUrl", reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const saveDraft = () => {
    toast({
      title: "Draft Saved",
      description: "Your progress report has been saved as a draft.",
    });
  };

  const publishToOwner = () => {
    setMilestones(milestones.map(m => ({ ...m, isDraft: false })));
    toast({
      title: "Report Published",
      description: "Progress report successfully synced to Owner Dashboard.",
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle2 className="w-4 h-4 text-green-600" />;
      case "in-progress": return <Loader2 className="w-4 h-4 text-[#D4AF37] animate-spin" />;
      case "delayed": return <AlertCircle className="w-4 h-4 text-red-500" />;
      default: return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pending": return "Pending";
      case "in-progress": return "In Progress";
      case "completed": return "Completed";
      case "delayed": return "Delayed";
      default: return "Pending";
    }
  };

  return (
    <ArchitectLayout>
      <div className="p-4 lg:p-8 font-playfair">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-[#1A1A1A] font-playfair">
                Live Project Reporting
              </h1>
              <p className="text-gray-600 mt-1 font-playfair">
                Create and publish progress reports to the Owner Dashboard
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={() => setPreviewMode(!previewMode)}
                className="font-playfair border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white"
              >
                {previewMode ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
                {previewMode ? "Edit Mode" : "Preview Mode"}
              </Button>
              <Button
                variant="outline"
                onClick={saveDraft}
                className="font-playfair border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Draft
              </Button>
              <Button
                onClick={publishToOwner}
                className="font-playfair bg-[#D4AF37] hover:bg-[#B8972F] text-[#1A1A1A] font-semibold"
                disabled={milestones.length === 0}
              >
                <Send className="w-4 h-4 mr-2" />
                Push to Owner
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Side - Progress Input Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Add Milestone Button */}
            {!previewMode && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Button
                  onClick={addNewMilestone}
                  className="w-full py-8 bg-white border-2 border-dashed border-[#D4AF37] text-[#1A1A1A] hover:bg-[#D4AF37]/10 rounded-3xl font-playfair"
                  variant="outline"
                >
                  <Plus className="w-6 h-6 mr-3 text-[#D4AF37]" />
                  <span className="text-lg font-semibold">Add New Milestone</span>
                </Button>
              </motion.div>
            )}

            {/* Milestone Cards */}
            <AnimatePresence>
              {milestones.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-16"
                >
                  <FileText className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-400 font-playfair">
                    No Milestones Yet
                  </h3>
                  <p className="text-gray-400 mt-2 font-playfair">
                    Click "Add New Milestone" to start building your report
                  </p>
                </motion.div>
              ) : (
                milestones.map((milestone, index) => (
                  <motion.div
                    key={milestone.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="bg-white rounded-3xl shadow-lg border-0 overflow-hidden">
                      {/* Draft Badge */}
                      {milestone.isDraft && (
                        <div className="bg-[#1A1A1A] text-white text-xs font-semibold py-1 px-4 font-playfair">
                          DRAFT
                        </div>
                      )}
                      
                      <CardContent className="p-6 space-y-6">
                        {previewMode ? (
                          /* Preview Mode Display */
                          <div className="space-y-4">
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="text-xl font-bold text-[#1A1A1A] font-playfair">
                                  {milestone.phaseTitle || "Untitled Phase"}
                                </h3>
                                <div className="flex items-center gap-2 mt-2">
                                  {getStatusIcon(milestone.status)}
                                  <span className="text-sm text-gray-600 font-playfair">
                                    {getStatusLabel(milestone.status)}
                                  </span>
                                  {milestone.targetDate && (
                                    <>
                                      <span className="text-gray-400">•</span>
                                      <span className="text-sm text-gray-600 font-playfair">
                                        Target: {new Date(milestone.targetDate).toLocaleDateString()}
                                      </span>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>
                            
                            {milestone.description && (
                              <p className="text-gray-700 font-playfair leading-relaxed">
                                {milestone.description}
                              </p>
                            )}
                            
                            {milestone.imageUrl && (
                              <div className="rounded-2xl overflow-hidden">
                                <img 
                                  src={milestone.imageUrl} 
                                  alt="Field photo" 
                                  className="w-full h-64 object-cover"
                                />
                              </div>
                            )}
                            
                            {milestone.architectRemark && (
                              <div className="bg-[#1A1A1A] rounded-2xl p-4">
                                <p className="text-xs text-[#D4AF37] mb-2 font-playfair font-semibold">
                                  ARCHITECT'S SIGNATURE NOTE
                                </p>
                                <p className="text-white font-playfair italic">
                                  "{milestone.architectRemark}"
                                </p>
                              </div>
                            )}
                          </div>
                        ) : (
                          /* Edit Mode Input Fields */
                          <>
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-semibold text-[#D4AF37] font-playfair">
                                MILESTONE {index + 1}
                              </span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => deleteMilestone(milestone.id)}
                                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                              {/* Phase Title */}
                              <div className="space-y-2">
                                <Label className="text-[#1A1A1A] font-playfair font-semibold">
                                  Phase Title
                                </Label>
                                <Input
                                  placeholder="e.g., Grand Entrance Lighting Installation"
                                  value={milestone.phaseTitle}
                                  onChange={(e) => updateMilestone(milestone.id, "phaseTitle", e.target.value)}
                                  className="font-playfair rounded-xl border-gray-200 focus:border-[#D4AF37] focus:ring-[#D4AF37]"
                                />
                              </div>

                              {/* Target Date */}
                              <div className="space-y-2">
                                <Label className="text-[#1A1A1A] font-playfair font-semibold">
                                  Target Date
                                </Label>
                                <div className="relative">
                                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                  <Input
                                    type="date"
                                    value={milestone.targetDate}
                                    onChange={(e) => updateMilestone(milestone.id, "targetDate", e.target.value)}
                                    className="font-playfair pl-10 rounded-xl border-gray-200 focus:border-[#D4AF37] focus:ring-[#D4AF37]"
                                  />
                                </div>
                              </div>
                            </div>

                            {/* Description */}
                            <div className="space-y-2">
                              <Label className="text-[#1A1A1A] font-playfair font-semibold">
                                Description
                              </Label>
                              <Textarea
                                placeholder="Write your technical/aesthetic narrative for this phase..."
                                value={milestone.description}
                                onChange={(e) => updateMilestone(milestone.id, "description", e.target.value)}
                                className="font-playfair min-h-[100px] rounded-xl border-gray-200 focus:border-[#D4AF37] focus:ring-[#D4AF37]"
                              />
                            </div>

                            {/* Status */}
                            <div className="space-y-2">
                              <Label className="text-[#1A1A1A] font-playfair font-semibold">
                                Live Status
                              </Label>
                              <Select
                                value={milestone.status}
                                onValueChange={(value) => updateMilestone(milestone.id, "status", value)}
                              >
                                <SelectTrigger className="font-playfair rounded-xl border-gray-200 focus:border-[#D4AF37] focus:ring-[#D4AF37]">
                                  <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent className="font-playfair bg-white">
                                  <SelectItem value="pending">Pending</SelectItem>
                                  <SelectItem value="in-progress">In Progress</SelectItem>
                                  <SelectItem value="completed">Completed</SelectItem>
                                  <SelectItem value="delayed">Delayed</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            {/* Image Upload */}
                            <div className="space-y-2">
                              <Label className="text-[#1A1A1A] font-playfair font-semibold">
                                Field Photo
                              </Label>
                              {milestone.imageUrl ? (
                                <div className="relative rounded-2xl overflow-hidden">
                                  <img 
                                    src={milestone.imageUrl} 
                                    alt="Uploaded field photo" 
                                    className="w-full h-48 object-cover"
                                  />
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => updateMilestone(milestone.id, "imageUrl", "")}
                                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              ) : (
                                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer hover:border-[#D4AF37] hover:bg-[#D4AF37]/5 transition-colors">
                                  <Camera className="w-8 h-8 text-gray-400 mb-2" />
                                  <span className="text-sm text-gray-500 font-playfair">
                                    Click to upload field photo
                                  </span>
                                  <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => handleImageUpload(milestone.id, e)}
                                  />
                                </label>
                              )}
                            </div>

                            {/* Architect's Remark */}
                            <div className="space-y-2">
                              <Label className="text-[#1A1A1A] font-playfair font-semibold">
                                Architect's Signature Note
                              </Label>
                              <Textarea
                                placeholder="Provide your professional validation or review of the work..."
                                value={milestone.architectRemark}
                                onChange={(e) => updateMilestone(milestone.id, "architectRemark", e.target.value)}
                                className="font-playfair min-h-[80px] rounded-xl border-gray-200 focus:border-[#D4AF37] focus:ring-[#D4AF37] bg-[#1A1A1A]/5"
                              />
                            </div>
                          </>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>

          {/* Right Side - Chat & Preview Panel */}
          <div className="space-y-6">
            {/* Live Chat Widget */}
            <Card className="bg-white rounded-3xl shadow-lg border-0 overflow-hidden sticky top-8">
              <CardHeader className="bg-[#1A1A1A] text-white p-4">
                <CardTitle className="flex items-center gap-2 font-playfair text-lg">
                  <MessageCircle className="w-5 h-5" />
                  Collaboration Hub
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Tabs value={activeChat} onValueChange={(v) => setActiveChat(v as "owner" | "engineer")}>
                  <TabsList className="w-full rounded-none bg-gray-100 p-0">
                    <TabsTrigger 
                      value="owner" 
                      className="flex-1 font-playfair rounded-none data-[state=active]:bg-white data-[state=active]:text-[#1A1A1A] py-3"
                    >
                      <User className="w-4 h-4 mr-2" />
                      Client/Owner
                    </TabsTrigger>
                    <TabsTrigger 
                      value="engineer" 
                      className="flex-1 font-playfair rounded-none data-[state=active]:bg-white data-[state=active]:text-[#1A1A1A] py-3"
                    >
                      <Wrench className="w-4 h-4 mr-2" />
                      Engineer
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="owner" className="m-0">
                    <ScrollArea className="h-[300px] p-4">
                      <div className="space-y-3">
                        {ownerMessages.map((msg) => (
                          <div
                            key={msg.id}
                            className={`flex ${msg.sender === "You" ? "justify-end" : "justify-start"}`}
                          >
                            <div
                              className={`max-w-[80%] rounded-2xl p-3 ${
                                msg.sender === "You"
                                  ? "bg-white border-2 border-[#D4AF37] text-[#1A1A1A]"
                                  : "bg-gray-100 text-[#1A1A1A]"
                              }`}
                            >
                              <p className="text-xs font-semibold mb-1 font-playfair text-[#D4AF37]">
                                {msg.sender}
                              </p>
                              <p className="text-sm font-playfair">{msg.message}</p>
                              <p className="text-xs text-gray-400 mt-1 font-playfair">{msg.time}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </TabsContent>

                  <TabsContent value="engineer" className="m-0">
                    <div className="p-3 bg-green-50 border-b flex items-center gap-2">
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                      </span>
                      <span className="text-sm font-playfair text-green-700">
                        Wayan - Live on Site
                      </span>
                    </div>
                    <ScrollArea className="h-[260px] p-4">
                      <div className="space-y-3">
                        {engineerMessages.map((msg) => (
                          <div
                            key={msg.id}
                            className={`flex ${msg.sender === "You" ? "justify-end" : "justify-start"}`}
                          >
                            <div
                              className={`max-w-[80%] rounded-2xl p-3 ${
                                msg.isEngineer
                                  ? "bg-[#1A1A1A] text-white"
                                  : "bg-white border-2 border-[#D4AF37] text-[#1A1A1A]"
                              }`}
                            >
                              <p className={`text-xs font-semibold mb-1 font-playfair ${
                                msg.isEngineer ? "text-[#D4AF37]" : "text-[#D4AF37]"
                              }`}>
                                {msg.sender}
                              </p>
                              <p className="text-sm font-playfair">{msg.message}</p>
                              <p className={`text-xs mt-1 font-playfair ${
                                msg.isEngineer ? "text-gray-400" : "text-gray-400"
                              }`}>{msg.time}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </TabsContent>
                </Tabs>

                {/* Chat Input */}
                <div className="p-4 border-t">
                  <div className="flex gap-2">
                    <Input 
                      placeholder="Type a message..." 
                      className="font-playfair rounded-full border-gray-200"
                    />
                    <Button className="rounded-full bg-[#D4AF37] hover:bg-[#B8972F] text-[#1A1A1A] px-4">
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Report Summary */}
            <Card className="bg-[#1A1A1A] text-white rounded-3xl shadow-lg border-0">
              <CardContent className="p-6">
                <h3 className="font-semibold font-playfair text-[#D4AF37] mb-4">
                  Report Summary
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 font-playfair">Total Milestones</span>
                    <span className="font-semibold font-playfair">{milestones.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 font-playfair">Drafts</span>
                    <span className="font-semibold font-playfair">
                      {milestones.filter(m => m.isDraft).length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 font-playfair">With Photos</span>
                    <span className="font-semibold font-playfair">
                      {milestones.filter(m => m.imageUrl).length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 font-playfair">Completed</span>
                    <span className="font-semibold text-green-400 font-playfair">
                      {milestones.filter(m => m.status === "completed").length}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ArchitectLayout>
  );
};

export default ArchitectReportingPage;
