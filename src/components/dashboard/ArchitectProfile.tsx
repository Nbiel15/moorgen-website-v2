import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Star, Award } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ArchitectProfile = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-white/80 backdrop-blur-md rounded-2xl md:rounded-3xl p-4 sm:p-5 md:p-6 border border-border/50 shadow-[0_8px_40px_rgba(0,0,0,0.06)]"
    >
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
        {/* Avatar & Badge */}
        <div className="flex sm:flex-col items-center gap-3 sm:gap-2">
          <div className="relative">
            <Avatar className="w-16 h-16 sm:w-20 sm:h-20 border-2 border-champagne-gold/30 shadow-lg">
              <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face" alt="Architect" />
              <AvatarFallback className="bg-gradient-to-br from-charcoal to-charcoal/80 text-white font-serif text-lg">
                IW
              </AvatarFallback>
            </Avatar>
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-br from-champagne-gold to-amber-500 rounded-full flex items-center justify-center shadow-lg"
            >
              <Award className="w-3 h-3 text-white" />
            </motion.div>
          </div>
          <div className="flex items-center gap-0.5 sm:mt-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3 h-3 fill-champagne-gold text-champagne-gold" />
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
            <div>
              <p className="text-[10px] sm:text-xs text-champagne-gold uppercase tracking-[0.2em] font-medium mb-1">
                Lead Architect
              </p>
              <h3 className="font-serif text-lg sm:text-xl text-charcoal">
                Ir. Wayan Sudarma, IAI
              </h3>
              <p className="text-xs sm:text-sm text-charcoal/60 mt-0.5">
                15+ years in luxury villa design
              </p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="mt-3 sm:mt-4 flex flex-wrap gap-2 sm:gap-3">
            <a
              href="tel:+6281234567890"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-charcoal/5 hover:bg-champagne-gold/10 rounded-full text-[10px] sm:text-xs text-charcoal/70 hover:text-champagne-gold transition-colors group"
            >
              <Phone className="w-3 h-3 group-hover:text-champagne-gold transition-colors" />
              <span>+62 812-3456-7890</span>
            </a>
            <a
              href="mailto:wayan@moorgenarch.com"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-charcoal/5 hover:bg-champagne-gold/10 rounded-full text-[10px] sm:text-xs text-charcoal/70 hover:text-champagne-gold transition-colors group"
            >
              <Mail className="w-3 h-3 group-hover:text-champagne-gold transition-colors" />
              <span className="truncate max-w-[140px] sm:max-w-none">wayan@moorgenarch.com</span>
            </a>
          </div>

          {/* Location */}
          <div className="mt-2 sm:mt-3 flex items-center gap-1.5 text-[10px] sm:text-xs text-charcoal/50">
            <MapPin className="w-3 h-3" />
            <span>Moorgen Design Studio, Seminyak, Bali</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ArchitectProfile;
