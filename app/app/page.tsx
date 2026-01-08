import { FortuneCard } from "@/components/fortune-card";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 py-8 px-4">
      {/* Decorative stars background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 text-yellow-300/30 text-4xl animate-pulse">✦</div>
        <div className="absolute top-20 right-20 text-yellow-300/20 text-2xl animate-pulse" style={{ animationDelay: "0.5s" }}>✧</div>
        <div className="absolute bottom-40 left-20 text-yellow-300/25 text-3xl animate-pulse" style={{ animationDelay: "1s" }}>★</div>
        <div className="absolute top-40 left-1/3 text-yellow-300/15 text-xl animate-pulse" style={{ animationDelay: "1.5s" }}>✦</div>
        <div className="absolute bottom-20 right-1/4 text-yellow-300/20 text-2xl animate-pulse" style={{ animationDelay: "0.7s" }}>✧</div>
        <div className="absolute top-1/3 right-10 text-yellow-300/25 text-3xl animate-pulse" style={{ animationDelay: "1.2s" }}>★</div>
      </div>

      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen gap-8">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-400 mb-4">
            Колядочные Гадания
          </h1>
          <p className="text-purple-200/80 text-lg max-w-md mx-auto">
            Узнай, что готовит тебе судьба в новом году. Нажми на карту и получи своё предсказание.
          </p>
        </header>

        {/* Fortune Card */}
        <FortuneCard />

        {/* Footer */}
        <footer className="mt-12 text-center text-purple-300/50 text-sm">
          <p>🌟 Пусть удача будет с тобой 🌟</p>
        </footer>
      </main>
    </div>
  );
}
