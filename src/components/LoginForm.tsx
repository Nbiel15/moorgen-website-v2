import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulate API delay for premium feel
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock credentials for demo
    const MOCK_CREDENTIALS = {
      owner: { email: "owner@moorgen.bali", password: "password123" },
      partner: { email: "partner@moorgen.bali", password: "password123" },
    };

    // Check credentials and redirect accordingly
    if (email === MOCK_CREDENTIALS.owner.email && password === MOCK_CREDENTIALS.owner.password) {
      setIsFadingOut(true);
      setTimeout(() => {
        navigate("/lifestyle-dashboard");
      }, 500);
    } else if (email === MOCK_CREDENTIALS.partner.email && password === MOCK_CREDENTIALS.partner.password) {
      setIsFadingOut(true);
      setTimeout(() => {
        navigate("/architect-dashboard");
      }, 500);
    } else {
      setError("Access denied. Please use your exclusive invitation credentials.");
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`w-full space-y-8 transition-all duration-500 ${
        isFadingOut ? "animate-fade-out" : ""
      }`}
    >
      <div className="space-y-6">
        <div className="space-y-3">
          <Label
            htmlFor="email"
            className="text-xs tracking-[0.2em] uppercase text-white/50 font-body font-medium"
          >
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="h-14 border-white/20 bg-white/5 text-white focus:border-champagne/50 focus:ring-1 focus:ring-champagne/20 focus:bg-white/10 transition-all duration-500 placeholder:text-white/30 font-body tracking-wide backdrop-blur-sm"
            required
          />
        </div>

        <div className="space-y-3">
          <Label
            htmlFor="password"
            className="text-xs tracking-[0.2em] uppercase text-white/50 font-body font-medium"
          >
            Password
          </Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="h-14 border-white/20 bg-white/5 text-white focus:border-champagne/50 focus:ring-1 focus:ring-champagne/20 focus:bg-white/10 transition-all duration-500 placeholder:text-white/30 font-body tracking-wide backdrop-blur-sm"
            required
          />
        </div>
      </div>

      {error && (
        <p className="text-sm text-red-400 text-center font-body animate-fade-in">
          {error}
        </p>
      )}

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full h-14 bg-transparent hover:bg-white/5 text-champagne font-body text-sm tracking-[0.25em] uppercase transition-all duration-500 hover:tracking-[0.3em] disabled:opacity-50 border border-champagne/50 hover:border-champagne"
      >
        {isLoading ? (
          <span className="flex items-center gap-3">
            <span className="w-4 h-4 border-2 border-charcoal/30 border-t-charcoal rounded-full animate-spin" />
            Authenticating
          </span>
        ) : (
          "Enter"
        )}
      </Button>

      <p className="text-center text-xs text-white/40 font-body tracking-widest">
        Exclusive access for invited members only
      </p>
    </form>
  );
};

export default LoginForm;
