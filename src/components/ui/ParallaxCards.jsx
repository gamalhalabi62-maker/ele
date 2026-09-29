import { useRef, useEffect, Children } from 'react';

/**
 * Wraps children and applies staggered vertical parallax to each child
 * as the section scrolls through the viewport.
 *
 * Props:
 *  - children: any React nodes (usually cards)
 *  - speedPerCard: how much each card travels vertically (in % of viewport height)
 *  - alternate: if true, cards alternate moving up/down
 *  - staggerDelay: stagger the scroll trigger start per card
 *  - className: applied to the wrapper grid
 */
const ParallaxCards = ({
  children,
  speedPerCard = 8,
  alternate = false,
  staggerDelay = 0.05,
  className = '',
}) => {
  const rootRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    let mounted = true;
    let ctx;

    const init = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      if (!mounted || !rootRef.current) return;

      const items = rootRef.current.querySelectorAll('.pc-item');
      itemsRef.current = items;

      if (!items.length) return;

      ctx = gsap.context(() => {
        items.forEach((el, i) => {
          // Direction: alternate up/down if requested
          const dir = alternate && i % 2 === 1 ? 1 : -1;

          // Speed slightly varies per card for organic feel
          const speed = speedPerCard * (1 + i * 0.08);

          gsap.fromTo(
            el,
            { yPercent: dir * speed },
            {
              yPercent: -dir * speed,
              ease: 'none',
              scrollTrigger: {
                trigger: rootRef.current,
                start: `top bottom+=${i * staggerDelay * 100}`,
                end: 'bottom top',
                scrub: 1,
              },
            }
          );
        });
      }, rootRef.current);

      ScrollTrigger.refresh();
    };

    const t = setTimeout(init, 150);

    return () => {
      mounted = false;
      clearTimeout(t);
      ctx?.revert();
    };
  }, [speedPerCard, alternate, staggerDelay]);

  return (
    <div ref={rootRef} className={className}>
      {Children.map(children, (child, i) => (
        <div
          key={i}
          className="pc-item will-change-transform"
          style={{ transform: 'translateZ(0)' }}
        >
          {child}
        </div>
      ))}
    </div>
  );
};

export default ParallaxCards;