import { motion } from "framer-motion";
import { Phone, Mail, Award, Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ArchitectProfile = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-white/90 backdrop-blur-sm rounded-2xl p-5 border border-border/40 shadow-sm"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-champagne-gold/20 to-champagne-gold/5 flex items-center justify-center">
            <Award className="w-4 h-4 text-champagne-gold" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-charcoal">Lead Architect</h3>
            <p className="text-[10px] text-charcoal/40">Project Manager</p>
          </div>
        </div>
        <div className="flex items-center gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-3 h-3 text-champagne-gold fill-champagne-gold" />
          ))}
        </div>
      </div>

      {/* Profile Card */}
      <div className="flex items-center gap-4 p-4 bg-gradient-to-br from-charcoal to-charcoal/95 rounded-xl">
        <div className="relative">
          <Avatar className="w-14 h-14 ring-2 ring-champagne-gold/30 ring-offset-2 ring-offset-charcoal">
            <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face" alt="Architect" />
            <AvatarFallback className="bg-champagne-gold text-charcoal text-sm font-medium">IW</AvatarFallback>
          </Avatar>
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-charcoal flex items-center justify-center">
            <span className="w-2 h-2 bg-white rounded-full" />
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-heading text-base text-white truncate">
            Ir. Wayan Sudarma
          </h3>
          <p className="text-[11px] text-white/50 mt-0.5">15+ years experience</p>
          <p className="text-[10px] text-champagne-gold mt-1">IAI Certified Professional</p>
        </div>
      </div>

      {/* Contact buttons */}
      <div className="flex gap-3 mt-4">
        <a 
          href="tel:+6281234567890" 
          className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-charcoal hover:bg-charcoal/90 rounded-xl text-xs text-white transition-all"
        >
          <Phone className="w-3.5 h-3.5" />
          <span>Call Now</span>
        </a>
        <a 
          href="mailto:wayan@moorgenarch.com" 
          className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-charcoal/20 hover:border-champagne-gold/50 hover:bg-champagne-gold/5 rounded-xl text-xs text-charcoal transition-all"
        >
          <Mail className="w-3.5 h-3.5" />
          <span>Email</span>
        </a>
      </div>
    </motion.div>
  );
};

export default ArchitectProfile;
