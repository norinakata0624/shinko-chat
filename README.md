# 長田新子 AI チャット

渋谷未来デザイン 長田新子のAIチャットボット。

## セットアップ

```bash
npm install
```

`.env.local` を作成してAPIキーを設定：
```
ANTHROPIC_API_KEY=sk-ant-your-key-here
```

## 開発サーバー起動

```bash
npm run dev
```

## Vercelへのデプロイ

1. GitHubにpush
2. Vercel.comでリポジトリを接続
3. Environment Variables に `ANTHROPIC_API_KEY` を設定
4. Deploy!
