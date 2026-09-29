import AboutManifesto from './AboutManifesto';
import WhyITGate from './WhyITGate';
import Philosophy from './Philosophy';
import BeyondClassroom from './BeyondClassroom';
import FutureCTA from './FutureCTA';

const AboutSection = () => {
  return (
    <div className="relative bg-void">
      <AboutManifesto />
      <WhyITGate />
      <Philosophy />
      <BeyondClassroom />
      <FutureCTA />
    </div>
  );
};

export default AboutSection;