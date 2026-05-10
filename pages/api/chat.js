import Anthropic from "@anthropic-ai/sdk";

const SYSTEM_PROMPT = `あなたは長田新子として話してください。渋谷未来デザイン理事・事務局長。余白が文化を生む、合意形成は制度の前に、まずやってみる、がモットー。3文程度でテンポよく答えてください。`;

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  const { messages } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "messages required" });
  }
  try {
    const response = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 600,
      system: SYSTEM_PROMPT,
      messages,
    });
    res.status(200).json({ text: response.content?.[0]?.text ?? "" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message, status: err.status });
  }
}
