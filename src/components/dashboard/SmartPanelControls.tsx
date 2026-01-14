import { useState } from "react";
import { Utensils, Heart, MessageSquare, Focus } from "lucide-react";

type ModeType = "dining" | "romantic" | "chatting" | "focus";

interface ModeConfig {
  icon: React.ElementType;
  label: string;
  description: string;
  filter: string;
}

const modes: Record<ModeType, ModeConfig> = {
  dining: {
    icon: Utensils,
    label: "Dining Mode",
    description: "Warm, inviting ambiance perfect for memorable dining experiences.",
    filter: "brightness(1.1) saturate(1.2) sepia(0.2)",
  },
  romantic: {
    icon: Heart,
    label: "Romantic Mode",
    description: "Soft, golden hues to create an intimate and serene atmosphere.",
    filter: "brightness(0.85) saturate(1.3) sepia(0.35) hue-rotate(-10deg)",
  },
  chatting: {
    icon: MessageSquare,
    label: "Chatting Mode",
    description: "Bright and clear lighting for vibrant conversations.",
    filter: "brightness(1.2) saturate(1.1) contrast(1.05)",
  },
  focus: {
    icon: Focus,
    label: "Focus Mode",
    description: "Neutral, crisp light to enhance productivity and clarity.",
    filter: "brightness(1.15) saturate(0.9) contrast(1.1)",
  },
};

const SmartPanelControls = () => {
  const [activeMode, setActiveMode] = useState<ModeType>("dining");

  return (
    <div className="bg-white rounded-3xl p-6 border border-[#E5E5E5] shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
      <h3 className="font-serif text-xl text-charcoal mb-6">Smart Panel Controls</h3>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Preview Image */}
        <div className="flex-1">
          <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-gradient-to-br from-charcoal/5 to-charcoal/10">
            <img
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80"
              alt="Villa Living Room"
              className="w-full h-full object-cover transition-all duration-700 ease-in-out"
              style={{ filter: modes[activeMode].filter }}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-charcoal/80 to-transparent p-4">
              <p className="text-white/90 text-sm font-medium">{modes[activeMode].label}</p>
            </div>
          </div>
          <p className="text-sm text-charcoal/60 mt-4 text-center italic">
            {modes[activeMode].description}
          </p>
        </div>

        {/* Control Buttons */}
        <div className="lg:w-48 flex flex-row lg:flex-col gap-3">
          {(Object.keys(modes) as ModeType[]).map((mode) => {
            const { icon: Icon, label } = modes[mode];
            const isActive = activeMode === mode;

            return (
              <button
                key={mode}
                onClick={() => setActiveMode(mode)}
                className={`flex-1 lg:flex-none flex items-center justify-center lg:justify-start gap-3 px-4 py-3 rounded-2xl border-2 transition-all duration-300 ${
                  isActive
                    ? "border-champagne-gold bg-champagne-gold/10 text-charcoal"
                    : "border-[#E5E5E5] hover:border-champagne-gold/50 text-charcoal/70 hover:text-charcoal"
                }`}
              >
                <Icon
                  className={`w-5 h-5 ${isActive ? "text-champagne-gold" : "text-charcoal/50"}`}
                />
                <span className="hidden lg:inline text-sm font-medium">{label.replace(" Mode", "")}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SmartPanelControls;
