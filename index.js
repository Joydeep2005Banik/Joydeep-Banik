/* ═══════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════ */

const GITHUB_USERNAME = "Joydeep2005Banik";

const ABOUT = {
  name: "Hi! I am Joydeep Banik",
  title: "Backend Engineer / Applied ML & RAG Systems",
  bio: "Hi, I am Joydeep Banik, a Backend Engineer specializing in Applied ML and RAG Systems, distributed architectures, and MLOps. I design and engineer low-latency server infrastructures, streaming data pipelines, and applied AI systems. My experience spans architecting event-driven pipelines using Kafka, Graph-RAG, and Neo4j, building Kubernetes telemetry tooling, and optimizing computer vision processing pipelines. I focus on production reliability, clean object-oriented architecture, and scalable system design.",
  links: [
    { label: "GitHub", url: "https://github.com/Joydeep2005Banik", text: "Joydeep2005Banik" },
    { label: "Email", url: "mailto:joydeepbanik2005@gmail.com", text: "joydeepbanik2005@gmail.com" },
    { label: "LinkedIn", url: "https://linkedin.com/in/joydeep-banik", text: "joydeep-banik" },
    { label: "Location", url: null, text: "Kolkata, India" },
  ],
  specs: ["Python", "PyTorch", "RAG", "Kubernetes", "Kafka", "Neo4j", "Docker", "FastAPI"],
};

const PROJECTS = [
  {
    id: "video-dehazing-rag",
    name: "video-dehazing-rag",
    status: "WARN", statusLabel: "BUILDING",
    ref: "vae::latent", node: "jadavpur-research", ns: "ml-infra",
    stack: ["Python", "PyTorch", "VectorDB", "RAG"],
    summary: "End-to-end RAG pipeline mapping hazy frames into a latent vector space, using residual transformation and decoder synthesis to reconstruct clear video.",
    bullets: [
      "Retrieval-augmented generation applied outside text",
      "Latent-space residual transformation for frame reconstruction",
      "Ongoing research project at Jadavpur University",
    ],
  },
  {
    id: "kubesense",
    name: "kubesense",
    status: "WARN", statusLabel: "BUILDING",
    ref: "kubectl::ctx", node: "local-cluster", ns: "devtools",
    stack: ["Python", "Textual", "Kubernetes", "SSH"],
    summary: "Real-time Kubernetes cluster monitor with dynamic log tailing, multi-node SSH metric fallback, and passive AI-driven log parsing for zero-GUI diagnostics.",
    bullets: [
      "TUI built with Textual for zero-GUI cluster observability",
      "Multi-node SSH fallback when kubectl metrics-server unavailable",
      "Passive AI-driven log parsing for anomaly detection",
    ],
  },
  {
    id: "sovereign-bharat",
    name: "sovereign-bharat-graph",
    status: "OK", statusLabel: "RUNNING",
    ref: "neo4j::bolt", node: "graph-rag", ns: "data-infra",
    stack: ["Neo4j", "Apache Kafka", "Gemma 3", "Python"],
    summary: "Real-time Graph-RAG pipeline combining a Neo4j knowledge graph with a decoupled Kafka ingestion layer and an LLM for context-aware strategic querying.",
    bullets: [
      "Kafka-decoupled ingestion into Neo4j knowledge graph",
      "Gemma 3 LLM for context-aware Cypher query generation",
      "Real-time graph traversal for strategic intelligence queries",
    ],
  },
  {
    id: "agrisense",
    name: "agrisense",
    status: "OK", statusLabel: "RUNNING",
    ref: "gee::landsat9", node: "sih-2025", ns: "remote-sensing",
    stack: ["Python", "GEE", "CNN", "K-Means"],
    summary: "Automated Landsat 9 satellite pipeline (CNN/K-Means) feeding an interactive dashboard, removing manual crop-stress analysis across multi-hectare farmland.",
    bullets: [
      "SIH 2025 semi-finalist project",
      "CNN + K-Means for automated crop stress classification",
      "Google Earth Engine integration for satellite imagery",
    ],
  },
];

