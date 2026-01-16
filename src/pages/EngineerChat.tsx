import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Send, Paperclip, Phone, Video, MoreVertical, Check, CheckCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";

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
    // Small delay to ensure DOM is updated
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  // Only scroll on new messages, not on initial load
  const isInitialMount = useRef(true);
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
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
    <div className="h-[100svh] flex flex-col bg-background overflow-hidden">
      {/* Context Bar */}
      <div className="flex-shrink-0 bg-champagne-gold/10 border-b border-champagne-gold/20 px-3 sm:px-4 py-2">
        <p className="text-center text-[11px] sm:text-xs font-body text-champagne-gold">
          Currently discussing: <span className="font-semibold">Device Installation Phase</span>
        </p>
      </div>

      {/* Header */}
      <header className="flex-shrink-0 bg-background border-b border-border px-3 sm:px-4 py-2.5 sm:py-3">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          <div className="flex items-center gap-2 sm:gap-3">
            <motion.button
              onClick={() => navigate(-1)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-1.5 sm:p-2 hover:bg-muted rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </motion.button>
            
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="relative flex-shrink-0">
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-foreground flex items-center justify-center text-background font-heading font-semibold text-base sm:text-lg">
                  W
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 sm:w-3.5 sm:h-3.5 bg-green-500 rounded-full border-2 border-background" />
              </div>
              <div className="min-w-0">
                <h1 className="font-heading font-semibold text-foreground text-sm sm:text-base truncate">
                  Wayan Sudarta
                </h1>
                <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap">
                  <span className="text-[10px] sm:text-xs text-muted-foreground">Lead Systems Engineer</span>
                  <span className="text-[10px] sm:text-xs text-muted-foreground hidden xs:inline">•</span>
                  <span className="text-[10px] sm:text-xs text-green-600 font-medium">Live on Site</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-0.5 sm:gap-1 flex-shrink-0">
            <button className="p-1.5 sm:p-2 hover:bg-muted rounded-full transition-colors">
              <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
            </button>
            <button className="p-1.5 sm:p-2 hover:bg-muted rounded-full transition-colors hidden sm:flex">
              <Video className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
            </button>
            <button className="p-1.5 sm:p-2 hover:bg-muted rounded-full transition-colors">
              <MoreVertical className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
            </button>
          </div>
        </div>
      </header>

      {/* Chat Messages */}
      <div className="flex-1 min-h-0 overflow-y-auto px-3 sm:px-4 py-4 sm:py-6 bg-gradient-to-b from-background to-muted/10">
        <div className="max-w-2xl mx-auto w-full space-y-3 sm:space-y-4">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -1 }}
              className={`flex items-end gap-1.5 sm:gap-2 ${
                message.sender === "owner" ? "justify-end" : "justify-start"
              }`}
            >
              {message.sender === "engineer" && (
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-foreground flex items-center justify-center text-background text-[10px] sm:text-xs font-medium flex-shrink-0">
                  W
                </div>
              )}

              <div
                className={`max-w-[80%] sm:max-w-[75%] px-3 sm:px-4 py-2 sm:py-3 shadow-sm ${
                  message.sender === "engineer"
                    ? "bg-foreground text-background rounded-2xl rounded-bl-md"
                    : "bg-background border-2 border-champagne-gold/40 text-foreground rounded-2xl rounded-br-md"
                }`}
              >
                <p className="text-[13px] sm:text-sm font-body leading-relaxed">
                  {message.text}
                </p>
                <div
                  className={`flex items-center gap-1 mt-1 sm:mt-1.5 ${
                    message.sender === "owner" ? "justify-end" : ""
                  }`}
                >
                  <span
                    className={`text-[9px] sm:text-[10px] ${
                      message.sender === "engineer"
                        ? "text-background/65"
                        : "text-muted-foreground"
                    }`}
                  >
                    {message.timestamp}
                  </span>
                  {message.sender === "owner" && message.status && (
                    <span className="text-champagne-gold">
                      {message.status === "read" ? (
                        <CheckCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      ) : (
                        <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      )}
                    </span>
                  )}
                </div>
              </div>

              {message.sender === "owner" && (
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-champagne-gold to-champagne-gold/80 flex items-center justify-center text-background text-[10px] sm:text-xs font-medium flex-shrink-0">
                  A
                </div>
              )}
            </motion.div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Quick Responses & Input */}
      <div className="flex-shrink-0 bg-background border-t border-border px-3 sm:px-4 py-2.5 sm:py-3 pb-safe">
        <div className="max-w-2xl mx-auto space-y-2 sm:space-y-3">
          {/* Quick Response Pills */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 scrollbar-hide -mx-1 px-1">
            {quickResponses.map((response) => (
              <motion.button
                key={response}
                onClick={() => sendMessage(response)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-shrink-0 px-3 sm:px-4 py-1.5 sm:py-2 bg-champagne-gold/10 hover:bg-champagne-gold/20 text-champagne-gold border border-champagne-gold/30 rounded-full text-[11px] sm:text-xs font-medium transition-colors whitespace-nowrap"
              >
                {response}
              </motion.button>
            ))}
          </div>

          {/* Input Bar */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button className="p-2 sm:p-2.5 hover:bg-muted rounded-full transition-colors flex-shrink-0">
              <Paperclip className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
            </button>
            <Input
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type a message..."
              className="flex-1 bg-muted/50 border-0 rounded-full text-sm h-9 sm:h-11 px-3 sm:px-4 font-body"
            />
            <motion.button
              onClick={handleSend}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={!chatInput.trim()}
              className="p-2 sm:p-2.5 bg-champagne-gold text-background rounded-full hover:bg-champagne-gold/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
            >
              <Send className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EngineerChat;
