import { useState, useEffect, useRef } from "react";
import { Terminal, GitCommit, Circle, Radio } from "lucide-react";

const PROJECTS = [
  {
    id: "video-dehazing-rag",
    name: "video-dehazing-rag",
    status: "WARN",
    statusLabel: "BUILDING",
    ip: "vae::latent",
    node: "jadavpur-research",
    ns: "ml-infra",
    stack: ["Python", "PyTorch", "VectorDB", "RAG"],
    summary:
      "End-to-end RAG pipeline mapping hazy frames into a latent vector space, using residual transformation and decoder synthesis to reconstruct clear video.",
    insight:
      "Retrieval-augmented generation applied outside text — signals ML systems range beyond chatbots. Strongest differentiator for AI/ML-adjacent backend roles.",
  },
  {
    id: "kubesense",
    name: "kubesense",
    status: "WARN",
    statusLabel: "BUILDING",
    ip: "kubectl::ctx",
    node: "local-cluster",
    ns: "devtools",
    stack: ["Python", "Textual", "Kubernetes", "SSH"],
    summary:
      "Real-time Kubernetes cluster monitor with dynamic log tailing, multi-node SSH metric fallback, and passive AI-driven log parsing for zero-GUI diagnostics.",
    insight:
      "Built the exact class of tool this portfolio imitates. Direct proof of infra fluency — Kubernetes, observability, terminal UX.",
  },
  {
    id: "sovereign-bharat",
    name: "sovereign-bharat-graph",
    status: "OK",
    statusLabel: "RUNNING",
    ip: "neo4j::bolt",
    node: "graph-rag",
    ns: "data-infra",
    stack: ["Neo4j", "Apache Kafka", "Gemma 3", "Python"],
    summary:
      "Real-time Graph-RAG pipeline combining a Neo4j knowledge graph with a decoupled Kafka ingestion layer and an LLM for context-aware strategic querying.",
    insight:
      "Kafka + graph DB + LLM in one pipeline. This is a backend-engineer-shaped project with an ML layer on top — exactly the fresher profile most JDs describe and few resumes prove.",
  },
  {
    id: "agrisense",
    name: "agrisense",
    status: "OK",
    statusLabel: "RUNNING",
    ip: "gee::landsat9",
    node: "sih-2025",
    ns: "remote-sensing",
    stack: ["Python", "GEE", "CNN", "K-Means"],
    summary:
      "Automated Landsat 9 satellite pipeline (CNN/K-Means) feeding an interactive dashboard, removing manual crop-stress analysis across multi-hectare farmland.",
    insight:
      "SIH 2025 semi-finalist. Shows applied CV under a hackathon deadline — evidence of shipping under constraints, not just building in isolation.",
  },
];

const LOG_SEED = [
  { t: "22:19:29", lvl: "INFO", msg: "jadavpur-research: RAG dehazing pipeline — frame latency optimization pass" },
  { t: "22:19:31", lvl: "INFO", msg: "haldia-petrochemicals: store mgmt system — role-based OOP inventory, unit tests green" },
  { t: "22:19:33", lvl: "OK", msg: "india-innovates: finalist — Bharat Mandapam, New Delhi" },
  { t: "22:19:35", lvl: "WARN", msg: "kubesense: multi-node SSH fallback routing — edge case under review" },
  { t: "22:19:37", lvl: "OK", msg: "smart-india-hackathon: agrisense — semi-finalist" },
  { t: "22:19:39", lvl: "INFO", msg: "amplify-ctf: full-stack CTF infra deployed — scoring logic, live monitoring" },
  { t: "22:19:41", lvl: "INFO", msg: "rcc-talkies: research wing — feature articles on emerging tech" },
  { t: "22:19:43", lvl: "OK", msg: "scholarship: swami-vivekananda-merit — 2024, 2025" },
];

function StatusDot({ status }) {
  const color =
    status === "OK" ? "text-emerald-400" : status === "WARN" ? "text-amber-400" : "text-red-400";
  const symbol = status === "OK" ? "OK" : status === "WARN" ? "!!" : "XX";
  return <span className={`${color} font-bold`}>{symbol}</span>;
}

