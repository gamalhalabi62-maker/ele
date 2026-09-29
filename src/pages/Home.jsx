import Hero from '../components/home/Hero';
import Partners from '../components/home/Partners';
import Resources from '../components/home/Resources';
import About from '../components/home/About';
import Counter from '../components/home/Counter';
import PopularCourses from '../components/home/PopularCourses';
import Testimonials from '../components/home/Testimonials';
import CTA from '../components/home/CTA';
import Teachers from '../components/home/Teachers';
import Blog from '../components/home/Blog';
import SkewedSection3D from '../components/ui/SkewedSection3D';

const Home = () => (
  <>
    {/* Hero — مستقيم في الأعلى */}
    <Hero />

    {/* Partners — مايل من فوق (بيسقط عليك) */}
    <SkewedSection3D variant="tilt-down" intensity={10} bg="bg-deep-soft">
      <Partners />
    </SkewedSection3D>

    {/* Resources — بيلف يمين/شمال */}
    <SkewedSection3D variant="roll" intensity={8} bg="bg-deep">
      <Resources />
    </SkewedSection3D>

    {/* About — مايل من تحت (بيطلع لفوق) */}
    <SkewedSection3D variant="tilt-up" intensity={10} bg="bg-deep-soft">
      <About />
    </SkewedSection3D>

    {/* Counter — بيلف يمين */}
    <SkewedSection3D variant="tilt-right" intensity={6} bg="bg-deep">
      <Counter />
    </SkewedSection3D>

    {/* Courses — Horizontal pin (مش محتاج skew عشان الـ pin) */}
    <PopularCourses />

    {/* Testimonials — بيلف شمال */}
    <SkewedSection3D variant="tilt-left" intensity={6} bg="bg-deep-soft">
      <Testimonials />
    </SkewedSection3D>

    {/* CTA — roll مع أصفر */}
    <SkewedSection3D variant="roll" intensity={10} bg="bg-gold">
      <CTA />
    </SkewedSection3D>

    {/* Teachers — tilt-down */}
    <SkewedSection3D variant="tilt-down" intensity={10} bg="bg-deep">
      <Teachers />
    </SkewedSection3D>

    {/* Blog — tilt-up */}
    <SkewedSection3D variant="tilt-up" intensity={8} bg="bg-deep-soft">
      <Blog />
    </SkewedSection3D>
  </>
);

export default Home;