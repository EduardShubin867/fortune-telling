const AI_SERVER_URL = import.meta.env.VITE_AI_SERVER_URL;

// Конкретные образы и ситуации вместо абстрактных тем
const THEMES = [
  "человек стоит на распутье трёх дорог ночью",
  "старые раны, которые пора отпустить",
  "кто-то из прошлого скоро напомнит о себе",
  "страх, который мешает сделать шаг",
  "тайный враг, который на самом деле — союзник",
  "зерно, посаженное давно, готово прорасти",
  "голос интуиции, который игнорируют",
  "холод снаружи, огонь внутри",
  "мост между старым и новым",
  "сила, спящая под пеплом",
  "чужая тропа, по которой идёшь не туда",
  "дар, который кажется проклятием"
];

// Образы для использования в предсказаниях
const SYMBOLS = ["волк", "ворон", "река", "корни", "луна", "огонь", "лёд", "туман", "дуб", "змея", "медведь", "звёзды"];

export async function getFortune(): Promise<{ fortune: string; source: string }> {
  if (!AI_SERVER_URL) {
    throw new Error("Конфигурация AI сервера отсутствует (VITE_AI_SERVER_URL не задан)");
  }

  const randomTheme = THEMES[Math.floor(Math.random() * THEMES.length)];
  const randomSymbol = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];

  const systemPrompt = `Ты — древний славянский оракул. Дай ОДНО предсказание.

Тема: "${randomTheme}"
Обязательный образ: ${randomSymbol}

ПРИМЕРЫ ХОРОШИХ ПРЕДСКАЗАНИЙ:
- "Корни, что ты питал в тишине, скоро пробьются сквозь мёрзлую землю."
- "Волк, что шёл за тобой во тьме — твой собственный страх. Оглянись — он отстал."
- "Река несёт тебя к водопаду, но за ним — тихая заводь."
- "Ворон кружит над перекрёстком — он видит дорогу, что ты ещё не заметил."
- "Под пеплом старого костра тлеет уголь. Дунь — и пламя вернётся."

ПЛОХИЕ ПРИМЕРЫ (НЕ пиши так):
- "Тебя ждёт успех и счастье" — банально
- "Звёзды благосклонны к тебе" — пусто
- "Скоро всё изменится к лучшему" — общие слова
- "Верь в себя и всё получится" — мотивационный мусор

ПРАВИЛА:
- Формат: [образ] + [действие/состояние] + [намёк на исход]
- Строго 1-2 предложения, до 25 слов
- Без приветствий, сразу суть
- Запрещены слова: успех, счастье, удача, благополучие, процветание

Пиши предсказание:`;

  try {
    const response = await fetch(`${AI_SERVER_URL}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-lite",
        messages: [
          {
            role: "user",
            content: systemPrompt,
          },
        ],
        temperature: 0.75,
        max_tokens: 100,
        presence_penalty: 0.3,
        frequency_penalty: 0.2,
      }),
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Ошибка сервера: ${response.status}`);
    }

    const data = await response.json();
    const rawFortune = data.choices?.[0]?.message?.content;
    const fortune = rawFortune
      ? rawFortune.replace(/^["']|["']$/g, "").trim()
      : null;

    if (!fortune) {
      throw new Error("Сервер вернул пустой ответ");
    }

    return { fortune, source: "ai" };
  } catch (e) {
    if (e instanceof Error && e.name === "TimeoutError") {
      throw new Error("Духи молчат... Попробуйте коснуться карты снова.");
    }
    throw e;
  }
}