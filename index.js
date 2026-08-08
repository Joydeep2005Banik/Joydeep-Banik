/* ═══════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════ */

const GITHUB_USERNAME = "Joydeep2005Banik";

const ABOUT = {
  name: "Joydeep Banik",
  title: "B.Tech CSE · Jadavpur University Salt Lake · Batch 2027",
  bio: "Backend-leaning CS undergrad building at the intersection of infrastructure, applied ML, and retrieval-augmented systems. Most at home in Python, terminal UIs, and pipeline architecture.",
  links: [
    { label: "GitHub",   url: "https://github.com/Joydeep2005Banik",  text: "Joydeep2005Banik" },
    { label: "Email",    url: "mailto:joydeepbanik2005@gmail.com",     text: "joydeepbanik2005@gmail.com" },
    { label: "LinkedIn", url: "https://linkedin.com/in/joydeep-banik", text: "joydeep-banik" },
    { label: "Location", url: null,                                    text: "Kolkata, India" },
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
let projIdx    = 0;
let expIdx     = 0;
let focus      = "projects";   // "projects" | "experience"
let modalOpen  = false;
let gitData    = null;

/* ═══════════════════════════════════════════════════
   DOM
   ═══════════════════════════════════════════════════ */
const $ = (id) => document.getElementById(id);

const aboutEl     = $("about-content");
const projListEl  = $("project-list");
const projDetEl   = $("project-detail");
const expListEl   = $("experience-list");
const expDetEl    = $("experience-detail");
const gitEl       = $("git-heatmap");
const gitStatEl   = $("git-status");
const clockEl     = $("clock");
const resumeModal = $("resume-modal");
const cmdbar      = $("cmdbar");

const paneProjList = $("pane-proj-list");
const paneExpList  = $("pane-exp-list");

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

const GH_CACHE_KEY = "ghCache";
const GH_CACHE_TTL = 4 * 60 * 60 * 1000; // 4 hours in ms

async function fetchGit(force = false) {
  // 1. Try localStorage cache first
  if (!force) {
    try {
      const raw = localStorage.getItem(GH_CACHE_KEY);
      if (raw) {
        const cached = JSON.parse(raw);
        const age = Date.now() - cached.ts;
        if (age < GH_CACHE_TTL && cached.daily && cached.total != null) {
          applyGitData(cached.daily, cached.total);
          const mins = Math.floor(age / 60000);
          gitStatEl.textContent = `${cached.total} commits · cached ${mins < 60 ? mins + "m" : Math.floor(mins / 60) + "h"} ago`;
          return;
        }
      }
    } catch (_) { /* corrupt cache, continue to fetch */ }
  }

  // 2. Fetch from GitHub API
  gitStatEl.textContent = "fetching…";
  gitEl.innerHTML = '<div class="git-loading">▌ loading commit history…</div>';
  try {
    const rRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=pushed`);
    if (!rRes.ok) throw new Error(`API ${rRes.status}`);
    const repos = await rRes.json();

    const since = new Date(); since.setDate(since.getDate() - 84);
    const sinceISO = since.toISOString();
    const daily = {};
    let total = 0;

    await Promise.all(repos.slice(0, 15).map(async repo => {
      try {
        const r = await fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${repo.name}/commits?author=${GITHUB_USERNAME}&since=${sinceISO}&per_page=100`);
        if (!r.ok) return;
        const cs = await r.json();
        if (!Array.isArray(cs)) return;
        cs.forEach(c => {
          const d = c.commit.author.date.split("T")[0];
          daily[d] = (daily[d] || 0) + 1;
          total++;
        });
      } catch (_) {}
    }));

    // 3. Save to localStorage
    try {
      localStorage.setItem(GH_CACHE_KEY, JSON.stringify({ daily, total, ts: Date.now() }));
    } catch (_) { /* storage full or unavailable */ }

    applyGitData(daily, total);
    gitStatEl.textContent = `${total} commits · 12 weeks`;

  } catch (err) {
    // 4. On error, try to fall back to stale cache
    try {
      const raw = localStorage.getItem(GH_CACHE_KEY);
      if (raw) {
        const cached = JSON.parse(raw);
        if (cached.daily && cached.total != null) {
          applyGitData(cached.daily, cached.total);
          const age = Math.floor((Date.now() - cached.ts) / 60000);
          gitStatEl.textContent = `${cached.total} commits · stale cache (${age < 60 ? age + "m" : Math.floor(age / 60) + "h"})`;
          return;
        }
      }
    } catch (_) {}
    gitStatEl.textContent = "error";
    gitEl.innerHTML = `<div class="git-error">⚠ ${err.message} — try again later</div>`;
  }
}

