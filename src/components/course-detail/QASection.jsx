import { useState } from 'react';
import { Search, MessageCircle, ThumbsUp, Send } from 'lucide-react';

const QASection = ({ course }) => {
  const [query, setQuery] = useState('');

  return (
    <section id="qa" className="scroll-mt-32">
      <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
        <div>
          <h2 className="font-sans font-light text-3xl md:text-4xl text-white tracking-tight">
            Questions &amp; <span className="italic text-neutral-400">answers</span>
          </h2>
          <p className="mt-2 text-sm text-white/50 font-light">
            {course.questionsList.length} questions answered by instructor
          </p>
        </div>
      </div>

      {/* Search + Ask */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search questions..."
            className="w-full bg-white/[0.02] border border-white/[0.08] pl-11 pr-4 py-3
                       text-sm text-white placeholder:text-white/30
                       focus:outline-none focus:border-neon-cyan/50 transition-colors"
          />
        </div>
        <button className="inline-flex items-center gap-2 px-5 py-3 bg-white text-neutral-950
                           font-mono text-[11px] uppercase tracking-[0.2em]
                           hover:bg-neon-cyan transition-colors">
          <MessageCircle size={13} />
          Ask Question
        </button>
      </div>

      {/* Questions */}
      <div className="space-y-6">
        {course.questionsList.map((q) => (
          <article key={q.id} className="border border-white/[0.06] p-6">
            {/* Question */}
            <div className="flex items-start gap-3">
              <img
                src={q.user.avatar}
                alt={q.user.name}
                className="h-9 w-9 rounded-full object-cover border border-white/[0.1] shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-white text-sm font-medium">{q.user.name}</span>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-white/40">
                    {q.timestamp}
                  </span>
                </div>
                <p className="mt-2 text-white/90 text-sm leading-relaxed">{q.question}</p>
              </div>
            </div>

            {/* Answers */}
            {q.answers?.map((a) => (
              <div
                key={a.id}
                className={`mt-4 ml-12 pl-5 border-l-2 ${
                  a.user.isInstructor ? 'border-neon-cyan/40' : 'border-white/[0.1]'
                }`}
              >
                <div className="flex items-start gap-3">
                  <img
                    src={a.user.avatar}
                    alt={a.user.name}
                    className="h-7 w-7 rounded-full object-cover border border-white/[0.1] shrink-0"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="text-white text-sm font-medium">{a.user.name}</span>
                      {a.user.isInstructor && (
                        <span className="px-2 py-0.5 text-[9px] font-mono uppercase tracking-wider
                                         text-neon-cyan border border-neon-cyan/40">
                          Instructor
                        </span>
                      )}
                      <span className="font-mono text-[10px] uppercase tracking-wider text-white/40">
                        {a.timestamp}
                      </span>
                    </div>
                    <p className="mt-2 text-white/70 text-sm leading-relaxed font-light">
                      {a.text}
                    </p>
                    <button className="mt-3 inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-white/40 hover:text-white/80 transition-colors">
                      <ThumbsUp size={11} /> Helpful ({a.helpful})
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Reply input (mock) */}
            <div className="mt-4 ml-12 flex items-center gap-2">
              <input
                type="text"
                placeholder="Write a reply..."
                className="flex-1 bg-transparent border-b border-white/[0.08] py-2 text-sm
                           text-white placeholder:text-white/30
                           focus:outline-none focus:border-neon-cyan/50 transition-colors"
              />
              <button className="text-white/50 hover:text-neon-cyan transition-colors">
                <Send size={16} />
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default QASection;