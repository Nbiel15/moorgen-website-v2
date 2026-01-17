import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Utensils, Sofa, PartyPopper, Moon, Power, Lightbulb } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

const rooms = [
  { id: "living", label: "Living Room" },
  { id: "kitchen", label: "Kitchen" },
  { id: "master", label: "Master Suite" },
  { id: "garden", label: "Garden" },
  { id: "pool", label: "Pool" },
];

const scenes = [
  { id: "dinner", label: "Dinner", icon: Utensils, description: "Warm ambient glow" },
  { id: "relax", label: "Relax", icon: Sofa, description: "Soft, comfortable light" },
  { id: "party", label: "Party", icon: PartyPopper, description: "Dynamic & vibrant" },
  { id: "sleep", label: "Sleep", icon: Moon, description: "Gentle night mode" },
];

const AdvancedLightingControl = () => {
  const navigate = useNavigate();
  const [activeRoom, setActiveRoom] = useState("living");
  const [activeScene, setActiveScene] = useState("relax");
  const [brightness, setBrightness] = useState([75]);
  const [colorTemp, setColorTemp] = useState([50]);
  const [masterToggle, setMasterToggle] = useState(true);

  return (
    <DashboardLayout>
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative border-b border-border/30 bg-[#FAFAFA]"
      >
        <div className="mx-auto w-full max-w-7xl px-4 py-4 md:px-8">
          <motion.button
            whileHover={{ x: -4 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/controls")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-['Playfair_Display'] text-sm tracking-wide">Back to Controls</span>
          </motion.button>
          
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-['Playfair_Display'] text-2xl md:text-3xl lg:text-4xl text-foreground"
          >
            Advanced Lighting Control
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="font-['Playfair_Display'] text-muted-foreground mt-1 text-sm italic"
          >
            Villa Uluwatu
          </motion.p>
        </div>
      </motion.header>

      <main className="relative mx-auto w-full max-w-7xl px-4 py-6 md:px-8 pb-24 lg:pb-8 bg-[#FAFAFA] min-h-screen">
        {/* Room Selector Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex gap-2 overflow-x-auto pb-4 mb-8 scrollbar-hide"
        >
          {rooms.map((room, index) => (
            <motion.button
              key={room.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.05 }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveRoom(room.id)}
              className={cn(
                "relative px-6 py-3 rounded-full whitespace-nowrap transition-all duration-500 font-['Playfair_Display'] text-sm tracking-wide",
                activeRoom === room.id
                  ? "bg-primary text-champagne-gold shadow-lg"
                  : "bg-white border border-border/50 text-muted-foreground hover:border-champagne-gold/30 hover:shadow-md"
              )}
            >
              {room.label}
              <AnimatePresence>
                {activeRoom === room.id && (
                  <motion.span
                    layoutId="roomIndicator"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    exit={{ scaleX: 0 }}
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-champagne-gold rounded-full"
                  />
                )}
              </AnimatePresence>
            </motion.button>
          ))}
        </motion.div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Main Control Panel - Left Side (2 columns) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Room Atmosphere Title */}
            <div className="flex items-center gap-3 mb-2">
              <Lightbulb className="w-5 h-5 text-champagne-gold" strokeWidth={1.5} />
              <h2 className="font-['Playfair_Display'] text-xl md:text-2xl text-foreground">
                Room Atmosphere
              </h2>
            </div>

            {/* Scene Cards Grid */}
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              {scenes.map((scene, index) => (
                <motion.button
                  key={scene.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveScene(scene.id)}
                  className={cn(
                    "relative overflow-hidden rounded-3xl p-6 md:p-8 transition-all duration-500 text-left group",
                    activeScene === scene.id
                      ? "bg-primary shadow-2xl shadow-primary/20"
                      : "bg-white border border-border/30 hover:border-champagne-gold/20 hover:shadow-xl"
                  )}
                >
                  {/* Background Glow for Active */}
                  {activeScene === scene.id && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute inset-0 bg-gradient-to-br from-champagne-gold/10 via-transparent to-champagne-gold/5"
                    />
                  )}

                  <div className="relative z-10">
                    {/* Icon */}
                    <motion.div
                      animate={activeScene === scene.id ? { scale: [1, 1.1, 1] } : {}}
                      transition={{ duration: 2, repeat: Infinity }}
                      className={cn(
                        "w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mb-4 transition-all duration-500",
                        activeScene === scene.id
                          ? "bg-champagne-gold/20"
                          : "bg-muted/50 group-hover:bg-champagne-gold/10"
                      )}
                    >
                      <scene.icon
                        className={cn(
                          "w-7 h-7 md:w-8 md:h-8 transition-all duration-500",
                          activeScene === scene.id
                            ? "text-champagne-gold"
                            : "text-muted-foreground group-hover:text-champagne-gold"
                        )}
                        strokeWidth={1.5}
                      />
                    </motion.div>

                    {/* Label */}
                    <h3
                      className={cn(
                        "font-['Playfair_Display'] text-lg md:text-xl mb-1 transition-colors duration-500",
                        activeScene === scene.id
                          ? "text-champagne-gold"
                          : "text-foreground"
                      )}
                    >
                      {scene.label}
                    </h3>

                    {/* Description */}
                    <p
                      className={cn(
                        "font-['Playfair_Display'] text-xs md:text-sm transition-colors duration-500",
                        activeScene === scene.id
                          ? "text-primary-foreground/70"
                          : "text-muted-foreground"
                      )}
                    >
                      {scene.description}
                    </p>

                    {/* Active Indicator */}
                    {activeScene === scene.id && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="absolute top-4 right-4 w-3 h-3 rounded-full bg-champagne-gold animate-pulse"
                      />
                    )}
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Precision Adjustments - Right Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-6"
          >
            {/* Precision Adjustments Card */}
            <div className="bg-white rounded-3xl border border-border/30 p-6 md:p-8 shadow-sm">
              <h2 className="font-['Playfair_Display'] text-lg md:text-xl text-foreground mb-8">
                Precision Adjustments
              </h2>

              {/* Brightness Slider */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-['Playfair_Display'] text-sm text-foreground">
                    Brightness
                  </span>
                  <span className="font-['Playfair_Display'] text-sm text-champagne-gold font-medium">
                    {brightness[0]}%
                  </span>
                </div>
                <Slider
                  value={brightness}
                  onValueChange={setBrightness}
                  max={100}
                  step={1}
                  disabled={!masterToggle}
                  className={cn(
                    "w-full",
                    "[&_[data-orientation=horizontal]]:h-1.5",
                    "[&_[role=slider]]:h-5 [&_[role=slider]]:w-5 [&_[role=slider]]:border-2",
                    "[&_[role=slider]]:border-champagne-gold [&_[role=slider]]:bg-white",
                    "[&_[role=slider]]:shadow-[0_0_10px_rgba(212,175,55,0.4)]",
                    "[&_.bg-primary]:bg-gradient-to-r [&_.bg-primary]:from-champagne-gold [&_.bg-primary]:to-champagne-light",
                    !masterToggle && "opacity-50"
                  )}
                />
                <div className="flex justify-between mt-2">
                  <span className="text-[10px] font-['Playfair_Display'] text-muted-foreground">0%</span>
                  <span className="text-[10px] font-['Playfair_Display'] text-muted-foreground">100%</span>
                </div>
              </div>

              {/* Color Temperature Slider */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-['Playfair_Display'] text-sm text-foreground">
                    Color Temperature
                  </span>
                </div>
                <div className="relative">
                  <div 
                    className={cn(
                      "absolute inset-0 h-1.5 rounded-full top-1/2 -translate-y-1/2",
                      "bg-gradient-to-r from-orange-400 via-white to-blue-400",
                      !masterToggle && "opacity-50"
                    )} 
                  />
                  <Slider
                    value={colorTemp}
                    onValueChange={setColorTemp}
                    max={100}
                    step={1}
                    disabled={!masterToggle}
                    className={cn(
                      "w-full relative",
                      "[&_[data-orientation=horizontal]]:h-1.5 [&_[data-orientation=horizontal]]:bg-transparent",
                      "[&_[role=slider]]:h-5 [&_[role=slider]]:w-5 [&_[role=slider]]:border-2",
                      "[&_[role=slider]]:border-champagne-gold [&_[role=slider]]:bg-white",
                      "[&_[role=slider]]:shadow-[0_0_10px_rgba(212,175,55,0.4)]",
                      "[&_.bg-primary]:bg-transparent",
                      !masterToggle && "opacity-50"
                    )}
                  />
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-[10px] font-['Playfair_Display'] text-orange-400">Warm</span>
                  <span className="text-[10px] font-['Playfair_Display'] text-blue-400">Cool</span>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-border/30 my-6" />

              {/* Master Toggle */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={masterToggle ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                    className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500",
                      masterToggle
                        ? "bg-champagne-gold/20"
                        : "bg-muted"
                    )}
                  >
                    <Power
                      className={cn(
                        "w-5 h-5 transition-colors duration-500",
                        masterToggle ? "text-champagne-gold" : "text-muted-foreground"
                      )}
                      strokeWidth={1.5}
                    />
                  </motion.div>
                  <div>
                    <p className="font-['Playfair_Display'] text-sm text-foreground">
                      Master Toggle
                    </p>
                    <p className="font-['Playfair_Display'] text-[10px] text-muted-foreground">
                      {masterToggle ? "All lights on" : "All lights off"}
                    </p>
                  </div>
                </div>
                <Switch
                  checked={masterToggle}
                  onCheckedChange={setMasterToggle}
                  className={cn(
                    "transition-all duration-300",
                    masterToggle && "data-[state=checked]:bg-champagne-gold shadow-[0_0_15px_rgba(212,175,55,0.3)]"
                  )}
                />
              </div>
            </div>

            {/* Room Status Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-gradient-to-br from-primary via-primary to-primary/90 rounded-3xl p-6 md:p-8 text-primary-foreground"
            >
              <h3 className="font-['Playfair_Display'] text-lg mb-4 text-champagne-gold">
                Current Status
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-['Playfair_Display'] text-sm text-primary-foreground/70">
                    Active Scene
                  </span>
                  <span className="font-['Playfair_Display'] text-sm text-champagne-gold capitalize">
                    {activeScene}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-['Playfair_Display'] text-sm text-primary-foreground/70">
                    Room
                  </span>
                  <span className="font-['Playfair_Display'] text-sm text-champagne-gold">
                    {rooms.find(r => r.id === activeRoom)?.label}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-['Playfair_Display'] text-sm text-primary-foreground/70">
                    Brightness
                  </span>
                  <span className="font-['Playfair_Display'] text-sm text-champagne-gold">
                    {brightness[0]}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-['Playfair_Display'] text-sm text-primary-foreground/70">
                    Lights Status
                  </span>
                  <span className={cn(
                    "font-['Playfair_Display'] text-sm",
                    masterToggle ? "text-green-400" : "text-red-400"
                  )}>
                    {masterToggle ? "Active" : "Off"}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>
    </DashboardLayout>
  );
};

export default AdvancedLightingControl;
