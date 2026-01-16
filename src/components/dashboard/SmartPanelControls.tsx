import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Utensils, Heart, MessageSquare, Focus, Sparkles, ArrowRight, ChevronDown, Home } from "lucide-react";
import { Link } from "react-router-dom";
import smartPanelRoom from "@/assets/smart-panel-room.jpg";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type ModeType = "dining" | "romantic" | "chatting" | "focus";

interface ModeConfig {
  icon: React.ElementType;
  label: string;
  description: string;
  filter: string;
  overlay: string;
  accent: string;
}

interface Room {
  id: string;
  name: string;
}

const rooms: Room[] = [
  { id: "living", name: "Living Room" },
  { id: "master", name: "Master Bedroom" },
  { id: "dining", name: "Dining Room" },
  { id: "kitchen", name: "Kitchen" },
  { id: "study", name: "Study Room" },
  { id: "outdoor", name: "Outdoor Terrace" },
];

const modes: Record<ModeType, ModeConfig> = {
  dining: {
    icon: Utensils,
    label: "Dining",
    description: "Warm, inviting ambiance perfect for memorable dining experiences.",
    filter: "brightness(1.05) saturate(1.3) sepia(0.25)",
    overlay: "from-amber-500/25 via-transparent to-transparent",
    accent: "from-amber-400 to-orange-500",
  },
  romantic: {
    icon: Heart,
    label: "Romantic",
    description: "Soft, golden hues to create an intimate and serene atmosphere.",
    filter: "brightness(0.75) saturate(1.4) sepia(0.4) hue-rotate(-5deg)",
    overlay: "from-amber-600/30 via-rose-500/15 to-transparent",
    accent: "from-rose-400 to-pink-500",
  },
  chatting: {
    icon: MessageSquare,
    label: "Chatting",
    description: "Bright and clear lighting for vibrant conversations.",
    filter: "brightness(1.2) saturate(1.1) contrast(1.05)",
    overlay: "from-sky-200/15 via-transparent to-transparent",
    accent: "from-sky-400 to-blue-500",
  },
  focus: {
    icon: Focus,
    label: "Focus",
    description: "Neutral, crisp light to enhance productivity and clarity.",
    filter: "brightness(1.15) saturate(0.85) contrast(1.15) hue-rotate(5deg)",
    overlay: "from-slate-200/20 via-transparent to-transparent",
    accent: "from-slate-400 to-gray-500",
  },
};

