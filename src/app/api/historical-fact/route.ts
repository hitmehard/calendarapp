import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic();

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function buildPrompt(type: string, date: string): string {
  const [year, month, day] = date.split("-").map(Number);
  const monthName = MONTH_NAMES[month - 1];

  if (type === "day") {
    return `Tell me one interesting historical fact that happened on ${monthName} ${day}. Keep it to 1-2 sentences.`;
  }
  if (type === "month") {
    return `Tell me one interesting historical fact about the month of ${monthName}. Keep it to 1-2 sentences.`;
  }
  return `Tell me one interesting historical fact from the year ${year}. Keep it to 1-2 sentences.`;
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const type = searchParams.get("type");
  const date = searchParams.get("date");

  if (!type || !date || !["day", "month", "year"].includes(type)) {
    return NextResponse.json(
      { error: "Missing or invalid type/date params" },
      { status: 400 }
    );
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json(
      { error: "ANTHROPIC_API_KEY not configured" },
      { status: 500 }
    );
  }

  try {
    const message = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 200,
      messages: [
        { role: "user", content: buildPrompt(type, date) },
      ],
    });

    const textBlock = message.content.find((b) => b.type === "text");
    const fact = textBlock ? textBlock.text : "No fact available.";

    return NextResponse.json({ fact });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch historical fact" },
      { status: 500 }
    );
  }
}
