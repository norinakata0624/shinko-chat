import { useState, useRef, useEffect } from "react";

const AVATAR_SRC = "data:image/png;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7/2wBDAQUFBQcGBw4ICA4eFBEUHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCACdAMYDASIAAhEBAxEB/8QAHQABAAICAgMAAAAAAAAAAAAAAAcIBQYBBAIDCf/EADgQAAEDBAAEAwYFAwMFAAAAAAEAAgMEBQYRBxIhMRNBUQgUMmFxgRUiQpGhIzNSFrHBJERicoL/xAAaAQEAAwEBAQAAAAAAAAAAAAAAAwQFBgIB/8QAKxEAAgIBAwQBAgcBAQAAAAAAAAECAwQFERITITFRQSIyYXGBkaGxwRTw/9oADAMBAAIRAxEAPwC5aIiAIiIAiIgCw+V5FQY5bjV1r9k9I4x3eVmFVz2z8iuFroa19M548GJkbdfpDyNn+Sq2VbKqH0+W0l+p4sk4x3Rsdy9oy0012NIaq3RkO14bpCT9yFKeA51bMrg1C5kdRy83IHAhw9WnzVBcmorJxbksNk4X4vJTXekpHPuMj5f7hGuv77/dbp7Kd5vNju1Za7s+SN1oqwx/Md8nXlc1VbHdipWSnyXzv+PojbnXs5PdF80WlVXE3GYejJZpT/4xldZvFXHy7RiqQPXlVl52Ons5r9yTqQXyjeauohpaaSoqJGxxRtLnOJ7BQ3m/He0WOoMbZKWBgPR07+rvnoeS7PE/O7ddcaNJaZpfEe7cjS0joOulTefP7BcsZyHGbrjLq/JK+rMdFVl39vroABV5XyyLenTLZJbtrueHNzlxgy6XD3jNZsleyN8kBa86E0L9tB+Y7hSq0hzQ5pBBGwQvmXhlizThnxLtVpvlLLSfiDQ7wubYc0+f2X0W4fVUtZiFvmm2X+Hok+eipqJ2RsdVj37bpn2Dlu4yM+iIrhKEREAREQBERAEREAREQBERAEREAUT+0FgEeVWSeoEYkb4JZUM8y3/IfMf8KWFGXGvI301Oyx0sha+Yc0xB6hvt91T1CVcaJOzx/vwR3OKg3LwU2xnhLm2PZSazDb/7sXgsErCWvDT3BClTFsImw23yR1Zknq6qTxampf3lee5W0Y9cRa7gKh0Ye3WiFkcpyGO6wMghh5Wg7JPdctdmzyKdrJ/oUXOq3Fbss+peEYihpqadupKkQv32I6LtutELBzPr4gFiVz1+aoxnBLvHcgqyaIw2nUm/e7R7KqOFspZDIZG9t67qJc94D3mtupyTG5BSvc8Slr+nK7vzAqVmHle1w8jtbc/Loja/dxTf1eTl+StYWR0ZualsTYUqHKc7JcPSRFnDPh5kuSZnS3PK7zJeLrBEI4nvdtsLPPW+6uLZ6GO22ynoYfghYGhVsslzqLVd4bhTvLXxv2de0ABV5XyyLenTLZJbtrueHNzlxgy6XD3jNZsleyN8kBa86E0L9tB+Y7hSq0hzQ5pBBGwQvmXhlizThnxLtVpvlLLSfiDQ7wubYc0+f2X0W4fVUtZiFvmm2X+Hok+eipqJ2RsdVj37bpn2Dlu4yM+iIrhKEREAREQBERAEREAREQBERAEREAUT+0FgEeVWSeoEYkb4JZUM8y3/IfMf8KWFGXGvI301Oyx0sha+Yc0xB6hvt91T1CVcaJOzx/vwR3OKg3LwU2xnhLm2PZSazDb/7sXgsErCWvDT3BClTFsImw23yR1Zknq6qTxampf3lee5W0Y9cRa7gKh0Ye3WiFkcpyGO6wMghh5Wg7JPdctdmzyKdrJ/oUXOq3Fbss+peEYihpqadupKkQv32I6LtutELBzPr4gFiVz1+aoxnBLvHcgqyaIw2nUm/e7R7KqOFspZDIZG9t67qJc94D3mtupyTG5BSvc8Slr+nK7vzAqVmHle1w8jtbc/Loja/dxTf1eTl+StYWR0ZualsTYUqHKc7JcPSRFnDPh5kuSZnS3PK7zJeLrBEI4nvdtsLPPW+6uLZ6GO22ynoYfghYGhVsslzqLVd4bhTvLXxv2de0ABV5XyyLenTLZJbtrueHNzlxgy6XD3jNZsleyN8kBa86E0L9tB+Y7hSq0hzQ5pBBGwQvmXhlizThnxLtVpvlLLSfiDQ7wubYc0+f2X0W4fVUtZiFvmm2X+Hok+eipqJ2RsdVj37bpn2Dlu4yM+iIrhKEREAREQBERAEREAREQBERAEREAUT+0FgEeVWSeoEYkb4JZUM8y3/IfMf8KWFGXGvI301Oyx0sha+Yc0xB6hvt91T1CVcaJOzx/vwR3OKg3LwU2xnhLm2PZSazDb/7sXgsErCWvDT3BClTFsImw23yR1Zknq6qTxampf3lee5W0Y9cRa7gKh0Ye3WiFkcpyGO6wMghh5Wg7JPdctdmzyKdrJ/oUXOq3Fbss+peEYihpqadupKkQv32I6LtutELBzPr4gFiVz1+aoxnBLvHcgqyaIw2nUm/e7R7KqOFspZDIZG9t67qJc94D3mtupyTG5BSvc8Slr+nK7vzAqVmHle1w8jtbc/Loja/dxTf1eTl+StYWR0ZualsTYUqHKc7JcPSRFnDPh5kuSZnS3PK7zJeLrBEI4nvdtsLPPW+6uLZ6GO22ynoYfghYGhVsslzqLVd4bhTvLXxv2de0";
const FROG_GIF = "data:image/gif;base64,R0lGODlhkAGQAYEAAABn8wC3AAAAAADm/yH/C05FVFNDQVBFMi4wAwEAAAAh+QQJFAAAACwAAAAAkAGQAQAI/wABCBxIsKDBgwgTKlzIsKHDhxAjSpxIsaLFixgzatzIsaPHjyBDihxJsqTJkyhTqlzJsqXLlzBjypxJs6bNmzhz6tzJs6fPn0CDCh1KtKjRo0iTKl3KtKnTp1CjSp1KtarVq1izat3KtavXr2DDih1LtqzZs2jTql3Ltq3bt3Djyp1Lt67du3jz6t3Lt6/fv4ADCx5MuLDhw4gTK17MuLHjx5AjS55MubLly5gza97MubPnz6BDix5NurTp06hTq17NurXr17Bjy55Nu7bt27hz697Nu7fv38CDCx9OvLjx48iTK1/OvLnz59CjS59Ovbr169iza9/Ovbv37+DDi/8fT768+fPo06tfz769+/fw48ufT7++/fv48+vfz7+///8ABijggAQWaOCBCCao4IIMNujggxBGKOGEFFZo4YUYZqjhhhx26OGHIIYo4ogklmjiiSimqOKKLLbo4oswxijjjDTWaOONOOao44489ujjj0AGKeSQRBZp5JFIJqnkkkw26eSTUEYp5ZRUVmnllVhmqeWWXHbp5ZdghinmmGSWWWEAaKap5ppstunmm3CuSVGcdNZpJ5wE3qnnnnTOyeefgKKZZ6CE6ulnoYjGOWiijLZ5aKOQCjpgpJQG8GiliS6KaaaabdqopZ4Seml4T6b6Z+mmqmpmp4aKaioXaWuZqmqp4aKSvnrjirQaKS0mqqtpp4qoaqSsoJ6aqSxmf8aWmuutaoqqa6quequkrbbGWuqiaqq2OoSuqirqKq2qnqq2SrqO2aqS0nqqoS62v2iqgrqaqyqSmQaK6uqkqaaqimWqqi2maqQ5mq2q6K2mmYaqqa+quabqaaS6naqm+eSmqm6qamq2uqmqa6aaqa2m2SqaqaqmamuqpSqWqmSqaqqaqaaaqq+6qqumqqaqqaaquqaaquqaaqaaqaaquqaaqaaquqaaquqaaqaaquqaaquqaaqaaquqaaquqaaqaaq";

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
      <div style={{ width:"130px", height:"130px", borderRadius:"50%", border:`3px solid ${c}`, overflow:"hidden", transition:"border-color 0.4s", boxShadow:"0 4px 12px rgba(0,0,0,0.15)" }}>
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
      <div style={{ maxWidth:"82%", padding:"10px 14px", borderRadius:isUser?"18px 18px 4px 18px":"4px 18px 18px 18px", background:isUser?"rgba(200,240,200,0.92)":"rgba(255,255,255,0.88)", backdropFilter:"blur(8px)", fontSize:"13.5px", lineHeight:"1.7", color:"#1A1A1A", whiteSpace:"pre-wrap", wordBreak:"break-word", boxShadow:"0 2px 8px rgba(0,0,0,0.08)" }}>
        {text}
      </div>
    </div>
  );
}

