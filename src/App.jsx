import { useState, useEffect, useRef } from "react";

const CATEGORIES = [
  { id: "verduras",  label: "🥦 Verduras",           color: "#2E7D32", bg: "#E8F5E9" },
  { id: "frutas",    label: "🍊 Frutas",              color: "#F57C00", bg: "#FFF3E0" },
  { id: "lacteos",   label: "🥛 Lácteos",             color: "#2196F3", bg: "#E3F2FD" },
  { id: "carnes",    label: "🥩 Carnes",               color: "#F44336", bg: "#FFEBEE" },
  { id: "panaderia", label: "🍞 Panadería",            color: "#FF9800", bg: "#FFF8E1" },
  { id: "bebidas",   label: "🥤 Líquidos",             color: "#E91E8C", bg: "#FCE4EC" },
  { id: "postres",   label: "🍮 Postres",              color: "#AB47BC", bg: "#F3E5F5" },
  { id: "limpieza",  label: "🧹 Limpieza",             color: "#9C27B0", bg: "#EDE7F6" },
  { id: "otros",     label: "🛒 Otros",                color: "#607D8B", bg: "#ECEFF1" },
];

const STORAGE_KEY  = "lista_compras_v1";
const SESSION_KEY  = "lista_compras_session";

const DEFAULT_ITEMS = [
  { text: "Arroz",                              category: "otros",     done: false },
  { text: "Pan",                                category: "panaderia", done: true  },
  { text: "Aceite coco",                        category: "otros",     done: false },
  { text: "Tomates",                             category: "verduras",    done: false },
  { text: "Cecinas",                            category: "carnes",    done: true  },
  { text: "Fideos",                             category: "otros",     done: false },
  { text: "Cebollas",                            category: "verduras",    done: false },
  { text: "Bebidas",                            category: "bebidas",   done: true  },
  { text: "Vino",                               category: "bebidas",   done: true  },
  { text: "Agua",                               category: "bebidas",   done: true  },
  { text: "Postres",                            category: "postres",   done: true  },
  { text: "Cerdo",                              category: "carnes",    done: false },
  { text: "Carne res",                          category: "carnes",    done: true  },
  { text: "Pollo",                              category: "carnes",    done: false },
  { text: "Carne Cordero",                      category: "carnes",    done: false },
  { text: "Jabón líquido",                      category: "limpieza",  done: true  },
  { text: "Shampoo",                            category: "limpieza",  done: false },
  { text: "Papas",                               category: "verduras",    done: false },
  { text: "Leche",                              category: "lacteos",   done: true  },
  { text: "Lavaropa detergente",                category: "limpieza",  done: false },
  { text: "Bolsa de basura",                    category: "limpieza",  done: false },
  { text: "Cloro",                              category: "limpieza",  done: false },
  { text: "Cloro ropa color",                   category: "limpieza",  done: false },
  { text: "Toalla Nova",                        category: "limpieza",  done: false },
  { text: "Lysoform ambiente",                  category: "limpieza",  done: false },
  { text: "Insecticida",                        category: "limpieza",  done: false },
  { text: "Cloro Gel",                          category: "limpieza",  done: false },
  { text: "CIF",                                category: "limpieza",  done: false },
  { text: "Lustra mueble",                      category: "limpieza",  done: false },
  { text: "Cera piso flotante",                 category: "limpieza",  done: false },
  { text: "Cera roja",                          category: "limpieza",  done: false },
  { text: "Jabón sanigermin",                   category: "limpieza",  done: false },
  { text: "Ají color",                          category: "otros",     done: false },
  { text: "Comino",                             category: "otros",     done: false },
  { text: "Caluga Maggie de carne y verdura",   category: "otros",     done: false },
  { text: "Papel higiénico",                    category: "limpieza",  done: false },
  { text: "Lechuga",                             category: "verduras",    done: false },
  { text: "Acelga",                              category: "verduras",    done: false },
  { text: "Anti sarro",                         category: "limpieza",  done: false },
  { text: "Guantes talla S",                    category: "limpieza",  done: false },
  { text: "Choclo",                              category: "verduras",    done: false },
  { text: "Zapallo",                             category: "verduras",    done: false },
  { text: "Café",                               category: "otros",     done: false },
  { text: "Manjar",                             category: "lacteos",   done: true  },
  { text: "Coco rallado",                       category: "otros",     done: false },
  { text: "Desodorante Axe",                    category: "limpieza",  done: false },
  { text: "Pasta de diente",                    category: "limpieza",  done: false },
  { text: "Hilo dental",                        category: "limpieza",  done: false },
  { text: "Manzanilla y matico en bolsita de té", category: "otros",   done: false },
  { text: "Poroto",                             category: "otros",     done: false },
  { text: "Stevia",                             category: "otros",     done: false },
  { text: "Rábano",                              category: "verduras",    done: false },
  { text: "Ajo",                                 category: "verduras",    done: false },
  { text: "Apio",                                category: "verduras",    done: false },
  { text: "Morrón",                              category: "verduras",    done: false },
  { text: "Naranja",                             category: "frutas",    done: false },
  { text: "Manzana",                             category: "frutas",    done: false },
  { text: "Plátanos",                            category: "frutas",    done: false },
  { text: "Melón",                               category: "frutas",    done: false },
  { text: "Sandía",                              category: "frutas",    done: false },
  { text: "Helados",                             category: "postres",   done: false },
  { text: "Durazno conserva",                    category: "postres",   done: false },
  { text: "Frutillas conserva",                  category: "postres",   done: false },
  { text: "Piña en conserva",                    category: "postres",   done: false },
  { text: "Pala",                               category: "otros",     done: false },
  { text: "Milo",                               category: "otros",     done: false },
].map((item, i) => ({ ...item, id: i + 1, addedAt: Date.now() - i * 1000 }));

