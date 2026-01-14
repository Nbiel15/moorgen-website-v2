import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Snowflake, Leaf, Droplets, Wind, Power, MoreVertical } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";

const rooms = [
  { id: "kitchen", label: "Kitchen", icon: "🍳" },
  { id: "living", label: "Living Room", icon: "🛋️" },
  { id: "bedroom", label: "Bedroom", icon: "🛏️" },
];

const modes = [
  { id: "cooling", label: "Cooling", icon: Snowflake },
  { id: "heating", label: "Heating", icon: Wind },
  { id: "eco", label: "Eco", icon: Leaf },
  { id: "dry", label: "Dry", icon: Droplets },
];

const AdvancedDeviceControl = () => {
  const navigate = useNavigate();
  const [temperature, setTemperature] = useState(24);
  const [activeRoom, setActiveRoom] = useState("living");
  const [activeMode, setActiveMode] = useState("cooling");
  const [isPowered, setIsPowered] = useState(true);

  const minTemp = 16;
  const maxTemp = 30;
  const tempRange = maxTemp - minTemp;
  const tempPercentage = ((temperature - minTemp) / tempRange) * 100;

  // Calculate dial rotation (maps temp to 0-270 degrees)
  const dialRotation = (tempPercentage / 100) * 270 - 135;

  return (
    <DashboardLayout>
      {/* Header */}
      <header className="border-b border-border/30 bg-card/50 backdrop-blur-sm">
        <div className="mx-auto w-full max-w-7xl px-4 py-4 md:px-8">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate("/controls")}
              className="flex items-center gap-2 text-muted-foreground hover:text-champagne-gold transition-colors group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-body text-sm tracking-wide">Back to Home</span>
            </button>
            <button className="w-10 h-10 rounded-full hover:bg-muted/50 flex items-center justify-center transition-colors">
              <MoreVertical className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
          <h1 className="font-heading text-2xl md:text-3xl text-foreground mt-4">
            Air Conditioner
          </h1>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl px-4 py-6 md:px-8">
        {/* Room Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-8 scrollbar-hide">
          {rooms.map((room) => (
            <button
              key={room.id}
              onClick={() => setActiveRoom(room.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full whitespace-nowrap transition-all duration-300 font-body text-sm tracking-wide ${
                activeRoom === room.id
                  ? "bg-champagne-gold text-white shadow-lg shadow-champagne-gold/20"
                  : "bg-card border border-border/30 text-muted-foreground hover:border-champagne-gold/30"
              }`}
            >
              <span>{room.icon}</span>
              <span>{room.label}</span>
            </button>
          ))}
        </div>

        {/* Main Content - 2 Column Split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column - Temperature Dial */}
          <div className="flex flex-col items-center justify-center">
            {/* Power Button */}
            <button
              onClick={() => setIsPowered(!isPowered)}
              className={`w-14 h-14 rounded-full flex items-center justify-center mb-8 transition-all duration-500 ${
                isPowered 
                  ? "bg-gradient-to-br from-champagne-gold to-champagne-gold/70 text-white shadow-xl shadow-champagne-gold/30" 
                  : "bg-muted text-muted-foreground"
              }`}
            >
              <Power className="w-6 h-6" />
            </button>

            {/* Temperature Dial */}
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              {/* Outer Ring with Gradient */}
              <div className="absolute inset-0 rounded-full border-[12px] border-muted/30" />
              
              {/* Active Arc */}
              <svg className="absolute inset-0 w-full h-full -rotate-[135deg]" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="44"
                  fill="none"
                  stroke="url(#goldGradient)"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={`${(tempPercentage / 100) * 207} 276`}
                  className="transition-all duration-300"
                />
                <defs>
                  <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#D4AF37" />
                    <stop offset="100%" stopColor="#B8860B" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Dial Handle */}
              <div 
                className="absolute inset-4 rounded-full bg-card shadow-xl flex items-center justify-center"
                style={{ transform: `rotate(${dialRotation}deg)` }}
              >
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-champagne-gold to-champagne-gold/70 shadow-lg" />
              </div>

              {/* Center Content */}
              <div className="absolute inset-8 rounded-full bg-card flex flex-col items-center justify-center">
                <span className="font-heading text-5xl md:text-6xl text-foreground">
                  {temperature}°C
                </span>
                <span className="text-sm text-muted-foreground font-body tracking-widest uppercase mt-2">
                  {temperature < 22 ? "Cooler" : temperature > 26 ? "Warmer" : "Comfort"}
                </span>
              </div>

              {/* Temperature Labels */}
              <span className="absolute -left-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground font-body">
                {minTemp}°C
              </span>
              <span className="absolute -right-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground font-body">
                {maxTemp}°C
              </span>
            </div>

            {/* Temperature Slider */}
            <div className="w-64 md:w-80 mt-8">
              <input
                type="range"
                min={minTemp}
                max={maxTemp}
                value={temperature}
                onChange={(e) => setTemperature(Number(e.target.value))}
                className="w-full h-2 bg-muted rounded-full appearance-none cursor-pointer
                  [&::-webkit-slider-thumb]:appearance-none
                  [&::-webkit-slider-thumb]:w-6
                  [&::-webkit-slider-thumb]:h-6
                  [&::-webkit-slider-thumb]:rounded-full
                  [&::-webkit-slider-thumb]:bg-gradient-to-br
                  [&::-webkit-slider-thumb]:from-champagne-gold
                  [&::-webkit-slider-thumb]:to-champagne-gold/70
                  [&::-webkit-slider-thumb]:shadow-lg
                  [&::-webkit-slider-thumb]:cursor-pointer
                  [&::-webkit-slider-thumb]:transition-transform
                  [&::-webkit-slider-thumb]:hover:scale-110"
              />
            </div>
          </div>

          {/* Right Column - Mode & Controls */}
          <div className="space-y-8">
            {/* Mode Selection */}
            <div>
              <h2 className="font-heading text-xl text-foreground mb-4">Mode</h2>
              <div className="grid grid-cols-4 gap-3">
                {modes.map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => setActiveMode(mode.id)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-2xl transition-all duration-300 ${
                      activeMode === mode.id
                        ? "bg-gradient-to-br from-champagne-gold to-champagne-gold/80 text-white shadow-lg shadow-champagne-gold/20"
                        : "bg-card border border-border/30 text-muted-foreground hover:border-champagne-gold/30"
                    }`}
                  >
                    <mode.icon className="w-6 h-6" strokeWidth={1.5} />
                    <span className="text-xs font-body tracking-wide">{mode.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div>
              <h2 className="font-heading text-xl text-foreground mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <button className="bg-card border border-border/30 rounded-2xl p-5 text-center hover:border-champagne-gold/30 transition-all group">
                  <div className="w-12 h-12 rounded-full bg-champagne-gold/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-champagne-gold/20 transition-colors">
                    <Power className="w-6 h-6 text-champagne-gold" />
                  </div>
                  <p className="font-body text-sm text-foreground">Power Off</p>
                  <p className="text-xs text-muted-foreground mt-1">Turn off AC</p>
                </button>
                <button className="bg-card border border-border/30 rounded-2xl p-5 text-center hover:border-champagne-gold/30 transition-all group">
                  <div className="w-12 h-12 rounded-full bg-champagne-gold/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-champagne-gold/20 transition-colors">
                    <Leaf className="w-6 h-6 text-champagne-gold" />
                  </div>
                  <p className="font-body text-sm text-foreground">Eco Mode</p>
                  <p className="text-xs text-muted-foreground mt-1">Save energy</p>
                </button>
                <button className="bg-card border border-border/30 rounded-2xl p-5 text-center hover:border-champagne-gold/30 transition-all group">
                  <div className="w-12 h-12 rounded-full bg-champagne-gold/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-champagne-gold/20 transition-colors">
                    <Wind className="w-6 h-6 text-champagne-gold" />
                  </div>
                  <p className="font-body text-sm text-foreground">Turbo</p>
                  <p className="text-xs text-muted-foreground mt-1">Max cooling</p>
                </button>
              </div>
            </div>

            {/* Fan Speed */}
            <div>
              <h2 className="font-heading text-xl text-foreground mb-4">Fan Speed</h2>
              <div className="flex gap-2">
                {["Auto", "Low", "Medium", "High"].map((speed) => (
                  <button
                    key={speed}
                    className="flex-1 py-3 rounded-xl bg-card border border-border/30 text-sm font-body tracking-wide text-muted-foreground hover:border-champagne-gold/30 hover:text-foreground transition-all first:bg-champagne-gold/10 first:text-champagne-gold first:border-champagne-gold/30"
                  >
                    {speed}
                  </button>
                ))}
              </div>
            </div>

            {/* Schedule Preview */}
            <div className="bg-gradient-to-br from-champagne-gold/5 to-champagne-gold/10 rounded-3xl p-6 border border-champagne-gold/20">
              <h2 className="font-heading text-xl text-foreground mb-2">Scheduled</h2>
              <p className="text-sm text-muted-foreground font-body mb-4">
                AC will turn on at 6:00 PM and set to 22°C
              </p>
              <button className="text-champagne-gold font-body text-sm tracking-wide hover:underline">
                Edit Schedule →
              </button>
            </div>
          </div>
        </div>
      </main>
    </DashboardLayout>
  );
};

export default AdvancedDeviceControl;
