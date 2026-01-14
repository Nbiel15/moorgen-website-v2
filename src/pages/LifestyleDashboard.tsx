import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { 
  LogOut, 
  LayoutDashboard, 
  Sliders, 
  Image, 
  MessageCircle,
  User,
  Heart,
  UtensilsCrossed,
  Film,
  DoorOpen,
  Thermometer,
  Lock,
  Menu,
  X
} from "lucide-react";

const LifestyleDashboard = () => {
  const navigate = useNavigate();
  const [activeScene, setActiveScene] = useState<string | null>(null);
  const [brightness, setBrightness] = useState([75]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    navigate("/");
  };

  const navLinks = [
    { icon: LayoutDashboard, label: "Dashboard", active: true },
    { icon: Sliders, label: "Controls", active: false },
    { icon: Image, label: "Gallery", active: false },
    { icon: MessageCircle, label: "Concierge", active: false },
  ];

  const sceneButtons = [
    { id: "romantic", label: "Romantic", icon: Heart },
    { id: "dining", label: "Dining", icon: UtensilsCrossed },
    { id: "movie", label: "Movie", icon: Film },
    { id: "welcome", label: "Welcome", icon: DoorOpen },
  ];

  return (
    <div className="min-h-screen bg-background animate-fade-in">
      {/* Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-moorgen-border/50 bg-background/95 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 border border-primary/30 rotate-45 flex items-center justify-center">
              <span className="font-heading text-sm text-primary -rotate-45">M</span>
            </div>
            <span className="font-heading text-lg tracking-[0.2em] uppercase font-light hidden sm:block">
              Moorgen
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                className={`flex items-center gap-2 font-body text-xs tracking-wider uppercase transition-colors duration-300 ${
                  link.active 
                    ? "text-primary" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <link.icon className="w-4 h-4" />
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            <button className="w-9 h-9 rounded-full border border-moorgen-border/50 flex items-center justify-center hover:border-primary/30 transition-colors duration-300">
              <User className="w-4 h-4 text-muted-foreground" />
            </button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="hidden sm:flex text-muted-foreground hover:text-foreground font-body text-xs tracking-wide uppercase"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
            
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-9 h-9 flex items-center justify-center"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-foreground" />
              ) : (
                <Menu className="w-5 h-5 text-foreground" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-moorgen-border/50 bg-background animate-fade-in">
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  className={`flex items-center gap-3 font-body text-sm tracking-wider uppercase transition-colors duration-300 ${
                    link.active 
                      ? "text-primary" 
                      : "text-muted-foreground"
                  }`}
                >
                  <link.icon className="w-4 h-4" />
                  {link.label}
                </button>
              ))}
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 font-body text-sm tracking-wider uppercase text-muted-foreground"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative h-[50vh] sm:h-[60vh] overflow-hidden">
          {/* Image Placeholder */}
          <div className="absolute inset-0 bg-gradient-to-br from-moorgen-cream via-moorgen-warm to-moorgen-cream">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtOS45NDEgMC0xOCA4LjA1OS0xOCAxOHM4LjA1OSAxOCAxOCAxOCAxOC04LjA1OSAxOC0xOC04LjA1OS0xOC0xOC0xOHptMCAzMmMtNy43MzIgMC0xNC02LjI2OC0xNC0xNHM2LjI2OC0xNCAxNC0xNCAxNCA2LjI2OCAxNCAxNC02LjI2OCAxNC0xNCAxNHoiIGZpbGw9IiNEMUQ1REIiIGZpbGwtb3BhY2l0eT0iLjEiLz48L2c+PC9zdmc+')] opacity-30" />
          </div>
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          
          {/* Text Overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-light text-foreground mb-4 animate-fade-in">
              Welcome Home, Mr. Adrian
            </h1>
            <p className="font-body text-sm sm:text-base text-muted-foreground tracking-[0.3em] uppercase">
              The Uluwatu Cliff Estate Project
            </p>
          </div>
        </section>

        {/* Dashboard Content */}
        <div className="container mx-auto px-4 sm:px-6 py-12 space-y-12">
          {/* Smart Control Center */}
          <section className="bg-card border border-moorgen-border/50 rounded-sm p-6 sm:p-8 shadow-soft">
            <h2 className="font-heading text-2xl font-light text-foreground mb-8">
              Ambiance Control
            </h2>

            {/* Scene Buttons */}
            <div className="mb-10">
              <p className="font-body text-xs text-muted-foreground tracking-wider uppercase mb-4">
                Select Scene
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {sceneButtons.map((scene) => (
                  <button
                    key={scene.id}
                    onClick={() => setActiveScene(scene.id === activeScene ? null : scene.id)}
                    className={`group p-4 sm:p-6 border rounded-sm transition-all duration-300 flex flex-col items-center gap-3 ${
                      activeScene === scene.id
                        ? "border-primary bg-primary/5"
                        : "border-moorgen-border/50 hover:border-primary/30"
                    }`}
                  >
                    <scene.icon 
                      className={`w-5 h-5 sm:w-6 sm:h-6 transition-colors duration-300 ${
                        activeScene === scene.id 
                          ? "text-primary" 
                          : "text-muted-foreground group-hover:text-primary"
                      }`} 
                    />
                    <span className={`font-body text-xs tracking-wider uppercase transition-colors duration-300 ${
                      activeScene === scene.id 
                        ? "text-primary" 
                        : "text-muted-foreground group-hover:text-foreground"
                    }`}>
                      {scene.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Lighting Slider */}
            <div className="mb-10">
              <div className="flex items-center justify-between mb-4">
                <p className="font-body text-xs text-muted-foreground tracking-wider uppercase">
                  Main Chandelier Brightness
                </p>
                <span className="font-body text-sm text-primary">{brightness[0]}%</span>
              </div>
              <Slider
                value={brightness}
                onValueChange={setBrightness}
                max={100}
                step={1}
                className="w-full"
              />
            </div>

            {/* Status Icons */}
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-3 px-4 py-2 border border-moorgen-border/50 rounded-sm">
                <Thermometer className="w-4 h-4 text-primary" />
                <span className="font-body text-xs tracking-wide text-muted-foreground">
                  Air Con: <span className="text-foreground">22°C</span>
                </span>
              </div>
              <div className="flex items-center gap-3 px-4 py-2 border border-moorgen-border/50 rounded-sm">
                <Lock className="w-4 h-4 text-primary" />
                <span className="font-body text-xs tracking-wide text-muted-foreground">
                  Front Door: <span className="text-foreground">Secured</span>
                </span>
              </div>
            </div>
          </section>

          {/* Project Progress */}
          <section className="bg-card border border-moorgen-border/50 rounded-sm p-6 sm:p-8 shadow-soft">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
              <h2 className="font-heading text-2xl font-light text-foreground">
                The Journey
              </h2>
              <div className="flex items-center gap-3">
                <span className="font-body text-xs text-muted-foreground tracking-wider uppercase">
                  Progress
                </span>
                <span className="font-heading text-lg text-primary">85%</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-10">
              <div className="h-1 bg-moorgen-border/30 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full transition-all duration-1000"
                  style={{ width: "85%" }}
                />
              </div>
            </div>

            {/* Latest Updates */}
            <div>
              <p className="font-body text-xs text-muted-foreground tracking-wider uppercase mb-6">
                Latest Updates
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { title: "System Integration Phase", date: "December 2024" },
                  { title: "Panel Installation", date: "January 2025" },
                ].map((update, index) => (
                  <div
                    key={index}
                    className="group overflow-hidden border border-moorgen-border/50 rounded-sm"
                  >
                    {/* Image Placeholder */}
                    <div className="aspect-video bg-gradient-to-br from-moorgen-warm to-moorgen-cream relative overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Image className="w-8 h-8 text-moorgen-border/50" />
                      </div>
                      <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-300" />
                    </div>
                    <div className="p-4">
                      <h3 className="font-heading text-lg font-light text-foreground mb-1">
                        {update.title}
                      </h3>
                      <p className="font-body text-xs text-muted-foreground tracking-wide">
                        {update.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Floating Concierge Button */}
      <button className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
        <MessageCircle className="w-5 h-5" />
        <span className="font-body text-xs tracking-wider uppercase">Concierge</span>
      </button>
    </div>
  );
};

export default LifestyleDashboard;
