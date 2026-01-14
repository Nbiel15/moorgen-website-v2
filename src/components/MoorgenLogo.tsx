const MoorgenLogo = () => {
  return (
    <div className="flex flex-col items-center gap-3">
      {/* Elegant geometric logo mark */}
      <div className="relative w-16 h-16 flex items-center justify-center">
        <div className="absolute inset-0 border border-primary/30 rotate-45" />
        <div className="absolute inset-2 border border-primary/50 rotate-45" />
        <span className="font-heading text-2xl font-light text-primary">M</span>
      </div>
      <span className="font-heading text-xl tracking-[0.3em] text-foreground font-light uppercase">
        Moorgen
      </span>
    </div>
  );
};

export default MoorgenLogo;
