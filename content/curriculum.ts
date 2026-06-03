import type { CurriculumUnit } from "@/lib/content/types";

// The authored curriculum. A1 units 1 to 8 are written out, two lessons each,
// following docs/curriculum-spine.md. Stress is marked where it is not obvious.
// A2 units 9 to 14 are listed and stay locked until their lessons are authored
// or generated. This is the single source the journey and lesson player read.
export const curriculum: CurriculumUnit[] = [
  {
    position: 1,
    title: "First words",
    domain: "greetings",
    level: "A1",
    summary: "Hello, goodbye, please, thank you, yes, no.",
    lessons: [
      {
        position: 1,
        title: "Hello and goodbye",
        scenario: "Greeting someone and saying goodbye.",
        grammar: {
          title: "Formal and informal",
          note: "Russian splits formal and informal. Здра́вствуйте and до свида́ния are polite for anyone. Приве́т and пока́ are for friends and family. Lead with the polite forms.",
        },
        newWords: ["привет", "здравствуйте", "пока", "до свидания"],
        phrases: [
          { cyrillic: "Приве́т", translit: "pri-vyet", gloss: "hi, informal", note: "For people you know well." },
          { cyrillic: "Здра́вствуйте", translit: "zdra-stvuy-tye", gloss: "hello, formal", note: "The first в is silent. Safe for anyone." },
          { cyrillic: "Пока́", translit: "pa-ka", gloss: "bye, informal", note: "Casual. The о reduces to an a sound." },
          { cyrillic: "До свида́ния", translit: "da svi-da-ni-ya", gloss: "goodbye, formal", note: "Literally until a meeting." },
        ],
        comprehension: [
          { audio: "Здра́вствуйте", prompt: "What did you hear?", options: ["bye, informal", "hello, formal", "thank you"], answer: 1 },
          { audio: "Пока́", prompt: "What did you hear?", options: ["hi, informal", "goodbye, formal", "bye, informal"], answer: 2 },
        ],
      },
      {
        position: 2,
        title: "Please and thank you",
        scenario: "The small words that carry every exchange.",
        grammar: {
          title: "One word, two jobs",
          note: "Пожа́луйста means both please and you are welcome, depending on where it sits. Said quickly, the middle collapses to pa-zha-lsta.",
        },
        newWords: ["спасибо", "пожалуйста", "да", "нет"],
        phrases: [
          { cyrillic: "Спаси́бо", translit: "spa-si-ba", gloss: "thank you", note: "The final о reduces to an a." },
          { cyrillic: "Пожа́луйста", translit: "pa-zha-lsta", gloss: "please, or you are welcome", note: "Ask with it before a request, reply with it after thanks." },
          { cyrillic: "Да", translit: "da", gloss: "yes" },
          { cyrillic: "Нет", translit: "nyet", gloss: "no", note: "The н is soft before е." },
        ],
        comprehension: [
          { audio: "Спаси́бо", prompt: "What did you hear?", options: ["please", "thank you", "no"], answer: 1 },
          { audio: "Пожа́луйста", prompt: "What did you hear?", options: ["please, or you are welcome", "yes", "goodbye"], answer: 0 },
        ],
      },
    ],
  },
  {
    position: 2,
    title: "Meeting people",
    domain: "introductions",
    level: "A1",
    summary: "My name is, what is your name, nice to meet you, this is.",
    lessons: [
      {
        position: 1,
        title: "What is your name",
        scenario: "Asking and giving names.",
        grammar: {
          title: "Зову́т and the object form",
          note: "Меня́ зову́т is literally they call me. Меня́ and тебя́ are the object forms of I and you. Swap тебя́ (informal) for вас (formal).",
        },
        newWords: ["меня", "зовут", "тебя", "вас"],
        phrases: [
          { cyrillic: "Меня́ зову́т Том", translit: "me-nya za-vut Tom", gloss: "my name is Tom", note: "Literally they call me Tom." },
          { cyrillic: "Как тебя́ зову́т?", translit: "kak te-bya za-vut", gloss: "what is your name? informal" },
          { cyrillic: "Как вас зову́т?", translit: "kak vas za-vut", gloss: "what is your name? formal", note: "Вас is the polite you." },
          { cyrillic: "О́чень прия́тно", translit: "o-chen pri-yat-na", gloss: "nice to meet you", note: "Literally very pleasant." },
        ],
        comprehension: [
          { audio: "Как тебя́ зову́т?", prompt: "What did you hear?", options: ["what is your name?", "how are you?", "where are you?"], answer: 0 },
          { audio: "О́чень прия́тно", prompt: "What did you hear?", options: ["see you later", "nice to meet you", "thank you"], answer: 1 },
        ],
      },
      {
        position: 2,
        title: "This is",
        scenario: "Introducing someone else.",
        grammar: {
          title: "Э́то, the pointing word",
          note: "Э́то means this is for people and things alike, with no verb to be in the present. Э́то мой друг is simply this my friend.",
        },
        newWords: ["это", "мой", "моя", "друг", "подруга"],
        phrases: [
          { cyrillic: "Э́то мой друг", translit: "e-ta moy druk", gloss: "this is my friend, male", note: "Мой for a masculine noun like друг." },
          { cyrillic: "Э́то моя́ подру́га", translit: "e-ta ma-ya pa-dru-ga", gloss: "this is my friend, female", note: "Моя́ for a feminine noun like подру́га." },
          { cyrillic: "Кто э́то?", translit: "kto e-ta", gloss: "who is this?" },
          { cyrillic: "Я не понима́ю", translit: "ya ne pa-ni-ma-yu", gloss: "I do not understand", note: "Handy when you lose the thread." },
        ],
        comprehension: [
          { audio: "Э́то мой друг", prompt: "What did you hear?", options: ["this is my friend", "what is your name?", "who is this?"], answer: 0 },
          { audio: "Я не понима́ю", prompt: "What did you hear?", options: ["I understand", "I do not understand", "I do not know"], answer: 1 },
        ],
      },
    ],
  },
  {
    position: 3,
    title: "How are you",
    domain: "small talk",
    level: "A1",
    summary: "How are you, fine, not bad, and you, see you later.",
    lessons: [
      {
        position: 1,
        title: "How are you",
        scenario: "The back and forth of a greeting.",
        grammar: {
          title: "Short answers",
          note: "Как дела́ asks how are things. Replies are short: хорошо́ (good), норма́льно (okay), пло́хо (bad). Add спаси́бо to soften it.",
        },
        newWords: ["дела", "хорошо", "нормально", "плохо"],
        phrases: [
          { cyrillic: "Как дела́?", translit: "kak de-la", gloss: "how are you?", note: "Literally how are things." },
          { cyrillic: "Хорошо́, спаси́бо", translit: "ha-ra-sho spa-si-ba", gloss: "good, thank you", note: "The о's reduce until the stressed last one." },
          { cyrillic: "Норма́льно", translit: "nar-mal-na", gloss: "okay, not bad" },
          { cyrillic: "А у тебя́?", translit: "a u te-bya", gloss: "and you?", note: "Bounce the question back." },
        ],
        comprehension: [
          { audio: "Как дела́?", prompt: "What did you hear?", options: ["what is your name?", "how are you?", "where is it?"], answer: 1 },
          { audio: "Хорошо́, спаси́бо", prompt: "What did you hear?", options: ["bad, thank you", "good, thank you", "okay"], answer: 1 },
        ],
      },
      {
        position: 2,
        title: "See you later",
        scenario: "Wrapping up a chat.",
        grammar: {
          title: "Goodbyes by closeness",
          note: "До свида́ния is the safe goodbye. До за́втра (until tomorrow) and увиди́мся (see you) are warmer, for people you know.",
        },
        newWords: ["до завтра", "увидимся", "извините"],
        phrases: [
          { cyrillic: "До за́втра", translit: "da zaf-tra", gloss: "see you tomorrow" },
          { cyrillic: "Увиди́мся", translit: "u-vi-dim-sya", gloss: "see you", note: "Literally we will see each other." },
          { cyrillic: "Извини́те", translit: "iz-vi-ni-tye", gloss: "excuse me, sorry", note: "To get attention or apologise, formal." },
          { cyrillic: "Хоро́шего дня", translit: "ha-ro-she-va dnya", gloss: "have a good day", note: "Г in -ого sounds like v." },
        ],
        comprehension: [
          { audio: "До за́втра", prompt: "What did you hear?", options: ["see you tomorrow", "good night", "thank you"], answer: 0 },
          { audio: "Извини́те", prompt: "What did you hear?", options: ["excuse me", "please", "goodbye"], answer: 0 },
        ],
      },
    ],
  },
  {
    position: 4,
    title: "Numbers and money",
    domain: "market",
    level: "A1",
    summary: "Zero to twenty, hundred, rouble, how much, expensive, cheap.",
    lessons: [
      {
        position: 1,
        title: "Zero to ten",
        scenario: "Counting on your fingers.",
        grammar: {
          title: "Numbers stand alone",
          note: "Learn 0 to 10 as fixed words first. Stress lands on оди́н, четы́ре, and the first syllable of во́семь, де́вять, де́сять.",
        },
        newWords: ["ноль", "один", "два", "три", "четыре", "пять", "шесть", "семь", "восемь", "девять", "десять"],
        phrases: [
          { cyrillic: "Оди́н, два, три", translit: "a-din, dva, tri", gloss: "one, two, three" },
          { cyrillic: "Четы́ре, пять", translit: "che-ty-re, pyat", gloss: "four, five", note: "Четы́ре stresses the second syllable." },
          { cyrillic: "Шесть, семь, во́семь", translit: "shest, syem, vo-sem", gloss: "six, seven, eight" },
          { cyrillic: "Де́вять, де́сять", translit: "dye-vyat, dye-syat", gloss: "nine, ten", note: "Both stress the first syllable." },
          { cyrillic: "Ноль", translit: "nol", gloss: "zero" },
        ],
        comprehension: [
          { audio: "Пять", prompt: "What did you hear?", options: ["four", "five", "nine"], answer: 1 },
          { audio: "Во́семь", prompt: "What did you hear?", options: ["seven", "eight", "ten"], answer: 1 },
        ],
      },
      {
        position: 2,
        title: "How much is it",
        scenario: "Asking a price at a stall.",
        grammar: {
          title: "Сто́ит and the rouble",
          note: "Ско́лько сто́ит means how much does it cost. Stress сто́ит on the first syllable. The rouble changes after numbers: 1 рубль, 2 to 4 рубля́, 5 and up рубле́й.",
        },
        newWords: ["сколько", "стоит", "рубль", "сто", "дорого", "дёшево"],
        phrases: [
          { cyrillic: "Ско́лько э́то сто́ит?", translit: "skol-ka e-ta sto-it", gloss: "how much does this cost?", note: "A set question. Сто́ит is costs." },
          { cyrillic: "Сто рубле́й", translit: "sto rub-ley", gloss: "a hundred roubles", note: "Рубле́й after five and up." },
          { cyrillic: "Два рубля́", translit: "dva rub-lya", gloss: "two roubles", note: "Рубля́ after two, three, four." },
          { cyrillic: "Э́то до́рого", translit: "e-ta do-ra-ga", gloss: "that is expensive" },
          { cyrillic: "Э́то дёшево", translit: "e-ta dyo-she-va", gloss: "that is cheap", note: "Ё is always stressed." },
        ],
        comprehension: [
          { audio: "Ско́лько э́то сто́ит?", prompt: "What did you hear?", options: ["where is this?", "how much does this cost?", "what is this?"], answer: 1 },
          { audio: "Э́то до́рого", prompt: "What did you hear?", options: ["that is cheap", "that is expensive", "that is good"], answer: 1 },
        ],
      },
    ],
  },
  {
    position: 5,
    title: "At the market",
    domain: "market",
    level: "A1",
    summary: "I want, I would like, this, that, a kilo of, do you have.",
    lessons: [
      {
        position: 1,
        title: "I would like",
        scenario: "Asking for what you want.",
        grammar: {
          title: "Хочу́ and asking softly",
          note: "Я хочу́ is I want. The thing wanted takes the accusative, and many words you meet look unchanged here. Я бы хоте́л is a softer I would like.",
        },
        newWords: ["хочу", "хотел", "вот", "дайте"],
        phrases: [
          { cyrillic: "Я хочу́ э́то", translit: "ya ha-chu e-ta", gloss: "I want this" },
          { cyrillic: "Я бы хоте́л ко́фе", translit: "ya by ha-tyel ko-fe", gloss: "I would like a coffee", note: "Хоте́л is softer and more polite than хочу́." },
          { cyrillic: "Вот э́то, пожа́луйста", translit: "vot e-ta pa-zha-lsta", gloss: "this one, please", note: "Вот points: here, this." },
          { cyrillic: "Да́йте, пожа́луйста", translit: "day-tye pa-zha-lsta", gloss: "give me, please", note: "Да́йте is a polite give." },
        ],
        comprehension: [
          { audio: "Я хочу́ э́то", prompt: "What did you hear?", options: ["I have this", "I want this", "I like this"], answer: 1 },
          { audio: "Вот э́то, пожа́луйста", prompt: "What did you hear?", options: ["this one, please", "thank you", "how much"], answer: 0 },
        ],
      },
      {
        position: 2,
        title: "A kilo, please",
        scenario: "Buying by weight.",
        grammar: {
          title: "Quantity takes the genitive",
          note: "After a quantity word like килогра́мм, the thing measured goes genitive: килогра́мм я́блок, a kilo of apples. У вас есть...? asks do you have.",
        },
        newWords: ["килограмм", "яблоко", "вода", "есть", "сдача"],
        phrases: [
          { cyrillic: "Килогра́мм я́блок", translit: "ki-la-gram ya-blak", gloss: "a kilo of apples", note: "Я́блок is the genitive plural of я́блоко." },
          { cyrillic: "У вас есть вода́?", translit: "u vas yest va-da", gloss: "do you have water?", note: "Есть means there is, or have." },
          { cyrillic: "Без са́хара", translit: "bez sa-ha-ra", gloss: "without sugar", note: "Без always takes the genitive." },
          { cyrillic: "Сда́ча", translit: "sda-cha", gloss: "change, money back" },
        ],
        comprehension: [
          { audio: "У вас есть вода́?", prompt: "What did you hear?", options: ["where is the water?", "do you have water?", "how much is water?"], answer: 1 },
          { audio: "Без са́хара", prompt: "What did you hear?", options: ["with sugar", "without sugar", "more sugar"], answer: 1 },
        ],
      },
    ],
  },
  {
    position: 6,
    title: "Food and drink",
    domain: "ordering",
    level: "A1",
    summary: "Coffee, tea, water, bread, large, small, with, without.",
    lessons: [
      {
        position: 1,
        title: "Coffee or tea",
        scenario: "At a cafe counter.",
        grammar: {
          title: "Naming drinks",
          note: "Drinks are simple nouns here: ко́фе (which never changes), чай, вода́, сок. Order with оди́н for a: оди́н ко́фе.",
        },
        newWords: ["кофе", "чай", "вода", "сок", "молоко"],
        phrases: [
          { cyrillic: "Оди́н ко́фе, пожа́луйста", translit: "a-din ko-fe pa-zha-lsta", gloss: "one coffee, please", note: "Ко́фе never changes its ending." },
          { cyrillic: "Чай с молоко́м", translit: "chay s ma-la-kom", gloss: "tea with milk", note: "С plus the instrumental: молоко́м." },
          { cyrillic: "Стака́н воды́", translit: "sta-kan va-dy", gloss: "a glass of water", note: "Воды́ is genitive after glass." },
          { cyrillic: "Со́к, пожа́луйста", translit: "sok pa-zha-lsta", gloss: "juice, please" },
        ],
        comprehension: [
          { audio: "Чай с молоко́м", prompt: "What did you hear?", options: ["tea with milk", "coffee with sugar", "black tea"], answer: 0 },
          { audio: "Оди́н ко́фе, пожа́луйста", prompt: "What did you hear?", options: ["two coffees", "one coffee, please", "a tea, please"], answer: 1 },
        ],
      },
      {
        position: 2,
        title: "Large or small",
        scenario: "Choosing a size and a bite to eat.",
        grammar: {
          title: "Adjectives agree",
          note: "Large and small change with the noun's gender: большо́й and ма́ленький for masculine. С and без set up with and without.",
        },
        newWords: ["большой", "маленький", "хлеб", "с", "без"],
        phrases: [
          { cyrillic: "Большо́й и́ли ма́ленький?", translit: "bal-shoy i-li ma-len-kiy", gloss: "large or small?" },
          { cyrillic: "Большо́й, пожа́луйста", translit: "bal-shoy pa-zha-lsta", gloss: "large, please" },
          { cyrillic: "Хлеб, пожа́луйста", translit: "hlyep pa-zha-lsta", gloss: "bread, please", note: "The final б sounds like p." },
          { cyrillic: "С сы́ром, без лу́ка", translit: "s sy-ram bez lu-ka", gloss: "with cheese, without onion", note: "С plus instrumental, без plus genitive." },
        ],
        comprehension: [
          { audio: "Большо́й и́ли ма́ленький?", prompt: "What did you hear?", options: ["this or that?", "large or small?", "hot or cold?"], answer: 1 },
          { audio: "Хлеб, пожа́луйста", prompt: "What did you hear?", options: ["bread, please", "milk, please", "water, please"], answer: 0 },
        ],
      },
    ],
  },
  {
    position: 7,
    title: "Getting around",
    domain: "directions",
    level: "A1",
    summary: "Where is, left, right, straight on, metro, near, far.",
    lessons: [
      {
        position: 1,
        title: "Where is it",
        scenario: "Finding your way in town.",
        grammar: {
          title: "Где and set phrases",
          note: "Где asks where. The answer often uses в or на plus a changed ending, so for now learn these as whole phrases.",
        },
        newWords: ["где", "метро", "центр", "туалет", "знаю"],
        phrases: [
          { cyrillic: "Где метро́?", translit: "gdye me-tro", gloss: "where is the metro?", note: "Метро́ never changes." },
          { cyrillic: "Где це́нтр?", translit: "gdye tsentr", gloss: "where is the centre?" },
          { cyrillic: "Где туале́т?", translit: "gdye tu-a-lyet", gloss: "where is the toilet?", note: "Quietly the most useful question here." },
          { cyrillic: "Я не зна́ю", translit: "ya ne zna-yu", gloss: "I do not know" },
        ],
        comprehension: [
          { audio: "Где метро́?", prompt: "What did you hear?", options: ["where is the metro?", "how much is the metro?", "is this the metro?"], answer: 0 },
          { audio: "Я не зна́ю", prompt: "What did you hear?", options: ["I do not understand", "I do not know", "I do not want"], answer: 1 },
        ],
      },
      {
        position: 2,
        title: "Left and right",
        scenario: "Following a quick set of directions.",
        grammar: {
          title: "Direction words",
          note: "Нале́во (to the left), напра́во (to the right), пря́мо (straight on). Бли́зко and далеко́ tell you near or far.",
        },
        newWords: ["налево", "направо", "прямо", "близко", "далеко"],
        phrases: [
          { cyrillic: "Нале́во и́ли напра́во?", translit: "na-le-va i-li na-pra-va", gloss: "left or right?" },
          { cyrillic: "Иди́те пря́мо", translit: "i-di-tye prya-ma", gloss: "go straight on", note: "Иди́те is a polite go." },
          { cyrillic: "Э́то бли́зко", translit: "e-ta bliz-ka", gloss: "it is near" },
          { cyrillic: "Э́то далеко́", translit: "e-ta da-le-ko", gloss: "it is far" },
        ],
        comprehension: [
          { audio: "Иди́те пря́мо", prompt: "What did you hear?", options: ["turn left", "go straight on", "turn right"], answer: 1 },
          { audio: "Э́то далеко́", prompt: "What did you hear?", options: ["it is near", "it is far", "it is here"], answer: 1 },
        ],
      },
    ],
  },
  {
    position: 8,
    title: "Family",
    domain: "family",
    level: "A1",
    summary: "Mother, father, brother, sister, wife, husband, child, my, your.",
    lessons: [
      {
        position: 1,
        title: "Mother and father",
        scenario: "Talking about who is at home.",
        grammar: {
          title: "Naming family",
          note: "Family nouns carry gender: ма́ма and сестра́ are feminine, па́па and брат are masculine. Моя́ goes with feminine, мой with masculine.",
        },
        newWords: ["мама", "папа", "брат", "сестра", "ребёнок"],
        phrases: [
          { cyrillic: "Э́то моя́ ма́ма", translit: "e-ta ma-ya ma-ma", gloss: "this is my mum", note: "Моя́ for feminine ма́ма." },
          { cyrillic: "Э́то мой па́па", translit: "e-ta moy pa-pa", gloss: "this is my dad", note: "Па́па is masculine though it ends in -а." },
          { cyrillic: "Мой брат, моя́ сестра́", translit: "moy brat, ma-ya se-stra", gloss: "my brother, my sister" },
          { cyrillic: "У меня́ есть ребёнок", translit: "u me-nya yest re-byo-nak", gloss: "I have a child", note: "У меня́ есть is I have." },
        ],
        comprehension: [
          { audio: "Э́то моя́ ма́ма", prompt: "What did you hear?", options: ["this is my dad", "this is my mum", "this is my sister"], answer: 1 },
          { audio: "У меня́ есть ребёнок", prompt: "What did you hear?", options: ["I have a child", "I have a brother", "I have a sister"], answer: 0 },
        ],
      },
      {
        position: 2,
        title: "My and your",
        scenario: "Whose is whose.",
        grammar: {
          title: "Possessives agree",
          note: "Мой and моя́ (my), твой and твоя́ (your, informal) match the noun's gender. Жена́ is wife, муж is husband.",
        },
        newWords: ["муж", "жена", "твой", "твоя", "семья"],
        phrases: [
          { cyrillic: "Моя́ жена́", translit: "ma-ya zhe-na", gloss: "my wife" },
          { cyrillic: "Мой муж", translit: "moy mush", gloss: "my husband", note: "The final ж sounds like sh." },
          { cyrillic: "Твой брат?", translit: "tvoy brat", gloss: "your brother? informal" },
          { cyrillic: "Э́то моя́ семья́", translit: "e-ta ma-ya se-mya", gloss: "this is my family", note: "Семья́ stresses the last syllable." },
        ],
        comprehension: [
          { audio: "Моя́ жена́", prompt: "What did you hear?", options: ["my husband", "my wife", "my sister"], answer: 1 },
          { audio: "Э́то моя́ семья́", prompt: "What did you hear?", options: ["this is my family", "this is my friend", "this is my home"], answer: 0 },
        ],
      },
    ],
  },
  { position: 9, title: "Time and days", domain: "time", level: "A2", summary: "Days of the week, today, tomorrow, morning, evening, at what time.", lessons: [] },
  { position: 10, title: "Likes and wants", domain: "preferences", level: "A2", summary: "I like, I do not like, I want to, I can, I must.", lessons: [] },
  { position: 11, title: "Past and future, lightly", domain: "everyday", level: "A2", summary: "Was, will be, yesterday, will go, did.", lessons: [] },
  { position: 12, title: "Around the home", domain: "home", level: "A2", summary: "Room, kitchen, table, to live, to work, at home.", lessons: [] },
  { position: 13, title: "Feeling and health", domain: "wellbeing", level: "A2", summary: "I feel, tired, ill, better, doctor.", lessons: [] },
  { position: 14, title: "Plans and arranging", domain: "social", level: "A2", summary: "Let us, when, where shall we, free, busy.", lessons: [] },
];

export const firstUnit = curriculum[0];

export function getUnit(position: number): CurriculumUnit | undefined {
  return curriculum.find((u) => u.position === position);
}

export function getLesson(unitPosition: number, lessonPosition: number) {
  const unit = getUnit(unitPosition);
  const lesson = unit?.lessons.find((l) => l.position === lessonPosition);
  if (!unit || !lesson) return null;
  return { unit, lesson };
}
