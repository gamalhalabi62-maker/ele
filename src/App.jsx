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

  useEffect(() => {
    if (showIntro) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showIntro]);

  const handleIntroComplete = () => {
    sessionStorage.setItem('itgate_intro_seen', 'true');
    setShowIntro(false);
  };

  return (
    <BrowserRouter>
      {showIntro && <HackingLoader onComplete={handleIntroComplete} />}

      <main className="bg-void min-h-screen">
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