function saveData(items) { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); } catch {} }
function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_ITEMS));
    return DEFAULT_ITEMS;
  } catch { return DEFAULT_ITEMS; }
}
function loadSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : { shopMode: false, alertMinutes: 30, lastActivity: null };
  } catch { return { shopMode: false, alertMinutes: 30, lastActivity: null }; }
}
function saveSession(s) { try { localStorage.setItem(SESSION_KEY, JSON.stringify(s)); } catch {} }
function formatCountdown(ms) {
  if (ms <= 0) return "¡Ahora!";
  const s = Math.floor(ms / 1000);
  return `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;
}

// ── Clasificación con IA ──────────────────────────────────────────────────────
async function classifyProduct(productName) {
  const categoryList = CATEGORIES.map(c => `"${c.id}" (${c.label.replace(/^\S+\s/, "")})`).join(", ");
  const prompt = `Eres un asistente de supermercado chileno. Clasifica el producto "${productName}" en UNA de estas categorías: ${categoryList}.
  
Responde SOLO con un objeto JSON con este formato exacto (sin explicación, sin markdown):
{"category": "id_de_categoria", "confidence": "high" o "low"}

Usa "low" si el producto es ambiguo o poco común y sería mejor preguntarle al usuario.
Usa "high" si la clasificación es obvia.`;

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 100,
      messages: [{ role: "user", content: prompt }],
    }),
  });
  const data = await res.json();
  const text = data.content?.[0]?.text || "{}";
  const clean = text.replace(/```json|```/g, "").trim();
  return JSON.parse(clean);
}


// ── Sonido de alerta con HTML Audio (compatible iOS Safari) ──────────────────
let _alarmAudio = null;
function getAlarmAudio() {
  if (!_alarmAudio) {
    _alarmAudio = new Audio("/alarm.wav");
    _alarmAudio.preload = "auto";
  }
  return _alarmAudio;
}

function unlockAudio() {
  try {
    const a = getAlarmAudio();
    a.volume = 0.001;
    a.play().then(() => { a.pause(); a.currentTime = 0; a.volume = 1; }).catch(() => {});
  } catch {}
}

function playAlertSound() {
  try {
    const a = getAlarmAudio();
    a.currentTime = 0;
    a.volume = 1;
    a.play().catch(e => console.log("Audio error:", e));
  } catch(e) { console.log("Audio error:", e); }
  try { if (navigator.vibrate) navigator.vibrate([400, 150, 400, 150, 600]); } catch {}
}

let nextId = Date.now();

export default function App() {
  const [items,            setItems]            = useState(() => loadData());
  const [input,            setInput]            = useState("");
  const [filter,           setFilter]           = useState("all");
  const [showConfetti,     setShowConfetti]     = useState(false);
  const [session,          setSession]          = useState(() => loadSession());
  const [showShopSetup,    setShowShopSetup]    = useState(false);
  const [alertMinutesInput,setAlertMinutesInput]= useState("30");
  const [pendingAlert,     setPendingAlert]     = useState(null);
  const [countdown,        setCountdown]        = useState(null);
  const timerRef = useRef(null);
  const audioUnlocked = useRef(false);

  // Desbloquear audio iOS en el primer toque del usuario
  const handleFirstTouch = () => {
    if (!audioUnlocked.current) {
      unlockAudio();
      audioUnlocked.current = true;
    }
  };

  // Estado de clasificación IA
  const [classifying,      setClassifying]      = useState(false);  // spinner
  const [askCategory,      setAskCategory]      = useState(null);   // {text} cuando IA no sabe
  const [editCategory,     setEditCategory]     = useState(null);   // {id, text} para editar categoría

  useEffect(() => { saveData(items); if (items.length > 0 && items.every(i => i.done)) { setShowConfetti(true); setTimeout(() => setShowConfetti(false), 2500); } }, [items]);
  useEffect(() => { saveSession(session); }, [session]);
  useEffect(() => {
    if (!session.shopMode || !session.lastActivity) { setCountdown(null); if (timerRef.current) clearInterval(timerRef.current); return; }
    const alertMs = session.alertMinutes * 60 * 1000;
    const tick = () => { const rem = alertMs - (Date.now() - session.lastActivity); if (rem <= 0) { setCountdown(0); clearInterval(timerRef.current); const p = items.filter(i => !i.done); if (p.length > 0) { playAlertSound(); setPendingAlert(p); } } else setCountdown(rem); };
    tick(); timerRef.current = setInterval(tick, 1000);
    return () => clearInterval(timerRef.current);
  }, [session.shopMode, session.lastActivity, session.alertMinutes, items]);

  // ── Agregar producto con clasificación IA ──
  const addItem = async () => {
    const text = input.trim();
    if (!text || classifying) return;
    setClassifying(true);
    try {
      const result = await classifyProduct(text);
      const catId  = CATEGORIES.find(c => c.id === result.category) ? result.category : null;

      if (!catId || result.confidence === "low") {
        // IA no está segura → preguntar al usuario
        setAskCategory({ text });
      } else {
        // IA está segura → agregar directo
        commitItem(text, catId);
      }
    } catch {
      // Si falla la IA, preguntar al usuario
      setAskCategory({ text });
    }
    setClassifying(false);
    setInput("");
    if (session.shopMode) resetActivityTimer();
  };

  const commitItem = (text, catId) => {
    setItems(prev => [...prev, { id: nextId++, text, category: catId, done: false, addedAt: Date.now() }]);
    setAskCategory(null);
  };

  const toggleItem  = (id) => { setItems(prev => prev.map(i => i.id === id ? { ...i, done: !i.done } : i)); if (session.shopMode) resetActivityTimer(); };
  const deleteItem  = (id) => setItems(prev => prev.filter(i => i.id !== id));
  const clearDone   = ()   => setItems(prev => prev.filter(i => !i.done));
  const clearAll    = ()   => { if (window.confirm("¿Vaciar toda la lista?")) setItems([]); };

  const startShopMode = () => { const m = parseInt(alertMinutesInput, 10); if (!m || m < 1) return; setSession({ shopMode: true, alertMinutes: m, lastActivity: Date.now() }); setShowShopSetup(false); setFilter("pending"); };
  const stopShopMode  = () => { setSession({ shopMode: false, alertMinutes: session.alertMinutes, lastActivity: null }); setPendingAlert(null); setCountdown(null); setFilter("all"); };
  const resetActivityTimer = () => { setSession(s => ({ ...s, lastActivity: Date.now() })); setPendingAlert(null); };

  const filteredItems      = filter === "all" ? items : filter === "pending" ? items.filter(i => !i.done) : items.filter(i => i.done);
  const groupedByCategory  = CATEGORIES.map(cat => ({ ...cat, items: filteredItems.filter(i => i.category === cat.id) })).filter(g => g.items.length > 0);
  const doneCount          = items.filter(i => i.done).length;
  const totalCount         = items.length;
  const pendingCount       = totalCount - doneCount;
  const progress           = totalCount > 0 ? Math.round((doneCount / totalCount) * 100) : 0;

  return (
    <div style={{ ...S.root, background: session.shopMode ? "linear-gradient(135deg,#fff8e1,#e8f5e9)" : "linear-gradient(135deg,#f8f0ff,#e0f7fa)" }} onTouchStart={handleFirstTouch} onClick={handleFirstTouch}>

      {/* ── Modal: Editar categoría ── */}
      {editCategory && (
        <div style={S.overlay}>
          <div style={S.modal}>
            <div style={S.modalIcon}>✏️</div>
            <h2 style={S.modalTitle}>Cambiar categoría</h2>
            <p style={S.modalSub}>¿Dónde va <strong>"{editCategory.text}"</strong>?</p>
            <div style={S.catGrid}>
              {CATEGORIES.map(cat => (
                <button key={cat.id} style={{ ...S.catGridBtn, background: cat.bg, border: `2px solid ${cat.color}`, color: cat.color, outline: editCategory.category === cat.id ? `3px solid ${cat.color}` : "none" }}
                  onClick={() => {
                    setItems(prev => prev.map(i => i.id === editCategory.id ? { ...i, category: cat.id } : i));
                    setEditCategory(null);
                  }}>
                  <span style={{ fontSize: 26 }}>{cat.label.split(" ")[0]}</span>
                  <span style={{ fontSize: 11, fontWeight: 700 }}>{cat.label.replace(/^\S+\s/, "")}</span>
                  {editCategory.category === cat.id && <span style={{ fontSize: 10, background: cat.color, color: "#fff", borderRadius: 99, padding: "1px 6px" }}>actual</span>}
                </button>
              ))}
            </div>
            <button style={S.cancelBtn} onClick={() => setEditCategory(null)}>Cancelar</button>
          </div>
        </div>
      )}

      {/* ── Modal: IA no sabe la categoría ── */}
      {askCategory && (
        <div style={S.overlay}>
          <div style={S.modal}>
            <div style={S.modalIcon}>🤔</div>
            <h2 style={S.modalTitle}>¿Dónde va esto?</h2>
            <p style={S.modalSub}>No estoy seguro en qué categoría poner <strong>"{askCategory.text}"</strong>. ¿Me ayudas?</p>
            <div style={S.catGrid}>
              {CATEGORIES.map(cat => (
                <button key={cat.id} style={{ ...S.catGridBtn, background: cat.bg, border: `2px solid ${cat.color}`, color: cat.color }} onClick={() => commitItem(askCategory.text, cat.id)}>
                  <span style={{ fontSize: 26 }}>{cat.label.split(" ")[0]}</span>
                  <span style={{ fontSize: 12, fontWeight: 700 }}>{cat.label.replace(/^\S+\s/, "")}</span>
                </button>
              ))}
            </div>
            <button style={S.cancelBtn} onClick={() => setAskCategory(null)}>Cancelar</button>
          </div>
        </div>
      )}

      {/* ── Alerta de pendientes ── */}
      {pendingAlert && (
        <div style={S.overlay}>
          <div style={S.modal}>
            <div style={S.modalIcon}>⏰</div>
            <h2 style={S.modalTitle}>¡Oye! ¿Ya revisaste todo?</h2>
            <p style={S.modalSub}>Llevas un rato sin marcar nada. Aún tienes pendiente:</p>
            <div style={S.alertList}>
              {pendingAlert.slice(0, 6).map(item => { const cat = CATEGORIES.find(c => c.id === item.category); return (
                <div key={item.id} style={{ ...S.alertItem, borderLeft: `4px solid ${cat.color}` }}>
                  <span style={{ fontSize: 18 }}>{cat.label.split(" ")[0]}</span>
                  <span style={S.alertItemText}>{item.text}</span>
                </div>
              ); })}
              {pendingAlert.length > 6 && <div style={S.alertMore}>...y {pendingAlert.length - 6} más</div>}
            </div>
            <button style={S.alertBtn} onClick={resetActivityTimer}>✅ ¡Sigo comprando!</button>
          </div>
        </div>
      )}

      {/* ── Confetti ── */}
      {showConfetti && (
        <div style={S.overlay}>
          <div style={S.confettiMsg}>🎉 ¡Lista completada! 🛒✅</div>
        </div>
      )}

      {/* ── Modal modo compra ── */}
      {showShopSetup && (
        <div style={S.overlay}>
          <div style={S.modal}>
            <div style={S.modalIcon}>🏪</div>
            <h2 style={S.modalTitle}>Activar Modo Compra</h2>
            <p style={S.modalSub}>¿Cuántos minutos sin marcar nada antes de avisarte?</p>
            <div style={S.minuteRow}>
              {["10","20","30","45","60"].map(m => (
                <button key={m} style={{ ...S.minuteChip, background: alertMinutesInput===m?"#FF9800":"#FFF3E0", color: alertMinutesInput===m?"#fff":"#E65100", fontWeight: alertMinutesInput===m?800:500 }} onClick={() => setAlertMinutesInput(m)}>{m} min</button>
              ))}
            </div>
            <div style={S.minuteCustomRow}>
              <span style={{ color:"#888",fontSize:13 }}>O escribe:</span>
              <input style={S.minuteInput} type="number" min="1" max="240" value={alertMinutesInput} onChange={e=>setAlertMinutesInput(e.target.value)} />
              <span style={{ color:"#888",fontSize:13 }}>minutos</span>
            </div>
            <div style={{ display:"flex",gap:10,marginTop:18 }}>
              <button style={S.cancelBtn} onClick={()=>setShowShopSetup(false)}>Cancelar</button>
              <button style={S.startBtn}  onClick={startShopMode}>🟢 ¡Empezar!</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Header ── */}
      <div style={{ ...S.header, background: session.shopMode ? "linear-gradient(135deg,#FF9800,#4CAF50)" : "linear-gradient(135deg,#6C63FF,#48CAE4)" }}>
        <div style={S.headerTop}>
          <span style={S.logo}>{session.shopMode ? "🏪" : "🛒"}</span>
          <div style={{ flex:1 }}>
            <h1 style={S.title}>{session.shopMode ? "¡Modo Compra Activo!" : "Mi Lista del Súper"}</h1>
            {session.shopMode && countdown !== null && <div style={S.countdown}>⏱️ Próxima alerta: <strong>{formatCountdown(countdown)}</strong></div>}
          </div>
          {session.shopMode
            ? <button style={S.stopBtn} onClick={stopShopMode}>✖ Salir</button>
            : <button style={S.shopBtn} onClick={()=>setShowShopSetup(true)}>🏪 Ir al súper</button>}
        </div>
        {totalCount > 0 && (
          <div style={S.progressWrap}>
            <div style={S.progressBar}>
              <div style={{ ...S.progressFill, width:`${progress}%`, background: progress===100?"linear-gradient(90deg,#43e97b,#38f9d7)":session.shopMode?"linear-gradient(90deg,#ffe259,#ffa751)":"linear-gradient(90deg,#f093fb,#f5576c)" }} />
            </div>
            <span style={S.progressText}>{doneCount}/{totalCount} productos ({progress}%){session.shopMode&&pendingCount>0?` · ${pendingCount} pendientes`:""}</span>
          </div>
        )}
      </div>

      {session.shopMode && <div style={S.activityBar} onClick={resetActivityTimer}>👆 Toca aquí si sigues comprando para reiniciar el aviso</div>}

      {/* ── Agregar producto ── */}
      <div style={S.addCard}>
        <div style={S.inputRow}>
          <input
            style={{ ...S.input, borderColor: classifying ? "#FF9800" : "#E0DEFF" }}
            placeholder={classifying ? "Clasificando con IA..." : "Escribe un producto y presiona +"}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && addItem()}
            disabled={classifying}
          />
          <button style={{ ...S.addBtn, opacity: classifying ? 0.6 : 1 }} onClick={addItem} disabled={classifying}>
            {classifying ? "⏳" : "+"}
          </button>
        </div>

        {/* Badge IA */}
        <div style={S.iaBadge}>
          <span style={S.iaDot} />
          <span>La IA clasifica automáticamente el producto al agregarlo</span>
        </div>
      </div>

      {/* ── Filtros ── */}
      {totalCount > 0 && (
        <div style={S.filterRow}>
          {[{key:"all",label:`Todo (${totalCount})`},{key:"pending",label:`Pendiente (${pendingCount})`},{key:"done",label:`Comprado (${doneCount})`}].map(f=>(
            <button key={f.key} style={{ ...S.filterBtn, background:filter===f.key?(session.shopMode?"#FF9800":"#6C63FF"):"#f0efff", color:filter===f.key?"#fff":(session.shopMode?"#E65100":"#6C63FF") }} onClick={()=>setFilter(f.key)}>{f.label}</button>
          ))}
        </div>
      )}

      {totalCount === 0 && (
        <div style={S.empty}>
          <div style={{ fontSize:64 }}>🛍️</div>
          <p style={{ fontSize:18,color:"#6C63FF",fontWeight:700,margin:"10px 0 4px" }}>Tu lista está vacía.</p>
          <p style={{ fontSize:14,color:"#aaa" }}>¡Agrega tu primer producto arriba!</p>
        </div>
      )}

      {/* ── Lista ── */}
      <div style={{ padding:"0 14px" }}>
        {groupedByCategory.map(group => (
          <div key={group.id} style={{ marginBottom:14 }}>
            <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 14px",borderRadius:"12px 12px 0 0",background:group.bg,borderLeft:`5px solid ${group.color}` }}>
              <span style={{ color:group.color,fontWeight:700,fontSize:15 }}>{group.label}</span>
              <span style={{ background:group.color,color:"#fff",borderRadius:99,padding:"1px 10px",fontSize:12,fontWeight:700 }}>{group.items.length}</span>
            </div>
            {group.items.map(item=>(
              <div key={item.id} style={{ display:"flex",alignItems:"center",gap:10,background:item.done?"#F0FFF4":"#fff",borderLeft:`4px solid ${item.done?"#43e97b":group.color}`,padding:"10px 12px",borderBottom:"1px solid #f0f0f0",opacity:item.done?0.7:1,transition:"all 0.2s" }}>
                <button style={{ width:28,height:28,borderRadius:8,cursor:"pointer",fontSize:16,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,flexShrink:0,background:item.done?"#43e97b":"#fff",border:`2.5px solid ${item.done?"#43e97b":group.color}`,color:item.done?"#fff":group.color,transition:"all 0.18s",fontFamily:"inherit" }} onClick={()=>toggleItem(item.id)}>
                  {item.done?"✓":""}
                </button>
                <span style={{ flex:1,fontSize:15,textDecoration:item.done?"line-through":"none",color:item.done?"#aaa":"#222",transition:"all 0.2s" }}>{item.text}</span>
                <button style={{ background:"none",border:"none",color:"#aaa",cursor:"pointer",fontSize:13,padding:"2px 4px",fontFamily:"inherit",borderRadius:6,border:"1px solid #eee" }}
                  title="Cambiar categoría"
                  onClick={() => setEditCategory({ id: item.id, text: item.text, category: item.category })}>
                  ✏️
                </button>
                <button style={{ background:"none",border:"none",color:"#ddd",cursor:"pointer",fontSize:14,padding:"0 2px",fontFamily:"inherit" }} onClick={()=>deleteItem(item.id)}>✕</button>
              </div>
            ))}
          </div>
        ))}
      </div>

      {totalCount > 0 && (
        <div style={{ display:"flex",gap:10,margin:"14px 14px 0",flexWrap:"wrap" }}>
          {doneCount>0 && <button style={S.clearDoneBtn} onClick={clearDone}>🗑️ Borrar comprados</button>}
          <button style={S.clearAllBtn} onClick={clearAll}>🧹 Vaciar lista</button>
        </div>
      )}

      <div style={{ textAlign:"center",color:"#bbb",fontSize:12,marginTop:28,padding:"0 20px" }}>Hecho con ❤️ para tus compras semanales</div>
    </div>
  );
}

const S = {
  root:            { fontFamily:"'Nunito','Segoe UI',sans-serif",minHeight:"100vh",paddingBottom:40 },
  header:          { padding:"20px 16px 16px",borderRadius:"0 0 28px 28px",boxShadow:"0 4px 20px rgba(0,0,0,0.15)",marginBottom:14 },
  headerTop:       { display:"flex",alignItems:"center",gap:10,marginBottom:10 },
  logo:            { fontSize:30 },
  title:           { margin:0,color:"#fff",fontSize:22,fontWeight:800,letterSpacing:-0.5 },
  countdown:       { color:"rgba(255,255,255,0.92)",fontSize:13,marginTop:3 },
  shopBtn:         { background:"rgba(255,255,255,0.25)",color:"#fff",border:"2px solid rgba(255,255,255,0.6)",borderRadius:12,padding:"7px 12px",fontSize:13,fontWeight:700,cursor:"pointer",whiteSpace:"nowrap" },
  stopBtn:         { background:"rgba(255,0,0,0.2)",color:"#fff",border:"2px solid rgba(255,255,255,0.5)",borderRadius:12,padding:"7px 12px",fontSize:13,fontWeight:700,cursor:"pointer" },
  progressWrap:    { display:"flex",flexDirection:"column",gap:4 },
  progressBar:     { background:"rgba(255,255,255,0.3)",borderRadius:99,height:10,overflow:"hidden" },
  progressFill:    { height:"100%",borderRadius:99,transition:"width 0.4s ease" },
  progressText:    { color:"rgba(255,255,255,0.9)",fontSize:13,fontWeight:600 },
  activityBar:     { background:"#FFF9C4",border:"1.5px solid #FFD54F",margin:"0 14px 12px",borderRadius:12,padding:"9px 14px",fontSize:13,color:"#E65100",fontWeight:600,cursor:"pointer",textAlign:"center" },
  addCard:         { background:"#fff",margin:"0 14px 14px",borderRadius:20,padding:"16px 14px 12px",boxShadow:"0 4px 18px rgba(108,99,255,0.12)" },
  inputRow:        { display:"flex",gap:8,marginBottom:10 },
  input:           { flex:1,border:"2px solid #E0DEFF",borderRadius:12,padding:"10px 14px",fontSize:15,outline:"none",fontFamily:"inherit",color:"#333",transition:"border-color 0.2s" },
  addBtn:          { background:"linear-gradient(135deg,#6C63FF,#48CAE4)",color:"#fff",border:"none",borderRadius:12,width:46,fontSize:26,fontWeight:700,cursor:"pointer",lineHeight:1,transition:"opacity 0.2s" },
  iaBadge:         { display:"flex",alignItems:"center",gap:7,background:"#F3E5F5",borderRadius:10,padding:"6px 12px",fontSize:12,color:"#7B1FA2",fontWeight:600 },
  iaDot:           { width:8,height:8,borderRadius:"50%",background:"#9C27B0",flexShrink:0,boxShadow:"0 0 0 3px #CE93D8" },
  filterRow:       { display:"flex",gap:7,margin:"0 14px 14px",flexWrap:"wrap" },
  filterBtn:       { border:"none",borderRadius:99,padding:"7px 14px",fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"inherit",transition:"all 0.18s" },
  empty:           { textAlign:"center",padding:"48px 20px 20px" },
  clearDoneBtn:    { background:"#E8F5E9",color:"#388E3C",border:"2px solid #A5D6A7",borderRadius:12,padding:"9px 16px",fontSize:14,fontWeight:700,cursor:"pointer",fontFamily:"inherit" },
  clearAllBtn:     { background:"#FFEBEE",color:"#C62828",border:"2px solid #FFCDD2",borderRadius:12,padding:"9px 16px",fontSize:14,fontWeight:700,cursor:"pointer",fontFamily:"inherit" },
  overlay:         { position:"fixed",inset:0,background:"rgba(0,0,0,0.55)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:999,padding:20 },
  modal:           { background:"#fff",borderRadius:24,padding:"28px 22px",maxWidth:380,width:"100%",boxShadow:"0 12px 40px rgba(0,0,0,0.25)",textAlign:"center" },
  modalIcon:       { fontSize:52,marginBottom:8 },
  modalTitle:      { margin:"0 0 8px",fontSize:22,fontWeight:800,color:"#333" },
  modalSub:        { margin:"0 0 16px",fontSize:14,color:"#777" },
  catGrid:         { display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:16 },
  catGridBtn:      { display:"flex",flexDirection:"column",alignItems:"center",gap:4,padding:"12px 8px",borderRadius:14,cursor:"pointer",fontFamily:"inherit",fontWeight:600,transition:"transform 0.15s" },
  alertList:       { textAlign:"left",display:"flex",flexDirection:"column",gap:6,marginBottom:18 },
  alertItem:       { display:"flex",alignItems:"center",gap:10,background:"#f9f9f9",borderRadius:10,padding:"8px 12px" },
  alertItemText:   { fontSize:14,fontWeight:600,color:"#333" },
  alertMore:       { textAlign:"center",color:"#aaa",fontSize:13,fontStyle:"italic" },
  alertBtn:        { background:"linear-gradient(135deg,#43e97b,#38f9d7)",color:"#fff",border:"none",borderRadius:14,padding:"12px 28px",fontSize:16,fontWeight:800,cursor:"pointer",width:"100%" },
  minuteRow:       { display:"flex",flexWrap:"wrap",gap:8,justifyContent:"center",marginBottom:12 },
  minuteChip:      { border:"2px solid #FF9800",borderRadius:99,padding:"7px 14px",fontSize:14,cursor:"pointer",fontFamily:"inherit" },
  minuteCustomRow: { display:"flex",alignItems:"center",gap:8,justifyContent:"center" },
  minuteInput:     { width:60,border:"2px solid #FFB74D",borderRadius:10,padding:"6px 10px",fontSize:16,textAlign:"center",fontFamily:"inherit",outline:"none" },
  cancelBtn:       { flex:1,background:"#f5f5f5",color:"#888",border:"none",borderRadius:12,padding:11,fontSize:15,fontWeight:700,cursor:"pointer" },
  startBtn:        { flex:2,background:"linear-gradient(135deg,#FF9800,#4CAF50)",color:"#fff",border:"none",borderRadius:12,padding:11,fontSize:15,fontWeight:800,cursor:"pointer" },
  confettiMsg:     { color:"#fff",fontSize:28,fontWeight:800,textAlign:"center",padding:30,background:"rgba(255,255,255,0.15)",borderRadius:24,backdropFilter:"blur(8px)" },
};
