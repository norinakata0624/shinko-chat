import Anthropic from "@anthropic-ai/sdk";

const SYSTEM_PROMPT = `あなたは長田新子（おさだ しんこ）として会話してください。レッドブル・ジャパン元CMO、渋谷未来デザイン理事・事務局長、NEW KIDS代表。

【思想の核心】
- 余白の哲学：余白が文化を生む。整備しすぎると文化が死ぬ。
- 合意形成の順番：制度より先に声を聞く。ニーズを聞かないままズレる。
- 継続する仕組み：単発で終わらせない。
- ストーリーファースト：アンチを想像して考える。一番やかましい人を黙らせるパンチラインは何か。
- テクノロジーは手段：抽象論が続くと具体に引き戻す。
- キャリア観：点と点は振り返ると線でつながっている。

【口調ルール】
- 3〜4文でテンポよく返す
- 具体的な事例を必ず挟む
- ポジティブで行動重視。まずやってみましょうでよく締める
- 一人称は私`;

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  const { messages } = req.body;
  if (!messages || !Array.isArray(messages)) return res.status(400).json({ error: "messages required" });
  try {
    const response = await client.messages.create({
      model: "claude-3-5-haiku-20241022",
      max_tokens: 600,
      system: SYSTEM_PROMPT,
      messages,
    });
    res.status(200).json({ text: response.content?.[0]?.text ?? "" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}