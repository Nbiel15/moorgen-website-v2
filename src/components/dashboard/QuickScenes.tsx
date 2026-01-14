import { Heart, UtensilsCrossed, Focus, Film } from "lucide-react";
import { useState } from "react";

const scenes = [
  { id: "romantic", label: "Romantic", icon: Heart },
  { id: "dining", label: "Dining", icon: UtensilsCrossed },
  { id: "focus", label: "Focus", icon: Focus },
  { id: "movie", label: "Movie", icon: Film },
];

const QuickScenes = () => {
  const [activeScene, setActiveScene] = useState<string | null>("romantic");

  return (
    <div className="bg-white rounded-3xl p-6 border border-[#E5E5E5] shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
      <h3 className="font-serif text-lg text-charcoal mb-4">Quick Scenes</h3>
      <div className="grid grid-cols-2 gap-3">
        {scenes.map((scene) => (
          <button
            key={scene.id}
            onClick={() => setActiveScene(scene.id)}
            className={`aspect-square rounded-2xl flex flex-col items-center justify-center gap-2 transition-all duration-300 ${
              activeScene === scene.id
                ? "bg-champagne-gold/5 border-2 border-champagne-gold text-champagne-gold"
                : "bg-gray-50 border-2 border-transparent text-charcoal/60 hover:border-[#E5E5E5] hover:text-charcoal"
            }`}
          >
            <scene.icon
              className={`w-6 h-6 ${
                activeScene === scene.id ? "stroke-[2]" : "stroke-[1.5]"
              }`}
            />
            <span className="text-xs font-medium tracking-wide">
              {scene.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickScenes;
