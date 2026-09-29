import { useRef, useEffect } from 'react';

const AnimatedDivider = ({ variant = 'marquee', text = 'TALIM ACADEMY', accent = '#B8894A' }) => {
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
        gsap.fromTo(rootRef.current, { yPercent: 15 }, {
          yPercent: -15, ease: 'none',
          scrollTrigger: { trigger: rootRef.current, start: 'top bottom', end: 'bottom top', scrub: 1 },
        });
      }, rootRef.current);

      ScrollTrigger.refresh();
    };
    const t = setTimeout(init, 100);
    return () => { mounted = false; clearTimeout(t); ctx?.revert(); };
  }, []);

  if (variant === 'marquee') {
    return (
      <div ref={rootRef} className="relative bg-deep overflow-hidden py-10 border-y border-white/5">
        <div className="marquee-track items-center gap-16 whitespace-nowrap">
          {[...Array(2)].map((_, k) => (
            <div key={k} className="flex items-center gap-16">
              {[...Array(4)].map((_, i) => (
                <span key={i} className="flex items-center gap-16">
                  <span className="text-4xl md:text-6xl font-serif font-light uppercase tracking-[0.15em] text-white/[0.06]">
                    {text}
                  </span>
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: accent }} />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (variant === 'diagonal') {
    return (
      <div ref={rootRef} className="relative h-24 bg-deep overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-deep via-deep-soft to-deep"
             style={{ clipPath: 'polygon(0 40%, 100% 0, 100% 60%, 0 100%)' }} />
        <div className="absolute inset-x-0 top-1/2 h-px"
             style={{
               background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
               clipPath: 'polygon(0 40%, 100% 0, 100% 60%, 0 100%)',
             }} />
      </div>
    );
  }

  if (variant === 'dots') {
    return (
      <div ref={rootRef} className="relative bg-deep py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06]"
             style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
      </div>
    );
  }

  return (
    <div ref={rootRef} className="relative bg-deep">
      <svg className="w-full h-24 md:h-32" viewBox="0 0 1440 120" preserveAspectRatio="none">
        <path d="M0,60 C320,120 480,0 720,60 C960,120 1120,0 1440,60 L1440,120 L0,120 Z" fill="#111116" />
      </svg>
    </div>
  );
};

export default AnimatedDivider;