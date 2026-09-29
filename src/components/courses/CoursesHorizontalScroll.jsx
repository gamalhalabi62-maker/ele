import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import CourseCard from './CourseCard';

const CoursesHorizontalScroll = ({ courses = [] }) => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const progressRef = useRef(null);
  const labelRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // ============ SCROLL LOGIC ============
  useEffect(() => {
    if (!courses || !courses.length) return;

    let mounted = true;
    let ctx;

    const init = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);
      if (!mounted || !sectionRef.current || !trackRef.current) return;

      await new Promise((r) => setTimeout(r, 250));

      const section = sectionRef.current;
      const track = trackRef.current;

      const getDistance = () => {
        const trackWidth = track.scrollWidth;
        const viewportWidth = window.innerWidth;
        return Math.max(0, trackWidth - viewportWidth + 60);
      };

      ctx = gsap.context(() => {
        const tween = gsap.to(track, {
          x: () => -getDistance(),
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${getDistance() * 1.15}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const p = self.progress;

              // Progress bar
              if (progressRef.current) {
                progressRef.current.style.transform = `scaleX(${p})`;
              }

              // Counter
              if (labelRef.current && courses.length > 0) {
                const idx = Math.floor(p * courses.length) + 1;
                labelRef.current.textContent = `${String(
                  Math.min(idx, courses.length)
                ).padStart(2, '0')} / ${String(courses.length).padStart(2, '0')}`;
              }

              // Active card index
              const activeIdx = Math.round(p * (courses.length - 1));
              setActiveIndex(activeIdx);
            },
          },
        });

        // Cards entrance — ناعم
        gsap.from('.course-card', {
          y: 60,
          opacity: 0,
          duration: 0.9,
          stagger: 0.06,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
          },
        });

        // Ghost title parallax
        gsap.to('.courses-track-title', {
          x: () => -getDistance() * 0.35,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${getDistance() * 1.15}`,
            scrub: 1,
          },
        });

        return () => tween.scrollTrigger?.kill();
      }, section);

      ScrollTrigger.refresh();
    };

    const t = setTimeout(init, 120);
    return () => {
      mounted = false;
      clearTimeout(t);
      ctx?.revert();
    };
  }, [courses]);

  // ============ EMPTY STATE ============
  if (!courses || !courses.length) {
    return (
      <section className="bg-void py-32">
        <div className="container-x text-center">
          <div className="max-w-md mx-auto border border-white/[0.08] p-12">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-white/40">
              No programs match your filter
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="relative bg-void overflow-hidden"
      style={{ minHeight: '100vh' }}
    >
      <div className="h-screen flex flex-col justify-center relative py-20">

        {/* ============ GHOST TITLE ============ */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 pointer-events-none select-none z-0 w-full overflow-hidden">
          <div className="courses-track-title flex whitespace-nowrap">
            {[...Array(2)].map((_, k) => (
              <span
                key={k}
                className="font-sans font-bold text-[24vw] leading-none tracking-tighter"
                style={{
                  WebkitTextStroke: '1.5px rgba(255,255,255,0.025)',
                  color: 'transparent',
                }}
              >
                PROGRAMS ·&nbsp;
              </span>
            ))}
          </div>
        </div>

        {/* ============ TOP BAR ============ */}
        <div className="relative z-20 mb-10 md:mb-12">
          <div className="container-x">
            <div className="flex items-end justify-between gap-6 flex-wrap">

              {/* Left — title + meta */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="h-px w-10 bg-white/40" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/50">
                    Catalog
                  </span>
                </div>
                <h2 className="font-sans font-light text-3xl md:text-5xl text-white tracking-tight leading-[1.05]">
                  Programs worth{' '}
                  <span className="italic text-neutral-400">your time</span>
                </h2>
              </div>

              {/* Right — counter + arrows */}
              <div className="flex items-center gap-6">
                {/* Counter */}
                <div className="flex items-center gap-3">
                  <span
                    ref={labelRef}
                    className="font-mono text-sm md:text-base text-white tabular-nums"
                  >
                    01 / {String(courses.length).padStart(2, '0')}
                  </span>
                  <span className="h-px w-8 bg-white/20" />
                </div>

                {/* Arrows */}
                <div className="hidden md:flex items-center gap-2">
                  <button
                    onClick={() => {
                      const el = trackRef.current;
                      if (!el) return;
                      const card = el.querySelector('.course-card');
                      const w = card ? card.offsetWidth + 28 : 400;
                      window.scrollBy({ top: -w, behavior: 'smooth' });
                    }}
                    className="h-10 w-10 flex items-center justify-center
                               border border-white/15 text-white/60
                               hover:border-neon-cyan hover:text-neon-cyan
                               transition-all duration-300"
                    aria-label="Previous"
                  >
                    <ArrowLeft size={14} />
                  </button>
                  <button
                    onClick={() => {
                      const el = trackRef.current;
                      if (!el) return;
                      const card = el.querySelector('.course-card');
                      const w = card ? card.offsetWidth + 28 : 400;
                      window.scrollBy({ top: w, behavior: 'smooth' });
                    }}
                    className="h-10 w-10 flex items-center justify-center
                               border border-white/15 text-white/60
                               hover:border-neon-cyan hover:text-neon-cyan
                               transition-all duration-300"
                    aria-label="Next"
                  >
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ============ HORIZONTAL TRACK ============ */}
        <div className="relative z-10 overflow-hidden">
          <div
            ref={trackRef}
            className="flex gap-6 md:gap-7 will-change-transform 
                       pl-6 md:pl-10 lg:pl-[max(2.5rem,calc((100vw-1400px)/2))] 
                       pr-24 md:pr-32"
          >
            {courses.map((course, i) => (
              <div
                key={course.id}
                className="course-card shrink-0 
                           w-[88vw] 
                           sm:w-[360px] 
                           md:w-[400px] 
                           lg:w-[420px]"
              >
                <CourseCard course={course} index={i} />
              </div>
            ))}
            {/* End spacer */}
            <div className="shrink-0 w-[15vw]" />
          </div>
        </div>

        {/* ============ BOTTOM BAR ============ */}
        <div className="relative z-20 mt-10 md:mt-12">
          <div className="container-x">
            <div className="flex items-center gap-6">

              {/* Progress bar */}
              <div className="flex-1 relative">
                <div className="h-px bg-white/[0.08] relative overflow-hidden">
                  <div
                    ref={progressRef}
                    className="absolute top-0 left-0 w-full h-full bg-white origin-left"
                    style={{ transform: 'scaleX(0)' }}
                  />
                </div>

                {/* Progress markers */}
                <div className="absolute top-0 left-0 right-0 flex justify-between -translate-y-1">
                  {courses.map((_, i) => (
                    <span
                      key={i}
                      className={`h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
                        i <= activeIndex ? 'bg-white' : 'bg-white/20'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Right meta */}
              <div className="flex items-center gap-3 shrink-0">
                <span className="h-1.5 w-1.5 rounded-full bg-neon-cyan animate-pulse-soft" />
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/50">
                  {String(courses.length).padStart(2, '0')} Programs
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ============ SCROLL HINT (right side) ============ */}
        <div className="absolute top-1/2 right-6 -translate-y-1/2 z-20 hidden lg:flex flex-col items-center gap-3 pointer-events-none">
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/40 rotate-90 origin-center whitespace-nowrap">
            Scroll
          </span>
          <span className="h-16 w-px bg-gradient-to-b from-white/40 to-transparent" />
        </div>

        {/* ============ VIGNETTE EDGES ============ */}
        <div
          className="absolute inset-y-0 left-0 w-32 md:w-48 pointer-events-none z-[15]"
          style={{ background: 'linear-gradient(to right, #06070B, transparent)' }}
        />
        <div
          className="absolute inset-y-0 right-0 w-32 md:w-48 pointer-events-none z-[15]"
          style={{ background: 'linear-gradient(to left, #06070B, transparent)' }}
        />
      </div>
    </section>
  );
};

export default CoursesHorizontalScroll;