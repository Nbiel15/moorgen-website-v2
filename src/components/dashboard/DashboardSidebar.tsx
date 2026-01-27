import { Home, TrendingUp, MessageCircle, Headphones, Sparkles } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: Home, label: "Home", path: "/lifestyle-dashboard" },
  // { icon: Sliders, label: "Controls", path: "/controls" }, // HIDDEN: temporarily disabled
  { icon: TrendingUp, label: "Progress", path: "/progress" },
  { icon: MessageCircle, label: "Chat", path: "/engineer-chat" },
  { icon: Headphones, label: "Support", path: "/support" },
];

const DashboardSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Spacer to maintain layout flow */}
      <div className="hidden lg:block w-20 flex-shrink-0" />
      
      {/* Fixed Sidebar */}
      <aside className="hidden lg:flex flex-col w-20 fixed left-0 top-0 h-screen bg-[#FAFAFA]/80 backdrop-blur-sm border-r border-[#E5E5E5]/50 items-center justify-center z-50">
        {/* Logo - Positioned at top with hover animation */}
        <div className="absolute top-20 group">
          <div 
            className={cn(
              "w-10 h-10 rounded-xl bg-foreground flex items-center justify-center cursor-pointer",
              "shadow-sm hover:shadow-lg hover:shadow-accent/20",
              "transition-all duration-300 ease-out",
              "hover:scale-110 hover:-translate-y-0.5",
              "active:scale-95"
            )}
            onClick={() => navigate("/lifestyle-dashboard")}
          >
            <span className="text-white font-serif font-bold text-lg transition-transform duration-300 group-hover:scale-110">M</span>
          </div>
          {/* Glow effect on hover */}
          <div className="absolute inset-0 rounded-xl bg-accent/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
        </div>

        {/* Navigation - Centered vertically with staggered animation */}
        <nav className="flex flex-col gap-3">
          {navItems.map((item, index) => (
            <div 
              key={item.label} 
              className="relative group"
              style={{ 
                animationDelay: `${index * 50}ms`,
              }}
            >
              <button
                onClick={() => navigate(item.path)}
                className={cn(
                  "relative w-12 h-12 rounded-2xl flex items-center justify-center overflow-hidden",
                  "transition-all duration-300 ease-out",
                  "hover:scale-110 hover:-translate-y-0.5",
                  "active:scale-95",
                  isActive(item.path)
                    ? "bg-gradient-to-br from-accent/20 to-accent/10 text-accent shadow-lg shadow-accent/10"
                    : "text-charcoal/40 hover:text-charcoal/70 hover:bg-white/80 hover:shadow-md"
                )}
                title={item.label}
              >
                {/* Active indicator glow */}
                {isActive(item.path) && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent animate-pulse" />
                    <Sparkles className="absolute top-1 right-1 w-2.5 h-2.5 text-accent animate-pulse" />
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
                "bg-foreground text-white text-xs font-medium tracking-wide",
                "opacity-0 translate-x-2 pointer-events-none",
                "group-hover:opacity-100 group-hover:translate-x-0",
                "transition-all duration-200 ease-out",
                "whitespace-nowrap shadow-lg"
              )}>
                {item.label}
                {/* Arrow */}
                <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-foreground" />
              </div>

              {/* Active indicator bar */}
              <div className={cn(
                "absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-1 rounded-full",
                "transition-all duration-300 ease-out",
                isActive(item.path) 
                  ? "h-6 bg-accent shadow-[0_0_10px_rgba(212,175,55,0.5)]" 
                  : "h-0 bg-transparent"
              )} />
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default DashboardSidebar;