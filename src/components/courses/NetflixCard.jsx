import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Play, Plus, ThumbsUp, ChevronDown } from 'lucide-react';

const NetflixCard = ({
  course,
  index = 0,
  showRanking = false,
  isNeighborHovered = false,
  onHover,
  onLeave,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  const slug = course.slug || `course-${course.id}`;

  const handleMouseEnter = () => {
    setIsHovered(true);
    onHover?.();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    onLeave?.();
  };

  const scale = isHovered ? 1.08 : isNeighborHovered ? 0.98 : 1;
  const zIndex = isHovered ? 30 : isNeighborHovered ? 10 : 1;

  return (
    <div
      ref={cardRef}
      className="relative shrink-0 flex items-end"
      style={{ zIndex }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Ranking number */}
      {showRanking && (
        <div
          className="shrink-0 select-none"
          style={{
            width: '90px',
            marginRight: '-15px',
            marginBottom: '10px',
          }}
        >
          <span
            className="font-sans font-black leading-none"
            style={{
              fontSize: '10rem',
              WebkitTextStroke: '4px rgba(255,255,255,0.25)',
              color: 'transparent',
              letterSpacing: '-0.06em',
              display: 'block',
              lineHeight: 0.85,
            }}
          >
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>
      )}

      {/* Card */}
      <Link
        to={`/courses/${slug}`}
        className="relative block transition-all duration-500 ease-out"
        style={{
          width: '340px',
          transform: `scale(${scale})`,
          transformOrigin: 'center bottom',
        }}
      >
        <article
          className="relative overflow-hidden rounded-md
                     bg-[#0D0F14] border border-white/[0.06]
                     hover:border-white/[0.15] transition-colors duration-300"
          style={{
            boxShadow: isHovered
              ? '0 20px 50px -15px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.05)'
              : '0 4px 12px -6px rgba(0,0,0,0.6)',
          }}
        >
          {/* IMAGE */}
          <div className="relative aspect-video overflow-hidden bg-[#06070B]">
            <img
              src={course.image}
              alt={course.title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#0D0F14]/90 via-transparent to-transparent" />

            {/* Badge */}
            {course.badge && (
              <div className="absolute top-3 left-3 z-10">
                <span className="inline-flex items-center px-2 py-0.5 rounded-sm
                                 bg-white text-black
                                 text-[9px] font-bold tracking-[0.1em] uppercase">
                  {course.badge}
                </span>
              </div>
            )}

            {/* Rating */}
            <div className="absolute top-3 right-3 z-10 flex items-center gap-1
                            px-1.5 py-0.5 bg-black/70 backdrop-blur-md rounded-sm">
              <Star size={10} className="fill-[#E8D5A0] text-[#E8D5A0]" />
              <span className="text-[10px] text-white font-medium">
                {course.rating}
              </span>
            </div>

            {/* Hover Panel */}
            <div
              className="absolute inset-x-0 bottom-0 p-3
                         transition-all duration-500"
              style={{
                opacity: isHovered ? 1 : 0,
                transform: isHovered ? 'translateY(0)' : 'translateY(100%)',
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <button
                  className="h-8 w-8 rounded-full bg-white text-black
                             flex items-center justify-center
                             hover:bg-[#6FE8FF] transition-colors"
                  aria-label="Preview"
                >
                  <Play size={12} fill="currentColor" />
                </button>

                <button
                  className="h-8 w-8 rounded-full border-2 border-white/40
                             text-white flex items-center justify-center
                             hover:border-white transition-colors"
                  aria-label="Add to list"
                >
                  <Plus size={14} />
                </button>

                <button
                  className="h-8 w-8 rounded-full border-2 border-white/40
                             text-white flex items-center justify-center
                             hover:border-white transition-colors"
                  aria-label="Like"
                >
                  <ThumbsUp size={12} />
                </button>

                <button
                  className="ml-auto h-8 w-8 rounded-full border-2 border-white/40
                             text-white flex items-center justify-center
                             hover:border-white transition-colors"
                  aria-label="More info"
                >
                  <ChevronDown size={14} />
                </button>
              </div>

              <div className="flex items-center gap-2 text-[10px] mb-1.5">
                <span className="px-1.5 py-0.5 border border-white/30 text-white/80 font-mono">
                  {course.level?.charAt(0)}+
                </span>
                <span className="text-white/60">{course.duration}</span>
                <span className="text-[#6FE8FF]">•</span>
                <span className="text-white/60">{course.category}</span>
              </div>

              <h4 className="text-[13px] text-white font-medium leading-tight line-clamp-1">
                {course.title}
              </h4>
            </div>
          </div>

          {/* Bottom mini-info */}
          <div
            className="px-3 pb-3 pt-2 transition-all duration-500"
            style={{
              opacity: isHovered ? 0 : 1,
              maxHeight: isHovered ? 0 : '60px',
            }}
          >
            <h4 className="text-[13px] text-white/90 font-medium leading-tight line-clamp-1 mb-1">
              {course.title}
            </h4>
            <div className="flex items-center gap-2 text-[10px] text-white/40">
              <span>{course.lessons} lessons</span>
              <span>·</span>
              <span>{course.instructor.name}</span>
            </div>
          </div>
        </article>
      </Link>
    </div>
  );
};

export default NetflixCard;