import { useEffect, useRef, useState } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%&*';

const ScrambleText = ({ text, className = '', speed = 40, trigger = 'inview' }) => {
  const ref = useRef(null);
  const [display, setDisplay] = useState(text);
  const started = useRef(false);

  useEffect(() => {
    let rafId, interval;

    const scramble = () => {
      if (started.current) return;
      started.current = true;

      const chars = text.split('');
      let iteration = 0;

      clearInterval(interval);
      interval = setInterval(() => {
        setDisplay(
          chars
            .map((c, i) => {
              if (i < iteration) return c;
              if (c === ' ') return ' ';
              return CHARS[Math.floor(Math.random() * CHARS.length)];
            })
            .join('')
        );

        if (iteration >= chars.length) {
          clearInterval(interval);
          setDisplay(text);
        }
        iteration += 1 / 3;
      }, speed);
    };

    if (trigger === 'mount') {
      setTimeout(scramble, 200);
    } else {
      const obs = new IntersectionObserver(
        ([e]) => e.isIntersecting && scramble(),
        { threshold: 0.5 }
      );
      if (ref.current) obs.observe(ref.current);
      return () => {
        obs.disconnect();
        clearInterval(interval);
      };
    }
    return () => clearInterval(interval);
  }, [text, speed, trigger]);

  return <span ref={ref} className={className}>{display}</span>;
};

export default ScrambleText;