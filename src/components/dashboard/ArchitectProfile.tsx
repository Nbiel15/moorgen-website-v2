import { motion } from "framer-motion";
import { Phone, Mail } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ArchitectProfile = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="h-full bg-white/80 backdrop-blur-md rounded-xl p-3 sm:p-4 border border-border/50 shadow-sm"
    >
      {/* Header */}
      <p className="text-[8px] sm:text-[9px] text-champagne-gold uppercase tracking-wider font-medium mb-2">
        Lead Architect
      </p>

      {/* Profile */}
      <div className="flex items-center gap-2.5">
        <Avatar className="w-10 h-10 border border-champagne-gold/20">
          <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face" alt="Architect" />
          <AvatarFallback className="bg-charcoal text-white text-xs">IW</AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <h3 className="font-serif text-sm text-charcoal truncate">Ir. Wayan S.</h3>
          <p className="text-[9px] text-charcoal/50">15+ yrs experience</p>
        </div>
      </div>

      {/* Quick Contact */}
      <div className="flex gap-2 mt-3">
        <a href="tel:+6281234567890" className="flex-1 flex items-center justify-center gap-1 py-1.5 bg-charcoal/5 hover:bg-champagne-gold/10 rounded-lg text-[9px] text-charcoal/60 hover:text-champagne-gold transition-colors">
          <Phone className="w-3 h-3" />
          <span>Call</span>
        </a>
        <a href="mailto:wayan@moorgenarch.com" className="flex-1 flex items-center justify-center gap-1 py-1.5 bg-charcoal/5 hover:bg-champagne-gold/10 rounded-lg text-[9px] text-charcoal/60 hover:text-champagne-gold transition-colors">
          <Mail className="w-3 h-3" />
          <span>Email</span>
        </a>
      </div>
    </motion.div>
  );
};

export default ArchitectProfile;
