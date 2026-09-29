import { useState } from 'react';
import { ChevronDown, Check, Clock, BookOpen } from 'lucide-react';

const Curriculum = ({ course }) => {
  // ===== Curriculum — safe fallback =====
  const curriculum = Array.isArray(course?.curriculum) ? course.curriculum : [];

  // أول section مفتوحة افتراضيًا
  const [openSections, setOpenSections] = useState(
    curriculum.length > 0 ? { [curriculum[0].id]: true } : {}
  );

  const toggle = (id) =>
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }));

  // ===== إجمالي الدروس =====
  const totalLessons = curriculum.reduce(
    (acc, s) => acc + (s.lessons || 0),
    0
  );

  // ===== إجمالي المدة =====
  const totalDuration = curriculum.reduce((acc, s) => {
    const match = String(s.duration || '').match(/(\d+)\s*h\s*(\d+)?/);
    if (!match) return acc;
    const h = parseInt(match[1] || 0, 10);
    const m = parseInt(match[2] || 0, 10);
    return acc + h * 60 + m;
  }, 0);

  const totalHours = Math.floor(totalDuration / 60);
  const totalMins = totalDuration % 60;

  // ===== Expand all / Collapse all =====
  const expandAll = () => {
    const all = {};
    curriculum.forEach((s) => (all[s.id] = true));
    setOpenSections(all);
  };

  const collapseAll = () => setOpenSections({});

  // ===== Empty state =====
  if (!curriculum.length) {
    return (
      <section id="curriculum" className="scroll-mt-32">
        <h2 className="font-sans font-light text-3xl md:text-4xl text-white mb-4 tracking-tight">
          Course <span className="italic text-neutral-400">outline</span>
        </h2>
        <p className="text-white/50 text-sm font-light">
          Curriculum details are being updated. Check back soon.
        </p>
      </section>
    );
  }

  return (
    <section id="curriculum" className="scroll-mt-32">
      {/* ============ Header ============ */}
      <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
        <div>
          <h2 className="font-sans font-light text-3xl md:text-4xl text-white tracking-tight">
            Course <span className="italic text-neutral-400">outline</span>
          </h2>
          <p className="mt-2 text-sm text-white/50 font-light">
            {curriculum.length} sections · {totalLessons} lessons ·{' '}
            {totalHours}h {totalMins}m total
          </p>
        </div>

        {/* Expand/Collapse all */}
        <div className="flex items-center gap-3">
          <button
            onClick={expandAll}
            className="text-[11px] font-mono uppercase tracking-[0.2em] text-white/50
                       hover:text-white transition-colors"
          >
            Expand all
          </button>
          <span className="text-white/20">·</span>
          <button
            onClick={collapseAll}
            className="text-[11px] font-mono uppercase tracking-[0.2em] text-white/50
                       hover:text-white transition-colors"
          >
            Collapse all
          </button>
        </div>
      </div>

      {/* ============ Sections ============ */}
      <div className="border border-white/[0.06] divide-y divide-white/[0.06]">
        {curriculum.map((section) => {
          const isOpen = !!openSections[section.id];
          const outcomes = Array.isArray(section.outcomes)
            ? section.outcomes
            : Array.isArray(section.items)
            ? section.items.map((it) => it.title || it)
            : [];

          return (
            <div key={section.id} className="group/section">
              {/* ===== Section header ===== */}
              <button
                onClick={() => toggle(section.id)}
                className="w-full flex items-start gap-4 md:gap-5 p-5 md:p-6 text-left
                           hover:bg-white/[0.02] transition-colors"
              >
                {/* Number */}
                <span
                  className="font-mono text-[10px] uppercase tracking-[0.3em] mt-1 shrink-0
                             text-white/40 group-hover/section:text-neon-cyan transition-colors"
                >
                  {String(section.id || 0).padStart(2, '0')}
                </span>

                {/* Title + description + meta */}
                <div className="flex-1 min-w-0">
                  <h3
                    className="text-white text-lg md:text-xl font-normal leading-tight
                               group-hover/section:text-neon-cyan transition-colors"
                  >
                    {section.title || 'Untitled Section'}
                  </h3>

                  {section.description && (
                    <p className="mt-2 text-sm text-white/50 font-light leading-relaxed max-w-2xl">
                      {section.description}
                    </p>
                  )}

                  <div
                    className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2
                               text-[11px] font-mono uppercase tracking-[0.2em] text-white/40"
                  >
                    {section.lessons != null && (
                      <span className="flex items-center gap-1.5">
                        <BookOpen size={11} />
                        {section.lessons} lessons
                      </span>
                    )}

                    {section.lessons != null && section.duration && (
                      <span className="h-2.5 w-px bg-white/[0.1]" />
                    )}

                    {section.duration && (
                      <span className="flex items-center gap-1.5">
                        <Clock size={11} />
                        {section.duration}
                      </span>
                    )}
                  </div>
                </div>

                {/* Toggle icon */}
                <ChevronDown
                  size={18}
                  className={`text-white/40 shrink-0 mt-1 transition-transform duration-300
                              group-hover/section:text-white ${
                                isOpen ? 'rotate-180' : ''
                              }`}
                />
              </button>

              {/* ===== Outcomes ===== */}
              {outcomes.length > 0 && (
                <div
                  className={`overflow-hidden transition-all duration-500 ${
                    isOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-5 md:px-6 pb-6 pt-2 pl-[3.25rem] md:pl-[3.75rem]">
                    <div className="border-l-2 border-neon-cyan/20 pl-5 md:pl-6">
                      <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-neon-cyan mb-4">
                        What you'll learn
                      </p>

                      <ul className="space-y-3">
                        {outcomes.map((outcome, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-3 group/outcome"
                          >
                            <span
                              className="h-4 w-4 mt-0.5 shrink-0 flex items-center justify-center
                                         border border-white/20 rounded-full
                                         group-hover/outcome:border-neon-cyan/60
                                         transition-colors"
                            >
                              <Check
                                size={9}
                                className="text-white/60 group-hover/outcome:text-neon-cyan
                                           transition-colors"
                              />
                            </span>

                            <span
                              className="text-sm text-white/80 leading-relaxed font-light
                                         group-hover/outcome:text-white transition-colors"
                            >
                              {typeof outcome === 'string'
                                ? outcome
                                : outcome?.title || outcome?.text || ''}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ============ Bottom summary ============ */}
      <div
        className="mt-6 flex flex-wrap items-center justify-between gap-4
                   p-5 border border-white/[0.06] bg-white/[0.01]"
      >
        <div className="flex items-center gap-6">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40 mb-1">
              Total Content
            </div>
            <div className="text-white text-sm">
              {curriculum.length} sections · {totalLessons} lessons
            </div>
          </div>

          <div className="h-10 w-px bg-white/[0.08] hidden sm:block" />

          <div className="hidden sm:block">
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40 mb-1">
              Duration
            </div>
            <div className="text-white text-sm">
              {totalHours}h {totalMins}m on-demand
            </div>
          </div>
        </div>

        <a
          href="#enroll"
          className="inline-flex items-center gap-2 px-5 py-3
                     bg-white text-neutral-950
                     font-mono text-[10px] uppercase tracking-[0.2em]
                     hover:bg-neon-cyan transition-colors duration-500"
        >
          Enroll to Access
          <span>→</span>
        </a>
      </div>
    </section>
  );
};

export default Curriculum;