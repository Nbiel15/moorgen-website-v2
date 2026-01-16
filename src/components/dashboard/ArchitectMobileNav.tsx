import { 
  LayoutDashboard, 
  FolderKanban, 
  ClipboardCheck, 
  MessageSquare, 
  FileArchive 
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/architect-dashboard" },
  { icon: FolderKanban, label: "Projects", path: "/architect-projects" },
  { icon: ClipboardCheck, label: "Validate", path: "/architect-validations" },
  { icon: MessageSquare, label: "Messages", path: "/architect-messages" },
  { icon: FileArchive, label: "Resources", path: "/architect-resources" },
];

const ArchitectMobileNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50">
      {/* Background with blur and gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#1a1a1a] to-[#1a1a1a]/95 backdrop-blur-lg" />
      
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-champagne-gold/30 to-transparent" />
      
      <div className="relative flex items-center justify-around px-2 py-3 safe-area-inset-bottom">
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={() => navigate(item.path)}
            className={cn(
              "relative flex flex-col items-center justify-center min-w-[60px] py-2 px-3 rounded-xl",
              "transition-all duration-300 ease-out",
              isActive(item.path)
                ? "text-champagne-gold"
                : "text-white/40 active:text-white/60"
            )}
          >
            {/* Active background */}
            {isActive(item.path) && (
              <motion.div
                layoutId="architect-mobile-nav-active"
                className="absolute inset-0 bg-gradient-to-t from-champagne-gold/20 to-champagne-gold/5 rounded-xl border border-champagne-gold/20"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            
            <item.icon
              className={cn(
                "w-5 h-5 relative z-10 transition-transform duration-200",
                isActive(item.path) ? "scale-110" : ""
              )}
            />
            <span className={cn(
              "text-[10px] mt-1 font-heading tracking-wide relative z-10",
              isActive(item.path) ? "font-medium" : ""
            )}>
              {item.label}
            </span>

            {/* Active indicator dot */}
            {isActive(item.path) && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 w-1 h-1 rounded-full bg-champagne-gold shadow-[0_0_8px_rgba(212,175,55,0.6)]"
              />
            )}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default ArchitectMobileNav;
