import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const ProjectJourney = () => {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Header */}
      <header className="bg-white border-b border-[#E5E5E5] px-8 py-6">
        <div className="max-w-6xl mx-auto">
          <Link
            to="/lifestyle-dashboard"
            className="inline-flex items-center gap-2 text-charcoal/60 hover:text-charcoal transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm tracking-wide">Back to Dashboard</span>
          </Link>
          <h1 className="font-serif text-3xl text-charcoal">Detailed Project Journey</h1>
          <p className="text-charcoal/60 mt-2">
            Track every milestone, photo update, and progress report.
          </p>
        </div>
      </header>

      {/* Content Placeholder */}
      <main className="max-w-6xl mx-auto px-8 py-12">
        <div className="bg-white rounded-3xl p-12 border border-[#E5E5E5] shadow-[0_4px_20px_rgba(0,0,0,0.03)] text-center">
          <div className="w-20 h-20 mx-auto rounded-full bg-champagne-gold/10 flex items-center justify-center mb-6">
            <div className="w-10 h-10 rounded-full bg-champagne-gold/20 flex items-center justify-center">
              <div className="w-4 h-4 rounded-full bg-champagne-gold" />
            </div>
          </div>
          <h2 className="font-serif text-2xl text-charcoal mb-3">Coming Soon</h2>
          <p className="text-charcoal/60 max-w-md mx-auto">
            A comprehensive timeline view with detailed progress photos, contractor notes, 
            and milestone documentation will be available here.
          </p>
          <Link
            to="/lifestyle-dashboard"
            className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-charcoal text-white rounded-full hover:bg-charcoal/90 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Return to Dashboard</span>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default ProjectJourney;
