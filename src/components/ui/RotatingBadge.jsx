const RotatingBadge = ({ text = 'THE WORLD BEST COURSE • TAKE ONLINE • ' }) => (
  <div className="relative w-36 h-36 flex items-center justify-center">
    <div className="absolute inset-0 rounded-full bg-deep border border-gold/30 shadow-[0_0_60px_rgba(184,137,74,0.2)]" />
    <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full animate-spin-slow">
      <defs>
        <path id="cp" d="M 50, 50 m -36, 0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0" />
      </defs>
      <text className="fill-cream-100 text-[7px] uppercase tracking-[0.2em] font-medium">
        <textPath href="#cp" startOffset="0">{text}</textPath>
      </text>
    </svg>
    <div className="relative z-10 text-gold">
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <path d="M7 17L17 7M17 7H8M17 7V16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </div>
  </div>
);

export default RotatingBadge;