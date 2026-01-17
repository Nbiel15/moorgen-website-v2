import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Utensils, Sofa, PartyPopper, Moon, Power, ChevronUp, ChevronDown, Sun, Thermometer } from "lucide-react";
import { motion, AnimatePresence, useSpring } from "framer-motion";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { cn } from "@/lib/utils";

// Room images
import livingRoomImg from "@/assets/living-room.jpg";
import kitchenImg from "@/assets/kitchen.jpg";
import bathroomImg from "@/assets/bathroom.jpg";
const rooms = [{
  id: "living",
  label: "Living Room",
  image: livingRoomImg
}, {
  id: "kitchen",
  label: "Kitchen",
  image: kitchenImg
}, {
  id: "bathroom",
  label: "Bathroom",
  image: bathroomImg
}];
const scenes = [{
  id: "dinner",
  label: "Dinner",
  icon: Utensils
}, {
  id: "relax",
  label: "Relax",
  icon: Sofa
}, {
  id: "party",
  label: "Party",
  icon: PartyPopper
}, {
  id: "sleep",
  label: "Sleep",
  icon: Moon
}];
const AdvancedLightingControl = () => {
  const navigate = useNavigate();
  const [brightness, setBrightness] = useState(75);
  const [displayBrightness, setDisplayBrightness] = useState(75);
  const [activeRoom, setActiveRoom] = useState("living");
  const [activeScene, setActiveScene] = useState("relax");
  const [isPowered, setIsPowered] = useState(true);
  const [colorTemp, setColorTemp] = useState("Warm");
  const [isLoaded, setIsLoaded] = useState(false);
  const [brightnessAnimating, setBrightnessAnimating] = useState(false);
  const minBrightness = 0;
  const maxBrightness = 100;
  const brightnessRange = maxBrightness - minBrightness;
  const brightnessPercentage = (brightness - minBrightness) / brightnessRange * 100;

  // Spring animation for dial rotation
  const springConfig = {
    stiffness: 100,
    damping: 15,
    mass: 1
  };
  const dialRotationSpring = useSpring(brightnessPercentage / 100 * 270 - 135, springConfig);

  // Update spring when brightness changes
  useEffect(() => {
    dialRotationSpring.set(brightnessPercentage / 100 * 270 - 135);
  }, [brightnessPercentage, dialRotationSpring]);

  // Brightness counter animation
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (displayBrightness === brightness) {
      setBrightnessAnimating(false);
      return;
    }
    setBrightnessAnimating(true);
    const direction = brightness > displayBrightness ? 1 : -1;
    intervalRef.current = setInterval(() => {
      setDisplayBrightness(prev => {
        const next = prev + direction;
        if (direction > 0 && next >= brightness || direction < 0 && next <= brightness) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          setBrightnessAnimating(false);
          return brightness;
        }
        return next;
      });
    }, 20);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [brightness, displayBrightness]);
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Dynamic background based on brightness
  const getBrightnessGradient = () => {
    if (!isPowered) return "from-muted/20 to-muted/10";
    if (brightness < 25) return "from-slate-500/5 to-slate-600/5";
    if (brightness < 50) return "from-amber-500/5 to-yellow-500/5";
    if (brightness < 75) return "from-yellow-400/5 to-amber-400/5";
    return "from-amber-300/5 to-yellow-300/5";
  };
  return <DashboardLayout>
      {/* Header */}
      <motion.header initial={{
      opacity: 0,
      y: -20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.5
    }} className="relative border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="mx-auto w-full max-w-7xl px-4 py-4 md:px-8">
          <motion.button whileHover={{
          x: -4
        }} whileTap={{
          scale: 0.95
        }} onClick={() => navigate("/controls")} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group mb-4">
            <ArrowLeft className="w-5 h-5" />
            
          </motion.button>
          <motion.p initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} transition={{
          delay: 0.2
        }} className="text-[10px] text-accent tracking-[0.2em] uppercase font-body">
            Advanced Lighting Control
          </motion.p>
          <motion.h1 initial={{
          opacity: 0,
          y: 10
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.3
        }} className="font-heading text-2xl md:text-3xl text-foreground mt-1">
            Villa Uluwatu
          </motion.h1>
        </div>
      </motion.header>

      <main className="relative mx-auto w-full max-w-7xl px-4 py-6 md:px-8 pb-24 lg:pb-8">
        {/* Live Room Preview */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.35
      }} className="relative mb-6 rounded-3xl overflow-hidden">
          
        </motion.div>

        {/* Room Tabs */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.4
      }} className="flex gap-2 overflow-x-auto pb-2 mb-8 scrollbar-hide">
          {rooms.map((room, index) => <motion.button key={room.id} initial={{
          opacity: 0,
          y: 10
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.4 + index * 0.1
        }} whileHover={{
          scale: 1.05,
          y: -2
        }} whileTap={{
          scale: 0.95
        }} onClick={() => setActiveRoom(room.id)} className={cn("relative px-5 py-2.5 rounded-full whitespace-nowrap transition-all duration-300 font-body text-sm tracking-[0.1em] press-effect", activeRoom === room.id ? "bg-accent/10 text-accent border border-accent/30" : "bg-card border border-border text-muted-foreground hover:border-foreground/20")}>
              {room.label}
              <AnimatePresence>
                {activeRoom === room.id && <motion.span layoutId="roomIndicator" initial={{
              scaleX: 0
            }} animate={{
              scaleX: 1
            }} exit={{
              scaleX: 0
            }} className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-accent rounded-full" />}
              </AnimatePresence>
            </motion.button>)}
        </motion.div>

        {/* Main Content - 2 Column Split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Left Column - Brightness Dial */}
          <motion.div initial={{
          opacity: 0,
          x: -30
        }} animate={{
          opacity: 1,
          x: 0
        }} transition={{
          delay: 0.5,
          duration: 0.6
        }} className="flex flex-col items-center justify-center">
            {/* Power Button */}
            <motion.button whileHover={{
            scale: 1.1
          }} whileTap={{
            scale: 0.9
          }} onClick={() => setIsPowered(!isPowered)} className={cn("relative w-14 h-14 rounded-full flex items-center justify-center mb-10 transition-all duration-500 overflow-hidden", isPowered ? "bg-accent text-accent-foreground animate-glow-pulse" : "bg-muted text-muted-foreground")}>
              <Power className="w-6 h-6 relative z-10" strokeWidth={1.5} />
              <AnimatePresence>
                {isPowered && <motion.div initial={{
                scale: 0,
                opacity: 0.5
              }} animate={{
                scale: 2.5,
                opacity: 0
              }} exit={{
                opacity: 0
              }} transition={{
                duration: 1,
                repeat: Infinity,
                repeatDelay: 1
              }} className="absolute inset-0 bg-accent rounded-full" />}
              </AnimatePresence>
            </motion.button>

            {/* Live Room Preview Card */}
            <motion.div initial={{
            scale: 0.95,
            opacity: 0
          }} animate={{
            scale: 1,
            opacity: 1
          }} transition={{
            delay: 0.6,
            type: "spring",
            stiffness: 100
          }} className={cn("relative w-full aspect-[4/3] max-w-md transition-all duration-500 overflow-hidden border border-border", !isPowered && "opacity-50")}>
              {/* Room Image */}
              <AnimatePresence mode="wait">
                <motion.img key={activeRoom} src={rooms.find(r => r.id === activeRoom)?.image} alt={rooms.find(r => r.id === activeRoom)?.label} initial={{
                opacity: 0,
                scale: 1.05
              }} animate={{
                opacity: 1,
                scale: 1
              }} exit={{
                opacity: 0,
                scale: 0.95
              }} transition={{
                duration: 0.4
              }} className="absolute inset-0 w-full h-full object-cover" />
              </AnimatePresence>

              {/* Brightness Overlay */}
              <motion.div animate={{
              backgroundColor: isPowered ? `rgba(0, 0, 0, ${(100 - brightness) / 100 * 0.85})` : "rgba(0, 0, 0, 0.9)"
            }} transition={{
              duration: 0.3
            }} className="absolute inset-0" />

              {/* Color Temperature Overlay */}
              <motion.div animate={{
              background: isPowered ? colorTemp === "Warm" ? "linear-gradient(135deg, rgba(255,180,100,0.25) 0%, transparent 60%)" : colorTemp === "Cool" ? "linear-gradient(135deg, rgba(150,200,255,0.25) 0%, transparent 60%)" : "transparent" : "transparent"
            }} transition={{
              duration: 0.5
            }} className="absolute inset-0" />

              {/* Edge Highlight */}
              <div className="absolute inset-0 border-l-2 border-accent/40" />
              
              {/* Animated Accent Line */}
              {isPowered && <motion.div animate={{
              opacity: [0.4, 0.8, 0.4]
            }} transition={{
              duration: 2,
              repeat: Infinity
            }} className="absolute left-0 top-0 bottom-0 w-1 bg-accent" />}

              {/* Room Label - Top Left */}
              <div className="absolute top-4 left-4">
                <motion.p key={activeRoom} initial={{
                opacity: 0,
                x: -10
              }} animate={{
                opacity: 1,
                x: 0
              }} className="text-xs font-body tracking-[0.15em] uppercase text-white/70 bg-black/30 px-3 py-1.5 backdrop-blur-sm">
                  {rooms.find(r => r.id === activeRoom)?.label}
                </motion.p>
              </div>

              {/* Center Content Overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="flex items-baseline gap-1">
                  <motion.span key={displayBrightness} initial={{
                  y: brightnessAnimating ? -10 : 0,
                  opacity: brightnessAnimating ? 0 : 1
                }} animate={{
                  y: 0,
                  opacity: 1
                }} className="font-heading text-5xl md:text-6xl text-white drop-shadow-lg">
                    {displayBrightness}
                  </motion.span>
                  <span className="text-xl font-heading text-white/70">%</span>
                </div>

                <motion.span animate={{
                opacity: isPowered ? 1 : 0.5
              }} className="text-[10px] font-body tracking-[0.2em] uppercase mt-1 text-accent drop-shadow-lg">
                  {isPowered ? brightness < 30 ? "Dim" : brightness > 70 ? "Bright" : "Ambient" : "Off"}
                </motion.span>
              </div>

              {/* Status Badge - Bottom Right */}
              <div className="absolute bottom-4 right-4">
                <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="text-[10px] font-body tracking-[0.1em] uppercase text-accent bg-black/40 px-3 py-1.5 backdrop-blur-sm border-l border-accent/50">
                  {activeScene}
                </motion.div>
              </div>
            </motion.div>

            {/* Brightness Slider */}
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.7
          }} className={cn("w-full max-w-md mt-8 transition-opacity duration-300", !isPowered && "opacity-50")}>
              <div className="flex justify-between text-xs text-muted-foreground mb-2 font-body">
                <span>{minBrightness}%</span>
                <span>{maxBrightness}%</span>
              </div>
              <input type="range" min={minBrightness} max={maxBrightness} step={1} value={brightness} onChange={e => setBrightness(Number(e.target.value))} disabled={!isPowered} className={cn("w-full h-1 bg-border appearance-none", "[&::-webkit-slider-runnable-track]:bg-border", "[&::-webkit-slider-thumb]:appearance-none", "[&::-webkit-slider-thumb]:w-5", "[&::-webkit-slider-thumb]:h-5", "[&::-webkit-slider-thumb]:transition-all", "[&::-webkit-slider-thumb]:duration-200", "[&::-webkit-slider-thumb]:hover:scale-125", isPowered ? "[&::-webkit-slider-thumb]:bg-accent [&::-webkit-slider-thumb]:shadow-[0_0_15px_rgba(212,175,55,0.6)] [&::-webkit-slider-thumb]:cursor-pointer cursor-pointer" : "[&::-webkit-slider-thumb]:bg-muted-foreground/50 cursor-not-allowed")} />
            </motion.div>

            {/* Brand Badge */}
            <motion.div initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} transition={{
            delay: 0.9
          }} className="mt-8 text-center">
              <p className="text-[10px] text-accent tracking-[0.2em] uppercase font-body animate-shimmer">
                Moorgen Lumière Technology
              </p>
            </motion.div>
          </motion.div>

          {/* Right Column - Scene & Controls */}
          <div className="space-y-8">
            {/* Scene Selection */}
            <motion.div initial={{
            opacity: 0,
            x: 30
          }} animate={{
            opacity: 1,
            x: 0
          }} transition={{
            delay: 0.5
          }}>
              <h2 className="font-heading text-xl text-foreground mb-4">Scene</h2>
              <div className="grid grid-cols-2 gap-3">
                {scenes.map((scene, index) => <motion.button key={scene.id} initial={{
                opacity: 0,
                y: 20
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                delay: 0.6 + index * 0.1
              }} whileHover={{
                scale: 1.05,
                y: -4
              }} whileTap={{
                scale: 0.95,
                rotateY: 10
              }} onClick={() => setActiveScene(scene.id)} className={cn("relative flex flex-col items-center gap-3 p-5 rounded-3xl transition-all duration-300 border hover-lift overflow-hidden", activeScene === scene.id ? "bg-primary text-primary-foreground border-primary shadow-lg" : "bg-card border-border text-muted-foreground hover:border-foreground/20")}>
                    <motion.div animate={activeScene === scene.id ? {
                  rotate: [0, 10, -10, 0]
                } : {}} transition={{
                  duration: 0.5
                }}>
                      <scene.icon className={cn("w-6 h-6", activeScene === scene.id && "text-accent")} strokeWidth={1.5} />
                    </motion.div>
                    <span className={cn("text-xs font-body tracking-[0.1em]", activeScene === scene.id && "text-accent")}>
                      {scene.label}
                    </span>
                    {activeScene === scene.id && <motion.div layoutId="sceneGlow" className="absolute inset-0 bg-accent/10 rounded-3xl" initial={{
                  opacity: 0
                }} animate={{
                  opacity: 1
                }} exit={{
                  opacity: 0
                }} />}
                  </motion.button>)}
              </div>
            </motion.div>

            {/* Color Temperature */}
            <motion.div initial={{
            opacity: 0,
            x: 30
          }} animate={{
            opacity: 1,
            x: 0
          }} transition={{
            delay: 0.7
          }}>
              <h2 className="font-heading text-xl text-foreground mb-4 flex items-center gap-2">
                Color Temperature
                <Thermometer className="w-4 h-4 text-accent" />
              </h2>
              <div className="flex gap-2">
                {["Warm", "Neutral", "Cool"].map((temp, index) => <motion.button key={temp} initial={{
                opacity: 0,
                y: 10
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                delay: 0.8 + index * 0.1
              }} whileHover={{
                scale: 1.08,
                y: -2
              }} whileTap={{
                scale: 0.95
              }} onClick={() => setColorTemp(temp)} className={cn("relative flex-1 py-3 rounded-2xl text-sm font-body tracking-[0.1em] transition-all border overflow-hidden", colorTemp === temp ? "bg-primary text-accent border-primary shadow-lg" : "bg-card border-border text-muted-foreground hover:border-foreground/20")}>
                    {temp}
                    {colorTemp === temp && <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/20 to-transparent" animate={{
                  x: ["-100%", "100%"]
                }} transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatDelay: 0.5
                }} />}
                  </motion.button>)}
              </div>
            </motion.div>

            {/* Room Selection */}
            <motion.div initial={{
            opacity: 0,
            x: 30
          }} animate={{
            opacity: 1,
            x: 0
          }} transition={{
            delay: 0.9
          }}>
              <h2 className="font-heading text-xl text-foreground mb-4">Room</h2>
              <div className="grid grid-cols-1 gap-3">
                {rooms.slice(0, 3).map((room, index) => <motion.button key={room.id} initial={{
                opacity: 0,
                x: 20
              }} animate={{
                opacity: 1,
                x: 0
              }} transition={{
                delay: 1 + index * 0.1
              }} whileHover={{
                scale: 1.02,
                x: 4
              }} whileTap={{
                scale: 0.98
              }} onClick={() => setActiveRoom(room.id)} className={cn("relative flex items-center justify-between p-5 rounded-3xl transition-all duration-300 border hover-lift", activeRoom === room.id ? "bg-accent/10 text-foreground border-accent/30" : "bg-card border-border text-foreground hover:border-foreground/20")}>
                    <span className="font-body text-sm tracking-[0.1em]">{room.label}</span>
                    <motion.div animate={{
                  scale: activeRoom === room.id ? [1, 1.3, 1] : 1,
                  backgroundColor: activeRoom === room.id ? "hsl(43, 76%, 52%)" : "hsl(0, 0%, 90%)"
                }} transition={{
                  duration: 0.3
                }} className={cn("w-3 h-3 rounded-full transition-all", activeRoom === room.id && "shadow-[0_0_10px_rgba(212,175,55,0.5)]")} />
                    <AnimatePresence>
                      {activeRoom === room.id && <motion.span initial={{
                    scaleX: 0,
                    opacity: 0
                  }} animate={{
                    scaleX: 1,
                    opacity: 1
                  }} exit={{
                    scaleX: 0,
                    opacity: 0
                  }} className="absolute bottom-0 left-6 right-6 h-0.5 bg-accent rounded-full origin-left" />}
                    </AnimatePresence>
                  </motion.button>)}
              </div>
            </motion.div>

            {/* Status Card */}
            <motion.div initial={{
            opacity: 0,
            y: 30
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 1.1
          }} whileHover={{
            scale: 1.02,
            y: -4
          }} className="bg-card rounded-3xl p-6 border border-border hover-lift hover-glow">
              <div className="flex items-center gap-2 mb-2">
                <motion.div animate={{
                scale: [1, 1.3, 1],
                opacity: [0.8, 1, 0.8]
              }} transition={{
                duration: 2,
                repeat: Infinity
              }} className="w-2 h-2 rounded-full bg-accent shadow-[0_0_10px_rgba(212,175,55,0.5)]" />
                <p className="text-[10px] text-accent tracking-[0.15em] uppercase font-body">
                  {isPowered ? "Lights Active" : "Lights Off"}
                </p>
              </div>
              <h2 className="font-heading text-xl text-foreground mb-2">Current Settings</h2>
              <p className="text-sm text-muted-foreground font-body tracking-wide mb-4">
                {rooms.find(r => r.id === activeRoom)?.label} • {activeScene.charAt(0).toUpperCase() + activeScene.slice(1)} Mode • {brightness}%
              </p>
              <motion.button whileHover={{
              x: 4
            }} whileTap={{
              scale: 0.95
            }} className="text-accent font-body text-sm tracking-[0.1em] hover:underline flex items-center gap-1">
                Save as Preset
                <motion.span animate={{
                x: [0, 4, 0]
              }} transition={{
                duration: 1.5,
                repeat: Infinity
              }}>
                  →
                </motion.span>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </main>
    </DashboardLayout>;
};
export default AdvancedLightingControl;