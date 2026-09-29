import { useEffect, useState } from 'react';

const SECTIONS = [
  { id: 'overview',    label: 'Overview' },
  { id: 'curriculum',  label: 'Curriculum' },
  { id: 'instructor',  label: 'Instructor' },
  { id: 'reviews',     label: 'Reviews' },
  { id: 'qa',          label: 'Q&A' },
  { id: 'faq',         label: 'FAQ' },
];

const CourseSubNav = () => {
  const [active, setActive] = useState('overview');

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY + 200;
      for (const s of SECTIONS) {
        const el = document.getElementById(s.id);
        if (el && el.offsetTop <= scrollY) setActive(s.id);
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 100;
      window.scrollTo({ top: el.offsetTop - offset, behavior: 'smooth' });
    }
  };

  return (
    <nav className="sticky top-0 z-30 bg-void/85 backdrop-blur-xl border-y border-white/[0.06]">
      <div className="container-x">
        <div className="flex items-center gap-6 overflow-x-auto scrollbar-hide py-4">
          {SECTIONS.map((s) => {
            const isActive = active === s.id;
            return (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className={`shrink-0 py-2 text-[11px] font-mono uppercase tracking-[0.2em]
                           border-b-2 transition-all duration-300 ${
                             isActive
                               ? 'text-white border-white'
                               : 'text-neutral-500 hover:text-neutral-200 border-transparent'
                           }`}
              >
                {s.label}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default CourseSubNav;