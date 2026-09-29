import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useRevealOnScroll } from '../../hooks/useRevealOnScroll';
import SplitText from '../ui/SplitText';
import { blogs } from '../../mocks/blogs';

const Blog = () => {
  const cardsRef = useRevealOnScroll({ selector: '.blog-card', from: 'bottom', stagger: 0.12, duration: 0.9 });

  return (
<section className="relative overflow-hidden">
      <div className="container-x relative">
        <div className="flex items-end justify-between mb-20 flex-wrap gap-6">
          <div>
            <span className="eyebrow">Journal</span>
            <SplitText
              as="h2"
              variant="words"
              text="Stories & insights."
              className="mt-6 text-5xl md:text-7xl font-serif font-light text-cream-100"
            />
          </div>
          <Link
            to="/blog"
            className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-gold hover:text-gold-light transition-colors"
          >
            View all
            <ArrowUpRight size={14} />
          </Link>
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.slice(0, 3).map((b) => (
            <article
              key={b.id}
              className="blog-card group bg-deep border border-white/5 hover:border-gold/40
                         transition-colors duration-500 overflow-hidden"
              data-cursor="image"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={b.image}
                  alt={b.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep via-transparent to-transparent" />
                <div className="absolute top-5 left-5 px-3 py-1.5 bg-deep/80 backdrop-blur-sm border border-white/10
                                text-[10px] uppercase tracking-[0.2em] text-gold">
                  {b.category}
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-cream-100/40 mb-4">
                  <span>{b.date}</span>
                  <span className="h-1 w-1 rounded-full bg-gold/60" />
                  <span>By {b.author}</span>
                </div>
                <h3 className="text-xl font-serif font-light text-cream-100 leading-snug mb-6 group-hover:text-gold transition-colors line-clamp-3">
                  {b.title}
                </h3>
                <Link
                  to="/blog"
                  className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-gold"
                >
                  Read article
                  <ArrowUpRight size={13} className="group-hover:rotate-45 transition-transform duration-500" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;