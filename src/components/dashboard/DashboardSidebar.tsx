import { Home, Sliders, TrendingUp, FileText, Headphones } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const navItems = [
  { icon: Home, label: "Home", path: "/lifestyle-dashboard" },
  { icon: Sliders, label: "Controls", path: "/controls" },
  { icon: TrendingUp, label: "Progress", path: "/progress" },
  { icon: FileText, label: "Documents", path: "/documents" },
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
        {/* Logo - Positioned at top */}
        <div className="absolute top-20">
          <div 
            className="w-10 h-10 rounded-xl bg-gradient-to-br from-champagne-gold to-champagne-gold/70 flex items-center justify-center shadow-sm cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => navigate("/lifestyle-dashboard")}
          >
            <span className="text-white font-serif font-bold text-lg">M</span>
          </div>
        </div>

        {/* Navigation - Centered vertically */}
        <nav className="flex flex-col gap-3">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 group ${
                isActive(item.path)
                  ? "bg-champagne-gold/10 text-champagne-gold shadow-sm"
                  : "text-charcoal/40 hover:text-charcoal/70 hover:bg-white/60"
              }`}
              title={item.label}
            >
              <item.icon
                className={`w-5 h-5 transition-all ${
                  isActive(item.path) ? "stroke-[2]" : "stroke-[1.5]"
                }`}
              />
            </button>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default DashboardSidebar;