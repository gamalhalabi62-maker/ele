import { useEffect, useRef } from 'react';
import { BookOpen, Terminal, Award } from 'lucide-react';

const PILLARS = [
  {
    n: '01',
    icon: BookOpen,
    title: 'Learn It.',
    desc: 'Theory gives you knowledge. Foundation built on solid understanding of how things really work.',
    accent: '#6FE8FF',
  },
  {
    n: '02',
    icon: Terminal,
    title: 'Practice It.',
    desc: 'Practice gives you skills. Real labs, real tools, real scenarios — not just slides.',
    accent: '#A68BFF',
  },
  {
    n: '03',
    icon: Award,
    title: 'Master It.',
    desc: 'Beyond the certificate. Mastery comes from repetition, feedback, and pushing limits.',
    accent: '#FFB84D',
  },
];

const WhyITGate = () => {
  const rootRef = useRef(null);

  useEffect(() => {
    let mounted = true;
    let ctx;
    const init = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);
      if (!mounted || !rootRef.current) return;

      ctx = gsap.context(() => {
        gsap.from('.why-title', {
          y: 40,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.why-title',
            start: 'top 80%',
          },
        });

        gsap.from('.why-card', {
          y: 60,
          opacity: 0,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.why-grid',
            start: 'top 75%',
          },
        });
      }, rootRef.current);

      ScrollTrigger.refresh();
    };
    const t = setTimeout(init, 100);
    return () => {
      mounted = false;
      clearTimeout(t);
      ctx?.revert();
    };
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative bg-void py-24 md:py-32 overflow-hidden"
    >
      {/* subtle divider top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ink-faint/20 to-transparent" />

      <div className="container-x relative">
        {/* Header */}
        <div className="mb-16 md:mb-24 max-w-3xl">
          <span className="eyebrow mb-6 inline-flex">WHY IT GATE?</span>
          <h2 className="why-title font-sans font-light text-[2rem] md:text-[3.5rem] lg:text-[4.5rem] leading-[1] tracking-[-0.035em] text-ink">
            Because knowing isn&apos;t enough.
            <br />
            <span className="text-neon-cyan">You need to know how.</span>
          </h2>
        </div>

        {/* 3 pillars */}
        <div className="why-grid grid md:grid-cols-3 gap-px bg-ink-faint/10 border border-ink-faint/10">
          {PILLARS.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.n}
                className="why-card group relative bg-void p-8 md:p-10
                           hover:bg-white/[0.02] transition-colors duration-500"
              >
                {/* Corner number */}
                <div className="flex items-start justify-between mb-12">
                  <span
                    className="font-mono text-[10px] uppercase tracking-[0.3em]"
                    style={{ color: p.accent }}
                  >
                    {p.n}
                  </span>
                  <div
                    className="h-12 w-12 rounded-full border flex items-center justify-center
                               transition-all duration-500 group-hover:scale-110"
                    style={{
                      borderColor: `${p.accent}40`,
                      backgroundColor: `${p.accent}0A`,
                    }}
                  >
                    <Icon
                      size={20}
                      strokeWidth={1.6}
                      style={{ color: p.accent }}
                    />
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-sans font-light text-[1.75rem] md:text-[2.25rem] leading-tight tracking-tight text-ink mb-4">
                  {p.title}
                </h3>

                {/* Divider */}
                <div
                  className="h-px w-12 mb-5 transition-all duration-500 group-hover:w-20"
                  style={{ backgroundColor: p.accent }}
                />

                {/* Desc */}
                <p className="text-ink-muted text-sm md:text-base leading-relaxed font-light">
                  {p.desc}
                </p>

                {/* Bottom-right corner accent */}
                <div
                  className="absolute bottom-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-100
                             transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at bottom right, ${p.accent}20, transparent 70%)`,
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* Bottom statement */}
        <div className="mt-14 text-center">
          <p className="font-mono text-[11px] md:text-xs uppercase tracking-[0.35em] text-ink-faint">
            Learn It · Practice It · Master It
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyITGate;