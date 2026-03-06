import { useState, useRef, useEffect } from 'react'
import Section from '../components/Section'

interface EventItem {
  id: number
  date: string
  model: string
  maker: string
}

interface MakerInfo {
  name: string
  accent: string
  dim: string
  bg: string
  track: string
}

const EVENTS: EventItem[] = [
  { id:1,  date:"2025-03-25", model:"Gemini 2.5 Pro Experimental", maker:"Google"    },
  { id:2,  date:"2025-05-22", model:"Claude 4 (Opus + Sonnet)",    maker:"Anthropic" },
  { id:3,  date:"2025-06-17", model:"Gemini 2.5 Pro & Flash GA",   maker:"Google"    },
  { id:4,  date:"2025-08-05", model:"Claude Opus 4.1",             maker:"Anthropic" },
  { id:5,  date:"2025-08-07", model:"GPT-5",                       maker:"OpenAI"    },
  { id:6,  date:"2025-09-15", model:"GPT-5-Codex",                 maker:"OpenAI"    },
  { id:7,  date:"2025-09-29", model:"Claude Sonnet 4.5",           maker:"Anthropic" },
  { id:8,  date:"2025-10-15", model:"Claude Haiku 4.5",            maker:"Anthropic" },
  { id:9,  date:"2025-11-18", model:"Gemini 3 Pro",                maker:"Google"    },
  { id:10, date:"2025-11-19", model:"GPT-5.1-Codex-Max",           maker:"OpenAI"    },
  { id:11, date:"2025-11-24", model:"Claude Opus 4.5",             maker:"Anthropic" },
  { id:12, date:"2025-12-11", model:"GPT-5.2",                     maker:"OpenAI"    },
  { id:13, date:"2025-12-17", model:"Gemini 3 Flash",              maker:"Google"    },
  { id:14, date:"2026-02-05", model:"GPT-5.3-Codex",               maker:"OpenAI"    },
  { id:15, date:"2026-02-05", model:"Claude Opus 4.6",             maker:"Anthropic" },
  { id:16, date:"2026-02-17", model:"Claude Sonnet 4.6",           maker:"Anthropic" },
  { id:17, date:"2026-02-19", model:"Gemini 3.1 Pro Preview",      maker:"Google"    },
  { id:18, date:"2026-03-03", model:"Gemini 3.1 Flash-Lite",       maker:"Google"    },
  { id:19, date:"2026-03-03", model:"GPT-5.3 Instant",             maker:"OpenAI"    },
  { id:20, date:"2026-03-05", model:"GPT-5.4 Thinking + Pro",      maker:"OpenAI"    },
].sort((a,b)=> new Date(a.date).getTime()-new Date(b.date).getTime())

const MAKERS: MakerInfo[] = [
  { name:"OpenAI",    accent:"#fb923c", dim:"#7c3010", bg:"#2c1306", track:"rgba(251,146,60,0.25)" },
  { name:"Google",    accent:"#60a5fa", dim:"#1e40af", bg:"#0d1f3c", track:"rgba(96,165,250,0.25)" },
  { name:"Anthropic", accent:"#4ade80", dim:"#166534", bg:"#0a2e19", track:"rgba(74,222,128,0.25)" },
]
const makerMap = Object.fromEntries(MAKERS.map(m=>[m.name,m]))

const TODAY = "2026-03-05"
const MIN_MS = new Date(EVENTS[0].date).getTime()
const MAX_MS = new Date(EVENTS[EVENTS.length-1].date).getTime()
const SPAN   = MAX_MS - MIN_MS

function toPct(d: string) { return ((new Date(d).getTime()-MIN_MS)/SPAN)*100 }
function daysBetween(a: string, b: string) { return Math.round(Math.abs(new Date(a).getTime()-new Date(b).getTime())/86400000) }
function fmtShort(d: string) {
  const [y,m,day]=d.split("-")
  const mo=["jan","fev","mar","abr","mai","jun","jul","ago","set","out","nov","dez"]
  return `${parseInt(day)} ${mo[parseInt(m)-1]} ${y}`
}
function fmtLong(d: string) {
  const [y,m,day]=d.split("-")
  const mo=["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"]
  return `${parseInt(day)} de ${mo[parseInt(m)-1]} de ${y}`
}

function getMonthTicks() {
  const names=["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"]
  const ticks: {label: string, pct: number}[]=[]
  const d=new Date("2025-03-01")
  while(d<=new Date("2026-04-01")){
    const p=toPct(d.toISOString().slice(0,10))
    if(p>=0&&p<=100) ticks.push({label:`${names[d.getMonth()]} '${String(d.getFullYear()).slice(2)}`,pct:p})
    d.setMonth(d.getMonth()+1)
  }
  return ticks
}

function HoverCard({ ev, pos }: { ev: EventItem | null, pos: {x:number,y:number} | null }) {
  if (!ev || !pos) return null
  const mk = makerMap[ev.maker]
  const sameArr = EVENTS.filter(e=>e.maker===ev.maker)
  const sameIdx = sameArr.findIndex(e=>e.id===ev.id)
  const daysSame = sameIdx>0 ? daysBetween(ev.date, sameArr[sameIdx-1].date) : null
  const globalIdx = EVENTS.findIndex(e=>e.id===ev.id)
  const daysGen = globalIdx>0 ? daysBetween(ev.date, EVENTS[globalIdx-1].date) : null
  const cardW = 260
  const cardH = 160
  let left = pos.x + 16
  let top  = pos.y - cardH - 12
  if (left + cardW > window.innerWidth - 8)  left = pos.x - cardW - 16
  if (top < 8) top = pos.y + 20

  return (
    <div style={{
      position:"fixed", left, top, width:cardW,
      background:"#1a1a1e", border:`1px solid ${mk.accent}`,
      borderRadius:"12px", padding:"14px 16px",
      zIndex:9999, pointerEvents:"none",
      boxShadow:`0 8px 32px rgba(0,0,0,.7), 0 0 0 1px ${mk.dim}`,
      animation:"fadeIn .15s ease",
    }}>
      <div style={{
        display:"inline-block", fontSize:"9px", fontWeight:700, letterSpacing:".14em",
        textTransform:"uppercase", color:mk.accent, background:mk.bg,
        border:`1px solid ${mk.accent}`, borderRadius:"4px", padding:"2px 8px", marginBottom:"8px",
      }}>{ev.maker}</div>
      <div style={{ fontSize:"14px", fontWeight:700, color:"#ffffff", lineHeight:1.3, marginBottom:"4px" }}>{ev.model}</div>
      <div style={{ fontSize:"11px", color:"#cbd5e1", fontFamily:"monospace", marginBottom:"12px" }}>
        {fmtShort(ev.date)}{ev.date===TODAY&&<span style={{marginLeft:6,fontSize:"9px",color:"#fb923c",fontWeight:700}}>● HOJE</span>}
      </div>
      <div style={{display:"flex",gap:"16px",borderTop:"1px solid #2a2a30",paddingTop:"10px"}}>
        <div>
          <div style={{fontSize:"9px",color:"#94a3b8",letterSpacing:".08em",textTransform:"uppercase",marginBottom:"2px"}}>Desde fab.</div>
          <div style={{fontSize:"18px",fontWeight:800,color:mk.accent,lineHeight:1}}>{daysSame!==null ? `${daysSame}d` : "—"}</div>
        </div>
        <div>
          <div style={{fontSize:"9px",color:"#94a3b8",letterSpacing:".08em",textTransform:"uppercase",marginBottom:"2px"}}>Desde geral</div>
          <div style={{fontSize:"18px",fontWeight:800,color:"#60a5fa",lineHeight:1}}>{daysGen!==null ? `${daysGen}d` : "—"}</div>
        </div>
      </div>
      <div style={{ fontSize:"9px", color:"#64748b", marginTop:"8px", fontStyle:"italic" }}>Clique para mais detalhes</div>
    </div>
  )
}

