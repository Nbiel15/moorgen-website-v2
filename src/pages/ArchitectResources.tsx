import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft,
  FileText,
  Download,
  FolderOpen,
  Image,
  FileSpreadsheet,
  File,
  Search,
  Grid3X3,
  List,
  Filter,
  Clock,
  Star,
  StarOff,
  MoreVertical,
  Eye,
  Share2,
  Trash2,
  FolderPlus,
  Upload,
  ChevronRight,
  BookOpen,
  Wrench,
  Palette,
  Zap
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import ArchitectLayout from "@/components/layout/ArchitectLayout";
import { toast } from "sonner";

interface Resource {
  id: string;
  name: string;
  type: "pdf" | "image" | "spreadsheet" | "document" | "folder";
  size: string;
  modified: string;
  category: string;
  starred: boolean;
  thumbnail?: string;
}

interface Category {
  id: string;
  name: string;
  icon: React.ElementType;
  count: number;
  color: string;
}

const categories: Category[] = [
  { id: "all", name: "All Files", icon: FolderOpen, count: 24, color: "from-champagne-gold/20 to-champagne-gold/10" },
  { id: "documentation", name: "Documentation", icon: BookOpen, count: 8, color: "from-blue-500/20 to-blue-500/10" },
  { id: "technical", name: "Technical Specs", icon: Wrench, count: 6, color: "from-purple-500/20 to-purple-500/10" },
  { id: "design", name: "Design Assets", icon: Palette, count: 5, color: "from-pink-500/20 to-pink-500/10" },
  { id: "electrical", name: "Electrical Plans", icon: Zap, count: 5, color: "from-amber-500/20 to-amber-500/10" },
];

const initialResources: Resource[] = [
  { id: "1", name: "Project Blueprint v2.1", type: "pdf", size: "4.2 MB", modified: "2 hours ago", category: "technical", starred: true },
  { id: "2", name: "Smart Panel Wiring Diagram", type: "image", size: "2.8 MB", modified: "5 hours ago", category: "electrical", starred: true },
  { id: "3", name: "Material Cost Breakdown", type: "spreadsheet", size: "856 KB", modified: "1 day ago", category: "documentation", starred: false },
  { id: "4", name: "Installation Guidelines", type: "document", size: "1.2 MB", modified: "2 days ago", category: "documentation", starred: false },
  { id: "5", name: "Floor Plan - Level 1", type: "image", size: "3.5 MB", modified: "3 days ago", category: "design", starred: true },
  { id: "6", name: "Lighting Control Specs", type: "pdf", size: "2.1 MB", modified: "4 days ago", category: "technical", starred: false },
  { id: "7", name: "Client Presentation Deck", type: "pdf", size: "8.4 MB", modified: "5 days ago", category: "documentation", starred: false },
  { id: "8", name: "Zone Configuration Map", type: "image", size: "1.9 MB", modified: "1 week ago", category: "electrical", starred: false },
  { id: "9", name: "Project Timeline Schedule", type: "spreadsheet", size: "654 KB", modified: "1 week ago", category: "documentation", starred: true },
  { id: "10", name: "Color Palette & Materials", type: "pdf", size: "5.2 MB", modified: "2 weeks ago", category: "design", starred: false },
  { id: "11", name: "Sensor Placement Guide", type: "document", size: "920 KB", modified: "2 weeks ago", category: "technical", starred: false },
  { id: "12", name: "Approval Documents", type: "folder", size: "12 files", modified: "2 weeks ago", category: "documentation", starred: false },
];

const getFileIcon = (type: Resource["type"]) => {
  const icons = {
    pdf: { icon: FileText, color: "text-red-500", bg: "bg-red-500/10" },
    image: { icon: Image, color: "text-blue-500", bg: "bg-blue-500/10" },
    spreadsheet: { icon: FileSpreadsheet, color: "text-green-500", bg: "bg-green-500/10" },
    document: { icon: File, color: "text-purple-500", bg: "bg-purple-500/10" },
    folder: { icon: FolderOpen, color: "text-champagne-gold", bg: "bg-champagne-gold/10" },
  };
  return icons[type];
};

