import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Hero from './components/home/Hero';
import AboutStorySection from './components/about/AboutStorySection';
import NetflixCoursesSection from './components/courses/NetflixCoursesSection';
import CourseDetail from './pages/CourseDetail';
import HackingLoader from './components/intro/HackingLoader';
import useLenis from './hooks/useLenis';

function App() {
  const [showIntro, setShowIntro] = useState(() => {
    if (typeof window === 'undefined') return true;
    return !sessionStorage.getItem('itgate_intro_seen');
  });

  useLenis();

  // ⚠️ Safety: لو اللودر علّق لأي سبب، الصفحة تتفتح بعد 8 ثواني
  useEffect(() => {
    if (!showIntro) return;
    const safety = setTimeout(() => {
      console.warn('[App] Loader timeout — unlocking page');
      sessionStorage.setItem('itgate_intro_seen', 'true');
      setShowIntro(false);
    }, 8000);
    return () => clearTimeout(safety);
  }, [showIntro]);

  // ⚠️ قفل الـ scroll بس على الديسكتوب + بس وقت اللودر
  useEffect(() => {
    const isTouch =
      typeof window !== 'undefined' &&
      (window.matchMedia('(pointer: coarse)').matches ||
        window.innerWidth < 1024);

    if (showIntro && !isTouch) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      // ⚠️ دايماً رجّع الـ body لحالته عند unmount
      document.body.style.overflow = '';
    };
  }, [showIntro]);

  const handleIntroComplete = () => {
    sessionStorage.setItem('itgate_intro_seen', 'true');
    setShowIntro(false);
    // ⚠️ تأكد إن الـ body مفتوح
    document.body.style.overflow = '';
  };

  return (
    <BrowserRouter>
      {showIntro && <HackingLoader onComplete={handleIntroComplete} />}

      <main
        className="bg-void min-h-screen"
        style={{
          // ⚠️ المحتوى الأساسي مخفي بس ما يمنعش scroll
          opacity: showIntro ? 0 : 1,
          pointerEvents: showIntro ? 'none' : 'auto',
          transition: 'opacity 600ms ease-out',
        }}
      >
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <AboutStorySection />
                <NetflixCoursesSection />
              </>
            }
          />
          <Route path="/courses/:slug" element={<CourseDetail />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;