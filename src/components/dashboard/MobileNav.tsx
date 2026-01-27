import { Home, TrendingUp, MessageCircle, User } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const navItems = [
  { icon: Home, label: "Home", path: "/lifestyle-dashboard" },
  // { icon: Sliders, label: "Controls", path: "/controls" }, // HIDDEN: temporarily disabled
  { icon: TrendingUp, label: "Progress", path: "/progress" },
  { icon: MessageCircle, label: "Chat", path: "/engineer-chat" },
  { icon: User, label: "Support", path: "/support" },
];

const MobileNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#E5E5E5] px-4 py-2 z-50">
      <div className="flex items-center justify-around">
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={() => navigate(item.path)}
            className={`flex flex-col items-center gap-1 py-2 px-3 rounded-xl transition-all ${
              isActive(item.path) ? "text-champagne-gold" : "text-charcoal/40"
            }`}
            aria-current={isActive(item.path) ? "page" : undefined}
            aria-label={item.label}
          >
            <item.icon className="w-5 h-5" />
            <span className="text-[10px] font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default MobileNav;
