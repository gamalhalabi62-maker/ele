import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const MARQUEE_ITEMS = [
  'REAL LABS',
  'HANDS-ON',
  'MENTORSHIP',
  'LIVE PROJECTS',
  'COMMUNITY',
  'CAREER SUPPORT',
];

const BeyondClassroom = () => {
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
        gsap.from('.beyond-title', {
          y: 60,
          opacity: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.beyond-title',
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
      className="relative bg-void py-32 md:py-40 overflow-hidden"
    >
      {/* Divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ink-faint/20 to-transparent" />

      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                      h-[500px] w-[800px] bg-gold/[0.04] blur-[160px] rounded-full pointer-events-none" />

      <div className="container-x relative">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="eyebrow mb-6 inline-flex justify-center">BEYOND THE CLASSROOM</span>

          <h2 className="beyond-title font-sans font-light text-[2rem] md:text-[3.5rem] lg:text-[4.5rem]
                         leading-[1] tracking-[-0.035em] text-ink">
            Your journey doesn&apos;t end with a{' '}
            <span className="text-gold italic">certificate.</span>
            <br />
            It starts with your <span className="text-neon-cyan">skills.</span>
          </h2>

          <p className="mt-8 text-base md:text-lg text-ink-muted font-light max-w-xl mx-auto">
            Learn beyond the classroom. Every tool, every technique, every scenario —
            designed to make you job-ready from day one.
          </p>
        </div>

        {/* Marquee — words flowing */}
        <div className="relative py-8 border-y border-ink-faint/15 overflow-hidden">
          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            className="flex whitespace-nowrap items-center gap-16"
          >
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
              <div key={i} className="flex items-center gap-16">
                <span className="font-sans font-light text-3xl md:text-5xl text-ink/30 hover:text-ink/80 transition-colors duration-500 uppercase tracking-tight">
                  {item}
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-neon-cyan/40" />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Bottom stat row */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { k: '500+', v: 'LAB HOURS' },
            { k: '120+', v: 'REAL PROJECTS' },
            { k: '24/7', v: 'COMMUNITY' },
            { k: '1:1',  v: 'MENTORSHIP' },
          ].map((s) => (
            <div key={s.v} className="text-center border-t border-ink-faint/20 pt-6">
              <div className="font-mono text-2xl md:text-3xl text-ink font-light">
                {s.k}
              </div>
              <div className="mt-2 font-mono text-[9px] uppercase tracking-[0.3em] text-ink-faint">
                {s.v}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BeyondClassroom;