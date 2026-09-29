import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Magnetic from '../ui/Magnetic';

const NAV_LINKS = [
  { label: 'Courses',  to: '/courses',  n: '01' },
  { label: 'Diplomas', to: '/diplomas', n: '02' },
  { label: 'Events',   to: '/events',   n: '03' },
  { label: 'About',    to: '/about',    n: '04' },
  { label: 'Contact',  to: '/contact',  n: '05' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-deep/85 backdrop-blur-xl border-b border-white/5 py-4'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="container-x flex items-center justify-between">
          <Link to="/" className="flex items-baseline gap-2">
            <span className="font-serif text-2xl md:text-3xl font-light tracking-tight text-cream-100">
              Talim<span className="text-gold">.</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-10">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `group relative text-sm font-medium transition-colors duration-300 ${
                    isActive ? 'text-cream-100' : 'text-cream-100/60 hover:text-cream-100'
                  }`
                }
              >
                {({ isActive }) => (
                  <span className="relative flex items-baseline gap-2">
                    <span className="text-[9px] text-gold font-mono">{link.n}</span>
                    <span>{link.label}</span>
                    <span className={`absolute -bottom-1 left-0 h-px bg-gold transition-all duration-500 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                  </span>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-6">
            <Link to="/login" className="text-sm text-cream-100/60 hover:text-cream-100 transition-colors">
              Sign In
            </Link>
            <Magnetic strength={0.3}>
              <Link
                to="/register"
                className="group inline-flex items-center gap-2 text-sm font-medium text-cream-100
                           border border-white/20 px-5 py-2.5 hover:bg-gold hover:border-gold hover:text-deep
                           transition-all duration-500"
              >
                Start Learning
                <ArrowUpRight size={14} className="group-hover:rotate-45 transition-transform duration-500" />
              </Link>
            </Magnetic>
          </div>

          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="lg:hidden h-10 w-10 flex items-center justify-center text-cream-100"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden bg-deep"
          >
            <div className="h-full flex flex-col pt-28 pb-10 px-8">
              <nav className="flex-1 flex flex-col gap-2">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <NavLink
                      to={link.to}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-baseline gap-4 py-5 border-b border-white/5"
                    >
                      <span className="text-xs text-gold font-mono">{link.n}</span>
                      <span className="font-serif text-4xl text-cream-100">{link.label}</span>
                    </NavLink>
                  </motion.div>
                ))}
              </nav>

              <div className="flex flex-col gap-3 pt-6">
                <Link to="/login" onClick={() => setMobileOpen(false)} className="btn-outline justify-center">
                  Sign In
                </Link>
                <Link to="/register" onClick={() => setMobileOpen(false)} className="btn-gold justify-center">
                  Start Learning
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;