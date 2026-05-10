import { useState, useRef, useEffect } from "react";

const AVATAR_SRC = "data:image/png;base64,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";

const SUGGESTIONS = [
  "余白って何ですか？",
  "キャリアの作り方を教えてください",
  "渋谷の文化について話してください",
  "Red Bull時代の話を聞かせてください",
];

function detectMood(text) {
  if (!text) return "idle";
  if ((text.includes("！") || text.includes("!")) &&
    (text.includes("いい") || text.includes("面白") || text.includes("すごい"))) return "happy";
  if (text.includes("？") || text.includes("かな") || text.includes("どうでしょう")) return "thinking";
  return "talking";
}

function ShinkoAvatar({ mood, loading }) {
  const colors = { idle:"#4CAF50", happy:"#FF9800", thinking:"#2196F3", talking:"#4CAF50" };
  const c = colors[mood] || "#4CAF50";
  return (
    <div style={{ position:"relative", width:"130px", height:"130px" }}>
      <div style={{ width:"130px", height:"130px", borderRadius:"50%", border:`3px solid ${c}`, overflow:"hidden", transition:"border-color 0.4s" }}>
        <img src={AVATAR_SRC} alt="長田新子" style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center top" }} />
      </div>
      {loading && (
        <div style={{ position:"absolute", bottom:"2px", left:"50%", transform:"translateX(-50%)", display:"flex", gap:"4px", background:"rgba(255,255,255,0.9)", borderRadius:"10px", padding:"3px 7px" }}>
          {[0,1,2].map(i => <div key={i} style={{ width:"6px", height:"6px", borderRadius:"50%", background:"#4CAF50", animation:`shinko-bounce 0.7s ${i*0.15}s infinite` }} />)}
        </div>
      )}
      {!loading && <div style={{ position:"absolute", bottom:"6px", right:"6px", width:"14px", height:"14px", borderRadius:"50%", background:"#4CAF50", border:"2px solid white" }} />}
    </div>
  );
}

function Bubble({ role, text }) {
  const isUser = role === "user";
  return (
    <div style={{ display:"flex", justifyContent:isUser?"flex-end":"flex-start", marginBottom:"10px" }}>
      <div style={{ maxWidth:"82%", padding:"10px 14px", borderRadius:isUser?"18px 18px 4px 18px":"4px 18px 18px 18px", background:isUser?"#DCF8C6":"#F2F3F4", fontSize:"13.5px", lineHeight:"1.7", color:"#1A1A1A", whiteSpace:"pre-wrap", wordBreak:"break-word" }}>
        {text}
      </div>
    </div>
  );
}

function TypingBubble() {
  return (
    <div style={{ display:"flex", marginBottom:"10px" }}>
      <div style={{ padding:"12px 16px", borderRadius:"4px 18px 18px 18px", background:"#F2F3F4", display:"flex", gap:"5px", alignItems:"center" }}>
        {[0,1,2].map(i => <div key={i} style={{ width:"7px", height:"7px", borderRadius:"50%", background:"#4CAF50", opacity:0.7, animation:`shinko-bounce 0.7s ${i*0.15}s infinite` }} />)}
      </div>
    </div>
  );
}

export default function ShinkoChat() {
  const [messages, setMessages] = useState([
    { role:"assistant", content:"こんにちは！長田新子です。\n渋谷のまちづくり、マーケティング、キャリアのこと、何でも話しかけてください。" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [mood, setMood] = useState("idle");
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior:"smooth" }); }, [messages, loading]);

  const send = async (text) => {
    const msg = (text || input).trim();
    if (!msg || loading) return;
    setInput("");
    setLoading(true);
    setMood("thinking");
    const next = [...messages, { role:"user", content:msg }];
    setMessages(next);
    try {
      const res = await fetch("/api/chat", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({ messages: next.map(m => ({ role:m.role, content:m.content })) }),
      });
      if (!res.ok) throw new Error(await res.text());
      const { text: reply } = await res.json();
      setMessages([...next, { role:"assistant", content:reply }]);
      setMood(detectMood(reply));
      setTimeout(() => setMood("idle"), 3000);
    } catch(e) {
      setMessages([...next, { role:"assistant", content:"ちょっと通信が不安定みたいです。もう一度試してみてください！" }]);
      setMood("idle");
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  return (
    <>
      <style>{`
        @keyframes shinko-bounce {0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}
        @keyframes shinko-fadein {from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
        .shinko-msg{animation:shinko-fadein 0.2s ease-out}
        .shinko-suggest{display:block;width:100%;margin:3px 0;padding:6px 10px;font-size:11.5px;background:rgba(255,255,255,0.65);border:0.5px solid rgba(76,175,80,0.4);border-radius:10px;cursor:pointer;color:#2E7D32;text-align:left;font-family:inherit}
        .shinko-suggest:hover{background:rgba(255,255,255,0.95)}
        .shinko-send{padding:0 18px;border-radius:20px;background:#4CAF50;color:white;border:none;font-size:13px;cursor:pointer;height:36px;flex-shrink:0;font-family:inherit}
        .shinko-send:disabled{opacity:0.45;cursor:default}
      `}</style>
      <div style={{ display:"flex", height:"100vh", fontFamily:"Helvetica Neue, Arial, sans-serif" }}>
        <div style={{ width:"196px", flexShrink:0, background:"linear-gradient(170deg,#E8F5E9 0%,#C8E6C9 100%)", display:"flex", flexDirection:"column", alignItems:"center", padding:"24px 12px 16px", gap:"10px" }}>
          <ShinkoAvatar mood={mood} loading={loading} />
          <div style={{ textAlign:"center" }}>
            <p style={{ margin:0, fontWeight:600, fontSize:"14px", color:"#1B5E20" }}>長田 新子</p>
            <p style={{ margin:"3px 0 0", fontSize:"11px", color:"#43A047" }}>渋谷未来デザイン</p>
          </div>
          <div style={{ width:"100%", marginTop:"8px" }}>
            <p style={{ fontSize:"10.5px", color:"#66BB6A", margin:"0 0 5px", fontWeight:600 }}>よく聞かれること</p>
            {SUGGESTIONS.map(q => <button key={q} className="shinko-suggest" onClick={()=>send(q)}>{q}</button>)}
          </div>
        </div>
        <div style={{ flex:1, display:"flex", flexDirection:"column", background:"white", minWidth:0 }}>
          <div style={{ padding:"10px 16px", borderBottom:"0.5px solid #eee", display:"flex", alignItems:"center", gap:"7px" }}>
            <div style={{ width:"8px", height:"8px", borderRadius:"50%", background:"#4CAF50" }} />
            <span style={{ fontSize:"13px", color:"#666" }}>長田新子に聞く</span>
          </div>
          <div style={{ flex:1, overflowY:"auto", padding:"16px" }}>
            {messages.map((m,i) => <div key={i} className="shinko-msg"><Bubble role={m.role} text={m.content} /></div>)}
            {loading && <TypingBubble />}
            <div ref={bottomRef} />
          </div>
          <div style={{ padding:"10px 14px", borderTop:"0.5px solid #eee", display:"flex", gap:"8px", alignItems:"center" }}>
            <input ref={inputRef} value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();send()}}} placeholder="メッセージを入力..." style={{ flex:1, fontSize:"13.5px", padding:"8px 14px", borderRadius:"20px", border:"0.5px solid #ddd", background:"#F9F9F9", outline:"none", fontFamily:"inherit" }} />
            <button className="shinko-send" onClick={()=>send()} disabled={loading||!input.trim()}>送信</button>
          </div>
        </div>
      </div>
    </>
  );
}
