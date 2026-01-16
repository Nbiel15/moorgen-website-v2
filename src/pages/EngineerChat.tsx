import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Send, Paperclip, Phone, Video, MoreVertical, Check, CheckCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Message {
  id: string;
  text: string;
  sender: "engineer" | "owner";
  timestamp: string;
  status?: "sent" | "delivered" | "read";
}

const EngineerChat = () => {
  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Good morning! I wanted to update you on the Device Installation Phase progress.",
      sender: "engineer",
      timestamp: "9:00 AM",
    },
    {
      id: "2",
      text: "Wiring for the master suite is now 100% verified. All panels tested and functioning perfectly.",
      sender: "engineer",
      timestamp: "10:30 AM",
    },
    {
      id: "3",
      text: "Excellent work! Please proceed to the living room installation.",
      sender: "owner",
      timestamp: "10:45 AM",
      status: "read",
    },
    {
      id: "4",
      text: "Already on it. We should have the living room panels installed by end of day today.",
      sender: "engineer",
      timestamp: "10:47 AM",
    },
    {
      id: "5",
      text: "The smart lighting integration is also complete. You can test it from the app anytime.",
      sender: "engineer",
      timestamp: "11:15 AM",
    },
  ]);

  const quickResponses = [
    "Request Latest Photos",
    "Check Deadline Status",
    "Book Site Visit",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      sender: "owner",
      timestamp: new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
      status: "sent",
    };
    
    setMessages((prev) => [...prev, newMessage]);
    setChatInput("");

    // Simulate message delivery
    setTimeout(() => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === newMessage.id ? { ...msg, status: "delivered" } : msg
        )
      );
    }, 1000);
  };

  const handleSend = () => {
    sendMessage(chatInput);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Context Bar */}
      <div className="bg-champagne-gold/10 border-b border-champagne-gold/20 px-4 py-2">
        <p className="text-center text-xs font-body text-champagne-gold">
          Currently discussing: <span className="font-semibold">Device Installation Phase</span>
        </p>
      </div>

      {/* Header */}
      <header className="bg-white border-b border-border px-4 py-3 sticky top-0 z-10">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          <div className="flex items-center gap-3">
            <motion.button
              onClick={() => navigate(-1)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 hover:bg-muted rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </motion.button>
            
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-11 h-11 rounded-full bg-moorgen-black flex items-center justify-center text-white font-heading font-semibold text-lg">
                  W
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white" />
              </div>
              <div>
                <h1 className="font-heading font-semibold text-foreground text-base">
                  Wayan Sudarta
                </h1>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-muted-foreground">Lead Systems Engineer</span>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-green-600 font-medium">Live on Site</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button className="p-2 hover:bg-muted rounded-full transition-colors">
              <Phone className="w-5 h-5 text-muted-foreground" />
            </button>
            <button className="p-2 hover:bg-muted rounded-full transition-colors">
              <Video className="w-5 h-5 text-muted-foreground" />
            </button>
            <button className="p-2 hover:bg-muted rounded-full transition-colors">
              <MoreVertical className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </div>
      </header>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 bg-gradient-to-b from-white to-muted/20">
        <div className="max-w-2xl mx-auto space-y-4">
          <AnimatePresence mode="popLayout">
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                className={`flex items-end gap-2 ${
                  message.sender === "owner" ? "justify-end" : "justify-start"
                }`}
              >
                {message.sender === "engineer" && (
                  <div className="w-8 h-8 rounded-full bg-moorgen-black flex items-center justify-center text-white text-xs font-medium flex-shrink-0">
                    W
                  </div>
                )}
                
                <div
                  className={`max-w-[75%] px-4 py-3 ${
                    message.sender === "engineer"
                      ? "bg-moorgen-black text-white rounded-2xl rounded-bl-md"
                      : "bg-white border-2 border-champagne-gold/40 text-foreground rounded-2xl rounded-br-md shadow-sm"
                  }`}
                >
                  <p className="text-sm font-body leading-relaxed">{message.text}</p>
                  <div className={`flex items-center gap-1 mt-1.5 ${
                    message.sender === "owner" ? "justify-end" : ""
                  }`}>
                    <span className={`text-[10px] ${
                      message.sender === "engineer" ? "text-white/60" : "text-muted-foreground"
                    }`}>
                      {message.timestamp}
                    </span>
                    {message.sender === "owner" && message.status && (
                      <span className="text-champagne-gold">
                        {message.status === "read" ? (
                          <CheckCheck className="w-3.5 h-3.5" />
                        ) : (
                          <Check className="w-3.5 h-3.5" />
                        )}
                      </span>
                    )}
                  </div>
                </div>

                {message.sender === "owner" && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-champagne-gold to-champagne-gold/80 flex items-center justify-center text-white text-xs font-medium flex-shrink-0">
                    A
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Quick Responses & Input */}
      <div className="bg-white border-t border-border px-4 py-3 sticky bottom-0">
        <div className="max-w-2xl mx-auto space-y-3">
          {/* Quick Response Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {quickResponses.map((response) => (
              <motion.button
                key={response}
                onClick={() => sendMessage(response)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-shrink-0 px-4 py-2 bg-champagne-gold/10 hover:bg-champagne-gold/20 text-champagne-gold border border-champagne-gold/30 rounded-full text-xs font-medium transition-colors"
              >
                {response}
              </motion.button>
            ))}
          </div>

          {/* Input Bar */}
          <div className="flex items-center gap-2">
            <button className="p-2.5 hover:bg-muted rounded-full transition-colors">
              <Paperclip className="w-5 h-5 text-muted-foreground" />
            </button>
            <Input
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type a message..."
              className="flex-1 bg-muted/50 border-0 rounded-full text-sm h-11 px-4 font-body"
            />
            <motion.button
              onClick={handleSend}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={!chatInput.trim()}
              className="p-2.5 bg-champagne-gold text-white rounded-full hover:bg-champagne-gold/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EngineerChat;
