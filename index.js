/* ── Data (mirrored from portfolio.jsx) ───────────── */
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
  { t: "22:19:33", lvl: "OK",   msg: "india-innovates: finalist — Bharat Mandapam, New Delhi" },
  { t: "22:19:35", lvl: "WARN", msg: "kubesense: multi-node SSH fallback routing — edge case under review" },
  { t: "22:19:37", lvl: "OK",   msg: "smart-india-hackathon: agrisense — semi-finalist" },
  { t: "22:19:39", lvl: "INFO", msg: "amplify-ctf: full-stack CTF infra deployed — scoring logic, live monitoring" },
  { t: "22:19:41", lvl: "INFO", msg: "rcc-talkies: research wing — feature articles on emerging tech" },
  { t: "22:19:43", lvl: "OK",   msg: "scholarship: swami-vivekananda-merit — 2024, 2025" },
];

const METRICS = [
  { label: "Repos",                value: "Joydeep2005Banik", type: "text" },
  { label: "Stack breadth",        pct: 68, color: "emerald",  type: "spark" },
  { label: "Infra (K8s/Kafka/Docker)", pct: 74, color: "cyan", type: "spark" },
  { label: "Applied ML/RAG",       pct: 80, color: "fuchsia",  type: "spark" },
  { label: "Internships",          value: "2",                 type: "text" },
  { label: "Hackathon results",    value: "2",                 type: "text" },
];

const GITHUB_USERNAME = "Joydeep2005Banik";

/* ── State ────────────────────────────────────────── */
let selectedIndex = 2; // default: sovereign-bharat
let aiVisible = true;
let uptimeSeconds = 0;
let contactOpen = false;
let resumeOpen = false;
let gitData = null; // populated after fetch

/* ── DOM Refs ─────────────────────────────────────── */
const $ = (id) => document.getElementById(id);
const projectListEl = $("project-list");
const detailPaneEl  = $("detail-pane");
const metricsGridEl = $("metrics-grid");
const aiInsightEl   = $("ai-insight");
const aiToggle      = $("ai-toggle-header");
const logPaneEl     = $("log-pane");
const uptimeEl      = $("uptime");
const clockEl       = $("clock");
const focusSpark    = $("focus-spark");
const contactModal  = $("contact-modal");
const resumeModal   = $("resume-modal");
const cmdbar        = $("cmdbar");
const gitHeatmapEl  = $("git-heatmap");
const gitRecentEl   = $("git-recent");
const gitStatusEl   = $("git-status");

/* ── Helpers ──────────────────────────────────────── */
function buildSparkline(pct, colorClass) {
  const bars = 14;
  const filled = Math.round((pct / 100) * bars);
  return `<span class="sparkline ${colorClass}">${"█".repeat(filled)}<span class="dim">${"░".repeat(bars - filled)}</span></span>`;
}

function statusBadge(status) {
  const cls = status === "OK" ? "ok" : status === "WARN" ? "warn" : "err";
  const sym = status === "OK" ? "OK" : status === "WARN" ? "!!" : "XX";
  return `<span class="status-badge ${cls}">${sym}</span>`;
}

function levelClass(lvl) {
  if (lvl === "ERR")  return "err";
  if (lvl === "WARN") return "warn";
  if (lvl === "OK")   return "ok";
  return "info";
}

function fmtUptime(s) {
  const h   = Math.floor(s / 3600);
  const m   = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return `${h}h ${m}m ${sec}s`;
}

function nowTimeStr() {
  return new Date().toLocaleTimeString("en-GB", { hour12: false });
}