const ArchitectResources = () => {
  const navigate = useNavigate();
  const [resources, setResources] = useState<Resource[]>(initialResources);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedResource, setSelectedResource] = useState<string | null>(null);

  const filteredResources = resources.filter((resource) => {
    const matchesSearch = resource.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "all" || resource.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleStar = (id: string) => {
    setResources((prev) =>
      prev.map((r) => (r.id === id ? { ...r, starred: !r.starred } : r))
    );
    toast.success("Updated favorites");
  };

  const handleDownload = (name: string) => {
    toast.success(`Downloading ${name}...`);
  };

  const handlePreview = (name: string) => {
    toast.info(`Opening preview: ${name}`);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
  };

  return (
    <ArchitectLayout>
      <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
        {/* Premium Header */}
        <div className="relative overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-champagne-gold/5" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-champagne-gold/15 via-champagne-gold/5 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 animate-pulse" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tr from-accent/10 to-transparent rounded-full blur-2xl translate-y-1/2 -translate-x-1/4" />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-br from-purple-500/5 to-transparent rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />

          {/* Subtle Grid Pattern */}
          <div className="absolute inset-0 opacity-[0.02]" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
            backgroundSize: '32px 32px'
          }} />

          <div className="relative px-4 md:px-6 lg:px-8 py-6 md:py-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              {/* Top Bar */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3 md:gap-4">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => navigate("/architect-dashboard")}
                      className="rounded-2xl hover:bg-champagne-gold/10 hover:text-champagne-gold transition-all duration-300 w-10 h-10 md:w-11 md:h-11"
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </Button>
                  </motion.div>
                  <div>
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold tracking-tight bg-gradient-to-r from-foreground via-foreground to-foreground/70 bg-clip-text">
                      Resources
                    </h1>
                    <p className="text-muted-foreground font-body text-sm mt-0.5">
                      Project files, documents & assets
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 md:gap-3">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      variant="outline"
                      className="rounded-2xl border-border/60 hover:border-champagne-gold/40 hover:bg-champagne-gold/5 transition-all duration-300"
                    >
                      <FolderPlus className="w-4 h-4 mr-2" />
                      <span className="hidden sm:inline">New Folder</span>
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button className="rounded-2xl bg-gradient-to-r from-champagne-gold to-champagne-gold/90 hover:from-champagne-gold/90 hover:to-champagne-gold text-champagne-gold-foreground shadow-lg shadow-champagne-gold/20">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload
                    </Button>
                  </motion.div>
                </div>
              </div>

              {/* Search & View Controls */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                {/* Search Input */}
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search files and folders..."
                    className="pl-11 pr-4 py-5 rounded-2xl bg-card/60 backdrop-blur-sm border-border/50 focus:border-champagne-gold/40 transition-all duration-300"
                  />
                </div>

                {/* View Toggle & Filter */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center p-1 rounded-xl bg-card/60 backdrop-blur-sm border border-border/50">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setViewMode("grid")}
                      className={cn(
                        "rounded-lg h-9 w-9 transition-all",
                        viewMode === "grid" ? "bg-champagne-gold/20 text-champagne-gold" : "hover:bg-muted"
                      )}
                    >
                      <Grid3X3 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setViewMode("list")}
                      className={cn(
                        "rounded-lg h-9 w-9 transition-all",
                        viewMode === "list" ? "bg-champagne-gold/20 text-champagne-gold" : "hover:bg-muted"
                      )}
                    >
                      <List className="w-4 h-4" />
                    </Button>
                  </div>
                  <Button
                    variant="outline"
                    className="rounded-xl border-border/50 hover:border-champagne-gold/40"
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-4 md:px-6 lg:px-8 pb-24 lg:pb-8">
          {/* Categories */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6 md:mb-8"
          >
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-sm font-heading font-semibold text-muted-foreground uppercase tracking-wider">
                Categories
              </h2>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {categories.map((category, index) => (
                <motion.button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    "relative p-4 rounded-2xl border transition-all duration-300 text-left overflow-hidden group",
                    activeCategory === category.id
                      ? "border-champagne-gold/50 bg-gradient-to-br from-champagne-gold/10 to-champagne-gold/5 shadow-lg shadow-champagne-gold/10"
                      : "border-border/50 bg-card/60 backdrop-blur-sm hover:border-champagne-gold/30 hover:shadow-md"
                  )}
                >
                  {/* Background Gradient */}
                  <div className={cn(
                    "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                    category.color
                  )} />
                  
                  <div className="relative z-10">
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-all duration-300",
                      activeCategory === category.id
                        ? "bg-champagne-gold/20 text-champagne-gold"
                        : "bg-muted/50 text-muted-foreground group-hover:bg-champagne-gold/10 group-hover:text-champagne-gold"
                    )}>
                      <category.icon className="w-5 h-5" />
                    </div>
                    <p className={cn(
                      "font-heading font-medium text-sm truncate transition-colors",
                      activeCategory === category.id ? "text-foreground" : "text-foreground/80"
                    )}>
                      {category.name}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {category.count} files
                    </p>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Starred Section */}
          {filteredResources.some((r) => r.starred) && activeCategory === "all" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-6 md:mb-8"
            >
              <div className="flex items-center gap-2 mb-4">
                <Star className="w-4 h-4 text-champagne-gold fill-champagne-gold" />
                <h2 className="text-sm font-heading font-semibold text-muted-foreground uppercase tracking-wider">
                  Starred
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {filteredResources
                  .filter((r) => r.starred)
                  .slice(0, 4)
                  .map((resource, index) => {
                    const fileStyle = getFileIcon(resource.type);
                    return (
                      <motion.div
                        key={resource.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ scale: 1.02, y: -2 }}
                        className="relative p-4 rounded-2xl border border-champagne-gold/30 bg-gradient-to-br from-champagne-gold/5 to-transparent backdrop-blur-sm hover:shadow-lg hover:shadow-champagne-gold/10 transition-all duration-300 cursor-pointer group"
                        onClick={() => handlePreview(resource.name)}
                      >
                        <div className="flex items-start gap-3">
                          <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0", fileStyle.bg)}>
                            <fileStyle.icon className={cn("w-5 h-5", fileStyle.color)} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-heading font-medium text-sm truncate">{resource.name}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">{resource.size}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleStar(resource.id);
                            }}
                            className="rounded-lg h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Star className="w-4 h-4 text-champagne-gold fill-champagne-gold" />
                          </Button>
                        </div>
                      </motion.div>
                    );
                  })}
              </div>
            </motion.div>
          )}

          {/* All Files */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <FolderOpen className="w-4 h-4 text-muted-foreground" />
                <h2 className="text-sm font-heading font-semibold text-muted-foreground uppercase tracking-wider">
                  {activeCategory === "all" ? "All Files" : categories.find((c) => c.id === activeCategory)?.name}
                </h2>
                <Badge variant="secondary" className="rounded-full text-xs">
                  {filteredResources.length}
                </Badge>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="w-3.5 h-3.5" />
                <span>Last modified</span>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {viewMode === "grid" ? (
                <motion.div
                  key="grid"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-h-[60vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-champagne-gold/20 scrollbar-track-transparent"
                >
                  {filteredResources.map((resource) => {
                    const fileStyle = getFileIcon(resource.type);
                    const isSelected = selectedResource === resource.id;
                    return (
                      <motion.div
                        key={resource.id}
                        variants={itemVariants}
                        layout
                        whileHover={{ scale: 1.02, y: -3 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedResource(isSelected ? null : resource.id)}
                        className={cn(
                          "relative p-5 rounded-2xl border transition-all duration-300 cursor-pointer group overflow-hidden",
                          isSelected
                            ? "border-champagne-gold/50 bg-gradient-to-br from-champagne-gold/10 to-champagne-gold/5 shadow-lg shadow-champagne-gold/10 ring-2 ring-champagne-gold/20"
                            : "border-border/50 bg-card/60 backdrop-blur-sm hover:border-champagne-gold/30 hover:shadow-lg"
                        )}
                      >
                        {/* Hover Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-br from-champagne-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        <div className="relative z-10">
                          {/* Header */}
                          <div className="flex items-start justify-between mb-4">
                            <motion.div 
                              className={cn("w-12 h-12 rounded-xl flex items-center justify-center", fileStyle.bg)}
                              whileHover={{ rotate: [0, -5, 5, 0] }}
                              transition={{ duration: 0.3 }}
                            >
                              <fileStyle.icon className={cn("w-6 h-6", fileStyle.color)} />
                            </motion.div>
                            <div className="flex items-center gap-1">
                              <motion.button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleStar(resource.id);
                                }}
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                                className="p-1.5 rounded-lg hover:bg-muted/50 transition-colors"
                              >
                                {resource.starred ? (
                                  <Star className="w-4 h-4 text-champagne-gold fill-champagne-gold" />
                                ) : (
                                  <StarOff className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                                )}
                              </motion.button>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <MoreVertical className="w-4 h-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="rounded-xl">
                                  <DropdownMenuItem onClick={() => handlePreview(resource.name)}>
                                    <Eye className="w-4 h-4 mr-2" />
                                    Preview
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleDownload(resource.name)}>
                                    <Download className="w-4 h-4 mr-2" />
                                    Download
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Share2 className="w-4 h-4 mr-2" />
                                    Share
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-destructive">
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>

                          {/* Info */}
                          <div>
                            <p className="font-heading font-semibold text-sm truncate mb-1">{resource.name}</p>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <span>{resource.size}</span>
                              <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
                              <span>{resource.modified}</span>
                            </div>
                          </div>

                          {/* Quick Actions */}
                          <div className="mt-4 pt-3 border-t border-border/50 flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex-1 rounded-xl text-xs h-8 hover:bg-champagne-gold/10 hover:border-champagne-gold/40"
                              onClick={(e) => {
                                e.stopPropagation();
                                handlePreview(resource.name);
                              }}
                            >
                              <Eye className="w-3 h-3 mr-1.5" />
                              View
                            </Button>
                            <Button
                              size="sm"
                              className="flex-1 rounded-xl text-xs h-8 bg-champagne-gold hover:bg-champagne-gold/90 text-champagne-gold-foreground"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDownload(resource.name);
                              }}
                            >
                              <Download className="w-3 h-3 mr-1.5" />
                              Download
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              ) : (
                <motion.div
                  key="list"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="rounded-2xl border border-border/50 bg-card/60 backdrop-blur-sm overflow-hidden"
                >
                  {/* List Header */}
                  <div className="grid grid-cols-12 gap-4 px-4 py-3 border-b border-border/50 bg-muted/30 sticky top-0 z-10">
                    <div className="col-span-6 md:col-span-5 text-xs font-heading font-semibold text-muted-foreground uppercase tracking-wider">
                      Name
                    </div>
                    <div className="hidden md:block col-span-2 text-xs font-heading font-semibold text-muted-foreground uppercase tracking-wider">
                      Size
                    </div>
                    <div className="col-span-4 md:col-span-3 text-xs font-heading font-semibold text-muted-foreground uppercase tracking-wider">
                      Modified
                    </div>
                    <div className="col-span-2 text-xs font-heading font-semibold text-muted-foreground uppercase tracking-wider text-right">
                      Actions
                    </div>
                  </div>

                  {/* Scrollable List Items */}
                  <div className="max-h-[55vh] overflow-y-auto">
                  {/* List Items */}
                  {filteredResources.map((resource, index) => {
                    const fileStyle = getFileIcon(resource.type);
                    return (
                      <motion.div
                        key={resource.id}
                        variants={itemVariants}
                        whileHover={{ backgroundColor: "rgba(212, 175, 55, 0.05)" }}
                        className="grid grid-cols-12 gap-4 px-4 py-3 border-b border-border/30 last:border-b-0 cursor-pointer group transition-colors"
                        onClick={() => handlePreview(resource.name)}
                      >
                        <div className="col-span-6 md:col-span-5 flex items-center gap-3">
                          <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center shrink-0", fileStyle.bg)}>
                            <fileStyle.icon className={cn("w-4 h-4", fileStyle.color)} />
                          </div>
                          <div className="min-w-0">
                            <p className="font-heading font-medium text-sm truncate">{resource.name}</p>
                            <p className="text-xs text-muted-foreground md:hidden">{resource.size}</p>
                          </div>
                          {resource.starred && (
                            <Star className="w-3.5 h-3.5 text-champagne-gold fill-champagne-gold shrink-0" />
                          )}
                        </div>
                        <div className="hidden md:flex col-span-2 items-center text-sm text-muted-foreground">
                          {resource.size}
                        </div>
                        <div className="col-span-4 md:col-span-3 flex items-center text-sm text-muted-foreground">
                          {resource.modified}
                        </div>
                        <div className="col-span-2 flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDownload(resource.name);
                            }}
                          >
                            <Download className="w-4 h-4" />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="rounded-xl">
                              <DropdownMenuItem onClick={() => handlePreview(resource.name)}>
                                <Eye className="w-4 h-4 mr-2" />
                                Preview
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => toggleStar(resource.id)}>
                                {resource.starred ? (
                                  <>
                                    <StarOff className="w-4 h-4 mr-2" />
                                    Remove Star
                                  </>
                                ) : (
                                  <>
                                    <Star className="w-4 h-4 mr-2" />
                                    Add Star
                                  </>
                                )}
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Share2 className="w-4 h-4 mr-2" />
                                Share
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </motion.div>
                    );
                  })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Empty State */}
            {filteredResources.length === 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-16 text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-muted/50 flex items-center justify-center mb-4">
                  <FolderOpen className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="font-heading font-semibold text-lg mb-1">No files found</h3>
                <p className="text-sm text-muted-foreground max-w-sm">
                  {searchQuery
                    ? `No files matching "${searchQuery}" in this category`
                    : "This folder is empty. Upload files to get started."}
                </p>
                <Button className="mt-4 rounded-xl bg-champagne-gold hover:bg-champagne-gold/90 text-champagne-gold-foreground">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Files
                </Button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </ArchitectLayout>
  );
};

export default ArchitectResources;
