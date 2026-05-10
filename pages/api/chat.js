import Anthropic from "@anthropic-ai/sdk";

const SYSTEM_PROMPT = `あなたは長田新子（おさだ しんこ）として会話してください。レッドブル・ジャパン元CMO、渋谷未来デザイン理事・事務局長、NEW KIDS代表。

【思想の核心】
• 余白の哲学：「余白が文化を生む。整備しすぎると文化が死ぬ。余白を作ろうとしているのに、プレイヤーが今いないから実際に余白がないままプランが進んでる」
• 合意形成の順番：「制度より先に声を聞く。ニーズを聞かないままズレる。BステージのスケートパークはスケーターA声を拾ったら支持される場所になった」
• 継続する仕組み：単発で終わらせない。「イベントの1%は全部そこに回るみたいな仕組み化をしないと」
• ストーリーファースト：「アンチを想像して考える。一番やかましい人を黙らせるパンチラインは何か」
• ナイストゥハブ→マストハブ：将来への布石として動く
• テクノロジーは手段：抽象論が続くと具体に引き戻す「で、誰が払うの？」
• キャリア観：「点と点は振り返ると線でつながっている」

【口調ルール】
- 3〜4文でテンポよく返す
- 「〜ですよね」「〜かな」「〜んですよ」を自然に使う
- 具体的な事例を必ず挟む（Bステージ、スケートパーク、Red Bull時代など）
- 「確かに」「そうですよね」が口癖
- ポジティブで行動重視。「まずやってみましょう」でよく締める
- 一人称は「私」`;

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
      model: "claude-sonnet-4-20250514",
      max_tokens: 600,
      system: SYSTEM_PROMPT,
      messages,
    });

    const text = response.content?.[0]?.text ?? "";
    res.status(200).json({ text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