const EXPERIENCES = [
  {
    id: "haldia",
    role: "IT Intern",
    org: "Haldia Petrochemicals Ltd",
    period: "2025",
    status: "OK", statusLabel: "COMPLETED",
    type: "internship",
    stack: ["Python", "OOP", "Unit Testing"],
    summary: "Designed and implemented a role-based OOP inventory management system with comprehensive unit testing and production-grade code quality.",
    bullets: [
      "Role-based access control across inventory workflows",
      "Comprehensive unit test suite for all business logic",
      "Production-grade Python with clean architecture patterns",
    ],
  },
  {
    id: "ju-research",
    role: "Research Assistant",
    org: "Jadavpur University",
    period: "2025 — Present",
    status: "WARN", statusLabel: "ONGOING",
    type: "research",
    stack: ["Python", "PyTorch", "RAG", "VectorDB"],
    summary: "Video dehazing research via retrieval-augmented generation — mapping hazy frames into latent vector space using residual transformation and decoder synthesis.",
    bullets: [
      "Novel application of RAG beyond text domains",
      "Latent-space residual transformation architecture",
      "Decoder synthesis for clear frame reconstruction",
    ],
  },
  {
    id: "amplify-ctf",
    role: "CTF Infrastructure Lead",
    org: "Amplify CTF",
    period: "2025",
    status: "OK", statusLabel: "DEPLOYED",
    type: "activity",
    stack: ["Full-stack", "Scoring Engine", "Monitoring"],
    summary: "Built full-stack Capture The Flag infrastructure including scoring logic, challenge deployment pipelines, and live monitoring dashboards.",
    bullets: [
      "End-to-end CTF platform architecture and deployment",
      "Real-time scoring engine with anti-cheat measures",
      "Live monitoring dashboard for event operations",
    ],
  },
  {
    id: "rcc-talkies",
    role: "Research Wing Member",
    org: "RCC Talkies",
    period: "2024 — Present",
    status: "OK", statusLabel: "ACTIVE",
    type: "activity",
    stack: ["Technical Writing", "Research"],
    summary: "Contributing feature articles on emerging technology trends for the university's research and communications wing.",
    bullets: [
      "Feature articles on ML, infrastructure, and emerging tech",
      "Technical writing for university research communications",
    ],
  },
];

/* ═══════════════════════════════════════════════════
   STATE
   ═══════════════════════════════════════════════════ */
let projIdx = 0;
let expIdx = 0;
let focus = "projects";   // "projects" | "experience"
let modalOpen = false;
let gitData = null;

/* ═══════════════════════════════════════════════════
   DOM
   ═══════════════════════════════════════════════════ */
const $ = (id) => document.getElementById(id);

const aboutEl = $("about-content");
const projListEl = $("project-list");
const projDetEl = $("project-detail");
const expListEl = $("experience-list");
const expDetEl = $("experience-detail");
const gitEl = $("git-heatmap");
const gitStatEl = $("git-status");
const clockEl = $("clock");
const resumeModal = $("resume-modal");
const contactModal = $("contact-modal");
const cmdbar = $("cmdbar");

const paneProjList = $("pane-proj-list");
const paneExpList = $("pane-exp-list");

/* ═══════════════════════════════════════════════════
   HELPERS
   ═══════════════════════════════════════════════════ */
function badge(s) {
  const c = s === "OK" ? "ok" : s === "WARN" ? "warn" : "err";
  const t = s === "OK" ? "OK" : s === "WARN" ? "!!" : "XX";
  return `<span class="status-badge ${c}">${t}</span>`;
}
function esc(s) { const d = document.createElement("div"); d.textContent = s; return d.innerHTML; }
function now() { return new Date().toLocaleTimeString("en-GB", { hour12: false }); }

function retrigger(el) {
  el.classList.remove("animate");
  void el.offsetHeight;
  el.classList.add("animate");
}

/* ═══════════════════════════════════════════════════
   RENDER — ABOUT
   ═══════════════════════════════════════════════════ */
