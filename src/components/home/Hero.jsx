import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import HeroVideoBackground from './HeroVideoBackground';
import { ArrowDown, Terminal, ShieldCheck, Zap } from 'lucide-react';

const HERO_VIDEOS = [
  {
    id: 1,
    src: '/videos/it.MOV',
    eyebrow: '01 · CYBER OPERATIONS',
    headline: 'Your Gate To The World',
    sub: 'Where strategy meets execution — full-spectrum cyber operations.',
    accent: 'cyan',
  },

];

const ACCENT_COLORS = {
  cyan:   '#6FE8FF',
  red:    '#FF6B6B',
  green:  '#8FE9A8',
  pink:   '#FF8FC7',
  purple: '#A68BFF',
  amber:  '#FFB84D',
};

// ============================================
// HERO
// ============================================
const Hero = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [sceneIndex, setSceneIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const heroRef = useRef(null);

  const activeScene = HERO_VIDEOS[sceneIndex];
  const accentColor = ACCENT_COLORS[activeScene.accent];

  // ============ Mobile detection ============
  useEffect(() => {
    const check = () => {
      setIsMobile(
        window.matchMedia('(pointer: coarse)').matches ||
          window.innerWidth < 768
      );
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // ============ Scroll progress ============
  useEffect(() => {
    let rafId = null;

    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        if (!heroRef.current) return;
        const rect = heroRef.current.getBoundingClientRect();
        const total = window.innerHeight;
        const progress = Math.min(1, Math.max(0, -rect.top / total));
        setScrollProgress(progress);
      });
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const textOpacity = Math.max(0, 1 - scrollProgress * 2.2);
  const textY = scrollProgress * -80;
  const scrollPercent = Math.round(scrollProgress * 100);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[100svh] md:min-h-screen bg-void overflow-hidden"
    >
      {/* ═══════════════════════════════════════════
          VIDEO BACKGROUND
      ═══════════════════════════════════════════ */}
      <HeroVideoBackground
        videos={HERO_VIDEOS}
        sceneDuration={7000}
        fadeDuration={1200}
        overlay="soft"
        onSceneChange={(i) => setSceneIndex(i)}
      />

      {/* ═══════════════════════════════════════════
          MARQUEE — "IT GATE" خلف النص
      ═══════════════════════════════════════════ */}
      {/* <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-[2] overflow-hidden"
        style={{ opacity: textOpacity * 0.06 }}
      >
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
          className="flex whitespace-nowrap"
        >
          {[0, 1].map((k) => (
            <span
              key={k}
              className="font-sans font-bold text-[28vw] md:text-[18vw] leading-none
                         tracking-tighter text-white"
            >
              IT GATE ·&nbsp;
            </span>
          ))}
        </motion.div>
      </div> */}

      {/* ═══════════════════════════════════════════
          GRID PATTERN
      ═══════════════════════════════════════════ */}
      <div
        className="absolute inset-0 opacity-[0.025] md:opacity-[0.03] pointer-events-none z-[2]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(111,232,255,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(111,232,255,.4) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage:
            'radial-gradient(ellipse at center, black 30%, transparent 75%)',
          WebkitMaskImage:
            'radial-gradient(ellipse at center, black 30%, transparent 75%)',
        }}
      />

      {/* ═══════════════════════════════════════════
          SCANLINE — خط بيعبر الشاشة
      ═══════════════════════════════════════════ */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-[2]">
        <div className="absolute inset-x-0 h-40 bg-gradient-to-b from-transparent via-neon-cyan/[0.03] to-transparent animate-scan" />
      </div>

      {/* ═══════════════════════════════════════════
          MAIN CONTENT
      ═══════════════════════════════════════════ */}
      <div
        className="relative z-10 container-x min-h-[100svh] md:min-h-screen
                   flex flex-col justify-end md:justify-center
                   pt-24 pb-20 md:pt-40 md:pb-32"
        style={{
          opacity: textOpacity,
          transform: `translateY(${textY}px)`,
          transition: 'opacity 0.2s linear',
        }}
      >
        {/* ═══════ TOP BAR ═══════ */}
        <div className="absolute top-20 md:top-32 left-6 right-6 md:left-14 md:right-14">
          <div className="flex items-center justify-between font-mono text-[9px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.35em]">
            <div className="flex items-center gap-3">
              <span className="relative flex h-1.5 w-1.5 md:h-2 md:w-2">
                <span
                  className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping"
                  style={{ backgroundColor: accentColor }}
                />
                <span
                  className="relative inline-flex h-1.5 w-1.5 md:h-2 md:w-2 rounded-full"
                  style={{ backgroundColor: accentColor }}
                />
              </span>
              <span
                className="font-medium transition-colors duration-500"
                style={{ color: accentColor }}
              >
                IT GATE
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-3 text-ink-faint">
              <span>SECURE CHANNEL</span>
              <span className="h-px w-8 bg-ink-faint/40" />
              <span>v.2025</span>
            </div>
          </div>
        </div>

        {/* ═══════ SCENE CONTENT ═══════ */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeScene.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.8, ease: [0.2, 0.7, 0.3, 1] }}
            className="mb-8 md:mb-10"
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
              <span
                className="font-mono text-[9px] md:text-[10px] uppercase
                           tracking-[0.3em] md:tracking-[0.4em]"
                style={{ color: accentColor }}
              >
                {activeScene.eyebrow}
              </span>
              <span className="h-px flex-1 max-w-[80px] md:max-w-[120px] bg-ink-faint/30" />
            </div>

            {/* Headline — كلمة كلمة */}
            <h1 className="font-sans font-light text-[2.25rem] sm:text-[3.5rem] md:text-[5.5rem] lg:text-[7rem] leading-[0.95] md:leading-[0.92] tracking-[-0.04em] max-w-[16ch] text-ink">
              {activeScene.headline.split(' ').map((word, i) => (
                <span key={i} className="inline-block overflow-hidden align-bottom mr-2 md:mr-3">
                  <motion.span
                    initial={{ y: '100%', opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      delay: 0.1 + i * 0.08,
                      duration: 0.8,
                      ease: [0.2, 0.7, 0.3, 1],
                    }}
                    className="inline-block"
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </h1>

            {/* Sub */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="mt-4 md:mt-6 text-sm md:text-lg text-ink-muted
                         max-w-md md:max-w-xl leading-relaxed font-light"
            >
              {activeScene.sub}
            </motion.p>
          </motion.div>
        </AnimatePresence>

        {/* ═══════ SCENE TIMELINE ═══════ */}
        <div className="mb-8 md:mb-12 flex items-center gap-1.5 md:gap-2">
          {HERO_VIDEOS.map((v, i) => (
            <div
              key={v.id}
              className="h-px transition-all duration-500"
              style={{
                width: i === sceneIndex
                  ? isMobile ? '32px' : '48px'
                  : isMobile ? '10px' : '16px',
                backgroundColor:
                  i === sceneIndex
                    ? ACCENT_COLORS[v.accent]
                    : 'rgba(255,255,255,0.15)',
                boxShadow:
                  i === sceneIndex
                    ? `0 0 12px ${ACCENT_COLORS[v.accent]}`
                    : 'none',
              }}
            />
          ))}
          <span className="ml-2 md:ml-3 font-mono text-[9px] md:text-[10px] text-ink-faint">
            {String(sceneIndex + 1).padStart(2, '0')}/
            {String(HERO_VIDEOS.length).padStart(2, '0')}
          </span>
        </div>

        {/* ═══════ CTAs ═══════ */}
        <div className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4">
          <Link
            to="/courses"
            className="btn-primary font-mono relative overflow-hidden group
                       w-full sm:w-auto justify-center"
          >
            <span className="absolute inset-0 -translate-x-full
                             bg-gradient-to-r from-transparent via-void/20 to-transparent
                             group-hover:translate-x-full transition-transform duration-1000" />
            <Terminal size={13} className="relative z-10" />
            <span className="relative z-10">Our Courses</span>
          </Link>
          <Link
            to="/about"
            className="btn-ghost font-mono w-full sm:w-auto justify-center"
          >
            <ShieldCheck size={13} />
            See our Instructors
          </Link>
        </div>

        {/* ═══════ STATS ═══════ */}
        <div className="mt-10 md:mt-20 grid grid-cols-2 md:grid-cols-4
                        gap-x-6 md:gap-x-12 gap-y-5 md:gap-y-8 max-w-3xl">
          {[
            { k: '10,000', v: 'OPERATORS' },
            { k: '200',    v: 'MODULES' },
            { k: '50',     v: 'MENTORS' },
            { k: '99.9',   v: 'UPTIME %' },
          ].map((s) => (
            <div
              key={s.v}
              className="border-t border-ink-faint/30 pt-3 md:pt-4 group cursor-default"
            >
              <div className="font-mono text-xl md:text-3xl text-ink font-light
                              group-hover:text-neon-cyan transition-colors duration-500">
                {s.k}
              </div>
              <div className="text-[8px] md:text-[9px] font-mono uppercase
                              tracking-[0.3em] md:tracking-[0.35em] text-ink-faint mt-1.5 md:mt-2">
                {s.v}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          BOTTOM-LEFT — NOW PLAYING
      ═══════════════════════════════════════════ */}
      <div
        className="hidden lg:flex absolute bottom-10 left-10 z-10 flex-col gap-2 pointer-events-none"
        style={{ opacity: textOpacity }}
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.35em] text-ink-faint">
          NOW PLAYING
        </span>
        <span
          className="font-mono text-[10px] uppercase tracking-[0.3em] transition-colors duration-500"
          style={{ color: accentColor }}
        >
          {activeScene.eyebrow}
        </span>
      </div>

      {/* ═══════════════════════════════════════════
          SCROLL INDICATOR
      ═══════════════════════════════════════════ */}
      <div
        className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-10
                   flex flex-col items-center gap-2 md:gap-3"
        style={{ opacity: textOpacity }}
      >
        <span className="text-[8px] md:text-[9px] font-mono uppercase
                         tracking-[0.3em] md:tracking-[0.35em] text-ink-faint">
          SCROLL — {String(scrollPercent).padStart(2, '0')}%
        </span>
        <div className="relative h-8 md:h-12 w-px bg-ink-faint/20 overflow-hidden">
          <div
            className="absolute top-0 left-0 w-full bg-gradient-to-b from-neon-cyan to-transparent"
            style={{
              height: `${scrollProgress * 100}%`,
              transition: 'height 0.15s linear',
            }}
          />
        </div>
        <ArrowDown
          size={10}
          className="md:hidden text-neon-cyan/60 animate-pulse"
        />
        <ArrowDown
          size={12}
          className="hidden md:block text-neon-cyan/60 animate-pulse"
        />
      </div>

      {/* ═══════════════════════════════════════════
          HUD CORNERS
      ═══════════════════════════════════════════ */}
      <div className="absolute top-20 md:top-28 left-4 md:left-10 w-5 md:w-8 h-5 md:h-8
                      border-l border-t border-neon-cyan/25 pointer-events-none z-[3]" />
      <div className="absolute top-20 md:top-28 right-4 md:right-10 w-5 md:w-8 h-5 md:h-8
                      border-r border-t border-neon-cyan/25 pointer-events-none z-[3]" />
      <div className="absolute bottom-4 md:bottom-10 right-4 md:right-10 w-5 md:w-8 h-5 md:h-8
                      border-r border-b border-neon-cyan/25 pointer-events-none z-[3]" />

      {/* ═══════════════════════════════════════════
          NOISE GRAIN
      ═══════════════════════════════════════════ */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035] md:opacity-[0.04]
                   mix-blend-overlay z-[3]"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
        }}
      />

      {/* ═══════════════════════════════════════════
          VIGNETTE
      ═══════════════════════════════════════════ */}
      <div
        className="absolute inset-0 pointer-events-none z-[3]"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 35%, rgba(6,7,11,0.6) 100%)',
        }}
      />
    </section>
  );
};

export default Hero;