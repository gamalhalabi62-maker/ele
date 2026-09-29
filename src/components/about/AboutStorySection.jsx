import { useEffect, useRef, useState } from 'react';
import GlobeScene from '../three/GlobeScene';

// ============================================
// STAGES — كل مرحلة بمحتواها
// ============================================
const STAGES = [
  // ─────────── 01 · GATEWAY
  {
    chapter: 'CHAPTER 01',
    label: 'ABOUT IT GATE',
    title: 'Your Gateway\nto the World\nof IT.',
    sub: 'Learn practical skills. Build real projects. Prepare for what\'s next.',
    accent: '#6FE8FF',
    type: 'title', // عرض كـ عنوان ضخم
  },

  // ─────────── 02 · WHY IT GATE
  {
    chapter: 'CHAPTER 02',
    label: 'WHY IT GATE?',
    title: 'Because knowing\nisn\'t enough.\nYou need to know how.',
    sub: 'Real skills. Real practice. Real projects.',
    accent: '#A68BFF',
    type: 'title',
    bullets: [
      { n: '01', label: 'Learn It.', desc: 'Theory gives you knowledge.' },
      { n: '02', label: 'Practice It.', desc: 'Practice gives you skills.' },
      { n: '03', label: 'Master It.', desc: 'Repetition. Feedback. Mastery.' },
    ],
  },

  // ─────────── 03 · PHILOSOPHY
  {
    chapter: 'CHAPTER 03',
    label: 'THE PHILOSOPHY',
    title: 'Theory gives\nyou knowledge.\nPractice gives you skills.',
    sub: 'Training designed for the real world.',
    accent: '#E8D5A0',
    type: 'split', // عرض نص على يسار + split stats على يمين
    splitData: { theory: 10, practice: 90 },
  },

  // ─────────── 04 · BEYOND CLASSROOM
  {
    chapter: 'CHAPTER 04',
    label: 'BEYOND THE CLASSROOM',
    title: 'Your journey\ndoesn\'t end with\na certificate.',
    sub: 'It starts with your skills. Learn beyond the classroom.',
    accent: '#FF8FC7',
    type: 'stats',
    stats: [
      { k: '500+', v: 'LAB HOURS' },
      { k: '120+', v: 'REAL PROJECTS' },
      { k: '24/7', v: 'COMMUNITY' },
      { k: '1:1',  v: 'MENTORSHIP' },
    ],
  },

  // ─────────── 05 · FUTURE
  {
    chapter: 'CHAPTER 05',
    label: 'WHAT\'S NEXT',
    title: 'Upgrade Your Skills.\nUnlock New\nPossibilities.',
    sub: 'Choose your path. Build your expertise. Your future in IT starts here.',
    accent: '#6FE8FF',
    type: 'cta', // مع أزرار
  },
];