/* ── Render: Project List ─────────────────────────── */
function renderProjectList() {
  projectListEl.innerHTML = PROJECTS.map((p, i) => `
    <li class="project-item ${i === selectedIndex ? "active" : ""}"
        data-index="${i}"
        id="project-item-${i}"
        tabindex="0"
        role="option"
        aria-selected="${i === selectedIndex}">
      <span class="left">
        ${statusBadge(p.status)}
        <span class="project-name">${p.name}</span>
      </span>
      <span class="project-status-label">${p.statusLabel}</span>
    </li>
  `).join("");

  // Click handlers
  projectListEl.querySelectorAll(".project-item").forEach((el) => {
    el.addEventListener("click", () => {
      selectedIndex = parseInt(el.dataset.index, 10);
      renderProjectList();
      renderDetail();
      renderAI();
    });
  });
}

/* ── Render: Detail Pane ──────────────────────────── */
function renderDetail() {
  const p = PROJECTS[selectedIndex];
  detailPaneEl.innerHTML = `
    <div class="detail-row"><span class="label">Name:</span> <span class="val bold">${p.name}</span></div>
    <div class="detail-row"><span class="label">Ref:</span> <span class="val cyan">${p.ip}</span></div>
    <div class="detail-row"><span class="label">Node:</span> <span class="val">${p.node}</span></div>
    <div class="detail-row"><span class="label">Namespace:</span> <span class="val fuchsia">${p.ns}</span></div>
    <div class="detail-row detail-status">
      <span class="label">Status:</span> ${statusBadge(p.status)} <span class="val">(${p.statusLabel})</span>
    </div>
    <div class="stack-tags">${p.stack.map((s) => `<span class="tag">${s}</span>`).join("")}</div>
    <p class="detail-summary">${p.summary}</p>
  `;
  // Re-trigger animation
  detailPaneEl.style.animation = "none";
  detailPaneEl.offsetHeight; // force reflow
  detailPaneEl.style.animation = "";
}

/* ── Render: Metrics ──────────────────────────────── */
function renderMetrics() {
  metricsGridEl.innerHTML = METRICS.map((m) => `
    <div class="metric-label">${m.label}</div>
    <div class="metric-value">${m.type === "spark" ? buildSparkline(m.pct, m.color) : m.value}</div>
  `).join("");
}

/* ── GitHub: Fetch & Process ──────────────────────── */
async function fetchGitHubActivity() {
  gitStatusEl.textContent = "fetching…";
  gitHeatmapEl.innerHTML = '<div class="git-loading">▌ loading commit history…</div>';

  try {
    // 1. Fetch all public repos
    const reposRes = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=pushed`
    );
    if (!reposRes.ok) throw new Error(`GitHub API ${reposRes.status}`);
    const repos = await reposRes.json();

    // 2. For each repo, fetch commits from the last 90 days
    const since = new Date();
    since.setDate(since.getDate() - 84); // 12 weeks
    const sinceISO = since.toISOString();

    const commits = [];
    const dailyCounts = {};
    const repoCounts = {};

    // Fetch commits in parallel (limit to 15 most recently pushed repos to avoid rate limits)
    const recentRepos = repos.slice(0, 15);
    const commitFetches = recentRepos.map(async (repo) => {
      try {
        const res = await fetch(
          `https://api.github.com/repos/${GITHUB_USERNAME}/${repo.name}/commits?author=${GITHUB_USERNAME}&since=${sinceISO}&per_page=100`
        );
        if (!res.ok) return; // skip repos we can't read (forks with no commits, etc.)
        const repoCommits = await res.json();
        if (!Array.isArray(repoCommits)) return;

        repoCommits.forEach((c) => {
          const date = c.commit.author.date.split("T")[0];
          const msg = c.commit.message.split("\n")[0];
          commits.push({
            msg,
            repo: repo.name,
            date,
            time: c.commit.author.date,
            sha: c.sha.slice(0, 7),
          });
          dailyCounts[date] = (dailyCounts[date] || 0) + 1;
          repoCounts[repo.name] = (repoCounts[repo.name] || 0) + 1;
        });
      } catch (_) {
        // silently skip repos that error
      }
    });

    await Promise.all(commitFetches);

    // Sort commits by time descending
    commits.sort((a, b) => new Date(b.time) - new Date(a.time));

    // Build 12-week (84-day) daily map
    const today = new Date();
    const days = [];
    for (let i = 83; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const key = d.toISOString().split("T")[0];
      const dayOfWeek = d.getDay();
      days.push({ date: key, count: dailyCounts[key] || 0, dow: dayOfWeek });
    }

    // Stats
    const totalCommits = commits.length;
    const mostActiveRepo = Object.entries(repoCounts).sort((a, b) => b[1] - a[1])[0];
    const lastPush = commits.length > 0 ? commits[0].date : "—";

    // Current streak
    let streak = 0;
    for (let i = 0; i < 84; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const key = d.toISOString().split("T")[0];
      if (dailyCounts[key] && dailyCounts[key] > 0) streak++;
      else break;
    }

    gitData = {
      days,
      commits: commits.slice(0, 8),
      totalCommits,
      mostActiveRepo: mostActiveRepo ? mostActiveRepo[0] : "—",
      mostActiveCount: mostActiveRepo ? mostActiveRepo[1] : 0,
      lastPush,
      streak,
    };

    renderGitHeatmap();
    renderGitRecent();
    gitStatusEl.textContent = `${totalCommits} commits`;

    // Log it
    LOG_SEED.push({
      t: nowTimeStr(),
      lvl: "OK",
      msg: `github-sync: fetched ${totalCommits} commits across ${Object.keys(repoCounts).length} repos from ${GITHUB_USERNAME}`,
    });
    renderLogs();

  } catch (err) {
    gitStatusEl.textContent = "error";
    gitHeatmapEl.innerHTML = `<div class="git-error">⚠ ${err.message} — rate limit or network issue</div>`;
    LOG_SEED.push({
      t: nowTimeStr(),
      lvl: "WARN",
      msg: `github-sync: fetch failed — ${err.message}`,
    });
    renderLogs();
  }
}