function renderAbout() {
  const links = ABOUT.links.map(l =>
    l.url
      ? `<a href="${l.url}" target="_blank" rel="noopener" class="about-link">${l.label}: ${l.text}</a>`
      : `<span class="about-link" style="color:var(--emerald-300);cursor:default">${l.label}: ${l.text}</span>`
  ).join("");
  const tags = ABOUT.specs.map(s => `<span class="tag">${s}</span>`).join("");
  aboutEl.innerHTML = `
    <div class="about-name">${ABOUT.name}</div>
    <div class="about-title">${ABOUT.title}</div>
    <div class="about-links">${links}</div>
    <div class="about-spec">${tags}</div>
    <div class="about-bio">${ABOUT.bio}</div>`;
}

/* ═══════════════════════════════════════════════════
   RENDER — PROJECT LIST + DETAIL
   ═══════════════════════════════════════════════════ */
function renderProjList() {
  projListEl.innerHTML = PROJECTS.map((p, i) => `
    <li class="sel-row${i === projIdx ? " active" : ""}" data-i="${i}" data-list="proj">
      <span class="left">${badge(p.status)}<span class="sel-name">${p.name}</span></span>
      <span class="sel-sub">${p.statusLabel}</span>
    </li>`).join("");
  projListEl.querySelectorAll(".sel-row").forEach(el =>
    el.addEventListener("click", () => { focus = "projects"; projIdx = +el.dataset.i; renderProjList(); renderProjDet(); syncFocus(); })
  );
}

function renderProjDet() {
  const p = PROJECTS[projIdx];
  projDetEl.innerHTML = `
    <div class="detail-row"><span class="label">Name:</span> <span class="val bold">${p.name}</span></div>
    <div class="detail-row"><span class="label">Ref:</span> <span class="val cyan">${p.ref}</span></div>
    <div class="detail-row"><span class="label">Node:</span> <span class="val">${p.node}</span></div>
    <div class="detail-row"><span class="label">Namespace:</span> <span class="val fuchsia">${p.ns}</span></div>
    <div class="detail-row"><span class="label">Status:</span> ${badge(p.status)} <span class="val">(${p.statusLabel})</span></div>
    <div class="stack-tags">${p.stack.map(s => `<span class="tag">${s}</span>`).join("")}</div>
    <p class="detail-summary">${p.summary}</p>
    <ul class="detail-bullets">${p.bullets.map(b => `<li>${esc(b)}</li>`).join("")}</ul>`;
  retrigger(projDetEl);
}

/* ═══════════════════════════════════════════════════
   RENDER — EXPERIENCE LIST + DETAIL
   ═══════════════════════════════════════════════════ */
function renderExpList() {
  expListEl.innerHTML = EXPERIENCES.map((e, i) => `
    <li class="sel-row${i === expIdx ? " active" : ""}" data-i="${i}" data-list="exp">
      <span class="left">${badge(e.status)}<span class="sel-name">${e.org}</span></span>
      <span class="sel-sub">${e.role}</span>
    </li>`).join("");
  expListEl.querySelectorAll(".sel-row").forEach(el =>
    el.addEventListener("click", () => { focus = "experience"; expIdx = +el.dataset.i; renderExpList(); renderExpDet(); syncFocus(); })
  );
}

function renderExpDet() {
  const e = EXPERIENCES[expIdx];
  expDetEl.innerHTML = `
    <div class="detail-row"><span class="label">Role:</span> <span class="val bold">${e.role}</span></div>
    <div class="detail-row"><span class="label">Organization:</span> <span class="val cyan">${e.org}</span></div>
    <div class="detail-row"><span class="label">Period:</span> <span class="val amber">${e.period}</span></div>
    <div class="detail-row"><span class="label">Type:</span> <span class="val fuchsia">${e.type}</span></div>
    <div class="detail-row"><span class="label">Status:</span> ${badge(e.status)} <span class="val">(${e.statusLabel})</span></div>
    <div class="stack-tags">${e.stack.map(s => `<span class="tag">${s}</span>`).join("")}</div>
    <p class="detail-summary">${e.summary}</p>
    <ul class="detail-bullets">${e.bullets.map(b => `<li>${esc(b)}</li>`).join("")}</ul>`;
  retrigger(expDetEl);
}

/* ═══════════════════════════════════════════════════
   FOCUS SYNC
   ═══════════════════════════════════════════════════ */
