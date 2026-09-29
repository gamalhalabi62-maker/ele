import { useEffect, useRef, useState } from 'react';
import { Play, Star, Users, Clock, BookOpen, Award, Globe, Calendar } from 'lucide-react';

const CourseHero = ({ course }) => {
  const rootRef = useRef(null);
  const [playing, setPlaying] = useState(false);

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
  }, []);

  return (
    <section ref={rootRef} className="relative bg-void pt-32 md:pt-40 pb-16 overflow-hidden">
      {/* Video/Image background */}
      <div className="absolute inset-0 z-0">
        {playing ? (
          <video
            src={course.heroVideo}
            autoPlay
            controls
            playsInline
            className="w-full h-full object-cover"
          />
        ) : (
          <>
            <img
              src={course.heroPoster}
              alt=""
              className="w-full h-full object-cover opacity-25"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-void/70 via-void/60 to-void" />
            <div className="absolute inset-0 bg-gradient-to-r from-void via-void/60 to-transparent" />
          </>
        )}
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 z-[1] opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(111,232,255,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(111,232,255,.4) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* Content */}
      <div className="container-x relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 items-center">

          {/* Left — text */}
          <div className="lg:col-span-7">

            {/* Breadcrumbs + badge */}
            <div className="ch-meta mb-8 flex flex-wrap items-center gap-x-4 gap-y-3 font-mono text-[10px] uppercase tracking-[0.3em]">
              <span className="text-neutral-500">Courses</span>
              <span className="text-neutral-600">/</span>
              <span className="text-neutral-500">{course.category}</span>
              <span className="text-neutral-600">/</span>
              <span className="text-white">{course.title}</span>
            </div>

            {/* Badge */}
            {course.badge && (
              <div className="mb-5 inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md border border-white/[0.15]">
                <span className="h-1.5 w-1.5 rounded-full bg-neon-cyan" />
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white">
                  {course.badge}
                </span>
              </div>
            )}

            {/* Title */}
            <h1 className="font-sans font-light text-[2.5rem] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[5rem] leading-[1.02] tracking-[-0.04em] text-white max-w-[18ch]">
              <span className="block overflow-hidden">
                <span className="ch-line inline-block">{course.title}</span>
              </span>
            </h1>

            {/* Subtitle */}
            <p className="ch-line mt-5 text-lg md:text-xl text-white/70 max-w-xl font-light leading-relaxed">
              {course.subtitle}
            </p>

            {/* Meta row */}
            <div className="ch-meta mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
              <span className="flex items-center gap-2 text-white">
                <Star size={14} className="fill-white text-white" />
                <span className="font-medium">{course.rating}</span>
                <span className="text-white/50">({course.reviews.toLocaleString()} reviews)</span>
              </span>
              <span className="text-white/25">•</span>
              <span className="flex items-center gap-2 text-white/70">
                <Users size={14} /> {course.students.toLocaleString()} students
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

            {/* Certifications */}
            {course.certLogos?.length > 0 && (
              <div className="ch-meta mt-6 flex items-center gap-3">
                <Award size={13} className="text-white/60" />
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/60">
                  Certified by {course.certLogos.join(' · ')}
                </span>
              </div>
            )}
          </div>

          {/* Right — video preview */}
          <div className="lg:col-span-5">
            <div className="relative aspect-video overflow-hidden border border-white/[0.1] group">
              {playing ? (
                <video
                  src={course.heroVideo}
                  autoPlay
                  controls
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : (
                <>
                  <img
                    src={course.heroPoster}
                    alt="Preview"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-neutral-950/40" />

                  {/* Play button */}
                  <button
                    onClick={() => setPlaying(true)}
                    className="absolute inset-0 flex items-center justify-center group/play"
                    aria-label="Play preview"
                  >
                    <span className="relative flex h-20 w-20 items-center justify-center
                                     bg-white/10 backdrop-blur-md border border-white/30
                                     group-hover/play:bg-white group-hover/play:border-white transition-all duration-500">
                      <Play
                        size={26}
                        className="text-white group-hover/play:text-neutral-950 transition-colors ml-1"
                        fill="currentColor"
                      />
                    </span>
                  </button>

                  {/* Corner label */}
                  <div className="absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-[0.3em] text-white">
                    Watch Preview · 2:15
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseHero;