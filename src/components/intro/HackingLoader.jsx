// import { useEffect, useRef, useState } from 'react';

// // ============================================
// // Loading messages (بدون سطور كتير)
// // ============================================
// const LOADING_STEPS = [
//   { at: 0,   text: '> INITIALIZING SECURE SESSION...' },
//   { at: 25,  text: '> AUTHENTICATING OPERATOR...' },
//   { at: 55,  text: '> LOADING INTERFACE...' },
//   { at: 85,  text: '> FINALIZING...' },
//   { at: 100, text: '> ✓ ACCESS GRANTED' },
// ];

// // ============================================
// // Fake technical readouts
// // ============================================
// const READOUTS = [
//   { label: 'PING',      unit: 'ms',   min: 12,  max: 45 },
//   { label: 'BANDWIDTH', unit: 'Mbps', min: 850, max: 980 },
//   { label: 'CPU',       unit: '%',    min: 15,  max: 60 },
//   { label: 'MEMORY',    unit: '%',    min: 30,  max: 75 },
// ];

// // ============================================
// // Hacking Loader — Fast + Welcome Message
// // ============================================
// const HackingLoader = ({ onComplete }) => {
//   const [progress, setProgress] = useState(0);
//   const [visibleSteps, setVisibleSteps] = useState([]);
//   const [readouts, setReadouts] = useState(
//     READOUTS.map((r) => ({ ...r, value: r.min }))
//   );
//   const [phase, setPhase] = useState('loading'); // loading | welcome | done
//   const canvasRef = useRef(null);
//   const onCompleteRef = useRef(onComplete);
//   const hasFiredRef = useRef(false);

//   useEffect(() => {
//     onCompleteRef.current = onComplete;
//   }, [onComplete]);

//   // ═══════ CANVAS — particles + wireframe ═══════
//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext('2d');

//     const resize = () => {
//       canvas.width = window.innerWidth;
//       canvas.height = window.innerHeight;
//     };
//     resize();
//     window.addEventListener('resize', resize);

//     const particles = Array.from({ length: 80 }, () => ({
//       x: Math.random() * canvas.width,
//       y: Math.random() * canvas.height,
//       vx: (Math.random() - 0.5) * 0.3,
//       vy: (Math.random() - 0.5) * 0.3,
//       r: Math.random() * 1.5 + 0.5,
//     }));

//     let angle = 0;

//     const render = () => {
//       ctx.fillStyle = 'rgba(6, 7, 11, 0.35)';
//       ctx.fillRect(0, 0, canvas.width, canvas.height);

//       particles.forEach((p) => {
//         p.x += p.vx;
//         p.y += p.vy;
//         if (p.x < 0) p.x = canvas.width;
//         if (p.x > canvas.width) p.x = 0;
//         if (p.y < 0) p.y = canvas.height;
//         if (p.y > canvas.height) p.y = 0;

//         ctx.beginPath();
//         ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
//         ctx.fillStyle = 'rgba(111, 232, 255, 0.35)';
//         ctx.fill();
//       });

//       for (let i = 0; i < particles.length; i++) {
//         for (let j = i + 1; j < particles.length; j++) {
//           const dx = particles[i].x - particles[j].x;
//           const dy = particles[i].y - particles[j].y;
//           const dist = Math.sqrt(dx * dx + dy * dy);
//           if (dist < 140) {
//             ctx.beginPath();
//             ctx.moveTo(particles[i].x, particles[i].y);
//             ctx.lineTo(particles[j].x, particles[j].y);
//             ctx.strokeStyle = `rgba(111, 232, 255, ${0.15 * (1 - dist / 140)})`;
//             ctx.lineWidth = 0.5;
//             ctx.stroke();
//           }
//         }
//       }

//       const cx = canvas.width / 2;
//       const cy = canvas.height / 2;
//       const radius = Math.min(canvas.width, canvas.height) * 0.28;