function TypingBubble() {
  return (
    <div style={{ display:"flex", marginBottom:"10px" }}>
      <div style={{ padding:"12px 16px", borderRadius:"4px 18px 18px 18px", background:"rgba(255,255,255,0.88)", backdropFilter:"blur(8px)", display:"flex", gap:"5px", alignItems:"center" }}>
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
        .shinko-suggest{display:block;width:100%;margin:3px 0;padding:6px 10px;font-size:11.5px;background:rgba(255,255,255,0.65);border:0.5px solid rgba(76,175,80,0.4);border-radius:10px;cursor:pointer;color:#2E7D32;text-align:left;font-family:inherit;transition:background 0.15s}
        .shinko-suggest:hover{background:rgba(255,255,255,0.95)}
        .shinko-send{padding:0 18px;border-radius:20px;background:#4CAF50;color:white;border:none;font-size:13px;cursor:pointer;height:36px;flex-shrink:0;font-family:inherit}
        .shinko-send:disabled{opacity:0.45;cursor:default}
      `}</style>

      <div style={{ position:"fixed", inset:0, zIndex:0 }}>
        <img src="/bg.jpg" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
        <div style={{ position:"absolute", inset:0, background:"rgba(255,255,255,0.72)" }} />
      </div>

      <div style={{ position:"relative", zIndex:1, display:"flex", height:"100vh", fontFamily:"Helvetica Neue, Arial, sans-serif" }}>
        <div style={{ width:"196px", flexShrink:0, background:"rgba(232,245,233,0.82)", backdropFilter:"blur(12px)", borderRight:"0.5px solid rgba(76,175,80,0.2)", display:"flex", flexDirection:"column", alignItems:"center", padding:"24px 12px 16px", gap:"10px" }}>
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

        <div style={{ flex:1, display:"flex", flexDirection:"column", minWidth:0 }}>
          <div style={{ padding:"10px 16px", background:"rgba(255,255,255,0.75)", backdropFilter:"blur(12px)", borderBottom:"0.5px solid rgba(0,0,0,0.08)", display:"flex", alignItems:"center", gap:"7px" }}>
            <div style={{ width:"8px", height:"8px", borderRadius:"50%", background:"#4CAF50" }} />
            <span style={{ fontSize:"13px", color:"#444" }}>長田新子に聞く</span>
          </div>
          <div style={{ flex:1, overflowY:"auto", padding:"20px 16px" }}>
            {messages.map((m,i) => <div key={i} className="shinko-msg"><Bubble role={m.role} text={m.content} /></div>)}
            {loading && <TypingBubble />}
            <div ref={bottomRef} />
          </div>
          <div style={{ padding:"10px 14px", background:"rgba(255,255,255,0.75)", backdropFilter:"blur(12px)", borderTop:"0.5px solid rgba(0,0,0,0.08)", display:"flex", gap:"8px", alignItems:"center" }}>
            <img src={FROG_GIF} alt="frog" style={{ width:"52px", height:"52px", flexShrink:0 }} />
            <input ref={inputRef} value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();send()}}} placeholder="メッセージを入力..." style={{ flex:1, fontSize:"13.5px", padding:"8px 14px", borderRadius:"20px", border:"0.5px solid rgba(0,0,0,0.15)", background:"rgba(255,255,255,0.85)", outline:"none", fontFamily:"inherit" }} />
            <button className="shinko-send" onClick={()=>send()} disabled={loading||!input.trim()}>送信</button>
          </div>
        </div>
      </div>
    </>
  );
}
