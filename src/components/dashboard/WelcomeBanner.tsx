import luxuryBg from "@/assets/luxury-living-room.jpg";

const WelcomeBanner = () => {
  return (
    <div className="relative h-48 md:h-56 rounded-2xl overflow-hidden">
      {/* Luxury Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${luxuryBg})` }}
      />
      
      {/* Dark Overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
      
      {/* Subtle gold accent overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-champagne/5 via-transparent to-champagne/10" />
      
      {/* Decorative gold corner accents */}
      <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-champagne/30 rounded-tl-2xl" />
      <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-champagne/30 rounded-br-2xl" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-12">
        <p className="text-champagne text-xs tracking-[0.3em] uppercase mb-3 font-body">
          The Uluwatu Cliff Estate
        </p>
        <h1 className="font-heading text-3xl md:text-4xl text-white mb-3 font-light tracking-wide">
          Welcome back, Mr. Adrian
        </h1>
        <div className="w-12 h-px bg-gradient-to-r from-champagne/60 to-transparent mb-3" />
        <p className="text-white/50 text-sm max-w-md font-body tracking-wide">
          Your private sanctuary awaits. All systems are operating smoothly.
        </p>
      </div>

      {/* Decorative circles */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden md:block opacity-40">
        <div className="w-28 h-28 border border-champagne/20 rounded-full flex items-center justify-center">
          <div className="w-20 h-20 border border-champagne/30 rounded-full flex items-center justify-center">
            <div className="w-10 h-10 bg-champagne/10 rounded-full backdrop-blur-sm" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeBanner;
