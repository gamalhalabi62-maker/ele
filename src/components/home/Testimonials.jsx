import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { useRevealOnScroll } from '../../hooks/useRevealOnScroll';
import SplitText from '../ui/SplitText';

const TESTIMONIALS = [
  { id: 1, name: 'Russell Sprout', role: 'Student, CSE', image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600', text: 'The instructors at Talim are practitioners, not just teachers. Every lesson came from real-world experience. I landed my first security role within three months.', rating: 5 },
  { id: 2, name: 'Sofia Martinez', role: 'Student, Design', image: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=600', text: 'I tried four other platforms before Talim. The difference is the depth — you actually build things, not just watch tutorials. Best investment I have ever made in myself.', rating: 5 },
  { id: 3, name: 'David Chen', role: 'Student, Business', image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=600', text: 'The community and mentorship are unmatched. Whenever I got stuck, someone was there within minutes. It felt like learning alongside a team, not alone.', rating: 5 },
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const t = TESTIMONIALS[current];
  const rootRef = useRevealOnScroll({ selector: '.testi-item', from: 'bottom', stagger: 0.15, duration: 0.9 });

  return (
<section className="relative overflow-hidden">
      <div ref={rootRef} className="container-x relative">
        <div className="testi-item text-center mb-20">
          <span className="eyebrow justify-center">Testimonials</span>
          <SplitText
            as="h2"
            variant="words"
            text="What students say."
            className="mt-6 text-5xl md:text-7xl font-serif font-light text-cream-100"
          />
        </div>

        <div className="testi-item max-w-6xl mx-auto">
          <div className="grid md:grid-cols-12 gap-0 bg-deep border border-white/5 relative overflow-hidden">

            {/* Image */}
            <div className="md:col-span-5 relative min-h-[380px] md:min-h-[540px]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={t.id}
                  initial={{ opacity: 0, scale: 1.08 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.6 }}
                  src={t.image}
                  alt={t.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-deep/70 to-transparent" />
            </div>

            <div className="md:col-span-7 p-10 md:p-14 relative">
              <Quote className="absolute top-8 right-8 text-white/[0.03]" size={140} strokeWidth={1} />

              <AnimatePresence mode="wait">
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex items-center gap-1 mb-8">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} size={16} className={s <= t.rating ? 'fill-gold text-gold' : 'text-white/15'} />
                    ))}
                  </div>

                  <p className="text-cream-100/85 text-xl md:text-2xl leading-relaxed font-serif font-light mb-10">
                    &ldquo;{t.text}&rdquo;
                  </p>

                  <div className="flex items-center gap-5 pt-8 border-t border-white/10">
                    <div className="h-px w-12 bg-gold" />
                    <div>
                      <div className="font-serif text-lg text-cream-100">{t.name}</div>
                      <div className="text-cream-100/40 text-xs uppercase tracking-[0.2em] mt-1">
                        {t.role}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 mt-12">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-px transition-all duration-500 ${
                  i === current ? 'w-16 bg-gold' : 'w-8 bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;