import { useEffect, useRef, useState } from 'react';

const ITGateBackdrop = () => {
  const rootRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const word = 'IT GATE';

  // Scroll progress
  useEffect(() => {
    const onScroll = () => {
      if (!rootRef.current) return;
      const rect = rootRef.current.getBoundingClientRect();
      const total = rect.height + window.innerHeight;
      const scrolled = window.innerHeight - rect.top;
      const p = Math.min(1, Math.max(0, scrolled / total));
      setScrollProgress(p);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Mouse tracking للـ parallax
  useEffect(() => {
    const onMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  // 0 → 0.5 : الحروف بتظهر
  const revealProgress = Math.min(1, scrollProgress / 0.5);
  const totalChars = word.length;
  const visibleChars = revealProgress * totalChars;

  // Parallax على الماوس
  const px = (mousePos.x - 50) * 0.3; // -15 → +15
  const py = (mousePos.y - 50) * 0.2;

  return (
    <div
      ref={rootRef}
      className="absolute inset-0 pointer-events-none overflow-hidden z-0"
      aria-hidden="true"
    >
      {/* ============ BASE GRADIENT ============ */}
      <div className="absolute inset-0 bg-[#06070B]" />

      {/* ============ RADIAL GLOW ============ */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                      h-[80vh] w-[80vw] bg-[#6FE8FF]/[0.03] blur-[160px] rounded-full" />

      {/* ============ THE MASSIVE WORD ============ */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          transform: `translate(${px}px, ${py}px)`,
          transition: 'transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)',
          perspective: '1600px',
        }}
      >
        <div
          className="flex items-center whitespace-nowrap select-none font-sans font-black
                     leading-[0.8] tracking-[-0.06em]"
          style={{
            fontSize: 'clamp(8rem, 28vw, 32rem)',
            transformStyle: 'preserve-3d',
          }}
        >
          {word.split('').map((char, i) => {
            const isSpace = char === ' ';

            // كل حرف ليه نافذة ظهور
            const charProgress = Math.max(0, Math.min(1, visibleChars - i));

            // 3D drop + scale + rotate
            const translateZ = (1 - charProgress) * -800;
            const translateY = (1 - charProgress) * 100;
            const rotateX = (1 - charProgress) * -45;
            const blur = (1 - charProgress) * 30;
            const opacity = charProgress * 0.85;

            // Gradient لكل حرف
            const gradientAngle = 180 + i * 20;

            if (isSpace) {
              return (
                <span
                  key={i}
                  style={{ width: '0.25em', display: 'inline-block' }}
                />
              );
            }

            return (
              <span
                key={i}
                className="inline-block relative will-change-transform"
                style={{
                  // Gradient fill
                  background: `linear-gradient(${gradientAngle}deg,
                    rgba(111,232,255,0.9) 0%,
                    rgba(111,232,255,0.6) 40%,
                    rgba(166,139,255,0.5) 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',

                  // Outer stroke (مثل "مضلع")
                  WebkitTextStroke: `2px rgba(111,232,255,${0.15 + charProgress * 0.2})`,

                  // Glow
                  filter: `blur(${blur}px) drop-shadow(0 0 ${
                    20 + charProgress * 40
                  }px rgba(111,232,255,${charProgress * 0.5}))`,

                  opacity,
                  transform: `translateZ(${translateZ}px) translateY(${translateY}px) rotateX(${rotateX}deg)`,
                  transformStyle: 'preserve-3d',
                  transition: 'none',
                }}
              >
                {char}
              </span>
            );
          })}
        </div>
      </div>

      {/* ============ SCAN LINES ============ */}
      <div
        className="absolute inset-0 opacity-30 mix-blend-overlay"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, rgba(111,232,255,0.05) 0px, rgba(111,232,255,0.05) 1px, transparent 1px, transparent 3px)',
        }}
      />

      {/* ============ FINE GRID ============ */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(111,232,255,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(111,232,255,.4) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          maskImage:
            'radial-gradient(ellipse at center, black 20%, transparent 75%)',
          WebkitMaskImage:
            'radial-gradient(ellipse at center, black 20%, transparent 75%)',
        }}
      />

      {/* ============ RADIAL VIGNETTE ============ */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(6,7,11,0.75) 70%, rgba(6,7,11,0.98) 100%)',
        }}
      />

      {/* ============ SCANLINE ANIMATION ============ */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute left-0 right-0 h-[20vh] opacity-40"
          style={{
            background:
              'linear-gradient(to bottom, transparent, rgba(111,232,255,0.04), transparent)',
            animation: 'scanPass 8s linear infinite',
          }}
        />
      </div>

      {/* ============ CORNER DETAILS (HUD) ============ */}
      <div className="absolute top-8 left-8 w-12 h-12 border-l border-t border-[#6FE8FF]/20" />
      <div className="absolute top-8 right-8 w-12 h-12 border-r border-t border-[#6FE8FF]/20" />
      <div className="absolute bottom-8 left-8 w-12 h-12 border-l border-b border-[#6FE8FF]/20" />
      <div className="absolute bottom-8 right-8 w-12 h-12 border-r border-b border-[#6FE8FF]/20" />

      <style>{`
        @keyframes scanPass {
          0%   { top: -20vh; }
          100% { top: 100vh; }
        }
      `}</style>
    </div>
  );
};

export default ITGateBackdrop;