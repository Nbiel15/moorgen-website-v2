import { motion } from "framer-motion";
import { Phone, Mail, Award } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ArchitectProfile = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="group relative bg-gradient-to-br from-charcoal to-charcoal/95 rounded-2xl p-4 sm:p-5 overflow-hidden"
    >
      {/* Subtle gold accent */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-champagne-gold/5 rounded-full blur-2xl" />
      
      {/* Header badge */}
      <div className="flex items-center gap-1.5 mb-3">
        <Award className="w-3 h-3 text-champagne-gold" />
        <span className="text-[8px] sm:text-[9px] text-champagne-gold uppercase tracking-[0.2em]">
          Lead Architect
        </span>
      </div>

      {/* Profile */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <Avatar className="w-11 h-11 sm:w-12 sm:h-12 ring-2 ring-champagne-gold/30 ring-offset-2 ring-offset-charcoal">
            <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face" alt="Architect" />
            <AvatarFallback className="bg-champagne-gold text-charcoal text-sm font-medium">IW</AvatarFallback>
          </Avatar>
          <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-emerald-500 rounded-full border-2 border-charcoal flex items-center justify-center">
            <span className="w-1.5 h-1.5 bg-white rounded-full" />
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-heading text-sm sm:text-base text-white truncate">
            Ir. Wayan Sudarma
          </h3>
          <p className="text-[10px] text-white/40">15+ years • IAI Certified</p>
        </div>
      </div>

      {/* Contact buttons */}
      <div className="flex gap-2 mt-4">
        <a 
          href="tel:+6281234567890" 
          className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-white/5 hover:bg-champagne-gold/20 border border-white/10 hover:border-champagne-gold/30 rounded-lg text-[10px] text-white/70 hover:text-champagne-gold transition-all"
        >
          <Phone className="w-3 h-3" />
          <span>Call</span>
        </a>
        <a 
          href="mailto:wayan@moorgenarch.com" 
          className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-white/5 hover:bg-champagne-gold/20 border border-white/10 hover:border-champagne-gold/30 rounded-lg text-[10px] text-white/70 hover:text-champagne-gold transition-all"
        >
          <Mail className="w-3 h-3" />
          <span>Email</span>
        </a>
      </div>
    </motion.div>
  );
};

export default ArchitectProfile;
