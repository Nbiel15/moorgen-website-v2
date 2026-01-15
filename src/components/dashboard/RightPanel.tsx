import { motion } from "framer-motion";
import { Sun, Cloud, Wifi, MessageCircle, Droplets, Wind, Clock, CloudRain, CloudSnow, CloudLightning, Loader2, Shield, Zap, Activity } from "lucide-react";
import { useWeather } from "@/hooks/use-weather";

const RightPanel = () => {
  const {
    weather,
    loading,
    error,
    getWeatherDescription,
    getUVDescription
  } = useWeather();

  const recentUpdates = [
    { id: 1, message: "Wiring phase started", time: "2h ago", isNew: true },
    { id: 2, message: "Site survey completed", time: "1d ago", isNew: false },
    { id: 3, message: "Permits approved", time: "3d ago", isNew: false },
  ];

  const getWeatherIcon = (code: number, isDay: boolean) => {
    if (code === 0) return <Sun className="w-10 h-10 text-amber-400" />;
    if (code <= 3) return (
      <div className="relative">
        <Sun className="w-10 h-10 text-amber-400" />
        <Cloud className="w-6 h-6 text-sky-300 absolute -bottom-1 -right-1" />
      </div>
    );
    if (code <= 48) return <Cloud className="w-10 h-10 text-gray-400" />;
    if (code <= 67 || (code >= 80 && code <= 82)) return <CloudRain className="w-10 h-10 text-sky-500" />;
    if (code <= 77 || (code >= 85 && code <= 86)) return <CloudSnow className="w-10 h-10 text-sky-300" />;
    if (code >= 95) return <CloudLightning className="w-10 h-10 text-yellow-500" />;
    return <Cloud className="w-10 h-10 text-gray-400" />;
  };

  return (
    <>
      {/* Spacer to maintain layout flow */}
      <div className="hidden xl:block w-72 flex-shrink-0" />
      
      {/* Fixed Right Sidebar */}
      <aside className="hidden xl:flex flex-col w-72 fixed right-0 top-0 h-screen bg-gradient-to-b from-background/95 to-background/80 backdrop-blur-xl border-l border-border/30 p-5 pt-24 gap-4 overflow-y-auto z-50 justify-start">
        
        {/* System Health Widget */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/90 backdrop-blur-md rounded-2xl p-4 border border-border/50 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-shadow duration-300"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-serif text-base text-charcoal">System Health</h3>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 bg-green-500 rounded-full"
            />
          </div>

          <div className="flex items-center gap-2 mb-4 p-2 bg-green-500/5 rounded-xl border border-green-500/10">
            <Shield className="w-4 h-4 text-green-500" />
            <span className="text-xs text-charcoal/70">All Systems Online</span>
          </div>

          {/* Connection Stats */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="text-center p-2 bg-charcoal/5 rounded-xl cursor-pointer hover:bg-champagne-gold/10 transition-colors"
            >
              <Zap className="w-3.5 h-3.5 text-champagne-gold mx-auto mb-1" />
              <p className="text-sm font-semibold text-charcoal">24</p>
              <p className="text-[9px] text-charcoal/50 uppercase tracking-wider">Devices</p>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="text-center p-2 bg-charcoal/5 rounded-xl cursor-pointer hover:bg-green-500/10 transition-colors"
            >
              <Activity className="w-3.5 h-3.5 text-green-500 mx-auto mb-1" />
              <p className="text-sm font-semibold text-green-600">100%</p>
              <p className="text-[9px] text-charcoal/50 uppercase tracking-wider">Uptime</p>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="text-center p-2 bg-charcoal/5 rounded-xl cursor-pointer hover:bg-sky-500/10 transition-colors"
            >
              <Wifi className="w-3.5 h-3.5 text-sky-500 mx-auto mb-1" />
              <p className="text-sm font-semibold text-charcoal">5G</p>
              <p className="text-[9px] text-charcoal/50 uppercase tracking-wider">Network</p>
            </motion.div>
          </div>

          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-gradient-to-r from-champagne-gold/10 to-champagne-gold/5 border border-champagne-gold/20 text-champagne-gold text-xs font-medium hover:from-champagne-gold/20 hover:to-champagne-gold/10 transition-all"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            Contact Support
          </motion.button>
        </motion.div>

        {/* Bali Weather Widget */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-sky-50/90 to-blue-50/90 backdrop-blur-md rounded-2xl p-4 border border-sky-100/50 shadow-[0_4px_20px_rgba(0,0,0,0.04)]"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-serif text-base text-charcoal">Bali Weather</h3>
            <span className="text-[9px] text-sky-500 uppercase tracking-wider font-medium">Live</span>
          </div>
          
          {loading ? (
            <div className="flex items-center justify-center py-6">
              <Loader2 className="w-6 h-6 text-sky-400 animate-spin" />
            </div>
          ) : error ? (
            <div className="text-center py-4">
              <Cloud className="w-8 h-8 text-gray-300 mx-auto mb-2" />
              <p className="text-xs text-charcoal/50">Unable to load weather</p>
            </div>
          ) : weather ? (
            <>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-[10px] text-charcoal/50 mb-0.5">Uluwatu</p>
                  <p className="font-serif text-2xl text-charcoal">{weather.temperature}°C</p>
                  <p className="text-[10px] text-charcoal/50 mt-0.5">{getWeatherDescription(weather.weatherCode)}</p>
                </div>
                <motion.div
                  animate={{ y: [-2, 2, -2] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  {getWeatherIcon(weather.weatherCode, weather.isDay)}
                </motion.div>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-3 border-t border-sky-200/50">
                <div className="text-center">
                  <Droplets className="w-3.5 h-3.5 text-sky-400 mx-auto mb-1" />
                  <p className="text-xs font-medium text-charcoal">{weather.humidity}%</p>
                  <p className="text-[9px] text-charcoal/40">Humidity</p>
                </div>
                <div className="text-center">
                  <Sun className="w-3.5 h-3.5 text-amber-500 mx-auto mb-1" />
                  <p className="text-xs font-medium text-charcoal">{getUVDescription(weather.uvIndex)}</p>
                  <p className="text-[9px] text-charcoal/40">UV Index</p>
                </div>
                <div className="text-center">
                  <Wind className="w-3.5 h-3.5 text-sky-400 mx-auto mb-1" />
                  <p className="text-xs font-medium text-charcoal">{weather.windSpeed}</p>
                  <p className="text-[9px] text-charcoal/40">km/h</p>
                </div>
              </div>
            </>
          ) : null}
        </motion.div>

        {/* Quick Stats */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/90 backdrop-blur-md rounded-2xl p-4 border border-border/50 shadow-[0_4px_20px_rgba(0,0,0,0.04)]"
        >
          <h3 className="font-serif text-base text-charcoal mb-3">Quick Stats</h3>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-charcoal/60">Energy Today</span>
              <span className="text-xs font-semibold text-charcoal">12.4 kWh</span>
            </div>
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "65%" }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"
              />
            </div>
            
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-charcoal/60">Savings This Month</span>
              <span className="text-xs font-semibold text-green-600">-18%</span>
            </div>
          </div>
        </motion.div>

        {/* Date Display */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-auto pt-4 text-center"
        >
          <div className="flex items-center justify-center gap-2 text-charcoal/40">
            <Clock className="w-3 h-3" />
            <p className="text-[10px]">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                month: "short",
                day: "numeric"
              })}
            </p>
          </div>
        </motion.div>
      </aside>
    </>
  );
};

export default RightPanel;
