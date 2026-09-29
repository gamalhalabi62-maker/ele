import { Link } from 'react-router-dom';
import ScrambleText from '../ui/ScrambleText';

const TopBar = () => (
  <div className="bg-gold text-deep relative z-50">
    <div className="container-x flex items-center justify-center gap-4 py-2.5 text-xs md:text-sm font-medium">
      <ScrambleText text="🎉 Transform talent and your exclusive skills" speed={30} />
      <Link
        to="/report"
        className="hidden md:inline-flex items-center px-3 py-1 border border-deep/40
                   hover:bg-deep hover:text-cream-100 transition-colors uppercase tracking-wider text-[10px]"
      >
        Learn More
      </Link>
    </div>
  </div>
);

export default TopBar;