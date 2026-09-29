import { CheckCircle2 } from 'lucide-react';

const Overview = ({ course }) => (
  <section id="overview" className="scroll-mt-32">
    {/* ===== Description ===== */}
    <h2 className="font-sans font-light text-3xl md:text-4xl text-white mb-6 tracking-tight">
      About this course
    </h2>
    <p className="text-white/70 leading-relaxed font-light text-lg">
      {course.description}
    </p>

    {/* ===== What you'll learn ===== */}
    <div className="mt-14">
      <h3 className="font-sans font-light text-2xl md:text-3xl text-white mb-6 tracking-tight">
        What you'll <span className="italic text-neutral-400">learn</span>
      </h3>
      <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
        {course.whatYouLearn.map((item, i) => (
          <div key={i} className="flex items-start gap-3">
            <CheckCircle2 size={18} className="text-neon-cyan mt-0.5 shrink-0" />
            <span className="text-white/80 text-sm leading-relaxed font-light">{item}</span>
          </div>
        ))}
      </div>
    </div>

    {/* ===== Requirements ===== */}
    <div className="mt-14">
      <h3 className="font-sans font-light text-2xl md:text-3xl text-white mb-6 tracking-tight">
        Requirements
      </h3>
      <ul className="space-y-3">
        {course.requirements.map((item, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-white/40 mt-2.5 shrink-0" />
            <span className="text-white/70 text-sm leading-relaxed font-light">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default Overview;