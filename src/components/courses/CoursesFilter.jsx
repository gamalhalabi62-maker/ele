import { SlidersHorizontal } from 'lucide-react';

const CoursesFilter = ({
  categories,
  activeCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
  count,
}) => {
  return (
    <section className="sticky top-0 z-30 bg-void/85 backdrop-blur-xl border-y border-white/[0.06]">
      <div className="container-x py-4">
        <div className="flex flex-wrap items-center gap-4 md:gap-6">

          {/* Categories */}
          <div className="flex-1 flex items-center gap-6 overflow-x-auto pb-1 md:pb-0 scrollbar-hide">
            {categories.map((cat) => {
              const isActive = cat.id === activeCategory;
              return (
                <button
                  key={cat.id}
                  onClick={() => onCategoryChange(cat.id)}
                  className={`shrink-0 py-2 text-[11px] font-mono uppercase tracking-[0.2em]
                             transition-all duration-300 border-b-2 ${
                               isActive
                                 ? 'text-white border-white'
                                 : 'text-neutral-500 hover:text-neutral-200 border-transparent'
                             }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-3 shrink-0">
            <SlidersHorizontal size={14} className="text-neutral-600" />
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="bg-transparent border border-white/[0.08] text-neutral-300
                         text-[11px] font-mono uppercase tracking-[0.2em]
                         px-3 py-2 outline-none cursor-pointer
                         hover:border-white/[0.2] hover:text-white transition-colors"
            >
              <option value="popular" className="bg-neutral-900">Most Popular</option>
              <option value="rating"  className="bg-neutral-900">Highest Rated</option>
              <option value="newest"  className="bg-neutral-900">Newest</option>
              <option value="price-low"  className="bg-neutral-900">Price ↑</option>
              <option value="price-high" className="bg-neutral-900">Price ↓</option>
            </select>

            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-500">
              {String(count).padStart(2, '0')} results
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoursesFilter;