import { NextResponse } from "next/server";

const localFortunes = [
  "В новом году тебя ждёт удача в делах сердечных.",
  "Звёзды сулят тебе богатство и процветание.",
  "Путешествие ждёт тебя в ближайшие месяцы.",
  // ... твои остальные варианты ...
];

const AI_SERVER_URL = process.env.AI_SERVER_URL;

export async function POST() {
  try {
    // 1. Если есть URL бэкенда, пробуем получить генерацию
    if (AI_SERVER_URL) {
      try {
        const response = await fetch(`${AI_SERVER_URL}/api/chat`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            model: "google/gemini-2.5-flash", // Или любая другая модель
            // Технически API требует массив, но мы кладем туда ОДНУ инструкцию
            messages: [
              {
                role: "user",
                content:
                  "Придумай одно короткое (1 предложение), мистическое и доброе предсказание на будущее в стиле старых славянских поверий.",
              },
            ],
            temperature: 0.9, // Повыше, чтобы предсказания были разнообразными
            max_tokens: 100,
          }),
          signal: AbortSignal.timeout(8000), // Таймаут 8 сек
        });

        if (response.ok) {
          const data = await response.json();
          // Достаем текст ответа из структуры OpenAI
          const fortune = data.choices?.[0]?.message?.content;

          if (fortune) {
            return NextResponse.json({ fortune, source: "ai" });
          }
        }
      } catch (e) {
        console.log("AI error, using local fallback");
      }
    }

    // 2. Если ИИ недоступен или выключен — берем из локального списка
    const randomIndex = Math.floor(Math.random() * localFortunes.length);
    return NextResponse.json({
      fortune: localFortunes[randomIndex],
      source: "local",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Не удалось получить гадание" },
      { status: 500 },
    );
  }
}
