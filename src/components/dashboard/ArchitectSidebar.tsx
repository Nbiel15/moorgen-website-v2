import { 
  LayoutDashboard, 
  FolderKanban, 
  ClipboardCheck, 
  MessageSquare, 
  FileArchive, 
  Settings,
  Sparkles 
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/architect-dashboard" },
  { icon: FolderKanban, label: "Projects", path: "/architect-projects" },
  { icon: ClipboardCheck, label: "Validations", path: "/architect-validations" },
  { icon: MessageSquare, label: "Messages", path: "/architect-messages" },
  { icon: FileArchive, label: "Resources", path: "/architect-resources" },
  { icon: Settings, label: "Settings", path: "/architect-settings" },
];

const ArchitectSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Spacer to maintain layout flow */}
      <div className="hidden lg:block w-20 flex-shrink-0" />
      
      {/* Fixed Sidebar */}
      <aside className="hidden lg:flex flex-col w-20 fixed left-0 top-0 h-screen bg-gradient-to-b from-[#0a0a0a] via-[#1a1a1a] to-[#0a0a0a] border-r border-champagne-gold/10 items-center justify-center z-50">
        {/* Decorative top accent */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-champagne-gold/40 to-transparent" />
        
        {/* Logo - Positioned at top */}
        <div className="absolute top-8 group">
          <div 
            className={cn(
              "w-12 h-12 rounded-xl bg-gradient-to-br from-champagne-gold/20 to-champagne-gold/5 flex items-center justify-center cursor-pointer",
              "border border-champagne-gold/30",
              "shadow-lg shadow-champagne-gold/10",
              "transition-all duration-300 ease-out",
              "hover:scale-110 hover:-translate-y-0.5 hover:border-champagne-gold/50",
              "active:scale-95"
            )}
            onClick={() => navigate("/architect-dashboard")}
          >
            <span className="text-champagne-gold font-heading font-bold text-xl transition-transform duration-300 group-hover:scale-110">A</span>
          </div>
          {/* Glow effect on hover */}
          <div className="absolute inset-0 rounded-xl bg-champagne-gold/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
        </div>

        {/* Role Label */}
        <div className="absolute top-24 flex flex-col items-center">
          <span className="text-[10px] text-champagne-gold/60 font-heading tracking-widest uppercase">Architect</span>
          <div className="w-6 h-px bg-champagne-gold/20 mt-2" />
        </div>

        {/* Navigation - Centered vertically */}
        <nav className="flex flex-col gap-2 mt-8">
          {navItems.map((item, index) => (
            <div 
              key={item.label} 
              className="relative group"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <button
                onClick={() => navigate(item.path)}
                className={cn(
                  "relative w-12 h-12 rounded-xl flex items-center justify-center overflow-hidden",
                  "transition-all duration-300 ease-out",
                  "hover:scale-110 hover:-translate-y-0.5",
                  "active:scale-95",
                  isActive(item.path)
                    ? "bg-gradient-to-br from-champagne-gold/30 to-champagne-gold/10 text-champagne-gold shadow-lg shadow-champagne-gold/20 border border-champagne-gold/30"
                    : "text-white/40 hover:text-white/70 hover:bg-white/5 border border-transparent hover:border-champagne-gold/20"
                )}
                title={item.label}
              >
                {/* Active indicator glow */}
                {isActive(item.path) && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-br from-champagne-gold/10 to-transparent animate-pulse" />
                    <Sparkles className="absolute top-1 right-1 w-2.5 h-2.5 text-champagne-gold animate-pulse" />
                  </>
                )}
                
                <item.icon
                  className={cn(
                    "w-5 h-5 transition-all duration-300 relative z-10",
                    "group-hover:scale-110",
                    isActive(item.path) ? "stroke-[2]" : "stroke-[1.5]"
                  )}
                />
              </button>

              {/* Tooltip with animation */}
              <div className={cn(
                "absolute left-full ml-3 top-1/2 -translate-y-1/2",
                "px-3 py-1.5 rounded-lg",
                "bg-gradient-to-r from-[#1a1a1a] to-[#252525] text-white text-xs font-heading tracking-wide",
                "border border-champagne-gold/20",
                "opacity-0 translate-x-2 pointer-events-none",
                "group-hover:opacity-100 group-hover:translate-x-0",
                "transition-all duration-200 ease-out",
                "whitespace-nowrap shadow-lg shadow-black/50"
              )}>
                {item.label}
                {/* Arrow */}
                <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-[#1a1a1a]" />
              </div>

              {/* Active indicator bar */}
              <div className={cn(
                "absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-1 rounded-full",
                "transition-all duration-300 ease-out",
                isActive(item.path) 
                  ? "h-6 bg-champagne-gold shadow-[0_0_10px_rgba(212,175,55,0.5)]" 
                  : "h-0 bg-transparent"
              )} />
            </div>
          ))}
        </nav>

        {/* Decorative bottom accent */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-champagne-gold/40 to-transparent" />
        
        {/* Bottom decorative element */}
        <div className="absolute bottom-8 flex flex-col items-center gap-2">
          <div className="w-6 h-px bg-champagne-gold/20" />
          <div className="w-2 h-2 rounded-full bg-champagne-gold/30 animate-pulse" />
        </div>
      </aside>
    </>
  );
};

export default ArchitectSidebar;
