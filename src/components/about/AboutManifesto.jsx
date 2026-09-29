import { useEffect, useRef, useState } from 'react';
import GlobeScene from '../three/GlobeScene';

// Stages — النصوص اللي بتتبدل مع الـ scroll
const STAGES = [
  {
    chapter: 'CHAPTER 01',
    label: 'ABOUT IT GATE',
    title: 'Your Gateway\nto the World\nof IT.',
    sub: 'Learn practical skills. Build real projects. Prepare for what\'s next.',
  },
  {
    chapter: 'CHAPTER 02',
    label: 'THE MISSION',
    title: 'Theory gives\nyou knowledge.\nPractice gives you skills.',
    sub: 'Every module ends with something you can actually show.',
  },
  {
    chapter: 'CHAPTER 03',
    label: 'THE PROMISE',
    title: 'Your journey\ndoesn\'t end with\na certificate.',
    sub: 'It starts with your skills. Choose your path. Build your expertise.',
  },
];

// Typing effect component
const TypingText = ({ text, delay = 0, speed = 45 }) => {
  const [display, setDisplay] = useState('');
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setStarted(true), delay);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const interval = setInterval(() => {
      setDisplay(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [started, text, speed]);

  return (
    <span ref={ref}>
      {display}
      {display.length < text.length && (
        <span className="inline-block w-[2px] h-[1em] bg-neon-cyan ml-0.5 animate-pulse align-middle" />
      )}
    </span>
  );
};

const AboutManifesto = () => {
  const rootRef = useRef(null);
  const [activeStage, setActiveStage] = useState(0);

  // Track scroll within the sticky container
  useEffect(() => {
    const onScroll = () => {
      if (!rootRef.current) return;
      const rect = rootRef.current.getBoundingClientRect();
      const total = rootRef.current.offsetHeight - window.innerHeight;
      const progress = Math.min(1, Math.max(0, -rect.top / total));
      const stageIdx = Math.min(
        STAGES.length - 1,
        Math.floor(progress * STAGES.length)
      );
      setActiveStage(stageIdx);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const activeData = STAGES[activeStage];

  return (
    // Container height = 3 stages × 100vh → النص بيتنقل
    <section
      ref={rootRef}
      className="relative bg-void"
      style={{ height: `${STAGES.length * 100}vh` }}
    >
      {/* ===== Sticky viewport ===== */}
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* ===== 3D Globe background ===== */}
        <div className="absolute inset-0 z-0 opacity-80">
          <GlobeScene />
        </div>

        {/* ===== Radial gradient (focus on globe) ===== */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 75% 50%, transparent 25%, rgba(6,7,11,0.7) 55%, #06070B 85%)',
          }}
        />

        {/* ===== Grid overlay ===== */}
        <div
          className="absolute inset-0 z-[2] opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(111,232,255,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(111,232,255,.4) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />

        {/* ===== Content — left column ===== */}
        <div className="relative z-10 h-full flex items-center">
          <div className="container-x w-full">

            {/* Grid: left text, right globe space */}
            <div className="grid lg:grid-cols-12 gap-8 items-center">

              <div className="lg:col-span-7 max-w-3xl">

                {/* Top bar */}
                <div className="mb-14 flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-[10px] uppercase tracking-[0.4em]">
                  <span className="flex items-center gap-2.5 text-neon-cyan">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full rounded-full bg-neon-cyan opacity-75 animate-ping" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-neon-cyan" />
                    </span>
                    <span>{activeData.chapter}</span>
                  </span>
                  <span className="h-px w-16 bg-ink-faint/40" />
                  <span className="text-ink-faint">{activeData.label}</span>
                </div>

                {/* Dynamic headline — keyed by activeStage */}
                <div className="relative" style={{ minHeight: '48vh' }}>
                  {STAGES.map((stage, i) => (
                    <div
                      key={i}
                      className="absolute inset-0 transition-all duration-700"
                      style={{
                        opacity: i === activeStage ? 1 : 0,
                        transform: `translateY(${
                          i === activeStage ? 0 : i < activeStage ? -40 : 40
                        }px)`,
                        pointerEvents: i === activeStage ? 'auto' : 'none',
                      }}
                    >
                      <h2 className="font-sans font-light text-[2.75rem] sm:text-[4rem] md:text-[5.5rem] lg:text-[6.5rem] leading-[0.95] tracking-[-0.04em] text-ink whitespace-pre-line">
                        {stage.title.split('\n').map((line, j) => (
                          <span key={j} className="block overflow-hidden">
                            <span
                              className={`inline-block transition-all duration-700 ${
                                i === activeStage
                                  ? 'translate-y-0 opacity-100'
                                  : 'translate-y-full opacity-0'
                              }`}
                              style={{
                                transitionDelay: `${j * 80}ms`,
                              }}
                            >
                              {line.includes('IT') ? (
                                <>
                                  of{' '}
                                  <span className="italic text-neon-cyan">
                                    IT.
                                  </span>
                                </>
                              ) : line.includes('skills') ? (
                                line.split('skills').map((part, k) => (
                                  <span key={k}>
                                    {part}
                                    {k === 0 && (
                                      <span className="text-neon-cyan">skills</span>
                                    )}
                                  </span>
                                ))
                              ) : line.includes('certificate') ? (
                                line.split('certificate').map((part, k) => (
                                  <span key={k}>
                                    {part}
                                    {k === 0 && (
                                      <span className="italic text-gold">
                                        certificate.
                                      </span>
                                    )}
                                  </span>
                                ))
                              ) : (
                                line
                              )}
                            </span>
                          </span>
                        ))}
                      </h2>

                      <p className="mt-8 text-base md:text-lg text-ink-muted max-w-lg leading-relaxed font-light">
                        {stage.sub}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Stage indicator */}
                <div className="mt-12 flex items-center gap-4">
                  {STAGES.map((_, i) => (
                    <div
                      key={i}
                      className="h-px transition-all duration-500"
                      style={{
                        width: i === activeStage ? '48px' : '16px',
                        backgroundColor:
                          i === activeStage
                            ? '#6FE8FF'
                            : 'rgba(255,255,255,0.15)',
                      }}
                    />
                  ))}
                  <span className="ml-2 font-mono text-[10px] text-ink-faint">
                    0{activeStage + 1} / 0{STAGES.length}
                  </span>
                </div>
              </div>

              {/* Right column — empty (globe shows through) */}
              <div className="lg:col-span-5 hidden lg:block" />
            </div>
          </div>
        </div>

        {/* ===== Corner brackets (HUD) ===== */}
        <div className="absolute top-28 left-10 w-6 h-6 border-l border-t border-neon-cyan/20 pointer-events-none z-[3]" />
        <div className="absolute top-28 right-10 w-6 h-6 border-r border-t border-neon-cyan/20 pointer-events-none z-[3]" />
        <div className="absolute bottom-10 left-10 w-6 h-6 border-l border-b border-neon-cyan/20 pointer-events-none z-[3]" />
        <div className="absolute bottom-10 right-10 w-6 h-6 border-r border-b border-neon-cyan/20 pointer-events-none z-[3]" />

        {/* ===== Scroll hint ===== */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
          <span className="font-mono text-[9px] uppercase tracking-[0.35em] text-ink-faint">
            SCROLL
          </span>
          <span className="h-8 w-px bg-gradient-to-b from-neon-cyan to-transparent" />
        </div>

        {/* ===== Noise ===== */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04] mix-blend-overlay z-[3]"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
          }}
        />
      </div>
    </section>
  );
};

export default AboutManifesto;