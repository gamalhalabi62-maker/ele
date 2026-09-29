import { useEffect, useRef, useState } from 'react';

const HeroVideoBackground = ({
  videos = [],
  sceneDuration = 7000,
  fadeDuration = 1200,
  overlay = 'soft',
  onSceneChange,
  className = '',
}) => {
  const [index, setIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const timerRef = useRef(null);
  const currentRef = useRef(null);

  const count = videos.length;

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    if (count === 0) return;
    const duration = isMobile ? sceneDuration * 1.4 : sceneDuration;

    timerRef.current = setTimeout(() => {
      setPrevIndex(index);
      setIndex((i) => (i + 1) % count);
      setTimeout(() => setPrevIndex(null), fadeDuration + 200);
    }, duration);

    return () => clearTimeout(timerRef.current);
  }, [index, count, sceneDuration, fadeDuration, isMobile]);

  useEffect(() => {
    if (onSceneChange && videos[index]) onSceneChange(index, videos[index]);
  }, [index, videos, onSceneChange]);

  useEffect(() => {
    const el = currentRef.current;
    if (!el) return;
    el.style.opacity = '1';
    const vid = el.querySelector('video');
    vid?.play?.().catch(() => {});
  }, [index]);

  if (count === 0) return null;

  const current = videos[index];
  const prev = prevIndex !== null ? videos[prevIndex] : null;

  return (
    <div
      className={`absolute inset-0 overflow-hidden bg-void ${className}`}
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {prev && (
        <div
          key={`prev-${prevIndex}`}
          className="absolute inset-0"
          style={{
            opacity: 0,
            animation: `hvbFadeOut ${fadeDuration}ms ease-in-out forwards`,
          }}
        >
          <MediaFrame src={prev.src} isMobile={isMobile} />
        </div>
      )}

      <div
        ref={currentRef}
        key={`cur-${index}`}
        className="absolute inset-0"
        style={{
          opacity: 0,
          transition: `opacity ${fadeDuration}ms ease-in-out`,
        }}
      >
        <MediaFrame src={current.src} isMobile={isMobile} />
      </div>

      {overlay === 'soft' && (
        <>
          <div className="hidden md:block absolute inset-0 bg-void/45" />
          <div className="hidden md:block absolute inset-0 bg-gradient-to-b from-void/60 via-transparent to-void/80" />
          <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-void/70 via-transparent to-void/40" />

          <div className="md:hidden absolute inset-0 bg-void/55" />
          <div
            className="md:hidden absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(6,7,11,0.85) 0%, rgba(6,7,11,0.35) 35%, rgba(6,7,11,0.55) 65%, rgba(6,7,11,0.95) 100%)',
            }}
          />
        </>
      )}

      {overlay === 'strong' && (
        <>
          <div className="absolute inset-0 bg-void/70" />
          <div className="absolute inset-0 bg-gradient-to-b from-void/85 via-void/40 to-void" />
        </>
      )}

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 30%, rgba(6,7,11,0.7) 100%)',
        }}
      />

      <style>{`
        @keyframes hvbFadeOut {
          from { opacity: 1; }
          to   { opacity: 0; }
        }
      `}</style>
    </div>
  );
};


const MediaFrame = ({ src, isMobile }) => {
  return (
    <video
      src={src}
      autoPlay
      muted
      loop
      playsInline
      preload={isMobile ? 'metadata' : 'auto'}
      className="absolute inset-0 w-full h-full"
      style={{
        objectFit: 'cover',
    
        objectPosition: isMobile ? 'center 40%' : 'center center',
        transform: isMobile ? 'scale(1.15)' : 'scale(1)',
      }}
    />
  );
};

export default HeroVideoBackground;