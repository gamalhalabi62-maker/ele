import { useEffect, useRef } from 'react';

const Philosophy = () => {
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
        gsap.from('.phil-left', {
          x: -60,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top 70%',
          },
        });
        gsap.from('.phil-right > *', {
          x: 60,
          opacity: 0,
          duration: 1,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top 70%',
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
      {/* Divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ink-faint/20 to-transparent" />

      <div className="container-x relative">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* LEFT — Visual: Theory vs Practice */}
          <div className="phil-left relative">
            <div className="relative aspect-[4/5] max-w-md mx-auto lg:mx-0">
              {/* THEORY side (top, faded) */}
              <div className="absolute top-0 left-0 w-[65%] aspect-square bg-ink-faint/[0.04]
                              border border-ink-faint/15 flex items-center justify-center">
                <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-ink-faint/60">
                  THEORY
                </span>
              </div>

              {/* PRACTICE side (bottom, glowing) */}
              <div className="absolute bottom-0 right-0 w-[70%] aspect-square bg-neon-cyan/[0.04]
                              border border-neon-cyan/40 flex items-center justify-center
                              shadow-[0_0_60px_rgba(111,232,255,0.15)]">
                <div className="text-center">
                  <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-neon-cyan block mb-2">
                    PRACTICE
                  </span>
                  <span className="font-sans font-light text-4xl md:text-5xl text-ink">
                    90%
                  </span>
                </div>
              </div>

              {/* Central connector */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                              w-12 h-12 rounded-full bg-void border border-ink-faint/30
                              flex items-center justify-center z-10">
                <span className="text-neon-cyan text-xs">→</span>
              </div>
            </div>

            {/* Caption */}
            <div className="mt-8 text-center lg:text-left font-mono text-[10px] uppercase tracking-[0.3em] text-ink-faint">
              // Theory vs. Practice
            </div>
          </div>

          {/* RIGHT — Copy */}
          <div className="phil-right">
            <span className="eyebrow mb-6 inline-flex">THE PHILOSOPHY</span>

            <h2 className="font-sans font-light text-[2rem] md:text-[3rem] lg:text-[3.75rem] leading-[1.05] tracking-[-0.03em] text-ink mb-8">
              Theory gives you knowledge.
              <br />
              <span className="text-neon-cyan">Practice gives you skills.</span>
            </h2>

            <div className="space-y-4 text-ink-muted text-base md:text-lg font-light leading-relaxed max-w-lg">
              <p>
                Real skills. Real practice. Real projects.
              </p>
              <p>
                We don&apos;t teach you what to think — we teach you how to build.
                Every module is hands-on. Every lesson ends with something you
                can actually show.
              </p>
            </div>

            {/* Quote */}
            <div className="mt-10 border-l-2 border-neon-cyan/40 pl-6 max-w-lg">
              <p className="font-sans font-light text-xl md:text-2xl text-ink leading-relaxed">
                &ldquo;Training designed for the real world.&rdquo;
              </p>
            </div>

            {/* Meta */}
            <div className="mt-10 flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.3em] text-ink-faint">
              <span className="h-px w-12 bg-neon-cyan/40" />
              <span>CHAPTER 02</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Philosophy;