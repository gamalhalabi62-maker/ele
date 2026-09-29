import { useEffect, useRef } from 'react';

/**
 * Splits text into characters/words and reveals them on scroll.
 * variant: 'chars' | 'words' | 'lines'
 */
const SplitText = ({
  text,
  as = 'h2',
  variant = 'words',
  className = '',
  stagger = 0.04,
  duration = 1,
  delay = 0,
  start = 'top 80%',
}) => {
  const ref = useRef(null);

  useEffect(() => {
    let mounted = true;
    let ctx;

    const init = async () => {
      const SplitType = (await import('split-type')).default;
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      if (!mounted || !ref.current) return;

      const split = new SplitType(ref.current, {
        types: variant === 'chars' ? 'chars' : variant === 'lines' ? 'lines' : 'words',
      });

      const targets =
        variant === 'chars' ? split.chars :
        variant === 'lines' ? split.lines :
        split.words;

      if (!targets?.length) return;

      ctx = gsap.context(() => {
        gsap.from(targets, {
          yPercent: 110,
          opacity: 0,
          duration,
          delay,
          stagger,
          ease: 'power4.out',
          scrollTrigger: { trigger: ref.current, start },
        });
      }, ref.current);

      ScrollTrigger.refresh();
      return () => split.revert();
    };

    const t = setTimeout(init, 100);
    return () => {
      mounted = false;
      clearTimeout(t);
      ctx?.revert();
    };
  }, [text, variant, stagger, duration, delay, start]);

  const Tag = as;
  return (
    <Tag ref={ref} className={`text-mask ${className}`}>
      {text}
    </Tag>
  );
};

export default SplitText;