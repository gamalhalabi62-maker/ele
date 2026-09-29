import { FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa6';
import { useRevealOnScroll } from '../../hooks/useRevealOnScroll';
import SplitText from '../ui/SplitText';
import { teachers } from '../../mocks/teachers';

const SOCIALS = [FaTwitter, FaFacebookF, FaLinkedinIn];

const Teachers = () => {
  const cardsRef = useRevealOnScroll({ selector: '.teacher-card', from: 'bottom', stagger: 0.12, duration: 0.9 });

  return (
<section className="relative overflow-hidden">
      <div className="container-x relative">
        <div className="text-center mb-20">
          <span className="eyebrow justify-center">Instructors</span>
          <SplitText
            as="h2"
            variant="words"
            text="Learn from the best."
            className="mt-6 text-5xl md:text-7xl font-serif font-light text-cream-100"
          />
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teachers.map((t) => (
            <div
              key={t.id}
              className="teacher-card group relative overflow-hidden aspect-[4/5]
                         border border-white/5 hover:border-gold/40 transition-colors duration-500"
              data-cursor="image"
            >
              <img
                src={t.image}
                alt={t.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep via-deep/30 to-transparent" />

              <div className="absolute top-5 right-5 flex flex-col gap-2 translate-x-20 group-hover:translate-x-0 transition-transform duration-500">
                {SOCIALS.map((Icon, idx) => (
                  <a
                    key={idx}
                    href="#"
                    className="h-10 w-10 bg-gold/90 hover:bg-gold flex items-center justify-center text-deep transition-colors"
                  >
                    <Icon size={14} />
                  </a>
                ))}
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="font-serif text-2xl text-cream-100">{t.name}</div>
                <div className="text-xs uppercase tracking-[0.25em] text-gold mt-2">{t.role}</div>
                <div className="flex items-center gap-4 mt-4 text-[11px] text-cream-100/50">
                  <span>{t.courses} Courses</span>
                  <span className="h-1 w-1 rounded-full bg-gold/60" />
                  <span>{t.students.toLocaleString()} Students</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Teachers;