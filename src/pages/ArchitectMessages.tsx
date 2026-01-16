import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  Send, 
  Phone, 
  Video, 
  MoreVertical, 
  Check, 
  CheckCheck, 
  User, 
  Wrench,
  Paperclip,
  Smile,
  Mic,
  Image,
  Clock,
  Circle
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ArchitectLayout from "@/components/layout/ArchitectLayout";

interface Message {
  id: string;
  text: string;
  sender: "architect" | "other";
  timestamp: string;
  status?: "sent" | "delivered" | "read";
}

type ChatTab = "owner" | "engineer";

const initialOwnerMessages: Message[] = [
  {
    id: "1",
    text: "Good morning! I wanted to check on the progress of the smart panel installation.",
    sender: "other",
    timestamp: "9:30 AM",
  },
  {
    id: "2",
    text: "Good morning! The installation is progressing well. We've completed 75% of the work. The living room and bedroom panels are fully operational.",
    sender: "architect",
    timestamp: "9:32 AM",
    status: "read",
  },
  {
    id: "3",
    text: "That's great news! When do you expect the remaining work to be completed?",
    sender: "other",
    timestamp: "9:35 AM",
  },
  {
    id: "4",
    text: "We're on track to finish by end of this week. I'll send you a detailed progress report this afternoon.",
    sender: "architect",
    timestamp: "9:38 AM",
    status: "read",
  },
];

const initialEngineerMessages: Message[] = [
  {
    id: "1",
    text: "Hi, I've completed the wiring for Zone 3. Ready for the panel installation.",
    sender: "other",
    timestamp: "10:15 AM",
  },
  {
    id: "2",
    text: "Perfect! Please proceed with the installation. Make sure to test the dimming functionality before moving to Zone 4.",
    sender: "architect",
    timestamp: "10:18 AM",
    status: "read",
  },
  {
    id: "3",
    text: "Will do. Also, the client requested an additional outlet in the master bedroom. Should I include it?",
    sender: "other",
    timestamp: "10:22 AM",
  },
  {
    id: "4",
    text: "Yes, add it to the scope. I'll update the documentation and inform the owner about the change.",
    sender: "architect",
    timestamp: "10:25 AM",
    status: "delivered",
  },
];

const quickResponses = {
  owner: [
    "I'll check and get back to you",
    "The project is on schedule",
    "I'll send you a report today",
    "Let me verify that for you",
  ],
  engineer: [
    "Please proceed",
    "I'll review and confirm",
    "Let's discuss this tomorrow",
    "Approved, go ahead",
  ],
};