const SmartPanelControls = () => {
  const [activeMode, setActiveMode] = useState<ModeType>("dining");
  const [selectedRoom, setSelectedRoom] = useState<string>("living");

  const currentRoom = rooms.find(r => r.id === selectedRoom);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="bg-white/80 backdrop-blur-md rounded-2xl md:rounded-3xl p-5 sm:p-6 md:p-8 border border-border/50 shadow-[0_8px_40px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_50px_rgba(0,0,0,0.1)] transition-shadow duration-500"
    >
      {/* Header */}
      <div className="flex flex-col gap-3 mb-5 md:mb-6">
        {/* Title Row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-champagne-gold/20 to-champagne-gold/5 flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-champagne-gold" />
            </div>
            <h3 className="font-serif text-base sm:text-lg md:text-xl text-charcoal">Smart Panel Controls</h3>
          </div>
          
          {/* Live Indicator */}
          <motion.div 
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/20"
          >
            <span className="text-[9px] sm:text-[10px] font-medium text-green-600 uppercase tracking-wider">Live</span>
          </motion.div>
        </div>

        {/* Room Selector - Full Width on Mobile */}
        <Select value={selectedRoom} onValueChange={setSelectedRoom}>
          <SelectTrigger className="w-full h-10 bg-white/90 border-champagne-gold/30 hover:border-champagne-gold/60 focus:ring-champagne-gold/20 rounded-xl text-charcoal text-sm font-medium transition-all duration-300">
            <div className="flex items-center gap-2">
              <Home className="w-4 h-4 text-champagne-gold" />
              <SelectValue placeholder="Select Room" />
            </div>
          </SelectTrigger>
          <SelectContent className="bg-white border-champagne-gold/20 rounded-xl shadow-xl z-50">
            {rooms.map((room) => (
              <SelectItem 
                key={room.id} 
                value={room.id}
                className="cursor-pointer hover:bg-champagne-gold/10 focus:bg-champagne-gold/10 rounded-lg text-charcoal py-2.5"
              >
                {room.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        {/* Preview Image */}
        <div className="flex-1 lg:max-w-sm">
          <motion.div 
            className="relative aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] rounded-xl md:rounded-2xl overflow-hidden bg-gradient-to-br from-charcoal/5 to-charcoal/10 group cursor-pointer"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <motion.img
              src={smartPanelRoom}
              alt="Smart Panel Living Room"
              className="w-full h-full object-cover"
              animate={{ filter: modes[activeMode].filter }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
            
            {/* Dynamic Overlay */}
            <motion.div 
              className={`absolute inset-0 bg-gradient-to-t ${modes[activeMode].overlay}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            />

            {/* Floating Badge */}
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="absolute top-3 left-3 bg-white/95 backdrop-blur-md rounded-full px-3 py-1.5 shadow-lg border border-white/50"
            >
              <p className="text-[10px] font-medium text-charcoal tracking-wide">
                Powered by <span className="text-champagne-gold font-semibold">Milan Series</span>
              </p>
            </motion.div>

            {/* Mode indicator glow */}
            <motion.div
              className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${modes[activeMode].accent}`}
              layoutId="modeIndicator"
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </motion.div>
        </div>

        {/* Right Side: Button Grid + Description */}
        <div className="flex-1 flex flex-col justify-center">
          {/* 2x2 Button Grid */}
          <div className="grid grid-cols-2 gap-2 sm:gap-3 w-full max-w-xs mx-auto lg:mx-0">
            {(Object.keys(modes) as ModeType[]).map((mode, index) => {
              const { icon: Icon, label } = modes[mode];
              const isActive = activeMode === mode;

              return (
                <motion.button
                  key={mode}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setActiveMode(mode)}
                  className={`relative flex flex-col items-center justify-center gap-2 p-4 sm:p-5 rounded-xl md:rounded-2xl border-2 transition-all duration-300 ${
                    isActive
                      ? "border-champagne-gold bg-gradient-to-br from-champagne-gold/10 to-champagne-gold/5 shadow-[0_0_30px_rgba(212,175,55,0.2)]"
                      : "border-border bg-white/50 hover:border-champagne-gold/40 hover:bg-white/80"
                  }`}
                >
                  <motion.div
                    animate={isActive ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <Icon
                      className={`w-5 h-5 transition-colors duration-300 ${
                        isActive ? "text-champagne-gold" : "text-charcoal/40"
                      }`}
                      strokeWidth={1.5}
                    />
                  </motion.div>
                  <span
                    className={`text-xs sm:text-sm font-medium transition-colors duration-300 ${
                      isActive ? "text-charcoal" : "text-charcoal/60"
                    }`}
                  >
                    {label}
                  </span>
                  
                  {/* Active indicator */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="absolute -top-1 -right-1 w-3 h-3 bg-champagne-gold rounded-full border-2 border-white shadow-sm"
                      />
                    )}
                  </AnimatePresence>
                </motion.button>
              );
            })}
          </div>

          {/* Dynamic Description */}
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeMode}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="mt-5 md:mt-6 pt-4 md:pt-5 border-t border-border/50 w-full max-w-xs mx-auto lg:mx-0 text-center lg:text-left"
            >
              <p className="text-xs sm:text-sm text-charcoal/70 leading-relaxed tracking-wide font-sans">
                {modes[activeMode].description}
              </p>
              <div className="flex items-center justify-center lg:justify-start gap-2 mt-3">
                <motion.div 
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className={`w-2 h-2 rounded-full bg-gradient-to-r ${modes[activeMode].accent}`}
                />
                <p className="text-[10px] text-charcoal/40 tracking-wider uppercase">
                  {modes[activeMode].label} Mode Active
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* View More Link */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="w-full max-w-xs mx-auto lg:mx-0 mt-5 md:mt-6"
          >
            <Link
              to="/controls"
              className="group flex items-center justify-center lg:justify-start gap-2 text-xs uppercase tracking-[0.15em] text-champagne-gold hover:text-charcoal transition-colors duration-300"
            >
              <span>View All Controls</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default SmartPanelControls;
