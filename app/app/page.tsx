import { FortuneCard } from "@/components/fortune-card";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] py-8 px-4 relative overflow-hidden">
      {/* Animated background gradient overlay */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent pointer-events-none" />

      {/* Floating snowflakes/stars animation */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Large glowing orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />

        {/* Decorative stars - Kolyadki theme */}
        <div className="absolute top-[10%] left-[10%] text-amber-300/40 text-4xl animate-float">✦</div>
        <div className="absolute top-[15%] right-[15%] text-amber-200/30 text-2xl animate-float" style={{ animationDelay: "0.5s" }}>✧</div>
        <div className="absolute bottom-[30%] left-[15%] text-amber-300/35 text-3xl animate-float" style={{ animationDelay: "1s" }}>★</div>
        <div className="absolute top-[35%] left-[40%] text-amber-200/20 text-xl animate-float" style={{ animationDelay: "1.5s" }}>✦</div>
        <div className="absolute bottom-[15%] right-[20%] text-amber-300/30 text-2xl animate-float" style={{ animationDelay: "0.7s" }}>✧</div>
        <div className="absolute top-[50%] right-[8%] text-amber-200/35 text-3xl animate-float" style={{ animationDelay: "1.2s" }}>★</div>
        <div className="absolute top-[70%] left-[8%] text-amber-300/25 text-2xl animate-float" style={{ animationDelay: "2s" }}>✦</div>
        <div className="absolute top-[25%] right-[35%] text-amber-200/20 text-xl animate-float" style={{ animationDelay: "0.3s" }}>✧</div>

        {/* Snowflakes */}
        <div className="absolute top-[5%] left-[30%] text-white/20 text-lg animate-snowfall">❄</div>
        <div className="absolute top-[8%] right-[25%] text-white/15 text-xl animate-snowfall" style={{ animationDelay: "2s" }}>❄</div>
        <div className="absolute top-[3%] left-[60%] text-white/10 text-2xl animate-snowfall" style={{ animationDelay: "4s" }}>❄</div>
        <div className="absolute top-[6%] right-[45%] text-white/20 text-lg animate-snowfall" style={{ animationDelay: "1s" }}>❄</div>
        <div className="absolute top-[2%] left-[80%] text-white/15 text-xl animate-snowfall" style={{ animationDelay: "3s" }}>❄</div>
      </div>

      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen gap-8">
        {/* Glassmorphism Header Card */}
        <header className="text-center mb-8">
          <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl px-8 py-6 shadow-2xl">
            <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-400 mb-4 drop-shadow-lg">
              ✨ Колядочные Гадания ✨
            </h1>
            <p className="text-purple-100/90 text-lg max-w-md mx-auto">
              Узнай, что готовит тебе судьба в новом году. Нажми на карту и получи своё предсказание.
            </p>
          </div>
        </header>

        {/* Fortune Card */}
        <FortuneCard />

        {/* Glassmorphism Footer */}
        <footer className="mt-12 text-center">
          <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl px-6 py-3 shadow-lg">
            <p className="text-amber-200/70 text-sm">🌟 Пусть удача будет с тобой 🌟</p>
          </div>
        </footer>
      </main>
    </div>
  );
}
