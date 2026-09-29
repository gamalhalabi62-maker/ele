import CoursesHero from './CoursesHero';
import NetflixRow from './NetflixRow';
import CoursesFilter from './CoursesFilter';
import CoursesCTA from './CoursesCTA';
import { COURSES, COURSE_CATEGORIES } from '../../mocks/courses';

const NetflixCoursesSection = () => {
  const total = COURSES.length;

  const trending = [...COURSES].sort((a, b) => b.students - a.students).slice(0, 10);
  const topRated = [...COURSES].filter((c) => c.rating >= 4.8).sort((a, b) => b.rating - a.rating).slice(0, 10);
  const newReleases = [...COURSES].sort((a, b) => (b.badge === 'NEW' ? 1 : 0) - (a.badge === 'NEW' ? 1 : 0)).slice(0, 10);
  const cyberRow = COURSES.filter((c) => c.category === 'cyber');
  const cloudRow = COURSES.filter((c) => c.category === 'cloud');
  const aiRow = COURSES.filter((c) => c.category === 'ai');

  return (
    <div id="courses" className="relative bg-void">
      <CoursesHero total={total} />

      <CoursesFilter
        categories={COURSE_CATEGORIES}
        activeCategory="all"
        onCategoryChange={() => {}}
        sortBy="popular"
        onSortChange={() => {}}
        count={total}
      />

      <div className="mt-8 md:mt-12 space-y-4 md:space-y-6">
        <NetflixRow title="Trending Now" subtitle="Most Popular Programs" courses={trending} showRanking={true} />
        <NetflixRow title="Top Rated" subtitle="Highest Student Ratings" courses={topRated} />
        <NetflixRow title="New Releases" subtitle="Fresh Programs & Updates" courses={newReleases} />
        {cyberRow.length > 0 && <NetflixRow title="Cyber Security" subtitle="Offensive · Defensive · Operations" courses={cyberRow} />}
        {cloudRow.length > 0 && <NetflixRow title="Cloud & DevOps" subtitle="AWS · Azure · Containers" courses={cloudRow} />}
        {aiRow.length > 0 && <NetflixRow title="AI & Data" subtitle="Machine Learning · Analytics" courses={aiRow} />}
      </div>

      <CoursesCTA />
    </div>
  );
};

export default NetflixCoursesSection;