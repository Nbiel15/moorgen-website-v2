import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Lightbulb, 
  Speaker, 
  Tv, 
  AirVent, 
  Zap, 
  Activity, 
  Thermometer,
  Wifi,
  Bluetooth,
  ChevronRight
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Switch } from "@/components/ui/switch";

interface Device {
  id: string;
  name: string;
  type: string;
  icon: React.ElementType;
  isOn: boolean;
  subDevices?: string[];
  deviceCount?: number;
  hasNavigation?: boolean;
}

const roomTabs = [
  { id: "living", label: "Living Room", icon: "🛋️" },
  { id: "kitchen", label: "Kitchen", icon: "🍳" },
  { id: "bedroom", label: "Bedroom", icon: "🛏️" },
  { id: "office", label: "Office", icon: "💼" },
];

const Controls = () => {
  const navigate = useNavigate();
  const [activeRoom, setActiveRoom] = useState("living");
  const [devices, setDevices] = useState<Device[]>([
    { 
      id: "lamp", 
      name: "Smart Lamp", 
      type: "Lighting",
      icon: Lightbulb, 
      isOn: false, 
      subDevices: ["Bardi smart lamp", "Smart lamp"],
      deviceCount: 2
    },
    { 
      id: "speaker", 
      name: "Speaker", 
      type: "Audio",
      icon: Speaker, 
      isOn: true,
      deviceCount: 2
    },
    { 
      id: "ac", 
      name: "Air Conditioner", 
      type: "Climate",
      icon: AirVent, 
      isOn: false,
      deviceCount: 1,
      hasNavigation: true
    },
    { 
      id: "tv", 
      name: "Smart TV", 
      type: "Entertainment",
      icon: Tv, 
      isOn: false,
      deviceCount: 2
    },
  ]);

  const toggleDevice = (id: string) => {
    setDevices(devices.map(device => 
      device.id === id ? { ...device, isOn: !device.isOn } : device
    ));
  };

  const handleDeviceClick = (device: Device) => {
    if (device.hasNavigation) {
      navigate("/advanced-control");
    }
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <header className="border-b border-border/30 bg-card/50 backdrop-blur-sm">
        <div className="mx-auto w-full max-w-7xl px-4 py-6 md:px-8">
          <p className="text-sm text-muted-foreground tracking-widest uppercase font-body">Manage Home</p>
          <h1 className="font-heading text-2xl md:text-3xl text-foreground mt-1">
            Hey, Welcome 👋
          </h1>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl px-4 py-6 md:px-8">
        {/* Quick Status Bar */}
        <div className="grid grid-cols-3 gap-3 md:gap-4 mb-6">
          <div className="bg-card rounded-2xl p-4 border border-border/30 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-champagne-gold/10 flex items-center justify-center">
              <Activity className="w-5 h-5 text-champagne-gold" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-xs text-muted-foreground tracking-wide uppercase font-body">Motion</p>
              <p className="font-heading text-lg text-foreground">80%</p>
            </div>
          </div>
          <div className="bg-card rounded-2xl p-4 border border-border/30 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-champagne-gold/10 flex items-center justify-center">
              <Zap className="w-5 h-5 text-champagne-gold" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-xs text-muted-foreground tracking-wide uppercase font-body">Energy</p>
              <p className="font-heading text-lg text-foreground">60kWh</p>
            </div>
          </div>
          <div className="bg-card rounded-2xl p-4 border border-border/30 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-champagne-gold/10 flex items-center justify-center">
              <Thermometer className="w-5 h-5 text-champagne-gold" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-xs text-muted-foreground tracking-wide uppercase font-body">Temp</p>
              <p className="font-heading text-lg text-foreground">24°C</p>
            </div>
          </div>
        </div>

        {/* Room Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
          {roomTabs.map((room) => (
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

        {/* Connected Devices Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-heading text-xl text-foreground">Connected Devices</h2>
          <span className="bg-champagne-gold/10 text-champagne-gold px-3 py-1 rounded-full text-sm font-body">
            {devices.length}
          </span>
        </div>

        {/* Device Grid - Bento Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {devices.map((device) => (
            <div
              key={device.id}
              className={`relative rounded-3xl p-5 transition-all duration-500 cursor-pointer group ${
                device.isOn
                  ? "bg-gradient-to-br from-champagne-gold to-champagne-gold/80 text-white shadow-xl shadow-champagne-gold/20"
                  : "bg-card border border-border/30 text-foreground hover:border-champagne-gold/30"
              }`}
              onClick={() => handleDeviceClick(device)}
            >
              {/* Connection Icons */}
              <div className="absolute top-4 right-4 flex gap-2">
                <Wifi className={`w-4 h-4 ${device.isOn ? "text-white/70" : "text-muted-foreground/50"}`} strokeWidth={1.5} />
                {device.id === "ac" && (
                  <Bluetooth className={`w-4 h-4 ${device.isOn ? "text-white/70" : "text-muted-foreground/50"}`} strokeWidth={1.5} />
                )}
              </div>

              {/* Device Icon */}
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${
                device.isOn ? "bg-white/20" : "bg-champagne-gold/10"
              }`}>
                <device.icon className={`w-6 h-6 ${device.isOn ? "text-white" : "text-champagne-gold"}`} strokeWidth={1.5} />
              </div>

              {/* Device Info */}
              <h3 className="font-heading text-lg mb-1">{device.name}</h3>
              {device.subDevices && (
                <div className={`text-xs mb-3 ${device.isOn ? "text-white/70" : "text-muted-foreground"}`}>
                  {device.subDevices.map((sub, idx) => (
                    <p key={idx} className="font-body tracking-wide">• {sub}</p>
                  ))}
                </div>
              )}
              {device.deviceCount && !device.subDevices && (
                <p className={`text-sm mb-3 font-body tracking-wide ${device.isOn ? "text-white/70" : "text-muted-foreground"}`}>
                  {device.deviceCount} Device{device.deviceCount > 1 ? "s" : ""}
                </p>
              )}

              {/* Toggle & Navigation */}
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-body tracking-wide ${device.isOn ? "text-white/70" : "text-muted-foreground"}`}>
                    {device.isOn ? "On" : "Off"}
                  </span>
                  <Switch
                    checked={device.isOn}
                    onCheckedChange={() => toggleDevice(device.id)}
                    onClick={(e) => e.stopPropagation()}
                    className={device.isOn ? "data-[state=checked]:bg-white/30" : ""}
                  />
                </div>
                {device.hasNavigation && (
                  <ChevronRight className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${
                    device.isOn ? "text-white/70" : "text-muted-foreground"
                  }`} />
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </DashboardLayout>
  );
};

export default Controls;
