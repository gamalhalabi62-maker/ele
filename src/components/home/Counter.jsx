import { useRevealOnScroll } from '../../hooks/useRevealOnScroll';
import CountUp from '../ui/CountUp';
import SplitText from '../ui/SplitText';
import { stats } from '../../mocks/stats';

const Counter = () => {
  const rootRef = useRevealOnScroll({ selector: '.counter-item', from: 'bottom', stagger: 0.15, duration: 0.9 });

  return (
<section className="relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[1000px] bg-gold/[0.04] blur-[180px] rounded-full pointer-events-none" />

      <div ref={rootRef} className="container-x relative">
        <div className="text-center mb-24">
          <span className="eyebrow justify-center">By the numbers</span>
          <SplitText
            as="h2"
            variant="words"
            text="Our impact so far."
            className="mt-6 text-5xl md:text-7xl font-serif font-light text-cream-100"
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
          {stats.map((s) => (
            <div key={s.label} className="counter-item relative text-center">
              <div
                className="absolute inset-x-0 -top-6 flex items-start justify-center
                           text-[140px] md:text-[180px] leading-none font-serif font-light
                           text-white/[0.03] select-none blur-[2px] pointer-events-none"
                aria-hidden="true"
              >
                <CountUp end={s.value} suffix={s.suffix} duration={2500} />
              </div>

              <div className="relative text-[80px] md:text-[110px] leading-none font-serif font-light text-cream-100 text-center">
                <CountUp end={s.value} suffix={s.suffix} duration={2500} />
              </div>

              <div className="mt-6 text-[10px] md:text-xs uppercase tracking-[0.3em] text-cream-100/40">
                {s.label}
              </div>

              <div className="mt-8 mx-auto h-px w-16 bg-gradient-to-r from-transparent via-gold to-transparent" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Counter;