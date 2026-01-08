import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, Moon, Star, Eye } from "lucide-react";
import { getFortune } from "../services/fortune";

export function FortuneCard() {
  const [fortune, setFortune] = useState<string | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [apiComplete, setApiComplete] = useState(false);
  const [isLimitReached, setIsLimitReached] = useState(false);

  const DAILY_LIMIT = 2;
  const STORAGE_KEY = "fortune-limit-storage";

  // Check limit on mount
  useEffect(() => {
    const today = new Date().toDateString();
    const storageData = localStorage.getItem(STORAGE_KEY);
    if (storageData) {
      const { date, count } = JSON.parse(storageData);
      if (date === today && count >= DAILY_LIMIT) {
        // Use setTimeout to avoid synchronous setState warning
        const timer = setTimeout(() => setIsLimitReached(true), 0);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  // Simulate loading progress
  useEffect(() => {
    if (isLoading && loadingProgress < 100) {
      const timer = setTimeout(() => {
        // Simulate realistic loading speed with random increments
        const increment = Math.random() * 15 + 5;
        const nextProgress = Math.min(loadingProgress + increment, apiComplete ? 100 : 90);
        setLoadingProgress(nextProgress);

        // When we reach 100%, finish loading
        if (nextProgress >= 100) {
          setTimeout(() => {
            setIsLoading(false);
            setIsFlipped(true);
          }, 300);
        }
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [isLoading, loadingProgress, apiComplete]);

  const handleGetFortune = async () => {
    const today = new Date().toDateString();
    
    try {
      const storageData = localStorage.getItem(STORAGE_KEY);
      let count = 0;
      
      if (storageData) {
        const { date, count: storedCount } = JSON.parse(storageData);
        if (date === today) {
          count = storedCount;
        }
      }

      if (count >= DAILY_LIMIT) {
        setIsLimitReached(true);
        setError("Вы исчерпали лимит предсказаний на сегодня (максимум 2). Возвращайтесь завтра!");
        return;
      }

      setIsLoading(true);
      setError(null);
      setLoadingProgress(0);
      setApiComplete(false);

      const data = await getFortune();
      setFortune(data.fortune);
      setApiComplete(true);
      
      // Update limit counter on success
      const newCount = count + 1;
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        date: today,
        count: newCount
      }));

      if (newCount >= DAILY_LIMIT) {
        setIsLimitReached(true);
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : "Произошла ошибка");
      setIsLoading(false);
      setLoadingProgress(0);
    }
  };

  const reset = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setFortune(null);
      setLoadingProgress(0);
    }, 600);
  };

  return (
    <div className="relative w-full max-w-sm mx-auto" style={{ perspective: "1500px" }}>
      {/* The Card Container */}
      <motion.div
        className="relative w-full"
        style={{
          transformStyle: "preserve-3d",
          aspectRatio: "2.5 / 4"
        }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
      >
        {/* Card Back (Рубашка) */}
        <motion.div
          className="absolute inset-0 backface-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          <motion.button
            onClick={!isLoading && !isLimitReached ? handleGetFortune : undefined}
            disabled={isLoading || isLimitReached}
            className="w-full h-full bg-[var(--slate-900)] border-2 border-[var(--copper)] rounded-lg relative overflow-hidden group cursor-pointer disabled:cursor-default shadow-2xl"
            whileHover={!isLoading && !isLimitReached ? {
              scale: 1.02,
              boxShadow: "0 25px 50px -12px rgba(184, 115, 51, 0.4)",
              transition: { duration: 0.3 }
            } : {}}
            whileTap={!isLoading && !isLimitReached ? { scale: 0.98 } : {}}
          >
            {/* Card Back Design */}
            <div className={`absolute inset-0 ${isLimitReached ? 'opacity-40 grayscale' : ''}`}>
              <img
                src="/card-back.webp"
                alt="Card back"
                className="object-cover w-full h-full rounded-lg"
              />
            </div>

            {/* Limit Reached Overlay */}
            {isLimitReached && !isLoading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-[var(--slate-950)]/60 backdrop-blur-[2px] z-10">
                <Moon className="text-[var(--copper)] mb-4 opacity-60" size={32} />
                <p className="text-[var(--cream)] font-[family-name:var(--font-cormorant)] text-lg leading-relaxed">
                  Звёзды отдыхают. <br />
                  Приходите за новым советом завтра.
                </p>
                <div className="mt-4 w-12 h-px bg-[var(--copper)] opacity-40" />
              </div>
            )}

            {/* Loading overlay */}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-[var(--slate-950)]/95 backdrop-blur-md flex flex-col items-center justify-center z-20"
              >
                <div className="relative w-48 h-48">
                  {/* Center pulsing element */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.6, 1, 0.6]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <div className="w-20 h-20 rounded-full border-2 border-[var(--copper)] opacity-40" />
                  </motion.div>

                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.4, 0.8, 0.4]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.3
                    }}
                  >
                    <div className="w-32 h-32 rounded-full border border-[var(--copper)] opacity-20" />
                  </motion.div>

                  {/* Rotating mystical icons */}
                  <motion.div
                    className="absolute inset-0"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  >
                    {[
                      { Icon: Sparkles, angle: 0 },
                      { Icon: Moon, angle: 90 },
                      { Icon: Star, angle: 180 },
                      { Icon: Eye, angle: 270 }
                    ].map(({ Icon, angle }, i) => (
                      <motion.div
                        key={i}
                        className="absolute top-1/2 left-1/2 text-[var(--copper)]"
                        style={{
                          transform: `rotate(${angle}deg) translateY(-72px) translateX(-50%)`,
                          transformOrigin: "center"
                        }}
                        animate={{
                          opacity: [0.4, 1, 0.4],
                          scale: [0.8, 1, 0.8]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: i * 0.2
                        }}
                      >
                        <motion.div
                          animate={{ rotate: -360 }}
                          transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "linear"
                          }}
                        >
                          <Icon size={20} strokeWidth={1.5} />
                        </motion.div>
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Center text */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      className="text-[var(--copper)] text-4xl font-[family-name:var(--font-cormorant)]"
                      animate={{
                        opacity: [0.5, 1, 0.5]
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      ✦
                    </motion.div>
                  </div>
                </div>

                {/* Animated text */}
                <motion.p
                  className="text-[var(--copper)] text-sm tracking-[0.25em] uppercase font-[family-name:var(--font-outfit)] text-center mt-8 font-light"
                  animate={{
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  Предсказание раскрывается
                </motion.p>

                {/* Subtle progress indicator */}
                <div className="mt-6 flex gap-1">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <motion.div
                      key={i}
                      className="w-1 h-1 rounded-full bg-[var(--copper)]"
                      animate={{
                        opacity: loadingProgress > i * 20 ? [0.3, 1] : 0.2,
                        scale: loadingProgress > i * 20 ? [1, 1.3, 1] : 1
                      }}
                      transition={{
                        duration: 0.6,
                        repeat: loadingProgress > i * 20 ? Infinity : 0,
                        delay: i * 0.1
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {/* Error overlay */}
            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-[var(--slate-950)]/90 backdrop-blur-sm flex items-center justify-center z-20"
              >
                <div className="text-center px-8">
                  <p className="text-red-400 text-sm mb-4">{error}</p>
                  <button
                    onClick={() => setError(null)}
                    className="text-[var(--copper)] text-xs tracking-wider uppercase"
                  >
                    Закрыть
                  </button>
                </div>
              </motion.div>
            )}
          </motion.button>
        </motion.div>

        {/* Card Front (Лицевая сторона с предсказанием) */}
        <motion.div
          className="absolute inset-0 backface-hidden"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)"
          }}
        >
          <div className="w-full h-full bg-[var(--slate-900)] border-2 border-[var(--copper)] rounded-lg relative overflow-hidden shadow-2xl">
            {/* Card front design */}
            <div className="absolute inset-0 p-6 flex flex-col">
              {/* Header */}
              <div className="text-center mb-6">
                <div className="w-12 h-px bg-gradient-to-r from-transparent via-[var(--copper)] to-transparent mx-auto mb-4" />
                <h3 className="font-[family-name:var(--font-cormorant)] text-2xl font-light text-[var(--cream)] tracking-wide">
                  Предсказание
                </h3>
                <div className="w-12 h-px bg-gradient-to-r from-transparent via-[var(--copper)] to-transparent mx-auto mt-4" />
              </div>

              {/* Fortune text */}
              <div className="flex-1 flex items-center justify-center px-4">
                <div className="relative">
                  <div className="absolute -top-2 -left-2 text-[var(--copper)] text-4xl font-[family-name:var(--font-cormorant)] opacity-20 leading-none">
                    &ldquo;
                  </div>
                  <p className="font-[family-name:var(--font-cormorant)] text-lg md:text-xl text-[var(--cream)] leading-relaxed text-center font-light tracking-wide">
                    {fortune}
                  </p>
                  <div className="absolute -bottom-6 -right-2 text-[var(--copper)] text-4xl font-[family-name:var(--font-cormorant)] opacity-20 leading-none">
                    &rdquo;
                  </div>
                </div>
              </div>

              {/* Footer with reset button */}
              <div className="text-center mt-6">
                <div className="w-16 h-px bg-gradient-to-r from-transparent via-[var(--copper)] to-transparent mx-auto mb-4" />
                {!isLimitReached ? (
                  <motion.button
                    onClick={reset}
                    className="text-[var(--copper)] text-xs tracking-[0.25em] uppercase font-[family-name:var(--font-outfit)] font-medium hover:text-[var(--copper-light)] transition-colors duration-300 relative group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Новая карта
                    <div className="absolute bottom-0 left-0 w-full h-px bg-[var(--copper)] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
                  </motion.button>
                ) : (
                  <p className="text-[var(--copper)] text-[10px] tracking-[0.2em] uppercase font-light opacity-60">
                    Лимит на сегодня исчерпан
                  </p>
                )}
              </div>

              {/* Decorative corners */}
              <div className="absolute top-2 left-2 w-6 h-6 border-l-2 border-t-2 border-[var(--copper)] opacity-40" />
              <div className="absolute top-2 right-2 w-6 h-6 border-r-2 border-t-2 border-[var(--copper)] opacity-40" />
              <div className="absolute bottom-2 left-2 w-6 h-6 border-l-2 border-b-2 border-[var(--copper)] opacity-40" />
              <div className="absolute bottom-2 right-2 w-6 h-6 border-r-2 border-b-2 border-[var(--copper)] opacity-40" />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
