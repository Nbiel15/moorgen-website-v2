import { useState } from "react";
import { Utensils, Heart, MessageSquare, Focus } from "lucide-react";

type ModeType = "dining" | "romantic" | "chatting" | "focus";

interface ModeConfig {
  icon: React.ElementType;
  label: string;
  description: string;
  filter: string;
  overlay: string;
}

const modes: Record<ModeType, ModeConfig> = {
  dining: {
    icon: Utensils,
    label: "Dining",
    description: "Warm, inviting ambiance perfect for memorable dining experiences.",
    filter: "brightness(1.05) saturate(1.3) sepia(0.25)",
    overlay: "bg-gradient-to-t from-amber-500/20 via-transparent to-transparent",
  },
  romantic: {
    icon: Heart,
    label: "Romantic",
    description: "Soft, golden hues to create an intimate and serene atmosphere.",
    filter: "brightness(0.75) saturate(1.4) sepia(0.4) hue-rotate(-5deg)",
    overlay: "bg-gradient-to-br from-amber-600/30 via-rose-500/10 to-transparent",
  },
  chatting: {
    icon: MessageSquare,
    label: "Chatting",
    description: "Bright and clear lighting for vibrant conversations.",
    filter: "brightness(1.2) saturate(1.1) contrast(1.05)",
    overlay: "bg-gradient-to-t from-sky-200/10 via-transparent to-transparent",
  },
  focus: {
    icon: Focus,
    label: "Focus",
    description: "Neutral, crisp light to enhance productivity and clarity.",
    filter: "brightness(1.15) saturate(0.85) contrast(1.15) hue-rotate(5deg)",
    overlay: "bg-gradient-to-t from-slate-200/15 via-transparent to-transparent",
  },
};

const SmartPanelControls = () => {
  const [activeMode, setActiveMode] = useState<ModeType>("dining");

  return (
    <div className="bg-white rounded-3xl p-6 border border-[#E5E5E5] shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
      <h3 className="font-serif text-xl text-charcoal mb-6">Smart Panel Controls</h3>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Preview Image - Portrait/Square */}
        <div className="flex-1 max-w-sm">
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-br from-charcoal/5 to-charcoal/10">
            <img
              src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80"
              alt="Luxury Living Room"
              className="w-full h-full object-cover transition-all duration-[800ms] ease-in-out"
              style={{ filter: modes[activeMode].filter }}
            />
            {/* Dynamic Overlay */}
            <div 
              className={`absolute inset-0 transition-all duration-[800ms] ease-in-out ${modes[activeMode].overlay}`}
            />
            {/* Floating Badge */}
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-4 py-1.5 shadow-lg">
              <p className="text-[11px] font-medium text-charcoal tracking-wide">
                Powered by <span className="text-champagne-gold">Milan Series</span> Panel
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Button Grid + Description */}
        <div className="flex-1 flex flex-col justify-between">
          {/* 2x2 Button Grid */}
          <div className="grid grid-cols-2 gap-3">
            {(Object.keys(modes) as ModeType[]).map((mode) => {
              const { icon: Icon, label } = modes[mode];
              const isActive = activeMode === mode;

              return (
                <button
                  key={mode}
                  onClick={() => setActiveMode(mode)}
                  className={`group relative flex flex-col items-center justify-center gap-2 p-5 rounded-2xl border-2 transition-all duration-300 ${
                    isActive
                      ? "border-champagne-gold bg-champagne-gold/5 shadow-[0_0_20px_rgba(212,175,55,0.15)]"
                      : "border-[#E5E5E5] bg-white hover:border-champagne-gold/40 hover:bg-charcoal/[0.02]"
                  }`}
                >
                  <Icon
                    className={`w-6 h-6 transition-colors duration-300 ${
                      isActive ? "text-champagne-gold" : "text-charcoal/40 group-hover:text-charcoal/60"
                    }`}
                  />
                  <span
                    className={`text-sm font-medium transition-colors duration-300 ${
                      isActive ? "text-charcoal" : "text-charcoal/60 group-hover:text-charcoal"
                    }`}
                  >
                    {label}
                  </span>
                  {isActive && (
                    <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-8 h-1 bg-champagne-gold rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Dynamic Description */}
          <div className="mt-6 pt-5 border-t border-[#E5E5E5]">
            <p 
              className="text-sm text-charcoal/70 leading-relaxed tracking-wide transition-opacity duration-500"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              {modes[activeMode].description}
            </p>
            <p className="text-xs text-charcoal/40 mt-3 tracking-wider uppercase">
              {modes[activeMode].label} Mode Active
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartPanelControls;
