import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import NetflixCard from './NetflixCard';

const NetflixRow = ({ title, subtitle, courses, showRanking = false }) => {
  const trackRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const updateArrows = () => {
    const el = trackRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    updateArrows();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateArrows, { passive: true });
    return () => el.removeEventListener('scroll', updateArrows);
  }, [courses]);

  const scrollBy = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.8;
    el.scrollBy({ left: dir * amount, behavior: 'smooth' });
  };

  if (!courses?.length) return null;

  return (
    <section className="relative bg-transparent py-8 md:py-10 group/row">
      {/* Header */}
      <div className="container-x mb-5 flex items-end justify-between gap-4">
        <div>
          <h3 className="font-sans font-light text-2xl md:text-3xl lg:text-4xl
                         text-white tracking-tight leading-tight">
            {title}
          </h3>
          {subtitle && (
            <p className="mt-1.5 font-mono text-[10px] md:text-[11px] uppercase tracking-[0.25em]
                          text-white/40">
              {subtitle}
            </p>
          )}
        </div>

        <div className="hidden md:flex items-center gap-2
                        opacity-0 group-hover/row:opacity-100 transition-opacity duration-300">
          <button
            onClick={() => scrollBy(-1)}
            disabled={!canScrollLeft}
            className="h-10 w-10 flex items-center justify-center
                       border border-white/15 rounded-full text-white/60
                       hover:border-white/40 hover:text-white
                       disabled:opacity-30 disabled:cursor-not-allowed
                       transition-all duration-300"
            aria-label="Scroll left"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => scrollBy(1)}
            disabled={!canScrollRight}
            className="h-10 w-10 flex items-center justify-center
                       border border-white/15 rounded-full text-white/60
                       hover:border-white/40 hover:text-white
                       disabled:opacity-30 disabled:cursor-not-allowed
                       transition-all duration-300"
            aria-label="Scroll right"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Track */}
      <div className="relative">
        <div
          ref={trackRef}
          className="flex gap-3 md:gap-4 overflow-x-auto scrollbar-hide scroll-smooth
                     pl-6 lg:pl-[max(1.5rem,calc((100vw-1400px)/2))] pr-24 py-8"
        >
          {courses.map((course, i) => (
            <NetflixCard
              key={course.id}
              course={course}
              index={i}
              showRanking={showRanking}
              isNeighborHovered={
                hoveredIndex !== null && Math.abs(hoveredIndex - i) === 1
              }
              onHover={() => setHoveredIndex(i)}
              onLeave={() => setHoveredIndex(null)}
            />
          ))}
          <div className="shrink-0 w-[5vw]" />
        </div>

        {/* Edge vignettes */}
        <div
          className="absolute inset-y-0 left-0 w-12 pointer-events-none z-10"
          style={{ background: 'linear-gradient(to right, #06070B, transparent)' }}
        />
        <div
          className="absolute inset-y-0 right-0 w-12 pointer-events-none z-10"
          style={{ background: 'linear-gradient(to left, #06070B, transparent)' }}
        />
      </div>
    </section>
  );
};

export default NetflixRow;