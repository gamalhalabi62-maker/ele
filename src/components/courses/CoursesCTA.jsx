import { useEffect, useRef, useState, useCallback } from 'react';
import {
  ArrowUpRight, Calendar, MapPin, Users, Sparkles,
  Play, Pause, ArrowRight, ArrowLeft,
} from 'lucide-react';
import { EVENTS } from '../../mocks/events';

// ============================================
// Hack Lines
// ============================================
const HACK_LINES = [
  '> INITIALIZING BREACH PROTOCOL v3.7.1',
  '> SCANNING NETWORK PERIMETER...',
  '> [████████░░] 80% FIREWALL BYPASS',
  '> EXPLOIT: CVE-2024-1337 DEPLOYED',
  '> ESCALATING PRIVILEGES... ROOT ACCESS',
  '> EXFILTRATING DATA [████████████] 100%',
  '> ACCESS LOGS WIPED — NO TRACE',
  '> ⚠ INTRUDER DETECTED ⚠',
  '> COUNTERMEASURES ENGAGED',
  '> TRACING SOURCE...',
  '> ACCESS GRANTED — WELCOME',
];

// ============================================
// Hacking Screen
// ============================================
const HackingScreen = ({ onComplete }) => {
  const [lines, setLines] = useState([]);
  const [corruptHeader, setCorruptHeader] = useState('SYSTEM');
  const [phase, setPhase] = useState('hacking');
  const [noiseIntensity, setNoiseIntensity] = useState(0.5);
  const canvasRef = useRef(null);
  const timeoutsRef = useRef([]);
  const hasCompletedRef = useRef(false);
  const onCompleteRef = useRef(onComplete);

  // Keep onComplete fresh without re-triggering effects
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // Matrix rain
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    const render = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.06)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle =
        phase === 'hacking'
          ? 'rgba(255, 0, 60, 0.6)'
          : 'rgba(0, 255, 100, 0.6)';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(render, 40);
    return () => clearInterval(interval);
  }, [phase]);

  // Header scrambler
  useEffect(() => {
    if (phase !== 'hacking') return;
    const interval = setInterval(() => {
      const chars = '!@#$%^&*()<>?/\\|';
      let result = '';
      for (let i = 0; i < 8; i++) {
        result +=
          Math.random() > 0.4
            ? chars[Math.floor(Math.random() * chars.length)]
            : String.fromCharCode(65 + Math.floor(Math.random() * 26));
      }
      setCorruptHeader(result);
    }, 60);

    return () => clearInterval(interval);
  }, [phase]);

  // Lines sequence
  useEffect(() => {
    let idx = 0;
    const interval = setInterval(() => {
      if (idx < HACK_LINES.length) {
        const nextLine = HACK_LINES[idx];
        if (typeof nextLine === 'string') {
          setLines((prev) => [...prev, nextLine]);
        }
        idx++;
      } else {
        clearInterval(interval);
        if (hasCompletedRef.current) return;
        hasCompletedRef.current = true;

        const t1 = setTimeout(() => setPhase('resolved'), 700);
        const t2 = setTimeout(() => {
          onCompleteRef.current?.();
        }, 2400);
        timeoutsRef.current.push(t1, t2);
      }
    }, 160);

    return () => {
      clearInterval(interval);
      timeoutsRef.current.forEach((t) => clearTimeout(t));
      timeoutsRef.current = [];
    };
  }, []);

  // Noise flicker
  useEffect(() => {
    const interval = setInterval(() => {
      setNoiseIntensity(Math.random() * 0.6 + 0.3);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[100] bg-black overflow-hidden font-mono">
      {/* Matrix Rain */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-40" />

      {/* Red Scanlines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, rgba(255,0,60,0.12) 0px, rgba(255,0,60,0.12) 1px, transparent 1px, transparent 3px)',
        }}
      />

      {/* Glitch Bars */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute left-0 right-0 pointer-events-none"
          style={{
            height: `${Math.random() * 3 + 1}px`,
            background: `linear-gradient(90deg, transparent 0%, rgba(255,0,60,0.9) 30%, rgba(0,255,255,0.9) 50%, rgba(255,0,60,0.9) 70%, transparent 100%)`,
            top: `${Math.random() * 100}%`,
            opacity: noiseIntensity,
          }}
        />
      ))}

      {/* HUD Corners */}
      <div className="absolute top-6 left-6 w-12 h-12 border-l-2 border-t-2 border-red-500/70 animate-pulse" />
      <div className="absolute top-6 right-6 w-12 h-12 border-r-2 border-t-2 border-red-500/70 animate-pulse" />
      <div className="absolute bottom-6 left-6 w-12 h-12 border-l-2 border-b-2 border-red-500/70 animate-pulse" />
      <div className="absolute bottom-6 right-6 w-12 h-12 border-r-2 border-b-2 border-red-500/70 animate-pulse" />

      {/* Content */}
      <div className="relative h-full flex flex-col justify-between p-6 md:p-12">
        {/* Top bar */}
        <div className="flex items-center justify-between text-[10px] md:text-xs uppercase tracking-[0.3em]">
          <div className="flex items-center gap-3 text-red-500">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75 animate-ping" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500" />
            </span>
            {phase === 'hacking' ? '⚡ BREACH IN PROGRESS' : '✓ RESOLVED'}
          </div>
          <div className="flex items-center gap-4 text-red-500/70">
            <span className="hidden md:inline">TARGET: ITGATE.COM</span>
            <span>|</span>
            <span>{new Date().toLocaleTimeString()}</span>
          </div>
        </div>

        {/* Center */}
        <div className="flex flex-col items-center justify-center gap-6 md:gap-10">
          <div className="relative">
            <div
              className="text-red-500 font-black text-[15vw] md:text-[10vw] leading-none tracking-tighter select-none whitespace-nowrap"
              style={{
                textShadow: `5px 0 0 rgba(0,255,255,0.7), -5px 0 0 rgba(255,0,60,0.7), 0 0 60px rgba(255,0,60,${noiseIntensity}), 0 0 120px rgba(255,0,60,${noiseIntensity * 0.5})`,
                filter: `blur(${noiseIntensity * 0.5}px)`,
              }}
            >
              {corruptHeader}
            </div>

            <div
              className="absolute top-0 left-0 text-cyan-400 font-black text-[15vw] md:text-[10vw] leading-none tracking-tighter select-none pointer-events-none"
              style={{
                opacity: 0.6,
                transform: `translate(${Math.sin(Date.now() / 100) * 8}px, ${Math.cos(Date.now() / 80) * 4}px)`,
                mixBlendMode: 'screen',
              }}
            >
              {corruptHeader}
            </div>

            <div
              className="absolute top-0 left-0 text-pink-500 font-black text-[15vw] md:text-[10vw] leading-none tracking-tighter select-none pointer-events-none"
              style={{
                opacity: 0.4,
                transform: `translate(${Math.cos(Date.now() / 90) * -6}px, ${Math.sin(Date.now() / 70) * 3}px)`,
                mixBlendMode: 'screen',
              }}
            >
              {corruptHeader}
            </div>
          </div>

          <div className="text-center space-y-3">
            <div className="text-red-500 text-base md:text-3xl font-bold uppercase tracking-[0.4em] animate-pulse">
              ⚠ UNAUTHORIZED ACCESS ⚠
            </div>
            <div className="text-red-500/70 text-[10px] md:text-sm uppercase tracking-[0.4em]">
              TRACING INTRUDER · THREAT LEVEL: CRITICAL
            </div>
          </div>

          <div className="w-full max-w-md px-4">
            <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-red-500/80 mb-2">
              <span>SYSTEM CORRUPTION</span>
              <span>{Math.floor(noiseIntensity * 100)}%</span>
            </div>
            <div className="h-1.5 bg-red-500/20 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-red-600 via-red-500 to-red-400 transition-all duration-200"
                style={{
                  width: `${noiseIntensity * 100}%`,
                  boxShadow: '0 0 20px rgba(255, 0, 60, 0.9)',
                }}
              />
            </div>
          </div>
        </div>

        {/* Bottom Terminal */}
        <div className="space-y-1 text-xs md:text-sm">
          {lines.map((line, i) => {
            // Safety check
            if (typeof line !== 'string') return null;

            const isWarning =
              line.includes('⚠') ||
              line.includes('WARNING') ||
              line.includes('CRITICAL');
            const isSuccess =
              line.includes('GRANTED') || line.includes('WELCOME');

            return (
              <div
                key={i}
                className={
                  isWarning
                    ? 'text-red-400 font-bold animate-pulse'
                    : isSuccess
                    ? 'text-cyan-400 font-bold'
                    : 'text-green-500'
                }
              >
                {line}
              </div>
            );
          })}

          <div className="text-green-500 flex items-center gap-2 pt-2">
            <span className="text-red-500">root@itgate</span>
            <span className="text-white">:~$</span>
            <span
              className="inline-block w-2.5 h-4 bg-green-500"
              style={{ animation: 'blinkCursor 1s steps(1) infinite' }}
            />
          </div>
        </div>
      </div>

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, transparent 25%, rgba(255,0,60,0.15) 70%, rgba(255,0,60,0.4) 100%)',
        }}
      />

      {/* Noise */}
      <div
        className="absolute inset-0 pointer-events-none mix-blend-overlay"
        style={{
          opacity: noiseIntensity * 0.15,
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
        }}
      />

      {/* Resolved Flash */}
      {phase === 'resolved' && (
        <div
          className="absolute inset-0 flex items-center justify-center z-50"
          style={{ animation: 'resolvedFlash 2400ms ease-out forwards' }}
        >
          <div className="text-center">
            <div
              className="text-cyan-400 text-[8vw] md:text-[5vw] font-black tracking-tighter"
              style={{ textShadow: '0 0 60px rgba(0,255,255,1)' }}
            >
              ✓ ACCESS GRANTED
            </div>
            <div className="mt-4 text-green-500 text-sm md:text-base uppercase tracking-[0.4em]">
              WELCOME, OPERATOR
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

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

      <div
        className="absolute inset-0 z-[1] opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(111,232,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(111,232,255,.5) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

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
// CoursesCTA — Main
// ============================================
const CoursesCTA = () => {
  const rootRef = useRef(null);
  const slidesRef = useRef(null);
  const isAnimating = useRef(false);

  const [isVisible, setIsVisible] = useState(false);
  const [stage, setStage] = useState('hacking');
  const [activeSlide, setActiveSlide] = useState(0);

  // ============ IntersectionObserver + Fallback ============
  useEffect(() => {
    const fallback = setTimeout(() => setIsVisible(true), 1500);

    const el = rootRef.current;
    if (!el) {
      return () => clearTimeout(fallback);
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          clearTimeout(fallback);
          obs.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    obs.observe(el);

    return () => {
      clearTimeout(fallback);
      obs.disconnect();
    };
  }, []);

  // ============ Pause Lenis while Events ============
  useEffect(() => {
    if (stage !== 'events') return;
    const lenis = window.__lenis;
    if (lenis) lenis.stop();

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      if (lenis) lenis.start();
      document.body.style.overflow = prevOverflow;
    };
  }, [stage]);

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
    if (stage !== 'events') return;
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
      const nextIdx = Math.min(EVENTS.length - 1, Math.max(0, activeSlide + direction));
      if (nextIdx !== activeSlide) scrollToSlide(nextIdx);
    };

    let tX = 0, tY = 0;
    const onTouchStart = (e) => {
      tX = e.touches[0].clientX;
      tY = e.touches[0].clientY;
    };
    const onTouchEnd = (e) => {
      const dx = e.changedTouches[0].clientX - tX;
      const dy = e.changedTouches[0].clientY - tY;
      const aX = Math.abs(dx), aY = Math.abs(dy);
      if (Math.max(aX, aY) < 50) return;
      if (isAnimating.current) return;
      const direction = aX > aY ? (dx < 0 ? 1 : -1) : dy < 0 ? 1 : -1;
      const nextIdx = Math.min(EVENTS.length - 1, Math.max(0, activeSlide + direction));
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
  }, [stage, activeSlide, scrollToSlide]);

  // ============ Keyboard ============
  useEffect(() => {
    if (stage !== 'events') return;
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
  }, [stage, activeSlide, scrollToSlide]);

  return (
    <section
      ref={rootRef}
      className="relative bg-void"
      style={{ minHeight: '100vh' }}
    >
      {/* HACKING */}
      {isVisible && stage === 'hacking' && (
        <HackingScreen onComplete={() => setStage('events')} />
      )}

      {/* EVENTS */}
      {stage === 'events' && (
        <>
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
              animation: 'fadeIn 800ms ease-out',
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
              {String(activeSlide + 1).padStart(2, '0')} / {String(EVENTS.length).padStart(2, '0')}
            </span>
            <button
              onClick={() => scrollToSlide(Math.min(EVENTS.length - 1, activeSlide + 1))}
              disabled={activeSlide === EVENTS.length - 1}
              className="h-11 w-11 flex items-center justify-center border border-white/20 rounded-full
                         text-white/70 hover:border-[#6FE8FF] hover:text-[#6FE8FF]
                         disabled:opacity-30 disabled:cursor-not-allowed backdrop-blur-md transition-all duration-300"
              aria-label="Next"
            >
              <ArrowRight size={15} />
            </button>
          </div>

          <div className="fixed bottom-8 right-8 z-40 hidden md:flex items-center gap-3 pointer-events-none">
            <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/40">
              Scroll
            </span>
            <ArrowRight size={14} className="text-[#6FE8FF] animate-pulse" />
          </div>
        </>
      )}

      <style>{`
        @keyframes blinkCursor {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes resolvedFlash {
          0%   { background: rgba(0,255,100,0.4); opacity: 1; }
          30%  { background: rgba(0,255,100,0.1); }
          100% { background: transparent; opacity: 1; }
        }
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