import { Sun, Cloud, Wifi, MessageCircle, Droplets, Wind, ArrowRight, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const RightPanel = () => {
  const recentUpdates = [
    { id: 1, message: "Wiring phase started", time: "2h ago", isNew: true },
    { id: 2, message: "Site survey completed", time: "1d ago", isNew: false },
    { id: 3, message: "Permits approved", time: "3d ago", isNew: false },
  ];
  return <>
      {/* Spacer to maintain layout flow */}
      <div className="hidden xl:block w-72 flex-shrink-0" />
      
      {/* Fixed Right Sidebar */}
      <aside className="hidden xl:flex flex-col w-72 fixed right-0 top-0 h-screen bg-[#FAFAFA]/80 backdrop-blur-sm border-l border-[#E5E5E5]/50 p-6 pt-24 gap-5 overflow-y-auto z-50 justify-center">
      {/* System Health Widget */}
      <div className="bg-white rounded-3xl p-5 border border-[#E5E5E5] shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
        <h3 className="font-serif text-lg text-charcoal mb-4">System Health</h3>
        <div className="flex items-center gap-3 mb-4">
          <div className="relative">
            <div className="w-3 h-3 bg-green-500 rounded-full" />
            <div className="absolute inset-0 w-3 h-3 bg-green-500 rounded-full animate-ping opacity-50" />
          </div>
          <div className="flex items-center gap-2">
            <Wifi className="w-4 h-4 text-green-500" />
            <span className="text-sm text-charcoal/70">All Systems Online</span>
          </div>
        </div>

        {/* Connection Stats */}
        <div className="grid grid-cols-2 gap-3 mb-4 pt-3 border-t border-[#E5E5E5]">
          <div className="text-center p-3 bg-charcoal/5 rounded-xl">
            <p className="text-lg font-semibold text-charcoal">24</p>
            <p className="text-[10px] text-charcoal/50 uppercase tracking-wider">Devices</p>
          </div>
          <div className="text-center p-3 bg-charcoal/5 rounded-xl">
            <p className="text-lg font-semibold text-green-600">100%</p>
            <p className="text-[10px] text-charcoal/50 uppercase tracking-wider">Uptime</p>
          </div>
        </div>

        <button className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-full border border-champagne-gold/30 text-champagne-gold text-sm font-medium hover:bg-champagne-gold/5 transition-colors">
          <MessageCircle className="w-4 h-4" />
          Contact Support
        </button>
      </div>

      {/* Bali Weather (Uluwatu) */}
      <div className="bg-gradient-to-br from-sky-50 to-blue-50 rounded-3xl p-5 border border-sky-100">
        <h3 className="font-serif text-lg text-charcoal mb-4">Bali Weather</h3>
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs text-charcoal/50 mb-1">Uluwatu</p>
            <p className="font-serif text-3xl text-charcoal">29°C</p>
            <p className="text-xs text-charcoal/50 mt-1">Partly Cloudy</p>
          </div>
          <div className="relative">
            <Sun className="w-12 h-12 text-amber-400" />
            <Cloud className="w-7 h-7 text-sky-300 absolute -bottom-1 -right-1" />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 pt-4 border-t border-sky-200/50">
          <div className="text-center">
            <Droplets className="w-4 h-4 text-sky-400 mx-auto mb-1" />
            <p className="text-sm font-medium text-charcoal">68%</p>
            <p className="text-[10px] text-charcoal/40">Humidity</p>
          </div>
          <div className="text-center">
            <Sun className="w-4 h-4 text-amber-500 mx-auto mb-1" />
            <p className="text-sm font-medium text-charcoal">High</p>
            <p className="text-[10px] text-charcoal/40">UV Index</p>
          </div>
          <div className="text-center">
            <Wind className="w-4 h-4 text-sky-400 mx-auto mb-1" />
            <p className="text-sm font-medium text-charcoal">12 km/h</p>
            <p className="text-[10px] text-charcoal/40">Wind</p>
          </div>
        </div>
      </div>

      {/* Quick Progress Updates */}
      <Link to="/progress" className="block">
        <div className="bg-white rounded-3xl p-5 border border-[#E5E5E5] shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:border-champagne-gold/40 hover:shadow-md transition-all duration-200 group">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-serif text-lg text-charcoal">Progress Updates</h3>
            <ArrowRight className="w-4 h-4 text-charcoal/30 group-hover:text-champagne-gold group-hover:translate-x-1 transition-all duration-200" />
          </div>
          
          <div className="space-y-3">
            {recentUpdates.map((update) => (
              <div key={update.id} className="flex items-start gap-3 p-2 rounded-xl hover:bg-charcoal/5 transition-colors">
                <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${update.isNew ? 'bg-champagne-gold' : 'bg-charcoal/20'}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-charcoal truncate">{update.message}</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Clock className="w-3 h-3 text-charcoal/40" />
                    <p className="text-[10px] text-charcoal/40">{update.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 pt-3 border-t border-[#E5E5E5]">
            <p className="text-xs text-champagne-gold font-medium group-hover:underline">View full timeline →</p>
          </div>
        </div>
      </Link>

      {/* Date Display */}
      <div className="text-center mt-auto pt-4">
        <p className="text-xs text-charcoal/40">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
          })}
        </p>
      </div>
      </aside>
    </>;
};
export default RightPanel;