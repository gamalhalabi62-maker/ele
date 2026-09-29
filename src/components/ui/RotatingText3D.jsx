import { useRef, useEffect } from 'react';

/**
 * Renders a set of words arranged on a rotating cylinder in 3D space.
 * The whole ring spins as the user scrolls.
 */
const RotatingText3D = ({
  words = ['CREATE', 'DESIGN', 'BUILD', 'DEPLOY', 'SCALE'],
  radius = 300,
  duration = 30,
  reverse = false,
}) => {
  const ringRef = useRef(null);

  useEffect(() => {
    let rafId;
    const ring = ringRef.current;
    if (!ring) return;

    let angle = 0;
    const speed = (reverse ? -1 : 1) * (360 / duration / 60);
    const step = words.length ? 360 / words.length : 0;

    const tick = () => {
      angle = (angle + speed) % 360;
      ring.style.transform = `rotateY(${angle}deg)`;
      rafId = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(rafId);
  }, [duration, reverse, words.length]);

  const step = words.length ? 360 / words.length : 0;

  return (
    <div
      className="relative w-full flex items-center justify-center pointer-events-none select-none"
      style={{ perspective: '1200px', height: 220 }}
    >
      <div
        ref={ringRef}
        className="relative will-change-transform"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {words.map((word, i) => (
          <span
            key={i}
            className="absolute left-1/2 top-1/2 text-6xl md:text-8xl font-bold tracking-tight
                       whitespace-nowrap"
            style={{
              transform: `translate(-50%, -50%) rotateY(${i * step}deg) translateZ(${radius}px)`,
              color: i % 2 === 0 ? '#F4B826' : 'rgba(255,255,255,0.12)',
              WebkitTextStroke: i % 2 === 0 ? '0' : '2px rgba(255,255,255,0.25)',
              backfaceVisibility: 'hidden',
            }}
          >
            {word}
          </span>
        ))}
      </div>
    </div>
  );
};

export default RotatingText3D;