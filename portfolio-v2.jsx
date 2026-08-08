import { useState, useEffect, useRef, useCallback } from "react";
import { Terminal, Mail, Github, Linkedin, RefreshCw } from "lucide-react";

const PROJECTS = [
  {
    id: "video-dehazing-rag",
    name: "video-dehazing-rag",
    status: "WARN",
    statusLabel: "BUILDING",
    ref: "vae::latent",
    node: "jadavpur-research",
    ns: "ml-infra",
    stack: ["Python", "PyTorch", "VectorDB", "RAG"],
    summary:
      "End-to-end RAG pipeline mapping hazy frames into a latent vector space, using residual transformation and decoder synthesis to reconstruct clear video.",
  },
  {
    id: "kubesense",
    name: "kubesense",
    status: "WARN",
    statusLabel: "BUILDING",
    ref: "kubectl::ctx",
    node: "local-cluster",
    ns: "devtools",
    stack: ["Python", "Textual", "Kubernetes", "SSH"],
    summary:
      "Real-time Kubernetes cluster monitor with dynamic log tailing, multi-node SSH metric fallback, and passive AI-driven log parsing for zero-GUI diagnostics.",
  },
  {
    id: "sovereign-bharat-graph",
    name: "sovereign-bharat-graph",
    status: "OK",
    statusLabel: "RUNNING",
    ref: "neo4j::bolt",
    node: "graph-rag",
    ns: "data-infra",
    stack: ["Neo4j", "Apache Kafka", "Gemma 3", "Python"],
    summary:
      "Real-time Graph-RAG pipeline combining a Neo4j knowledge graph with a decoupled Kafka ingestion layer and an LLM for context-aware strategic querying.",
  },
  {
    id: "agrisense",
    name: "agrisense",
    status: "OK",
    statusLabel: "RUNNING",
    ref: "gee::landsat9",
    node: "sih-2025",
    ns: "remote-sensing",
    stack: ["Python", "GEE", "CNN", "K-Means"],
    summary:
      "Automated Landsat 9 satellite pipeline (CNN/K-Means) feeding an interactive dashboard, removing manual crop-stress analysis across multi-hectare farmland.",
  },
];

const EXPERIENCE = [
  {
    id: "haldia",
    role: "Information Systems Intern",
    org: "Haldia Petrochemicals Ltd.",
    dates: "Dec 2025 - Jan 2026",
    status: "OK",
    statusLabel: "DONE",
    bullets: [
      "Engineered an API-driven, role-based Store Management System in Python using OOP design",
      "Eliminated manual inventory errors, deploying unit-tested DB transactions across procurement, warehouse, logistics",
      "Audited a 3-layer network architecture, leveraging PRTG telemetry to accelerate incident triage",
    ],
  },
  {
    id: "jadavpur",
    role: "Research Intern",
    org: "Jadavpur University",
    dates: "May 2026 - Present",
    status: "OK",
    statusLabel: "ACTIVE",
    bullets: [
      "Architecting an end-to-end RAG framework for video dehazing, integrating feature retrieval pipelines",
      "Optimized a real-time CNN dehazing pipeline in Python, reducing frame latency via pre-processing and model acceleration",
    ],
  },
  {
    id: "amplify",
    role: "Event Coordinator",
    org: "Amplify, RCC Institute of Information Technology",
    dates: "Nov 2025",
    status: "OK",
    statusLabel: "DONE",
    bullets: [
      "Designed, deployed, and maintained a full-stack CTF infrastructure",
      "Handled server setup, challenge creation and validation, scoring logic, live system monitoring",
    ],
  },
  {
    id: "rcc-talkies",
    role: "Research Wing Member",
    org: "RCC Talkies",
    dates: "2024 - 2025",
    status: "OK",
    statusLabel: "DONE",
    bullets: [
      "Researched emerging technological trends for the college magazine",
      "Curated high-impact feature articles",
    ],
  },
];

const GITHUB_USERNAME = "Joydeep2005Banik";

function StatusDot({ status }) {
  const color =
    status === "OK" ? "text-emerald-400" : status === "WARN" ? "text-amber-400" : "text-red-400";
  const symbol = status === "OK" ? "OK" : status === "WARN" ? "!!" : "XX";
  return <span className={`${color} font-bold`}>{symbol}</span>;
}

function PaneHeader({ title, right, focused }) {
  return (
    <div
      className={`px-3 py-1.5 text-[11px] border-b flex items-center justify-between ${
        focused ? "border-cyan-700 text-cyan-300" : "border-emerald-900/40 text-zinc-500"
      }`}
    >
      <span>{title}</span>
      {right && <span className="text-zinc-600">{right}</span>}
    </div>
  );
}

