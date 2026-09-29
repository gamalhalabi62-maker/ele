import { useEffect, useRef, useState } from 'react';

// ============================================
// Scramble — حروف عشوائية بتستقر
// ============================================
const useScramble = (text, { speed = 50, startDelay = 0, enabled = true } = {}) => {
  const [displayed, setDisplayed] = useState('');
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*';
    let iteration = 0;
    let started = false;
    let interval;

    const startTimer = setTimeout(() => {
      started = true;
      interval = setInterval(() => {
        setDisplayed(
          text
            .split('')
            .map((c, i) => {
              if (c === ' ') return ' ';
              if (i < Math.floor(iteration)) return c;
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join('')
        );
        iteration += 0.4;
        if (iteration >= text.length) {
          clearInterval(interval);
          setDisplayed(text);
          setIsDone(true);
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(startTimer);
      if (interval) clearInterval(interval);
    };
  }, [text, speed, startDelay, enabled]);

  return { displayed, isDone };
};

// ============================================
// Blinking Cursor
// ============================================
const TypeCursor = ({ color = '#6FE8FF' }) => (
  <span
    className="inline-block w-[3px] h-[0.85em] ml-1"
    style={{
      backgroundColor: color,
      animation: 'blink 1s steps(1) infinite',
      verticalAlign: 'baseline',
      transform: 'translateY(0.08em)',
      boxShadow: `0 0 12px ${color}`,
    }}
  />
);

// ============================================
// Courses Hero — Netflix Style
// ============================================
const CoursesHero = ({ total = 0 }) => {
  const rootRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const line1 = useScramble('Programs &', { speed: 45, startDelay: 400, enabled: isVisible });
  const line2 = useScramble('Certifications', { speed: 45, startDelay: 1100, enabled: isVisible });
  const line3 = useScramble('that get you hired.', { speed: 35, startDelay: 2000, enabled: isVisible });

  const [showSub, setShowSub] = useState(false);
  const [showMeta, setShowMeta] = useState(false);

  useEffect(() => {
    if (line3.isDone) {
      const t1 = setTimeout(() => setShowSub(true), 300);
      const t2 = setTimeout(() => setShowMeta(true), 900);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
  }, [line3.isDone]);

  return (
    <section
      ref={rootRef}
      className="relative bg-void pt-32 md:pt-40 pb-16 md:pb-24 overflow-hidden"
    >
      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(111,232,255,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(111,232,255,.4) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
        }}
      />

      {/* Glow */}
      <div className="absolute -top-40 right-1/4 h-[500px] w-[600px] bg-[#6FE8FF]/[0.05] blur-[160px] rounded-full pointer-events-none" />

      <div className="container-x relative">

        {/* Top meta */}
        <div
          className={`mb-10 flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-[10px] uppercase tracking-[0.4em]
                     transition-all duration-700
                     ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
        >
          <span className="flex items-center gap-2.5 text-[#6FE8FF]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[#6FE8FF] opacity-75 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#6FE8FF]" />
            </span>
            CATALOG · {total} PROGRAMS
          </span>
          <span className="h-px w-16 bg-white/[0.15]" />
          <span className="text-white/40">CHOOSE YOUR PATH</span>
        </div>

        {/* Netflix Headline */}
        <h2 className="font-sans font-light text-[2.5rem] sm:text-[4rem] md:text-[5.5rem] lg:text-[6.5rem]
                       leading-[0.95] tracking-[-0.045em] text-white max-w-[18ch]"
            style={{ minHeight: '13rem' }}>
          <span className="block">
            {line1.displayed}
            {!line1.isDone && isVisible && <TypeCursor />}
          </span>
          {line1.isDone && (
            <span className="block">
              {line2.displayed}
              {!line2.isDone && <TypeCursor />}
            </span>
          )}
          {line2.isDone && (
            <span className="block">
              {line3.displayed}
              {!line3.isDone && <TypeCursor />}
            </span>
          )}
        </h2>

        {/* Subtitle */}
        <div
          className={`mt-8 max-w-2xl transition-all duration-1000 ease-out
                     ${showSub ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
        >
          <p className="text-base md:text-xl text-white/60 leading-relaxed font-light">
            Every program is built with real labs, real projects, and real industry certifications.
            <br className="hidden md:block" />
            Choose the path that shapes your career.
          </p>
        </div>

        {/* Meta bar */}
        <div
          className={`mt-14 pt-8 border-t border-white/[0.08]
                     transition-all duration-1000 ease-out
                     ${showMeta ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-6">
            {[
              { k: 'CERTIFIED', v: 'Cisco · AWS · CompTIA' },
              { k: 'LANGUAGE', v: 'Arabic · English' },
              { k: 'FORMAT', v: 'Online · Hybrid' },
              { k: 'ACCESS', v: 'Lifetime' },
            ].map((item, i) => (
              <div
                key={item.k}
                className="flex flex-col transition-all duration-700"
                style={{
                  transitionDelay: showMeta ? `${i * 120}ms` : '0ms',
                  opacity: showMeta ? 1 : 0,
                  transform: showMeta ? 'translateY(0)' : 'translateY(12px)',
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="h-1 w-1 rounded-full bg-[#6FE8FF]" />
                  <span className="font-mono text-[9px] uppercase tracking-[0.35em] text-white/40">
                    {item.k}
                  </span>
                </div>
                <span className="font-mono text-sm text-white/90">{item.v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </section>
  );
};

export default CoursesHero;