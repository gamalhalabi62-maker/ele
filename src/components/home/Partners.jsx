import { useState } from 'react';
import { usePinnedHorizontal } from '../../hooks/usePinnedHorizontal';
import { partners } from '../../mocks/partners';

const PartnerLogo = ({ partner }) => {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span className="text-3xl md:text-4xl font-serif font-light text-cream-100/40 whitespace-nowrap
                       tracking-wide">
        {partner.name}
      </span>
    );
  }

  return (
    <img
      src={partner.logo}
      alt={partner.name}
      className="max-h-full w-auto max-w-[140px] object-contain opacity-60 hover:opacity-100 transition-opacity duration-500"
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
};

const Partners = () => {
  const { sectionRef, trackRef } = usePinnedHorizontal({
    cardSelector: '.partner-item',
    extraSpace: 80,
  });

  const list = [...partners, ...partners];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden min-h-screen flex items-center"
    >
      <div className="w-full relative">
        <div className="container-x mb-16">
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <div>
              <span className="eyebrow">Memberships</span>
              <h2 className="mt-6 text-4xl md:text-6xl font-serif font-light text-cream-100">
                Trusted by <span className="italic text-gold">the best</span>
              </h2>
            </div>
            <p className="text-cream-100/50 text-sm max-w-sm">
              We partner with global leaders in technology, cloud, and certification.
            </p>
          </div>
        </div>

        <div className="overflow-hidden w-full">
          <div
            ref={trackRef}
            className="flex items-center gap-24 pl-6 lg:pl-[max(2rem,calc((100vw-1440px)/2))] pr-32 will-change-transform"
          >
            {list.map((p, i) => (
              <div
                key={i}
                className="partner-item shrink-0 h-20 md:h-24 min-w-[160px]
                           flex items-center justify-center"
              >
                <PartnerLogo partner={p} />
              </div>
            ))}
          </div>
        </div>

        <div className="container-x mt-16 flex items-center justify-between text-[10px] uppercase tracking-[0.25em] text-cream-100/40">
          <span>Scroll to explore</span>
          <span>{partners.length} Partners</span>
        </div>
      </div>
    </section>
  );
};

export default Partners;