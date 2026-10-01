import { useEffect, useRef, useState, useCallback } from 'react';
import {
  Play, Pause, Volume2, VolumeX, Star, Users, Clock, BookOpen, Award,
} from 'lucide-react';

// 🎥 مسار محلي موحّد — it.MOV
const LOCAL_VIDEO     = '/videos/it.MOV';
const FALLBACK_POSTER = '/courses/03-soc-analyst.jpg';

const CourseHero = ({ course }) => {
  const rootRef = useRef(null);

  // ============ Preview card state ============
  const [previewPlaying, setPreviewPlaying] = useState(false);
  const previewVideoRef = useRef(null);

  // ============ Background instructor video state ============
  const bgVideoRef = useRef(null);
  const [bgLoaded, setBgLoaded]     = useState(false);
  const [bgError, setBgError]       = useState(false);
  const [bgPlaying, setBgPlaying]   = useState(true);
  const [bgMuted, setBgMuted]       = useState(true);
  const [bgInView, setBgInView]     = useState(true);

  // ============ Data aliases ============
  const instructorVideo = {
    src: LOCAL_VIDEO,
    poster:
      course?.instructorVideo?.poster ||
      course?.heroPoster ||
      course?.image ||
      FALLBACK_POSTER,
  };

  const previewVideo = {
    src: LOCAL_VIDEO,
    poster:
      course?.previewVideo?.poster ||
      course?.heroPoster ||
      course?.image ||
      FALLBACK_POSTER,
  };

  const bgPoster      = instructorVideo.poster;
  const previewPoster = previewVideo.poster;

  // ============ Reset state on course change ============
  useEffect(() => {
    setBgLoaded(false);
    setBgError(false);
    setBgPlaying(true);
    setPreviewPlaying(false);
  }, [course?.slug]);

  // ============ GSAP animations ============
  useEffect(() => {
    let mounted = true;
    let ctx;
    const init = async () => {
      const { gsap } = await import('gsap');
      if (!mounted || !rootRef.current) return;

      ctx = gsap.context(() => {
        gsap.from('.ch-line', {
          yPercent: 110,
          opacity: 0,
          duration: 1,
          stagger: 0.08,
          ease: 'power4.out',
          delay: 0.2,
        });
        gsap.from('.ch-meta > *', {
          y: 20,
          opacity: 0,
          duration: 0.7,
          stagger: 0.08,
          delay: 0.6,
        });
      }, rootRef.current);
    };
    const t = setTimeout(init, 100);
    return () => {
      mounted = false;
      clearTimeout(t);
      ctx?.revert();
    };
  }, [course?.slug]);

  // ============ Reduced motion ============
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) setBgPlaying(false);
  }, []);

  // ============ IntersectionObserver ============
  useEffect(() => {
    const el = bgVideoRef.current;
    if (!el || bgError) return;

    const obs = new IntersectionObserver(
      ([entry]) => setBgInView(entry.isIntersecting),
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [bgError, course?.slug]);

  // ============ تشغيل/إيقاف الفيديو ============
  useEffect(() => {
    const el = bgVideoRef.current;
    if (!el || bgError) return;

    if (bgInView && bgPlaying) {
      const playPromise = el.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          const resume = () => {
            el.play().catch(() => {});
            window.removeEventListener('click', resume);
            window.removeEventListener('touchstart', resume);
            window.removeEventListener('keydown', resume);
          };
          window.addEventListener('click', resume, { once: true });
          window.addEventListener('touchstart', resume, { once: true });
          window.addEventListener('keydown', resume, { once: true });
        });
      }
    } else {
      el.pause();
    }
  }, [bgInView, bgPlaying, bgError, course?.slug]);

  // ============ كتم ============
  useEffect(() => {
    const el = bgVideoRef.current;
    if (el) el.muted = bgMuted;
  }, [bgMuted]);

  // ============ Preview toggle ============
  const togglePreview = useCallback(() => {
    const vid = previewVideoRef.current;
    if (!vid) return;
    if (previewPlaying) {
      vid.pause();
      setPreviewPlaying(false);
    } else {
      vid.play().catch(() => {});
      setPreviewPlaying(true);
    }
  }, [previewPlaying]);

  const handlePreviewEnded = () => setPreviewPlaying(false);

  if (!course) return null;

  return (
    <section
      ref={rootRef}
      className="relative bg-void pt-32 md:pt-40 pb-16 overflow-hidden"
    >
      {/* ============ BACKGROUND VIDEO ============ */}
      <div className="absolute inset-0 z-0">
        {/* Poster */}
        <img
          key={`poster-${course.slug}`}
          src={bgPoster}
          alt=""
          aria-hidden
          onError={(e) => {
            e.currentTarget.src = FALLBACK_POSTER;
          }}
          className={`absolute inset-0 w-full h-full object-cover
                     transition-opacity duration-700
                     ${bgLoaded ? 'opacity-0' : 'opacity-100'}`}
        />

        {/* فيديو المدرب */}
        {!bgError && (
          <video
            key={`bg-${course.slug}`}
            ref={bgVideoRef}
            src={instructorVideo.src}
            poster={bgPoster}
            muted
            autoPlay
            loop
            playsInline
            preload="auto"
            disablePictureInPicture
            onLoadedData={() => {
              console.log('✅ Video loaded data');
              setBgLoaded(true);
            }}
            onCanPlay={() => {
              console.log('✅ Video can play');
              setBgLoaded(true);
            }}
            onPlaying={() => {
              console.log('▶️ Video playing');
              setBgLoaded(true);
            }}
            onError={(e) => {
              console.error('❌ Video error:', e);
              console.error('   src:', instructorVideo.src);
              console.error('   networkState:', e.target?.networkState);
              console.error('   readyState:', e.target?.readyState);
              setBgError(true);
            }}
            className={`absolute inset-0 w-full h-full object-cover
                       transition-opacity duration-700
                       ${bgLoaded ? 'opacity-100' : 'opacity-0'}`}
            style={{ pointerEvents: 'none' }}
          />
        )}

        {/* Fallback */}
        {bgError && (
          <img
            src={bgPoster}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        {/* Overlays */}
        <div className="absolute inset-0 bg-void/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-void/70 via-void/50 to-void" />
        <div className="absolute inset-0 bg-gradient-to-r from-void via-void/60 to-transparent" />
      </div>

      {/* ============ GRID OVERLAY ============ */}
      <div
        className="absolute inset-0 z-[1] opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(111,232,255,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(111,232,255,.4) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* ============ BACKGROUND VIDEO CONTROLS ============ */}
      {!bgError && (
        <div className="absolute top-24 md:top-28 right-4 md:right-8 z-20
                        flex items-center gap-2">
          <button
            onClick={() => setBgPlaying((p) => !p)}
            className="h-10 w-10 rounded-full bg-black/60 backdrop-blur-md
                       border border-white/20 text-white
                       flex items-center justify-center
                       hover:bg-black/80 transition-colors"
            aria-label={bgPlaying ? 'Pause instructor video' : 'Play instructor video'}
          >
            {bgPlaying ? (
              <Pause size={14} />
            ) : (
              <Play size={14} fill="currentColor" />
            )}
          </button>

          <button
            onClick={() => setBgMuted((m) => !m)}
            className="h-10 w-10 rounded-full bg-black/60 backdrop-blur-md
                       border border-white/20 text-white
                       flex items-center justify-center
                       hover:bg-black/80 transition-colors"
            aria-label={bgMuted ? 'Unmute instructor video' : 'Mute instructor video'}
          >
            {bgMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
          </button>
        </div>
      )}

      {/* ============ CONTENT ============ */}
      <div className="container-x relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 items-center">

          <div className="lg:col-span-7">
            <div className="ch-meta mb-8 flex flex-wrap items-center gap-x-4 gap-y-3
                            font-mono text-[10px] uppercase tracking-[0.3em]">
              <span className="text-neutral-500">Courses</span>
              <span className="text-neutral-600">/</span>
              <span className="text-neutral-500">{course.category}</span>
              <span className="text-neutral-600">/</span>
              <span className="text-white">{course.title}</span>
            </div>

            {course.badge && (
              <div className="mb-5 inline-flex items-center gap-2 px-3 py-1
                              bg-white/10 backdrop-blur-md border border-white/[0.15]">
                <span className="h-1.5 w-1.5 rounded-full bg-neon-cyan" />
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white">
                  {course.badge}
                </span>
              </div>
            )}

            <h1 className="font-sans font-light text-[2.5rem] sm:text-[3.5rem]
                           md:text-[4.5rem] lg:text-[5rem] leading-[1.02]
                           tracking-[-0.04em] text-white max-w-[18ch]">
              <span className="block overflow-hidden">
                <span className="ch-line inline-block">{course.title}</span>
              </span>
            </h1>

            <p className="ch-line mt-5 text-lg md:text-xl text-white/70
                          max-w-xl font-light leading-relaxed">
              {course.subtitle}
            </p>

            <div className="ch-meta mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
              <span className="flex items-center gap-2 text-white">
                <Star size={14} className="fill-white text-white" />
                <span className="font-medium">{course.rating}</span>
                <span className="text-white/50">
                  ({course.reviews?.toLocaleString()} reviews)
                </span>
              </span>
              <span className="text-white/25">•</span>
              <span className="flex items-center gap-2 text-white/70">
                <Users size={14} /> {course.students?.toLocaleString()} students
              </span>
              <span className="text-white/25">•</span>
              <span className="flex items-center gap-2 text-white/70">
                <Clock size={14} /> {course.duration}
              </span>
              <span className="text-white/25">•</span>
              <span className="flex items-center gap-2 text-white/70">
                <BookOpen size={14} /> {course.lessons} lessons
              </span>
            </div>

            {course.certLogos?.length > 0 && (
              <div className="ch-meta mt-6 flex items-center gap-3">
                <Award size={13} className="text-white/60" />
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/60">
                  Certified by {course.certLogos.join(' · ')}
                </span>
              </div>
            )}
          </div>

          <div className="lg:col-span-5">
            <div className="relative aspect-video overflow-hidden
                            border border-white/[0.1] group">
              {previewPlaying ? (
                <video
                  key={`preview-${course.slug}`}
                  ref={previewVideoRef}
                  src={previewVideo.src}
                  poster={previewPoster}
                  autoPlay
                  controls
                  playsInline
                  onEnded={handlePreviewEnded}
                  className="w-full h-full object-cover"
                />
              ) : (
                <>
                  <img
                    key={`preview-poster-${course.slug}`}
                    src={previewPoster}
                    alt="Preview"
                    className="w-full h-full object-cover
                               transition-transform duration-700
                               group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-neutral-950/40" />

                  <button
                    onClick={togglePreview}
                    className="absolute inset-0 flex items-center justify-center group/play"
                    aria-label="Play preview"
                  >
                    <span className="relative flex h-20 w-20 items-center justify-center
                                     bg-white/10 backdrop-blur-md border border-white/30
                                     group-hover/play:bg-white
                                     group-hover/play:border-white
                                     transition-all duration-500">
                      <Play
                        size={26}
                        className="text-white group-hover/play:text-neutral-950
                                   transition-colors ml-1"
                        fill="currentColor"
                      />
                    </span>
                  </button>

                  <div className="absolute bottom-4 left-4 font-mono text-[10px]
                                  uppercase tracking-[0.3em] text-white">
                    Watch Preview · 2:15
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24
                      bg-gradient-to-t from-void to-transparent z-[5]
                      pointer-events-none" />
    </section>
  );
};

export default CourseHero;