import { Star, ThumbsUp, MoreHorizontal } from 'lucide-react';

const RatingBar = ({ stars, count, total }) => {
  const pct = (count / total) * 100;
  return (
    <div className="flex items-center gap-3">
      <span className="font-mono text-[11px] text-white/50 w-3">{stars}</span>
      <Star size={11} className="fill-white/70 text-white/70 shrink-0" />
      <div className="flex-1 h-1.5 bg-white/[0.08] relative overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 bg-white/70"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="font-mono text-[11px] text-white/50 w-12 text-right">
        {pct.toFixed(0)}%
      </span>
    </div>
  );
};

const ReviewsSection = ({ course }) => {
  const total = Object.values(course.reviewsBreakdown).reduce((a, b) => a + b, 0);

  return (
    <section id="reviews" className="scroll-mt-32">
      <h2 className="font-sans font-light text-3xl md:text-4xl text-white mb-8 tracking-tight">
        Student <span className="italic text-neutral-400">reviews</span>
      </h2>

      {/* Breakdown */}
      <div className="grid md:grid-cols-12 gap-8 pb-10 border-b border-white/[0.06]">
        <div className="md:col-span-4 flex flex-col items-center justify-center text-center">
          <div className="font-sans font-light text-6xl md:text-7xl text-white leading-none">
            {course.rating}
          </div>
          <div className="flex items-center gap-1 mt-3">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                size={14}
                className={s <= Math.round(course.rating) ? 'fill-white text-white' : 'text-white/20'}
              />
            ))}
          </div>
          <p className="mt-3 text-sm text-white/50 font-light">
            {course.reviews.toLocaleString()} reviews
          </p>
        </div>

        <div className="md:col-span-8 space-y-2.5">
          {[5, 4, 3, 2, 1].map((s) => (
            <RatingBar
              key={s}
              stars={s}
              count={course.reviewsBreakdown[s]}
              total={total}
            />
          ))}
        </div>
      </div>

      {/* Reviews List */}
      <div className="divide-y divide-white/[0.06]">
        {course.reviewsList.map((review) => (
          <article key={review.id} className="py-8">
            <div className="flex items-start gap-4">
              <img
                src={review.avatar}
                alt={review.name}
                className="h-11 w-11 rounded-full object-cover border border-white/[0.1] shrink-0"
              />
              <div className="flex-1 min-w-0">
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-white font-medium">{review.name}</div>
                    <div className="text-[11px] text-white/40 mt-0.5">{review.role}</div>
                  </div>
                  <button className="text-white/30 hover:text-white/70 transition-colors">
                    <MoreHorizontal size={16} />
                  </button>
                </div>

                {/* Rating */}
                <div className="mt-3 flex items-center gap-3">
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        size={13}
                        className={s <= review.rating ? 'fill-white text-white' : 'text-white/15'}
                      />
                    ))}
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-white/40">
                    {review.date}
                  </span>
                </div>

                {/* Content */}
                <h4 className="mt-4 text-white font-medium">{review.title}</h4>
                <p className="mt-2 text-sm text-white/70 leading-relaxed font-light">
                  {review.text}
                </p>

                {/* Helpful */}
                <button className="mt-4 inline-flex items-center gap-2 px-3 py-1.5
                                   border border-white/[0.1] text-[10px] font-mono uppercase tracking-wider
                                   text-white/60 hover:text-white hover:border-white/30 transition-all">
                  <ThumbsUp size={12} />
                  Helpful ({review.helpful})
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      <button className="mt-6 w-full py-3 border border-white/[0.1] text-[11px] font-mono uppercase tracking-[0.2em] text-white/70 hover:bg-white/[0.02] hover:border-white/30 transition-all">
        Show all {course.reviews.toLocaleString()} reviews
      </button>
    </section>
  );
};

export default ReviewsSection;