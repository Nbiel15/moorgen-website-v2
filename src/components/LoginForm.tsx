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
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Check credentials and redirect accordingly
    if (email === "owner@moorgen.com") {
      setIsFadingOut(true);
      setTimeout(() => {
        navigate("/lifestyle-dashboard");
      }, 500);
    } else if (email === "engineer@moorgen.com") {
      setIsFadingOut(true);
      setTimeout(() => {
        navigate("/technical-workspace");
      }, 500);
    } else {
      setError("Invalid credentials. This is an invitation-only space.");
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
        <div className="space-y-2">
          <Label
            htmlFor="email"
            className="text-xs tracking-[0.15em] uppercase text-muted-foreground font-body font-medium"
          >
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="h-12 border-moorgen-border bg-transparent focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all duration-300 placeholder:text-muted-foreground/40 font-body tracking-wide"
            required
          />
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="password"
            className="text-xs tracking-[0.15em] uppercase text-muted-foreground font-body font-medium"
          >
            Password
          </Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="h-12 border-moorgen-border bg-transparent focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all duration-300 placeholder:text-muted-foreground/40 font-body tracking-wide"
            required
          />
        </div>
      </div>

      {error && (
        <p className="text-sm text-destructive text-center font-body animate-fade-in">
          {error}
        </p>
      )}

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full h-12 bg-primary hover:bg-champagne-dark text-primary-foreground font-body text-sm tracking-[0.15em] uppercase transition-all duration-300 hover:shadow-lg disabled:opacity-50"
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
            Authenticating
          </span>
        ) : (
          "Enter"
        )}
      </Button>

      <p className="text-center text-xs text-muted-foreground font-body tracking-wide">
        Exclusive access for invited members only
      </p>
    </form>
  );
};

export default LoginForm;
