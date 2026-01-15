import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SunDim, Lock, LockOpen, Thermometer, Blinds, Zap, Activity, Wifi, ChevronRight, Sparkles } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
interface Device {
  id: string;
  name: string;
  series: string;
  type: string;
  icon: React.ElementType;
  isOn: boolean;
  deviceCount?: number;
  hasNavigation?: boolean;
  location?: string;
}
const roomTabs = [{
  id: "living",
  label: "Living Room"
}, {
  id: "bedroom",
  label: "Bedroom"
}, {
  id: "kitchen",
  label: "Kitchen"
}, {
  id: "office",
  label: "Office"
}];
const Controls = () => {
  const navigate = useNavigate();
  const [activeRoom, setActiveRoom] = useState("living");
  const [devices, setDevices] = useState<Device[]>([{
    id: "dimmer",
    name: "Smart Light",
    series: "Light Control",
    type: "Lighting",
    icon: SunDim,
    isOn: true,
    deviceCount: 3,
    location: "Living Room"
  }, {
    id: "lock",
    name: "Smart Lock",
    series: "Security",
    type: "Security",
    icon: Lock,
    isOn: false,
    deviceCount: 2,
    location: "Main Entrance"
  }, {
    id: "hvac",
    name: "Intelligent HVAC System",
    series: "Climate",
    type: "Climate",
    icon: Thermometer,
    isOn: true,
    deviceCount: 1,
    hasNavigation: true,
    location: "Whole Home"
  }, {
    id: "shading",
    name: "Motorized Shading System",
    series: "Curtains",
    type: "Shading",
    icon: Blinds,
    isOn: false,
    deviceCount: 4,
    location: "All Rooms"
  }]);
  const toggleDevice = (id: string) => {
    setDevices(devices.map(device => device.id === id ? {
      ...device,
      isOn: !device.isOn
    } : device));
  };
  const handleDeviceClick = (device: Device) => {
    if (device.hasNavigation) {
      navigate("/advanced-control");
    }
  };
  return <DashboardLayout>
      {/* Header */}
      <header className="border-b border-border bg-background">
        <div className="mx-auto w-full max-w-7xl px-4 py-6 md:px-8">
          <p className="text-xs text-muted-foreground tracking-[0.2em] uppercase font-body">Manage Home</p>
          <h1 className="font-heading text-2xl md:text-3xl text-foreground mt-1">
            Welcome Home
          </h1>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl px-4 py-6 md:px-8 pb-24 lg:pb-8">
        {/* Quick Status Bar */}
        <div className="grid grid-cols-3 gap-2 md:gap-4 mb-8">
          <div className="bg-card rounded-2xl md:rounded-3xl p-2 sm:p-3 md:p-4 border border-border flex flex-col sm:flex-row items-center gap-1 sm:gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl flex items-center justify-center shrink-0 bg-primary">
              <Activity className="w-4 h-4 md:w-5 md:h-5 text-accent" strokeWidth={1.5} />
            </div>
            <div className="text-center sm:text-left min-w-0">
              <p className="text-[8px] md:text-[10px] text-muted-foreground tracking-[0.1em] md:tracking-[0.15em] uppercase font-body truncate">Motion</p>
              <p className="font-heading text-sm md:text-lg text-foreground truncate">Active</p>
            </div>
          </div>
          <div className="bg-card rounded-2xl md:rounded-3xl p-2 sm:p-3 md:p-4 border border-border flex flex-col sm:flex-row items-center gap-1 sm:gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl flex items-center justify-center shrink-0 bg-primary">
              <Zap className="w-4 h-4 md:w-5 md:h-5 text-accent" strokeWidth={1.5} />
            </div>
            <div className="text-center sm:text-left min-w-0">
              <p className="text-[8px] md:text-[10px] text-muted-foreground tracking-[0.1em] md:tracking-[0.15em] uppercase font-body truncate">Energy</p>
              <p className="font-heading text-sm md:text-lg text-foreground truncate">42kWh</p>
            </div>
          </div>
          <div className="bg-card rounded-2xl md:rounded-3xl p-2 sm:p-3 md:p-4 border border-border flex flex-col sm:flex-row items-center gap-1 sm:gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl flex items-center justify-center shrink-0 bg-primary">
              <Thermometer className="w-4 h-4 md:w-5 md:h-5 text-accent" strokeWidth={1.5} />
            </div>
            <div className="text-center sm:text-left min-w-0">
              <p className="text-[8px] md:text-[10px] text-muted-foreground tracking-[0.1em] md:tracking-[0.15em] uppercase font-body truncate">Temp</p>
              <p className="font-heading text-sm md:text-lg text-foreground truncate">24°C</p>
            </div>
          </div>
        </div>

        {/* Room Tabs with Gold underline for active */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-8 scrollbar-hide">
          {roomTabs.map(room => <button key={room.id} onClick={() => setActiveRoom(room.id)} className={`relative px-5 py-2.5 rounded-full whitespace-nowrap transition-all duration-300 font-body text-sm font-semibold tracking-[0.1em] ${activeRoom === room.id ? "bg-accent/10 text-foreground border border-accent/30" : "bg-card border border-border text-muted-foreground hover:border-foreground/20"}`}>
              {room.label}
              {activeRoom === room.id && <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-accent rounded-full" />}
            </button>)}
        </div>

        {/* Connected Devices Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-heading text-xl text-foreground">Connected Devices</h2>
          <span className="text-accent px-3 py-1 rounded-full text-sm font-body tracking-wide bg-primary">
            {devices.length}
          </span>
        </div>

        {/* Device Grid - 2x2 Layout */}
        <div className="grid grid-cols-2 gap-4 md:gap-6">
          {devices.map(device => <div key={device.id} className={cn("relative rounded-3xl p-5 md:p-6 cursor-pointer group overflow-hidden", "transition-all duration-500 ease-out", "hover:scale-[1.02] hover:-translate-y-1", device.isOn ? "bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground shadow-2xl shadow-primary/20" : "bg-card/80 backdrop-blur-sm border border-border text-foreground hover:border-accent/30 hover:shadow-xl hover:shadow-accent/5")} onClick={() => handleDeviceClick(device)}>
              {/* Animated Background Glow */}
              {device.isOn && <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-accent/5 animate-pulse" />}
              
              {/* Decorative Corner Accent */}
              <div className={cn("absolute -top-12 -right-12 w-24 h-24 rounded-full blur-2xl transition-opacity duration-500", device.isOn ? "bg-accent/30 opacity-100" : "bg-accent/10 opacity-0 group-hover:opacity-50")} />

              {/* Top Row: Icon + Status */}
              <div className="relative flex items-start justify-between mb-4 md:mb-6">
                {/* Device Icon with Enhanced Styling */}
                <div className={cn("relative w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center", "transition-all duration-500", device.isOn ? "bg-accent/20 shadow-[0_0_30px_rgba(212,175,55,0.4)] ring-1 ring-accent/30" : "bg-muted/50 group-hover:bg-accent/10 group-hover:shadow-lg")}>
                  {/* Sparkle Effect for Active */}
                  {device.isOn && <Sparkles className="absolute -top-1 -right-1 w-3 h-3 text-accent animate-pulse" />}
                  
                  {device.id === "lock" ? device.isOn ? <Lock className="w-6 h-6 md:w-7 md:h-7 text-accent transition-transform duration-300 group-hover:scale-110" strokeWidth={1.5} /> : <LockOpen className="w-6 h-6 md:w-7 md:h-7 text-foreground transition-transform duration-300 group-hover:scale-110" strokeWidth={1.5} /> : <device.icon className={cn("w-6 h-6 md:w-7 md:h-7 transition-all duration-300 group-hover:scale-110", device.isOn ? "text-accent" : "text-foreground")} strokeWidth={1.5} />}
                </div>

                {/* Connection Status Badge */}
                <div className={cn("flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] font-medium tracking-wider uppercase", "transition-all duration-300", device.isOn ? "bg-green-500/20 text-green-400" : "bg-muted text-muted-foreground group-hover:bg-accent/10 group-hover:text-accent")}>
                  <span className={cn("w-1.5 h-1.5 rounded-full", device.isOn ? "bg-green-400 animate-pulse" : "bg-muted-foreground")} />
                  <Wifi className="w-3 h-3" strokeWidth={2} />
                </div>
              </div>

              {/* Device Info */}
              <div className="relative space-y-1 mb-3">
                <p className={cn("text-[10px] tracking-[0.2em] uppercase font-body", device.isOn ? "text-accent" : "text-muted-foreground")}>
                  {device.series}
                </p>
                <h3 className="font-heading text-base md:text-lg leading-tight line-clamp-2">
                  {device.name}
                </h3>
              </div>

              {/* Location & Device Count */}
              <div className="relative flex items-center gap-2 mb-4">
                {device.location && <span className={cn("text-xs font-body px-2 py-0.5 rounded-md", device.isOn ? "bg-white/10 text-primary-foreground/70" : "bg-muted text-muted-foreground")}>
                    {device.location}
                  </span>}
                {device.deviceCount && <span className={cn("text-xs font-body", device.isOn ? "text-primary-foreground/60" : "text-muted-foreground")}>
                    {device.deviceCount} unit{device.deviceCount > 1 ? "s" : ""}
                  </span>}
              </div>

              {/* Bottom Row: Toggle + Arrow */}
              <div className={cn("relative flex items-center justify-between pt-4 border-t", device.isOn ? "border-white/10" : "border-border")}>
                <div className="flex items-center gap-3">
                  <Switch checked={device.isOn} onCheckedChange={() => toggleDevice(device.id)} onClick={e => e.stopPropagation()} className={cn("transition-all duration-300", device.isOn ? "data-[state=checked]:bg-accent" : "")} />
                  <span className={cn("text-xs font-body font-medium tracking-[0.15em] uppercase", device.isOn ? "text-accent" : "text-muted-foreground")}>
                    {device.isOn ? "Active" : "Standby"}
                  </span>
                </div>

                {/* Navigation Arrow */}
                {device.hasNavigation}
              </div>
            </div>)}
        </div>
      </main>
    </DashboardLayout>;
};
export default Controls;