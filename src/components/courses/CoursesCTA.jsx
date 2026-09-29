import { useEffect, useRef, useState, useCallback } from 'react';
import {
  ArrowUpRight, Calendar, MapPin, Users, Sparkles,
  Play, Pause, ArrowRight, ArrowLeft,
} from 'lucide-react';
import { EVENTS } from '../../mocks/events';

// ============================================
// Hook — Detect device type
// ============================================
const useDeviceType = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => {
      const mobile =
        window.matchMedia('(pointer: coarse)').matches ||
        window.innerWidth < 768;
      setIsMobile(mobile);
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return { isMobile };
};

// ============================================
// Event Slide
// ============================================
const EventSlide = ({ event, index, total, isActive, isMobile }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [videoError, setVideoError] = useState(false);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

  const media = event.media?.[0];
  const registrationPct = Math.round((event.registered / event.seats) * 100);

  // ⚡ نظم تحميل الفيديوهات — نحملها بس لما تكون قريبة
  useEffect(() => {
    if (!isActive) return;
    const t = setTimeout(() => setShouldLoadVideo(true), 100);
    return () => clearTimeout(t);
  }, [isActive]);

  // ⚡ شغل/وقّف الفيديو حسب الحالة
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid || media?.type !== 'video') return;

    if (isActive && isPlaying) {
      vid.play().catch(() => {});
    } else {
      vid.pause();
    }
  }, [isActive, isPlaying, media]);

  return (
    <div
      data-slide
      className="event-slide relative w-screen h-screen overflow-hidden shrink-0 snap-center md:snap-start"
      style={{ scrollSnapAlign: isMobile ? 'center' : 'start' }}
    >
      {/* MEDIA — poster أول، فيديو لما يجي */}
      <div className="absolute inset-0 z-0 bg-neutral-950">
        {media?.type === 'video' && !videoError && shouldLoadVideo ? (
          <video
            ref={videoRef}
            key={event.id}
            src={media.src}
            poster={media.poster}
            muted
            loop
            playsInline
            preload="metadata"
            onError={() => setVideoError(true)}
            className="w-full h-full object-cover"
          />
        ) : (
          <img
            src={media?.poster || media?.src}
            alt={event.title}
            loading="lazy"
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
      <div className="relative z-10 h-full flex flex-col justify-end pb-28 md:pb-32">
        <div className="container-x w-full">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 mb-5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#6FE8FF] text-black font-mono text-[10px] font-bold uppercase tracking-[0.15em]">
                <span className="h-1.5 w-1.5 rounded-full bg-black" />
                {event.badge}
              </span>
              <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 font-mono text-[10px] font-medium uppercase tracking-[0.15em] text-white/90">
                {event.category}
              </span>
            </div>

            <h2 className="font-sans font-light text-[1.75rem] sm:text-[2.5rem] md:text-[4rem] lg:text-[5rem] leading-[1.05] tracking-[-0.04em] text-white mb-4 max-w-[20ch]">
              {event.title}
            </h2>

            <p className="text-sm md:text-xl text-white/70 font-light mb-6 max-w-2xl">
              {event.subtitle}
            </p>

            {/* Meta grid — على الموبايل عمودين بدل 4 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-7">
              {[
                { Icon: Calendar, label: 'Date', value: event.date },
                { Icon: MapPin, label: 'Location', value: event.location },
                { Icon: Users, label: 'Seats', value: `${event.seats} seats` },
                { Icon: Sparkles, label: 'Speakers', value: `${event.speakers} experts` },
              ].map((item, i) => {
                const Icon = item.Icon;
                return (
                  <div key={i}>
                    <div className="flex items-center gap-2 mb-1.5">
                      <Icon size={11} className="text-[#6FE8FF]" />
                      <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/40">
                        {item.label}
                      </span>
                    </div>
                    <div className="text-xs md:text-sm text-white">
                      {item.value}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Progress */}
            <div className="mb-6 max-w-md">
              <div className="flex items-center justify-between text-[10px] font-mono mb-2">
                <span className="text-white/50 uppercase tracking-[0.15em]">
                  {event.registered} / {event.seats} registered
                </span>
                <span className="text-[#6FE8FF]">{registrationPct}%</span>
              </div>
              <div className="h-0.5 bg-white/[0.15] overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#6FE8FF] to-[#A68BFF]"
                  style={{ width: `${registrationPct}%` }}
                />
              </div>
            </div>

            {/* CTAs — stacked على الموبايل */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={event.ctaLink}
                className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#6FE8FF] text-black rounded-full font-mono text-[10px] font-bold uppercase tracking-[0.15em] hover:bg-white transition-colors duration-300"
              >
                {event.ctaText}
                <ArrowUpRight
                  size={13}
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                />
              </a>
              <a
                href={`/events/${event.slug}`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-white/[0.25] rounded-full text-white font-mono text-[10px] font-bold uppercase tracking-[0.15em] hover:bg-white/[0.05] transition-colors duration-300"
              >
                Details
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* PLAY/PAUSE — بس للفيديو الـ active */}
      {media?.type === 'video' && isActive && !videoError && shouldLoadVideo && (
        <button
          onClick={() => setIsPlaying((p) => !p)}
          className="absolute top-20 md:top-24 right-4 md:right-8 z-20 h-10 w-10 md:h-11 md:w-11 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-black/80 transition-colors"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? <Pause size={14} /> : <Play size={14} fill="currentColor" />}
        </button>
      )}
    </div>
  );
};

// ============================================
// CoursesCTA — Main (Optimized)
// ============================================
const CoursesCTA = () => {
  const slidesRef = useRef(null);
  const { isMobile } = useDeviceType();
  const [activeSlide, setActiveSlide] = useState(0);

  // ============ Pause Lenis على الديسكتوب بس ============
  useEffect(() => {
    if (isMobile) return;

    const lenis = window.__lenis;
    if (lenis) lenis.stop();

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      if (lenis) lenis.start();
      document.body.style.overflow = prevOverflow;
    };
  }, [isMobile]);

  // ============ Scroll to slide ============
  const scrollToSlide = useCallback((idx) => {
    const container = slidesRef.current;
    if (!container) return;
    const slides = container.querySelectorAll('[data-slide]');
    if (!slides[idx]) return;

    slides[idx].scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start',
    });
    setActiveSlide(idx);
  }, []);

  // ============ Track active slide (طبيعي - بدون hijack) ============
  useEffect(() => {
    const container = slidesRef.current;
    if (!container) return;

    const onScroll = () => {
      const w = window.innerWidth;
      const current = Math.round(container.scrollLeft / w);
      if (current >= 0 && current < EVENTS.length && current !== activeSlide) {
        setActiveSlide(current);
      }
    };

    container.addEventListener('scroll', onScroll, { passive: true });
    return () => container.removeEventListener('scroll', onScroll);
  }, [activeSlide]);

  // ============ Wheel → horizontal (desktop only) ============
  useEffect(() => {
    if (isMobile) return;
    const container = slidesRef.current;
    if (!container) return;

    let acc = 0;
    let lastSwitch = 0;

    const onWheel = (e) => {
      e.preventDefault();

      const now = Date.now();
      if (now - lastSwitch < 800) return;

      acc += e.deltaY;
      if (Math.abs(acc) < 80) return;

      const direction = acc > 0 ? 1 : -1;
      acc = 0;

      const nextIdx = Math.min(
        EVENTS.length - 1,
        Math.max(0, activeSlide + direction)
      );
      if (nextIdx !== activeSlide) {
        lastSwitch = now;
        scrollToSlide(nextIdx);
      }
    };

    container.addEventListener('wheel', onWheel, { passive: false });
    return () => container.removeEventListener('wheel', onWheel);
  }, [isMobile, activeSlide, scrollToSlide]);

  // ============ Keyboard (desktop only) ============
  useEffect(() => {
    if (isMobile) return;
    const onKey = (e) => {
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
  }, [isMobile, activeSlide, scrollToSlide]);

  return (
    <section className="relative bg-void h-screen overflow-hidden">
      {/* HORIZONTAL TRACK */}
      <div
        ref={slidesRef}
        data-lenis-prevent
        className="events-snap-container w-full h-full flex overflow-x-auto overflow-y-hidden
                   snap-x snap-mandatory scroll-smooth"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
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
            isMobile={isMobile}
          />
        ))}
      </div>

      {/* Top Progress + Dots */}
      <div className="absolute top-0 left-0 right-0 z-40 pointer-events-none">
        <div className="h-px bg-white/[0.08] relative overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#6FE8FF] to-[#A68BFF] origin-left transition-transform duration-300"
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
                className={`block h-1 rounded-full transition-all duration-300 ${
                  i === activeSlide
                    ? 'w-10 bg-[#6FE8FF]'
                    : 'w-4 bg-white/20 group-hover:bg-white/40'
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Right Counter — desktop only */}
      <div className="absolute top-1/2 right-8 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-4 pointer-events-none">
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

      {/* Bottom Nav — Arrows */}
      <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-40 flex items-center gap-3 pointer-events-auto">
        <button
          onClick={() => scrollToSlide(Math.max(0, activeSlide - 1))}
          disabled={activeSlide === 0}
          className="h-10 w-10 md:h-11 md:w-11 flex items-center justify-center border border-white/20 rounded-full
                     text-white/70 hover:border-[#6FE8FF] hover:text-[#6FE8FF]
                     disabled:opacity-30 disabled:cursor-not-allowed backdrop-blur-md transition-all duration-300"
          aria-label="Previous"
        >
          <ArrowLeft size={14} />
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
          className="h-10 w-10 md:h-11 md:w-11 flex items-center justify-center border border-white/20 rounded-full
                     text-white/70 hover:border-[#6FE8FF] hover:text-[#6FE8FF]
                     disabled:opacity-30 disabled:cursor-not-allowed backdrop-blur-md transition-all duration-300"
          aria-label="Next"
        >
          <ArrowRight size={14} />
        </button>
      </div>

      {/* Bottom-right Hint — desktop */}
      <div className="absolute bottom-8 right-8 z-40 hidden md:flex items-center gap-3 pointer-events-none">
        <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/40">
          Scroll
        </span>
        <ArrowRight size={14} className="text-[#6FE8FF] animate-pulse" />
      </div>

      <style>{`
        .events-snap-container::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
};

export default CoursesCTA;