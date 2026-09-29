import { useRef, useEffect } from 'react';

/**
 * A section that rotates on the X and Z axes as it enters the viewport.
 * Creates a 3D "rolling / tumbling" feel between sections.
 *
 * variant:
 *  - 'tilt-down': rotates as if falling toward the user (rotateX positive)
 *  - 'tilt-up': rotates as if rising away (rotateX negative)
 *  - 'tilt-left': rotates around Z to the left
 *  - 'tilt-right': rotates around Z to the right
 *  - 'roll': combines rotateX + rotateZ
 */
const SkewedSection3D = ({
  children,
  variant = 'tilt-down',
  intensity = 12,
  className = '',
  bg = 'bg-deep',
  perspective = 1400,
}) => {
  const rootRef = useRef(null);
  const innerRef = useRef(null);

  useEffect(() => {
    let mounted = true;
    let ctx;

    const init = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);
      if (!mounted || !rootRef.current || !innerRef.current) return;

      // Choose rotation axes based on variant
      const presets = {
        'tilt-down':   { rotateX: intensity,  rotateZ: 0,  y: 80 },
        'tilt-up':     { rotateX: -intensity, rotateZ: 0,  y: 80 },
        'tilt-left':   { rotateX: 0,          rotateZ: -intensity, y: 80 },
        'tilt-right':  { rotateX: 0,          rotateZ: intensity,  y: 80 },
        'roll':        { rotateX: intensity * 0.6, rotateZ: -intensity * 0.4, y: 60 },
      };
      const p = presets[variant] || presets['tilt-down'];

      ctx = gsap.context(() => {
        // Content starts tilted + slightly lower, then settles as user scrolls
        gsap.fromTo(
          innerRef.current,
          {
            rotateX: p.rotateX,
            rotateZ: p.rotateZ,
            y: p.y,
            scale: 0.94,
            transformOrigin: 'center top',
          },
          {
            rotateX: 0,
            rotateZ: 0,
            y: 0,
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: rootRef.current,
              start: 'top bottom',
              end: 'top 40%',
              scrub: 1,
            },
          }
        );

        // Fade slightly when leaving top
        gsap.to(innerRef.current, {
          opacity: 0.5,
          scale: 0.96,
          ease: 'none',
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'bottom 60%',
            end: 'bottom top',
            scrub: 1,
          },
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
  }, [variant, intensity]);

  return (
    <section
      ref={rootRef}
      className={`relative overflow-hidden ${className}`}
      style={{
        perspective: `${perspective}px`,
        perspectiveOrigin: 'center top',
      }}
    >
      <div
        ref={innerRef}
        className={`${bg} relative py-24 md:py-32 will-change-transform`}
        style={{
          transformStyle: 'preserve-3d',
          backfaceVisibility: 'hidden',
        }}
      >
        {/* Top fade edge — gives "falling" effect */}
        <div
          className="absolute inset-x-0 -top-1 h-32 pointer-events-none"
          style={{
            background: `linear-gradient(to bottom, rgba(11,11,15,0.9), transparent)`,
          }}
        />

        {children}

        {/* Bottom fade edge */}
        <div
          className="absolute inset-x-0 -bottom-1 h-32 pointer-events-none"
          style={{
            background: `linear-gradient(to top, rgba(11,11,15,0.9), transparent)`,
          }}
        />
      </div>
    </section>
  );
};

export default SkewedSection3D;