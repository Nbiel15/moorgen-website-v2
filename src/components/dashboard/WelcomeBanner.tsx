const WelcomeBanner = () => {
  return (
    <div className="relative h-48 md:h-56 rounded-3xl overflow-hidden bg-gradient-to-br from-charcoal via-charcoal/90 to-charcoal/80">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 right-0 w-64 h-64 bg-champagne-gold/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-48 h-48 bg-champagne-gold/20 rounded-full blur-2xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-12">
        <p className="text-champagne-gold text-sm tracking-widest uppercase mb-2">
          The Uluwatu Cliff Estate
        </p>
        <h1 className="font-serif text-3xl md:text-4xl text-white mb-2">
          Welcome back, Mr. Adrian
        </h1>
        <p className="text-white/60 text-sm max-w-md">
          Your private sanctuary awaits. All systems are operating smoothly.
        </p>
      </div>

      {/* Decorative Element */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden md:block">
        <div className="w-24 h-24 border border-champagne-gold/30 rounded-full flex items-center justify-center">
          <div className="w-16 h-16 border border-champagne-gold/50 rounded-full flex items-center justify-center">
            <div className="w-8 h-8 bg-champagne-gold/20 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeBanner;
