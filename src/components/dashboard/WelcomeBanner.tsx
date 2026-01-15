import { motion } from "framer-motion";
import { Sparkles, Crown } from "lucide-react";
import luxuryBg from "@/assets/luxury-living-room.jpg";

const WelcomeBanner = () => {
  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? "Good Morning" : currentHour < 18 ? "Good Afternoon" : "Good Evening";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative h-52 sm:h-56 md:h-64 lg:h-72 rounded-2xl md:rounded-3xl overflow-hidden group"
    >
      {/* Luxury Background Image with parallax effect */}
      <motion.div 
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{ backgroundImage: `url(${luxuryBg})` }}
        whileHover={{ scale: 1.08 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
      
      {/* Multi-layer gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/70 to-charcoal/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent" />
      
      {/* Animated gold shimmer overlay */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-champagne-gold/10 via-transparent to-champagne-gold/5"
        animate={{ 
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Decorative corner accents with animation */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="absolute top-0 left-0 w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 border-t-2 border-l-2 border-champagne-gold/40 rounded-tl-2xl md:rounded-tl-3xl" 
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="absolute bottom-0 right-0 w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 border-b-2 border-r-2 border-champagne-gold/40 rounded-br-2xl md:rounded-br-3xl" 
      />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-champagne-gold/30 rounded-full"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [-10, 10, -10],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center px-5 sm:px-8 md:px-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex items-center gap-2 mb-3"
        >
          <Crown className="w-3.5 h-3.5 text-champagne-gold" />
          <p className="text-champagne-gold text-[10px] sm:text-xs tracking-[0.3em] uppercase font-body">
            The Uluwatu Cliff Estate
          </p>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white mb-3 font-light tracking-wide"
        >
          {greeting}, <span className="text-champagne-gold">Mr. Adrian</span>
        </motion.h1>

        <motion.div 
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
          className="w-16 md:w-20 h-px bg-gradient-to-r from-champagne-gold via-champagne-gold/60 to-transparent mb-3 origin-left" 
        />

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-white/60 text-xs sm:text-sm max-w-sm md:max-w-md font-body tracking-wide flex items-center gap-2"
        >
          <Sparkles className="w-3 h-3 text-champagne-gold/70" />
          Your private sanctuary awaits. All systems are operating smoothly.
        </motion.p>
      </div>

      {/* Decorative animated circles - hidden on small screens */}
      <div className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 hidden md:block">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="w-24 md:w-32 lg:w-36 h-24 md:h-32 lg:h-36 border border-champagne-gold/20 rounded-full flex items-center justify-center"
        >
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="w-16 md:w-22 lg:w-24 h-16 md:h-22 lg:h-24 border border-champagne-gold/30 rounded-full flex items-center justify-center"
          >
            <motion.div 
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-8 md:w-12 lg:w-14 h-8 md:h-12 lg:h-14 bg-champagne-gold/15 rounded-full backdrop-blur-sm border border-champagne-gold/20" 
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Hover glow effect */}
      <motion.div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-champagne-gold/5 via-transparent to-champagne-gold/5 pointer-events-none"
      />
    </motion.div>
  );
};

export default WelcomeBanner;
