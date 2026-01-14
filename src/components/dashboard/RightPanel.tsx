import { Sun, Cloud, Lock, Unlock } from "lucide-react";
import { useState } from "react";
import { Slider } from "@/components/ui/slider";

const RightPanel = () => {
  const [lightLevel, setLightLevel] = useState([70]);
  const [isGateLocked, setIsGateLocked] = useState(true);

  return (
    <aside className="hidden xl:flex flex-col w-72 bg-white border-l border-[#E5E5E5] p-6 gap-6">
      {/* Profile Card */}
      <div className="bg-gradient-to-br from-charcoal to-charcoal/90 rounded-3xl p-6 text-center">
        <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-champagne-gold/30 to-champagne-gold/10 border-2 border-champagne-gold/50 flex items-center justify-center mb-4">
          <span className="font-serif text-2xl text-white">A</span>
        </div>
        <h3 className="font-serif text-lg text-white">Adrian Wijaya</h3>
        <p className="text-champagne-gold text-xs tracking-widest uppercase mt-1">
          Project Owner
        </p>
      </div>

      {/* Quick Controls */}
      <div className="bg-white rounded-3xl p-5 border border-[#E5E5E5] shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
        <h3 className="font-serif text-base text-charcoal mb-4">Quick Controls</h3>
        
        {/* Light Slider */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-charcoal/70">Main Lights</span>
            <span className="text-sm font-medium text-champagne-gold">{lightLevel}%</span>
          </div>
          <Slider
            value={lightLevel}
            onValueChange={setLightLevel}
            max={100}
            step={1}
            className="w-full"
          />
        </div>

        {/* Gate Toggle */}
        <div className="flex items-center justify-between py-3 border-t border-[#E5E5E5]">
          <span className="text-sm text-charcoal/70">Main Gate</span>
          <button
            onClick={() => setIsGateLocked(!isGateLocked)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              isGateLocked
                ? "bg-green-50 text-green-600"
                : "bg-amber-50 text-amber-600"
            }`}
          >
            {isGateLocked ? (
              <>
                <Lock className="w-3.5 h-3.5" /> Secured
              </>
            ) : (
              <>
                <Unlock className="w-3.5 h-3.5" /> Unlocked
              </>
            )}
          </button>
        </div>
      </div>

      {/* Weather Widget */}
      <div className="bg-gradient-to-br from-sky-50 to-blue-50 rounded-3xl p-5 border border-sky-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-charcoal/50 mb-1">Uluwatu, Bali</p>
            <p className="font-serif text-2xl text-charcoal">29°C</p>
            <p className="text-xs text-charcoal/50 mt-1">Partly Cloudy</p>
          </div>
          <div className="relative">
            <Sun className="w-10 h-10 text-amber-400" />
            <Cloud className="w-6 h-6 text-sky-300 absolute -bottom-1 -right-1" />
          </div>
        </div>
      </div>

      {/* Date */}
      <div className="text-center mt-auto">
        <p className="text-xs text-charcoal/40">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>
    </aside>
  );
};

export default RightPanel;
