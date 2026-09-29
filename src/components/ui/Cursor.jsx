import { useEffect, useRef, useState } from 'react';

const Cursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [state, setState] = useState('default'); // default | link | image | text

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let mx = 0, my = 0, rx = 0, ry = 0;

    const onMove = (e) => {
      mx = e.clientX; my = e.clientY;
      if (dotRef.current) dotRef.current.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
    };

    const onOver = (e) => {
      const el = e.target.closest('a, button, [data-cursor]');
      if (!el) {
        setState('default');
        return;
      }
      const ds = el.getAttribute('data-cursor');
      if (ds) setState(ds);
      else setState('link');
    };

    const animate = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      if (ringRef.current) ringRef.current.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    animate();

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
    };
  }, []);

  const sizes = {
    default: { dot: 6, ring: 40, label: null },
    link:    { dot: 6, ring: 64, label: null },
    image:   { dot: 4, ring: 80, label: 'VIEW' },
    text:    { dot: 6, ring: 8,  label: null },
  };

  const s = sizes[state];

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 rounded-full bg-gold pointer-events-none z-[9999] hidden lg:block transition-all duration-200"
        style={{ width: s.dot, height: s.dot }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 rounded-full border border-gold/60 pointer-events-none z-[9999] hidden lg:block
                   flex items-center justify-center transition-all duration-300 mix-blend-difference"
        style={{ width: s.ring, height: s.ring }}
      >
        {s.label && (
          <span className="text-[10px] font-medium tracking-widest text-gold">{s.label}</span>
        )}
      </div>
    </>
  );
};

export default Cursor;