//       ctx.save();
//       ctx.translate(cx, cy);
//       ctx.rotate(angle);
//       ctx.strokeStyle = 'rgba(111, 232, 255, 0.08)';
//       ctx.lineWidth = 1;
//       for (let i = 0; i < 3; i++) {
//         ctx.beginPath();
//         ctx.ellipse(0, 0, radius, radius * (0.3 + i * 0.35), 0, 0, Math.PI * 2);
//         ctx.stroke();
//       }
//       ctx.restore();

//       angle += 0.002;
//       requestAnimationFrame(render);
//     };

//     render();

//     return () => window.removeEventListener('resize', resize);
//   }, []);

//   // ═══════ PROGRESS — 0 → 100 في ~2.5 ثانية ═══════
//   useEffect(() => {
//     let current = 0;
//     const interval = setInterval(() => {
//       // سرعة ثابتة أعلى — ~2.5 ثانية
//       const speed = Math.random() * 2 + 3; // 3-5 لكل tick
//       current = Math.min(100, current + speed);
//       setProgress(current);

//       if (current >= 100) {
//         clearInterval(interval);
//         // ⚡ مباشرة → welcome
//         setTimeout(() => setPhase('welcome'), 300);
//         // بعد 2 ثانية → done (onComplete)
//         setTimeout(() => {
//           if (!hasFiredRef.current) {
//             hasFiredRef.current = true;
//             setPhase('done');
//             onCompleteRef.current?.();
//           }
//         }, 2200);
//       }
//     }, 60);

//     return () => clearInterval(interval);
//   }, []);

//   // ═══════ VISIBLE STEPS ═══════
//   useEffect(() => {
//     const next = LOADING_STEPS.filter((s) => s.at <= progress);
//     setVisibleSteps(next);
//   }, [progress]);

