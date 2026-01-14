import { Home, Sliders, TrendingUp, FileText, Headphones } from "lucide-react";
import { useState } from "react";

const navItems = [
  { icon: Home, label: "Home", active: true },
  { icon: Sliders, label: "Controls" },
  { icon: TrendingUp, label: "Progress" },
  { icon: FileText, label: "Documents" },
  { icon: Headphones, label: "Support" },
];

const DashboardSidebar = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <aside className="hidden lg:flex flex-col w-20 bg-white border-r border-[#E5E5E5] py-8 items-center gap-2">
      {/* Logo */}
      <div className="mb-8">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-champagne-gold to-champagne-gold/70 flex items-center justify-center">
          <span className="text-white font-serif font-bold text-lg">M</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-2 flex-1">
        {navItems.map((item, index) => (
          <button
            key={item.label}
            onClick={() => setActiveIndex(index)}
            className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 group ${
              activeIndex === index
                ? "bg-champagne-gold/10 text-champagne-gold"
                : "text-charcoal/40 hover:text-charcoal hover:bg-gray-50"
            }`}
            title={item.label}
          >
            <item.icon
              className={`w-5 h-5 transition-all ${
                activeIndex === index ? "stroke-[2.5]" : "stroke-[1.5]"
              }`}
            />
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default DashboardSidebar;
