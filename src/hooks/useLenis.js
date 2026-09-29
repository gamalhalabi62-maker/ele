import { useEffect } from 'react';

const useLenis = () => {
  useEffect(() => {
    // ⚠️ ما نشغلش Lenis على الموبايل / touch devices
    const isTouch =
      typeof window !== 'undefined' &&
      (window.matchMedia('(pointer: coarse)').matches ||
        window.innerWidth < 1024);

    if (isTouch) {
      // تأكد إن الـ body مش مقفول من مكان قديم
      document.body.style.overflow = '';
      return;
    }

    let lenis = null;
    let rafId = null;
    let tickerFn = null;
    let mounted = true;

    const init = async () => {
      try {
        const LenisModule = await import('lenis');
        const Lenis = LenisModule.default;

        const { gsap } = await import('gsap');
        const { ScrollTrigger } = await import('gsap/ScrollTrigger');
        gsap.registerPlugin(ScrollTrigger);

        if (!mounted) return;

        lenis = new Lenis({
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
          wheelMultiplier: 1,
          // ⚠️ شيلنا touchMultiplier — مش محتاجينه على الديسكتوب
          prevent: (node) => {
            if (!node) return false;
            if (typeof node.hasAttribute !== 'function') return false;
            return node.hasAttribute('data-lenis-prevent');
          },
        });

        // احفظ الـ instance عالميًا
        window.__lenis = lenis;

        // Sync مع ScrollTrigger
        lenis.on('scroll', ScrollTrigger.update);

        // RAF loop
        const raf = (time) => {
          if (!mounted) return;
          lenis.raf(time);
          rafId = requestAnimationFrame(raf);
        };
        rafId = requestAnimationFrame(raf);

        // Sync مع GSAP
        tickerFn = (time) => lenis.raf(time * 1000);
        gsap.ticker.add(tickerFn);
        gsap.ticker.lagSmoothing(0);
      } catch (err) {
        console.warn('[Lenis] Failed to initialize:', err);
      }
    };

    init();

    return () => {
      mounted = false;

      if (rafId) cancelAnimationFrame(rafId);

      if (tickerFn) {
        import('gsap')
          .then(({ gsap }) => {
            gsap.ticker.remove(tickerFn);
          })
          .catch(() => {});
      }

      // ⚠️ تأكد إن الـ body مفتوح دايماً
      document.body.style.overflow = '';

      window.__lenis = null;
      if (lenis) {
        try {
          lenis.destroy();
        } catch (_) {
          // ignore
        }
      }
    };
  }, []);
};

export default useLenis;