import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Clock,
  BookOpen,
  Star,
  Users,
  Award,
  FlaskConical,
  ArrowUpRight,
  Check,
  TrendingUp,
} from 'lucide-react';

const HIGHLIGHTS = {
  cyber: [
    'Security operations fundamentals',
    'Analyze network traffic for threats',
    'Incident response playbooks',
    'SIEM configuration & monitoring',
  ],
  network: [
    'Routing and switching mastery',
    'VLANs and inter-VLAN routing',
    'Network security best practices',
    'Complex troubleshooting skills',
  ],
  cloud: [
    'Scalable cloud architectures',
    'Deploy on AWS / Azure / GCP',
    'Infrastructure as Code',
    'Cost optimization strategies',
  ],
  ai: [
    'Build and train ML models',
    'Deploy models to production',
    'Master MLOps workflows',
    'Work with real-world datasets',
  ],
  design: [
    'Industry-standard design tools',
    'Stunning UI/UX interfaces',
    'Scalable design systems',
    'Portfolio that gets hired',
  ],
  testing: [
    'Effective test case design',
    'Selenium automation',
    'CI/CD pipeline integration',
    'Software quality processes',
  ],
};

// ============================================
// Auto-flip timings
// ============================================
const AUTO_FLIP_DELAY_MS = 15000;     // 15s للـ first flip
const BACK_HOLD_MS = 8000;            // 8s يفضل على الـ Back
const LOOP_INTERVAL_MS = 25000;       // 25s بين كل flip بعد الأول

