import { useState, useMemo } from 'react';
import CoursesHero from './CoursesHero';
import CoursesFilter from './CoursesFilter';
import CoursesHorizontalScroll from './CoursesHorizontalScroll';
import CoursesCTA from './CoursesCTA';
import { COURSES, COURSE_CATEGORIES } from '../../mocks/courses';

const CoursesSection = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular');

  const filteredCourses = useMemo(() => {
    let list = COURSES;
    if (activeCategory !== 'all') {
      list = list.filter((c) => c.category === activeCategory);
    }

    const sorted = [...list];
    switch (sortBy) {
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case 'price-low':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        sorted.sort(
          (a, b) => (b.badge === 'NEW' ? 1 : 0) - (a.badge === 'NEW' ? 1 : 0)
        );
        break;
      default:
        sorted.sort((a, b) => b.students - a.students);
    }
    return sorted;
  }, [activeCategory, sortBy]);

  return (
    <div id="courses" className="relative bg-void">
      <CoursesHero total={COURSES.length} />
      <CoursesFilter
        categories={COURSE_CATEGORIES}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        sortBy={sortBy}
        onSortChange={setSortBy}
        count={filteredCourses.length}
      />
      <CoursesHorizontalScroll courses={filteredCourses} />
      <CoursesCTA />
    </div>
  );
};

export default CoursesSection;