function Modal({ ev, onClose }: { ev: EventItem, onClose: () => void }) {
  const mk = makerMap[ev.maker]
  const sameArr = EVENTS.filter(e=>e.maker===ev.maker)
  const sameIdx = sameArr.findIndex(e=>e.id===ev.id)
  const daysSame = sameIdx>0 ? daysBetween(ev.date,sameArr[sameIdx-1].date) : null
  const globalIdx = EVENTS.findIndex(e=>e.id===ev.id)
  const daysGen = globalIdx>0 ? daysBetween(ev.date,EVENTS[globalIdx-1].date) : null

  return (
    <div onClick={e=>{if(e.target===e.currentTarget) onClose()}} style={{
      position:"fixed",inset:0,background:"rgba(0,0,0,.85)",
      backdropFilter:"blur(6px)",display:"flex",
      alignItems:"center",justifyContent:"center",zIndex:9998,padding:"16px",
    }}>
      <div style={{
        background:"#111115", border:`2px solid ${mk.accent}`,
        borderRadius:"20px", padding:"36px",
        width:"100%", maxWidth:"440px",
        animation:"popIn .25s cubic-bezier(.34,1.56,.64,1)",
      }}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"24px"}}>
          <span style={{
            fontSize:"11px",fontWeight:700,letterSpacing:".14em",textTransform:"uppercase",
            color:mk.accent,background:mk.bg,border:`1px solid ${mk.accent}`,
            padding:"5px 14px",borderRadius:"6px",fontFamily:"monospace",
          }}>{ev.maker}</span>
          <button onClick={onClose} style={{
            background:"#222226",border:"1px solid #333338",borderRadius:"8px",cursor:"pointer",
            color:"#e2e8f0",fontSize:"16px",width:"32px",height:"32px",
            display:"flex",alignItems:"center",justifyContent:"center",
          }}>✕</button>
        </div>
        <div style={{fontSize:"12px",color:"#94a3b8",fontFamily:"monospace",marginBottom:"6px"}}>
          {fmtLong(ev.date)}
          {ev.date===TODAY&&(
            <span style={{
              marginLeft:10,fontSize:"9px",fontWeight:700,color:"#fb923c",background:"#2c1306",
              border:"1px solid #7c3010",borderRadius:"4px",padding:"2px 7px",letterSpacing:".08em",
            }}>● HOJE</span>
          )}
        </div>
        <div style={{ fontSize:"24px",fontWeight:800,color:"#ffffff",lineHeight:1.2,marginBottom:"28px" }}>{ev.model}</div>
        <div style={{height:"1px",background:"#222228",marginBottom:"24px"}}/>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px",marginBottom:"32px"}}>
          {[
            {label:"Desde último do fabricante", val:daysSame, color:mk.accent},
            {label:"Desde último geral",          val:daysGen,  color:"#60a5fa"},
          ].map(s=>(
            <div key={s.label} style={{
              background:"#16161a",border:"1px solid #222228",borderRadius:"10px",padding:"16px",
            }}>
              <div style={{fontSize:"9px",fontFamily:"monospace",letterSpacing:".1em",
                textTransform:"uppercase",color:"#94a3b8",marginBottom:"10px",lineHeight:1.5}}>
                {s.label}
              </div>
              <div style={{fontSize:"38px",fontWeight:900,color:s.color,lineHeight:1}}>
                {s.val!==null ? `${s.val}d` : "—"}
              </div>
            </div>
          ))}
        </div>
        <button onClick={onClose} style={{
          width:"100%",padding:"14px",background:"#1e1e24",border:"1px solid #333338",
          borderRadius:"10px",color:"#e2e8f0",fontFamily:"monospace",fontSize:"11px",
          letterSpacing:".1em",textTransform:"uppercase",cursor:"pointer",transition:"background .15s",
        }}
          onMouseOver={e=>(e.target as HTMLElement).style.background="#28282e"}
          onMouseOut={e=>(e.target as HTMLElement).style.background="#1e1e24"}
        >Fechar</button>
      </div>
    </div>
  )
}

