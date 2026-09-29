import { useEffect, useRef } from 'react';
import CourseCard from './CourseCard';

const CoursesGrid = ({ courses }) => {
  const gridRef = useRef(null);

  // Re-animate on filter change
  useEffect(() => {
    let mounted = true;
    let ctx;
    const init = async () => {
      const { gsap } = await import('gsap');
      if (!mounted || !gridRef.current) return;

      const cards = gridRef.current.querySelectorAll('.course-card');
      if (!cards.length) return;

      ctx = gsap.context(() => {
        gsap.fromTo(
          cards,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.05,
            ease: 'power3.out',
          }
        );
      }, gridRef.current);
    };
    const t = setTimeout(init, 50);
    return () => {
      mounted = false;
      clearTimeout(t);
      ctx?.revert();
    };
  }, [courses]);

  if (!courses.length) {
    return (
      <section className="bg-void py-24">
        <div className="container-x text-center">
          <p className="font-mono text-sm text-ink-muted uppercase tracking-[0.3em]">
            // No programs match your filter
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-void pb-24 md:pb-32 pt-12">
      <div className="container-x">
        <div
          ref={gridRef}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoursesGrid;