import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut, Home, Calendar, Utensils, Palmtree } from "lucide-react";

const LifestyleDashboard = () => {
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
              Lifestyle Dashboard
            </h1>
            <p className="font-body text-muted-foreground tracking-wide">
              Welcome back, Owner. Your personal Bali experience awaits.
            </p>
          </div>

          {/* Quick Actions Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                icon: Home,
                title: "Villa Status",
                description: "Your villa is ready and waiting",
              },
              {
                icon: Calendar,
                title: "Reservations",
                description: "Manage your upcoming stays",
              },
              {
                icon: Utensils,
                title: "Private Chef",
                description: "Book culinary experiences",
              },
              {
                icon: Palmtree,
                title: "Concierge",
                description: "Request exclusive services",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="group p-6 bg-card border border-moorgen-border/50 rounded-sm hover:border-primary/30 transition-all duration-300 cursor-pointer"
              >
                <item.icon className="w-6 h-6 text-primary mb-4 group-hover:scale-110 transition-transform duration-300" />
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

export default LifestyleDashboard;