// ============================================
// SECTION
// ============================================
const AboutStorySection = () => {
  const rootRef = useRef(null);
  const [progress, setProgress] = useState(0);

  // Track scroll
  useEffect(() => {
    const onScroll = () => {
      if (!rootRef.current) return;
      const rect = rootRef.current.getBoundingClientRect();
      const total = rootRef.current.offsetHeight - window.innerHeight;
      const p = Math.min(1, Math.max(0, -rect.top / total));
      setProgress(p);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Current stage based on progress
  const stageIndex = Math.min(
    STAGES.length - 1,
    Math.floor(progress * STAGES.length)
  );
  const activeStage = STAGES[stageIndex];
  const stageProgress = (progress * STAGES.length) - stageIndex; // 0..1

  return (
    <section
      ref={rootRef}
      className="relative bg-void"
      style={{ height: `${STAGES.length * 100}vh` }}
    >
      {/* ===== Sticky viewport ===== */}
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* ===== 3D Globe (color changes per stage) ===== */}
        <div className="absolute inset-0 z-0 opacity-80 transition-opacity duration-700">
          <GlobeScene color={activeStage.accent} />
        </div>

        {/* ===== Radial gradient ===== */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 75% 50%, transparent 25%, rgba(6,7,11,0.7) 55%, #06070B 85%)',
          }}
        />

        {/* ===== Grid ===== */}
        <div
          className="absolute inset-0 z-[2] opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(111,232,255,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(111,232,255,.4) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />

        {/* ===== Content ===== */}
        <div className="relative z-10 h-full flex items-center">
          <div className="container-x w-full">
            <div className="grid lg:grid-cols-12 gap-8 items-center">

              <div className="lg:col-span-7 max-w-3xl">

                {/* ===== Top bar ===== */}
                <div className="mb-12 flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-[10px] uppercase tracking-[0.4em]">
                  <span
                    className="flex items-center gap-2.5 transition-colors duration-700"
                    style={{ color: activeStage.accent }}
                  >
                    <span className="relative flex h-2 w-2">
                      <span
                        className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping"
                        style={{ backgroundColor: activeStage.accent }}
                      />
                      <span
                        className="relative inline-flex h-2 w-2 rounded-full"
                        style={{ backgroundColor: activeStage.accent }}
                      />
                    </span>
                    <span>{activeStage.chapter}</span>
                  </span>
                  <span className="h-px w-16 bg-ink-faint/40" />
                  <span className="text-ink-faint">{activeStage.label}</span>
                </div>

                {/* ===== STAGE CONTENT — بتتبدل ===== */}
                <div className="relative" style={{ minHeight: '60vh' }}>
                  {STAGES.map((stage, i) => {
                    const isActive = i === stageIndex;
                    const isPast = i < stageIndex;
                    const offsetY = isActive ? 0 : isPast ? -60 : 60;
                    const opacity = isActive ? 1 : 0;

                    return (
                      <div
                        key={i}
                        className="absolute inset-0 transition-all duration-700 ease-out"
                        style={{
                          opacity,
                          transform: `translateY(${offsetY}px)`,
                          pointerEvents: isActive ? 'auto' : 'none',
                        }}
                      >
                        {/* Headline */}
                        <h2 className="font-sans font-light text-[2.5rem] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[5.5rem] leading-[0.95] tracking-[-0.04em] text-ink whitespace-pre-line">
                          {stage.title}
                        </h2>

                        {/* Sub */}
                        <p className="mt-8 text-base md:text-lg text-ink-muted max-w-lg leading-relaxed font-light">
                          {stage.sub}
                        </p>

                        {/* ====== Bullets (Stage 2) ====== */}
                        {stage.type === 'title' && stage.bullets && (
                          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl">
                            {stage.bullets.map((b) => (
                              <div
                                key={b.n}
                                className="border-t pt-4"
                                style={{ borderColor: `${stage.accent}30` }}
                              >
                                <div
                                  className="font-mono text-[10px] tracking-[0.3em] mb-2"
                                  style={{ color: stage.accent }}
                                >
                                  {b.n}
                                </div>
                                <div className="font-sans text-lg text-ink mb-1">
                                  {b.label}
                                </div>
                                <div className="text-xs text-ink-muted font-light leading-relaxed">
                                  {b.desc}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* ====== Split (Stage 3) ====== */}
                        {stage.type === 'split' && stage.splitData && (
                          <div className="mt-12 flex items-center gap-8 max-w-md">
                            <div className="flex-1">
                              <div className="font-mono text-[10px] tracking-[0.3em] text-ink-faint mb-2">
                                THEORY
                              </div>
                              <div className="h-1 bg-ink-faint/20 relative overflow-hidden">
                                <div
                                  className="absolute inset-y-0 left-0 bg-ink-faint/50 transition-all duration-1000"
                                  style={{ width: `${stage.splitData.theory}%` }}
                                />
                              </div>
                              <div className="font-mono text-2xl text-ink-faint mt-3">
                                {stage.splitData.theory}%
                              </div>
                            </div>
                            <div className="flex-1">
                              <div
                                className="font-mono text-[10px] tracking-[0.3em] mb-2"
                                style={{ color: stage.accent }}
                              >
                                PRACTICE
                              </div>
                              <div className="h-1 bg-ink-faint/20 relative overflow-hidden">
                                <div
                                  className="absolute inset-y-0 left-0 transition-all duration-1000"
                                  style={{
                                    width: `${stage.splitData.practice}%`,
                                    backgroundColor: stage.accent,
                                    boxShadow: `0 0 20px ${stage.accent}80`,
                                  }}
                                />
                              </div>
                              <div
                                className="font-mono text-2xl mt-3"
                                style={{ color: stage.accent }}
                              >
                                {stage.splitData.practice}%
                              </div>
                            </div>
                          </div>
                        )}

                        {/* ====== Stats (Stage 4) ====== */}
                        {stage.type === 'stats' && stage.stats && (
                          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl">
                            {stage.stats.map((s) => (
                              <div
                                key={s.v}
                                className="border-t pt-4"
                                style={{ borderColor: `${stage.accent}30` }}
                              >
                                <div className="font-mono text-2xl md:text-3xl text-ink font-light">
                                  {s.k}
                                </div>
                                <div className="mt-2 font-mono text-[9px] uppercase tracking-[0.3em] text-ink-faint">
                                  {s.v}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* ====== CTA (Stage 5) ====== */}
                        {stage.type === 'cta' && (
                          <div className="mt-10 flex flex-wrap gap-4">
                            <a
                              href="/courses"
                              className="inline-flex items-center gap-3 px-7 py-4 text-xs font-mono uppercase tracking-wider
                                         transition-all duration-500"
                              style={{
                                backgroundColor: stage.accent,
                                color: '#06070B',
                                boxShadow: `0 0 30px ${stage.accent}40`,
                              }}
                            >
                              Explore Courses
                              <span>→</span>
                            </a>
                            <a
                              href="/diplomas"
                              className="inline-flex items-center gap-3 px-7 py-4 text-xs font-mono uppercase tracking-wider
                                         border text-ink hover:bg-white hover:text-void transition-all duration-500"
                              style={{ borderColor: `${stage.accent}40` }}
                            >
                              View Diplomas
                              <span>↗</span>
                            </a>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* ===== Stage Timeline ===== */}
                <div className="mt-14 flex items-center gap-3">
                  {STAGES.map((s, i) => (
                    <div key={i} className="relative flex items-center">
                      <div
                        className="h-px transition-all duration-500"
                        style={{
                          width: i === stageIndex ? '48px' : '20px',
                          backgroundColor:
                            i === stageIndex ? s.accent : 'rgba(255,255,255,0.15)',
                        }}
                      />
                    </div>
                  ))}
                  <span className="ml-2 font-mono text-[10px] text-ink-faint">
                    {String(stageIndex + 1).padStart(2, '0')} / {String(STAGES.length).padStart(2, '0')}
                  </span>
                </div>
              </div>

              {/* Right side empty (globe) */}
              <div className="lg:col-span-5 hidden lg:block" />
            </div>
          </div>
        </div>

        {/* ===== Corner brackets ===== */}
        <div className="absolute top-28 left-10 w-6 h-6 border-l border-t border-neon-cyan/20 pointer-events-none z-[3]" />
        <div className="absolute top-28 right-10 w-6 h-6 border-r border-t border-neon-cyan/20 pointer-events-none z-[3]" />
        <div className="absolute bottom-10 left-10 w-6 h-6 border-l border-b border-neon-cyan/20 pointer-events-none z-[3]" />
        <div className="absolute bottom-10 right-10 w-6 h-6 border-r border-b border-neon-cyan/20 pointer-events-none z-[3]" />

        {/* ===== Vertical Progress — Right ===== */}
        <div className="hidden lg:flex absolute top-1/2 right-8 -translate-y-1/2 z-10 flex-col items-center gap-4">
          <span className="font-mono text-[9px] uppercase tracking-[0.35em] text-ink-faint rotate-90 origin-center whitespace-nowrap">
            PROGRESS
          </span>
          <div className="relative h-40 w-px bg-ink-faint/20 overflow-hidden">
            <div
              className="absolute top-0 left-0 w-full transition-all duration-300"
              style={{
                height: `${progress * 100}%`,
                background: `linear-gradient(to bottom, ${activeStage.accent}, transparent)`,
              }}
            />
          </div>
          <span
            className="font-mono text-[10px] transition-colors duration-700"
            style={{ color: activeStage.accent }}
          >
            {Math.round(progress * 100)}%
          </span>
        </div>

        {/* ===== Scroll hint (only at start) ===== */}
        {progress < 0.05 && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-60">
            <span className="font-mono text-[9px] uppercase tracking-[0.35em] text-ink-faint">
              SCROLL TO EXPLORE
            </span>
            <span className="h-8 w-px bg-gradient-to-b from-neon-cyan to-transparent" />
          </div>
        )}

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

export default AboutStorySection;