import { useState } from "react";
import { ArrowLeft, Utensils, Heart, MessageSquare, Focus, Sun, Moon, Volume2, Pause, Play, SkipBack, SkipForward, Droplets, Thermometer, Wind, Lightbulb } from "lucide-react";
import { Link } from "react-router-dom";
import { Slider } from "@/components/ui/slider";

// Room types for floor plan
type RoomType = "living" | "dining" | "bedroom" | "kitchen" | "bathroom";

interface Room {
  id: RoomType;
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
  lightsOn: number;
  temperature: number;
}

const rooms: Room[] = [
  { id: "living", label: "Living Room", x: 10, y: 10, width: 45, height: 40, lightsOn: 3, temperature: 22 },
  { id: "dining", label: "Dining Room", x: 10, y: 55, width: 35, height: 35, lightsOn: 2, temperature: 23 },
  { id: "bedroom", label: "Master Bedroom", x: 60, y: 10, width: 30, height: 45, lightsOn: 1, temperature: 21 },
  { id: "kitchen", label: "Kitchen", x: 50, y: 55, width: 40, height: 35, lightsOn: 4, temperature: 24 },
  { id: "bathroom", label: "Bathroom", x: 60, y: 60, width: 15, height: 20, lightsOn: 1, temperature: 25 },
];

// Scene types
type SceneType = "dining" | "romantic" | "chatting" | "focus";

interface SceneConfig {
  icon: React.ElementType;
  label: string;
  description: string;
  detailedDescription: string;
  colorTemp: number;
  brightness: number;
}

const scenes: Record<SceneType, SceneConfig> = {
  dining: {
    icon: Utensils,
    label: "Dining",
    description: "Warm & Inviting",
    detailedDescription: "Creates a warm, golden ambiance at 2700K with 70% brightness. Perfect for dinner parties and family meals, enhancing food presentation while maintaining comfortable visibility.",
    colorTemp: 25,
    brightness: 70,
  },
  romantic: {
    icon: Heart,
    label: "Romantic",
    description: "Soft & Intimate",
    detailedDescription: "Ultra-warm 2200K lighting at 40% brightness creates an intimate atmosphere. Accent lights dim to 20%, with subtle amber undertones for a candlelit effect.",
    colorTemp: 10,
    brightness: 40,
  },
  chatting: {
    icon: MessageSquare,
    label: "Chatting",
    description: "Bright & Social",
    detailedDescription: "Neutral 4000K white light at 85% brightness promotes alertness and engagement. Ideal for social gatherings, game nights, and lively conversations.",
    colorTemp: 60,
    brightness: 85,
  },
  focus: {
    icon: Focus,
    label: "Focus",
    description: "Cool & Clear",
    detailedDescription: "Daylight-balanced 5000K lighting at 100% brightness maximizes concentration. Blue-enriched spectrum reduces eye strain during extended work or reading sessions.",
    colorTemp: 85,
    brightness: 100,
  },
};

