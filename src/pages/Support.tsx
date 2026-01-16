import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Lightbulb, Thermometer, Shield, Wifi, MessageCircle, Download, FileText, CheckCircle, User } from "lucide-react";
const supportCategories = [{
  icon: Lightbulb,
  title: "Lighting Issues",
  description: "Dimming, scheduling, and scene configuration",
  color: "from-[#1a1a1a] via-[#252525] to-[#1a1a1a]",
  borderColor: "border-champagne-gold/40",
  iconColor: "text-champagne-gold",
  glowColor: "shadow-champagne-gold/20"
}, {
  icon: Thermometer,
  title: "Climate Control",
  description: "HVAC, temperature sensors, and automation",
  color: "from-[#1a1a1a] via-[#252525] to-[#1a1a1a]",
  borderColor: "border-champagne-gold/40",
  iconColor: "text-champagne-gold",
  glowColor: "shadow-champagne-gold/20"
}, {
  icon: Shield,
  title: "Security Systems",
  description: "Cameras, access control, and alerts",
  color: "from-[#1a1a1a] via-[#252525] to-[#1a1a1a]",
  borderColor: "border-champagne-gold/40",
  iconColor: "text-champagne-gold",
  glowColor: "shadow-champagne-gold/20"
}, {
  icon: Wifi,
  title: "Network & Integration",
  description: "Connectivity, third-party devices, and protocols",
  color: "from-[#1a1a1a] via-[#252525] to-[#1a1a1a]",
  borderColor: "border-champagne-gold/40",
  iconColor: "text-champagne-gold",
  glowColor: "shadow-champagne-gold/20"
}];
const manuals = [{
  name: "Milan Series Touch Panel Guide",
  size: "2.4 MB",
  type: "PDF"
}, {
  name: "HVAC Integration Manual",
  size: "1.8 MB",
  type: "PDF"
}, {
  name: "Lighting Scene Programming",
  size: "3.1 MB",
  type: "PDF"
}, {
  name: "Security System Quick Start",
  size: "1.2 MB",
  type: "PDF"
}];
const SupportManagerPanel = () => {
  const navigate = useNavigate();
  return <div className="hidden lg:block w-80 xl:w-96 border-l border-border/50 bg-gradient-to-b from-background to-muted/20 p-6 overflow-y-auto">
      <motion.div initial={{
      opacity: 0,
      x: 20
    }} animate={{
      opacity: 1,
      x: 0
    }} transition={{
      delay: 0.2
    }} className="space-y-6">
        {/* Dedicated Support Manager */}
        <div className="bg-foreground rounded-2xl p-5 text-background">
          <h3 className="font-heading text-lg mb-4 text-champagne-gold">Dedicated Support Manager</h3>
          
          <div className="flex items-center gap-4 mb-5">
            <div className="w-16 h-16 rounded-full bg-champagne-gold flex items-center justify-center text-foreground font-heading text-xl">
              PA
            </div>
            <div>
              <p className="font-heading text-lg text-background">Putu Ayu</p>
              <p className="text-xs text-background/60 font-body">Senior Support Specialist</p>
              <div className="flex items-center gap-1.5 mt-1">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-[10px] text-emerald-400 font-body">Available Now</span>
              </div>
            </div>
          </div>

          <motion.button whileHover={{
          scale: 1.02
        }} whileTap={{
          scale: 0.98
        }} onClick={() => navigate("/engineer-chat")} className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-champagne-gold text-foreground font-body font-medium text-sm hover:bg-champagne-gold/90 transition-colors">
            <MessageCircle className="w-4 h-4" />
            Start Chat
          </motion.button>
        </div>

        {/* System Status Widget */}
        <div className="bg-foreground rounded-2xl p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-heading text-base text-champagne-gold">System Status</h3>
            <motion.div animate={{
            scale: [1, 1.3, 1],
            boxShadow: ["0 0 0 0 rgba(34, 197, 94, 0.4)", "0 0 0 8px rgba(34, 197, 94, 0)", "0 0 0 0 rgba(34, 197, 94, 0)"]
          }} transition={{
            duration: 2,
            repeat: Infinity
          }} className="w-3 h-3 bg-emerald-500 rounded-full" />
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
            <CheckCircle className="w-5 h-5 text-emerald-400" />
            <div>
              <p className="text-sm text-background font-body">All Systems Stable</p>
              <p className="text-[10px] text-background/50 font-body">Last checked: 2 min ago</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-4">
            <div className="text-center p-2 bg-background/5 rounded-lg">
              <p className="text-lg font-heading text-champagne-gold">24</p>
              <p className="text-[9px] text-background/50 uppercase tracking-wider font-body">Devices</p>
            </div>
            <div className="text-center p-2 bg-background/5 rounded-lg">
              <p className="text-lg font-heading text-emerald-400">100%</p>
              <p className="text-[9px] text-background/50 uppercase tracking-wider font-body">Uptime</p>
            </div>
          </div>
        </div>

        {/* Documentation Vault */}
        <div className="bg-white/90 backdrop-blur-md rounded-2xl p-5 border border-border/50 shadow-sm">
          <h3 className="font-heading text-base text-foreground mb-4">Quick Manuals</h3>
          
          <div className="space-y-2">
            {manuals.map((manual, index) => <motion.button key={index} whileHover={{
            scale: 1.01,
            x: 4
          }} whileTap={{
            scale: 0.99
          }} className="w-full flex items-center gap-3 p-3 rounded-xl bg-muted/50 hover:bg-champagne-gold/10 border border-transparent hover:border-champagne-gold/20 transition-all text-left group">
                <div className="w-8 h-8 rounded-lg bg-champagne-gold/10 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-4 h-4 text-champagne-gold" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-body text-foreground truncate">{manual.name}</p>
                  <p className="text-[10px] text-muted-foreground font-body">{manual.size} • {manual.type}</p>
                </div>
                <Download className="w-4 h-4 text-muted-foreground group-hover:text-champagne-gold transition-colors" />
              </motion.button>)}
          </div>
        </div>
      </motion.div>
    </div>;
};
const Support = () => {
  return <DashboardLayout showRightPanel rightPanel={<SupportManagerPanel />}>
      <div className="min-h-screen">
        {/* Premium Header */}
        <header className="relative overflow-hidden border-b border-border/50 bg-gradient-to-br from-background via-background to-muted/30">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-72 md:w-96 h-72 md:h-96 bg-gradient-to-bl from-champagne-gold/5 via-transparent to-transparent rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-48 md:w-64 h-48 md:h-64 bg-gradient-to-tr from-champagne-gold/10 to-transparent rounded-full blur-2xl" />
          
          <div className="relative mx-auto w-full max-w-7xl px-4 py-6 md:px-8 md:py-10">
            <div className="flex flex-col gap-6">
              {/* Title Section */}
              <motion.div initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.5
            }}>
                <div className="flex items-center gap-2 mb-2">
                  <motion.div animate={{
                  scale: [1, 1.2, 1]
                }} transition={{
                  duration: 2,
                  repeat: Infinity
                }} className="w-1.5 h-1.5 rounded-full bg-champagne-gold" />
                  <p className="text-[10px] sm:text-xs text-champagne-gold tracking-[0.3em] uppercase font-body">Premium Support</p>
                </div>
                <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-foreground">
                  Luxury Support Concierge
                </h1>
                <p className="text-muted-foreground font-body mt-2 text-xs sm:text-sm md:text-base">
                  Dedicated assistance for your smart home ecosystem
                </p>
              </motion.div>

              {/* Luxury Search Bar */}
              <motion.div initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.5,
              delay: 0.1
            }} className="max-w-2xl">
                <motion.div className="relative group" whileHover={{
                scale: 1.01
              }} transition={{
                duration: 0.2
              }}>
                  {/* Glow Effect */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-champagne-gold/20 via-champagne-gold/10 to-champagne-gold/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-500" />
                  
                  {/* Search Container */}
                  <div className="relative flex items-center bg-foreground/95 backdrop-blur-xl rounded-2xl border border-champagne-gold/20 group-hover:border-champagne-gold/40 group-focus-within:border-champagne-gold/50 transition-all duration-300 shadow-lg shadow-black/10">
                    {/* Animated Search Icon */}
                    <motion.div className="absolute left-5 flex items-center justify-center" animate={{
                    scale: [1, 1.1, 1]
                  }} transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}>
                      <Search className="w-5 h-5 text-champagne-gold" />
                    </motion.div>
                    
                    <Input placeholder="Search FAQs, guides, and troubleshooting..." className="pl-14 pr-6 py-7 bg-transparent border-0 font-body text-sm text-background placeholder:text-background/40 focus-visible:ring-0 focus-visible:ring-offset-0" />
                    
                    {/* Keyboard Shortcut Hint */}
                    <div className="absolute right-4 hidden sm:flex items-center gap-1.5">
                      <kbd className="px-2 py-1 text-[10px] font-body text-background/40 bg-background/10 rounded-md border border-background/10">
                        ⌘K
                      </kbd>
                    </div>
                  </div>
                </motion.div>
                
                {/* Quick Search Tags */}
              <motion.div initial={{
                opacity: 0
              }} animate={{
                opacity: 1
              }} transition={{
                delay: 0.3
              }} className="flex flex-wrap gap-2 mt-4">
                  {["Reset Panel", "Dim Lights", "Schedule Scene", "Connect Device"].map((tag, index) => (
                    <motion.button
                      key={tag}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + index * 0.05 }}
                      whileHover={{ scale: 1.05, backgroundColor: "rgba(212, 175, 55, 0.2)" }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 text-xs font-body text-champagne-gold/70 hover:text-champagne-gold bg-champagne-gold/5 hover:bg-champagne-gold/10 rounded-full border border-champagne-gold/20 hover:border-champagne-gold/40 transition-all duration-300"
                    >
                      {tag}
                    </motion.button>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="mx-auto w-full max-w-7xl px-4 py-6 md:px-8 md:py-10">
          {/* Support Categories Grid */}
          <motion.div initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} transition={{
          duration: 0.5,
          delay: 0.2
        }} className="grid grid-cols-2 gap-4 md:gap-6">
          {supportCategories.map((category, index) => <motion.div key={category.title} initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.4,
            delay: 0.1 * (index + 1)
          }} whileHover={{
            scale: 1.02,
            y: -6
          }} whileTap={{
            scale: 0.98
          }} className={`relative overflow-hidden rounded-2xl border-2 ${category.borderColor} bg-gradient-to-br ${category.color} p-6 md:p-8 cursor-pointer group transition-all duration-500 hover:shadow-2xl hover:${category.glowColor} hover:border-champagne-gold/60`}>
                {/* Luxury Background Pattern */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-champagne-gold/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                {/* Corner Accent */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-champagne-gold/10 to-transparent rounded-bl-[100px] opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Animated Border Glow */}
                <motion.div 
                  className="absolute inset-0 rounded-2xl border border-champagne-gold/0 group-hover:border-champagne-gold/30 transition-all duration-500"
                  animate={{
                    boxShadow: ["0 0 0 0 rgba(212, 175, 55, 0)", "0 0 20px 2px rgba(212, 175, 55, 0.1)", "0 0 0 0 rgba(212, 175, 55, 0)"]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                <div className="relative z-10">
                  {/* Icon Container with Gold Ring */}
                  <div className="relative mb-5">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] flex items-center justify-center border border-champagne-gold/30 group-hover:border-champagne-gold/60 transition-all duration-500 group-hover:shadow-lg group-hover:shadow-champagne-gold/10`}>
                      <category.icon className={`w-8 h-8 ${category.iconColor} group-hover:scale-110 transition-transform duration-300`} />
                    </div>
                    {/* Subtle Glow Behind Icon */}
                    <div className="absolute inset-0 w-16 h-16 rounded-2xl bg-champagne-gold/20 blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500 -z-10" />
                  </div>
                  
                  <h3 className="font-heading text-xl md:text-2xl text-white mb-2 group-hover:text-champagne-gold transition-colors duration-300">{category.title}</h3>
                  <p className="text-sm text-white/60 font-body leading-relaxed">{category.description}</p>
                  
                  {/* Elegant CTA */}
                  <div className="mt-5 flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                    <div className="h-px flex-1 bg-gradient-to-r from-champagne-gold/60 to-transparent" />
                    <span className="text-xs text-champagne-gold font-body tracking-wider uppercase">Explore</span>
                    <motion.span 
                      className="text-champagne-gold"
                      animate={{
                        x: [0, 6, 0]
                      }} 
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      →
                    </motion.span>
                  </div>
                </div>
              </motion.div>)}
          </motion.div>

          {/* Mobile: Support Manager Card */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.5,
          delay: 0.4
        }} className="lg:hidden mt-6">
            <MobileSupportManager />
          </motion.div>

          {/* Mobile: Quick Manuals */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.5,
          delay: 0.5
        }} className="lg:hidden mt-6">
            <MobileDocumentation />
          </motion.div>
        </main>
      </div>
    </DashboardLayout>;
};
const MobileSupportManager = () => {
  const navigate = useNavigate();
  return <div className="bg-foreground rounded-2xl p-5 text-background">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading text-lg text-champagne-gold">Your Support Manager</h3>
        <motion.div animate={{
        scale: [1, 1.3, 1]
      }} transition={{
        duration: 2,
        repeat: Infinity
      }} className="w-2.5 h-2.5 bg-emerald-500 rounded-full" />
      </div>
      
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-champagne-gold flex items-center justify-center text-foreground font-heading text-lg">
          PA
        </div>
        <div className="flex-1">
          <p className="font-heading text-base text-background">Putu Ayu</p>
          <p className="text-xs text-background/60 font-body">Available Now</p>
        </div>
        <Button onClick={() => navigate("/engineer-chat")} className="bg-champagne-gold hover:bg-champagne-gold/90 text-foreground font-body text-sm">
          <MessageCircle className="w-4 h-4 mr-2" />
          Chat
        </Button>
      </div>
    </div>;
};
const MobileDocumentation = () => {
  return null;
};
export default Support;