/* Build gitData from daily counts and render */
function applyGitData(daily, total) {
  const today = new Date();
  const days = [];
  for (let i = 83; i >= 0; i--) {
    const d = new Date(today); d.setDate(d.getDate() - i);
    const k = d.toISOString().split("T")[0];
    days.push({ date: k, count: daily[k] || 0, dow: d.getDay() });
  }

  let streak = 0;
  for (let i = 0; i < 84; i++) {
    const d = new Date(today); d.setDate(d.getDate() - i);
    if (daily[d.toISOString().split("T")[0]]) streak++; else break;
  }

  const last = total > 0 ? days.filter(d => d.count).pop()?.date || "—" : "—";
  gitData = { days, total, streak, last };
  renderHeatmap();
}

/* ═══════════════════════════════════════════════════
   RENDER — HEATMAP
   ═══════════════════════════════════════════════════ */
function renderHeatmap() {
  if (!gitData) return;
  const { days, total, streak, last } = gitData;
  const mx = Math.max(1, ...days.map(d => d.count));
  const lvl = c => c === 0 ? 0 : c / mx <= .25 ? 1 : c / mx <= .5 ? 2 : c / mx <= .75 ? 3 : 4;

  const weeks = []; let wk = [];
  days.forEach((d, i) => { wk.push(d); if (d.dow === 6 || i === days.length - 1) { weeks.push(wk); wk = []; } });

  gitEl.innerHTML = `
    <div class="hm-stats">
      <span class="sl">Total commits</span><span class="sv">${total}</span>
      <span class="sl">Current streak</span><span class="sv">${streak}d</span>
      <span class="sl">Last push</span><span class="sv">${last}</span>
    </div>
    <div class="hm-grid">${weeks.map(w =>
      `<div class="hm-week">${w.map(d =>
        `<div class="hm-cell l${lvl(d.count)}" title="${d.date}: ${d.count} commits"></div>`
      ).join("")}</div>`
    ).join("")}</div>
    <div class="hm-legend">less
      <div class="hm-cell l0"></div><div class="hm-cell l1"></div>
      <div class="hm-cell l2"></div><div class="hm-cell l3"></div>
      <div class="hm-cell l4"></div>more · 12 weeks
    </div>`;
}

/* ═══════════════════════════════════════════════════
   CLOCK
   ═══════════════════════════════════════════════════ */
function tickClock() { clockEl.textContent = now(); }

/* ═══════════════════════════════════════════════════
   MODAL
   ═══════════════════════════════════════════════════ */
function toggleModal() { modalOpen = !modalOpen; resumeModal.classList.toggle("visible", modalOpen); }
function closeModal()  { modalOpen = false; resumeModal.classList.remove("visible"); }
resumeModal.addEventListener("click", e => { if (e.target === resumeModal) closeModal(); });

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
    case "q":
      e.preventDefault(); toggleModal(); flash("Q"); break;
  }
});

/* ═══════════════════════════════════════════════════
   BOOT
   ═══════════════════════════════════════════════════ */
document.addEventListener("DOMContentLoaded", () => {
  renderAbout();
  renderProjList(); renderProjDet();
  renderExpList();  renderExpDet();
  syncFocus();
  tickClock(); setInterval(tickClock, 1000);
  fetchGit();
});
