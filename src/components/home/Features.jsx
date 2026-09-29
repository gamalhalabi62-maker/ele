import { motion } from 'framer-motion';
import { features } from '../../mocks/features';

const Features = () => {
  return (
    <section className="section bg-surface-base">
      <div className="container-x">

        <div className="max-w-2xl mx-auto text-center mb-12 md:mb-16">
          <span className="eyebrow">Why Choose Us</span>
          <h2 className="mt-3 text-3xl md:text-4xl lg:text-5xl font-extrabold text-ink text-balance">
            Everything you need to <span className="text-brand-600">succeed</span>
          </h2>
          <p className="mt-4 text-lg text-ink-muted text-pretty">
            Built for learners who want real results — not just certificates.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: i * 0.12, duration: 0.6 }}
                className="group bg-white rounded-2xl border border-surface-line p-7
                           shadow-card hover:shadow-card-hover hover:-translate-y-1
                           hover:border-brand-200 transition-all duration-300"
              >
                <div className="h-14 w-14 rounded-2xl bg-brand-50 group-hover:bg-brand-600
                                flex items-center justify-center transition-colors duration-300">
                  <Icon
                    size={26}
                    className="text-brand-600 group-hover:text-white transition-colors duration-300"
                    strokeWidth={2.2}
                  />
                </div>

                <h3 className="mt-6 text-xl font-bold text-ink">
                  {f.title}
                </h3>
                <p className="mt-3 text-ink-muted text-sm leading-relaxed">
                  {f.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;