import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut, Settings, Cpu, Activity, Shield } from "lucide-react";

const TechnicalWorkspace = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background animate-fade-in">
      {/* Header */}
      <header className="border-b border-moorgen-border/50 bg-card">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 border border-primary/30 rotate-45 flex items-center justify-center">
              <span className="font-heading text-sm text-primary -rotate-45">M</span>
            </div>
            <span className="font-heading text-lg tracking-[0.2em] uppercase font-light">
              Moorgen
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="text-muted-foreground hover:text-foreground font-body text-xs tracking-wide uppercase"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-12">
            <h1 className="font-heading text-3xl sm:text-4xl font-light text-foreground mb-3">
              Technical Workspace
            </h1>
            <p className="font-body text-muted-foreground tracking-wide">
              Welcome back, Engineer. System operations at your fingertips.
            </p>
          </div>

          {/* System Overview Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                icon: Cpu,
                title: "System Status",
                description: "All systems operational",
                status: "Online",
              },
              {
                icon: Activity,
                title: "Performance",
                description: "Monitor infrastructure metrics",
                status: "98.5%",
              },
              {
                icon: Shield,
                title: "Security",
                description: "Access control & monitoring",
                status: "Secure",
              },
              {
                icon: Settings,
                title: "Configuration",
                description: "Manage system settings",
                status: "Ready",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="group p-6 bg-card border border-moorgen-border/50 rounded-sm hover:border-primary/30 transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <item.icon className="w-6 h-6 text-primary group-hover:scale-110 transition-transform duration-300" />
                  <span className="font-body text-xs tracking-wider uppercase text-primary bg-primary/10 px-2 py-1 rounded-sm">
                    {item.status}
                  </span>
                </div>
                <h3 className="font-heading text-xl font-light text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground tracking-wide">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default TechnicalWorkspace;
