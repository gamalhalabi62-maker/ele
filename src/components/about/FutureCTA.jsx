import { Link } from 'react-router-dom';
import { ArrowUpRight, Terminal } from 'lucide-react';
import { useEffect, useRef } from 'react';

const FutureCTA = () => {
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
        gsap.from('.cta-title', {
          y: 60,
          opacity: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top 70%',
          },
        });
        gsap.from('.cta-btn', {
          y: 30,
          opacity: 0,
          duration: 0.9,
          stagger: 0.12,
          delay: 0.4,
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
      className="relative bg-void py-32 md:py-44 overflow-hidden"
    >
      {/* Divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ink-faint/20 to-transparent" />

      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                      h-[600px] w-[900px] bg-neon-cyan/[0.06] blur-[180px] rounded-full pointer-events-none" />

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

      <div className="container-x relative">
        <div className="max-w-4xl mx-auto text-center">

          <span className="eyebrow mb-8 inline-flex justify-center">WHAT&apos;S NEXT</span>

          {/* Huge headline */}
          <h2 className="cta-title font-sans font-light text-[2.5rem] sm:text-[4rem] md:text-[5.5rem] lg:text-[7rem]
                         leading-[0.95] tracking-[-0.04em] text-ink">
            Upgrade Your Skills.
            <br />
            <span className="text-neon-cyan">Unlock New Possibilities.</span>
          </h2>

          <p className="mt-10 text-base md:text-xl text-ink-muted max-w-2xl mx-auto leading-relaxed font-light">
            Choose your path. Build your expertise.
          </p>

          {/* Divider */}
          <div className="mt-16 mb-10 flex items-center justify-center gap-6">
            <span className="h-px w-16 bg-ink-faint/40" />
            <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-gold">
              Your Future in IT Starts Here
            </span>
            <span className="h-px w-16 bg-ink-faint/40" />
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/courses"
              className="cta-btn btn-primary font-mono relative overflow-hidden group"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-void/20 to-transparent group-hover:translate-x-full transition-transform duration-1000" />
              <Terminal size={13} className="relative z-10" />
              <span className="relative z-10">Explore Courses</span>
            </Link>
            <Link to="/diplomas" className="cta-btn btn-ghost font-mono">
              View Diplomas
              <ArrowUpRight size={13} />
            </Link>
          </div>

          {/* Bottom meta */}
          <div className="mt-16 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 font-mono text-[10px] uppercase tracking-[0.3em] text-ink-faint">
            <span>NO CREDIT CARD REQUIRED</span>
            <span className="h-px w-8 bg-ink-faint/40" />
            <span>LIFETIME ACCESS</span>
            <span className="h-px w-8 bg-ink-faint/40" />
            <span>30-DAY GUARANTEE</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FutureCTA;