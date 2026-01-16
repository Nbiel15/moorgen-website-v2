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
  MoreVertical,
  Eye,
  Share2,
  Trash2,
  FolderPlus,
  Upload,
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

          <div className="relative px-4 md:px-6 lg:px-8 py-4 md:py-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              {/* Top Bar - Compact */}
              <div className="flex items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => navigate("/architect-dashboard")}
                      className="rounded-xl hover:bg-champagne-gold/10 hover:text-champagne-gold transition-all duration-300 w-9 h-9"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </Button>
                  </motion.div>
                  <div>
                    <h1 className="text-xl md:text-2xl font-heading font-bold tracking-tight">
                      Resources
                    </h1>
                    <p className="text-muted-foreground font-body text-xs hidden sm:block">
                      Project files & assets
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-xl border-border/60 hover:border-champagne-gold/40 hover:bg-champagne-gold/5 h-9"
                  >
                    <FolderPlus className="w-4 h-4 sm:mr-2" />
                    <span className="hidden sm:inline">New Folder</span>
                  </Button>
                  <Button 
                    size="sm"
                    className="rounded-xl bg-champagne-gold hover:bg-champagne-gold/90 text-champagne-gold-foreground h-9"
                  >
                    <Upload className="w-4 h-4 sm:mr-2" />
                    <span className="hidden sm:inline">Upload</span>
                  </Button>
                </div>
              </div>

              {/* Search & Controls - Single Row */}
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search files..."
                    className="pl-9 pr-4 h-9 rounded-xl bg-card/60 backdrop-blur-sm border-border/50 focus:border-champagne-gold/40 text-sm"
                  />
                </div>
                <div className="flex items-center p-0.5 rounded-lg bg-card/60 backdrop-blur-sm border border-border/50">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setViewMode("grid")}
                    className={cn(
                      "rounded-md h-8 w-8 transition-all",
                      viewMode === "grid" ? "bg-champagne-gold/20 text-champagne-gold" : "hover:bg-muted"
                    )}
                  >
                    <Grid3X3 className="w-3.5 h-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setViewMode("list")}
                    className={cn(
                      "rounded-md h-8 w-8 transition-all",
                      viewMode === "list" ? "bg-champagne-gold/20 text-champagne-gold" : "hover:bg-muted"
                    )}
                  >
                    <List className="w-3.5 h-3.5" />
                  </Button>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-xl border-border/50 hover:border-champagne-gold/40 h-9 px-3"
                >
                  <Filter className="w-3.5 h-3.5" />
                </Button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-4 md:px-6 lg:px-8 pb-24 lg:pb-8">
          {/* Categories - Horizontal Scrollable Pills */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-4"
          >
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-xl border transition-all duration-300 whitespace-nowrap shrink-0",
                    activeCategory === category.id
                      ? "border-champagne-gold/50 bg-champagne-gold/10 text-champagne-gold"
                      : "border-border/50 bg-card/60 text-muted-foreground hover:border-champagne-gold/30"
                  )}
                >
                  <category.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{category.name}</span>
                  <span className={cn(
                    "text-xs px-1.5 py-0.5 rounded-md",
                    activeCategory === category.id ? "bg-champagne-gold/20" : "bg-muted/50"
                  )}>
                    {category.count}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* All Files - Combined with Starred indicators */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-heading font-semibold text-muted-foreground">
                  {activeCategory === "all" ? "All Files" : categories.find((c) => c.id === activeCategory)?.name}
                </h2>
                <Badge variant="secondary" className="rounded-full text-xs h-5 px-2">
                  {filteredResources.length}
                </Badge>
              </div>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Modified
              </span>
            </div>

            <AnimatePresence mode="wait">
              {viewMode === "grid" ? (
                <motion.div
                  key="grid"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 max-h-[calc(100vh-280px)] overflow-y-auto pr-1"
                >
                  {filteredResources.map((resource) => {
                    const fileStyle = getFileIcon(resource.type);
                    const isSelected = selectedResource === resource.id;
                    return (
                      <motion.div
                        key={resource.id}
                        variants={itemVariants}
                        layout
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => setSelectedResource(isSelected ? null : resource.id)}
                        className={cn(
                          "relative p-3 rounded-xl border transition-all duration-200 cursor-pointer group",
                          isSelected
                            ? "border-champagne-gold/50 bg-champagne-gold/5 ring-1 ring-champagne-gold/20"
                            : "border-border/50 bg-card/60 hover:border-champagne-gold/30"
                        )}
                      >
                        <div className="flex flex-col gap-2">
                          {/* Icon & Star Row */}
                          <div className="flex items-center justify-between">
                            <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center", fileStyle.bg)}>
                              <fileStyle.icon className={cn("w-4 h-4", fileStyle.color)} />
                            </div>
                            <div className="flex items-center gap-0.5">
                              {resource.starred && (
                                <Star className="w-3 h-3 text-champagne-gold fill-champagne-gold" />
                              )}
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6 rounded-md opacity-0 group-hover:opacity-100"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <MoreVertical className="w-3 h-3" />
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
                                  <DropdownMenuItem onClick={() => toggleStar(resource.id)}>
                                    <Star className="w-4 h-4 mr-2" />
                                    {resource.starred ? "Unstar" : "Star"}
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

                          {/* Name & Meta */}
                          <div>
                            <p className="font-medium text-xs truncate leading-tight">{resource.name}</p>
                            <p className="text-[10px] text-muted-foreground mt-0.5">
                              {resource.size} · {resource.modified}
                            </p>
                          </div>

                          {/* Compact Actions */}
                          <div className="flex items-center gap-1.5 pt-1">
                            <Button
                              size="sm"
                              variant="ghost"
                              className="flex-1 rounded-lg text-[10px] h-7 hover:bg-champagne-gold/10 px-2"
                              onClick={(e) => {
                                e.stopPropagation();
                                handlePreview(resource.name);
                              }}
                            >
                              <Eye className="w-3 h-3 mr-1" />
                              View
                            </Button>
                            <Button
                              size="sm"
                              className="flex-1 rounded-lg text-[10px] h-7 bg-champagne-gold/90 hover:bg-champagne-gold text-champagne-gold-foreground px-2"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDownload(resource.name);
                              }}
                            >
                              <Download className="w-3 h-3 mr-1" />
                              Get
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
                                <Star className="w-4 h-4 mr-2" />
                                {resource.starred ? "Remove Star" : "Add Star"}
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