const ArchitectMessages = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<ChatTab>("owner");
  const [ownerMessages, setOwnerMessages] = useState<Message[]>(initialOwnerMessages);
  const [engineerMessages, setEngineerMessages] = useState<Message[]>(initialEngineerMessages);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const messages = activeTab === "owner" ? ownerMessages : engineerMessages;
  const setMessages = activeTab === "owner" ? setOwnerMessages : setEngineerMessages;

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, activeTab]);

  // Simulate typing indicator
  useEffect(() => {
    const timer = setTimeout(() => {
      if (messages.length > 0 && messages[messages.length - 1].sender === "architect") {
        setIsTyping(true);
        setTimeout(() => setIsTyping(false), 2000);
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [messages]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      sender: "architect",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      status: "sent",
    };

    setMessages((prev) => [...prev, message]);
    setNewMessage("");

    setTimeout(() => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === message.id ? { ...msg, status: "delivered" } : msg
        )
      );
    }, 1000);

    setTimeout(() => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === message.id ? { ...msg, status: "read" } : msg
        )
      );
    }, 2500);
  };

  const handleSend = () => {
    sendMessage(newMessage);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const getStatusIcon = (status?: string) => {
    if (status === "read") {
      return <CheckCheck className="w-3.5 h-3.5 text-champagne-gold" />;
    } else if (status === "delivered") {
      return <CheckCheck className="w-3.5 h-3.5 text-muted-foreground/70" />;
    }
    return <Check className="w-3.5 h-3.5 text-muted-foreground/50" />;
  };

  const tabConfig = {
    owner: {
      label: "Owner",
      icon: User,
      name: "Mr. Johnson",
      subtitle: "Property Owner",
      avatar: "JH",
      status: "online",
      unread: 2,
    },
    engineer: {
      label: "Engineer",
      icon: Wrench,
      name: "David Chen",
      subtitle: "Field Engineer",
      avatar: "DC",
      status: "online",
      unread: 0,
    },
  };

  const currentChat = tabConfig[activeTab];

  return (
    <ArchitectLayout>
      <div className="flex flex-col h-[100dvh] lg:h-screen bg-gradient-to-b from-background via-background to-muted/20">
        {/* Premium Header */}
        <div className="relative overflow-hidden shrink-0">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-champagne-gold/5" />
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-champagne-gold/15 via-champagne-gold/5 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 animate-pulse" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-accent/10 to-transparent rounded-full blur-2xl translate-y-1/2 -translate-x-1/4" />
          
          {/* Subtle Grid Pattern */}
          <div className="absolute inset-0 opacity-[0.02]" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
            backgroundSize: '24px 24px'
          }} />

          <div className="relative px-4 md:px-6 lg:px-8 py-4 md:py-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              {/* Top Bar */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3 md:gap-4">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => navigate("/architect-dashboard")}
                      className="rounded-2xl hover:bg-champagne-gold/10 hover:text-champagne-gold transition-all duration-300 w-10 h-10 md:w-11 md:h-11"
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </Button>
                  </motion.div>
                  <div>
                    <h1 className="text-xl md:text-2xl lg:text-3xl font-heading font-bold tracking-tight bg-gradient-to-r from-foreground via-foreground to-foreground/70 bg-clip-text">
                      Messages
                    </h1>
                    <p className="text-muted-foreground font-body text-xs md:text-sm mt-0.5">
                      Real-time communication hub
                    </p>
                  </div>
                </div>

                {/* Time Indicator */}
                <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-2xl bg-card/60 backdrop-blur-sm border border-border/50">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-xs font-body text-muted-foreground">
                    {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>
              </div>

              {/* Chat Tabs - Premium Design */}
              <div className="flex gap-2 md:gap-3">
                {(["owner", "engineer"] as ChatTab[]).map((tab) => {
                  const config = tabConfig[tab];
                  const isActive = activeTab === tab;
                  return (
                    <motion.button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={cn(
                        "relative flex items-center gap-2 md:gap-3 px-4 md:px-5 py-3 md:py-3.5 rounded-2xl font-body text-sm transition-all duration-400 overflow-hidden group",
                        isActive
                          ? "text-champagne-gold-foreground"
                          : "bg-card/60 backdrop-blur-sm hover:bg-card/80 text-muted-foreground border border-border/50 hover:border-champagne-gold/20"
                      )}
                    >
                      {/* Active Background with Gradient */}
                      {isActive && (
                        <motion.div
                          layoutId="activeTabBg"
                          className="absolute inset-0 bg-gradient-to-r from-champagne-gold via-champagne-gold to-champagne-gold/90 shadow-lg shadow-champagne-gold/25"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                      
                      {/* Avatar Circle */}
                      <div className={cn(
                        "relative z-10 w-8 h-8 md:w-9 md:h-9 rounded-xl flex items-center justify-center text-xs font-semibold transition-all duration-300",
                        isActive 
                          ? "bg-white/20 text-champagne-gold-foreground" 
                          : "bg-gradient-to-br from-champagne-gold/10 to-champagne-gold/20 text-champagne-gold"
                      )}>
                        {config.avatar}
                        {/* Online Status */}
                        <span className={cn(
                          "absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 transition-colors",
                          isActive ? "border-champagne-gold bg-green-400" : "border-card bg-green-500"
                        )} />
                      </div>
                      
                      <div className="relative z-10 text-left hidden sm:block">
                        <span className="font-medium block text-sm">{config.name}</span>
                        <span className={cn(
                          "text-[10px] block",
                          isActive ? "text-champagne-gold-foreground/70" : "text-muted-foreground"
                        )}>
                          {config.subtitle}
                        </span>
                      </div>
                      
                      <span className="relative z-10 sm:hidden font-medium">{config.label}</span>

                      {/* Unread Badge */}
                      {config.unread > 0 && !isActive && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="relative z-10 w-5 h-5 rounded-full bg-champagne-gold text-champagne-gold-foreground text-[10px] font-bold flex items-center justify-center ml-auto"
                        >
                          {config.unread}
                        </motion.span>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Chat Partner Info Bar */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="px-4 md:px-6 lg:px-8 py-3 md:py-4 border-b border-border/50 bg-gradient-to-r from-card/80 via-card/60 to-card/80 backdrop-blur-md shrink-0"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 md:gap-4">
              {/* Animated Avatar */}
              <motion.div 
                className="relative"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="w-11 h-11 md:w-12 md:h-12 rounded-2xl bg-gradient-to-br from-champagne-gold/30 via-champagne-gold/20 to-champagne-gold/40 flex items-center justify-center shadow-lg shadow-champagne-gold/10 border border-champagne-gold/20">
                  <span className="text-champagne-gold font-heading font-bold text-sm md:text-base">
                    {currentChat.avatar}
                  </span>
                </div>
                {/* Pulse Ring for Online Status */}
                <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-green-500 border-2 border-background">
                  <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-75" />
                </span>
              </motion.div>
              
              <div>
                <h3 className="font-heading font-semibold text-sm md:text-base">{currentChat.name}</h3>
                <div className="flex items-center gap-2">
                  <Circle className="w-2 h-2 fill-green-500 text-green-500" />
                  <p className="text-xs text-green-600 font-medium">Active now</p>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center gap-1 md:gap-2">
              {[
                { icon: Phone, label: "Call" },
                { icon: Video, label: "Video" },
                { icon: MoreVertical, label: "More" },
              ].map((action, i) => (
                <motion.div key={action.label} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="rounded-xl hover:bg-champagne-gold/10 hover:text-champagne-gold transition-all duration-300 w-9 h-9 md:w-10 md:h-10"
                  >
                    <action.icon className="w-4 h-4 md:w-[18px] md:h-[18px]" />
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto px-4 md:px-6 lg:px-8 py-4 md:py-6 space-y-3 md:space-y-4">
          {/* Date Separator */}
          <div className="flex items-center gap-4 my-4">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
            <span className="text-[10px] md:text-xs text-muted-foreground font-body px-3 py-1 rounded-full bg-muted/50">
              Today
            </span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          </div>

          <AnimatePresence mode="popLayout">
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95, x: message.sender === "architect" ? 20 : -20 }}
                transition={{ 
                  duration: 0.3, 
                  delay: index * 0.05,
                  ease: "easeOut"
                }}
                className={cn(
                  "flex group",
                  message.sender === "architect" ? "justify-end" : "justify-start"
                )}
              >
                {/* Other User Avatar */}
                {message.sender === "other" && (
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-muted to-muted/60 flex items-center justify-center mr-2 md:mr-3 shrink-0 self-end mb-1">
                    <span className="text-[10px] font-semibold text-muted-foreground">
                      {currentChat.avatar}
                    </span>
                  </div>
                )}

                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className={cn(
                    "max-w-[85%] md:max-w-[70%] lg:max-w-[60%] rounded-2xl px-4 py-3 relative",
                    message.sender === "architect"
                      ? "bg-gradient-to-br from-champagne-gold via-champagne-gold to-champagne-gold/95 text-champagne-gold-foreground rounded-br-md shadow-lg shadow-champagne-gold/20"
                      : "bg-card border border-border/60 rounded-bl-md shadow-sm hover:shadow-md transition-shadow"
                  )}
                >
                  {/* Message Tail */}
                  <div className={cn(
                    "absolute bottom-0 w-3 h-3",
                    message.sender === "architect" 
                      ? "-right-1.5 bg-champagne-gold" 
                      : "-left-1.5 bg-card border-l border-b border-border/60",
                    "transform rotate-45"
                  )} style={{ clipPath: message.sender === "architect" ? 'polygon(0 0, 100% 100%, 0 100%)' : 'polygon(100% 0, 100% 100%, 0 100%)' }} />
                  
                  <p className="font-body text-sm md:text-[15px] leading-relaxed relative z-10">{message.text}</p>
                  <div
                    className={cn(
                      "flex items-center gap-1.5 mt-2 relative z-10",
                      message.sender === "architect" ? "justify-end" : "justify-start"
                    )}
                  >
                    <span
                      className={cn(
                        "text-[10px] md:text-[11px] font-medium",
                        message.sender === "architect"
                          ? "text-champagne-gold-foreground/60"
                          : "text-muted-foreground"
                      )}
                    >
                      {message.timestamp}
                    </span>
                    {message.sender === "architect" && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        {getStatusIcon(message.status)}
                      </motion.span>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing Indicator */}
          <AnimatePresence>
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex justify-start"
              >
                <div className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-card border border-border/60 rounded-bl-md">
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="w-2 h-2 rounded-full bg-muted-foreground/50"
                        animate={{ y: [0, -4, 0] }}
                        transition={{
                          duration: 0.6,
                          repeat: Infinity,
                          delay: i * 0.1,
                        }}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground ml-1">{currentChat.name} is typing</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Responses - Enhanced */}
        <div className="px-4 md:px-6 lg:px-8 py-2 md:py-3 flex gap-2 overflow-x-auto scrollbar-hide shrink-0">
          {quickResponses[activeTab].map((response, index) => (
            <motion.button
              key={index}
              onClick={() => sendMessage(response)}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex-shrink-0 px-4 py-2 rounded-xl bg-gradient-to-r from-card to-card/80 border border-border/60 text-xs md:text-sm font-body text-muted-foreground hover:text-foreground hover:border-champagne-gold/40 hover:shadow-md transition-all duration-300"
            >
              {response}
            </motion.button>
          ))}
        </div>

        {/* Premium Input Area */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={cn(
            "px-4 md:px-6 lg:px-8 py-4 md:py-5 border-t bg-gradient-to-r from-card via-card/95 to-card backdrop-blur-lg mb-20 lg:mb-0 shrink-0 transition-all duration-300",
            isFocused ? "border-champagne-gold/30" : "border-border/50"
          )}
        >
          <div className={cn(
            "flex items-center gap-2 md:gap-3 p-2 rounded-2xl border transition-all duration-300",
            isFocused 
              ? "bg-background border-champagne-gold/40 shadow-lg shadow-champagne-gold/5" 
              : "bg-muted/30 border-border/50"
          )}>
            {/* Attachment Buttons */}
            <div className="flex items-center gap-1 pl-1">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-xl h-9 w-9 hover:bg-champagne-gold/10 hover:text-champagne-gold"
                >
                  <Paperclip className="w-4 h-4" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="hidden sm:block">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-xl h-9 w-9 hover:bg-champagne-gold/10 hover:text-champagne-gold"
                >
                  <Image className="w-4 h-4" />
                </Button>
              </motion.div>
            </div>

            {/* Input */}
            <Input
              ref={inputRef}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder={`Message ${currentChat.name}...`}
              className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 font-body text-sm md:text-base placeholder:text-muted-foreground/60"
            />

            {/* Right Actions */}
            <div className="flex items-center gap-1 pr-1">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="hidden sm:block">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-xl h-9 w-9 hover:bg-champagne-gold/10 hover:text-champagne-gold"
                >
                  <Smile className="w-4 h-4" />
                </Button>
              </motion.div>
              
              {newMessage.trim() ? (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Button
                    onClick={handleSend}
                    className="rounded-xl bg-gradient-to-r from-champagne-gold to-champagne-gold/90 hover:from-champagne-gold/90 hover:to-champagne-gold text-champagne-gold-foreground px-4 h-9 md:h-10 shadow-lg shadow-champagne-gold/20 hover:shadow-champagne-gold/30 transition-all duration-300"
                  >
                    <Send className="w-4 h-4 mr-0 md:mr-2" />
                    <span className="hidden md:inline font-medium">Send</span>
                  </Button>
                </motion.div>
              ) : (
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="rounded-xl h-9 w-9 md:h-10 md:w-10 hover:bg-champagne-gold/10 hover:text-champagne-gold"
                  >
                    <Mic className="w-4 h-4 md:w-5 md:h-5" />
                  </Button>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </ArchitectLayout>
  );
};

export default ArchitectMessages;
