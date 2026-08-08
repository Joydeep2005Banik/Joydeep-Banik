/* ═══════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════ */

const GITHUB_USERNAME = "Joydeep2005Banik";

const ABOUT = {
  name: "Hi! I am Joydeep Banik",
  title: "Backend Engineer / Applied ML & RAG Systems",
  bio: "Hi, I am Joydeep Banik, a Backend Engineer specializing in Applied ML and RAG Systems, distributed architectures, and MLOps. I design and engineer low-latency server infrastructures, streaming data pipelines, and applied AI systems. My experience spans architecting event-driven pipelines using Kafka, Graph-RAG, and Neo4j, building Kubernetes telemetry tooling, and optimizing computer vision processing pipelines. I focus on production reliability, clean object-oriented architecture, and scalable system design.",
};

const SKILLS = {
  "Languages": ["Python", "C++", "TypeScript", "Bash", "MATLAB"],
  "Backend & Database": ["Django", "Flask", "NodeJS", "MySQL", "SQLite", "SQL"],
  "ML/AI": ["TensorFlow", "PyTorch", "OpenCV"],
  "Infra & Tools": ["Kubernetes", "Docker", "Git"],
};

const EDUCATION = [
  {
    course: "Bachelor of Technology in Electronics and Communication Engineering",
    instituition: "RCC Institute of Information Technology",
    batch: "2023 - 2027",
  }
];

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
    name: "KubeSense",
    status: "OK", statusLabel: "RUNNING",
    ref: "kubectl::ctx", node: "local-cluster", ns: "devtools",
    stack: ["Python", "Textual", "Kubernetes", "SSH"],
    link: "https://github.com/Joydeep2005Banik/pod_monitor",
    summary: "KubeSense is an advanced, terminal-based user interface (TUI) application designed for real-time Kubernetes cluster monitoring and zero-GUI system diagnostics. The system features live container log tailing, multi-node SSH metric fallback routing, and passive AI-driven log parsing for dynamic anomaly detection—allowing administrators and developers to triage infrastructure incidents and evaluate pod telemetry seamlessly without relying on complex graphical interfaces.",
  },
  {
    id: "sovereign-bharat",
    name: "Sovereign Bharat Intelligence Graph",
    status: "OK", statusLabel: "RUNNING",
    ref: "neo4j::bolt", node: "graph-rag", ns: "data-infra",
    stack: ["Apache Kafka", "Neo4j", "Qdrant", "DSPy", "spaCy", "LangGraph", "Qwen 3", "Fast API", "BeautifulSoup", "Scrapy", "Docker", "Kubernetes"],
    link: "https://github.com/Joydeep2005Banik/Sovereign-Bharat-Intelligence-Graph--SBIG-",
    summary: "SBIG is a high-performance Global Ontology Engine designed to unify structured data, unstructured content, and live real-time feeds into a single, constantly updating intelligence graph. It serves as a strategic decision edge by linking disparate data points—from geopolitics and economics to climate and defense—into a connected map for early risk detection and scenario simulation. Selected as team finalist for India Innovates 2026"
  },
  {
    id: "agrisense",
    name: "AgriSense AI",
    status: "OK", statusLabel: "RUNNING",
    ref: "gee::landsat9", node: "sih-2025", ns: "remote-sensing",
    stack: ["Python", "GEE", "CNN", "K-Means"],
    link: "https://github.com/Joydeep2005Banik/AgriSenseAI",
    summary: "AgriSense AI is an automated satellite analytics platform engineered to eliminate manual crop-stress processing across multi-hectare farmland. Developed for Smart India Hackathon 2025, the system integrates a Google Earth Engine (GEE) and Python pipeline powered by CNN and K-Means algorithms to process Landsat 9 telemetry—allowing agricultural teams and field analysts to continuously detect vegetation stress and evaluate satellite data seamlessly through an interactive web dashboard.",
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
const skillsEl = $("skills-content");
const eduEl = $("education-content");
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
   RENDER — ABOUT & EDUCATION
   ═══════════════════════════════════════════════════ */
function renderAbout() {
  aboutEl.innerHTML = `
    <div class="about-name">${ABOUT.name}</div>
    <div class="about-title">${ABOUT.title}</div>
    <div class="about-bio">${ABOUT.bio}</div>`;
}

function renderSkills() {
  skillsEl.innerHTML = Object.entries(SKILLS).map(([cat, items]) => `
    <div class="skill-row">
      <span class="skill-cat">${cat}</span>
      <span class="skill-items">${items.join(" · ")}</span>
    </div>
  `).join("");
}

function renderEducation() {
  eduEl.innerHTML = EDUCATION.map(e => `
    <div class="about-title" style="color:var(--emerald-300);font-weight:bold">${e.instituition}</div>
    <div class="about-bio" style="color:var(--cyan-300)">${e.course}</div>
    <div class="about-bio">${e.batch}</div>
  `).join("");
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
    ${p.link ? `<div class="detail-row"><span class="label">Link:</span> <a href="${p.link}" target="_blank" rel="noopener" class="val cyan about-link">${p.link}</a></div>` : ""}
    <div class="detail-row" style="display: flex; align-items: center; gap: 0.75rem;">
      <span class="label">Stack:</span>
      <div class="stack-tags" style="padding-top: 0;">${p.stack.map(s => `<span class="tag">${s}</span>`).join("")}</div>
    </div>
    <p class="detail-summary">${p.summary}</p>
    ${p.bullets ? `<ul class="detail-bullets">${p.bullets.map(b => `<li>${esc(b)}</li>`).join("")}</ul>` : ""}
  `;
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
  renderSkills();
  renderEducation();
  renderProjList(); renderProjDet();
  renderExpList(); renderExpDet();
  syncFocus();
  tickClock(); setInterval(tickClock, 1000);
  fetchGit();
});
