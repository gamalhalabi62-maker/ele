import { useEffect, useRef } from 'react';

export const useRevealOnScroll = ({
  selector,
  from = 'bottom',
  stagger = 0.12,
  duration = 0.9,
  delay = 0,
  once = true,
} = {}) => {
  const ref = useRef(null);

  useEffect(() => {
    let mounted = true;
    let ctx;

    const init = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);
      if (!mounted || !ref.current) return;

      const targets = selector ? ref.current.querySelectorAll(selector) : ref.current.children;
      if (!targets?.length) return;

      const preset = {
        bottom: { y: 60, opacity: 0 },
        left:   { x: -60, opacity: 0 },
        right:  { x: 60, opacity: 0 },
        scale:  { scale: 0.9, opacity: 0 },
      }[from];

      ctx = gsap.context(() => {
        gsap.from(targets, {
          ...preset,
          duration, stagger, delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 80%',
            toggleActions: once ? 'play none none none' : 'play none none reverse',
          },
        });
      }, ref.current);

      ScrollTrigger.refresh();
    };

    const t = setTimeout(init, 100);
    return () => {
      mounted = false;
      clearTimeout(t);
      ctx?.revert();
    };
  }, [selector, from, stagger, duration, delay, once]);

  return ref;
};

export default useRevealOnScroll;