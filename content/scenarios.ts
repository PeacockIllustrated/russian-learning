export interface ChatLine {
  ru: string;
  en: string;
}

export interface Scenario {
  id: string;
  title: string;
  character: string; // who you are talking to, in Russian
  setting: string; // one line of scene-setting, in English
  level: "A1" | "A2";
  opening: ChatLine; // the character speaks first
  suggestions: ChatLine[]; // starter replies for the learner
}

// role-play scenes, tied to the curriculum domains
export const scenarios: Scenario[] = [
  {
    id: "cafe",
    title: "At the café",
    character: "Бариста",
    setting: "You step up to the counter of a small coffee shop to order.",
    level: "A1",
    opening: { ru: "Здра́вствуйте, что жела́ете?", en: "Hello, what would you like?" },
    suggestions: [
      { ru: "Оди́н ко́фе, пожа́луйста", en: "One coffee, please" },
      { ru: "Чай с молоко́м", en: "Tea with milk" },
      { ru: "Ско́лько сто́ит?", en: "How much is it?" },
    ],
  },
  {
    id: "market",
    title: "At the market",
    character: "Продаве́ц",
    setting: "You are at a market stall buying some fruit.",
    level: "A1",
    opening: { ru: "До́брый день! Что вам дать?", en: "Good afternoon. What can I get you?" },
    suggestions: [
      { ru: "Килогра́мм я́блок", en: "A kilo of apples" },
      { ru: "Ско́лько э́то сто́ит?", en: "How much is this?" },
      { ru: "У вас есть вода́?", en: "Do you have water?" },
    ],
  },
  {
    id: "meeting",
    title: "Meeting someone",
    character: "Анна",
    setting: "A friend has just introduced you to Anna.",
    level: "A1",
    opening: { ru: "Приве́т! Меня́ зову́т А́нна. А вас?", en: "Hi! My name is Anna. And you?" },
    suggestions: [
      { ru: "Меня́ зову́т Том", en: "My name is Tom" },
      { ru: "О́чень прия́тно", en: "Nice to meet you" },
      { ru: "Как дела́?", en: "How are you?" },
    ],
  },
  {
    id: "family",
    title: "With family",
    character: "Ба́бушка",
    setting: "Your Russian grandmother greets you warmly at home.",
    level: "A2",
    opening: { ru: "Здра́вствуй, дорого́й! Как ты?", en: "Hello, dear! How are you?" },
    suggestions: [
      { ru: "Хорошо́, спаси́бо", en: "Good, thank you" },
      { ru: "Рад тебя́ ви́деть", en: "Glad to see you" },
      { ru: "А как ты, ба́бушка?", en: "And how are you, grandma?" },
    ],
  },
];

export function getScenario(id: string): Scenario | undefined {
  return scenarios.find((s) => s.id === id);
}
