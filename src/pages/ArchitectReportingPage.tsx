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
  Loader2,
  Sparkles,
  ChevronRight,
  ImagePlus,
  PenTool
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
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

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

  const publishSingleMilestone = (id: string) => {
    setMilestones(milestones.map(m => 
      m.id === id ? { ...m, isDraft: false } : m
    ));
    toast({
      title: "Milestone Published",
      description: "This milestone has been synced to Owner Dashboard.",
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
      case "in-progress": return <Loader2 className="w-4 h-4 text-champagne animate-spin" />;
      case "delayed": return <AlertCircle className="w-4 h-4 text-rose-500" />;
      default: return <Clock className="w-4 h-4 text-muted-foreground" />;
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-emerald-500/10 text-emerald-600 border-emerald-500/20";
      case "in-progress": return "bg-champagne/10 text-champagne border-champagne/20";
      case "delayed": return "bg-rose-500/10 text-rose-600 border-rose-500/20";
      default: return "bg-muted text-muted-foreground border-border";
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const cardHoverVariants = {
    rest: { scale: 1, boxShadow: "0 4px 20px -5px hsla(0, 0%, 0%, 0.1)" },
    hover: { 
      scale: 1.01, 
      boxShadow: "0 20px 40px -15px hsla(43, 76%, 52%, 0.2)",
      transition: { duration: 0.3, ease: "easeOut" as const }
    }
  };

  return (
    <ArchitectLayout>
      {/* Premium Header with Gradient */}
      <header className="relative overflow-hidden border-b border-border/50 bg-gradient-to-br from-background via-background to-muted/30">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-accent/5 via-transparent to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-gradient-to-tr from-accent/10 to-transparent rounded-full blur-2xl" />
        
        <div className="relative mx-auto w-full max-w-7xl px-4 py-8 md:px-8 md:py-10">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-6"
          >
            {/* Title Section */}
            <div className="animate-fade-in">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                <p className="text-xs text-accent tracking-[0.3em] uppercase font-body">Project Reporting</p>
              </div>
              <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl text-foreground">
                Live Reporting
              </h1>
              <p className="text-muted-foreground font-body mt-2 text-sm md:text-base">
                Create and publish progress reports to the Owner Dashboard
              </p>
            </div>
          </motion.div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl px-4 py-6 md:px-8 pb-24 lg:pb-8">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
            {/* Left Side - Progress Input Area */}
            <motion.div 
              className="xl:col-span-2 space-y-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Add Milestone Button */}
              {!previewMode && (
                <motion.div variants={itemVariants}>
                  <motion.button
                    onClick={addNewMilestone}
                    className="w-full py-10 sm:py-12 bg-gradient-to-br from-card via-card to-muted/30 border-2 border-dashed border-champagne/40 hover:border-champagne rounded-3xl font-playfair group relative overflow-hidden transition-all duration-500"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    {/* Animated background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-champagne/0 via-champagne/5 to-champagne/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsla(43,76%,52%,0.1),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="relative flex flex-col items-center gap-3">
                      <motion.div 
                        className="p-4 rounded-2xl bg-champagne/10 border border-champagne/20 group-hover:bg-champagne/20 transition-all duration-300"
                        whileHover={{ rotate: 90 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Plus className="w-8 h-8 text-champagne" />
                      </motion.div>
                      <span className="text-lg sm:text-xl font-semibold text-foreground">Add New Milestone</span>
                      <span className="text-sm text-muted-foreground">Click to begin documenting your progress</span>
                    </div>
                  </motion.button>
                </motion.div>
              )}

              {/* Milestone Cards */}
              <AnimatePresence mode="popLayout">
                {milestones.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="text-center py-16 sm:py-24"
                  >
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <div className="relative inline-block">
                        <FileText className="w-20 h-20 sm:w-24 sm:h-24 mx-auto text-muted-foreground/30" />
                        <motion.div 
                          className="absolute -top-2 -right-2 p-2 bg-champagne/10 rounded-full"
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <Sparkles className="w-5 h-5 text-champagne" />
                        </motion.div>
                      </div>
                    </motion.div>
                    <h3 className="text-xl sm:text-2xl font-semibold text-muted-foreground mt-6 font-playfair">
                      Your Canvas Awaits
                    </h3>
                    <p className="text-muted-foreground mt-2 font-playfair max-w-md mx-auto">
                      Click "Add New Milestone" to begin crafting your architectural narrative
                    </p>
                  </motion.div>
                ) : (
                  milestones.map((milestone, index) => (
                    <motion.div
                      key={milestone.id}
                      layout
                      initial={{ opacity: 0, y: 30, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -30, scale: 0.95 }}
                      transition={{ 
                        duration: 0.4, 
                        delay: index * 0.05,
                        layout: { duration: 0.3 }
                      }}
                      onHoverStart={() => setHoveredCard(milestone.id)}
                      onHoverEnd={() => setHoveredCard(null)}
                    >
                      <motion.div
                        variants={cardHoverVariants}
                        initial="rest"
                        animate={hoveredCard === milestone.id ? "hover" : "rest"}
                      >
                        <Card className="bg-card/80 backdrop-blur-sm rounded-3xl border border-border/50 overflow-hidden relative group">
                          {/* Decorative corner accent */}
                          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-champagne/5 to-transparent pointer-events-none" />
                          
                          {/* Draft Badge */}
                          {milestone.isDraft && (
                            <motion.div 
                              className="bg-gradient-to-r from-foreground to-foreground/90 text-background text-xs font-semibold py-2 px-6 font-playfair flex items-center gap-2"
                              initial={{ x: -100 }}
                              animate={{ x: 0 }}
                            >
                              <div className="w-2 h-2 bg-champagne rounded-full animate-pulse" />
                              DRAFT
                            </motion.div>
                          )}
                          
                          <CardContent className="p-6 sm:p-8 space-y-6">
                            {previewMode ? (
                              /* Preview Mode Display */
                              <div className="space-y-5">
                                <div className="flex items-start justify-between">
                                  <div>
                                    <h3 className="text-xl sm:text-2xl font-bold text-foreground font-playfair">
                                      {milestone.phaseTitle || "Untitled Phase"}
                                    </h3>
                                    <div className="flex flex-wrap items-center gap-3 mt-3">
                                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(milestone.status)}`}>
                                        {getStatusIcon(milestone.status)}
                                        {getStatusLabel(milestone.status)}
                                      </span>
                                      {milestone.targetDate && (
                                        <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground font-playfair">
                                          <Calendar className="w-4 h-4" />
                                          {new Date(milestone.targetDate).toLocaleDateString('en-US', { 
                                            month: 'short', 
                                            day: 'numeric', 
                                            year: 'numeric' 
                                          })}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                
                                {milestone.description && (
                                  <p className="text-muted-foreground font-playfair leading-relaxed text-base sm:text-lg">
                                    {milestone.description}
                                  </p>
                                )}
                                
                                {milestone.imageUrl && (
                                  <motion.div 
                                    className="rounded-2xl overflow-hidden shadow-lg"
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ duration: 0.3 }}
                                  >
                                    <img 
                                      src={milestone.imageUrl} 
                                      alt="Field photo" 
                                      className="w-full h-64 sm:h-80 object-cover"
                                    />
                                  </motion.div>
                                )}
                                
                                {milestone.architectRemark && (
                                  <motion.div 
                                    className="bg-gradient-to-br from-foreground to-foreground/95 rounded-2xl p-5 sm:p-6 relative overflow-hidden"
                                    whileHover={{ scale: 1.01 }}
                                  >
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-champagne/10 blur-2xl rounded-full" />
                                    <div className="flex items-center gap-2 mb-3">
                                      <PenTool className="w-4 h-4 text-champagne" />
                                      <p className="text-xs text-champagne font-playfair font-semibold tracking-widest">
                                        ARCHITECT'S SIGNATURE NOTE
                                      </p>
                                    </div>
                                    <p className="text-background font-playfair italic text-base sm:text-lg relative">
                                      "{milestone.architectRemark}"
                                    </p>
                                  </motion.div>
                                )}
                              </div>
                            ) : (
                              /* Edit Mode Input Fields */
                              <>
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-3">
                                    <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-champagne/20 to-champagne/5 flex items-center justify-center text-champagne font-bold font-playfair">
                                      {index + 1}
                                    </span>
                                    <span className="text-sm font-semibold text-champagne font-playfair tracking-wide">
                                      MILESTONE
                                    </span>
                                  </div>
                                  <motion.button
                                    onClick={() => deleteMilestone(milestone.id)}
                                    className="p-2 rounded-xl text-rose-500 hover:bg-rose-500/10 transition-colors"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                  >
                                    <Trash2 className="w-5 h-5" />
                                  </motion.button>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                                  {/* Phase Title */}
                                  <div className="space-y-2">
                                    <Label className="text-foreground font-playfair font-semibold flex items-center gap-2">
                                      <span className="w-1.5 h-1.5 bg-champagne rounded-full" />
                                      Phase Title
                                    </Label>
                                    <Input
                                      placeholder="e.g., Grand Entrance Lighting Installation"
                                      value={milestone.phaseTitle}
                                      onChange={(e) => updateMilestone(milestone.id, "phaseTitle", e.target.value)}
                                      className="font-playfair rounded-xl border-border bg-muted/30 focus:border-champagne focus:ring-champagne/20 transition-all duration-300 h-12"
                                    />
                                  </div>

                                  {/* Target Date */}
                                  <div className="space-y-2">
                                    <Label className="text-foreground font-playfair font-semibold flex items-center gap-2">
                                      <span className="w-1.5 h-1.5 bg-champagne rounded-full" />
                                      Target Date
                                    </Label>
                                    <div className="relative group">
                                      <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-champagne transition-colors" />
                                      <Input
                                        type="date"
                                        value={milestone.targetDate}
                                        onChange={(e) => updateMilestone(milestone.id, "targetDate", e.target.value)}
                                        className="font-playfair pl-12 rounded-xl border-border bg-muted/30 focus:border-champagne focus:ring-champagne/20 transition-all duration-300 h-12"
                                      />
                                    </div>
                                  </div>
                                </div>

                                {/* Description */}
                                <div className="space-y-2">
                                  <Label className="text-foreground font-playfair font-semibold flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-champagne rounded-full" />
                                    Description
                                  </Label>
                                  <Textarea
                                    placeholder="Write your technical/aesthetic narrative for this phase..."
                                    value={milestone.description}
                                    onChange={(e) => updateMilestone(milestone.id, "description", e.target.value)}
                                    className="font-playfair min-h-[120px] rounded-xl border-border bg-muted/30 focus:border-champagne focus:ring-champagne/20 transition-all duration-300 resize-none"
                                  />
                                </div>

                                {/* Status */}
                                <div className="space-y-2">
                                  <Label className="text-foreground font-playfair font-semibold flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-champagne rounded-full" />
                                    Live Status
                                  </Label>
                                  <Select
                                    value={milestone.status}
                                    onValueChange={(value) => updateMilestone(milestone.id, "status", value)}
                                  >
                                    <SelectTrigger className="font-playfair rounded-xl border-border bg-muted/30 focus:border-champagne focus:ring-champagne/20 h-12">
                                      <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent className="font-playfair bg-card border-border rounded-xl">
                                      <SelectItem value="pending" className="rounded-lg">
                                        <span className="flex items-center gap-2">
                                          <Clock className="w-4 h-4 text-muted-foreground" />
                                          Pending
                                        </span>
                                      </SelectItem>
                                      <SelectItem value="in-progress" className="rounded-lg">
                                        <span className="flex items-center gap-2">
                                          <Loader2 className="w-4 h-4 text-champagne" />
                                          In Progress
                                        </span>
                                      </SelectItem>
                                      <SelectItem value="completed" className="rounded-lg">
                                        <span className="flex items-center gap-2">
                                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                          Completed
                                        </span>
                                      </SelectItem>
                                      <SelectItem value="delayed" className="rounded-lg">
                                        <span className="flex items-center gap-2">
                                          <AlertCircle className="w-4 h-4 text-rose-500" />
                                          Delayed
                                        </span>
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>

                                {/* Image Upload */}
                                <div className="space-y-2">
                                  <Label className="text-foreground font-playfair font-semibold flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-champagne rounded-full" />
                                    Field Photo
                                  </Label>
                                  {milestone.imageUrl ? (
                                    <motion.div 
                                      className="relative rounded-2xl overflow-hidden group"
                                      whileHover={{ scale: 1.01 }}
                                    >
                                      <img 
                                        src={milestone.imageUrl} 
                                        alt="Uploaded field photo" 
                                        className="w-full h-56 object-cover"
                                      />
                                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                      <motion.button
                                        onClick={() => updateMilestone(milestone.id, "imageUrl", "")}
                                        className="absolute top-3 right-3 p-2.5 bg-rose-500 hover:bg-rose-600 text-background rounded-xl shadow-lg"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                      >
                                        <Trash2 className="w-4 h-4" />
                                      </motion.button>
                                    </motion.div>
                                  ) : (
                                    <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-border rounded-2xl cursor-pointer hover:border-champagne hover:bg-champagne/5 transition-all duration-300 group">
                                      <motion.div 
                                        className="p-4 rounded-2xl bg-muted/50 group-hover:bg-champagne/10 transition-colors"
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                      >
                                        <ImagePlus className="w-8 h-8 text-muted-foreground group-hover:text-champagne transition-colors" />
                                      </motion.div>
                                      <span className="text-sm text-muted-foreground font-playfair mt-3 group-hover:text-foreground transition-colors">
                                        Click to upload field photo
                                      </span>
                                      <span className="text-xs text-muted-foreground/60 font-playfair mt-1">
                                        PNG, JPG up to 10MB
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
                                  <Label className="text-foreground font-playfair font-semibold flex items-center gap-2">
                                    <PenTool className="w-4 h-4 text-champagne" />
                                    Architect's Signature Note
                                  </Label>
                                  <Textarea
                                    placeholder="Provide your professional validation or review of the work..."
                                    value={milestone.architectRemark}
                                    onChange={(e) => updateMilestone(milestone.id, "architectRemark", e.target.value)}
                                    className="font-playfair min-h-[100px] rounded-xl border-border bg-foreground/5 focus:border-champagne focus:ring-champagne/20 transition-all duration-300 resize-none"
                                  />
                                </div>

                                {/* Push to Owner Button */}
                                <div className="pt-4 border-t border-border/50">
                                  <motion.div 
                                    whileHover={{ scale: 1.02 }} 
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full"
                                  >
                                    <Button
                                      onClick={() => publishSingleMilestone(milestone.id)}
                                      disabled={!milestone.isDraft}
                                      className="w-full font-playfair bg-gradient-to-r from-champagne to-champagne-light hover:from-champagne-dark hover:to-champagne text-foreground font-semibold shadow-lg shadow-champagne/25 transition-all duration-300 relative overflow-hidden group h-12 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                      <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                                      <Send className="w-4 h-4 mr-2" />
                                      {milestone.isDraft ? "Push to Owner" : "Published"}
                                      {milestone.isDraft && <Sparkles className="w-4 h-4 ml-2 opacity-60" />}
                                    </Button>
                                  </motion.div>
                                </div>
                              </>
                            )}
                          </CardContent>
                        </Card>
                      </motion.div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </motion.div>

            {/* Right Side - Chat & Preview Panel */}
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {/* Live Chat Widget */}
              <div className="sticky top-6">
                <motion.div whileHover={{ scale: 1.005 }} transition={{ duration: 0.2 }}>
                  <Card className="bg-card/80 backdrop-blur-sm rounded-3xl shadow-xl border border-border/50 overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-foreground to-foreground/95 text-background p-5 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-champagne/10 blur-3xl rounded-full" />
                      <CardTitle className="flex items-center gap-3 font-playfair text-lg relative">
                        <div className="p-2 bg-champagne/20 rounded-xl">
                          <MessageCircle className="w-5 h-5 text-champagne" />
                        </div>
                        Collaboration Hub
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <Tabs value={activeChat} onValueChange={(v) => setActiveChat(v as "owner" | "engineer")}>
                        <TabsList className="w-full rounded-none bg-muted/50 p-1 gap-1">
                          <TabsTrigger 
                            value="owner" 
                            className="flex-1 font-playfair rounded-xl data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-md py-3 transition-all duration-300"
                          >
                            <User className="w-4 h-4 mr-2" />
                            Client/Owner
                          </TabsTrigger>
                          <TabsTrigger 
                            value="engineer" 
                            className="flex-1 font-playfair rounded-xl data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-md py-3 transition-all duration-300"
                          >
                            <Wrench className="w-4 h-4 mr-2" />
                            Engineer
                          </TabsTrigger>
                        </TabsList>

                        <TabsContent value="owner" className="m-0">
                          <ScrollArea className="h-[280px] sm:h-[320px] p-4">
                            <div className="space-y-4">
                              {ownerMessages.map((msg, i) => (
                                <motion.div
                                  key={msg.id}
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: i * 0.1 }}
                                  className={`flex ${msg.sender === "You" ? "justify-end" : "justify-start"}`}
                                >
                                  <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    className={`max-w-[85%] rounded-2xl p-4 ${
                                      msg.sender === "You"
                                        ? "bg-card border-2 border-champagne/50 text-foreground shadow-lg shadow-champagne/10"
                                        : "bg-muted text-foreground"
                                    }`}
                                  >
                                    <p className="text-xs font-semibold mb-1.5 font-playfair text-champagne">
                                      {msg.sender}
                                    </p>
                                    <p className="text-sm font-playfair leading-relaxed">{msg.message}</p>
                                    <p className="text-xs text-muted-foreground mt-2 font-playfair">{msg.time}</p>
                                  </motion.div>
                                </motion.div>
                              ))}
                            </div>
                          </ScrollArea>
                        </TabsContent>

                        <TabsContent value="engineer" className="m-0">
                          <div className="p-4 bg-emerald-500/10 border-b border-emerald-500/20 flex items-center gap-3">
                            <span className="relative flex h-3 w-3">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                            </span>
                            <span className="text-sm font-playfair text-emerald-700 font-medium">
                              Wayan — Live on Site
                            </span>
                          </div>
                          <ScrollArea className="h-[240px] sm:h-[280px] p-4">
                            <div className="space-y-4">
                              {engineerMessages.map((msg, i) => (
                                <motion.div
                                  key={msg.id}
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: i * 0.1 }}
                                  className={`flex ${msg.sender === "You" ? "justify-end" : "justify-start"}`}
                                >
                                  <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    className={`max-w-[85%] rounded-2xl p-4 ${
                                      msg.isEngineer
                                        ? "bg-foreground text-background"
                                        : "bg-card border-2 border-champagne/50 text-foreground shadow-lg shadow-champagne/10"
                                    }`}
                                  >
                                    <p className="text-xs font-semibold mb-1.5 font-playfair text-champagne">
                                      {msg.sender}
                                    </p>
                                    <p className="text-sm font-playfair leading-relaxed">{msg.message}</p>
                                    <p className={`text-xs mt-2 font-playfair ${
                                      msg.isEngineer ? "text-muted-foreground" : "text-muted-foreground"
                                    }`}>{msg.time}</p>
                                  </motion.div>
                                </motion.div>
                              ))}
                            </div>
                          </ScrollArea>
                        </TabsContent>
                      </Tabs>

                      {/* Chat Input */}
                      <div className="p-4 border-t border-border/50 bg-muted/30">
                        <div className="flex gap-3">
                          <Input 
                            placeholder="Type a message..." 
                            className="font-playfair rounded-full border-border bg-card focus:border-champagne h-11"
                          />
                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button className="rounded-full bg-gradient-to-r from-champagne to-champagne-light hover:from-champagne-dark hover:to-champagne text-foreground px-5 h-11 shadow-lg shadow-champagne/25">
                              <Send className="w-4 h-4" />
                            </Button>
                          </motion.div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Report Summary */}
                <motion.div 
                  className="mt-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Card className="bg-gradient-to-br from-foreground via-foreground to-foreground/95 text-background rounded-3xl shadow-xl border-0 overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-champagne/10 blur-3xl rounded-full" />
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-champagne/5 blur-2xl rounded-full" />
                    <CardContent className="p-6 relative">
                      <div className="flex items-center gap-2 mb-5">
                        <Sparkles className="w-5 h-5 text-champagne" />
                        <h3 className="font-semibold font-playfair text-champagne tracking-wide">
                          Report Summary
                        </h3>
                      </div>
                      <div className="space-y-4">
                        {[
                          { label: "Total Milestones", value: milestones.length, color: "text-background" },
                          { label: "Drafts", value: milestones.filter(m => m.isDraft).length, color: "text-amber-400" },
                          { label: "With Photos", value: milestones.filter(m => m.imageUrl).length, color: "text-sky-400" },
                          { label: "Completed", value: milestones.filter(m => m.status === "completed").length, color: "text-emerald-400" },
                        ].map((item, i) => (
                          <motion.div 
                            key={item.label}
                            className="flex justify-between items-center py-2 border-b border-background/10 last:border-0"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 + i * 0.1 }}
                          >
                            <span className="text-background/60 font-playfair">{item.label}</span>
                            <motion.span 
                              className={`font-bold font-playfair text-lg ${item.color}`}
                              key={item.value}
                              initial={{ scale: 1.2 }}
                              animate={{ scale: 1 }}
                            >
                              {item.value}
                            </motion.span>
                          </motion.div>
                        ))}
                      </div>
                      
                      {/* Progress indicator */}
                      <div className="mt-6 pt-4 border-t border-background/10">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-background/60 font-playfair">Completion</span>
                          <span className="text-champagne font-playfair font-medium">
                            {milestones.length > 0 
                              ? Math.round((milestones.filter(m => m.status === "completed").length / milestones.length) * 100)
                              : 0}%
                          </span>
                        </div>
                        <div className="h-2 bg-background/10 rounded-full overflow-hidden">
                          <motion.div 
                            className="h-full bg-gradient-to-r from-champagne to-champagne-light rounded-full"
                            initial={{ width: 0 }}
                            animate={{ 
                              width: `${milestones.length > 0 
                                ? (milestones.filter(m => m.status === "completed").length / milestones.length) * 100
                                : 0}%` 
                            }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </motion.div>
          </div>
      </main>
    </ArchitectLayout>
  );
};

export default ArchitectReportingPage;
