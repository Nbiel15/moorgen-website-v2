import MoorgenLogo from "@/components/MoorgenLogo";
import LoginForm from "@/components/LoginForm";
import luxuryBg from "@/assets/luxury-living-room.jpg";

const Index = () => {
  return (
    <div className="min-h-screen relative flex items-center justify-center p-6 overflow-hidden">
      {/* Luxury Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${luxuryBg})` }}
      />
      
      {/* Dark Overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/80" />
      
      {/* Subtle animated grain texture */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')]" />

      <div className="relative z-10 w-full max-w-sm animate-fade-in">
        {/* Glass-morphism Login Card */}
        <div className="backdrop-blur-xl bg-white/10 p-6 sm:p-8 rounded-sm border border-white/20 shadow-2xl shadow-black/40">
          {/* Decorative corner accents */}
          <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-champagne/40 rounded-tl-sm" />
          <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-champagne/40 rounded-br-sm" />
          
          {/* Logo with glow effect */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 blur-2xl bg-champagne/20 scale-150" />
              <MoorgenLogo />
            </div>
          </div>

          {/* Welcome Text */}
          <div className="text-center mb-8 space-y-3">
            <h1 className="font-heading text-xl sm:text-2xl font-light text-white tracking-[0.1em]">
              Welcome to your Moorgen Space
            </h1>
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-champagne/60 to-transparent mx-auto" />
            <p className="font-body text-xs text-white/60 tracking-wide leading-relaxed">
              Please enter your exclusive access credentials
            </p>
          </div>

          {/* Login Form */}
          <LoginForm />
        </div>

        {/* Elegant footer */}
        <p className="text-center mt-10 text-xs text-white/40 font-body tracking-[0.25em] uppercase">
          Moorgen Bali Ecosystem
        </p>
      </div>
    </div>
  );
};

export default Index;
