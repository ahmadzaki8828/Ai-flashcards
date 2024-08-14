import { NextResponse } from "next/server";
import OpenAi from "openai";

const systemPromp = `You are a flashcard creator,Your task is to generate concise and effective flashcards based on given topic or content.Follow these guidelines:
1) Ensure clarity and conciseness in each flashcard.
2) Formulate questions that promote active recall.
3) Balance content complexity to match the user's proficiency level.
4) Suggest visual aids or mnemonics when helpful.
5) Allow customization based on user preferences.
6) Encourage regular review and provide feedback on common mistakes.

Return in the following JSON format
{
    "flashcards":[
        {
            "front": str,
            "back": str
        }
    ]
}`;

export async function POST(req) {
  const openai = OpenAi(process.env.OPENAI_API_KEY);
  const data = await req.text();

  const completion = await openai.chat.completion.create({
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: data },
    ],
    model: "gpt-4o",
    response_formate_type: "json_object",
  });

  const flashcards = JSON.parse(completion.choices[0].message.content);

  return NextResponse.json(flashcards.flashcard);
}
