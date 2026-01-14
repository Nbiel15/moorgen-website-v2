const ProgressCircle = () => {
  const progress = 85;
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="bg-white rounded-3xl p-6 border border-[#E5E5E5] shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col items-center justify-center">
      <h3 className="font-serif text-lg text-charcoal mb-4">Villa Progress</h3>
      
      <div className="relative w-32 h-32">
        {/* Background Circle */}
        <svg className="w-full h-full -rotate-90">
          <circle
            cx="64"
            cy="64"
            r="45"
            fill="none"
            stroke="#F5F5F5"
            strokeWidth="8"
          />
          {/* Progress Circle */}
          <circle
            cx="64"
            cy="64"
            r="45"
            fill="none"
            stroke="#D4AF37"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        
        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-serif text-3xl text-charcoal">{progress}%</span>
          <span className="text-xs text-charcoal/50">Complete</span>
        </div>
      </div>

      <p className="text-sm text-charcoal/60 mt-4 text-center">
        Estimated completion: March 2024
      </p>
    </div>
  );
};

export default ProgressCircle;