function Lane({ maker, onNodeClick, onHover, onLeave }: {
  maker: string
  onNodeClick: (ev: EventItem) => void
  onHover: (e: React.MouseEvent, ev: EventItem) => void
  onLeave: () => void
}) {
  const mk = makerMap[maker]
  const evs = EVENTS.filter(e=>e.maker===maker)

  return (
    <div style={{marginBottom:"8px"}}>
      <div style={{
        fontSize:"11px",fontWeight:700,letterSpacing:".16em",textTransform:"uppercase",
        color:mk.accent,fontFamily:"monospace",marginBottom:"6px",
        display:"flex",alignItems:"center",gap:"8px",
      }}>
        <div style={{width:"8px",height:"8px",borderRadius:"50%",background:mk.accent}}/>
        {maker}
      </div>
      <div style={{
        position:"relative",height:"108px",background:"#0d0d10",
        border:"1px solid #1e1e24",borderRadius:"10px",marginBottom:"24px",
      }}>
        <div style={{
          position:"absolute",top:"50%",left:"12px",right:"12px",
          height:"2px",transform:"translateY(-50%)",
          background:`linear-gradient(to right, transparent, ${mk.track} 6%, ${mk.track} 94%, transparent)`,
        }}/>
        {evs.map((ev,i)=>{
          const left = toPct(ev.date)
          const isToday = ev.date===TODAY
          const above = i%2===0
          return (
            <div key={ev.id} style={{
              position:"absolute",left:`${left}%`,top:"50%",
              transform:"translate(-50%,-50%)",zIndex:10,
            }}>
              {above && (
                <div style={{
                  position:"absolute",bottom:"calc(100% + 8px)",left:"50%",
                  transform:"translateX(-50%)",whiteSpace:"nowrap",textAlign:"center",pointerEvents:"none",
                }}>
                  <div style={{fontSize:"11px",fontWeight:700,color:isToday?"#fb923c":"#e2e8f0",lineHeight:1.2,marginBottom:"2px"}}>{ev.model}</div>
                  <div style={{fontSize:"9px",color:"#94a3b8",fontFamily:"monospace"}}>{fmtShort(ev.date)}</div>
                </div>
              )}
              <div
                onClick={()=>onNodeClick(ev)}
                onMouseEnter={e=>onHover(e,ev)}
                onMouseMove={e=>onHover(e,ev)}
                onMouseLeave={onLeave}
                style={{
                  width:"32px",height:"32px",borderRadius:"50%",
                  background:isToday?"#2c1306":mk.bg,
                  border:`2px solid ${isToday?"#fb923c":mk.accent}`,
                  display:"flex",alignItems:"center",justifyContent:"center",
                  cursor:"pointer",transition:"transform .2s cubic-bezier(.34,1.56,.64,1), box-shadow .2s",
                  position:"relative",zIndex:2,
                  animation:isToday?"todayPulse 2s ease infinite":"none",
                }}
                onMouseOver={e=>{
                  (e.currentTarget as HTMLElement).style.transform="scale(1.5)";
                  (e.currentTarget as HTMLElement).style.boxShadow=`0 0 20px ${mk.accent}88`;
                  (e.currentTarget as HTMLElement).style.zIndex="20";
                }}
                onMouseOut={e=>{
                  (e.currentTarget as HTMLElement).style.transform="scale(1)";
                  (e.currentTarget as HTMLElement).style.boxShadow="none";
                  (e.currentTarget as HTMLElement).style.zIndex="2";
                }}
              >
                <div style={{width:"12px",height:"12px",borderRadius:"50%",background:isToday?"#fb923c":mk.accent}}/>
                {isToday&&(
                  <div style={{
                    position:"absolute",top:"-13px",right:"-24px",
                    fontSize:"7px",fontWeight:800,letterSpacing:".06em",
                    color:"#fb923c",background:"#2c1306",
                    border:"1px solid #7c3010",borderRadius:"4px",
                    padding:"1px 5px",whiteSpace:"nowrap",fontFamily:"monospace",
                  }}>● HOJE</div>
                )}
              </div>
              {!above && (
                <div style={{
                  position:"absolute",top:"calc(100% + 8px)",left:"50%",
                  transform:"translateX(-50%)",whiteSpace:"nowrap",textAlign:"center",pointerEvents:"none",
                }}>
                  <div style={{fontSize:"11px",fontWeight:700,color:isToday?"#fb923c":"#e2e8f0",lineHeight:1.2,marginBottom:"2px"}}>{ev.model}</div>
                  <div style={{fontSize:"9px",color:"#94a3b8",fontFamily:"monospace"}}>{fmtShort(ev.date)}</div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function TimelineLLMsContent() {
  const [filter, setFilter]  = useState("all")
  const [modal,  setModal]   = useState<EventItem | null>(null)
  const [hov,    setHov]     = useState<{ ev: EventItem | null, pos: {x:number,y:number} | null }>({ ev:null, pos:null })
  const boardRef = useRef<HTMLDivElement>(null)
  const ticks = getMonthTicks()

  useEffect(()=>{
    const el = boardRef.current
    if (!el) return
    const h = (e: WheelEvent) => { if(e.deltaY!==0){e.preventDefault();el.scrollLeft+=e.deltaY*2} }
    el.addEventListener("wheel",h,{passive:false})
    return ()=>el.removeEventListener("wheel",h)
  },[])

  useEffect(()=>{
    const h = (e: KeyboardEvent) => { if(e.key==="Escape"){ setModal(null) } }
    window.addEventListener("keydown",h)
    return ()=>window.removeEventListener("keydown",h)
  },[])

  const handleHover  = (e: React.MouseEvent, ev: EventItem) => setHov({ ev, pos:{x:e.clientX,y:e.clientY} })
  const handleLeave  = () => setHov({ ev:null, pos:null })
  const handleClick  = (ev: EventItem) => { setHov({ev:null,pos:null}); setModal(ev) }

  const visibleMakers = filter==="all" ? MAKERS : MAKERS.filter(m=>m.name===filter)

  return (
    <div style={{ color:"#e2e8f0", fontFamily:"system-ui,sans-serif" }}>
      {/* Controls row */}
      <div style={{display:"flex",alignItems:"center",gap:"20px",flexWrap:"wrap",marginBottom:"20px"}}>
        <div style={{display:"flex",gap:"18px",flexWrap:"wrap"}}>
          {MAKERS.map(m=>(
            <div key={m.name} style={{display:"flex",alignItems:"center",gap:"7px"}}>
              <div style={{width:"10px",height:"10px",borderRadius:"50%",background:m.accent,flexShrink:0}}/>
              <span style={{fontSize:"12px",color:"#cbd5e1",fontWeight:600}}>{m.name}</span>
            </div>
          ))}
        </div>
        <div style={{
          display:"flex",gap:"3px",background:"#111115",border:"1px solid #222228",
          borderRadius:"10px",padding:"3px",
        }}>
          {["all","OpenAI","Google","Anthropic"].map(k=>(
            <button key={k} onClick={()=>setFilter(k)} style={{
              background:filter===k?"#222228":"none",
              border:filter===k?"1px solid #333338":"1px solid transparent",
              cursor:"pointer",color:filter===k?"#f8fafc":"#94a3b8",
              fontFamily:"monospace",fontSize:"10px",letterSpacing:".08em",textTransform:"uppercase",
              padding:"6px 14px",borderRadius:"7px",transition:"all .15s",fontWeight:600,
            }}>{k==="all"?"Todos":k}</button>
          ))}
        </div>
      </div>

      {/* Board */}
      <div ref={boardRef} style={{
        background:"#0c0c0f",border:"1px solid #1e1e28",borderRadius:"16px",
        padding:"28px 32px 20px",overflowX:"auto",
      }}>
        <div style={{minWidth:"1100px"}}>
          <div style={{
            position:"relative",height:"20px",marginBottom:"24px",
            borderBottom:"1px solid #1e1e28",
          }}>
            {ticks.map((t,i)=>(
              <div key={i} style={{
                position:"absolute",left:`${t.pct}%`,transform:"translateX(-50%)",
                fontSize:"9px",fontFamily:"monospace",color:"#64748b",
                letterSpacing:".1em",textTransform:"uppercase",whiteSpace:"nowrap",fontWeight:600,
              }}>{t.label}</div>
            ))}
          </div>
          {visibleMakers.map(m=>(
            <Lane key={m.name} maker={m.name} onNodeClick={handleClick} onHover={handleHover} onLeave={handleLeave} />
          ))}
          <div style={{
            textAlign:"right",fontSize:"10px",color:"#475569",fontFamily:"monospace",marginTop:"4px",
          }}>
            {EVENTS.filter(e=>filter==="all"||e.maker===filter).length} lançamentos no período
          </div>
        </div>
      </div>

      <div style={{
        marginTop:"16px",textAlign:"center",fontSize:"11px",color:"#64748b",fontFamily:"monospace",
      }}>
        Scroll horizontal com roda do mouse · Hover para preview · Clique para detalhes completos
      </div>

      <HoverCard ev={hov.ev} pos={hov.pos} />
      {modal && <Modal ev={modal} onClose={()=>setModal(null)} />}
    </div>
  )
}

export default function TimelineLLMs() {
  return (
    <Section id="timeline-llms" title="Timeline de Lançamentos de IA" subtitle="A corrida dos modelos: Mar 2025 → Mar 2026" dark>
      <TimelineLLMsContent />
    </Section>
  )
}
