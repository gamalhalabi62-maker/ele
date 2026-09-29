import { useEffect, useRef } from 'react';

export const usePinnedHorizontal = ({
  cardSelector = '.h-card',
  extraSpace = 100,
  onProgress,
} = {}) => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    let mounted = true;
    let ctx;
    let cleanup = [];

    const init = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      if (!mounted) return;
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      await new Promise((r) => setTimeout(r, 250));
      const amount = () => Math.max(0, track.scrollWidth - window.innerWidth + extraSpace);
      if (amount() <= 0) return;

      ctx = gsap.context(() => {
        const tw = gsap.to(track, {
          x: () => -amount(),
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${amount()}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => onProgress?.(self.progress),
          },
        });

        gsap.from(cardSelector, {
          opacity: 0, y: 80, duration: 0.8, stagger: 0.08, ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 60%', toggleActions: 'play none none reverse' },
        });

        cleanup.push(() => tw.scrollTrigger?.kill());
      }, section);

      ScrollTrigger.refresh();
    };

    const t = setTimeout(init, 100);
    return () => {
      mounted = false;
      clearTimeout(t);
      cleanup.forEach((f) => f());
      ctx?.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { sectionRef, trackRef };
};

export default usePinnedHorizontal;