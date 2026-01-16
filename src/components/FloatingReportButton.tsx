import { motion } from "framer-motion";
import { FileEdit } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const FloatingReportButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Don't show on the reporting page itself
  if (location.pathname === "/architect-reporting") {
    return null;
  }

  return (
    <motion.button
      onClick={() => navigate("/architect-reporting")}
      className="fixed bottom-20 sm:bottom-24 md:bottom-8 right-4 sm:right-6 z-50 w-12 h-12 sm:w-14 sm:h-14 bg-[#D4AF37] hover:bg-[#B8972F] text-[#1A1A1A] rounded-full shadow-xl flex items-center justify-center group transition-all duration-300"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
    >
      {/* Pulse ring */}
      <span className="absolute w-full h-full rounded-full bg-[#D4AF37] animate-ping opacity-20" />
      
      {/* Icon */}
      <FileEdit className="w-5 h-5 sm:w-6 sm:h-6 relative z-10" />
      
      {/* Tooltip - hidden on mobile */}
      <span className="hidden md:block absolute right-16 bg-[#1A1A1A] text-white text-sm font-playfair px-3 py-2 rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
        Live Reporting
      </span>
    </motion.button>
  );
};

export default FloatingReportButton;
