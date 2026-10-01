import { useMemo, useState, useCallback, useRef } from 'react';
import CoursesHero from './CoursesHero';
import NetflixRow from './NetflixRow';
import CoursesFilter from './CoursesFilter';
import CoursesCTA from './CoursesCTA';
import { COURSES, COURSE_CATEGORIES } from '../../mocks/courses';

const NetflixCoursesSection = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy]               = useState('popular');
  const [searchQuery, setSearchQuery]     = useState('');
  const rowsRef                           = useRef(null);

  const total = COURSES.length;

  // ─────────────────────────────────────────────
  // 🔍 فلترة + بحث
  // ─────────────────────────────────────────────
  const filtered = useMemo(() => {
    let list = [...COURSES];

    if (activeCategory !== 'all') {
      list = list.filter((c) => c.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      list = list.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.subtitle?.toLowerCase().includes(q) ||
          c.instructor?.name?.toLowerCase().includes(q) ||
          c.category?.toLowerCase().includes(q)
      );
    }

    return list;
  }, [activeCategory, searchQuery]);

  // ─────────────────────────────────────────────
  // ↕️ ترتيب
  // ─────────────────────────────────────────────
  const sorted = useMemo(() => {
    const list = [...filtered];
    switch (sortBy) {
      case 'rating':
        return list.sort((a, b) => b.rating - a.rating);
      case 'newest':
        return list.sort(
          (a, b) => (b.badge === 'NEW' ? 1 : 0) - (a.badge === 'NEW' ? 1 : 0)
        );
      case 'price-low':
        return list.sort((a, b) => a.price - b.price);
      case 'price-high':
        return list.sort((a, b) => b.price - a.price);
      case 'popular':
      default:
        return list.sort((a, b) => b.students - a.students);
    }
  }, [filtered, sortBy]);

  // ─────────────────────────────────────────────
  // 📊 إحصائيات ديناميكية
  // ─────────────────────────────────────────────
  const stats = useMemo(() => {
    const students = COURSES.reduce((sum, c) => sum + (c.students || 0), 0);
    const lessons  = COURSES.reduce((sum, c) => sum + (c.lessons  || 0), 0);
    const avgRating =
      COURSES.reduce((sum, c) => sum + (c.rating || 0), 0) / (COURSES.length || 1);
    return {
      students,
      lessons,
      avgRating: avgRating.toFixed(1),
    };
  }, []);

  // ─────────────────────────────────────────────
  // 📚 بناء الصفوف
  // ─────────────────────────────────────────────
  const rows = useMemo(() => {
    // عند الفلترة أو البحث: نعرض صف واحد فقط
    if (activeCategory !== 'all' || searchQuery.trim()) {
      return [
        {
          key: 'results',
          title: searchQuery.trim()
            ? `Results for "${searchQuery}"`
            : COURSE_CATEGORIES.find((c) => c.id === activeCategory)?.label || 'Results',
          subtitle: `${sorted.length} program${sorted.length !== 1 ? 's' : ''} found`,
          courses: sorted,
          showRanking: false,
        },
      ];
    }

    // الصفحة الرئيسية: كل الصفوف
    const trending = [...COURSES]
      .sort((a, b) => b.students - a.students)
      .slice(0, 10);

    const topRated = [...COURSES]
      .filter((c) => c.rating >= 4.8)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 10);

    const newReleases = [...COURSES]
      .sort((a, b) => (b.badge === 'NEW' ? 1 : 0) - (a.badge === 'NEW' ? 1 : 0))
      .slice(0, 10);

    const cyberRow = COURSES.filter((c) => c.category === 'cyber');
    const networkRow = COURSES.filter((c) => c.category === 'network');
    const cloudRow = COURSES.filter((c) => c.category === 'cloud');
    const aiRow    = COURSES.filter((c) => c.category === 'ai');
    const designRow= COURSES.filter((c) => c.category === 'design');
    const testRow  = COURSES.filter((c) => c.category === 'testing');

    const result = [
      {
        key: 'trending',
        title: 'Trending Now',
        subtitle: 'Most Popular Programs',
        courses: trending,
        showRanking: true,
      },
      {
        key: 'topRated',
        title: 'Top Rated',
        subtitle: 'Highest Student Ratings',
        courses: topRated,
        showRanking: false,
      },
      {
        key: 'newReleases',
        title: 'New Releases',
        subtitle: 'Fresh Programs & Updates',
        courses: newReleases,
        showRanking: false,
      },
      cyberRow.length > 0 && {
        key: 'cyber',
        title: 'Cyber Security',
        subtitle: 'Offensive · Defensive · Operations',
        courses: cyberRow,
      },
      networkRow.length > 0 && {
        key: 'network',
        title: 'Networking',
        subtitle: 'Cisco · Routing · Switching',
        courses: networkRow,
      },
      cloudRow.length > 0 && {
        key: 'cloud',
        title: 'Cloud & DevOps',
        subtitle: 'AWS · Azure · Containers',
        courses: cloudRow,
      },
      aiRow.length > 0 && {
        key: 'ai',
        title: 'AI & Data',
        subtitle: 'Machine Learning · Analytics',
        courses: aiRow,
      },
      designRow.length > 0 && {
        key: 'design',
        title: 'Design',
        subtitle: 'UI/UX · Graphic · Branding',
        courses: designRow,
      },
      testRow.length > 0 && {
        key: 'testing',
        title: 'Software Testing',
        subtitle: 'QA · Automation · ISTQB',
        courses: testRow,
      },
    ].filter(Boolean);

    return result;
  }, [activeCategory, searchQuery, sorted]);

  // ─────────────────────────────────────────────
  // 🎯 Handlers
  // ─────────────────────────────────────────────
  const handleCategoryChange = useCallback((id) => {
    setActiveCategory(id);
    setSearchQuery('');
    // مرّر للأعلى عند تغيير الفئة
    requestAnimationFrame(() => {
      rowsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }, []);

  const handleSearch = useCallback((q) => {
    setSearchQuery(q);
    if (q.trim()) setActiveCategory('all');
  }, []);

  const handleReset = useCallback(() => {
    setActiveCategory('all');
    setSortBy('popular');
    setSearchQuery('');
  }, []);

  const isEmpty = rows.length === 0 || (rows.length === 1 && rows[0].courses.length === 0);

  return (
    <div id="courses" className="relative bg-void">
      {/* Hero */}
      <CoursesHero
        total={total}
        students={stats.students}
        avgRating={stats.avgRating}
        lessons={stats.lessons}
      />

      {/* Filter — sticky */}
      <div className="sticky top-0 z-40 backdrop-blur-xl bg-void/80 border-b border-white/5">
        <CoursesFilter
          categories={COURSE_CATEGORIES}
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
          sortBy={sortBy}
          onSortChange={setSortBy}
          count={sorted.length}
          searchQuery={searchQuery}
          onSearch={handleSearch}
          onReset={handleReset}
        />
      </div>

      {/* Rows */}
      <div
        ref={rowsRef}
        className="mt-4 md:mt-8 space-y-2 md:space-y-4 scroll-mt-24"
      >
        {isEmpty ? (
          <EmptyState
            query={searchQuery}
            category={activeCategory}
            onReset={handleReset}
          />
        ) : (
          rows.map((row) => (
            <NetflixRow
              key={row.key}
              title={row.title}
              subtitle={row.subtitle}
              courses={row.courses}
              showRanking={row.showRanking}
            />
          ))
        )}
      </div>

      <CoursesCTA />
    </div>
  );
};

// ─────────────────────────────────────────────
// 🔲 Empty State
// ─────────────────────────────────────────────
const EmptyState = ({ query, category, onReset }) => (
  <div className="container-x py-24 text-center">
    <div
      className="mx-auto mb-6 h-16 w-16 rounded-full flex items-center justify-center
                 border border-white/10 bg-white/5"
    >
      <span className="text-2xl">🔍</span>
    </div>
    <h3 className="text-2xl text-white font-light mb-3">
      No programs found
    </h3>
    <p className="text-white/50 text-sm mb-6 max-w-md mx-auto">
      {query
        ? `We couldn't find any program matching "${query}".`
        : `No programs available in this category yet.`}
    </p>
    <button
      onClick={onReset}
      className="px-6 h-11 rounded-full
                 bg-[#6FE8FF] text-black font-semibold text-sm
                 hover:bg-white transition-colors"
    >
      Reset filters
    </button>
  </div>
);

export default NetflixCoursesSection;