/* ── Render: Git Heatmap ─────────────────────────── */
function renderGitHeatmap() {
  if (!gitData) return;
  const { days, totalCommits, mostActiveRepo, mostActiveCount, lastPush, streak } = gitData;

  // Find max for intensity scaling
  const maxCount = Math.max(1, ...days.map((d) => d.count));

  function cellLevel(count) {
    if (count === 0) return 0;
    const ratio = count / maxCount;
    if (ratio <= 0.25) return 1;
    if (ratio <= 0.5)  return 2;
    if (ratio <= 0.75) return 3;
    return 4;
  }

  // Group into weeks (columns)
  const weeks = [];
  let currentWeek = [];
  days.forEach((d, i) => {
    currentWeek.push(d);
    if (d.dow === 6 || i === days.length - 1) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  });

  // Stats row
  const statsHtml = `
    <div class="heatmap-stats">
      <span class="stat-label">Total commits</span>
      <span class="stat-value">${totalCommits}</span>
      <span class="stat-label">Current streak</span>
      <span class="stat-value">${streak}d</span>
      <span class="stat-label">Most active</span>
      <span class="stat-value">${mostActiveRepo}</span>
      <span class="stat-label">Last push</span>
      <span class="stat-value">${lastPush}</span>
    </div>
  `;

  // Heatmap grid
  const gridHtml = weeks.map((week) => {
    const cells = week.map(
      (d) => `<div class="heatmap-cell level-${cellLevel(d.count)}" title="${d.date}: ${d.count} commits"></div>`
    ).join("");
    return `<div class="heatmap-week">${cells}</div>`;
  }).join("");

  // Legend
  const legendHtml = `
    <div class="heatmap-legend">
      less
      <div class="heatmap-cell level-0"></div>
      <div class="heatmap-cell level-1"></div>
      <div class="heatmap-cell level-2"></div>
      <div class="heatmap-cell level-3"></div>
      <div class="heatmap-cell level-4"></div>
      more · 12 weeks
    </div>
  `;

  gitHeatmapEl.innerHTML = statsHtml + `<div class="heatmap-grid">${gridHtml}</div>` + legendHtml;
}

