import CourseHero from '../components/course-detail/CourseHero';
import CourseSubNav from '../components/course-detail/CourseSubNav';
import Overview from '../components/course-detail/Overview';
import Curriculum from '../components/course-detail/Curriculum';
import InstructorSection from '../components/course-detail/InstructorSection';
import ReviewsSection from '../components/course-detail/ReviewsSection';
import QASection from '../components/course-detail/QASection';
import FAQSection from '../components/course-detail/FAQSection';
import CourseSidebar from '../components/course-detail/CourseSidebar';
import RelatedCourses from '../components/course-detail/RelatedCourses';
import { COURSE_DETAIL } from '../mocks/courseDetail';

const CourseDetail = () => {
  const course = COURSE_DETAIL;

  return (
    <div className="bg-void min-h-screen">
      {/* ===== HERO ===== */}
      <CourseHero course={course} />

      {/* ===== STICKY SUB NAV ===== */}
      <CourseSubNav />

      {/* ===== MAIN CONTENT ===== */}
      <div className="container-x py-16 md:py-24">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">

          {/* Left — main content */}
          <div className="lg:col-span-8 space-y-20">
            <Overview course={course} />
            <Curriculum course={course} />
            <InstructorSection instructor={course.instructor} />
            <ReviewsSection course={course} />
            <QASection course={course} />
            <FAQSection faq={course.faq} />
          </div>

          {/* Right — sticky sidebar */}
          <aside className="lg:col-span-4 lg:sticky lg:top-24">
            <CourseSidebar course={course} />
          </aside>
        </div>
      </div>

      {/* ===== RELATED COURSES ===== */}
      <RelatedCourses />
    </div>
  );
};

export default CourseDetail;