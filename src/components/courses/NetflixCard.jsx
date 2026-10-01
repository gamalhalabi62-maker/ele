import { useRef, useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import {
  Star, Play, Plus, ThumbsUp, ChevronDown, Clock,
  BarChart3, CheckCircle2, Users, X,
} from 'lucide-react';

const badgeStyles = {
  NEW:        { bg: 'bg-[#6FE8FF]', text: 'text-black', glow: '0 0 20px rgba(111,232,255,0.5)' },
  HOT:        { bg: 'bg-[#FF5A5F]', text: 'text-white', glow: '0 0 20px rgba(255,90,95,0.5)'  },
  BESTSELLER: { bg: 'bg-[#E8D5A0]', text: 'text-black', glow: '0 0 20px rgba(232,213,160,0.5)' },
  POPULAR:    { bg: 'bg-[#A68BFF]', text: 'text-white', glow: '0 0 20px rgba(166,139,255,0.5)' },
  DEFAULT:    { bg: 'bg-white',     text: 'text-black', glow: '0 0 16px rgba(255,255,255,0.35)' },
};

const UNIFIED_ACCENT = '#6FE8FF';
const PANEL_WIDTH    = 320;
const PANEL_GAP      = 14;
const MOBILE_BP      = 768;
const OPEN_DELAY     = 140;   // ms
const CLOSE_DELAY    = 200;   // ms

const NetflixCard = ({
  course,
  index = 0,
  showRanking = false,
  isOpen = false,
  onOpen,
  onClose,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [panelPos, setPanelPos]   = useState({ top: 0, left: 0, side: 'right' });
  const [isMobile, setIsMobile]   = useState(false);
  const [mounted, setMounted]     = useState(false);

  const hoverTimeout = useRef(null);
  const leaveTimeout = useRef(null);
  const cardRef      = useRef(null);
  const panelRef     = useRef(null);
  const isScrolling  = useRef(false);

  const slug   = course.slug || `course-${course.id}`;
  const badge  = badgeStyles[course.badge] || badgeStyles.DEFAULT;
  const accent = UNIFIED_ACCENT;

  const outcomes =
    course.learnOutcomes || course.outcomes || course.learnings ||
    course.whatYouWillLearn || [];

  useEffect(() => { setMounted(true); }, []);

  // مراقبة حجم الشاشة
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < MOBILE_BP);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // حساب موضع اللوحة
  const computePosition = useCallback(() => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const vw   = window.innerWidth;

    if (vw < MOBILE_BP) {
      const panelWidth = Math.min(PANEL_WIDTH, vw - 24);
      const left = Math.max(12, Math.min(rect.left, vw - panelWidth - 12));
      setPanelPos({
        top:  rect.bottom + window.scrollY + 8,
        left: left + window.scrollX,
        side: 'bottom',
        width: panelWidth,
      });
      return;
    }

    const spaceRight = vw - rect.right;
    const spaceLeft  = rect.left;
    const showRight  = spaceRight >= PANEL_WIDTH + PANEL_GAP || spaceRight >= spaceLeft;

    if (showRight) {
      setPanelPos({
        top:  rect.top + window.scrollY,
        left: rect.right + window.scrollX + PANEL_GAP,
        side: 'right',
        width: PANEL_WIDTH,
      });
    } else {
      setPanelPos({
        top:  rect.top + window.scrollY,
        left: rect.left + window.scrollX - PANEL_WIDTH - PANEL_GAP,
        side: 'left',
        width: PANEL_WIDTH,
      });
    }
  }, []);

  // إعادة الحساب عند فتح اللوحة
  useEffect(() => {
    if (isOpen) computePosition();
  }, [isOpen, computePosition]);

  // إغلاق عند scroll خارج الصف
  useEffect(() => {
    if (!isOpen) return;
    const track = cardRef.current?.closest('.overflow-x-auto');
    const handleScroll = () => {
      isScrolling.current = true;
      onClose?.();
      setTimeout(() => { isScrolling.current = false; }, 250);
    };
    track?.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', onClose);
    return () => {
      track?.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', onClose);
    };
  }, [isOpen, onClose]);

  // إغلاق عند النقر خارجها (موبايل + ديسكتوب)
  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e) => {
      if (
        panelRef.current?.contains(e.target) ||
        cardRef.current?.contains(e.target)
      ) return;
      onClose?.();
    };
    const handleKey = (e) => { if (e.key === 'Escape') onClose?.(); };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside, { passive: true });
    document.addEventListener('keydown', handleKey);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('keydown', handleKey);
    };
  }, [isOpen, onClose]);

  // Hover handlers — ديسكتوب فقط
  const handleMouseEnter = () => {
    if (isMobile || isScrolling.current) return;
    clearTimeout(leaveTimeout.current);
    hoverTimeout.current = setTimeout(() => {
      computePosition();
      setIsHovered(true);
      onOpen?.();
    }, OPEN_DELAY);
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    clearTimeout(hoverTimeout.current);
    leaveTimeout.current = setTimeout(() => {
      setIsHovered(false);
      onClose?.();
    }, CLOSE_DELAY);
  };

  // موبايل: toggle عند الضغط
  const handleCardClick = (e) => {
    if (!isMobile) return;
    if (isOpen) {
      e.preventDefault();
      onClose?.();
    } else {
      e.preventDefault();
      computePosition();
      setIsHovered(true);
      onOpen?.();
    }
  };

  // تنظيف
  useEffect(() => {
    return () => {
      clearTimeout(hoverTimeout.current);
      clearTimeout(leaveTimeout.current);
    };
  }, []);

  // لوحة Portal
  const panel = isOpen && mounted
    ? createPortal(
        <div
          ref={panelRef}
          className="fixed z-[9999]"
          style={{
            top:  panelPos.top - window.scrollY,
            left: panelPos.left - window.scrollX,
            width: panelPos.width || PANEL_WIDTH,
            animation: 'netflixPanelIn 220ms cubic-bezier(0.16,1,0.3,1)',
          }}
          onMouseEnter={() => {
            if (!isMobile) {
              clearTimeout(leaveTimeout.current);
              setIsHovered(true);
            }
          }}
          onMouseLeave={handleMouseLeave}
        >
          {/* السهم */}
          {panelPos.side !== 'bottom' && (
            <div
              className="absolute top-6 w-3 h-3 rotate-45 bg-[#0D0F14] border"
              style={{
                [panelPos.side === 'right' ? 'left' : 'right']: '-6px',
                borderColor: `${accent}55`,
                borderRight:  panelPos.side === 'right' ? 'none' : undefined,
                borderTop:    panelPos.side === 'right' ? 'none' : undefined,
                borderLeft:   panelPos.side === 'left'  ? 'none' : undefined,
                borderBottom: panelPos.side === 'left'  ? 'none' : undefined,
              }}
            />
          )}

          <div
            className="relative rounded-xl overflow-hidden
                       bg-[#0D0F14]/95 backdrop-blur-xl border shadow-2xl"
            style={{
              borderColor: `${accent}40`,
              boxShadow: `0 30px 60px -20px rgba(0,0,0,0.95), 0 0 40px -15px ${accent}55`,
            }}
          >
            <div
              className="h-[2px] w-full"
              style={{ background: `linear-gradient(to right, transparent, ${accent}, transparent)` }}
            />

            <div className="p-4">
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <span
                  className="text-[9px] uppercase tracking-[0.22em] font-mono font-semibold"
                  style={{ color: accent }}
                >
                  What you'll learn
                </span>
                <button
                  className="h-6 w-6 rounded-full border border-white/15
                             text-white/50 hover:text-white hover:border-white/40
                             flex items-center justify-center transition-colors
                             active:scale-90"
                  aria-label="Close"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onClose?.();
                    setIsHovered(false);
                  }}
                >
                  <X size={11} />
                </button>
              </div>

              {/* Outcomes */}
              {outcomes.length > 0 ? (
                <ul className="space-y-2 mb-4">
                  {outcomes.slice(0, 4).map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-[11.5px] text-white/80 leading-snug"
                    >
                      <span
                        className="shrink-0 mt-[3px] h-3.5 w-3.5 rounded-full
                                   flex items-center justify-center"
                        style={{ backgroundColor: `${accent}22` }}
                      >
                        <CheckCircle2 size={9} style={{ color: accent }} />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-[11px] text-white/40 mb-4">
                  Learning outcomes coming soon.
                </p>
              )}

              {/* Meta */}
              <div className="flex items-center gap-2 text-[10px] mb-4 pt-3 border-t border-white/10">
                <span
                  className="px-1.5 py-0.5 font-mono rounded-sm border"
                  style={{ borderColor: `${accent}66`, color: accent }}
                >
                  {course.level?.charAt(0)}+
                </span>
                <span className="flex items-center gap-1 text-white/70">
                  <Clock size={9} /> {course.duration}
                </span>
                <span className="text-white/30">•</span>
                <span className="text-white/70 capitalize">{course.category}</span>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <Link
                  to={`/courses/${slug}`}
                  className="flex-1 h-9 rounded-md text-black
                             flex items-center justify-center gap-1.5
                             font-semibold text-[12px]
                             transition-transform hover:scale-[1.02] active:scale-95"
                  style={{ backgroundColor: accent }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Play size={12} fill="currentColor" />
                  Start Learning
                </Link>
                <button
                  className="h-9 w-9 rounded-md border border-white/15
                             text-white/70 hover:text-white hover:border-white/40
                             flex items-center justify-center transition-colors active:scale-90"
                  aria-label="Add to list"
                >
                  <Plus size={14} />
                </button>
                <button
                  className="h-9 w-9 rounded-md border border-white/15
                             text-white/70 hover:text-white hover:border-white/40
                             flex items-center justify-center transition-colors active:scale-90"
                  aria-label="Like"
                >
                  <ThumbsUp size={12} />
                </button>
                <button
                  className="h-9 w-9 rounded-md border border-white/15
                             text-white/70 hover:text-white hover:border-white/40
                             flex items-center justify-center transition-colors active:scale-90"
                  aria-label="More info"
                >
                  <ChevronDown size={14} />
                </button>
              </div>
            </div>
          </div>

          <style>{`
            @keyframes netflixPanelIn {
              from { opacity: 0; transform: translateY(-6px) scale(0.97); }
              to   { opacity: 1; transform: translateY(0)    scale(1); }
            }
          `}</style>
        </div>,
        document.body
      )
    : null;

  return (
    <>
      <div
        ref={cardRef}
        className="relative shrink-0 flex items-end cursor-pointer"
        style={{ zIndex: isHovered ? 50 : 1 }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleCardClick}
      >
        {/* Ranking */}
        {showRanking && (
          <div
            className="shrink-0 select-none hidden sm:block"
            style={{ width: '80px', marginRight: '-10px', marginBottom: '10px' }}
          >
            <span
              className="font-sans font-black leading-none"
              style={{
                fontSize: '9.5rem',
                WebkitTextStroke: '4px rgba(255,255,255,0.22)',
                color: 'transparent',
                letterSpacing: '-0.06em',
                display: 'block',
                lineHeight: 0.85,
                textShadow: `0 0 40px ${accent}33`,
              }}
            >
              {index + 1}
            </span>
          </div>
        )}

        <div className="relative w-[280px] sm:w-[320px] lg:w-[400px]">
          <Link to={`/courses/${slug}`} className="relative block">
            <article
              className="relative overflow-hidden rounded-xl bg-[#0D0F14] border
                         transition-all duration-300"
              style={{
                borderColor: isHovered ? `${accent}55` : 'rgba(255,255,255,0.06)',
                boxShadow: isHovered
                  ? `0 18px 40px -18px rgba(0,0,0,0.85), 0 0 30px -12px ${accent}40`
                  : '0 4px 14px -6px rgba(0,0,0,0.6)',
              }}
            >
              {/* IMAGE */}
              <div className="relative aspect-video overflow-hidden bg-[#06070B]">
                <img
                  src={course.image}
                  alt={course.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700"
                  style={{ transform: isHovered ? 'scale(1.06)' : 'scale(1)' }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#0D0F14] via-[#0D0F14]/30 to-transparent" />
                <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/40 to-transparent" />

                <div
                  className="absolute inset-x-0 top-0 h-[2px] opacity-70 transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(to right, transparent, ${accent}, transparent)`,
                    opacity: isHovered ? 1 : 0.5,
                  }}
                />

                {course.badge && (
                  <div className="absolute top-3 left-3 z-10">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-sm
                                  ${badge.bg} ${badge.text}
                                  text-[9px] font-bold tracking-[0.14em] uppercase`}
                      style={{ boxShadow: badge.glow }}
                    >
                      {course.badge}
                    </span>
                  </div>
                )}

                <div
                  className="absolute top-3 right-3 z-10 flex items-center gap-1
                             px-2 py-0.5 bg-black/70 backdrop-blur-md rounded-sm
                             border border-white/10"
                >
                  <Star size={10} className="fill-[#E8D5A0] text-[#E8D5A0]" />
                  <span className="text-[10px] text-white font-semibold tracking-wide">
                    {course.rating}
                  </span>
                </div>
              </div>

              {/* Bottom info */}
              <div className="px-3.5 pb-3.5 pt-3">
                <h4 className="text-[13px] sm:text-[14px] text-white/95 font-semibold
                               leading-tight line-clamp-1 mb-1.5">
                  {course.title}
                </h4>
                <p className="text-[10px] sm:text-[10.5px] text-white/50 line-clamp-1 mb-2">
                  {course.subtitle}
                </p>
                <div className="flex items-center gap-2 sm:gap-2.5 text-[10px] sm:text-[10.5px] text-white/45">
                  <span className="flex items-center gap-1">
                    <BarChart3 size={10} /> {course.lessons}
                  </span>
                  <span className="text-white/20">·</span>
                  <span className="flex items-center gap-1">
                    <Users size={10} /> {course.students?.toLocaleString()}
                  </span>
                  <span className="text-white/20">·</span>
                  <span className="truncate">{course.instructor.name}</span>
                </div>
              </div>
            </article>
          </Link>
        </div>
      </div>

      {panel}
    </>
  );
};

export default NetflixCard;