import { motion } from "framer-motion";
import { Crown, Sparkles } from "lucide-react";
import luxuryBg from "@/assets/luxury-living-room.jpg";

const WelcomeBanner = () => {
  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? "Good Morning" : currentHour < 18 ? "Good Afternoon" : "Good Evening";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative h-36 sm:h-40 md:h-48 rounded-2xl overflow-hidden"
    >
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${luxuryBg})` }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/95 via-charcoal/80 to-charcoal/50" />
      
      {/* Gold accent line */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-champagne-gold via-champagne-gold/60 to-transparent" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-2 mb-2"
        >
          <Crown className="w-3 h-3 text-champagne-gold" />
          <p className="text-champagne-gold text-[9px] sm:text-[10px] tracking-[0.25em] uppercase">
            The Uluwatu Cliff Estate
          </p>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="font-heading text-xl sm:text-2xl md:text-3xl text-white font-light"
        >
          {greeting}, <span className="text-champagne-gold font-medium">Mr. Adrian</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-white/50 text-[10px] sm:text-xs mt-2 flex items-center gap-1.5"
        >
          <Sparkles className="w-3 h-3 text-champagne-gold/60" />
          All systems operating smoothly
        </motion.p>
      </div>

      {/* Decorative circles - desktop only */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:block">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="w-20 h-20 border border-champagne-gold/20 rounded-full flex items-center justify-center"
        >
          <div className="w-10 h-10 bg-champagne-gold/10 rounded-full" />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default WelcomeBanner;
