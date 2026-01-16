import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Send, Phone, Video, MoreVertical, Check, CheckCheck, User, Wrench } from "lucide-react";
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
  ],
  engineer: [
    "Please proceed",
    "I'll review and confirm",
    "Let's discuss this tomorrow",
  ],
};

const ArchitectMessages = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<ChatTab>("owner");
  const [ownerMessages, setOwnerMessages] = useState<Message[]>(initialOwnerMessages);
  const [engineerMessages, setEngineerMessages] = useState<Message[]>(initialEngineerMessages);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

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

    // Simulate delivery status
    setTimeout(() => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === message.id ? { ...msg, status: "delivered" } : msg
        )
      );
    }, 1000);
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
      return <CheckCheck className="w-3.5 h-3.5 text-muted-foreground" />;
    }
    return <Check className="w-3.5 h-3.5 text-muted-foreground" />;
  };

  const tabConfig = {
    owner: {
      label: "Owner",
      icon: User,
      name: "Mr. Johnson",
      subtitle: "Property Owner",
    },
    engineer: {
      label: "Engineer",
      icon: Wrench,
      name: "David Chen",
      subtitle: "Field Engineer",
    },
  };

  const currentChat = tabConfig[activeTab];

  return (
    <ArchitectLayout>
      <div className="flex flex-col h-[100dvh] lg:h-screen bg-background">
        {/* Header */}
        <div className="relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-accent/5" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-champagne-gold/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

          <div className="relative px-4 md:px-8 py-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Back Button & Title */}
              <div className="flex items-center gap-4 mb-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => navigate("/architect-dashboard")}
                  className="rounded-full hover:bg-accent/10"
                >
                  <ArrowLeft className="w-5 h-5" />
                </Button>
                <div>
                  <h1 className="text-2xl md:text-3xl font-heading font-bold tracking-tight">
                    Messages
                  </h1>
                  <p className="text-muted-foreground font-body text-sm">
                    Communicate with your team and clients
                  </p>
                </div>
              </div>

              {/* Chat Tabs */}
              <div className="flex gap-2 mt-4">
                {(["owner", "engineer"] as ChatTab[]).map((tab) => {
                  const config = tabConfig[tab];
                  const isActive = activeTab === tab;
                  return (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={cn(
                        "flex items-center gap-2 px-4 py-2.5 rounded-xl font-body text-sm transition-all duration-300",
                        isActive
                          ? "bg-champagne-gold text-champagne-gold-foreground shadow-lg shadow-champagne-gold/20"
                          : "bg-card hover:bg-accent/10 text-muted-foreground"
                      )}
                    >
                      <config.icon className="w-4 h-4" />
                      {config.label}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Chat Partner Info */}
        <div className="px-4 md:px-8 py-3 border-b border-border bg-card/50 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-champagne-gold/20 to-champagne-gold/40 flex items-center justify-center">
                <currentChat.icon className="w-5 h-5 text-champagne-gold" />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-sm">{currentChat.name}</h3>
                <p className="text-xs text-muted-foreground">{currentChat.subtitle}</p>
              </div>
              <span className="w-2 h-2 rounded-full bg-green-500 ml-1" />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-accent/10">
                <Phone className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-accent/10">
                <Video className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-accent/10">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto px-4 md:px-8 py-4 space-y-4">
          <AnimatePresence mode="popLayout">
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                className={cn(
                  "flex",
                  message.sender === "architect" ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[80%] md:max-w-[60%] rounded-2xl px-4 py-3",
                    message.sender === "architect"
                      ? "bg-champagne-gold text-champagne-gold-foreground rounded-br-md"
                      : "bg-card border border-border rounded-bl-md"
                  )}
                >
                  <p className="font-body text-sm leading-relaxed">{message.text}</p>
                  <div
                    className={cn(
                      "flex items-center gap-1.5 mt-1.5",
                      message.sender === "architect" ? "justify-end" : "justify-start"
                    )}
                  >
                    <span
                      className={cn(
                        "text-[10px]",
                        message.sender === "architect"
                          ? "text-champagne-gold-foreground/70"
                          : "text-muted-foreground"
                      )}
                    >
                      {message.timestamp}
                    </span>
                    {message.sender === "architect" && getStatusIcon(message.status)}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Responses */}
        <div className="px-4 md:px-8 py-2 flex gap-2 overflow-x-auto scrollbar-hide">
          {quickResponses[activeTab].map((response, index) => (
            <button
              key={index}
              onClick={() => sendMessage(response)}
              className="flex-shrink-0 px-3 py-1.5 rounded-full bg-card border border-border text-xs font-body text-muted-foreground hover:bg-accent/10 hover:border-champagne-gold/30 transition-all duration-200"
            >
              {response}
            </button>
          ))}
        </div>

        {/* Input Area */}
        <div className="px-4 md:px-8 py-4 border-t border-border bg-card/50 backdrop-blur-sm mb-20 lg:mb-0">
          <div className="flex items-center gap-3">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={`Message ${currentChat.name}...`}
              className="flex-1 rounded-xl bg-background border-border font-body"
            />
            <Button
              onClick={handleSend}
              disabled={!newMessage.trim()}
              className="rounded-xl bg-champagne-gold hover:bg-champagne-gold/90 text-champagne-gold-foreground px-4"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </ArchitectLayout>
  );
};

export default ArchitectMessages;
