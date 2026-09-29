import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Magnetic from '../ui/Magnetic';
import { ArrowUpRight } from 'lucide-react';

const CTA = () => {
  const imgRef = useRef(null);
  const wordsRef = useRef(null);

  useEffect(() => {
    let mounted = true;
    let ctx;

    const init = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);
      if (!mounted) return;

      ctx = gsap.context(() => {
        gsap.fromTo(imgRef.current, { yPercent: -6 }, {
          yPercent: 6, ease: 'none',
          scrollTrigger: { trigger: imgRef.current, start: 'top bottom', end: 'bottom top', scrub: 1 },
        });

        gsap.fromTo(wordsRef.current, { xPercent: 0 }, {
          xPercent: -30, ease: 'none',
          scrollTrigger: { trigger: wordsRef.current, start: 'top bottom', end: 'bottom top', scrub: 1 },
        });
      });

      ScrollTrigger.refresh();
    };
    const t = setTimeout(init, 100);
    return () => { mounted = false; clearTimeout(t); ctx?.revert(); };
  }, []);

  return (
  <section className="relative overflow-hidden">
  <div className="container-x relative py-16 md:py-20">
        <div className="grid md:grid-cols-12 gap-12 items-center">

          <div className="md:col-span-7 relative z-10">
            <span className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-deep/60 font-medium">
              <span className="w-12 h-px bg-deep" />
              Start today
            </span>

            <h2 className="mt-8 text-6xl md:text-8xl lg:text-9xl font-serif font-light text-deep leading-[0.95]">
              Learn <span className="italic">free</span> for 7 days.
            </h2>

            <p className="mt-8 text-deep/70 text-lg max-w-lg leading-relaxed">
              Full access to every course, every instructor, every community.
              No credit card. No commitment. Cancel anytime.
            </p>

            <div className="mt-12 flex flex-wrap gap-4">
              <Magnetic strength={0.35}>
                <Link
                  to="/register"
                  className="group inline-flex items-center gap-3 px-8 py-5 bg-deep text-cream-100
                             text-sm font-medium uppercase tracking-wider hover:bg-ink
                             transition-colors duration-500"
                  data-cursor="link"
                >
                  Get Started Free
                  <ArrowUpRight size={18} className="group-hover:rotate-45 transition-transform duration-500" />
                </Link>
              </Magnetic>
              <Link
                to="/courses"
                className="inline-flex items-center gap-3 px-8 py-5 border border-deep/30 text-deep
                           text-sm font-medium uppercase tracking-wider hover:bg-deep hover:text-cream-100
                           transition-colors duration-500"
              >
                Browse Courses
              </Link>
            </div>
          </div>

          <div className="md:col-span-5 relative">
            <div className="relative overflow-hidden">
              <img
                ref={imgRef}
                src="https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=900"
                alt="Student"
                className="w-full h-[500px] md:h-[600px] object-cover scale-110"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Giant scrolling word behind */}
      <div ref={wordsRef} className="absolute bottom-0 left-0 right-0 pointer-events-none select-none overflow-hidden">
        <div className="text-[20vw] font-serif font-light text-deep/[0.06] leading-none whitespace-nowrap pl-8">
          LEARN • BUILD • SHIP • REPEAT
        </div>
      </div>
    </section>
  );
};

export default CTA;