const AtmosphereControl = () => {
  const [selectedRoom, setSelectedRoom] = useState<RoomType>("living");
  const [activeScene, setActiveScene] = useState<SceneType>("dining");
  const [colorTemp, setColorTemp] = useState(scenes.dining.colorTemp);
  const [brightness, setBrightness] = useState(scenes.dining.brightness);
  const [temperature, setTemperature] = useState(22);
  const [humidity, setHumidity] = useState(55);
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(65);

  const handleSceneChange = (scene: SceneType) => {
    setActiveScene(scene);
    setColorTemp(scenes[scene].colorTemp);
    setBrightness(scenes[scene].brightness);
  };

  const selectedRoomData = rooms.find(r => r.id === selectedRoom)!;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border px-4 md:px-8 py-6">
        <div className="max-w-7xl mx-auto">
          <Link
            to="/lifestyle-dashboard"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-body tracking-wide">Back to Dashboard</span>
          </Link>
          <h1 className="font-heading text-2xl md:text-3xl text-foreground">Full Smart Home Control</h1>
          <p className="text-muted-foreground mt-2 font-body text-sm md:text-base">
            Complete control over your villa's ambiance, climate, and audio systems.
          </p>
        </div>
      </header>

      {/* Main Content - Bento Grid */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* LEFT SECTION - Floor Plan (30%) */}
          <div className="lg:col-span-4 order-2 lg:order-1">
            <div className="bg-card rounded-3xl p-6 border border-border shadow-[0_4px_20px_rgba(0,0,0,0.03)] h-full">
              <h3 className="font-heading text-xl text-foreground mb-4">Floor Plan</h3>
              <p className="text-muted-foreground text-sm mb-6 font-body">Select a room to control</p>
              
              {/* Interactive Floor Plan SVG */}
              <div className="relative aspect-square bg-secondary/30 rounded-2xl overflow-hidden border border-border">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  {/* Grid lines */}
                  <defs>
                    <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                      <path d="M 10 0 L 0 0 0 10" fill="none" stroke="hsl(var(--border))" strokeWidth="0.2" />
                    </pattern>
                  </defs>
                  <rect width="100" height="100" fill="url(#grid)" />
                  
                  {/* Rooms */}
                  {rooms.map((room) => (
                    <g key={room.id} onClick={() => setSelectedRoom(room.id)} className="cursor-pointer">
                      <rect
                        x={room.x}
                        y={room.y}
                        width={room.width}
                        height={room.height}
                        rx="2"
                        className={`transition-all duration-300 ${
                          selectedRoom === room.id
                            ? "fill-primary/20 stroke-primary stroke-[1.5]"
                            : "fill-card stroke-border stroke-[0.5] hover:fill-primary/10"
                        }`}
                      />
                      <text
                        x={room.x + room.width / 2}
                        y={room.y + room.height / 2 - 2}
                        textAnchor="middle"
                        className={`text-[3px] font-body font-medium ${
                          selectedRoom === room.id ? "fill-primary" : "fill-muted-foreground"
                        }`}
                      >
                        {room.label}
                      </text>
                      <text
                        x={room.x + room.width / 2}
                        y={room.y + room.height / 2 + 4}
                        textAnchor="middle"
                        className="text-[2.5px] fill-muted-foreground font-body"
                      >
                        {room.lightsOn} lights • {room.temperature}°C
                      </text>
                      {/* Light indicator */}
                      <circle
                        cx={room.x + 4}
                        cy={room.y + 4}
                        r="2"
                        className={`${selectedRoom === room.id ? "fill-primary" : "fill-primary/40"}`}
                      />
                    </g>
                  ))}
                </svg>
              </div>

              {/* Selected Room Info */}
              <div className="mt-6 p-4 bg-secondary/30 rounded-2xl border border-border">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Lightbulb className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-heading text-lg text-foreground">{selectedRoomData.label}</p>
                    <p className="text-xs text-muted-foreground font-body">{selectedRoomData.lightsOn} active lights</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm font-body">
                  <div className="bg-card p-3 rounded-xl border border-border">
                    <p className="text-muted-foreground text-xs">Temperature</p>
                    <p className="text-foreground font-medium">{selectedRoomData.temperature}°C</p>
                  </div>
                  <div className="bg-card p-3 rounded-xl border border-border">
                    <p className="text-muted-foreground text-xs">Brightness</p>
                    <p className="text-foreground font-medium">{brightness}%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CENTER SECTION - Lighting & Scenes (40%) */}
          <div className="lg:col-span-5 order-1 lg:order-2 space-y-6">
            {/* Lighting Controls */}
            <div className="bg-card rounded-3xl p-6 border border-border shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
              <h3 className="font-heading text-xl text-foreground mb-6">Lighting Control</h3>
              
              {/* Color Temperature */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                      <Sun className="w-5 h-5 text-amber-500" />
                    </div>
                    <div>
                      <p className="font-body font-medium text-foreground">Color Temperature</p>
                      <p className="text-xs text-muted-foreground font-body">Warm to Cool</p>
                    </div>
                  </div>
                  <span className="text-sm font-body text-muted-foreground">
                    {colorTemp < 33 ? "Warm" : colorTemp < 66 ? "Neutral" : "Cool"} ({Math.round(2200 + (colorTemp / 100) * 4300)}K)
                  </span>
                </div>
                <div className="relative">
                  <div 
                    className="absolute inset-0 h-3 rounded-full"
                    style={{
                      background: "linear-gradient(to right, #FF8C00, #FFD700, #FFFAF0, #E0FFFF, #87CEEB)"
                    }}
                  />
                  <Slider
                    value={[colorTemp]}
                    onValueChange={(v) => setColorTemp(v[0])}
                    max={100}
                    step={1}
                    className="relative z-10"
                  />
                </div>
                <div className="flex justify-between mt-2 text-xs text-muted-foreground font-body">
                  <span className="flex items-center gap-1"><Moon className="w-3 h-3" /> 2200K</span>
                  <span className="flex items-center gap-1"><Sun className="w-3 h-3" /> 6500K</span>
                </div>
              </div>

              {/* Brightness */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Lightbulb className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-body font-medium text-foreground">Brightness</p>
                      <p className="text-xs text-muted-foreground font-body">Dimmer Control</p>
                    </div>
                  </div>
                  <span className="text-2xl font-heading text-foreground">{brightness}%</span>
                </div>
                <div className="relative">
                  <div 
                    className="absolute inset-0 h-3 rounded-full bg-gradient-to-r from-charcoal/20 via-primary/50 to-primary"
                  />
                  <Slider
                    value={[brightness]}
                    onValueChange={(v) => setBrightness(v[0])}
                    max={100}
                    step={1}
                    className="relative z-10"
                  />
                </div>
              </div>
            </div>

            {/* Scene Selection */}
            <div className="bg-card rounded-3xl p-6 border border-border shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
              <h3 className="font-heading text-xl text-foreground mb-6">Scene Selection</h3>
              
              <div className="grid grid-cols-2 gap-4">
                {(Object.keys(scenes) as SceneType[]).map((scene) => {
                  const { icon: Icon, label, description } = scenes[scene];
                  const isActive = activeScene === scene;

                  return (
                    <button
                      key={scene}
                      onClick={() => handleSceneChange(scene)}
                      className={`group relative flex flex-col items-start p-5 rounded-2xl border-2 transition-all duration-300 text-left ${
                        isActive
                          ? "border-primary bg-primary/5 shadow-[0_0_20px_rgba(212,175,55,0.15)]"
                          : "border-border bg-card hover:border-primary/40 hover:bg-secondary/50"
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-2 w-full">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                          isActive ? "bg-primary/20" : "bg-secondary"
                        }`}>
                          <Icon
                            className={`w-5 h-5 transition-colors duration-300 ${
                              isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                            }`}
                            strokeWidth={1.5}
                          />
                        </div>
                        {isActive && (
                          <span className="ml-auto text-[10px] uppercase tracking-wider text-primary font-body font-medium">
                            Active
                          </span>
                        )}
                      </div>
                      <span className={`font-heading text-lg transition-colors duration-300 ${
                        isActive ? "text-foreground" : "text-foreground/80 group-hover:text-foreground"
                      }`}>
                        {label}
                      </span>
                      <span className={`text-xs font-body transition-colors duration-300 ${
                        isActive ? "text-muted-foreground" : "text-muted-foreground/70"
                      }`}>
                        {description}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Scene Description */}
              <div className="mt-6 p-5 bg-secondary/30 rounded-2xl border border-border">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    {(() => {
                      const Icon = scenes[activeScene].icon;
                      return <Icon className="w-4 h-4 text-primary" />;
                    })()}
                  </div>
                  <div>
                    <p className="font-heading text-base text-foreground mb-1">{scenes[activeScene].label} Mode</p>
                    <p className="text-sm text-muted-foreground font-body leading-relaxed">
                      {scenes[activeScene].detailedDescription}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SECTION - Climate & Audio (30%) */}
          <div className="lg:col-span-3 order-3 space-y-6">
            {/* Climate Control */}
            <div className="bg-card rounded-3xl p-6 border border-border shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
              <h3 className="font-heading text-xl text-foreground mb-6">Climate Control</h3>
              
              {/* Temperature Dial */}
              <div className="flex flex-col items-center mb-8">
                <div className="relative w-40 h-40">
                  {/* Dial background */}
                  <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="hsl(var(--border))"
                      strokeWidth="8"
                      strokeLinecap="round"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="hsl(var(--primary))"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={`${((temperature - 16) / 16) * 283} 283`}
                      className="transition-all duration-300"
                    />
                  </svg>
                  {/* Center display */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <Thermometer className="w-5 h-5 text-primary mb-1" />
                    <span className="text-3xl font-heading text-foreground">{temperature}°</span>
                    <span className="text-xs text-muted-foreground font-body">Celsius</span>
                  </div>
                </div>
                {/* Temperature controls */}
                <div className="flex items-center gap-4 mt-4">
                  <button
                    onClick={() => setTemperature(Math.max(16, temperature - 1))}
                    className="w-10 h-10 rounded-full border-2 border-border bg-card hover:bg-secondary transition-colors flex items-center justify-center text-foreground font-bold"
                  >
                    −
                  </button>
                  <span className="text-sm text-muted-foreground font-body w-20 text-center">
                    {temperature < 20 ? "Cool" : temperature > 24 ? "Warm" : "Comfort"}
                  </span>
                  <button
                    onClick={() => setTemperature(Math.min(32, temperature + 1))}
                    className="w-10 h-10 rounded-full border-2 border-border bg-card hover:bg-secondary transition-colors flex items-center justify-center text-foreground font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Humidity */}
              <div className="p-4 bg-secondary/30 rounded-2xl border border-border">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Droplets className="w-4 h-4 text-sky-500" />
                    <span className="text-sm font-body text-foreground">Humidity</span>
                  </div>
                  <span className="text-lg font-heading text-foreground">{humidity}%</span>
                </div>
                <Slider
                  value={[humidity]}
                  onValueChange={(v) => setHumidity(v[0])}
                  max={100}
                  min={30}
                  step={1}
                />
                <div className="flex justify-between mt-2 text-xs text-muted-foreground font-body">
                  <span>Dry</span>
                  <span>Humid</span>
                </div>
              </div>

              {/* Fan Speed */}
              <div className="mt-4 p-4 bg-secondary/30 rounded-2xl border border-border">
                <div className="flex items-center gap-2 mb-3">
                  <Wind className="w-4 h-4 text-primary" />
                  <span className="text-sm font-body text-foreground">Fan Speed</span>
                </div>
                <div className="flex gap-2">
                  {["Auto", "Low", "Med", "High"].map((speed, idx) => (
                    <button
                      key={speed}
                      className={`flex-1 py-2 px-2 text-xs font-body rounded-xl transition-all ${
                        idx === 0 
                          ? "bg-primary text-primary-foreground" 
                          : "bg-card border border-border text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {speed}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Audio Control */}
            <div className="bg-card rounded-3xl p-6 border border-border shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
              <h3 className="font-heading text-xl text-foreground mb-4">Whole-Home Audio</h3>
              
              {/* Album Art */}
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-charcoal via-charcoal/90 to-charcoal/70 mb-4">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full border-4 border-primary/30 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/40 to-primary/10 flex items-center justify-center animate-pulse">
                      <div className="w-4 h-4 rounded-full bg-primary" />
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="font-heading text-white text-lg">Ambient Evening</p>
                  <p className="text-white/60 text-sm font-body">Relaxation Playlist</p>
                </div>
              </div>

              {/* Player Controls */}
              <div className="flex items-center justify-center gap-4 mb-4">
                <button className="w-10 h-10 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                  <SkipBack className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:bg-primary/90 transition-colors"
                >
                  {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
                </button>
                <button className="w-10 h-10 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                  <SkipForward className="w-5 h-5" />
                </button>
              </div>

              {/* Volume */}
              <div className="flex items-center gap-3">
                <Volume2 className="w-4 h-4 text-muted-foreground" />
                <Slider
                  value={[volume]}
                  onValueChange={(v) => setVolume(v[0])}
                  max={100}
                  step={1}
                  className="flex-1"
                />
                <span className="text-sm font-body text-muted-foreground w-8">{volume}%</span>
              </div>

              {/* Active Zones */}
              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground font-body uppercase tracking-wider mb-2">Active Zones</p>
                <div className="flex flex-wrap gap-2">
                  {["Living", "Dining", "Bedroom"].map((zone) => (
                    <span
                      key={zone}
                      className="px-3 py-1 bg-primary/10 text-primary text-xs font-body rounded-full"
                    >
                      {zone}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AtmosphereControl;