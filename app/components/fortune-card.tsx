"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
            <Card
              className="cursor-pointer border-2 border-amber-500/50 bg-gradient-to-br from-amber-50 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 shadow-xl hover:shadow-2xl transition-shadow duration-300 min-h-[400px] flex flex-col items-center justify-center"
              onClick={!isLoading ? getFortune : undefined}
            >
              <CardHeader className="text-center">
                <motion.div
                  animate={{
                    scale: isLoading ? [1, 1.1, 1] : 1,
                    rotate: isLoading ? [0, 5, -5, 0] : 0
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: isLoading ? Infinity : 0,
                    ease: "easeInOut"
                  }}
                  className="text-6xl mb-4"
                >
                  {isLoading ? "🌟" : "🔮"}
                </motion.div>
                <CardTitle className="text-2xl text-amber-800 dark:text-amber-200">
                  Колядочное гадание
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-amber-700 dark:text-amber-300 mb-6">
                  {isLoading
                    ? "Духи колядок готовят ваше предсказание..."
                    : "Нажмите на карту, чтобы узнать свою судьбу"}
                </p>
                {error && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-red-500 text-sm mt-2"
                  >
                    {error}
                  </motion.p>
                )}
                <motion.div
                  animate={{
                    y: isLoading ? 0 : [0, -10, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="text-amber-600 dark:text-amber-400 text-sm"
                >
                  {!isLoading && "✨ Нажмите на карту ✨"}
                </motion.div>
              </CardContent>
            </Card>
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
            <Card className="border-2 border-purple-500/50 bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 shadow-xl min-h-[400px] flex flex-col">
              <CardHeader className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1, rotate: [0, 360] }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="text-5xl mb-2"
                >
                  ⭐
                </motion.div>
                <CardTitle className="text-xl text-purple-800 dark:text-purple-200">
                  Ваше предсказание
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col items-center justify-center">
                <AnimatePresence>
                  {isRevealed && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                      className="text-center"
                    >
                      <p className="text-lg text-purple-900 dark:text-purple-100 leading-relaxed italic mb-6 px-4">
                        "{fortune}"
                      </p>
                      <Button
                        onClick={reset}
                        variant="outline"
                        className="border-purple-400 text-purple-700 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/50"
                      >
                        🔮 Погадать снова
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
