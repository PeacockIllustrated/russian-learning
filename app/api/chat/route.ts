import { NextResponse } from "next/server";
import { getScenario } from "@/content/scenarios";
import { converse, type ChatTurn } from "@/lib/anthropic/conversation";

export async function POST(request: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  let body: { scenarioId?: string; history?: ChatTurn[] };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  const scenario = body.scenarioId ? getScenario(body.scenarioId) : undefined;
  if (!scenario) {
    return NextResponse.json({ error: "unknown_scenario" }, { status: 400 });
  }

  const history = (Array.isArray(body.history) ? body.history : []).filter(
    (turn): turn is ChatTurn =>
      !!turn && (turn.role === "user" || turn.role === "assistant") && typeof turn.ru === "string",
  );
  if (history.length === 0 || history[0].role !== "user") {
    return NextResponse.json({ error: "bad_history" }, { status: 400 });
  }

  try {
    const reply = await converse(scenario, history);
    return NextResponse.json(reply);
  } catch {
    return NextResponse.json({ error: "chat_failed" }, { status: 500 });
  }
}