function SelectableList({ items, selectedId, onSelect, focused, onFocus, renderRow }) {
  return (
    <ul tabIndex={0} onFocus={onFocus} onClick={onFocus} className="outline-none">
      {items.map((item) => (
        <li
          key={item.id}
          onClick={() => onSelect(item.id)}
          className={`px-3 py-2 flex items-center justify-between cursor-pointer border-b border-emerald-950 hover:bg-emerald-950/40 ${
            selectedId === item.id ? (focused ? "bg-cyan-950/50" : "bg-emerald-950/60") : ""
          }`}
        >
          {renderRow(item)}
        </li>
      ))}
    </ul>
  );
}

export default function Portfolio() {
  const [now, setNow] = useState(new Date());
  const [uptimeSec, setUptimeSec] = useState(0);
  const [selectedProject, setSelectedProject] = useState(PROJECTS[2].id);
  const [selectedExp, setSelectedExp] = useState(EXPERIENCE[0].id);
  const [focusedPane, setFocusedPane] = useState("projects"); // "projects" | "experience"
  const [contributions, setContributions] = useState(null);
  const [ghStatus, setGhStatus] = useState("loading"); // loading | ok | error

  const project = PROJECTS.find((p) => p.id === selectedProject);
  const exp = EXPERIENCE.find((e) => e.id === selectedExp);

  useEffect(() => {
    const clock = setInterval(() => setNow(new Date()), 1000);
    const up = setInterval(() => setUptimeSec((s) => s + 1), 1000);
    return () => {
      clearInterval(clock);
      clearInterval(up);
    };
  }, []);

  const graphYear = new Date().getFullYear();

  const fetchContributions = useCallback(async () => {
    setGhStatus("loading");
    try {
      const res = await fetch(
        `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=${graphYear}`
      );
      if (!res.ok) throw new Error("bad response");
      const data = await res.json();
      setContributions(data);
      setGhStatus("ok");
    } catch (e) {
      setGhStatus("error");
    }
  }, [graphYear]);

  useEffect(() => {
    fetchContributions();
  }, [fetchContributions]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Tab") {
        e.preventDefault();
        setFocusedPane((p) => (p === "projects" ? "experience" : "projects"));
        return;
      }
      if (e.key !== "ArrowUp" && e.key !== "ArrowDown") return;
      e.preventDefault();
      const dir = e.key === "ArrowDown" ? 1 : -1;
      if (focusedPane === "projects") {
        const idx = PROJECTS.findIndex((p) => p.id === selectedProject);
        const next = (idx + dir + PROJECTS.length) % PROJECTS.length;
        setSelectedProject(PROJECTS[next].id);
      } else {
        const idx = EXPERIENCE.findIndex((x) => x.id === selectedExp);
        const next = (idx + dir + EXPERIENCE.length) % EXPERIENCE.length;
        setSelectedExp(EXPERIENCE[next].id);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [focusedPane, selectedProject, selectedExp]);

  const fmtUptime = (s) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${h}h ${m}m ${sec}s`;
  };
  const timeStr = now.toLocaleTimeString("en-GB", { hour12: false });

  const LEVEL_COLORS = ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"];
  const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const WEEKDAY_ROWS = [
    { row: 1, label: "Mon" },
    { row: 3, label: "Wed" },
    { row: 5, label: "Fri" },
  ];

  // Build a GitHub-style Sun-Sat week grid for the full year, padded to full weeks.
  const yearWeeks = (() => {
    if (!contributions?.contributions) return [];
    const byDate = new Map(contributions.contributions.map((d) => [d.date, d]));
    const jan1 = new Date(graphYear, 0, 1);
    const dec31 = new Date(graphYear, 11, 31);
    const start = new Date(jan1);
    start.setDate(start.getDate() - start.getDay()); // back up to the preceding Sunday
    const end = new Date(dec31);
    end.setDate(end.getDate() + (6 - end.getDay())); // forward to the following Saturday

    const days = [];
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const iso = new Date(d).toISOString().slice(0, 10);
      const entry = byDate.get(iso);
      const inYear = d.getFullYear() === graphYear;
      days.push({
        date: iso,
        count: entry?.count ?? 0,
        level: inYear ? entry?.level ?? 0 : null, // null = padding cell, rendered transparent
        monthStart: inYear && d.getDate() === 1 ? d.getMonth() : null,
      });
    }

    const weeks = [];
    for (let i = 0; i < days.length; i += 7) weeks.push(days.slice(i, i + 7));
    return weeks;
  })();

  // Month label per column: label the week that contains the 1st of a month.
  const monthLabels = yearWeeks.map((week) => {
    const hit = week.find((d) => d.monthStart !== null);
    return hit ? MONTH_NAMES[hit.monthStart] : null;
  });

  return (
    <div className="min-h-screen w-full bg-black text-emerald-400 font-mono text-[13px] flex items-center justify-center p-4">
      <div className="w-full max-w-6xl border border-emerald-900 rounded-md shadow-[0_0_40px_-10px_rgba(52,211,153,0.25)] overflow-hidden">
        {/* title bar */}
        <div className="flex items-center gap-2 bg-zinc-950 border-b border-emerald-900 px-3 py-2">
          <span className="w-3 h-3 rounded-full bg-red-500/80" />
          <span className="w-3 h-3 rounded-full bg-amber-500/80" />
          <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
          <span className="ml-3 text-zinc-400 text-xs flex items-center gap-1">
            <Terminal size={12} /> joydeep@portfolio: ~/careergraph
          </span>
          <span className="ml-auto text-zinc-500 text-xs">{timeStr}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* TOP LEFT: About */}
          <div className="border-r border-b border-emerald-900/60">
            <PaneHeader title="about" right={`uptime ${fmtUptime(uptimeSec)}`} />
            <div className="px-3 py-3 space-y-2">
              <div className="text-emerald-300 font-bold text-base">Joydeep Banik</div>
              <div className="text-cyan-300 text-[12px]">Backend Engineer / Applied ML &amp; RAG Systems</div>
              <p className="text-zinc-400 text-[12px] leading-relaxed">
                Pre-final year ECE student building backend and RAG-based ML systems — Kubernetes, Kafka,
                graph databases, and retrieval pipelines.
              </p>
              <div className="flex flex-wrap gap-3 pt-1 text-[12px]">
                <a href="mailto:joydeepbanik41@gmail.com" className="flex items-center gap-1 text-zinc-400 hover:text-emerald-300">
                  <Mail size={12} /> email
                </a>
                <a href="https://github.com/Joydeep2005Banik" target="_blank" rel="noreferrer" className="flex items-center gap-1 text-zinc-400 hover:text-emerald-300">
                  <Github size={12} /> github
                </a>
                <a href="https://linkedin.com/in/joydeep-banik" target="_blank" rel="noreferrer" className="flex items-center gap-1 text-zinc-400 hover:text-emerald-300">
                  <Linkedin size={12} /> linkedin
                </a>
              </div>
            </div>
          </div>

          {/* TOP RIGHT: Experience list */}
          <div className="border-b border-emerald-900/60">
            <PaneHeader title="experience — ↑↓ navigate · enter select" focused={focusedPane === "experience"} />
            <SelectableList
              items={EXPERIENCE}
              selectedId={selectedExp}
              onSelect={setSelectedExp}
              focused={focusedPane === "experience"}
              onFocus={() => setFocusedPane("experience")}
              renderRow={(x) => (
                <>
                  <span className="flex items-center gap-2">
                    <StatusDot status={x.status} />
                    <span className="text-zinc-200">{x.role}</span>
                  </span>
                  <span className="text-zinc-500 text-[11px]">{x.statusLabel}</span>
                </>
              )}
            />
          </div>

          {/* MID LEFT: Projects list */}
          <div className="border-r border-b border-emerald-900/60">
            <PaneHeader title="projects — ↑↓ navigate · enter select" focused={focusedPane === "projects"} />
            <SelectableList
              items={PROJECTS}
              selectedId={selectedProject}
              onSelect={setSelectedProject}
              focused={focusedPane === "projects"}
              onFocus={() => setFocusedPane("projects")}
              renderRow={(p) => (
                <>
                  <span className="flex items-center gap-2">
                    <StatusDot status={p.status} />
                    <span className="text-zinc-200">{p.name}</span>
                  </span>
                  <span className="text-zinc-500 text-[11px]">{p.statusLabel}</span>
                </>
              )}
            />
          </div>

          {/* MID RIGHT: Experience detail */}
          <div className="border-b border-emerald-900/60">
            <PaneHeader title="experience detail" />
            <div className="px-3 py-2 space-y-1">
              <div><span className="text-zinc-500">Role:</span> <span className="text-emerald-300 font-bold">{exp.role}</span></div>
              <div><span className="text-zinc-500">Org:</span> <span className="text-cyan-300">{exp.org}</span></div>
              <div><span className="text-zinc-500">Dates:</span> <span className="text-zinc-300">{exp.dates}</span></div>
              <div className="flex items-center gap-1">
                <span className="text-zinc-500">Status:</span> <StatusDot status={exp.status} />{" "}
                <span className="text-zinc-300">({exp.statusLabel})</span>
              </div>
              <ul className="pt-1 space-y-1">
                {exp.bullets.map((b, i) => (
                  <li key={i} className="text-zinc-400 text-[12px] leading-relaxed">
                    <span className="text-emerald-600">›</span> {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* BOTTOM LEFT: Project detail */}
          <div className="border-r border-emerald-900/60">
            <PaneHeader title="project detail" />
            <div className="px-3 py-2 space-y-1">
              <div><span className="text-zinc-500">Name:</span> <span className="text-emerald-300 font-bold">{project.name}</span></div>
              <div><span className="text-zinc-500">Ref:</span> <span className="text-cyan-300">{project.ref}</span></div>
              <div><span className="text-zinc-500">Node:</span> <span className="text-emerald-300">{project.node}</span></div>
              <div><span className="text-zinc-500">Namespace:</span> <span className="text-fuchsia-300">{project.ns}</span></div>
              <div className="flex items-center gap-1">
                <span className="text-zinc-500">Status:</span> <StatusDot status={project.status} />{" "}
                <span className="text-zinc-300">({project.statusLabel})</span>
              </div>
              <div className="pt-1 flex flex-wrap gap-1">
                {project.stack.map((s) => (
                  <span key={s} className="text-[11px] px-1.5 py-0.5 border border-emerald-800 text-emerald-300 rounded">
                    {s}
                  </span>
                ))}
              </div>
              <p className="text-zinc-400 text-[12px] pt-1 leading-relaxed">{project.summary}</p>
            </div>
          </div>

          {/* BOTTOM RIGHT: Git commit graph (live) */}
          <div>
            <PaneHeader
              title="git commit history"
              right={
                <button onClick={fetchContributions} className="flex items-center gap-1 hover:text-emerald-300">
                  <RefreshCw size={11} /> refresh
                </button>
              }
            />
            <div className="px-3 py-3 overflow-x-auto">
              {ghStatus === "loading" && <div className="text-zinc-500 text-[12px]">fetching {GITHUB_USERNAME}…</div>}
              {ghStatus === "error" && (
                <div className="text-amber-400 text-[12px]">
                  could not reach github contributions api. retry with refresh.
                </div>
              )}
              {ghStatus === "ok" && contributions && (
                <div className="inline-block min-w-full">
                  <div className="text-[12px] text-zinc-300 mb-2">
                    {contributions.total?.[graphYear] ?? "—"} contributions in {graphYear}
                  </div>

                  <div className="flex">
                    {/* weekday labels */}
                    <div className="flex flex-col gap-[3px] mr-1.5 pt-[15px] shrink-0">
                      {Array.from({ length: 7 }).map((_, r) => {
                        const match = WEEKDAY_ROWS.find((w) => w.row === r);
                        return (
                          <div key={r} className="h-2.5 text-[9px] text-zinc-500 leading-none">
                            {match ? match.label : ""}
                          </div>
                        );
                      })}
                    </div>

                    <div>
                      {/* month labels */}
                      <div className="flex gap-[3px] mb-1">
                        {yearWeeks.map((_, wi) => (
                          <div key={wi} className="w-2.5 text-[9px] text-zinc-500 leading-none">
                            {monthLabels[wi] || ""}
                          </div>
                        ))}
                      </div>

                      {/* grid: columns = weeks, rows = weekday */}
                      <div className="flex gap-[3px]">
                        {yearWeeks.map((week, wi) => (
                          <div key={wi} className="flex flex-col gap-[3px]">
                            {week.map((day, di) => (
                              <div
                                key={di}
                                title={day.level === null ? undefined : `${day.date}: ${day.count} contributions`}
                                className="w-2.5 h-2.5 rounded-[2px]"
                                style={{
                                  backgroundColor: day.level === null ? "transparent" : LEVEL_COLORS[day.level],
                                }}
                              />
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-1 mt-2 text-[10px] text-zinc-500">
                    <span>Less</span>
                    {LEVEL_COLORS.map((c) => (
                      <div key={c} className="w-2.5 h-2.5 rounded-[2px]" style={{ backgroundColor: c }} />
                    ))}
                    <span>More</span>
                  </div>
                  <div className="text-[9px] text-zinc-700 mt-1">live via github-contributions-api.jogruber.de</div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* command bar */}
        <div className="flex flex-wrap gap-4 bg-cyan-950/40 border-t border-emerald-900 px-3 py-1.5 text-[11px]">
          <span className="text-cyan-200"><b>↑↓</b> navigate</span>
          <span className="text-cyan-200"><b>TAB</b> switch pane</span>
          <span className="text-cyan-200"><b>CLICK</b> select</span>
          <span className="text-cyan-200"><b>C</b> contact</span>
          <span className="text-cyan-200"><b>Q</b> resume</span>
        </div>
      </div>
    </div>
  );
}
