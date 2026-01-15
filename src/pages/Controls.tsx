import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  SunDim, Lock, LockOpen, Thermometer, Blinds, Zap, Activity, Wifi, 
  ChevronRight, Sparkles, Power, Shield, Home, MoreHorizontal,
  TrendingUp, Battery, Signal
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";

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
  intensity?: number;
}

const roomTabs = [
  { id: "all", label: "All Rooms", icon: Home },
  { id: "living", label: "Living Room", count: 4 },
  { id: "bedroom", label: "Bedroom", count: 3 },
  { id: "kitchen", label: "Kitchen", count: 2 },
  { id: "office", label: "Office", count: 2 },
];

const Controls = () => {
  const navigate = useNavigate();
  const [activeRoom, setActiveRoom] = useState("all");
  const [devices, setDevices] = useState<Device[]>([
    {
      id: "dimmer",
      name: "Ambient Lighting",
      series: "Lumière Collection",
      type: "Lighting",
      icon: SunDim,
      isOn: true,
      deviceCount: 3,
      location: "Living Room",
      intensity: 75,
    },
    {
      id: "lock",
      name: "Smart Lock Pro",
      series: "Sécurité Elite",
      type: "Security",
      icon: Lock,
      isOn: false,
      deviceCount: 2,
      location: "Main Entrance",
      intensity: 100,
    },
    {
      id: "hvac",
      name: "Climate Control",
      series: "Climat Intelligent",
      type: "Climate",
      icon: Thermometer,
      isOn: true,
      deviceCount: 1,
      hasNavigation: true,
      location: "Whole Home",
      intensity: 24,
    },
    {
      id: "shading",
      name: "Motorized Blinds",
      series: "Ombre Luxe",
      type: "Shading",
      icon: Blinds,
      isOn: false,
      deviceCount: 4,
      location: "All Rooms",
      intensity: 50,
    },
  ]);

  const toggleDevice = (id: string) => {
    setDevices(devices.map(device =>
      device.id === id ? { ...device, isOn: !device.isOn } : device
    ));
  };

  const updateIntensity = (id: string, value: number[]) => {
    setDevices(devices.map(device =>
      device.id === id ? { ...device, intensity: value[0] } : device
    ));
  };

  const handleDeviceClick = (device: Device) => {
    if (device.hasNavigation) {
      navigate("/advanced-control");
    }
  };

  const activeDevices = devices.filter(d => d.isOn).length;
  const totalEnergy = "42.8";

  return (
    <DashboardLayout>
      {/* Premium Header with Gradient */}
      <header className="relative overflow-hidden border-b border-border/50 bg-gradient-to-br from-background via-background to-muted/30">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-accent/5 via-transparent to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-gradient-to-tr from-accent/10 to-transparent rounded-full blur-2xl" />
        
        <div className="relative mx-auto w-full max-w-7xl px-4 py-8 md:px-8 md:py-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            {/* Title Section */}
            <div className="animate-fade-in">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                <p className="text-xs text-accent tracking-[0.3em] uppercase font-body">Smart Home Control</p>
              </div>
              <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl text-foreground">
                Welcome Home
              </h1>
              <p className="text-muted-foreground font-body mt-2 text-sm md:text-base">
                Manage your connected devices with elegance
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex gap-3 animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <button className="group flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-accent/10 border border-accent/20 hover:bg-accent/20 hover:border-accent/40 transition-all duration-300">
                <Power className="w-4 h-4 text-accent" />
                <span className="text-sm font-body text-accent">All Off</span>
              </button>
              <button className="group flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-card border border-border hover:bg-muted/50 hover:border-accent/30 transition-all duration-300">
                <Shield className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
                <span className="text-sm font-body text-muted-foreground group-hover:text-foreground transition-colors">Security</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl px-4 py-6 md:px-8 pb-24 lg:pb-8">
        {/* Status Dashboard */}
        <div 
          className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8 animate-fade-in"
          style={{ animationDelay: "0.15s" }}
        >
          {/* Active Devices */}
          <div className="group relative overflow-hidden rounded-2xl md:rounded-3xl p-4 md:p-5 bg-gradient-to-br from-accent/10 via-card to-card border border-accent/20 hover:border-accent/40 transition-all duration-500 hover:shadow-lg hover:shadow-accent/10">
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-accent/10 rounded-full blur-2xl group-hover:bg-accent/20 transition-colors duration-500" />
            <div className="relative">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
                  <Power className="w-5 h-5 text-accent" strokeWidth={1.5} />
                </div>
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-green-500" />
                  <span className="text-[10px] text-green-500 font-medium">+2</span>
                </div>
              </div>
              <p className="text-2xl md:text-3xl font-heading text-foreground">{activeDevices}</p>
              <p className="text-[10px] md:text-xs text-muted-foreground tracking-[0.15em] uppercase mt-1">Active Devices</p>
            </div>
          </div>

          {/* Energy Usage */}
          <div className="group relative overflow-hidden rounded-2xl md:rounded-3xl p-4 md:p-5 bg-card border border-border hover:border-accent/30 transition-all duration-500 hover:shadow-lg">
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-muted/50 rounded-full blur-2xl group-hover:bg-accent/10 transition-colors duration-500" />
            <div className="relative">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center group-hover:bg-accent/10 transition-colors duration-300">
                  <Zap className="w-5 h-5 text-foreground group-hover:text-accent transition-colors duration-300" strokeWidth={1.5} />
                </div>
                <Battery className="w-4 h-4 text-green-500" />
              </div>
              <p className="text-2xl md:text-3xl font-heading text-foreground">{totalEnergy}<span className="text-base text-muted-foreground ml-1">kWh</span></p>
              <p className="text-[10px] md:text-xs text-muted-foreground tracking-[0.15em] uppercase mt-1">Energy Today</p>
            </div>
          </div>

          {/* Temperature */}
          <div className="group relative overflow-hidden rounded-2xl md:rounded-3xl p-4 md:p-5 bg-card border border-border hover:border-accent/30 transition-all duration-500 hover:shadow-lg">
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-muted/50 rounded-full blur-2xl group-hover:bg-accent/10 transition-colors duration-500" />
            <div className="relative">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center group-hover:bg-accent/10 transition-colors duration-300">
                  <Thermometer className="w-5 h-5 text-foreground group-hover:text-accent transition-colors duration-300" strokeWidth={1.5} />
                </div>
                <Activity className="w-4 h-4 text-accent animate-pulse" />
              </div>
              <p className="text-2xl md:text-3xl font-heading text-foreground">24°<span className="text-base text-muted-foreground">C</span></p>
              <p className="text-[10px] md:text-xs text-muted-foreground tracking-[0.15em] uppercase mt-1">Indoor Temp</p>
            </div>
          </div>

          {/* Network Status */}
          <div className="group relative overflow-hidden rounded-2xl md:rounded-3xl p-4 md:p-5 bg-card border border-border hover:border-accent/30 transition-all duration-500 hover:shadow-lg">
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-muted/50 rounded-full blur-2xl group-hover:bg-accent/10 transition-colors duration-500" />
            <div className="relative">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center group-hover:bg-accent/10 transition-colors duration-300">
                  <Signal className="w-5 h-5 text-foreground group-hover:text-accent transition-colors duration-300" strokeWidth={1.5} />
                </div>
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              </div>
              <p className="text-2xl md:text-3xl font-heading text-foreground">98<span className="text-base text-muted-foreground ml-1">%</span></p>
              <p className="text-[10px] md:text-xs text-muted-foreground tracking-[0.15em] uppercase mt-1">Network</p>
            </div>
          </div>
        </div>

        {/* Room Selector - Premium Pill Design */}
        <div 
          className="flex gap-2 overflow-x-auto pb-4 mb-8 scrollbar-hide animate-fade-in"
          style={{ animationDelay: "0.2s" }}
        >
          {roomTabs.map((room, index) => (
            <button
              key={room.id}
              onClick={() => setActiveRoom(room.id)}
              className={cn(
                "relative flex items-center gap-2 px-4 md:px-6 py-2.5 md:py-3 rounded-full whitespace-nowrap transition-all duration-500 font-body text-sm",
                activeRoom === room.id
                  ? "bg-gradient-to-r from-accent via-accent to-champagne-light text-accent-foreground shadow-lg shadow-accent/20 scale-105"
                  : "bg-card border border-border text-muted-foreground hover:border-accent/30 hover:bg-muted/50 hover:text-foreground"
              )}
              style={{ animationDelay: `${0.2 + index * 0.05}s` }}
            >
              {room.icon && <room.icon className="w-4 h-4" />}
              <span className="font-medium">{room.label}</span>
              {room.count && (
                <span className={cn(
                  "text-xs px-1.5 py-0.5 rounded-full",
                  activeRoom === room.id 
                    ? "bg-accent-foreground/20 text-accent-foreground" 
                    : "bg-muted text-muted-foreground"
                )}>
                  {room.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Section Header */}
        <div 
          className="flex items-center justify-between mb-6 animate-fade-in"
          style={{ animationDelay: "0.25s" }}
        >
          <div className="flex items-center gap-3">
            <h2 className="font-heading text-xl md:text-2xl text-foreground">Connected Devices</h2>
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 border border-accent/20">
              <Sparkles className="w-3 h-3 text-accent" />
              <span className="text-xs font-body text-accent tracking-wide">{devices.length} devices</span>
            </div>
          </div>
          <button className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-muted/50 transition-colors group">
            <MoreHorizontal className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
          </button>
        </div>

        {/* Device Grid - Premium Cards */}
        <div className="grid grid-cols-2 gap-3 md:gap-6">
          {devices.map((device, index) => (
            <div
              key={device.id}
              className={cn(
                "group relative rounded-3xl overflow-hidden cursor-pointer animate-fade-in",
                "transition-all duration-700 ease-out",
                "hover:scale-[1.02] hover:-translate-y-2",
                device.isOn
                  ? "bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-primary-foreground shadow-2xl shadow-primary/30"
                  : "bg-card border border-border hover:border-accent/40 hover:shadow-2xl hover:shadow-accent/10"
              )}
              style={{ animationDelay: `${0.3 + index * 0.1}s` }}
              onClick={() => handleDeviceClick(device)}
            >
              {/* Animated Gradient Background */}
              {device.isOn && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/15 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent/20 via-transparent to-transparent animate-pulse" />
                </>
              )}

              {/* Decorative Corner Glow */}
              <div className={cn(
                "absolute -top-16 -right-16 w-32 h-32 rounded-full blur-3xl transition-all duration-700",
                device.isOn 
                  ? "bg-accent/40 group-hover:bg-accent/60" 
                  : "bg-transparent group-hover:bg-accent/10"
              )} />

              <div className="relative p-5 md:p-6">
                {/* Top Section: Icon + Connection Status */}
                <div className="flex items-start justify-between mb-6">
                  {/* Device Icon Container */}
                  <div className={cn(
                    "relative w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center",
                    "transition-all duration-500",
                    device.isOn
                      ? "bg-accent/20 shadow-[0_0_40px_rgba(212,175,55,0.5)] ring-2 ring-accent/30"
                      : "bg-muted/50 group-hover:bg-accent/10 group-hover:shadow-xl group-hover:ring-1 group-hover:ring-accent/20"
                  )}>
                    {/* Active Sparkle */}
                    {device.isOn && (
                      <Sparkles className="absolute -top-1.5 -right-1.5 w-4 h-4 text-accent animate-pulse" />
                    )}
                    
                    {device.id === "lock" ? (
                      device.isOn ? (
                        <Lock className="w-7 h-7 md:w-8 md:h-8 text-accent transition-all duration-500 group-hover:scale-110" strokeWidth={1.5} />
                      ) : (
                        <LockOpen className="w-7 h-7 md:w-8 md:h-8 text-foreground transition-all duration-500 group-hover:scale-110 group-hover:text-accent" strokeWidth={1.5} />
                      )
                    ) : (
                      <device.icon 
                        className={cn(
                          "w-7 h-7 md:w-8 md:h-8 transition-all duration-500 group-hover:scale-110",
                          device.isOn ? "text-accent" : "text-foreground group-hover:text-accent"
                        )} 
                        strokeWidth={1.5} 
                      />
                    )}
                  </div>

                  {/* Connection Indicator */}
                  <div className={cn(
                    "flex items-center gap-1.5 px-2.5 py-1.5 rounded-full",
                    "transition-all duration-300 backdrop-blur-sm",
                    device.isOn 
                      ? "bg-green-500/20 text-green-400 ring-1 ring-green-500/30" 
                      : "bg-muted/80 text-muted-foreground group-hover:bg-accent/10 group-hover:text-accent group-hover:ring-1 group-hover:ring-accent/20"
                  )}>
                    <span className={cn(
                      "w-2 h-2 rounded-full",
                      device.isOn ? "bg-green-400 animate-pulse" : "bg-muted-foreground"
                    )} />
                    <Wifi className="w-3 h-3" strokeWidth={2} />
                  </div>
                </div>

                {/* Device Info */}
                <div className="space-y-1.5 mb-4">
                  <p className={cn(
                    "text-[11px] tracking-[0.25em] uppercase font-body",
                    device.isOn ? "text-accent" : "text-muted-foreground"
                  )}>
                    {device.series}
                  </p>
                  <h3 className="font-heading text-lg md:text-xl leading-tight">
                    {device.name}
                  </h3>
                </div>

                {/* Location & Units */}
                <div className="flex items-center gap-2 mb-5">
                  {device.location && (
                    <span className={cn(
                      "text-xs font-body px-2.5 py-1 rounded-lg",
                      device.isOn 
                        ? "bg-primary-foreground/10 text-primary-foreground/80 ring-1 ring-primary-foreground/10" 
                        : "bg-muted text-muted-foreground"
                    )}>
                      {device.location}
                    </span>
                  )}
                  {device.deviceCount && (
                    <span className={cn(
                      "text-xs font-body",
                      device.isOn ? "text-primary-foreground/60" : "text-muted-foreground"
                    )}>
                      {device.deviceCount} unit{device.deviceCount > 1 ? "s" : ""}
                    </span>
                  )}
                </div>

                {/* Intensity Slider (for applicable devices) */}
                {device.isOn && device.id !== "lock" && (
                  <div className="mb-5 px-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] tracking-[0.2em] uppercase text-primary-foreground/60">
                        {device.id === "hvac" ? "Temperature" : "Intensity"}
                      </span>
                      <span className="text-sm font-heading text-accent">
                        {device.intensity}{device.id === "hvac" ? "°C" : "%"}
                      </span>
                    </div>
                    <Slider
                      value={[device.intensity || 50]}
                      onValueChange={(value) => updateIntensity(device.id, value)}
                      max={device.id === "hvac" ? 30 : 100}
                      min={device.id === "hvac" ? 16 : 0}
                      step={1}
                      className="cursor-pointer"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                )}

                {/* Bottom Controls */}
                <div className={cn(
                  "flex items-center justify-between pt-4 border-t",
                  device.isOn ? "border-primary-foreground/10" : "border-border"
                )}>
                  <div className="flex items-center gap-3">
                    <Switch
                      checked={device.isOn}
                      onCheckedChange={() => toggleDevice(device.id)}
                      onClick={(e) => e.stopPropagation()}
                      className={cn(
                        "transition-all duration-300",
                        device.isOn && "data-[state=checked]:bg-accent shadow-[0_0_20px_rgba(212,175,55,0.4)]"
                      )}
                    />
                    <span className={cn(
                      "text-xs font-body font-medium tracking-[0.2em] uppercase",
                      device.isOn ? "text-accent" : "text-muted-foreground"
                    )}>
                      {device.isOn ? "Active" : "Standby"}
                    </span>
                  </div>

                  {/* Navigation Arrow */}
                  {device.hasNavigation && (
                    <div className={cn(
                      "flex items-center justify-center w-9 h-9 rounded-xl",
                      "transition-all duration-300",
                      device.isOn 
                        ? "bg-accent/20 text-accent hover:bg-accent hover:text-accent-foreground" 
                        : "bg-muted text-muted-foreground hover:bg-accent/10 hover:text-accent"
                    )}>
                      <ChevronRight className="w-5 h-5" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Device CTA */}
        <div 
          className="mt-8 animate-fade-in"
          style={{ animationDelay: "0.7s" }}
        >
          <button className="w-full group relative overflow-hidden rounded-3xl p-6 border-2 border-dashed border-border hover:border-accent/50 transition-all duration-500 hover:bg-accent/5">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-x-[-100%] group-hover:translate-x-[100%]" style={{ transition: "transform 1s, opacity 0.5s" }} />
            <div className="relative flex flex-col items-center gap-2 text-muted-foreground group-hover:text-accent transition-colors duration-300">
              <div className="w-12 h-12 rounded-2xl border-2 border-dashed border-current flex items-center justify-center group-hover:border-solid group-hover:bg-accent/10 transition-all duration-300">
                <span className="text-2xl font-light">+</span>
              </div>
              <span className="text-sm font-body tracking-[0.15em] uppercase">Add New Device</span>
            </div>
          </button>
        </div>
      </main>
    </DashboardLayout>
  );
};

export default Controls;
