import Head from "next/head";
import ShinkoChat from "../components/ShinkoChat";

export default function Home() {
  return (
    <>
      <Head>
        <title>長田新子 AI チャット</title>
        <meta name="description" content="渋谷未来デザイン 長田新子のAIチャット" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main style={{ margin: 0, padding: 0 }}>
        <ShinkoChat />
      </main>
    </>
  );
}
