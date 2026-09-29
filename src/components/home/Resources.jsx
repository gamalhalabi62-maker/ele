import { ArrowUpRight } from 'lucide-react';
import ParallaxCards from '../ui/ParallaxCards';
import SplitText from '../ui/SplitText';
import { resources } from '../../mocks/resources';

const Resources = () => (
  <section className="relative overflow-hidden">
    <div className="container-x relative">
      <div className="max-w-4xl mb-20">
        <span className="eyebrow mb-8 inline-flex">Resources</span>
        <SplitText
          as="h2"
          variant="words"
          text="A collection of resources for all things eLearning."
          className="text-4xl md:text-6xl lg:text-7xl font-serif font-light text-cream-100 leading-[1.05]"
        />
      </div>

      <ParallaxCards
        speedPerCard={10}
        alternate={true}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {resources.map((r, i) => {
          const Icon = r.icon;
          const sizes = [
            'lg:col-span-2 aspect-[2/1]',
            'aspect-square',
            'aspect-square',
            'aspect-square',
            'aspect-square',
            'lg:col-span-2 aspect-[2/1]',
          ];
          return (
            <div
              key={r.id}
              className={`relative bg-deep border border-white/5 p-8
                          hover:border-gold/40 transition-all duration-500 overflow-hidden
                          ${sizes[i % sizes.length] || 'aspect-square'}`}
              data-cursor="image"
            >
              <div className="absolute top-6 right-6">
                <span className="text-7xl md:text-9xl font-serif ghost-number leading-none select-none">
                  {r.number}
                </span>
              </div>

              <div className="relative h-full flex flex-col justify-between">
                <div className="h-14 w-14 rounded-full bg-white/5 flex items-center justify-center
                                hover:bg-gold transition-colors duration-500">
                  <Icon size={24} className="text-cream-100" strokeWidth={1.8} />
                </div>
                <div className="mt-12">
                  <h3 className="text-2xl md:text-3xl font-serif font-light text-cream-100 mb-3">{r.title}</h3>
                  <p className="text-cream-100/50 text-sm leading-relaxed max-w-md">{r.description}</p>
                  <button className="mt-8 inline-flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-gold">
                    Learn more <ArrowUpRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </ParallaxCards>
    </div>
  </section>
);

export default Resources;