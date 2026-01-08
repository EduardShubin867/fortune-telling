import { NextResponse } from "next/server";

// Traditional Kolyadki (Christmas/New Year) fortunes
const localFortunes = [
  "В новом году тебя ждёт удача в делах сердечных. Любовь постучится в твою дверь неожиданно.",
  "Звёзды сулят тебе богатство и процветание. Деньги придут из неожиданного источника.",
  "Путешествие ждёт тебя в ближайшие месяцы. Новые места принесут новые возможности.",
  "Старый друг вернётся в твою жизнь и принесёт радостные вести.",
  "Твоя мечта сбудется к весне. Главное - не переставай верить.",
  "Ангел-хранитель будет особенно близко к тебе в этом году. Прислушивайся к знакам.",
  "Новые знакомства принесут важные изменения в твоей жизни. Будь открыт к людям.",
  "Здоровье будет крепким, если будешь беречь себя. Уделяй время отдыху.",
  "Творческий порыв охватит тебя. Начни то, о чём давно мечтал.",
  "Семья принесёт тебе радость и поддержку в трудные времена.",
  "Неожиданная удача улыбнётся тебе. Будь готов её принять.",
  "Мудрость придёт через испытания. Не бойся перемен.",
  "Долгожданное известие придёт с севера. Оно изменит твою жизнь к лучшему.",
  "Твой труд будет вознаграждён. Успех приходит к терпеливым.",
  "Новый год принесёт гармонию в твою душу. Прости старые обиды.",
];

// External AI server URL (configure via environment variable)
const AI_SERVER_URL = process.env.AI_SERVER_URL;

export async function POST() {
  try {
    // If AI server is configured, try to get fortune from it
    if (AI_SERVER_URL) {
      try {
        const response = await fetch(AI_SERVER_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: "Создай уникальное колядочное гадание на русском языке в традиционном славянском стиле. Гадание должно быть позитивным, таинственным и коротким (1-2 предложения).",
          }),
          // 10 second timeout
          signal: AbortSignal.timeout(10000),
        });

        if (response.ok) {
          const data = await response.json();
          // Assuming the AI server returns { fortune: "..." } or { text: "..." } or { response: "..." }
          const fortune = data.fortune || data.text || data.response || data.message;
          if (fortune) {
            return NextResponse.json({ fortune, source: "ai" });
          }
        }
      } catch (aiError) {
        console.log("AI server unavailable, falling back to local fortunes:", aiError);
      }
    }

    // Fallback to local fortunes
    const randomIndex = Math.floor(Math.random() * localFortunes.length);
    const fortune = localFortunes[randomIndex];

    return NextResponse.json({ fortune, source: "local" });
  } catch (error) {
    console.error("Fortune API error:", error);
    return NextResponse.json(
      { error: "Не удалось получить гадание" },
      { status: 500 }
    );
  }
}
