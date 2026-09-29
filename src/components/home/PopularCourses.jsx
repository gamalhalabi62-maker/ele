import { ArrowUpRight, BookOpen, Users } from 'lucide-react';
import { usePinnedHorizontal } from '../../hooks/usePinnedHorizontal';
import { courses } from '../../mocks/courses';

const PopularCourses = () => {
  const { sectionRef, trackRef } = usePinnedHorizontal({
    cardSelector: '.course-card',
    extraSpace: 120,
  });

  return (
    <section
      ref={sectionRef}
      className="relative bg-deep min-h-screen flex items-center overflow-hidden"
    >
      <div className="w-full">
        <div className="container-x mb-14">
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <div>
              <span className="eyebrow">Most popular</span>
              <h2 className="mt-6 text-4xl md:text-6xl font-serif font-light text-cream-100">
                Courses <span className="italic text-gold">you&apos;ll love</span>
              </h2>
            </div>
            <p className="text-cream-100/50 text-sm max-w-sm">
              Hand-picked by our instructors. Rated by thousands of students.
            </p>
          </div>
        </div>

        <div className="overflow-hidden w-full">
          <div
            ref={trackRef}
            className="flex gap-6 pl-6 lg:pl-[max(2rem,calc((100vw-1440px)/2))] pr-32 will-change-transform"
          >
            {courses.map((c) => (
              <article
                key={c.id}
                className="course-card group w-[320px] md:w-[420px] shrink-0 bg-deep-soft
                           border border-white/5 hover:border-gold/40 transition-colors duration-500
                           overflow-hidden"
                data-cursor="image"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={c.image}
                    alt={c.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-deep via-transparent to-transparent" />

                  <div className="absolute top-4 left-4 px-3 py-1.5 bg-deep/80 backdrop-blur-sm border border-white/10
                                  text-[10px] uppercase tracking-[0.2em] text-gold">
                    {c.category}
                  </div>
                  <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-gold text-deep
                                  text-sm font-medium">
                    {c.price}
                  </div>
                </div>

                <div className="p-6">
                  <div className="text-xs mb-3 text-cream-100/40">
                    By <span className="text-gold">{c.author}</span>
                  </div>
                  <h3 className="text-lg font-serif font-light text-cream-100 leading-snug mb-5 line-clamp-2 group-hover:text-gold transition-colors">
                    {c.title}
                  </h3>

                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <div className="flex items-center gap-5 text-[11px] text-cream-100/50">
                      <span className="flex items-center gap-1.5">
                        <BookOpen size={13} /> {c.lessons}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Users size={13} /> {c.students}
                      </span>
                    </div>
                    <ArrowUpRight size={16} className="text-gold group-hover:rotate-45 transition-transform duration-500" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="container-x mt-14 flex items-center justify-between text-[10px] uppercase tracking-[0.25em] text-cream-100/40">
          <span>Scroll to explore</span>
          <span>{courses.length} Courses</span>
        </div>
      </div>
    </section>
  );
};

export default PopularCourses;