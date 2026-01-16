import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ChatWithEngineerButton = () => {
  const navigate = useNavigate();

  return (
    <motion.button
      onClick={() => navigate('/engineer-chat')}
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-24 lg:bottom-8 right-4 sm:right-6 z-50 flex items-center gap-2 px-4 py-3 bg-primary text-primary-foreground rounded-full shadow-xl hover:shadow-2xl transition-shadow duration-300"
    >
      <MessageCircle className="w-5 h-5" />
      <span className="text-sm font-medium hidden sm:inline">Chat with Engineer</span>
      <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background animate-pulse" />
    </motion.button>
  );
};

export default ChatWithEngineerButton;
