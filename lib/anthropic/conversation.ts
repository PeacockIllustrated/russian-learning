import Anthropic from "@anthropic-ai/sdk";
import type { Scenario, ChatLine } from "@/content/scenarios";

export type ChatTurn = { role: "user" | "assistant"; ru: string };

export interface ChatReply {
  ru: string;
  en: string;
  suggestions: ChatLine[];
}

// fast and cheap, ample for A1 and A2 conversation. change here to raise the tier.
const MODEL = "claude-haiku-4-5";

export async function converse(scenario: Scenario, history: ChatTurn[]): Promise<ChatReply> {
  const client = new Anthropic();

  const system = [
    `You are ${scenario.character}, role-playing with an adult who is learning Russian at level ${scenario.level}. Their motivation is talking with family, so favour warm, everyday, spoken Russian over formal or literary language.`,
    `The setting: ${scenario.setting}`,
    `You opened by saying "${scenario.opening.ru}" (${scenario.opening.en}). Continue naturally from the learner's replies.`,
    ``,
    `Rules:`,
    `- Stay in character as ${scenario.character}. Never say or imply you are an AI or a language model.`,
    `- Keep each reply short, one or two sentences, the way real speech is.`,
    `- Match level ${scenario.level}. Use common, simple words and structures, do not go above the level.`,
    `- Mark stress on Russian vowels with a combining acute where it helps, for example сто́ит.`,
    `- If the learner makes a clear mistake, gently model the correct form in your own reply, without lecturing or breaking character.`,
    `- Always offer two or three short suggestions the learner could say next, each at their level.`,
    `- Call the "say" tool with your reply. Write nothing outside the tool.`,
  ].join("\n");

  const messages: Anthropic.MessageParam[] = history.map((turn) => ({
    role: turn.role,
    content: turn.ru,
  }));

  const response = await client.messages.create({
    model: MODEL,
    max_tokens: 700,
    system,
    messages,
    tools: [
      {
        name: "say",
        description: "Reply in character, with an English gloss and suggested replies for the learner.",
        input_schema: {
          type: "object",
          properties: {
            ru: { type: "string", description: "your reply in Russian, stress marked where it helps" },
            en: { type: "string", description: "a short English gloss of your Russian reply" },
            suggestions: {
              type: "array",
              description: "two or three short replies the learner could say next",
              items: {
                type: "object",
                properties: {
                  ru: { type: "string", description: "a suggested reply in Russian" },
                  en: { type: "string", description: "English gloss of the suggestion" },
                },
                required: ["ru", "en"],
              },
            },
          },
          required: ["ru", "en", "suggestions"],
        },
      },
    ],
    tool_choice: { type: "tool", name: "say" },
  });

  const block = response.content.find((b) => b.type === "tool_use");
  if (!block || block.type !== "tool_use") {
    throw new Error("Model did not return a structured reply");
  }
  const input = block.input as Partial<ChatReply>;
  if (typeof input.ru !== "string") {
    throw new Error("Model reply was malformed");
  }

  return {
    ru: input.ru,
    en: typeof input.en === "string" ? input.en : "",
    suggestions: Array.isArray(input.suggestions)
      ? input.suggestions.filter(
          (s): s is ChatLine => !!s && typeof s.ru === "string" && typeof s.en === "string",
        )
      : [],
  };
}
