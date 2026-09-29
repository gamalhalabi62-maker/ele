import { useEffect, useRef, useState, useCallback } from 'react';
import {
  ArrowUpRight, Calendar, MapPin, Users, Sparkles,
  Play, Pause, ArrowRight, ArrowLeft,
} from 'lucide-react';
import { EVENTS } from '../../mocks/events';

// ============================================
// Event Slide
// ============================================
const EventSlide = ({ event, index, total, isActive }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [videoError, setVideoError] = useState(false);

  const media = event.media?.[0];
  const registrationPct = Math.round((event.registered / event.seats) * 100);

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid || media?.type !== 'video') return;
    if (isActive && isPlaying) vid.play().catch(() => {});
    else vid.pause();
  }, [isActive, isPlaying, media]);

  return (
    <div
      data-slide
      className="event-slide relative w-screen h-screen overflow-hidden snap-start shrink-0"
      style={{ scrollSnapAlign: 'start', scrollSnapStop: 'always' }}
    >
      {/* MEDIA */}
      <div className="absolute inset-0 z-0 bg-neutral-950">
        {media?.type === 'video' && !videoError ? (
          <video
            ref={videoRef}
            key={event.id}
            src={media.src}
            poster={media.poster}
            muted
            loop
            playsInline
            autoPlay
            preload="auto"
            onError={() => setVideoError(true)}
            className="w-full h-full object-cover"
          />
        ) : (
          <img
            src={media?.poster || media?.src}
            alt={event.title}
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-void/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-void/85 via-void/30 to-void/50" />
      </div>

      {/* GRID */}
      <div
        className="absolute inset-0 z-[1] opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(111,232,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(111,232,255,.5) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* CONTENT */}
      <div className="relative z-10 h-full flex flex-col justify-end pb-24 md:pb-32">
        <div className="container-x w-full">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#6FE8FF] text-black font-mono text-[10px] font-bold uppercase tracking-[0.15em]">
                <span className="h-1.5 w-1.5 rounded-full bg-black" />
                {event.badge}
              </span>
              <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 font-mono text-[10px] font-medium uppercase tracking-[0.15em] text-white/90">
                {event.category}
              </span>
            </div>

            <h2 className="font-sans font-light text-[2.25rem] sm:text-[3rem] md:text-[4rem] lg:text-[5rem] leading-[1.02] tracking-[-0.04em] text-white mb-5 max-w-[20ch]">
              {event.title}
            </h2>

            <p className="text-base md:text-xl text-white/70 font-light mb-8 max-w-2xl">
              {event.subtitle}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10 max-w-3xl">
              {[
                { Icon: Calendar, label: 'Date', value: event.date },
                { Icon: MapPin, label: 'Location', value: event.location },
                { Icon: Users, label: 'Seats', value: `${event.seats} available` },
                { Icon: Sparkles, label: 'Speakers', value: `${event.speakers} experts` },
              ].map((item, i) => {
                const Icon = item.Icon;
                return (
                  <div key={i}>
                    <div className="flex items-center gap-2 mb-2">
                      <Icon size={12} className="text-[#6FE8FF]" />
                      <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/40">
                        {item.label}
                      </span>
                    </div>
                    <div className="font-sans text-sm text-white">{item.value}</div>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-wrap items-end justify-between gap-6 max-w-3xl">
              <div className="flex-1 min-w-[240px]">
                <div className="flex items-center justify-between text-[10px] font-mono mb-2">
                  <span className="text-white/50 uppercase tracking-[0.15em]">
                    {event.registered} / {event.seats} registered
                  </span>
                  <span className="text-[#6FE8FF]">{registrationPct}%</span>
                </div>
                <div className="h-0.5 bg-white/[0.15] overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#6FE8FF] to-[#A68BFF] transition-all duration-1000"
                    style={{ width: `${registrationPct}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={event.ctaLink}
                  className="group inline-flex items-center gap-2 px-6 py-3.5 bg-[#6FE8FF] text-black rounded-full font-mono text-[10px] font-bold uppercase tracking-[0.15em] hover:bg-white transition-all duration-500 shadow-[0_0_40px_rgba(111,232,255,0.3)]"
                >
                  {event.ctaText}
                  <ArrowUpRight
                    size={13}
                    className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                  />
                </a>
                <a
                  href={`/events/${event.slug}`}
                  className="inline-flex items-center gap-2 px-6 py-3.5 border border-white/[0.25] rounded-full text-white font-mono text-[10px] font-bold uppercase tracking-[0.15em] hover:bg-white/[0.05] hover:border-white/[0.5] backdrop-blur-md transition-all duration-500"
                >
                  Details
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PLAY/PAUSE */}
      {media?.type === 'video' && isActive && !videoError && (
        <button
          onClick={() => setIsPlaying((p) => !p)}
          className="absolute top-24 right-8 z-20 h-11 w-11 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-black/80 transition-colors"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? <Pause size={15} /> : <Play size={15} fill="currentColor" />}
        </button>
      )}
    </div>
  );
};

// ============================================
// CoursesCTA — Main (بدون hacking loader)
// ============================================
const CoursesCTA = () => {
  const slidesRef = useRef(null);
  const isAnimating = useRef(false);

  const [activeSlide, setActiveSlide] = useState(0);

  // ============ Pause Lenis ============
  useEffect(() => {
    const lenis = window.__lenis;
    if (lenis) lenis.stop();

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      if (lenis) lenis.start();
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  // ============ Scroll to slide ============
  const scrollToSlide = useCallback((idx) => {
    const container = slidesRef.current;
    if (!container) return;
    const slides = container.querySelectorAll('[data-slide]');
    if (!slides[idx]) return;

    isAnimating.current = true;
    slides[idx].scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start',
    });
    setActiveSlide(idx);
    setTimeout(() => {
      isAnimating.current = false;
    }, 700);
  }, []);

  // ============ Wheel & Touch ============
  useEffect(() => {
    const container = slidesRef.current;
    if (!container) return;

    let acc = 0;

    const onWheel = (e) => {
      e.preventDefault();
      acc += e.deltaY + e.deltaX;
      if (isAnimating.current) return;
      if (Math.abs(acc) < 100) return;

      const direction = acc > 0 ? 1 : -1;
      acc = 0;
      const nextIdx = Math.min(
        EVENTS.length - 1,
        Math.max(0, activeSlide + direction)
      );
      if (nextIdx !== activeSlide) scrollToSlide(nextIdx);
    };

    let tX = 0,
      tY = 0;
    const onTouchStart = (e) => {
      tX = e.touches[0].clientX;
      tY = e.touches[0].clientY;
    };
    const onTouchEnd = (e) => {
      const dx = e.changedTouches[0].clientX - tX;
      const dy = e.changedTouches[0].clientY - tY;
      const aX = Math.abs(dx),
        aY = Math.abs(dy);
      if (Math.max(aX, aY) < 50) return;
      if (isAnimating.current) return;
      const direction = aX > aY ? (dx < 0 ? 1 : -1) : dy < 0 ? 1 : -1;
      const nextIdx = Math.min(
        EVENTS.length - 1,
        Math.max(0, activeSlide + direction)
      );
      if (nextIdx !== activeSlide) scrollToSlide(nextIdx);
    };

    const onScroll = () => {
      const slides = container.querySelectorAll('[data-slide]');
      const current = Math.round(container.scrollLeft / window.innerWidth);
      if (current >= 0 && current < slides.length) setActiveSlide(current);
    };

    container.addEventListener('wheel', onWheel, { passive: false });
    container.addEventListener('scroll', onScroll, { passive: true });
    container.addEventListener('touchstart', onTouchStart, { passive: true });
    container.addEventListener('touchend', onTouchEnd, { passive: true });

    return () => {
      container.removeEventListener('wheel', onWheel);
      container.removeEventListener('scroll', onScroll);
      container.removeEventListener('touchstart', onTouchStart);
      container.removeEventListener('touchend', onTouchEnd);
    };
  }, [activeSlide, scrollToSlide]);

  // ============ Keyboard ============
  useEffect(() => {
    const onKey = (e) => {
      if (isAnimating.current) return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        scrollToSlide(Math.min(EVENTS.length - 1, activeSlide + 1));
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        scrollToSlide(Math.max(0, activeSlide - 1));
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeSlide, scrollToSlide]);

  return (
    <section className="relative bg-void" style={{ minHeight: '100vh' }}>
      {/* HORIZONTAL EVENTS CAROUSEL */}
      <div
        ref={slidesRef}
        data-lenis-prevent
        className="events-snap-container relative w-screen h-screen
                   flex flex-nowrap overflow-x-scroll overflow-y-hidden"
        style={{
          scrollSnapType: 'x mandatory',
          scrollBehavior: 'smooth',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          overscrollBehaviorX: 'contain',
          overscrollBehaviorY: 'none',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {EVENTS.map((event, i) => (
          <EventSlide
            key={event.id}
            event={event}
            index={i}
            total={EVENTS.length}
            isActive={i === activeSlide}
          />
        ))}
      </div>

      {/* Top Progress + Dots */}
      <div className="fixed top-0 left-0 right-0 z-40 pointer-events-none">
        <div className="h-px bg-white/[0.08] relative overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#6FE8FF] to-[#A68BFF] origin-left transition-transform duration-500"
            style={{ transform: `scaleX(${(activeSlide + 1) / EVENTS.length})` }}
          />
        </div>
        <div className="flex items-center justify-center gap-2 pt-4">
          {EVENTS.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToSlide(i)}
              className="group relative pointer-events-auto"
              aria-label={`Go to event ${i + 1}`}
            >
              <span
                className={`block h-1 rounded-full transition-all duration-500 ${
                  i === activeSlide
                    ? 'w-10 bg-[#6FE8FF]'
                    : 'w-4 bg-white/20 group-hover:bg-white/40'
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Right Counter */}
      <div className="fixed top-1/2 right-8 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-4 pointer-events-none">
        <span className="font-mono text-[9px] uppercase tracking-[0.35em] text-white/40 rotate-90 origin-center whitespace-nowrap mb-12">
          Upcoming Events
        </span>
        <div className="flex flex-col items-center gap-1">
          <span className="font-mono text-2xl text-white tabular-nums leading-none">
            {String(activeSlide + 1).padStart(2, '0')}
          </span>
          <span className="h-px w-4 bg-white/30" />
          <span className="font-mono text-xs text-white/40 tabular-nums">
            {String(EVENTS.length).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 flex items-center gap-3 pointer-events-auto">
        <button
          onClick={() => scrollToSlide(Math.max(0, activeSlide - 1))}
          disabled={activeSlide === 0}
          className="h-11 w-11 flex items-center justify-center border border-white/20 rounded-full
                     text-white/70 hover:border-[#6FE8FF] hover:text-[#6FE8FF]
                     disabled:opacity-30 disabled:cursor-not-allowed backdrop-blur-md transition-all duration-300"
          aria-label="Previous"
        >
          <ArrowLeft size={15} />
        </button>
        <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/60 min-w-[70px] text-center">
          {String(activeSlide + 1).padStart(2, '0')} /{' '}
          {String(EVENTS.length).padStart(2, '0')}
        </span>
        <button
          onClick={() =>
            scrollToSlide(Math.min(EVENTS.length - 1, activeSlide + 1))
          }
          disabled={activeSlide === EVENTS.length - 1}
          className="h-11 w-11 flex items-center justify-center border border-white/20 rounded-full
                     text-white/70 hover:border-[#6FE8FF] hover:text-[#6FE8FF]
                     disabled:opacity-30 disabled:cursor-not-allowed backdrop-blur-md transition-all duration-300"
          aria-label="Next"
        >
          <ArrowRight size={15} />
        </button>
      </div>

      {/* Bottom-right Hint */}
      <div className="fixed bottom-8 right-8 z-40 hidden md:flex items-center gap-3 pointer-events-none">
        <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/40">
          Scroll
        </span>
        <ArrowRight size={14} className="text-[#6FE8FF] animate-pulse" />
      </div>

      <style>{`
        .events-snap-container::-webkit-scrollbar { display: none; }
        @supports (scroll-snap-type: x mandatory) {
          .events-snap-container { scroll-snap-type: x mandatory; }
          .event-slide {
            scroll-snap-align: start;
            scroll-snap-stop: always;
          }
        }
      `}</style>
    </section>
  );
};

export default CoursesCTA;