function Sparkline({ pct, color }) {
  const bars = 14;
  const filled = Math.round((pct / 100) * bars);
  return (
    <span className={`${color} tracking-tighter`}>
      {"█".repeat(filled)}
      <span className="text-zinc-700">{"░".repeat(bars - filled)}</span>
    </span>
  );
}

export default function Portfolio() {
  const [now, setNow] = useState(new Date());
  const [uptimeSec, setUptimeSec] = useState(0);
  const [selected, setSelected] = useState(PROJECTS[2]);
  const [logs, setLogs] = useState(LOG_SEED);
  const [aiOn, setAiOn] = useState(true);
  const logRef = useRef(null);

  useEffect(() => {
    const clock = setInterval(() => setNow(new Date()), 1000);
    const up = setInterval(() => setUptimeSec((s) => s + 1), 1000);
    return () => {
      clearInterval(clock);
      clearInterval(up);
    };
  }, []);

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [logs]);

  const fmtUptime = (s) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${h}h ${m}m ${sec}s`;
  };

  const timeStr = now.toLocaleTimeString("en-GB", { hour12: false });

  const levelColor = (lvl) =>
    lvl === "ERR" ? "text-red-400" : lvl === "WARN" ? "text-amber-400" : lvl === "OK" ? "text-emerald-400" : "text-zinc-400";

  return (
    <div className="min-h-screen w-full bg-black text-emerald-400 font-mono text-[13px] flex items-center justify-center p-4">
      <div className="w-full max-w-5xl border border-emerald-900 rounded-md shadow-[0_0_40px_-10px_rgba(52,211,153,0.25)] overflow-hidden">
        {/* title bar */}
        <div className="flex items-center gap-2 bg-zinc-950 border-b border-emerald-900 px-3 py-2">
          <span className="w-3 h-3 rounded-full bg-red-500/80" />
          <span className="w-3 h-3 rounded-full bg-amber-500/80" />
          <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
          <span className="ml-3 text-zinc-400 text-xs flex items-center gap-1">
            <Terminal size={12} /> joydeep@portfolio: ~/careergraph
          </span>
        </div>

        {/* KPI bar */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-1 bg-zinc-950/60 border-b border-emerald-900/60 px-3 py-1.5 text-xs">
          <span className="text-zinc-500">UPTIME: <span className="text-emerald-300">{fmtUptime(uptimeSec)}</span></span>
          <span className="text-zinc-500">CGPA: <span className="text-emerald-300">6.77</span></span>
          <span className="text-zinc-500">PROJECTS: <span className="text-emerald-300">{PROJECTS.length} active</span></span>
          <span className="text-zinc-500 flex items-center gap-1">
            FOCUS: <Sparkline pct={82} color="text-cyan-400" /> <span className="text-cyan-300">RAG/backend</span>
          </span>
          <span className="text-zinc-500">HONORS: <span className="text-emerald-300">3</span></span>
          <span className="ml-auto text-zinc-400">{timeStr}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* process list */}
          <div className="border-r border-emerald-900/60 border-b md:border-b-0">
            <div className="px-3 py-1.5 text-[11px] text-zinc-500 border-b border-emerald-900/40">projects — enter select</div>
            <ul>
              {PROJECTS.map((p) => (
                <li
                  key={p.id}
                  onClick={() => setSelected(p)}
                  className={`px-3 py-2 flex items-center justify-between cursor-pointer border-b border-emerald-950 hover:bg-emerald-950/40 ${
                    selected.id === p.id ? "bg-emerald-950/60" : ""
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <StatusDot status={p.status} />
                    <span className="text-zinc-200">{p.name}</span>
                  </span>
                  <span className="text-zinc-500 text-[11px]">{p.statusLabel}</span>
                </li>
              ))}
            </ul>

            <div className="px-3 py-1.5 text-[11px] text-zinc-500 border-t border-b border-emerald-900/40">selected — detail</div>
            <div className="px-3 py-2 space-y-1">
              <div><span className="text-zinc-500">Name:</span> <span className="text-emerald-300 font-bold">{selected.name}</span></div>
              <div><span className="text-zinc-500">Ref:</span> <span className="text-cyan-300">{selected.ip}</span></div>
              <div><span className="text-zinc-500">Node:</span> <span className="text-emerald-300">{selected.node}</span></div>
              <div><span className="text-zinc-500">Namespace:</span> <span className="text-fuchsia-300">{selected.ns}</span></div>
              <div className="flex items-center gap-1">
                <span className="text-zinc-500">Status:</span> <StatusDot status={selected.status} />{" "}
                <span className="text-zinc-300">({selected.statusLabel})</span>
              </div>
              <div className="pt-1 flex flex-wrap gap-1">
                {selected.stack.map((s) => (
                  <span key={s} className="text-[11px] px-1.5 py-0.5 border border-emerald-800 text-emerald-300 rounded">
                    {s}
                  </span>
                ))}
              </div>
              <p className="text-zinc-400 text-[12px] pt-1 leading-relaxed">{selected.summary}</p>
            </div>
          </div>

          {/* right side: metrics + AI panel */}
          <div>
            <div className="px-3 py-1.5 text-[11px] text-zinc-500 border-b border-emerald-900/40 flex items-center justify-between">
              <span>metrics</span>
              <span className="text-zinc-600">r refresh</span>
            </div>
            <div className="px-3 py-2 grid grid-cols-2 gap-y-2 gap-x-4 text-[12px]">
              <div className="text-zinc-500">Repos</div>
              <div className="text-emerald-300 text-right">Joydeep2005Banik</div>
              <div className="text-zinc-500">Stack breadth</div>
              <div className="text-right"><Sparkline pct={68} color="text-emerald-400" /></div>
              <div className="text-zinc-500">Infra (K8s/Kafka/Docker)</div>
              <div className="text-right"><Sparkline pct={74} color="text-cyan-400" /></div>
              <div className="text-zinc-500">Applied ML/RAG</div>
              <div className="text-right"><Sparkline pct={80} color="text-fuchsia-400" /></div>
              <div className="text-zinc-500">Internships</div>
              <div className="text-emerald-300 text-right">2</div>
              <div className="text-zinc-500">Hackathon results</div>
              <div className="text-emerald-300 text-right">2</div>
            </div>

            <div
              onClick={() => setAiOn((v) => !v)}
              className="px-3 py-1.5 text-[11px] text-zinc-500 border-t border-b border-emerald-900/40 flex items-center justify-between cursor-pointer"
            >
              <span className="flex items-center gap-1"><Radio size={11} /> ai insight</span>
              <span className="text-zinc-600">a toggle</span>
            </div>
            {aiOn && (
              <div className="px-3 py-2 border-l-2 border-amber-500/60 bg-amber-500/5 mx-3 my-2">
                <div className="text-amber-400 text-[11px] font-bold mb-1">[SIGNAL] role fit — backend / applied ML</div>
                <p className="text-zinc-300 text-[12px] leading-relaxed">{selected.insight}</p>
              </div>
            )}

            <div className="px-3 py-1.5 text-[11px] text-zinc-500 border-t border-b border-emerald-900/40">activity log</div>
            <div ref={logRef} className="h-40 overflow-y-auto px-3 py-2 space-y-0.5 text-[11.5px] leading-relaxed">
              {logs.map((l, i) => (
                <div key={i} className="flex gap-2">
                  <span className="text-zinc-600 shrink-0">[{l.t}]</span>
                  <span className={`${levelColor(l.lvl)} shrink-0 w-9`}>{l.lvl}</span>
                  <span className="text-zinc-400">{l.msg}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* command bar */}
        <div className="flex flex-wrap gap-4 bg-cyan-950/40 border-t border-emerald-900 px-3 py-1.5 text-[11px]">
          <span className="text-cyan-200"><b>ENTER</b> select</span>
          <span className="text-cyan-200"><b>R</b> refresh</span>
          <span className="text-cyan-200"><b>A</b> toggle ai</span>
          <span className="text-cyan-200"><b>C</b> contact</span>
          <span className="text-cyan-200"><b>Q</b> resume</span>
        </div>
      </div>
    </div>
  );
}
