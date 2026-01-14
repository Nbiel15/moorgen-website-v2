import { Sun, Cloud, Lock, Unlock, Wifi, MessageCircle, FileText, Droplets, Wind } from "lucide-react";
import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis } from "recharts";

const energyData = [
  { day: "Mon", saved: 12 },
  { day: "Tue", saved: 18 },
  { day: "Wed", saved: 15 },
  { day: "Thu", saved: 22 },
  { day: "Fri", saved: 19 },
  { day: "Sat", saved: 25 },
  { day: "Sun", saved: 21 },
];

const RightPanel = () => {
  const [lightLevel, setLightLevel] = useState([70]);
  const [isGateLocked, setIsGateLocked] = useState(true);

  return (
    <aside className="hidden xl:flex flex-col w-72 bg-white border-l border-[#E5E5E5] p-6 gap-5 overflow-y-auto">
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

      {/* System Health Widget */}
      <div className="bg-white rounded-3xl p-5 border border-[#E5E5E5] shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
        <h3 className="font-serif text-base text-charcoal mb-4">System Status</h3>
        <div className="flex items-center gap-3 mb-4">
          <div className="relative">
            <div className="w-3 h-3 bg-green-500 rounded-full" />
            <div className="absolute inset-0 w-3 h-3 bg-green-500 rounded-full animate-ping opacity-50" />
          </div>
          <div className="flex items-center gap-2">
            <Wifi className="w-4 h-4 text-green-500" />
            <span className="text-sm text-charcoal/70">All Systems Online</span>
          </div>
        </div>
        <button className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-full border border-champagne-gold/30 text-champagne-gold text-sm font-medium hover:bg-champagne-gold/5 transition-colors">
          <MessageCircle className="w-4 h-4" />
          Contact Dedicated Concierge
        </button>
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

      {/* Energy Intelligence */}
      <div className="bg-white rounded-3xl p-5 border border-[#E5E5E5] shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
        <h3 className="font-serif text-base text-charcoal mb-3">Energy Intelligence</h3>
        <div className="h-20 mb-3">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={energyData}>
              <XAxis dataKey="day" hide />
              <YAxis hide />
              <Line
                type="monotone"
                dataKey="saved"
                stroke="#D4AF37"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <p className="text-xs text-charcoal/50 text-center">Weekly Energy Saved</p>
        <div className="mt-3 pt-3 border-t border-[#E5E5E5]">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            <span className="text-xs text-charcoal/70">Eco-Mode active for 12 hours today</span>
          </div>
        </div>
      </div>

      {/* Local Environment */}
      <div className="bg-gradient-to-br from-sky-50 to-blue-50 rounded-3xl p-5 border border-sky-100">
        <div className="flex items-center justify-between mb-4">
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
        
        <div className="grid grid-cols-3 gap-2 pt-3 border-t border-sky-200/50">
          <div className="text-center">
            <Droplets className="w-4 h-4 text-sky-400 mx-auto mb-1" />
            <p className="text-xs text-charcoal/70">68%</p>
            <p className="text-[10px] text-charcoal/40">Humidity</p>
          </div>
          <div className="text-center">
            <Sun className="w-4 h-4 text-amber-500 mx-auto mb-1" />
            <p className="text-xs text-charcoal/70">High</p>
            <p className="text-[10px] text-charcoal/40">UV Index</p>
          </div>
          <div className="text-center">
            <Wind className="w-4 h-4 text-sky-400 mx-auto mb-1" />
            <p className="text-xs text-charcoal/70">12 km/h</p>
            <p className="text-[10px] text-charcoal/40">Wind</p>
          </div>
        </div>

        {/* AQI Section */}
        <div className="mt-4 pt-3 border-t border-sky-200/50">
          <p className="text-xs text-charcoal/50 mb-2">Air Quality Index</p>
          <div className="flex gap-3">
            <div className="flex-1 bg-white/60 rounded-xl p-2 text-center">
              <p className="text-sm font-medium text-green-600">42</p>
              <p className="text-[10px] text-charcoal/50">Indoor</p>
            </div>
            <div className="flex-1 bg-white/60 rounded-xl p-2 text-center">
              <p className="text-sm font-medium text-amber-600">78</p>
              <p className="text-[10px] text-charcoal/50">Outdoor</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Docs */}
      <div className="bg-white rounded-3xl p-5 border border-[#E5E5E5] shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
        <h3 className="font-serif text-base text-charcoal mb-4">Your Documents</h3>
        <div className="space-y-2">
          <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-charcoal/5 transition-colors text-left">
            <div className="w-10 h-10 rounded-xl bg-champagne-gold/10 flex items-center justify-center">
              <FileText className="w-5 h-5 text-champagne-gold" />
            </div>
            <div>
              <p className="text-sm text-charcoal">Warranty.pdf</p>
              <p className="text-xs text-charcoal/50">5-year coverage</p>
            </div>
          </button>
          <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-charcoal/5 transition-colors text-left">
            <div className="w-10 h-10 rounded-xl bg-champagne-gold/10 flex items-center justify-center">
              <FileText className="w-5 h-5 text-champagne-gold" />
            </div>
            <div>
              <p className="text-sm text-charcoal">Villa_Manual.pdf</p>
              <p className="text-xs text-charcoal/50">User guide</p>
            </div>
          </button>
        </div>
      </div>

      {/* Date */}
      <div className="text-center mt-auto pt-4">
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
