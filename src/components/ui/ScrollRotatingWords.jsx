import { useRef, useEffect } from 'react';

/**
 * Splits a headline into words and animates each word's 3D rotation on scroll.
 */
const ScrollRotatingWords = ({ text, className = '' }) => {
  const rootRef = useRef(null);

  useEffect(() => {
    let mounted = true;
    let ctx;

    const init = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      if (!mounted || !rootRef.current) return;

      const words = rootRef.current.querySelectorAll('.rw-word');

      ctx = gsap.context(() => {
        gsap.from(words, {
          rotateX: -90,
          yPercent: 100,
          opacity: 0,
          transformOrigin: '50% 100%',
          duration: 1,
          stagger: 0.08,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top 80%',
            end: 'top 40%',
            scrub: 1,
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

  const words = text.split(' ');

  return (
    <h2
      ref={rootRef}
      className={`inline-block ${className}`}
      style={{ perspective: '800px' }}
    >
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom mr-3">
          <span className="rw-word inline-block will-change-transform">{w}</span>
        </span>
      ))}
    </h2>
  );
};

export default ScrollRotatingWords;