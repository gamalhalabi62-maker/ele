import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, ArrowUpRight, ArrowRight, ArrowLeft } from 'lucide-react';
import { COURSES } from '../../mocks/courses';

// ============================================
// Mini Card — بيشتغل مع الماوس
// ============================================
const RelatedCard = ({ course }) => {
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  const discount = course.oldPrice
    ? Math.round(((course.oldPrice - course.price) / course.oldPrice) * 100)
    : 0;

  return (
    <Link
      to={`/courses/${course.slug || course.id}`}
      className="block shrink-0 w-[300px] md:w-[360px]"
    >
      <article
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative h-full bg-neutral-900 border border-white/[0.06]
                   hover:border-neon-cyan/25 transition-all duration-500
                   overflow-hidden flex flex-col"
        style={{
          boxShadow: isHovered
            ? '0 20px 60px -20px rgba(111,232,255,0.18)'
            : 'none',
        }}
      >
        {/* Spotlight */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-500 z-0"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(circle 300px at ${mousePos.x}% ${mousePos.y}%, rgba(111,232,255,0.07), transparent 60%)`,
          }}
        />

        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-px origin-left scale-x-0
                        group-hover:scale-x-100 transition-transform duration-700 z-20
                        bg-neon-cyan" />

        {/* ===== IMAGE ===== */}
        <div className="relative aspect-[16/10] overflow-hidden z-[1]">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-full object-cover transition-transform duration-700
                       group-hover:scale-[1.06]"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/30 to-transparent" />

          {/* Badge */}
          {course.badge && (
            <div className="absolute top-4 left-4 px-3 py-1 z-10
                            bg-neutral-950/85 backdrop-blur-md
                            border border-neon-cyan/30">
              <span className="font-mono text-[9px] font-medium uppercase tracking-[0.2em] text-white">
                {course.badge}
              </span>
            </div>
          )}

          {/* Discount — top right */}
          {discount > 0 && (
            <div className="absolute top-4 right-4 px-2 py-1 z-10
                            bg-neon-cyan text-neutral-950">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider">
                −{discount}%
              </span>
            </div>
          )}

          {/* Category — bottom left */}
          <div className="absolute bottom-4 left-4 z-10">
            <span className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-white">
              {course.category}
            </span>
          </div>
        </div>

        {/* ===== CONTENT ===== */}
        <div className="relative flex flex-col flex-1 p-5 z-[1]">
          {/* Rating + Level */}
          <div className="flex items-center gap-2 mb-3">
            <Star size={11} className="fill-white text-white" />
            <span className="text-[11px] text-white font-mono">{course.rating}</span>
            <span className="text-white/20">·</span>
            <span className="text-[10px] font-mono uppercase tracking-wider text-white/40">
              {course.level}
            </span>
            <span className="text-white/20">·</span>
            <span className="text-[10px] font-mono uppercase tracking-wider text-white/40">
              {course.duration}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-white text-lg font-normal leading-snug line-clamp-2
                         group-hover:text-neon-cyan transition-colors duration-500">
            {course.title}
          </h3>

          {/* Subtitle */}
          {course.subtitle && (
            <p className="mt-2 text-sm text-white/50 font-light line-clamp-1">
              {course.subtitle}
            </p>
          )}

          {/* Bottom: Price + Arrow */}
          <div className="mt-auto pt-4 flex items-end justify-between gap-3">
            <div>
              {discount > 0 && (
                <div className="text-[10px] font-mono text-white/40 line-through mb-0.5">
                  {course.oldPrice.toLocaleString()}
                </div>
              )}
              <div className="flex items-baseline gap-1.5">
                <span className="font-sans font-medium text-xl text-white">
                  {course.price.toLocaleString()}
                </span>
                <span className="font-mono text-[10px] text-white/50 uppercase tracking-wider">
                  {course.currency}
                </span>
              </div>
            </div>

            <span className="inline-flex items-center justify-center h-9 w-9
                             border border-white/20 text-white/60
                             group-hover:border-neon-cyan group-hover:text-neon-cyan
                             group-hover:rotate-45 transition-all duration-500">
              <ArrowUpRight size={14} />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
};

