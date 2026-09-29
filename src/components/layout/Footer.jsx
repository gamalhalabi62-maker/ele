import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa6';
import { ArrowUpRight } from 'lucide-react';
import ScrambleText from '../ui/ScrambleText';

const COLS = [
  { title: 'Platform', links: [
    { label: 'Courses', to: '/courses' },
    { label: 'Diplomas', to: '/diplomas' },
    { label: 'Instructors', to: '/instructors' },
    { label: 'Events', to: '/events' },
  ]},
  { title: 'Company', links: [
    { label: 'About', to: '/about' },
    { label: 'Careers', to: '/careers' },
    { label: 'Journal', to: '/blog' },
    { label: 'Contact', to: '/contact' },
  ]},
  { title: 'Support', links: [
    { label: 'Help Center', to: '/help' },
    { label: 'Terms', to: '/terms' },
    { label: 'Privacy', to: '/privacy' },
    { label: 'FAQ', to: '/faq' },
  ]},
];

const SOCIALS = [FaTwitter, FaInstagram, FaFacebookF, FaLinkedinIn];

const Footer = () => (
  <footer className="bg-deep border-t border-white/5">
    <div className="container-x py-24">
      <div className="grid lg:grid-cols-12 gap-16">
        {/* Big brand */}
        <div className="lg:col-span-5">
          <div className="font-serif text-[15vw] lg:text-[8vw] leading-[0.85] font-light text-cream-100">
            Talim<span className="text-gold">.</span>
          </div>
          <p className="mt-8 text-cream-100/50 text-sm leading-relaxed max-w-sm">
            An academy built for those who refuse to settle. Learning that lasts a lifetime.
          </p>

          <div className="mt-10 flex items-center gap-3">
            {SOCIALS.map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="h-11 w-11 border border-white/10 hover:bg-gold hover:border-gold
                           flex items-center justify-center text-cream-100/60 hover:text-deep
                           transition-all duration-500"
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-10">
          {COLS.map((col) => (
            <div key={col.title}>
              <h4 className="text-[11px] uppercase tracking-[0.3em] text-gold mb-6">
                <ScrambleText text={col.title} speed={25} />
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="group inline-flex items-center gap-1 text-sm text-cream-100/60
                                 hover:text-cream-100 transition-colors"
                    >
                      {link.label}
                      <ArrowUpRight size={11} className="opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-20 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-cream-100/40 tracking-[0.2em] uppercase">
          © {new Date().getFullYear()} Talim Academy
        </p>
        <p className="text-xs text-cream-100/40 tracking-[0.2em] uppercase">
          Crafted in Cairo
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;