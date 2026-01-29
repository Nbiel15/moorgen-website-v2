import { motion } from "framer-motion";
import { Phone, Mail } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ArchitectProfile = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      style={{ height: "100%" }}
      className="bg-white/80 backdrop-blur-md rounded-2xl md:rounded-3xl p-4 sm:p-5 md:p-6 border border-border/50 shadow-[0_8px_40px_rgba(0,0,0,0.06)]"
    >
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Avatar */}
        <Avatar className="w-12 h-12 sm:w-14 sm:h-14 border-2 border-champagne-gold/30 shadow-lg flex-shrink-0">
          <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face" alt="Architect" />
          <AvatarFallback className="bg-gradient-to-br from-charcoal to-charcoal/80 text-white font-serif">
            IW
          </AvatarFallback>
        </Avatar>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <p className="text-[9px] sm:text-[10px] text-champagne-gold uppercase tracking-wider font-medium">
            Lead Architect
          </p>
          <h3 className="font-serif text-base sm:text-lg text-charcoal truncate">
            Ir. Wayan Sudarma
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <a href="tel:+6281234567890" className="text-[10px] sm:text-xs text-charcoal/60 hover:text-champagne-gold transition-colors flex items-center gap-1">
              <Phone className="w-3 h-3" />
              <span className="hidden sm:inline">Contact</span>
            </a>
            <a href="mailto:wayan@moorgenarch.com" className="text-[10px] sm:text-xs text-charcoal/60 hover:text-champagne-gold transition-colors flex items-center gap-1">
              <Mail className="w-3 h-3" />
              <span className="hidden sm:inline">Email</span>
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ArchitectProfile;