// ============================================
// Main Component
// ============================================
const RelatedCourses = ({ currentCourseId = 1 }) => {
  const trackRef = useRef(null);

  // Filter out current course
  const related = COURSES.filter((c) => c.id !== currentCourseId).slice(0, 8);

  const scrollBy = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector('article');
    const width = card ? card.offsetWidth + 24 : 400;
    el.scrollBy({ left: dir * width, behavior: 'smooth' });
  };

  if (!related.length) return null;

  return (
    <section className="relative bg-void py-24 md:py-32 border-t border-white/[0.06] overflow-hidden">
      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(111,232,255,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(111,232,255,.4) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* Top glow */}
      <div className="absolute -top-40 left-1/4 h-[400px] w-[600px]
                      bg-neon-cyan/[0.04] blur-[160px] rounded-full pointer-events-none" />

      {/* ===== HEADER ===== */}
      <div className="container-x relative mb-12">
        <div className="flex items-end justify-between flex-wrap gap-6">

          {/* Left */}
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-10 bg-neon-cyan" />
              <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-neon-cyan">
                Related Programs
              </span>
            </div>

            <h2 className="font-sans font-light text-4xl md:text-5xl lg:text-6xl text-white tracking-tight leading-[1.05]">
              You might also{' '}
              <span className="italic text-neutral-400">like</span>
            </h2>

            <p className="mt-4 text-white/50 text-sm font-light max-w-md">
              Handpicked programs based on this course&apos;s level, category, and learning path.
            </p>
          </div>

          {/* Right — Arrows + counter */}
          <div className="flex items-center gap-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
              {String(related.length).padStart(2, '0')} programs
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={() => scrollBy(-1)}
                className="h-11 w-11 flex items-center justify-center
                           border border-white/15 text-white/60
                           hover:border-neon-cyan hover:text-neon-cyan
                           transition-all duration-300"
                aria-label="Previous"
              >
                <ArrowLeft size={16} />
              </button>
              <button
                onClick={() => scrollBy(1)}
                className="h-11 w-11 flex items-center justify-center
                           border border-white/15 text-white/60
                           hover:border-neon-cyan hover:text-neon-cyan
                           transition-all duration-300"
                aria-label="Next"
              >
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ===== HORIZONTAL TRACK ===== */}
      <div className="relative">
        {/* Track */}
        <div
          ref={trackRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide
                     pl-6 lg:pl-[max(1.5rem,calc((100vw-1400px)/2))] pr-24 pb-6 scroll-smooth"
        >
          {related.map((course) => (
            <RelatedCard key={course.id} course={course} />
          ))}

          {/* End spacer */}
          <div className="shrink-0 w-[10vw]" />
        </div>

        {/* Vignette edges */}
        <div
          className="absolute inset-y-0 left-0 w-20 md:w-32 pointer-events-none z-10"
          style={{ background: 'linear-gradient(to right, #06070B, transparent)' }}
        />
        <div
          className="absolute inset-y-0 right-0 w-20 md:w-32 pointer-events-none z-10"
          style={{ background: 'linear-gradient(to left, #06070B, transparent)' }}
        />
      </div>

      {/* ===== FOOTER ===== */}
      <div className="container-x relative mt-12 pt-8 border-t border-white/[0.06]">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-neon-cyan animate-pulse-soft" />
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/50">
              Updated weekly with new programs
            </span>
          </div>

          <Link
            to="/courses"
            className="group inline-flex items-center gap-2
                       text-[11px] font-mono uppercase tracking-[0.25em]
                       text-white hover:text-neon-cyan transition-colors duration-300"
          >
            View all courses
            <ArrowRight
              size={14}
              className="group-hover:translate-x-1 transition-transform duration-300"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RelatedCourses;