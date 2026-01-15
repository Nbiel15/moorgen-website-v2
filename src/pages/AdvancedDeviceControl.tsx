import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Snowflake, Leaf, Droplets, Power, ChevronUp, ChevronDown, Wind } from "lucide-react";
import { motion, AnimatePresence, useSpring, useTransform } from "framer-motion";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { cn } from "@/lib/utils";

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
  const [displayTemp, setDisplayTemp] = useState(24);
  const [activeRoom, setActiveRoom] = useState("living");
  const [activeMode, setActiveMode] = useState("cooling");
  const [isPowered, setIsPowered] = useState(true);
  const [fanSpeed, setFanSpeed] = useState("Auto");
  const [isLoaded, setIsLoaded] = useState(false);
  const [tempAnimating, setTempAnimating] = useState(false);
  const prevTempRef = useRef(temperature);

  const minTemp = 16;
  const maxTemp = 30;
  const tempRange = maxTemp - minTemp;
  const tempPercentage = ((temperature - minTemp) / tempRange) * 100;

  // Spring animation for dial rotation
  const springConfig = { stiffness: 100, damping: 15, mass: 1 };
  const dialRotationSpring = useSpring((tempPercentage / 100) * 270 - 135, springConfig);

  // Update spring when temperature changes
  useEffect(() => {
    dialRotationSpring.set((tempPercentage / 100) * 270 - 135);
  }, [tempPercentage, dialRotationSpring]);

  // Temperature counter animation
  useEffect(() => {
    if (prevTempRef.current !== temperature) {
      setTempAnimating(true);
      const direction = temperature > prevTempRef.current ? 1 : -1;
      const steps = Math.abs(temperature - prevTempRef.current);
      let currentStep = 0;
      
      const interval = setInterval(() => {
        currentStep++;
        setDisplayTemp(prev => prev + direction);
        if (currentStep >= steps) {
          clearInterval(interval);
          setTempAnimating(false);
        }
      }, 50);
      
      prevTempRef.current = temperature;
      return () => clearInterval(interval);
    }
  }, [temperature]);

  // Page load animation trigger
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Dynamic background based on temperature
  const getTemperatureGradient = () => {
    if (!isPowered) return "from-muted/20 to-muted/10";
    if (temperature < 20) return "from-blue-500/5 to-cyan-500/5";
    if (temperature < 24) return "from-green-500/5 to-emerald-500/5";
    if (temperature < 27) return "from-yellow-500/5 to-orange-500/5";
    return "from-orange-500/5 to-red-500/5";
  };

  const handleModeChange = (modeId: string) => {
    setActiveMode(modeId);
  };

  const handleRoomChange = (roomId: string) => {
    setActiveRoom(roomId);
  };

  const handleFanSpeedChange = (speed: string) => {
    setFanSpeed(speed);
  };

  return (
    <DashboardLayout>
      {/* Dynamic Background Gradient */}
      <div 
        className={cn(
          "fixed inset-0 bg-gradient-to-br transition-all duration-1000 pointer-events-none",
          getTemperatureGradient()
        )} 
      />

      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative border-b border-border bg-background/80 backdrop-blur-sm"
      >
        <div className="mx-auto w-full max-w-7xl px-4 py-4 md:px-8">
          <motion.button
            whileHover={{ x: -4 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/controls")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-body text-sm tracking-[0.1em]">Back to Home</span>
          </motion.button>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-[10px] text-accent tracking-[0.2em] uppercase font-body"
          >
            Climate Control
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-heading text-2xl md:text-3xl text-foreground mt-1"
          >
            Intelligent HVAC System
          </motion.h1>
        </div>
      </motion.header>

      <main className="relative mx-auto w-full max-w-7xl px-4 py-6 md:px-8 pb-24 lg:pb-8">
        {/* Room Tabs with staggered animation */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex gap-2 overflow-x-auto pb-2 mb-8 scrollbar-hide"
        >
          {rooms.map((room, index) => (
            <motion.button
              key={room.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleRoomChange(room.id)}
              className={cn(
                "relative px-5 py-2.5 rounded-full whitespace-nowrap transition-all duration-300 font-body text-sm tracking-[0.1em] press-effect",
                activeRoom === room.id
                  ? "bg-accent/10 text-accent border border-accent/30"
                  : "bg-card border border-border text-muted-foreground hover:border-foreground/20"
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
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-accent rounded-full" 
                  />
                )}
              </AnimatePresence>
            </motion.button>
          ))}
        </motion.div>

        {/* Main Content - 2 Column Split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Left Column - Temperature Dial */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-col items-center justify-center"
          >
            {/* Power Button with ripple effect */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsPowered(!isPowered)}
              className={cn(
                "relative w-14 h-14 rounded-full flex items-center justify-center mb-10 transition-all duration-500 overflow-hidden",
                isPowered 
                  ? "bg-accent text-accent-foreground animate-glow-pulse" 
                  : "bg-muted text-muted-foreground"
              )}
            >
              <Power className="w-6 h-6 relative z-10" strokeWidth={1.5} />
              <AnimatePresence>
                {isPowered && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0.5 }}
                    animate={{ scale: 2.5, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
                    className="absolute inset-0 bg-accent rounded-full"
                  />
                )}
              </AnimatePresence>
            </motion.button>

            {/* Temperature Dial */}
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.6, type: "spring", stiffness: 100 }}
              className={cn(
                "relative w-64 h-64 md:w-80 md:h-80 transition-opacity duration-300",
                !isPowered && "opacity-50"
              )}
            >
              {/* Background Track - 270 degree arc */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="44"
                  fill="none"
                  stroke="hsl(0, 0%, 90%)"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray="207.35 276.46"
                  transform="rotate(-225, 50, 50)"
                />
              </svg>
              
              {/* Active Arc with draw animation */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                <motion.circle
                  cx="50"
                  cy="50"
                  r="44"
                  fill="none"
                  stroke={isPowered ? "url(#champagneGoldGradient)" : "hsl(0, 0%, 70%)"}
                  strokeWidth="6"
                  strokeLinecap="round"
                  initial={{ strokeDasharray: "0 276.46" }}
                  animate={{ strokeDasharray: `${(tempPercentage / 100) * 207.35} 276.46` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  transform="rotate(-225, 50, 50)"
                />
                <defs>
                  <linearGradient id="champagneGoldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="hsl(43, 76%, 42%)" />
                    <stop offset="50%" stopColor="hsl(43, 76%, 52%)" />
                    <stop offset="100%" stopColor="hsl(43, 76%, 62%)" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Dial Handle with spring physics */}
              <motion.div 
                className="absolute inset-4 rounded-full bg-card border border-border flex items-center justify-center"
                style={{ rotate: dialRotationSpring }}
              >
                <motion.div 
                  animate={{ 
                    scale: isPowered ? [1, 1.2, 1] : 1,
                    boxShadow: isPowered 
                      ? ["0 0 10px rgba(212,175,55,0.5)", "0 0 20px rgba(212,175,55,0.8)", "0 0 10px rgba(212,175,55,0.5)"]
                      : "none"
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className={cn(
                    "absolute top-4 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full transition-all duration-300",
                    isPowered ? "bg-accent" : "bg-muted-foreground/50"
                  )} 
                />
              </motion.div>

              {/* Center Content with Up/Down Buttons */}
              <div className="absolute inset-8 rounded-full bg-card flex flex-col items-center justify-center shadow-inner">
                <motion.button
                  whileHover={{ scale: 1.2, backgroundColor: "hsla(43, 76%, 52%, 0.1)" }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setTemperature(prev => Math.min(maxTemp, prev + 1))}
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center transition-all mb-1",
                    isPowered 
                      ? "text-muted-foreground hover:text-accent cursor-pointer" 
                      : "text-muted-foreground/30 cursor-not-allowed"
                  )}
                  disabled={!isPowered || temperature >= maxTemp}
                >
                  <ChevronUp className="w-6 h-6" strokeWidth={1.5} />
                </motion.button>
                
                {/* Animated Temperature Display */}
                <motion.span 
                  key={displayTemp}
                  initial={{ y: tempAnimating ? -10 : 0, opacity: tempAnimating ? 0 : 1 }}
                  animate={{ y: 0, opacity: 1 }}
                  className={cn(
                    "font-heading text-5xl md:text-6xl transition-colors duration-300",
                    isPowered ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {displayTemp}°C
                </motion.span>
                
                <motion.span 
                  animate={{ opacity: isPowered ? 1 : 0.5 }}
                  className={cn(
                    "text-[10px] font-body tracking-[0.2em] uppercase mt-1 transition-colors duration-300",
                    isPowered ? "text-accent" : "text-muted-foreground/50"
                  )}
                >
                  {isPowered 
                    ? (temperature < 22 ? "Cooler" : temperature > 26 ? "Warmer" : "Comfort")
                    : "Off"
                  }
                </motion.span>
                
                <motion.button
                  whileHover={{ scale: 1.2, backgroundColor: "hsla(43, 76%, 52%, 0.1)" }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setTemperature(prev => Math.max(minTemp, prev - 1))}
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center transition-all mt-1",
                    isPowered 
                      ? "text-muted-foreground hover:text-accent cursor-pointer" 
                      : "text-muted-foreground/30 cursor-not-allowed"
                  )}
                  disabled={!isPowered || temperature <= minTemp}
                >
                  <ChevronDown className="w-6 h-6" strokeWidth={1.5} />
                </motion.button>
              </div>

              {/* Temperature Labels */}
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="absolute bottom-2 left-2 text-xs text-muted-foreground font-body"
              >
                {minTemp}°
              </motion.span>
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="absolute bottom-2 right-2 text-xs text-muted-foreground font-body"
              >
                {maxTemp}°
              </motion.span>
            </motion.div>

            {/* Temperature Slider */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className={cn(
                "w-64 md:w-80 mt-10 transition-opacity duration-300",
                !isPowered && "opacity-50"
              )}
            >
              <input
                type="range"
                min={minTemp}
                max={maxTemp}
                value={temperature}
                onChange={(e) => setTemperature(Number(e.target.value))}
                disabled={!isPowered}
                className={cn(
                  "w-full h-1 bg-border rounded-full appearance-none",
                  "[&::-webkit-slider-thumb]:appearance-none",
                  "[&::-webkit-slider-thumb]:w-5",
                  "[&::-webkit-slider-thumb]:h-5",
                  "[&::-webkit-slider-thumb]:rounded-full",
                  "[&::-webkit-slider-thumb]:transition-all",
                  "[&::-webkit-slider-thumb]:duration-200",
                  "[&::-webkit-slider-thumb]:hover:scale-125",
                  isPowered 
                    ? "[&::-webkit-slider-thumb]:bg-accent [&::-webkit-slider-thumb]:shadow-[0_0_15px_rgba(212,175,55,0.6)] [&::-webkit-slider-thumb]:cursor-pointer cursor-pointer" 
                    : "[&::-webkit-slider-thumb]:bg-muted-foreground/50 cursor-not-allowed"
                )}
              />
            </motion.div>

            {/* Brand Badge */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="mt-10 text-center"
            >
              <p className="text-[10px] text-accent tracking-[0.2em] uppercase font-body animate-shimmer">
                Moorgen Intelligent HVAC Technology
              </p>
            </motion.div>
          </motion.div>

          {/* Right Column - Mode & Controls */}
          <div className="space-y-8">
            {/* Mode Selection with flip animation */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h2 className="font-heading text-xl text-foreground mb-4">Mode</h2>
              <div className="grid grid-cols-3 gap-3">
                {modes.map((mode, index) => (
                  <motion.button
                    key={mode.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -4 }}
                    whileTap={{ scale: 0.95, rotateY: 10 }}
                    onClick={() => handleModeChange(mode.id)}
                    className={cn(
                      "relative flex flex-col items-center gap-3 p-5 rounded-3xl transition-all duration-300 border hover-lift overflow-hidden",
                      activeMode === mode.id
                        ? "bg-primary text-primary-foreground border-primary shadow-lg"
                        : "bg-card border-border text-muted-foreground hover:border-foreground/20"
                    )}
                  >
                    <motion.div
                      animate={activeMode === mode.id ? { rotate: [0, 10, -10, 0] } : {}}
                      transition={{ duration: 0.5 }}
                    >
                      <mode.icon className={cn("w-6 h-6", activeMode === mode.id && "text-accent")} strokeWidth={1.5} />
                    </motion.div>
                    <span className={cn("text-xs font-body tracking-[0.1em]", activeMode === mode.id && "text-accent")}>
                      {mode.label}
                    </span>
                    {activeMode === mode.id && (
                      <motion.div
                        layoutId="modeGlow"
                        className="absolute inset-0 bg-accent/10 rounded-3xl"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Room Selection */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              <h2 className="font-heading text-xl text-foreground mb-4">Room</h2>
              <div className="grid grid-cols-1 gap-3">
                {rooms.map((room, index) => (
                  <motion.button
                    key={room.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    whileHover={{ scale: 1.02, x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleRoomChange(room.id)}
                    className={cn(
                      "relative flex items-center justify-between p-5 rounded-3xl transition-all duration-300 border hover-lift",
                      activeRoom === room.id
                        ? "bg-accent/10 text-foreground border-accent/30"
                        : "bg-card border-border text-foreground hover:border-foreground/20"
                    )}
                  >
                    <span className="font-body text-sm tracking-[0.1em]">{room.label}</span>
                    <motion.div 
                      animate={{ 
                        scale: activeRoom === room.id ? [1, 1.3, 1] : 1,
                        backgroundColor: activeRoom === room.id ? "hsl(43, 76%, 52%)" : "hsl(0, 0%, 90%)"
                      }}
                      transition={{ duration: 0.3 }}
                      className={cn(
                        "w-3 h-3 rounded-full transition-all",
                        activeRoom === room.id && "shadow-[0_0_10px_rgba(212,175,55,0.5)]"
                      )} 
                    />
                    <AnimatePresence>
                      {activeRoom === room.id && (
                        <motion.span 
                          initial={{ scaleX: 0, opacity: 0 }}
                          animate={{ scaleX: 1, opacity: 1 }}
                          exit={{ scaleX: 0, opacity: 0 }}
                          className="absolute bottom-0 left-6 right-6 h-0.5 bg-accent rounded-full origin-left" 
                        />
                      )}
                    </AnimatePresence>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Fan Speed with wave animation */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 }}
            >
              <h2 className="font-heading text-xl text-foreground mb-4 flex items-center gap-2">
                Fan Speed
                <motion.div
                  animate={{ rotate: fanSpeed !== "Auto" ? 360 : 0 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Wind className="w-4 h-4 text-accent" />
                </motion.div>
              </h2>
              <div className="flex gap-2">
                {["Auto", "Low", "Med", "High"].map((speed, index) => (
                  <motion.button
                    key={speed}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 + index * 0.1 }}
                    whileHover={{ scale: 1.08, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleFanSpeedChange(speed)}
                    className={cn(
                      "relative flex-1 py-3 rounded-2xl text-sm font-body tracking-[0.1em] transition-all border overflow-hidden",
                      fanSpeed === speed
                        ? "bg-primary text-accent border-primary shadow-lg"
                        : "bg-card border-border text-muted-foreground hover:border-foreground/20"
                    )}
                  >
                    {speed}
                    {fanSpeed === speed && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/20 to-transparent"
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.5 }}
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Schedule Card */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              whileHover={{ scale: 1.02, y: -4 }}
              className="bg-card rounded-3xl p-6 border border-border hover-lift hover-glow"
            >
              <div className="flex items-center gap-2 mb-2">
                <motion.div 
                  animate={{ 
                    scale: [1, 1.3, 1],
                    opacity: [0.8, 1, 0.8]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 rounded-full bg-accent shadow-[0_0_10px_rgba(212,175,55,0.5)]" 
                />
                <p className="text-[10px] text-accent tracking-[0.15em] uppercase font-body">System Active</p>
              </div>
              <h2 className="font-heading text-xl text-foreground mb-2">Scheduled</h2>
              <p className="text-sm text-muted-foreground font-body tracking-wide mb-4">
                AC will turn on at 6:00 PM and set to 22°C
              </p>
              <motion.button 
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.95 }}
                className="text-accent font-body text-sm tracking-[0.1em] hover:underline flex items-center gap-1"
              >
                Edit Schedule 
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </main>
    </DashboardLayout>
  );
};

export default AdvancedDeviceControl;