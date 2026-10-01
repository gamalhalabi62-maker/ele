import { useEffect, useRef, useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import NetflixCard from './NetflixCard';

const NetflixRow = ({ title, subtitle, courses, showRanking = false }) => {
  const trackRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft]   = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex]       = useState(null); // للكارد المفتوح

  const updateArrows = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < maxScroll - 4);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    updateArrows();
    el.addEventListener('scroll', updateArrows, { passive: true });
    window.addEventListener('resize', updateArrows);

    const ro = new ResizeObserver(updateArrows);
    ro.observe(el);

    return () => {
      el.removeEventListener('scroll', updateArrows);
      window.removeEventListener('resize', updateArrows);
      ro.disconnect();
    };
  }, [courses, updateArrows]);

  const scrollByCard = useCallback((dir) => {
    const el = trackRef.current;
    if (!el) return;
    const firstCard = el.querySelector('[data-card]');
    const cardWidth = firstCard?.offsetWidth ?? 400;
    const styles    = window.getComputedStyle(el);
    const gap       = parseInt(styles.columnGap || styles.gap || '16', 10);
    const step      = cardWidth + gap;
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  }, []);

  if (!courses?.length) return null;

  return (
    <section className="relative bg-transparent py-6 md:py-10 group/row">
      {/* Header */}
      <div className="container-x mb-4 md:mb-5 flex items-end justify-between gap-3">
        <div className="min-w-0">
          <h3 className="font-sans font-light text-xl sm:text-2xl md:text-3xl lg:text-4xl
                         text-white tracking-tight leading-tight truncate">
            {title}
          </h3>
          {subtitle && (
            <p className="mt-1.5 font-mono text-[9px] sm:text-[10px] md:text-[11px]
                          uppercase tracking-[0.25em] text-white/40 truncate">
              {subtitle}
            </p>
          )}
        </div>

        {/* 🎯 الأسهم — تظهر دائماً على الموبايل، وعند hover على الديسكتوب */}
        <div className="flex items-center gap-2 md:opacity-0 md:group-hover/row:opacity-100
                        transition-opacity duration-300 shrink-0">
          <button
            onClick={() => scrollByCard(-1)}
            disabled={!canScrollLeft}
            className="h-9 w-9 md:h-10 md:w-10 flex items-center justify-center
                       border border-white/20 rounded-full text-white/70
                       bg-black/40 backdrop-blur-sm
                       hover:border-white/50 hover:text-white hover:bg-white/10
                       active:scale-95
                       disabled:opacity-25 disabled:cursor-not-allowed
                       transition-all duration-200"
            aria-label="Scroll left"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => scrollByCard(1)}
            disabled={!canScrollRight}
            className="h-9 w-9 md:h-10 md:w-10 flex items-center justify-center
                       border border-white/20 rounded-full text-white/70
                       bg-black/40 backdrop-blur-sm
                       hover:border-white/50 hover:text-white hover:bg-white/10
                       active:scale-95
                       disabled:opacity-25 disabled:cursor-not-allowed
                       transition-all duration-200"
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
          className="flex gap-3 sm:gap-4 overflow-x-auto scrollbar-hide scroll-smooth
                     snap-x snap-mandatory
                     px-6 lg:px-[max(1.5rem,calc((100vw-1400px)/2))]
                     py-8 md:py-10"
        >
          {courses.map((course, i) => (
            <div
              key={course.id}
              data-card
              className="shrink-0 snap-start"
            >
              <NetflixCard
                course={course}
                index={i}
                showRanking={showRanking}
                isOpen={activeIndex === i}
                onOpen={() => setActiveIndex(i)}
                onClose={() => setActiveIndex(null)}
              />
            </div>
          ))}
          <div className="shrink-0 w-2" />
        </div>

        {/* Edge vignettes */}
        <div
          className="absolute inset-y-0 left-0 w-8 md:w-12 pointer-events-none z-10"
          style={{ background: 'linear-gradient(to right, #06070B, transparent)' }}
        />
        <div
          className="absolute inset-y-0 right-0 w-8 md:w-12 pointer-events-none z-10"
          style={{ background: 'linear-gradient(to left, #06070B, transparent)' }}
        />
      </div>
    </section>
  );
};

export default NetflixRow;