/* ── Render: Git Recent Commits ──────────────────── */
function renderGitRecent() {
  if (!gitData || gitData.commits.length === 0) {
    gitRecentEl.innerHTML = '';
    return;
  }

  const rows = gitData.commits.map((c, i) => {
    const timeAgo = formatTimeAgo(c.time);
    return `
      <div class="git-commit-row" style="animation-delay: ${i * 0.06}s">
        <span class="commit-time">${timeAgo}</span>
        <span class="commit-repo">${c.repo}</span>
        <span class="commit-msg">${escapeHtml(c.msg)}</span>
      </div>
    `;
  }).join("");

  gitRecentEl.innerHTML = `
    <div class="git-recent-title">recent commits</div>
    ${rows}
  `;
}

/* ── Helpers: Time Ago & Escape ───────────────────── */
function formatTimeAgo(isoStr) {
  const diff = Date.now() - new Date(isoStr).getTime();
  const mins  = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days  = Math.floor(diff / 86400000);
  if (mins < 60)  return `${mins}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

/* ── Render: AI Insight ───────────────────────────── */
function renderAI() {
  const p = PROJECTS[selectedIndex];
  aiInsightEl.innerHTML = `
    <div class="ai-card">
      <div class="ai-signal">[SIGNAL] role fit — backend / applied ML</div>
      <p class="ai-text">${p.insight}</p>
    </div>
  `;
  aiInsightEl.classList.toggle("visible", aiVisible);
}

/* ── Render: Log Pane ─────────────────────────────── */
function renderLogs() {
  logPaneEl.innerHTML = LOG_SEED.map((l, i) => `
    <div class="log-row" style="animation-delay: ${i * 0.05}s">
      <span class="log-time">[${l.t}]</span>
      <span class="log-level ${levelClass(l.lvl)}">${l.lvl}</span>
      <span class="log-msg">${l.msg}</span>
    </div>
  `).join("");
  logPaneEl.scrollTop = logPaneEl.scrollHeight;
}

/* ── Render: Focus Sparkline ──────────────────────── */
function renderFocusSpark() {
  focusSpark.innerHTML = buildSparkline(82, "cyan");
}

/* ── Clock & Uptime ───────────────────────────────── */
function tickClock() {
  clockEl.textContent = nowTimeStr();
}

function tickUptime() {
  uptimeSeconds++;
  uptimeEl.textContent = fmtUptime(uptimeSeconds);
}

/* ── Refresh Effect ───────────────────────────────── */
function doRefresh() {
  // Simulate a log refresh with a new timestamp
  const now = nowTimeStr();
  LOG_SEED.push({
    t: now,
    lvl: "INFO",
    msg: `metrics-refresh: dashboard data reloaded — ${PROJECTS.length} processes nominal`,
  });
  renderLogs();
  // Flash the metrics
  metricsGridEl.style.opacity = "0.4";
  requestAnimationFrame(() => {
    metricsGridEl.style.transition = "opacity 0.4s ease";
    metricsGridEl.style.opacity = "1";
  });
}

/* ── Modal Management ─────────────────────────────── */
function toggleContact() {
  contactOpen = !contactOpen;
  resumeOpen = false;
  contactModal.classList.toggle("visible", contactOpen);
  resumeModal.classList.remove("visible");
}

function toggleResume() {
  resumeOpen = !resumeOpen;
  contactOpen = false;
  resumeModal.classList.toggle("visible", resumeOpen);
  contactModal.classList.remove("visible");
}

function closeModals() {
  contactOpen = false;
  resumeOpen = false;
  contactModal.classList.remove("visible");
  resumeModal.classList.remove("visible");
}

/* ── Command Bar Flash ────────────────────────────── */
function flashKey(keyText) {
  const cmds = cmdbar.querySelectorAll(".cmd");
  cmds.forEach((cmd) => {
    const kbdEl = cmd.querySelector("kbd");
    if (kbdEl && kbdEl.textContent.trim().toUpperCase() === keyText.toUpperCase()) {
      cmd.classList.remove("flash");
      void cmd.offsetWidth; // reflow
      cmd.classList.add("flash");
      setTimeout(() => cmd.classList.remove("flash"), 350);
    }
  });
}

/* ── Keyboard Navigation ──────────────────────────── */
document.addEventListener("keydown", (e) => {
  // Close modals first
  if (e.key === "Escape") {
    closeModals();
    return;
  }

  // Don't capture when modal is open (except ESC)
  if (contactOpen || resumeOpen) return;

  const key = e.key.toLowerCase();

  switch (key) {
    case "arrowup":
    case "k":
      e.preventDefault();
      selectedIndex = (selectedIndex - 1 + PROJECTS.length) % PROJECTS.length;
      renderProjectList();
      renderDetail();
      renderAI();
      flashKey("↑↓");
      break;

    case "arrowdown":
    case "j":
      e.preventDefault();
      selectedIndex = (selectedIndex + 1) % PROJECTS.length;
      renderProjectList();
      renderDetail();
      renderAI();
      flashKey("↑↓");
      break;

    case "enter":
      e.preventDefault();
      renderDetail();
      renderAI();
      flashKey("ENTER");
      break;

    case "r":
      e.preventDefault();
      doRefresh();
      flashKey("R");
      break;

    case "a":
      e.preventDefault();
      aiVisible = !aiVisible;
      renderAI();
      flashKey("A");
      break;

    case "c":
      e.preventDefault();
      toggleContact();
      flashKey("C");
      break;

    case "q":
      e.preventDefault();
      toggleResume();
      flashKey("Q");
      break;
  }
});

/* ── AI Toggle Click ──────────────────────────────── */
aiToggle.addEventListener("click", () => {
  aiVisible = !aiVisible;
  renderAI();
});

/* ── Modal Overlay Click to Close ─────────────────── */
contactModal.addEventListener("click", (e) => {
  if (e.target === contactModal) closeModals();
});
resumeModal.addEventListener("click", (e) => {
  if (e.target === resumeModal) closeModals();
});

/* ── Simulated Log Stream ─────────────────────────── */
const RECURRING_LOGS = [
  { lvl: "INFO", msg: "healthcheck: all nodes responding — latency <2ms" },
  { lvl: "OK",   msg: "git-sync: upstream merged — 0 conflicts" },
  { lvl: "INFO", msg: "scheduler: next build queued — ETA 45s" },
  { lvl: "WARN", msg: "memory-watcher: heap usage 78% — gc triggered" },
  { lvl: "OK",   msg: "deploy: canary promoted — traffic shifted 100%" },
  { lvl: "INFO", msg: "cert-manager: TLS renewal — expires in 62d" },
  { lvl: "INFO", msg: "pod-autoscaler: scale-up — replicas 2 → 3" },
  { lvl: "OK",   msg: "backup: snapshot completed — integrity verified" },
];

let logStreamIndex = 0;
function streamLog() {
  const entry = RECURRING_LOGS[logStreamIndex % RECURRING_LOGS.length];
  logStreamIndex++;
  LOG_SEED.push({ t: nowTimeStr(), lvl: entry.lvl, msg: entry.msg });
  // Keep log pane manageable
  if (LOG_SEED.length > 50) LOG_SEED.splice(0, LOG_SEED.length - 50);
  renderLogs();
}

/* ── Boot Sequence ────────────────────────────────── */
function boot() {
  renderProjectList();
  renderDetail();
  renderMetrics();
  renderAI();
  renderLogs();
  renderFocusSpark();
  tickClock();

  // Fetch GitHub commit history
  fetchGitHubActivity();

  // Timers
  setInterval(tickClock, 1000);
  setInterval(tickUptime, 1000);
  // Stream a new log entry every 8–15 seconds for realism
  setInterval(streamLog, 8000 + Math.random() * 7000);
}

document.addEventListener("DOMContentLoaded", boot);
