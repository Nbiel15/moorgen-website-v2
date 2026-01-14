import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Snowflake, Leaf, Droplets, Power } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";

const rooms = [
  { id: "living", label: "Living Room" },
  { id: "bedroom", label: "Bedroom" },
  { id: "kitchen", label: "Kitchen" },
];

const modes = [
  { id: "cooling", label: "Cooling", icon: Snowflake },
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
      <header className="border-b border-border bg-background">
        <div className="mx-auto w-full max-w-7xl px-4 py-4 md:px-8">
          <button
            onClick={() => navigate("/controls")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group mb-4"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-body text-sm tracking-[0.1em]">Back to Home</span>
          </button>
          <p className="text-[10px] text-muted-foreground tracking-[0.2em] uppercase font-body">Climate Control</p>
          <h1 className="font-heading text-2xl md:text-3xl text-foreground mt-1">
            Intelligent HVAC System
          </h1>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl px-4 py-6 md:px-8 pb-24 lg:pb-8">
        {/* Room Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-8 scrollbar-hide">
          {rooms.map((room) => (
            <button
              key={room.id}
              onClick={() => setActiveRoom(room.id)}
              className={`px-5 py-2.5 rounded-full whitespace-nowrap transition-all duration-300 font-body text-sm tracking-[0.1em] ${
                activeRoom === room.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border text-muted-foreground hover:border-foreground/20"
              }`}
            >
              {room.label}
            </button>
          ))}
        </div>

        {/* Main Content - 2 Column Split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Left Column - Temperature Dial */}
          <div className="flex flex-col items-center justify-center">
            {/* Power Button */}
            <button
              onClick={() => setIsPowered(!isPowered)}
              className={`w-14 h-14 rounded-full flex items-center justify-center mb-10 transition-all duration-500 ${
                isPowered 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-muted text-muted-foreground"
              }`}
            >
              <Power className="w-6 h-6" strokeWidth={1.5} />
            </button>

            {/* Temperature Dial */}
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              {/* Outer Ring */}
              <div className="absolute inset-0 rounded-full border-[12px] border-border" />
              
              {/* Active Arc */}
              <svg className="absolute inset-0 w-full h-full -rotate-[135deg]" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="44"
                  fill="none"
                  stroke="url(#matteBlackGradient)"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={`${(tempPercentage / 100) * 207} 276`}
                  className="transition-all duration-300"
                />
                <defs>
                  <linearGradient id="matteBlackGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="hsl(0, 0%, 10%)" />
                    <stop offset="100%" stopColor="hsl(0, 0%, 25%)" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Dial Handle */}
              <div 
                className="absolute inset-4 rounded-full bg-card border border-border flex items-center justify-center transition-transform duration-300"
                style={{ transform: `rotate(${dialRotation}deg)` }}
              >
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary" />
              </div>

              {/* Center Content */}
              <div className="absolute inset-8 rounded-full bg-card flex flex-col items-center justify-center">
                <span className="font-heading text-5xl md:text-6xl text-foreground">
                  {temperature}°C
                </span>
                <span className="text-[10px] text-muted-foreground font-body tracking-[0.2em] uppercase mt-2">
                  {temperature < 22 ? "Cooler" : temperature > 26 ? "Warmer" : "Comfort"}
                </span>
              </div>

              {/* Temperature Labels */}
              <span className="absolute -left-4 top-1/2 -translate-y-1/2 text-xs text-muted-foreground font-body">
                {minTemp}°
              </span>
              <span className="absolute -right-4 top-1/2 -translate-y-1/2 text-xs text-muted-foreground font-body">
                {maxTemp}°
              </span>
            </div>

            {/* Temperature Slider */}
            <div className="w-64 md:w-80 mt-10">
              <input
                type="range"
                min={minTemp}
                max={maxTemp}
                value={temperature}
                onChange={(e) => setTemperature(Number(e.target.value))}
                className="w-full h-1 bg-border rounded-full appearance-none cursor-pointer
                  [&::-webkit-slider-thumb]:appearance-none
                  [&::-webkit-slider-thumb]:w-5
                  [&::-webkit-slider-thumb]:h-5
                  [&::-webkit-slider-thumb]:rounded-full
                  [&::-webkit-slider-thumb]:bg-primary
                  [&::-webkit-slider-thumb]:cursor-pointer
                  [&::-webkit-slider-thumb]:transition-transform
                  [&::-webkit-slider-thumb]:hover:scale-110"
              />
            </div>

            {/* Brand Badge */}
            <div className="mt-10 text-center">
              <p className="text-[10px] text-muted-foreground tracking-[0.2em] uppercase font-body">
                Moorgen Intelligent HVAC Technology
              </p>
            </div>
          </div>

          {/* Right Column - Mode & Controls */}
          <div className="space-y-8">
            {/* Mode Selection */}
            <div>
              <h2 className="font-heading text-xl text-foreground mb-4">Mode</h2>
              <div className="grid grid-cols-3 gap-3">
                {modes.map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => setActiveMode(mode.id)}
                    className={`flex flex-col items-center gap-3 p-5 rounded-3xl transition-all duration-300 border ${
                      activeMode === mode.id
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-card border-border text-muted-foreground hover:border-foreground/20"
                    }`}
                  >
                    <mode.icon className="w-6 h-6" strokeWidth={1.5} />
                    <span className="text-xs font-body tracking-[0.1em]">{mode.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Room Selection */}
            <div>
              <h2 className="font-heading text-xl text-foreground mb-4">Room</h2>
              <div className="grid grid-cols-1 gap-3">
                {rooms.map((room) => (
                  <button
                    key={room.id}
                    onClick={() => setActiveRoom(room.id)}
                    className={`flex items-center justify-between p-5 rounded-3xl transition-all duration-300 border ${
                      activeRoom === room.id
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-card border-border text-foreground hover:border-foreground/20"
                    }`}
                  >
                    <span className="font-body text-sm tracking-[0.1em]">{room.label}</span>
                    <div className={`w-3 h-3 rounded-full ${activeRoom === room.id ? "bg-primary-foreground" : "bg-border"}`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Fan Speed */}
            <div>
              <h2 className="font-heading text-xl text-foreground mb-4">Fan Speed</h2>
              <div className="flex gap-2">
                {["Auto", "Low", "Med", "High"].map((speed, index) => (
                  <button
                    key={speed}
                    className={`flex-1 py-3 rounded-2xl text-sm font-body tracking-[0.1em] transition-all border ${
                      index === 0
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-card border-border text-muted-foreground hover:border-foreground/20"
                    }`}
                  >
                    {speed}
                  </button>
                ))}
              </div>
            </div>

            {/* Schedule Card */}
            <div className="bg-card rounded-3xl p-6 border border-border">
              <h2 className="font-heading text-xl text-foreground mb-2">Scheduled</h2>
              <p className="text-sm text-muted-foreground font-body tracking-wide mb-4">
                AC will turn on at 6:00 PM and set to 22°C
              </p>
              <button className="text-foreground font-body text-sm tracking-[0.1em] hover:underline">
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
