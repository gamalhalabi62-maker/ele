import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Users, Award, Globe } from 'lucide-react';

const POINTS = [
  'Certified instructors with real industry experience',
  'Hands-on labs and real-world projects',
  'Career support and job-ready skills',
  'Flexible learning — study at your own pace',
];

const STATS = [
  { icon: Users,  value: '10K+', label: 'Active learners' },
  { icon: Award,  value: '200+', label: 'Expert courses' },
  { icon: Globe,  value: '95%',  label: 'Success rate' },
];

const WhoWeAre = () => {
  return (
    <section className="section bg-white">
      <div className="container-x">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-card-lg">
              <img
                src="https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=1000"
                alt="Students learning"
                className="w-full h-[420px] md:h-[500px] object-cover"
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="absolute -bottom-6 -right-4 md:-right-6 bg-white rounded-xl shadow-card-lg border border-surface-line p-4 max-w-[200px]"
            >
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-lg bg-brand-100 flex items-center justify-center">
                  <Award className="text-brand-600" size={22} />
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-ink">15+</div>
                  <div className="text-xs text-ink-muted">Years of excellence</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="order-1 lg:order-2"
          >
            <span className="eyebrow">Who We Are</span>
            <h2 className="mt-3 text-3xl md:text-4xl lg:text-5xl font-extrabold text-ink leading-tight text-balance">
              We offer the <span className="text-brand-600">best career path</span> for IT professionals.
            </h2>
            <p className="mt-5 text-lg text-ink-muted leading-relaxed">
              At X-PATH Academy, we bridge the gap between learning and landing your dream job.
              Our programs are crafted by industry experts to give you the practical skills
              employers actually look for.
            </p>

            <ul className="mt-8 grid sm:grid-cols-2 gap-4">
              {POINTS.map((point, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
                  className="flex items-start gap-2.5"
                >
                  <CheckCircle2 size={20} className="text-brand-600 mt-0.5 flex-shrink-0" />
                  <span className="text-ink-soft text-sm">{point}</span>
                </motion.li>
              ))}
            </ul>

            <div className="mt-10 pt-8 border-t border-surface-line grid grid-cols-3 gap-6">
              {STATS.map(({ icon: Icon, value, label }) => (
                <div key={label}>
                  <Icon size={18} className="text-brand-600 mb-2" />
                  <div className="text-2xl font-extrabold text-ink">{value}</div>
                  <div className="text-xs text-ink-muted mt-0.5">{label}</div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Link to="/about" className="btn-primary group">
                Learn More About Us
                <ArrowRight size={17} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;