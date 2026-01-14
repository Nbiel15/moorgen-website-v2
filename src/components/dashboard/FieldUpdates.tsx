import { ChevronRight } from "lucide-react";

const updates = [
  {
    id: 1,
    title: "Panel Installation",
    date: "Jan 12, 2024",
    category: "Electrical",
  },
  {
    id: 2,
    title: "Smart Lighting Setup",
    date: "Jan 10, 2024",
    category: "Automation",
  },
  {
    id: 3,
    title: "Security System",
    date: "Jan 8, 2024",
    category: "Security",
  },
  {
    id: 4,
    title: "Climate Control",
    date: "Jan 5, 2024",
    category: "HVAC",
  },
];

const FieldUpdates = () => {
  return (
    <div className="bg-white rounded-3xl p-6 border border-[#E5E5E5] shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-serif text-lg text-charcoal">Field Updates</h3>
        <button className="text-champagne-gold text-sm font-medium flex items-center gap-1 hover:underline">
          View All <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2 -mx-2 px-2 scrollbar-hide">
        {updates.map((update) => (
          <div
            key={update.id}
            className="flex-shrink-0 w-40 group cursor-pointer"
          >
            {/* Thumbnail Placeholder */}
            <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-gray-100 to-gray-50 mb-3 overflow-hidden border border-[#E5E5E5] group-hover:border-champagne-gold/50 transition-colors">
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-12 h-12 rounded-xl bg-champagne-gold/10 flex items-center justify-center">
                  <span className="text-champagne-gold text-xs font-medium">
                    {update.category.slice(0, 2).toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
            <h4 className="text-sm font-medium text-charcoal truncate group-hover:text-champagne-gold transition-colors">
              {update.title}
            </h4>
            <p className="text-xs text-charcoal/50">{update.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FieldUpdates;
