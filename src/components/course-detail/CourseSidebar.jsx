import { useState } from 'react';
import {
  Play, FileText, Download, Award, Users, Clock,
  Heart, Share2, ShoppingCart, Check,
} from 'lucide-react';

const ICON_MAP = {
  video:    Play,
  file:     FileText,
  download: Download,
  award:    Award,
  users:    Users,
  clock:    Clock,
};

const CourseSidebar = ({ course }) => {
  const [wishlist, setWishlist] = useState(false);
  const [enrolled, setEnrolled] = useState(false);

  const discount = course.oldPrice
    ? Math.round(((course.oldPrice - course.price) / course.oldPrice) * 100)
    : 0;

  return (
    <div className="space-y-4">

      {/* ===== Main card ===== */}
      <div className="border border-white/[0.08] bg-white/[0.01] backdrop-blur-md overflow-hidden">
        {/* Price */}
        <div className="p-6 md:p-7 border-b border-white/[0.06]">
          <div className="flex items-baseline gap-3">
            <span className="font-sans font-light text-4xl md:text-5xl text-white leading-none">
              {course.price.toLocaleString()}
            </span>
            <span className="font-mono text-xs text-white/50 uppercase tracking-wider">
              {course.currency}
            </span>
          </div>

          {discount > 0 && (
            <div className="mt-3 flex items-center gap-3">
              <span className="text-sm text-white/40 line-through">
                {course.oldPrice.toLocaleString()} {course.currency}
              </span>
              <span className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider
                               text-white border border-white/30">
                -{discount}% OFF
              </span>
            </div>
          )}

          {/* Countdown */}
          <div className="mt-5 flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider text-white/60">
            <Clock size={12} />
            <span>Sale ends in 2 days · 14 hours</span>
          </div>
        </div>

        {/* CTAs */}
        <div className="p-6 md:p-7 space-y-3">
          <button
            onClick={() => setEnrolled(true)}
            className={`w-full inline-flex items-center justify-center gap-2 px-6 py-4
                       font-mono text-[11px] uppercase tracking-[0.2em] transition-all duration-500
                       ${enrolled
                         ? 'bg-white/10 text-white border border-white/30'
                         : 'bg-white text-neutral-950 hover:bg-neon-cyan'
                       }`}
            style={{
              boxShadow: enrolled ? 'none' : '0 0 30px rgba(111,232,255,0.2)',
            }}
          >
            {enrolled ? (
              <>
                <Check size={14} /> Enrolled
              </>
            ) : (
              <>
                <ShoppingCart size={14} /> Enroll Now
              </>
            )}
          </button>

          <button className="w-full inline-flex items-center justify-center gap-2 px-6 py-4
                             border border-white/[0.15] text-white
                             font-mono text-[11px] uppercase tracking-[0.2em]
                             hover:bg-white/[0.03] hover:border-white/30 transition-all">
            Try for Free
          </button>

          <div className="flex items-center justify-center gap-6 pt-2">
            <button
              onClick={() => setWishlist(!wishlist)}
              className={`inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider
                         transition-colors ${wishlist ? 'text-neon-cyan' : 'text-white/50 hover:text-white'}`}
            >
              <Heart size={12} className={wishlist ? 'fill-neon-cyan' : ''} />
              {wishlist ? 'Saved' : 'Wishlist'}
            </button>
            <span className="text-white/20">|</span>
            <button className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider
                               text-white/50 hover:text-white transition-colors">
              <Share2 size={12} />
              Share
            </button>
          </div>

          <p className="text-center text-[10px] font-mono uppercase tracking-wider text-white/40 pt-2">
            30-day money-back guarantee
          </p>
        </div>
      </div>

      {/* ===== Includes ===== */}
      <div className="border border-white/[0.08] bg-white/[0.01] backdrop-blur-md p-6 md:p-7">
        <h3 className="font-sans font-light text-lg text-white mb-5">
          This course <span className="italic text-neutral-400">includes</span>
        </h3>

        <ul className="space-y-3.5">
          {course.includes.map((item, i) => {
            const Icon = ICON_MAP[item.icon] || Play;
            return (
              <li key={i} className="flex items-start gap-3">
                <Icon size={14} className="text-white/60 mt-0.5 shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-white/90">{item.label}</div>
                  <div className="text-[11px] font-mono uppercase tracking-wider text-white/40 mt-0.5">
                    {item.sublabel}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {/* ===== Meta ===== */}
      <div className="border border-white/[0.08] bg-white/[0.01] backdrop-blur-md p-6 md:p-7">
        <h3 className="font-sans font-light text-lg text-white mb-5">Details</h3>
        <ul className="space-y-3 text-sm">
          {[
            { k: 'Level',         v: course.level },
            { k: 'Language',      v: course.language },
            { k: 'Duration',      v: course.duration },
            { k: 'Lessons',       v: `${course.lessons} lessons` },
            { k: 'Labs',          v: `${course.labs} labs` },
            { k: 'Last Updated',  v: course.lastUpdated },
            { k: 'Certification', v: course.certLogos.join(' · ') },
          ].map((item) => (
            <li key={item.k} className="flex items-center justify-between gap-4">
              <span className="font-mono text-[10px] uppercase tracking-wider text-white/40">
                {item.k}
              </span>
              <span className="text-white/80 text-right">{item.v}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CourseSidebar;