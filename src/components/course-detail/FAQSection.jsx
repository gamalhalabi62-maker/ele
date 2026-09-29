import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const FAQSection = ({ faq }) => {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="scroll-mt-32">
      <h2 className="font-sans font-light text-3xl md:text-4xl text-white mb-8 tracking-tight">
        Frequently asked <span className="italic text-neutral-400">questions</span>
      </h2>

      <div className="border-t border-white/[0.06]">
        {faq.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={i} className="border-b border-white/[0.06]">
              <button
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="w-full flex items-center gap-4 py-5 text-left group"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40 shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className={`flex-1 text-white text-base md:text-lg font-normal transition-colors ${
                  isOpen ? 'text-neon-cyan' : 'group-hover:text-neon-cyan'
                }`}>
                  {item.q}
                </span>
                <span className="shrink-0 text-white/50">
                  {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                </span>
              </button>

              {isOpen && (
                <div className="pl-12 pr-4 pb-6 text-white/70 text-sm leading-relaxed font-light">
                  {item.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FAQSection;