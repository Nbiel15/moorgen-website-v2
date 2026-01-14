import MoorgenLogo from "@/components/MoorgenLogo";
import LoginForm from "@/components/LoginForm";

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md animate-fade-in">
        {/* Login Card */}
        <div className="bg-card p-8 sm:p-12 rounded-sm shadow-sm border border-moorgen-border/50">
          {/* Logo */}
          <div className="flex justify-center mb-12">
            <MoorgenLogo />
          </div>

          {/* Welcome Text */}
          <div className="text-center mb-10 space-y-3">
            <h1 className="font-heading text-2xl sm:text-3xl font-light text-foreground tracking-wide">
              Welcome to your Moorgen Space
            </h1>
            <p className="font-body text-sm text-muted-foreground tracking-wide leading-relaxed">
              Please enter your exclusive access credentials.
            </p>
          </div>

          {/* Login Form */}
          <LoginForm />
        </div>

        {/* Subtle footer */}
        <p className="text-center mt-8 text-xs text-muted-foreground/60 font-body tracking-[0.2em] uppercase">
          Moorgen Bali Ecosystem
        </p>
      </div>
    </div>
  );
};

export default Index;
