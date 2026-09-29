import { useEffect } from 'react';

const useLenis = () => {
  useEffect(() => {
    let lenis, rafId;
    let tickerFn;

    const init = async () => {
      const Lenis = (await import('lenis')).default;
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      lenis = new Lenis({
        duration: 1.4,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.4,
        // ⚠️ مهم: يسمح للعناصر اللي عليها data-lenis-prevent
        // إنها تعمل scroll طبيعي (زي الـ events snap container)
        prevent: (node) => {
          if (!node) return false;
          if (typeof node.hasAttribute !== 'function') return false;
          return node.hasAttribute('data-lenis-prevent');
        },
      });

      // ⚠️ احفظ الـ instance عالميًا عشان نقدر نتحكم فيه
      window.__lenis = lenis;

      // Sync ScrollTrigger
      lenis.on('scroll', ScrollTrigger.update);

      // RAF loop
      const raf = (time) => {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);

      // GSAP ticker sync
      tickerFn = (time) => lenis.raf(time * 1000);
      gsap.ticker.add(tickerFn);
      gsap.ticker.lagSmoothing(0);
    };

    init();

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (tickerFn) {
        // نظّف الـ gsap ticker
        import('gsap').then(({ gsap }) => {
          gsap.ticker.remove(tickerFn);
        }).catch(() => {});
      }
      window.__lenis = null;
      lenis?.destroy();
    };
  }, []);
};

export default useLenis;