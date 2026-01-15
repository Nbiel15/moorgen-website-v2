import { Sun, Cloud, Wifi, MessageCircle, Droplets, Wind, ArrowRight, Clock, CloudRain, CloudSnow, CloudLightning, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useWeather } from "@/hooks/use-weather";
const RightPanel = () => {
  const {
    weather,
    loading,
    error,
    getWeatherDescription,
    getUVDescription
  } = useWeather();
  const recentUpdates = [{
    id: 1,
    message: "Wiring phase started",
    time: "2h ago",
    isNew: true
  }, {
    id: 2,
    message: "Site survey completed",
    time: "1d ago",
    isNew: false
  }, {
    id: 3,
    message: "Permits approved",
    time: "3d ago",
    isNew: false
  }];
  const getWeatherIcon = (code: number, isDay: boolean) => {
    if (code === 0) return <Sun className="w-12 h-12 text-amber-400" />;
    if (code <= 3) return <div className="relative">
        <Sun className="w-12 h-12 text-amber-400" />
        <Cloud className="w-7 h-7 text-sky-300 absolute -bottom-1 -right-1" />
      </div>;
    if (code <= 48) return <Cloud className="w-12 h-12 text-gray-400" />;
    if (code <= 67 || code >= 80 && code <= 82) return <CloudRain className="w-12 h-12 text-sky-500" />;
    if (code <= 77 || code >= 85 && code <= 86) return <CloudSnow className="w-12 h-12 text-sky-300" />;
    if (code >= 95) return <CloudLightning className="w-12 h-12 text-yellow-500" />;
    return <Cloud className="w-12 h-12 text-gray-400" />;
  };
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

      {/* Bali Weather (Uluwatu) - Live */}
      <div className="bg-gradient-to-br from-sky-50 to-blue-50 rounded-3xl p-5 border border-sky-100">
        <h3 className="font-serif text-lg text-charcoal mb-4">Bali Weather</h3>
        
        {loading ? <div className="flex items-center justify-center py-8">
            <Loader2 className="w-8 h-8 text-sky-400 animate-spin" />
          </div> : error ? <div className="text-center py-4">
            <p className="text-sm text-charcoal/50">Unable to load weather</p>
          </div> : weather ? <>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-xs text-charcoal/50 mb-1">Uluwatu</p>
                <p className="font-serif text-3xl text-charcoal">{weather.temperature}°C</p>
                <p className="text-xs text-charcoal/50 mt-1">{getWeatherDescription(weather.weatherCode)}</p>
              </div>
              {getWeatherIcon(weather.weatherCode, weather.isDay)}
            </div>

            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-sky-200/50">
              <div className="text-center">
                <Droplets className="w-4 h-4 text-sky-400 mx-auto mb-1" />
                <p className="text-sm font-medium text-charcoal">{weather.humidity}%</p>
                <p className="text-[10px] text-charcoal/40">Humidity</p>
              </div>
              <div className="text-center">
                <Sun className="w-4 h-4 text-amber-500 mx-auto mb-1" />
                <p className="text-sm font-medium text-charcoal">{getUVDescription(weather.uvIndex)}</p>
                <p className="text-[10px] text-charcoal/40">UV Index</p>
              </div>
              <div className="text-center">
                <Wind className="w-4 h-4 text-sky-400 mx-auto mb-1" />
                <p className="text-sm font-medium text-charcoal">{weather.windSpeed} km/h</p>
                <p className="text-[10px] text-charcoal/40">Wind</p>
              </div>
            </div>
          </> : null}
      </div>

      {/* Quick Progress Updates */}
      <Link to="/progress" className="block">
        
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