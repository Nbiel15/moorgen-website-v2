import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";

const ProjectJourney = () => {
  return (
    <DashboardLayout>
      {/* Header */}
      <header className="bg-card border-b border-border px-4 md:px-8 py-6">
        <div className="max-w-6xl mx-auto">
          <Link
            to="/lifestyle-dashboard"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-body tracking-wide">Back to Dashboard</span>
          </Link>
          <h1 className="font-heading text-2xl md:text-3xl text-foreground">Detailed Project Journey</h1>
          <p className="text-muted-foreground mt-2 font-body">
            Track every milestone, photo update, and progress report.
          </p>
        </div>
      </header>

      {/* Content Placeholder */}
      <main className="max-w-6xl mx-auto px-4 md:px-8 py-12">
        <div className="bg-card rounded-3xl p-12 border border-border shadow-[0_4px_20px_rgba(0,0,0,0.03)] text-center">
          <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-6">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <div className="w-4 h-4 rounded-full bg-primary" />
            </div>
          </div>
          <h2 className="font-heading text-2xl text-foreground mb-3">Coming Soon</h2>
          <p className="text-muted-foreground max-w-md mx-auto font-body">
            A comprehensive timeline view with detailed progress photos, contractor notes, 
            and milestone documentation will be available here.
          </p>
          <Link
            to="/lifestyle-dashboard"
            className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-foreground text-background rounded-full hover:bg-foreground/90 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium font-body">Return to Dashboard</span>
          </Link>
        </div>
      </main>
    </DashboardLayout>
  );
};

export default ProjectJourney;