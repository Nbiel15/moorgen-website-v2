import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  SunDim, 
  Lock, 
  Thermometer, 
  Blinds,
  Zap, 
  Activity, 
  Wifi,
  ChevronRight
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Switch } from "@/components/ui/switch";

interface Device {
  id: string;
  name: string;
  series: string;
  type: string;
  icon: React.ElementType;
  isOn: boolean;
  deviceCount?: number;
  hasNavigation?: boolean;
}

const roomTabs = [
  { id: "living", label: "Living Room" },
  { id: "bedroom", label: "Bedroom" },
  { id: "kitchen", label: "Kitchen" },
  { id: "office", label: "Office" },
];

const Controls = () => {
  const navigate = useNavigate();
  const [activeRoom, setActiveRoom] = useState("living");
  const [devices, setDevices] = useState<Device[]>([
    { 
      id: "dimmer", 
      name: "Milan Series Dimming Knob", 
      series: "Light Control",
      type: "Lighting",
      icon: SunDim, 
      isOn: true, 
      deviceCount: 3
    },
    { 
      id: "lock", 
      name: "T9 Series Smart Lock", 
      series: "Security",
      type: "Security",
      icon: Lock, 
      isOn: false,
      deviceCount: 2
    },
    { 
      id: "hvac", 
      name: "Intelligent HVAC System", 
      series: "Climate",
      type: "Climate",
      icon: Thermometer, 
      isOn: true,
      deviceCount: 1,
      hasNavigation: true
    },
    { 
      id: "shading", 
      name: "Motorized Shading System", 
      series: "Curtains",
      type: "Shading",
      icon: Blinds, 
      isOn: false,
      deviceCount: 4
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
        <div className="grid grid-cols-3 gap-3 md:gap-4 mb-8">
          <div className="bg-card rounded-3xl p-4 border border-border flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center">
              <Activity className="w-5 h-5 text-foreground" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground tracking-[0.15em] uppercase font-body">Motion</p>
              <p className="font-heading text-lg text-foreground">Active</p>
            </div>
          </div>
          <div className="bg-card rounded-3xl p-4 border border-border flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center">
              <Zap className="w-5 h-5 text-foreground" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground tracking-[0.15em] uppercase font-body">Energy</p>
              <p className="font-heading text-lg text-foreground">42kWh</p>
            </div>
          </div>
          <div className="bg-card rounded-3xl p-4 border border-border flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center">
              <Thermometer className="w-5 h-5 text-foreground" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground tracking-[0.15em] uppercase font-body">Temp</p>
              <p className="font-heading text-lg text-foreground">24°C</p>
            </div>
          </div>
        </div>

        {/* Room Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-8 scrollbar-hide">
          {roomTabs.map((room) => (
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

        {/* Connected Devices Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-heading text-xl text-foreground">Connected Devices</h2>
          <span className="bg-primary/10 text-foreground px-3 py-1 rounded-full text-sm font-body tracking-wide">
            {devices.length}
          </span>
        </div>

        {/* Device Grid - Bento Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {devices.map((device) => (
            <div
              key={device.id}
              className={`relative rounded-3xl p-6 transition-all duration-500 cursor-pointer group border ${
                device.isOn
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card border-border text-foreground hover:border-foreground/20"
              }`}
              onClick={() => handleDeviceClick(device)}
            >
              {/* Connection Status */}
              <div className="absolute top-5 right-5 flex items-center gap-2">
                <Wifi className={`w-4 h-4 ${device.isOn ? "text-primary-foreground/60" : "text-muted-foreground/50"}`} strokeWidth={1.5} />
                {device.hasNavigation && (
                  <ChevronRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${
                    device.isOn ? "text-primary-foreground/60" : "text-muted-foreground"
                  }`} />
                )}
              </div>

              {/* Device Icon */}
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 ${
                device.isOn ? "bg-primary-foreground/10" : "bg-primary/5"
              }`}>
                <device.icon className={`w-7 h-7 ${device.isOn ? "text-primary-foreground" : "text-foreground"}`} strokeWidth={1.5} />
              </div>

              {/* Device Info */}
              <p className={`text-[10px] tracking-[0.15em] uppercase font-body mb-1 ${
                device.isOn ? "text-primary-foreground/60" : "text-muted-foreground"
              }`}>
                {device.series}
              </p>
              <h3 className="font-heading text-lg leading-tight mb-2">{device.name}</h3>
              
              {device.deviceCount && (
                <p className={`text-sm font-body tracking-wide ${device.isOn ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
                  {device.deviceCount} Device{device.deviceCount > 1 ? "s" : ""}
                </p>
              )}

              {/* Toggle */}
              <div className="flex items-center justify-between mt-5 pt-5 border-t border-current/10">
                <span className={`text-sm font-body tracking-[0.1em] ${device.isOn ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
                  {device.isOn ? "ON" : "OFF"}
                </span>
                <Switch
                  checked={device.isOn}
                  onCheckedChange={() => toggleDevice(device.id)}
                  onClick={(e) => e.stopPropagation()}
                  className={device.isOn ? "data-[state=checked]:bg-primary-foreground/20" : ""}
                />
              </div>
            </div>
          ))}
        </div>
      </main>
    </DashboardLayout>
  );
};

export default Controls;
