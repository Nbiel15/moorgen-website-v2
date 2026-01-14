import { Home, Sliders, TrendingUp, FileText, User } from "lucide-react";
import { useState } from "react";

const navItems = [
  { icon: Home, label: "Home" },
  { icon: Sliders, label: "Controls" },
  { icon: TrendingUp, label: "Progress" },
  { icon: FileText, label: "Docs" },
  { icon: User, label: "Profile" },
];

const MobileNav = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#E5E5E5] px-4 py-2 z-50">
      <div className="flex items-center justify-around">
        {navItems.map((item, index) => (
          <button
            key={item.label}
            onClick={() => setActiveIndex(index)}
            className={`flex flex-col items-center gap-1 py-2 px-3 rounded-xl transition-all ${
              activeIndex === index
                ? "text-champagne-gold"
                : "text-charcoal/40"
            }`}
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
