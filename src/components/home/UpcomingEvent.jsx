import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, ArrowRight } from 'lucide-react';
import { upcomingEvent } from '../../mocks/events';

const formatEventDate = (dateStr) => {
  const d = new Date(dateStr);
  return {
    day:   d.toLocaleDateString('en-US', { day: '2-digit' }),
    month: d.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
    full:  d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
    time:  d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
  };
};

const UpcomingEvent = () => {
  const ev = upcomingEvent;
  const date = formatEventDate(ev.date);
  const seatsLeft = ev.seats - ev.registered;
  const percent = Math.round((ev.registered / ev.seats) * 100);

  return (
    <section className="section bg-white">
      <div className="container-x">

        <div className="max-w-2xl mb-10 md:mb-14">
          <span className="eyebrow">Upcoming Event</span>
          <h2 className="mt-3 text-3xl md:text-4xl lg:text-5xl font-extrabold text-ink text-balance">
            Join our next <span className="text-brand-600">big moment</span>
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="grid lg:grid-cols-12 gap-0 rounded-2xl overflow-hidden shadow-card-lg border border-surface-line bg-white"
        >
          <div className="lg:col-span-5 relative min-h-[240px] lg:min-h-full">
            <img
              src={ev.image}
              alt={ev.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

            <div className="absolute top-4 left-4 bg-white rounded-xl shadow-lg p-3 text-center min-w-[65px]">
              <div className="text-2xl font-extrabold text-brand-600 leading-none">
                {date.day}
              </div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-ink-muted mt-1">
                {date.month}
              </div>
            </div>

            <div className="absolute bottom-4 left-4 right-4 text-white">
              <div className="flex items-center gap-2 text-sm">
                <MapPin size={15} />
                <span className="font-medium">{ev.location}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 p-6 md:p-8 lg:p-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-100 text-accent-700 text-xs font-bold uppercase tracking-wide">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-500 animate-pulse" />
              Live event
            </div>

            <h3 className="mt-4 text-2xl md:text-3xl font-extrabold text-ink">
              {ev.title}
            </h3>

            <p className="mt-3 text-ink-muted leading-relaxed">
              {ev.description}
            </p>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <div className="h-9 w-9 rounded-lg bg-brand-50 flex items-center justify-center flex-shrink-0">
                  <Calendar size={16} className="text-brand-600" />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-ink-muted font-bold">
                    Date
                  </div>
                  <div className="text-sm font-semibold text-ink">{date.full}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="h-9 w-9 rounded-lg bg-brand-50 flex items-center justify-center flex-shrink-0">
                  <Users size={16} className="text-brand-600" />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-ink-muted font-bold">
                    Seats
                  </div>
                  <div className="text-sm font-semibold text-ink">
                    {ev.registered} registered · <span className="text-brand-600">{seatsLeft} left</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-xl bg-surface-soft border border-surface-line">
              <div className="flex items-center justify-between mb-2 text-xs font-semibold">
                <span className="text-ink-soft">Registration</span>
                <span className="text-brand-600">{percent}%</span>
              </div>
              <div className="h-2 rounded-full bg-surface-line overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${percent}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
                  className="h-full bg-brand-600 rounded-full"
                />
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button className="btn-primary group">
                {ev.cta}
                <ArrowRight size={17} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="btn-secondary">
                View Details
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default UpcomingEvent;