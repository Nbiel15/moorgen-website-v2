import { Sun, Cloud, Wifi, MessageCircle, FileText, Droplets, Wind } from "lucide-react";

const RightPanel = () => {
  return (
    <aside className="hidden xl:flex flex-col w-72 bg-white border-l border-[#E5E5E5] p-6 gap-5 overflow-y-auto">
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

      {/* Project Documents */}
      <div className="bg-white rounded-3xl p-5 border border-[#E5E5E5] shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
        <h3 className="font-serif text-lg text-charcoal mb-4">Project Documents</h3>
        <div className="space-y-2">
          <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-charcoal/5 transition-colors text-left group">
            <div className="w-10 h-10 rounded-xl bg-champagne-gold/10 flex items-center justify-center group-hover:bg-champagne-gold/20 transition-colors">
              <FileText className="w-5 h-5 text-champagne-gold" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-charcoal truncate">Warranty.pdf</p>
              <p className="text-xs text-charcoal/50">5-year coverage</p>
            </div>
          </button>
          <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-charcoal/5 transition-colors text-left group">
            <div className="w-10 h-10 rounded-xl bg-champagne-gold/10 flex items-center justify-center group-hover:bg-champagne-gold/20 transition-colors">
              <FileText className="w-5 h-5 text-champagne-gold" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-charcoal truncate">Villa_Manual.pdf</p>
              <p className="text-xs text-charcoal/50">User guide</p>
            </div>
          </button>
          <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-charcoal/5 transition-colors text-left group">
            <div className="w-10 h-10 rounded-xl bg-champagne-gold/10 flex items-center justify-center group-hover:bg-champagne-gold/20 transition-colors">
              <FileText className="w-5 h-5 text-champagne-gold" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-charcoal truncate">Floor_Plan.pdf</p>
              <p className="text-xs text-charcoal/50">Smart zones layout</p>
            </div>
          </button>
        </div>
      </div>

      {/* Date Display */}
      <div className="text-center mt-auto pt-4">
        <p className="text-xs text-charcoal/40">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>
    </aside>
  );
};

export default RightPanel;
