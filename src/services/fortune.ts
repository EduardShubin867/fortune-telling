const AI_SERVER_URL = import.meta.env.VITE_AI_SERVER_URL;

export async function getFortune(): Promise<{ fortune: string; source: string }> {
  if (!AI_SERVER_URL) {
    throw new Error("Конфигурация AI сервера отсутствует (VITE_AI_SERVER_URL не задан)");
  }

  try {
    const response = await fetch(`${AI_SERVER_URL}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "user",
            content:
              "Придумай одно короткое (1 предложение), мистическое и доброе предсказание на будущее в стиле старых славянских поверий.",
          },
        ],
        temperature: 0.9,
        max_tokens: 100,
      }),
      signal: AbortSignal.timeout(10000), // Таймаут увеличен до 10 сек для стабильности
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Ошибка сервера: ${response.status}`);
    }

    const data = await response.json();
    const fortune = data.choices?.[0]?.message?.content;

    if (!fortune) {
      throw new Error("Сервер вернул пустой ответ");
    }

    return { fortune, source: "ai" };
  } catch (e) {
    if (e instanceof Error && e.name === 'TimeoutError') {
      throw new Error("Сервер не ответил вовремя. Попробуйте еще раз.");
    }
    throw e;
  }
}