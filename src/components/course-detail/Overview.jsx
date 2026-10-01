import { useEffect, useRef, useState } from 'react';
import {
  CheckCircle2, Clock, BookOpen, BarChart3, Award,
  Globe, Subtitles, FileBadge, FlaskConical, Users,
  Target, GraduationCap, Briefcase, ChevronRight,
} from 'lucide-react';

// ============================================
// Hook — Fade-in on scroll
// ============================================
const useReveal = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return { ref, visible };
};

// ============================================
// Section wrapper with reveal
// ============================================
const Reveal = ({ children, delay = 0 }) => {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 600ms ease-out ${delay}ms, transform 600ms ease-out ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

// ============================================
// Section heading
// ============================================
const SectionTitle = ({ children, accent }) => (
  <h3 className="font-sans font-light text-2xl md:text-3xl text-white mb-6 tracking-tight">
    {children}
    {accent && <span className="italic text-neutral-400"> {accent}</span>}
  </h3>
);

// ============================================
// Overview — Main
// ============================================
const Overview = ({ course }) => {
  if (!course) return null;

  const accent = course.accent || '#6FE8FF';

  // دعم أسماء متعددة للحقول
  const whatYouLearn =
    course.learnOutcomes ||
    course.whatYouLearn ||
    course.outcomes ||
    [];

  const requirements =
    course.requirements || [
      `Basic understanding of ${course.category} concepts`,
      'A computer with internet connection',
      'Willingness to practice and build projects',
      'No prior expert knowledge required',
    ];

  const audience =
    course.audience ||
    course.whoIsThisFor || [
      `Beginners eager to start a career in ${course.category}`,
      'Professionals looking to level up their skills',
      'Students preparing for certification exams',
      'Anyone passionate about hands-on learning',
    ];

  // Stats
  const stats = [
    { Icon: Clock,         label: 'Duration',    value: course.duration },
    { Icon: BookOpen,      label: 'Lessons',     value: `${course.lessons} lessons` },
    { Icon: BarChart3,     label: 'Level',       value: course.level },
    { Icon: FlaskConical,  label: 'Labs',        value: `${course.labs || 0} labs` },
  ].filter((s) => s.value);

  // Includes
  const includes = [
    course.certificate    && { Icon: Award,        label: 'Certificate of completion' },
    course.hasSubtitles   && { Icon: Subtitles,    label: 'Subtitles available' },
    course.language       && { Icon: Globe,        label: course.language },
    course.quizzes        && { Icon: FileBadge,    label: `${course.quizzes} quizzes` },
    course.projects       && { Icon: Briefcase,    label: `${course.projects} hands-on projects` },
    course.lastUpdated    && { Icon: GraduationCap,label: `Updated ${course.lastUpdated}` },
  ].filter(Boolean);

  return (
    <section id="overview" className="scroll-mt-32">

      {/* ============ STATS STRIP ============ */}
      {stats.length > 0 && (
        <Reveal>
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-14
                       p-4 md:p-5 rounded-xl
                       bg-white/[0.02] border border-white/[0.06]"
          >
            {stats.map((s, i) => {
              const Icon = s.Icon;
              return (
                <div key={i} className="flex items-center gap-3">
                  <div
                    className="h-10 w-10 shrink-0 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${accent}15` }}
                  >
                    <Icon size={16} style={{ color: accent }} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[9px] uppercase tracking-[0.2em] text-white/40 font-mono">
                      {s.label}
                    </p>
                    <p className="text-white text-sm font-medium truncate">
                      {s.value}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      )}

      {/* ============ ABOUT ============ */}
      <Reveal>
        <SectionTitle>About this <span className="italic text-neutral-400">course</span></SectionTitle>
        <p className="text-white/70 leading-relaxed font-light text-base md:text-lg max-w-3xl">
          {course.description}
        </p>
      </Reveal>

      {/* ============ WHAT YOU'LL LEARN ============ */}
      {whatYouLearn.length > 0 && (
        <Reveal delay={80}>
          <div className="mt-14">
            <SectionTitle>What you'll <span className="italic text-neutral-400">learn</span></SectionTitle>
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
              {whatYouLearn.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 group/li
                             p-3 -m-3 rounded-lg
                             hover:bg-white/[0.02] transition-colors duration-200"
                >
                  <span
                    className="shrink-0 mt-0.5 h-5 w-5 rounded-full
                               flex items-center justify-center
                               transition-transform group-hover/li:scale-110"
                    style={{ backgroundColor: `${accent}20` }}
                  >
                    <CheckCircle2 size={12} style={{ color: accent }} />
                  </span>
                  <span className="text-white/80 text-sm leading-relaxed font-light">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      )}

      {/* ============ COURSE INCLUDES ============ */}
      {includes.length > 0 && (
        <Reveal delay={120}>
          <div className="mt-14">
            <SectionTitle>This course <span className="italic text-neutral-400">includes</span></SectionTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {includes.map((item, i) => {
                const Icon = item.Icon;
                return (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-3.5 rounded-lg
                               border border-white/[0.06] bg-white/[0.02]
                               hover:border-white/[0.12] hover:bg-white/[0.04]
                               transition-colors duration-200"
                  >
                    <Icon size={15} style={{ color: accent }} />
                    <span className="text-white/75 text-sm font-light">
                      {item.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>
      )}

      {/* ============ REQUIREMENTS ============ */}
      {requirements.length > 0 && (
        <Reveal delay={160}>
          <div className="mt-14">
            <SectionTitle>Requirements</SectionTitle>
            <ul className="space-y-3">
              {requirements.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <ChevronRight
                    size={16}
                    className="mt-1 shrink-0"
                    style={{ color: accent }}
                  />
                  <span className="text-white/70 text-sm leading-relaxed font-light">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      )}

      {/* ============ WHO IS THIS FOR ============ */}
      {audience.length > 0 && (
        <Reveal delay={200}>
          <div className="mt-14">
            <SectionTitle>Who is this <span className="italic text-neutral-400">for</span></SectionTitle>
            <div className="grid sm:grid-cols-2 gap-3">
              {audience.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-4 rounded-lg
                             border border-white/[0.06] bg-white/[0.02]
                             hover:border-white/[0.12] transition-colors duration-200"
                >
                  <div
                    className="h-8 w-8 shrink-0 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${accent}15` }}
                  >
                    <Users size={14} style={{ color: accent }} />
                  </div>
                  <span className="text-white/75 text-sm leading-relaxed font-light pt-1">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      )}

    </section>
  );
};

export default Overview;