"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

export function FortuneCard() {
  const [fortune, setFortune] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getFortune = async () => {
    setIsLoading(true);
    setError(null);
    setIsRevealed(false);

    try {
      const response = await fetch("/api/fortune", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Не удалось получить гадание");
      }

      const data = await response.json();
      setFortune(data.fortune);

      // Delay the reveal for animation
      setTimeout(() => {
        setIsRevealed(true);
      }, 500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Произошла ошибка");
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setFortune(null);
    setIsRevealed(false);
    setError(null);
  };

  return (
    <div className="relative w-full max-w-md mx-auto perspective-1000">
      <AnimatePresence mode="wait">
        {!fortune ? (
          <motion.div
            key="card-front"
            initial={{ rotateY: 0 }}
            exit={{ rotateY: 180 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="w-full"
          >
            {/* Glassmorphism Card - Front */}
            <motion.div
              className="cursor-pointer backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl min-h-[420px] flex flex-col items-center justify-center p-8 relative overflow-hidden group"
              onClick={!isLoading ? getFortune : undefined}
              whileHover={{ scale: 1.02, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {/* Animated glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-purple-500/5 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />

              {/* Inner border glow */}
              <div className="absolute inset-[1px] rounded-3xl border border-white/10" />

              {/* Crystal Ball Icon */}
              <motion.div
                animate={{
                  scale: isLoading ? [1, 1.15, 1] : 1,
                  rotate: isLoading ? [0, 5, -5, 0] : 0
                }}
                transition={{
                  duration: 1.5,
                  repeat: isLoading ? Infinity : 0,
                  ease: "easeInOut"
                }}
                className="text-7xl mb-6 relative z-10"
              >
                {isLoading ? (
                  <span className="drop-shadow-[0_0_20px_rgba(255,215,0,0.5)]">🌟</span>
                ) : (
                  <span className="drop-shadow-[0_0_15px_rgba(147,51,234,0.4)]">🔮</span>
                )}
              </motion.div>

              <h2 className="text-2xl font-bold text-amber-200 mb-4 relative z-10 drop-shadow-lg">
                Колядочное гадание
              </h2>

              <p className="text-purple-100/80 mb-6 text-center relative z-10">
                {isLoading
                  ? "Духи колядок готовят ваше предсказание..."
                  : "Нажмите на карту, чтобы узнать свою судьбу"}
              </p>

              {error && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-400 text-sm mt-2 relative z-10"
                >
                  {error}
                </motion.p>
              )}

              <motion.div
                animate={{
                  y: isLoading ? 0 : [0, -8, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="text-amber-300/90 text-sm relative z-10"
              >
                {!isLoading && "✨ Нажмите на карту ✨"}
              </motion.div>

              {/* Decorative corner elements */}
              <div className="absolute top-4 left-4 text-amber-300/30 text-xl">✦</div>
              <div className="absolute top-4 right-4 text-amber-300/30 text-xl">✦</div>
              <div className="absolute bottom-4 left-4 text-amber-300/30 text-xl">✦</div>
              <div className="absolute bottom-4 right-4 text-amber-300/30 text-xl">✦</div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="card-back"
            initial={{ rotateY: -180, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: -180 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="w-full"
          >
            {/* Glassmorphism Card - Back (Fortune revealed) */}
            <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl min-h-[420px] flex flex-col relative overflow-hidden">
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-pink-500/10 rounded-3xl" />

              {/* Inner border glow */}
              <div className="absolute inset-[1px] rounded-3xl border border-white/10" />

              <div className="text-center p-8 relative z-10">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1, rotate: [0, 360] }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="text-6xl mb-4"
                >
                  <span className="drop-shadow-[0_0_20px_rgba(255,215,0,0.5)]">⭐</span>
                </motion.div>
                <h2 className="text-xl font-bold text-purple-200 drop-shadow-lg">
                  Ваше предсказание
                </h2>
              </div>

              <div className="flex-1 flex flex-col items-center justify-center p-8 relative z-10">
                <AnimatePresence>
                  {isRevealed && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                      className="text-center"
                    >
                      <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
                        <p className="text-lg text-purple-100 leading-relaxed italic">
                          &ldquo;{fortune}&rdquo;
                        </p>
                      </div>
                      <Button
                        onClick={reset}
                        className="backdrop-blur-md bg-white/10 border border-white/20 text-amber-200 hover:bg-white/20 hover:text-amber-100 transition-all duration-300 rounded-xl px-6 py-3 shadow-lg"
                      >
                        🔮 Погадать снова
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Decorative corner elements */}
              <div className="absolute top-4 left-4 text-purple-300/30 text-xl">✧</div>
              <div className="absolute top-4 right-4 text-purple-300/30 text-xl">✧</div>
              <div className="absolute bottom-4 left-4 text-purple-300/30 text-xl">✧</div>
              <div className="absolute bottom-4 right-4 text-purple-300/30 text-xl">✧</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
