import { Star, Users, BookOpen, MessageCircle } from 'lucide-react';

const InstructorSection = ({ instructor }) => (
  <section id="instructor" className="scroll-mt-32">
    <h2 className="font-sans font-light text-3xl md:text-4xl text-white mb-8 tracking-tight">
      Meet your <span className="italic text-neutral-400">instructor</span>
    </h2>

    <div className="border border-white/[0.06] p-6 md:p-8">
      <div className="flex flex-col md:flex-row gap-6 md:gap-8">

        {/* Avatar */}
        <div className="shrink-0">
          <img
            src={instructor.avatar}
            alt={instructor.name}
            className="h-24 w-24 md:h-32 md:w-32 rounded-full object-cover
                       border border-white/[0.1]"
          />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-sans font-light text-2xl md:text-3xl text-white">
            {instructor.name}
          </h3>
          <p className="mt-1 text-sm text-white/60">{instructor.headline}</p>

          {/* Stats */}
          <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
            <span className="flex items-center gap-2 text-white">
              <Star size={14} className="fill-white text-white" />
              <span className="font-medium">{instructor.rating}</span>
              <span className="text-white/40">instructor rating</span>
            </span>
            <span className="text-white/20">•</span>
            <span className="flex items-center gap-2 text-white/70">
              <BookOpen size={14} /> {instructor.courses} courses
            </span>
            <span className="text-white/20">•</span>
            <span className="flex items-center gap-2 text-white/70">
              <Users size={14} /> {instructor.students.toLocaleString()} students
            </span>
            <span className="text-white/20">•</span>
            <span className="flex items-center gap-2 text-white/70">
              <MessageCircle size={14} /> {instructor.reviews.toLocaleString()} reviews
            </span>
          </div>

          {/* Bio */}
          <p className="mt-6 text-white/70 text-sm leading-relaxed font-light">
            {instructor.bio}
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default InstructorSection;