//   // ═══════ READOUTS flicker ═══════
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setReadouts((prev) =>
//         prev.map((r) => ({
//           ...r,
//           value: Math.floor(r.min + Math.random() * (r.max - r.min)),
//         }))
//       );
//     }, 220);
//     return () => clearInterval(interval);
//   }, []);

//   const R = 130;
//   const C = 2 * Math.PI * R;

//   return (
//     <div className="fixed inset-0 z-[200] bg-[#06070B] overflow-hidden font-mono">
//       {/* CANVAS */}
//       <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

//       {/* GRID */}
//       <div
//         className="absolute inset-0 pointer-events-none opacity-[0.04]"
//         style={{
//           backgroundImage:
//             'linear-gradient(rgba(111,232,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(111,232,255,.5) 1px, transparent 1px)',
//           backgroundSize: '60px 60px',
//           maskImage:
//             'radial-gradient(ellipse at center, black 20%, transparent 70%)',
//           WebkitMaskImage:
//             'radial-gradient(ellipse at center, black 20%, transparent 70%)',
//         }}
//       />

//       {/* SCAN LINE */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div
//           className="absolute left-0 right-0 h-[30vh] opacity-30"
//           style={{
//             background:
//               'linear-gradient(to bottom, transparent, rgba(111,232,255,0.06), transparent)',
//             animation: 'scanPass 5s linear infinite',
//           }}
//         />
//       </div>

//       {/* TOP BAR */}
//       <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 md:px-12 py-6 md:py-8">
//         <div className="flex items-center gap-3">
//           <span className="relative flex h-2 w-2">
//             <span className="absolute inline-flex h-full w-full rounded-full bg-[#6FE8FF] opacity-75 animate-ping" />
//             <span className="relative inline-flex h-2 w-2 rounded-full bg-[#6FE8FF]" />
//           </span>
//           <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.4em] text-[#6FE8FF]">
//             IT GATE · SECURE LOADER
//           </span>
//         </div>
//         <div className="flex items-center gap-4 font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] text-white/40">
//           <span className="hidden md:inline">v3.7.1</span>
//           <span className="hidden md:inline">|</span>
//           <span>{new Date().toLocaleTimeString()}</span>
//         </div>
//       </div>

//       {/* BOTTOM BAR */}
//       <div className="absolute bottom-0 left-0 right-0 z-20 flex items-center justify-between px-6 md:px-12 py-6 md:py-8">
//         <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] text-white/30">
//           {phase === 'loading' ? 'Loading assets...' : 'Ready'}
//         </span>
//         <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] text-white/30">
//           © IT GATE {new Date().getFullYear()}
//         </span>
//       </div>

//       {/* HUD CORNERS */}
//       <div className="absolute top-6 left-6 w-10 h-10 border-l border-t border-[#6FE8FF]/30" />
//       <div className="absolute top-6 right-6 w-10 h-10 border-r border-t border-[#6FE8FF]/30" />
//       <div className="absolute bottom-6 left-6 w-10 h-10 border-l border-b border-[#6FE8FF]/30" />
//       <div className="absolute bottom-6 right-6 w-10 h-10 border-r border-b border-[#6FE8FF]/30" />

//       {/* ═══════════════════════════════════════════
//           LOADING VIEW (progress ring)
//       ═══════════════════════════════════════════ */}
//       {phase === 'loading' && (
//         <div className="relative z-10 h-full flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 px-6 md:px-12">

//           {/* LEFT — Terminal */}
//           <div className="hidden lg:flex flex-col w-[280px] xl:w-[340px] text-xs">
//             <div className="mb-4 text-[10px] uppercase tracking-[0.35em] text-white/40">
//               // Terminal
//             </div>
//             <div className="space-y-1.5 font-mono">
//               {visibleSteps.map((step, i) => {
//                 const isLast = i === visibleSteps.length - 1;
//                 const isDone = step.at === 100;
//                 return (
//                   <div
//                     key={i}
//                     className={`leading-relaxed ${
//                       isDone
//                         ? 'text-[#6FE8FF] font-bold'
//                         : isLast
//                         ? 'text-white'
//                         : 'text-[#39FF88]/70'
//                     }`}
//                     style={{ animation: 'fadeSlideIn 250ms ease-out' }}
//                   >
//                     {step.text}
//                   </div>
//                 );
//               })}
//               <div className="flex items-center gap-2 pt-2 text-[#6FE8FF]">
//                 <span className="text-[#39FF88]">root@itgate</span>
//                 <span className="text-white/40">:~$</span>
//                 <span
//                   className="inline-block w-2 h-4 bg-[#6FE8FF]"
//                   style={{ animation: 'blinkCursor 1s steps(1) infinite' }}
//                 />
//               </div>
//             </div>
//           </div>

//           {/* CENTER — Progress Ring */}
//           <div className="relative flex items-center justify-center">
//             <div
//               className="absolute w-[500px] h-[500px] rounded-full pointer-events-none"
//               style={{
//                 background:
//                   'radial-gradient(circle, rgba(111,232,255,0.15) 0%, rgba(111,232,255,0.05) 40%, transparent 70%)',
//                 animation: 'pulseGlow 3s ease-in-out infinite',
//               }}
//             />

//             <svg width="320" height="320" viewBox="0 0 320 320" className="relative -rotate-90">
//               <circle
//                 cx="160" cy="160" r={R}
//                 stroke="rgba(255,255,255,0.06)" strokeWidth="2" fill="none"
//               />

//               {Array.from({ length: 60 }).map((_, i) => {
//                 const a = (i / 60) * Math.PI * 2 - Math.PI / 2;
//                 const r1 = R + 12;
//                 const r2 = R + (i % 5 === 0 ? 22 : 16);
//                 return (
//                   <line
//                     key={i}
//                     x1={160 + Math.cos(a) * r1}
//                     y1={160 + Math.sin(a) * r1}
//                     x2={160 + Math.cos(a) * r2}
//                     y2={160 + Math.sin(a) * r2}
//                     stroke={
//                       progress >= (i / 60) * 100
//                         ? 'rgba(111,232,255,0.6)'
//                         : 'rgba(255,255,255,0.12)'
//                     }
//                     strokeWidth={i % 5 === 0 ? 2 : 1}
//                     strokeLinecap="round"
//                   />
//                 );
//               })}

//               <circle
//                 cx="160" cy="160" r={R}
//                 stroke="url(#progressGradient)"
//                 strokeWidth="3" fill="none" strokeLinecap="round"
//                 strokeDasharray={C}
//                 strokeDashoffset={C - (C * progress) / 100}
//                 style={{
//                   transition: 'stroke-dashoffset 80ms linear',
//                   filter: 'drop-shadow(0 0 12px rgba(111,232,255,0.8))',
//                 }}
//               />

//               <defs>
//                 <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
//                   <stop offset="0%" stopColor="#6FE8FF" />
//                   <stop offset="50%" stopColor="#A68BFF" />
//                   <stop offset="100%" stopColor="#6FE8FF" />
//                 </linearGradient>
//               </defs>
//             </svg>

//             <div className="absolute inset-0 flex flex-col items-center justify-center">
//               <div
//                 className="font-sans font-black text-[5rem] md:text-[7rem] leading-none
//                            text-white tabular-nums tracking-tighter"
//                 style={{
//                   textShadow:
//                     '0 0 40px rgba(111,232,255,0.6), 0 0 80px rgba(111,232,255,0.3)',
//                 }}
//               >
//                 {String(Math.floor(progress)).padStart(2, '0')}
//                 <span className="text-[#6FE8FF] text-2xl md:text-4xl align-top ml-1">
//                   %
//                 </span>
//               </div>
//               <div className="mt-2 text-[10px] md:text-xs uppercase tracking-[0.5em] text-[#6FE8FF]/80">
//                 {progress < 100 ? 'LOADING' : 'COMPLETE'}
//               </div>
//             </div>
//           </div>

//           {/* RIGHT — Readouts */}
//           <div className="hidden lg:flex flex-col w-[280px] xl:w-[340px] text-xs">
//             <div className="mb-4 text-[10px] uppercase tracking-[0.35em] text-white/40">
//               // Diagnostics
//             </div>
//             <div className="space-y-3">
//               {readouts.map((r) => (
//                 <div key={r.label}>
//                   <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.25em] text-white/40 mb-1.5">
//                     <span>{r.label}</span>
//                     <span className="text-[#6FE8FF] tabular-nums">
//                       {r.value}
//                       <span className="text-white/30 ml-1 text-[9px]">
//                         {r.unit}
//                       </span>
//                     </span>
//                   </div>
//                   <div className="h-px bg-white/[0.08] overflow-hidden">
//                     <div
//                       className="h-full bg-gradient-to-r from-[#6FE8FF] to-[#A68BFF] transition-all duration-300"
//                       style={{
//                         width: `${((r.value - r.min) / (r.max - r.min)) * 100}%`,
//                       }}
//                     />
//                   </div>
//                 </div>
//               ))}
//             </div>

//             <div className="mt-8 pt-6 border-t border-white/[0.06]">
//               <div className="text-[10px] uppercase tracking-[0.35em] text-white/40 mb-2">
//                 // Session
//               </div>
//               <div className="space-y-1.5 font-mono text-[11px]">
//                 <div className="flex justify-between">
//                   <span className="text-white/40">ENCRYPTION</span>
//                   <span className="text-[#39FF88]">AES-256</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-white/40">NODE</span>
//                   <span className="text-white/80">CAIRO-EG-04</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-white/40">STATUS</span>
//                   <span className="text-[#6FE8FF]">
//                     {progress < 100 ? 'SYNCING' : 'READY'}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* MOBILE PROGRESS INFO */}
//       {phase === 'loading' && (
//         <div className="lg:hidden absolute bottom-24 left-0 right-0 text-center px-6">
//           <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/50 mb-2">
//             {visibleSteps[visibleSteps.length - 1]?.text || '...'}
//           </div>
//         </div>
//       )}

//       {/* ═══════════════════════════════════════════
//           WELCOME MESSAGE
//       ═══════════════════════════════════════════ */}
//       {phase === 'welcome' && (
//         <div
//           className="absolute inset-0 z-40 flex items-center justify-center bg-[#06070B]/95 backdrop-blur-md px-6"
//           style={{ animation: 'doneFadeIn 500ms ease-out forwards' }}
//         >
//           <div className="text-center max-w-3xl">

//             {/* Check circle */}
//             <div
//               className="mx-auto mb-8 w-24 h-24 rounded-full flex items-center justify-center"
//               style={{
//                 background:
//                   'radial-gradient(circle, rgba(57,255,136,0.25), transparent 70%)',
//                 animation: 'pulseGlow 2s ease-in-out infinite',
//               }}
//             >
//               <svg width="56" height="56" viewBox="0 0 60 60" fill="none">
//                 <circle
//                   cx="30" cy="30" r="28"
//                   stroke="#39FF88" strokeWidth="2"
//                   strokeDasharray="175" strokeDashoffset="175"
//                   style={{ animation: 'checkCircle 600ms ease-out forwards' }}
//                 />
//                 <path
//                   d="M18 30 L27 39 L42 22"
//                   stroke="#39FF88" strokeWidth="3"
//                   strokeLinecap="round" strokeLinejoin="round"
//                   strokeDasharray="50" strokeDashoffset="50"
//                   style={{
//                     animation: 'checkMark 400ms ease-out 350ms forwards',
//                   }}
//                 />
//               </svg>
//             </div>

//             {/* Small label */}
//             <div
//               className="font-mono text-[10px] md:text-xs uppercase tracking-[0.5em] text-[#39FF88] mb-6"
//               style={{ animation: 'fadeSlideIn 500ms ease-out 200ms both' }}
//             >
//               // Welcome Message
//             </div>

//             {/* Main message */}
//             <h1
//               className="font-sans font-light text-3xl md:text-5xl lg:text-6xl
//                          text-white leading-tight tracking-tight mb-6"
//               style={{ animation: 'fadeSlideIn 700ms ease-out 400ms both' }}
//             >
//               Dear Student,{' '}
//               <span className="text-[#6FE8FF] italic">Welcome</span>
//               <br />
//               to our <span className="text-[#6FE8FF] italic">world</span>.
//             </h1>

//             {/* Sub */}
//             <p
//               className="font-mono text-xs md:text-sm uppercase tracking-[0.35em] text-white/50"
//               style={{ animation: 'fadeSlideIn 700ms ease-out 700ms both' }}
//             >
//               // Your journey starts now
//             </p>
//           </div>
//         </div>
//       )}

//       {/* ═══════════════════════════════════════════
//           DONE — Fade out
//       ═══════════════════════════════════════════ */}
//       {phase === 'done' && (
//         <div
//           className="absolute inset-0 z-50 bg-[#06070B]"
//           style={{ animation: 'doneFadeOut 600ms ease-out forwards' }}
//         />
//       )}

//       {/* ═══════════════════════════════════════════
//           STYLES
//       ═══════════════════════════════════════════ */}
//       <style>{`
//         @keyframes blinkCursor {
//           0%, 50% { opacity: 1; }
//           51%, 100% { opacity: 0; }
//         }
//         @keyframes scanPass {
//           0%   { top: -30vh; }
//           100% { top: 130vh; }
//         }
//         @keyframes pulseGlow {
//           0%, 100% { opacity: 0.6; transform: scale(1); }
//           50%      { opacity: 1;   transform: scale(1.06); }
//         }
//         @keyframes fadeSlideIn {
//           from { opacity: 0; transform: translateY(8px); }
//           to   { opacity: 1; transform: translateY(0); }
//         }
//         @keyframes doneFadeIn {
//           from { opacity: 0; }
//           to   { opacity: 1; }
//         }
//         @keyframes doneFadeOut {
//           from { opacity: 1; }
//           to   { opacity: 0; }
//         }
//         @keyframes checkCircle {
//           to { stroke-dashoffset: 0; }
//         }
//         @keyframes checkMark {
//           to { stroke-dashoffset: 0; }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default HackingLoader;

import React from 'react'

export default function HackingLoader() {
  return (
    <div>
      
    </div>
  )
}
