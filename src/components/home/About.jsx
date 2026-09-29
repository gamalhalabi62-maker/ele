import { useRef, useEffect } from 'react';
import { useRevealOnScroll } from '../../hooks/useRevealOnScroll';
import SplitText from '../ui/SplitText';
import RotatingBadge from '../ui/RotatingBadge';

const About = () => {
  const imgWrapRef = useRef(null);
  const contentRef = useRevealOnScroll({ selector: '.about-item', from: 'right', stagger: 0.15, duration: 0.9 });

  useEffect(() => {
    let mounted = true;
    let ctx;

    const init = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);
      if (!mounted || !imgWrapRef.current) return;

      ctx = gsap.context(() => {
        gsap.to('.about-img', {
          yPercent: -10,
          ease: 'none',
          scrollTrigger: {
            trigger: imgWrapRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });
      }, imgWrapRef.current);

      ScrollTrigger.refresh();
    };
    const t = setTimeout(init, 100);
    return () => { mounted = false; clearTimeout(t); ctx?.revert(); };
  }, []);

  return (
<section className="relative overflow-hidden">
      <div className="container-x relative">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">

          {/* Image */}
          <div ref={imgWrapRef} className="lg:col-span-5 relative">
            <div className="relative overflow-hidden">
              <img
                src="https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Education"
                className="about-img w-full h-[500px] md:h-[640px] object-cover scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-soft/80 via-transparent to-transparent" />
            </div>

            <div className="absolute -right-4 md:-right-12 top-1/2 -translate-y-1/2 z-10">
              <RotatingBadge />
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef} className="lg:col-span-7">
            <span className="eyebrow about-item mb-8 inline-flex">About Us</span>

            <SplitText
              as="h2"
              variant="lines"
              text="We're redefining how the next generation learns technology."
              className="about-item text-4xl md:text-5xl lg:text-6xl font-serif font-light text-cream-100 leading-[1.1]"
            />

            <p className="about-item mt-8 text-cream-100/60 text-lg font-light leading-relaxed max-w-xl">
              At Talim, we believe in learning by doing. Our programs are designed by
              practitioners who have shipped real products — not just written books.
              Every course, every lesson, and every project is built to make you
              job-ready from day one.
            </p>

            <div className="about-item mt-12 flex items-center gap-8 flex-wrap">
              <div className="flex items-center gap-4">
                <img
                  src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=200"
                  alt="Author"
                  className="h-16 w-16 rounded-full object-cover border border-gold/40"
                />
                <div>
                  <div className="font-serif text-lg text-cream-100">Hugh Millie-Yate</div>
                  <div className="text-cream-100/40 text-xs uppercase tracking-[0.2em] mt-1">
                    Vice Principal
                  </div>
                </div>
              </div>
              <div className="text-gold/60 font-serif italic text-4xl select-none">
                H. Millie
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;