const CourseCard = ({ course }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isVisible, setIsVisible] = useState(false);

  const cardRef = useRef(null);
  const wrapperRef = useRef(null);
  const flipTimerRef = useRef(null);
  const backTimerRef = useRef(null);
  const loopTimerRef = useRef(null);

  // ============ Track mouse for spotlight ============
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  // ============ Detect when card enters viewport ============
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.7 } // 50% من الكارد ظاهر → يعتبر visible
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // ============ Auto-flip timer ============
  useEffect(() => {
    // وقّف كل الـ timers
    const clearAllTimers = () => {
      if (flipTimerRef.current) clearTimeout(flipTimerRef.current);
      if (backTimerRef.current) clearTimeout(backTimerRef.current);
      if (loopTimerRef.current) clearInterval(loopTimerRef.current);
      flipTimerRef.current = null;
      backTimerRef.current = null;
      loopTimerRef.current = null;
    };

    // ما تشتغلش لو:
    // - الكارد مش visible
    // - المستخدم hover فوق الكارد (وقتها الـ hover بيتحكم)
    // - المستخدم عنده prefers-reduced-motion
    if (!isVisible || isHovered) {
      clearAllTimers();
      return;
    }

    // شغل لو الجهاز بيسمح بالحركة
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia('(hover: none)').matches) return; // mobile: skip auto-flip

    // 1) Flip للـ Back بعد 15s
    flipTimerRef.current = setTimeout(() => {
      setIsFlipped(true);

      // 2) ارجع للـ Front بعد 8s
      backTimerRef.current = setTimeout(() => {
        setIsFlipped(false);

        // 3) كرر بعد 25s (15 + 8 + راحة قصيرة)
        loopTimerRef.current = setInterval(() => {
          setIsFlipped(true);
          setTimeout(() => setIsFlipped(false), BACK_HOLD_MS);
        }, LOOP_INTERVAL_MS);
      }, BACK_HOLD_MS);
    }, AUTO_FLIP_DELAY_MS);

    return clearAllTimers;
  }, [isVisible, isHovered]);

  // ============ الـ rotation state ============
  // manual hover beats auto-flip
  const shouldFlip = isHovered || isFlipped;

  const discount = course.oldPrice
    ? Math.round(((course.oldPrice - course.price) / course.oldPrice) * 100)
    : 0;

  const slug = course.slug || `course-${course.id}`;
  const highlights = HIGHLIGHTS[course.category] || HIGHLIGHTS.cyber;

  return (
    <div
      ref={wrapperRef}
      className="group relative w-full h-full"
      style={{ perspective: '2200px' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      <div
        ref={cardRef}
        className="relative w-full h-full"
        style={{
          transformStyle: 'preserve-3d',
          transform: shouldFlip ? 'rotateY(180deg)' : 'rotateY(0deg)',
          transition: 'transform 1000ms cubic-bezier(0.4, 0.0, 0.2, 1)',
        }}
      >
        {/* ════════════ FRONT ════════════ */}
        <Link
          to={`/courses/${slug}`}
          className="block w-full h-full"
          tabIndex={shouldFlip ? -1 : 0}
          style={{ backfaceVisibility: 'hidden' }}
        >
          <article className="relative w-full h-full bg-[#0D0F14] border border-white/[0.06]
                              rounded-xl overflow-hidden flex flex-col cursor-pointer
                              transition-colors duration-500 hover:border-white/[0.12]">

            {/* IMAGE */}
            <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#06070B] shrink-0">
              <img
                src={course.image}
                alt={course.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out
                           group-hover:scale-[1.06]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D0F14] via-[#0D0F14]/40 to-transparent" />

              {/* Top badges */}
              <div className="absolute top-4 left-4 right-4 flex items-start justify-between gap-2">
                <span className="inline-flex items-center px-2.5 py-1 rounded-full
                                 bg-black/60 backdrop-blur-md border border-white/[0.1]
                                 text-[10px] font-medium tracking-[0.1em] uppercase text-white/90">
                  {course.category}
                </span>
                {course.badge && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full
                                   bg-white text-black
                                   text-[10px] font-bold tracking-[0.1em] uppercase">
                    {course.badge}
                  </span>
                )}
              </div>

              {/* Cert */}
              {course.certLogos?.length > 0 && (
                <div className="absolute bottom-4 left-4 flex items-center gap-2
                                px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md
                                border border-white/[0.1]">
                  <Award size={11} className="text-[#E8D5A0]" />
                  <span className="text-[10px] font-medium tracking-[0.08em] uppercase text-white/90">
                    {course.certLogos.join(' · ')}
                  </span>
                </div>
              )}
            </div>

            {/* CONTENT */}
            <div className="relative flex flex-col flex-1 p-6">
              <h3 className="font-medium text-[19px] leading-[1.35] text-white
                             tracking-[-0.01em] line-clamp-2">
                {course.title}
              </h3>
              <p className="mt-1.5 text-[13px] leading-[1.5] text-white/45 font-light line-clamp-1">
                {course.subtitle}
              </p>

              {/* Stats */}
              <div className="mt-5 flex items-center gap-3 text-[12px] text-white/60">
                <span className="flex items-center gap-1.5">
                  <BookOpen size={13} strokeWidth={1.6} />
                  <span className="text-white/80 font-medium">{course.lessons}</span> lessons
                </span>
                <span className="h-3 w-px bg-white/[0.1]" />
                <span className="flex items-center gap-1.5">
                  <FlaskConical size={13} strokeWidth={1.6} />
                  <span className="text-white/80 font-medium">{course.labs}</span> labs
                </span>
                <span className="h-3 w-px bg-white/[0.1]" />
                <span className="flex items-center gap-1.5">
                  <Star size={13} strokeWidth={1.6} className="text-[#E8D5A0] fill-[#E8D5A0]" />
                  <span className="text-white/80 font-medium">{course.rating}</span>
                  <span className="text-white/40">({(course.reviews / 1000).toFixed(1)}k)</span>
                </span>
              </div>

              {/* Instructor */}
              <div className="mt-5 flex items-center gap-3">
                <img
                  src={course.instructor.avatar}
                  alt={course.instructor.name}
                  className="h-9 w-9 rounded-full object-cover border border-white/[0.1]"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] text-white/85 font-medium truncate leading-tight">
                    {course.instructor.name}
                  </div>
                  <div className="text-[11px] text-white/40 leading-tight mt-0.5">
                    Instructor
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-white/50">
                  <Users size={12} strokeWidth={1.6} />
                  <span className="text-[12px] text-white/70">
                    {(course.students / 1000).toFixed(1)}k
                  </span>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-auto pt-5 flex items-end justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    {discount > 0 && (
                      <span className="text-[11px] text-white/30 line-through font-mono">
                        {course.oldPrice.toLocaleString()}
                      </span>
                    )}
                    {discount > 0 && (
                      <span className="text-[10px] font-mono tracking-wider
                                       text-[#6FE8FF]/80 uppercase">
                        −{discount}%
                      </span>
                    )}
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-[22px] text-white font-medium leading-none tracking-tight">
                      {course.price.toLocaleString()}
                    </span>
                    <span className="text-[11px] text-white/40 font-mono tracking-wider uppercase">
                      {course.currency}
                    </span>
                  </div>
                </div>
                <span className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg
                                 bg-white text-black
                                 text-[11px] font-bold tracking-[0.1em] uppercase
                                 transition-all duration-300
                                 group-hover:bg-[#6FE8FF] group-hover:gap-2.5">
                  Enroll
                  <ArrowUpRight size={13} strokeWidth={2.4} />
                </span>
              </div>
            </div>
          </article>
        </Link>

        {/* ════════════ BACK ════════════ */}
        <Link
          to={`/courses/${slug}`}
          className="block w-full h-full absolute inset-0"
          tabIndex={shouldFlip ? 0 : -1}
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <article className="relative w-full h-full bg-[#0D0F14]
                              border border-[#6FE8FF]/20 rounded-xl overflow-hidden
                              flex flex-col cursor-pointer
                              shadow-[0_24px_80px_-30px_rgba(111,232,255,0.35)]">
            <div
              className="absolute inset-0 pointer-events-none opacity-60"
              style={{
                background: `radial-gradient(circle 500px at ${100 - mousePos.x}% ${mousePos.y}%, rgba(111,232,255,0.07), transparent 70%)`,
              }}
            />
            <div className="absolute top-0 left-0 right-0 h-px
                            bg-gradient-to-r from-transparent via-[#6FE8FF] to-transparent" />

            <div className="relative flex flex-col flex-1 p-6">
              <div className="flex items-center justify-between mb-5">
                <span className="inline-flex items-center px-2.5 py-1 rounded-full
                                 bg-[#6FE8FF]/10 border border-[#6FE8FF]/25
                                 text-[10px] font-medium tracking-[0.1em] uppercase
                                 text-[#6FE8FF]">
                  {course.category}
                </span>
                <span className="flex items-center gap-1.5 text-[11px] text-white/40">
                  <Clock size={11} strokeWidth={1.6} />
                  {course.duration}
                </span>
              </div>

              <h3 className="font-medium text-[16px] leading-[1.35] text-white
                             tracking-[-0.01em] line-clamp-2">
                {course.title}
              </h3>

              <div className="mt-1 mb-5 flex items-center gap-2">
                <span className="h-px w-5 bg-[#6FE8FF]/60" />
                <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-medium">
                  What you'll learn
                </span>
              </div>

              <div className="space-y-3 flex-1">
                {highlights.map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <span className="h-4 w-4 mt-0.5 shrink-0 flex items-center justify-center
                                     rounded-full bg-[#6FE8FF]/15 border border-[#6FE8FF]/30">
                      <Check size={9} strokeWidth={3} className="text-[#6FE8FF]" />
                    </span>
                    <span className="text-[12.5px] leading-relaxed text-white/75 font-light">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4 py-4 my-4 border-y border-white/[0.06]">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.15em] text-white/35 mb-1">
                    Level
                  </div>
                  <div className="text-[13px] text-white font-medium flex items-center gap-1.5">
                    <TrendingUp size={12} className="text-[#6FE8FF]" strokeWidth={2} />
                    {course.level}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.15em] text-white/35 mb-1">
                    Enrolled
                  </div>
                  <div className="text-[13px] text-white font-medium">
                    {(course.students / 1000).toFixed(1)}k students
                  </div>
                </div>
              </div>

              <div className="mt-auto">
                <div className="flex items-center justify-between gap-3
                                px-5 py-3.5 rounded-lg
                                bg-[#6FE8FF] text-black
                                text-[11px] font-bold tracking-[0.1em] uppercase
                                transition-all duration-300">
                  <span>View Details</span>
                  <ArrowUpRight size={14} strokeWidth={2.4} />
                </div>
              </div>
            </div>
          </article>
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;