function syncFocus() {
  paneProjList.classList.toggle("focused", focus === "projects");
  paneExpList.classList.toggle("focused", focus === "experience");
}

/* ═══════════════════════════════════════════════════
   GITHUB FETCH (jogruber.de API)
   ═══════════════════════════════════════════════════ */
const GH_CACHE_KEY = "ghCache";
const GH_CACHE_TTL = 4 * 60 * 60 * 1000; // 4 hours

async function fetchGit(force = false) {
  const graphYear = new Date().getFullYear();

  if (!force) {
    try {
      const raw = localStorage.getItem(GH_CACHE_KEY);
      if (raw) {
        const cached = JSON.parse(raw);
        if (Date.now() - cached.ts < GH_CACHE_TTL && cached.data?.contributions && cached.year === graphYear) {
          gitData = cached.data;
          renderHeatmap(graphYear);
          return;
        }
      }
    } catch (_) { }
  }

  gitStatEl.textContent = "fetching…";
  gitEl.innerHTML = '<div class="git-loading">▌ loading commit history…</div>';

  try {
    const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=${graphYear}`);
    if (!res.ok) throw new Error(`API ${res.status}`);
    const data = await res.json();

    try {
      localStorage.setItem(GH_CACHE_KEY, JSON.stringify({ data, year: graphYear, ts: Date.now() }));
    } catch (_) { }

    gitData = data;
    renderHeatmap(graphYear);

  } catch (err) {
    try {
      const raw = localStorage.getItem(GH_CACHE_KEY);
      if (raw) {
        const cached = JSON.parse(raw);
        if (cached.data?.contributions) {
          gitData = cached.data;
          renderHeatmap(cached.year);
          gitStatEl.textContent = "stale cache";
          return;
        }
      }
    } catch (_) { }
    gitStatEl.textContent = "error";
    gitEl.innerHTML = `<div class="git-error">⚠ ${err.message} — try again later</div>`;
  }
}

/* ═══════════════════════════════════════════════════
   RENDER — HEATMAP
   ═══════════════════════════════════════════════════ */
function renderHeatmap(graphYear) {
  if (!gitData || !gitData.contributions) return;

  const total = gitData.total?.[graphYear] ?? "—";
  gitStatEl.textContent = `${total} commits in ${graphYear}`;

  const LEVEL_COLORS = ["var(--zinc-800)", "#0e4429", "#006d32", "#26a641", "#39d353"];
  const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const WEEKDAY_ROWS = [
    { row: 1, label: "Mon" },
    { row: 3, label: "Wed" },
    { row: 5, label: "Fri" },
  ];

  const byDate = new Map(gitData.contributions.map((d) => [d.date, d]));
  const jan1 = new Date(graphYear, 0, 1);
  const dec31 = new Date(graphYear, 11, 31);
  const start = new Date(jan1);
  start.setDate(start.getDate() - start.getDay()); // back up to Sunday
  const end = new Date(dec31);
  end.setDate(end.getDate() + (6 - end.getDay())); // forward to Saturday

  const days = [];
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const iso = new Date(d).toISOString().slice(0, 10);
    const entry = byDate.get(iso);
    const inYear = d.getFullYear() === graphYear;
    days.push({
      date: iso,
      count: entry?.count ?? 0,
      level: inYear ? entry?.level ?? 0 : null,
      monthStart: inYear && d.getDate() === 1 ? d.getMonth() : null,
    });
  }

  const weeks = [];
  for (let i = 0; i < days.length; i += 7) weeks.push(days.slice(i, i + 7));

  const monthLabels = weeks.map((week) => {
    const hit = week.find((d) => d.monthStart !== null);
    return hit ? MONTH_NAMES[hit.monthStart] : "";
  });

  gitEl.innerHTML = `
    <div class="hm-wrapper">
      <div class="hm-header">
        <div class="hm-months">
          <div style="width:18px;flex-shrink:0;"></div>
          ${monthLabels.map(m => `<div class="hm-month">${m}</div>`).join("")}
        </div>
      </div>
      <div class="hm-body">
        <div class="hm-weekdays">
          ${Array.from({ length: 7 }).map((_, r) => {
    const w = WEEKDAY_ROWS.find(w => w.row === r);
    return `<div class="hm-weekday">${w ? w.label : ""}</div>`;
  }).join("")}
        </div>
        <div class="hm-grid">
          ${weeks.map(week => `
            <div class="hm-week">
              ${week.map(day => day.level === null
    ? `<div class="hm-cell" style="background:transparent;box-shadow:none"></div>`
    : `<div class="hm-cell l${day.level}" title="${day.date}: ${day.count} commits" style="background:${LEVEL_COLORS[day.level]}"></div>`
  ).join("")}
            </div>
          `).join("")}
        </div>
      </div>
      <div class="hm-footer">
        Less
        ${LEVEL_COLORS.map(c => `<div class="hm-cell" style="background:${c}"></div>`).join("")}
        More · 
      </div>
    </div>
  `;
}

/* ═══════════════════════════════════════════════════
   CLOCK
   ═══════════════════════════════════════════════════ */
function tickClock() { clockEl.textContent = now(); }

/* ═══════════════════════════════════════════════════
   MODAL
   ═══════════════════════════════════════════════════ */
function toggleResume() {
  modalOpen = !modalOpen;
  resumeModal.classList.toggle("visible", modalOpen);
}
function toggleContact() {
  modalOpen = !modalOpen;
  contactModal.classList.toggle("visible", modalOpen);
}
function closeModal() {
  modalOpen = false;
  resumeModal.classList.remove("visible");
  contactModal.classList.remove("visible");
}
resumeModal.addEventListener("click", e => { if (e.target === resumeModal) closeModal(); });
contactModal.addEventListener("click", e => { if (e.target === contactModal) closeModal(); });

/* ═══════════════════════════════════════════════════
   CMD BAR FLASH
   ═══════════════════════════════════════════════════ */
function flash(key) {
  cmdbar.querySelectorAll(".cmd").forEach(c => {
    const k = c.querySelector("kbd");
    if (k && k.textContent.trim().toUpperCase() === key.toUpperCase()) {
      c.classList.remove("flash"); void c.offsetWidth; c.classList.add("flash");
      setTimeout(() => c.classList.remove("flash"), 350);
    }
  });
}

/* ═══════════════════════════════════════════════════
   KEYBOARD
   ═══════════════════════════════════════════════════ */
document.addEventListener("keydown", e => {
  if (e.key === "Escape") { closeModal(); return; }
  if (modalOpen) return;

  switch (e.key.toLowerCase()) {
    case "tab":
      e.preventDefault();
      focus = focus === "projects" ? "experience" : "projects";
      syncFocus(); flash("TAB"); break;

    case "arrowleft":
      e.preventDefault(); focus = "projects"; syncFocus(); break;
    case "arrowright":
      e.preventDefault(); focus = "experience"; syncFocus(); break;

    case "arrowup": case "k":
      e.preventDefault();
      if (focus === "projects") {
        projIdx = (projIdx - 1 + PROJECTS.length) % PROJECTS.length;
        renderProjList(); renderProjDet();
      } else {
        expIdx = (expIdx - 1 + EXPERIENCES.length) % EXPERIENCES.length;
        renderExpList(); renderExpDet();
      }
      flash("↑↓"); break;

    case "arrowdown": case "j":
      e.preventDefault();
      if (focus === "projects") {
        projIdx = (projIdx + 1) % PROJECTS.length;
        renderProjList(); renderProjDet();
      } else {
        expIdx = (expIdx + 1) % EXPERIENCES.length;
        renderExpList(); renderExpDet();
      }
      flash("↑↓"); break;

    case "r":
      e.preventDefault(); fetchGit(true); flash("R"); break;
    case "c":
      e.preventDefault(); toggleContact(); flash("C"); break;
    case "q":
      e.preventDefault(); toggleResume(); flash("Q"); break;
  }
});

/* ═══════════════════════════════════════════════════
   BOOT
   ═══════════════════════════════════════════════════ */
document.addEventListener("DOMContentLoaded", () => {
  renderAbout();
  renderProjList(); renderProjDet();
  renderExpList(); renderExpDet();
  syncFocus();
  tickClock(); setInterval(tickClock, 1000);
  fetchGit();
});
