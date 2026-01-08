import { FortuneCard } from "@/components/fortune-card";
import { Sparkles, Moon, Eye, Circle, Star, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--slate-950)] relative overflow-hidden">
      {/* Atmospheric background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Elegant gradient orbs */}
        <div
          className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] rounded-full opacity-[0.03] animate-subtle-float"
          style={{
            background: 'radial-gradient(circle, var(--copper) 0%, transparent 70%)',
            animationDelay: '0s'
          }}
        />
        <div
          className="absolute bottom-1/3 -right-1/4 w-[500px] h-[500px] rounded-full opacity-[0.04] animate-subtle-float"
          style={{
            background: 'radial-gradient(circle, var(--bronze) 0%, transparent 70%)',
            animationDelay: '3s'
          }}
        />

        {/* Animated mystical icons */}
        <div className="absolute top-[15%] left-[8%] text-[var(--copper)] opacity-20 animate-subtle-float" style={{ animationDelay: '0s' }}>
          <Sparkles size={20} strokeWidth={1.5} />
        </div>
        <div className="absolute top-[25%] right-[12%] text-[var(--copper)] opacity-15 animate-subtle-float" style={{ animationDelay: '2s' }}>
          <Moon size={24} strokeWidth={1.5} />
        </div>
        <div className="absolute top-[45%] left-[15%] text-[var(--copper)] opacity-10 animate-subtle-float" style={{ animationDelay: '4s' }}>
          <Star size={18} strokeWidth={1.5} />
        </div>
        <div className="absolute top-[60%] right-[18%] text-[var(--copper)] opacity-15 animate-subtle-float" style={{ animationDelay: '1s' }}>
          <Eye size={22} strokeWidth={1.5} />
        </div>
        <div className="absolute bottom-[20%] left-[20%] text-[var(--copper)] opacity-10 animate-subtle-float" style={{ animationDelay: '3s' }}>
          <Zap size={20} strokeWidth={1.5} />
        </div>
        <div className="absolute top-[35%] right-[25%] text-[var(--bronze)] opacity-8 animate-subtle-float" style={{ animationDelay: '5s' }}>
          <Circle size={16} strokeWidth={1.5} />
        </div>
        <div className="absolute bottom-[35%] right-[8%] text-[var(--copper)] opacity-12 animate-subtle-float" style={{ animationDelay: '2.5s' }}>
          <Sparkles size={22} strokeWidth={1.5} />
        </div>
        <div className="absolute top-[70%] left-[10%] text-[var(--bronze)] opacity-10 animate-subtle-float" style={{ animationDelay: '1.5s' }}>
          <Star size={20} strokeWidth={1.5} />
        </div>
        <div className="absolute top-[50%] left-[5%] text-[var(--copper)] opacity-8 animate-subtle-float" style={{ animationDelay: '4.5s' }}>
          <Circle size={14} strokeWidth={1.5} />
        </div>
        <div className="absolute bottom-[45%] left-[30%] text-[var(--copper)] opacity-12 animate-subtle-float" style={{ animationDelay: '3.5s' }}>
          <Moon size={18} strokeWidth={1.5} />
        </div>

        {/* Geometric line accents */}
        <div className="absolute top-0 left-1/2 w-px h-32 bg-gradient-to-b from-transparent via-[var(--copper)] to-transparent opacity-20" />
        <div className="absolute bottom-0 left-1/3 w-px h-40 bg-gradient-to-t from-transparent via-[var(--copper)] to-transparent opacity-20" />
        <div className="absolute bottom-0 right-1/3 w-px h-24 bg-gradient-to-t from-transparent via-[var(--copper)] to-transparent opacity-20" />
      </div>

      <main className="relative z-10 min-h-screen flex flex-col">
        {/* Header - Editorial Style */}
        <header className="pt-16 pb-12 px-4 text-center animate-fade-in-up">
          <div className="max-w-2xl mx-auto">
            {/* Overline */}
            <div className="mb-6">
              <span className="text-[var(--copper)] text-xs tracking-[0.3em] uppercase font-[family-name:var(--font-outfit)] font-medium">
                Современное гадание
              </span>
            </div>

            {/* Main title */}
            <h1 className="font-[family-name:var(--font-cormorant)] text-6xl md:text-7xl lg:text-8xl font-light text-[var(--cream)] mb-6 leading-[0.95] tracking-tight">
              Узнай свою<br />судьбу
            </h1>

            {/* Subtitle */}
            <p className="text-[var(--cream-dark)] text-base md:text-lg max-w-md mx-auto leading-relaxed font-light">
              Традиционные предсказания в современном формате.
              Раскройте карту и получите послание.
            </p>
          </div>
        </header>

        {/* Fortune Card Section */}
        <section className="flex-1 flex items-center justify-center px-4 py-12">
          <FortuneCard />
        </section>

        {/* Footer - Minimal */}
        <footer className="pb-12 pt-8 px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-[var(--copper)] to-transparent opacity-30 mx-auto" />
          </div>
        </footer>
      </main>
    </div>
  );
}
