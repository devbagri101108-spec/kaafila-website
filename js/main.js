// Kaafila 2026 — shared site behaviour
// Depends on js/events-data.js being loaded first on pages that use it
// (category pages and the event detail page).

document.addEventListener("DOMContentLoaded", () => {
  renderCategoryPage();
  renderEventPage();
  initNav();
  initFilters();
  initGallery();
  initContactForm();
  initReadMore();
  initScrollReveal();
});

/* Mobile nav toggle --------------------------------------------------- */
function initNav() {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (!toggle || !links) return;

  toggle.addEventListener("click", () => {
    const isOpen = links.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  links.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      links.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

/* Category filters (Gallery) -------------------------------------------- */
function initFilters() {
  document.querySelectorAll("[data-filter-group]").forEach((group) => {
    const buttons = group.querySelectorAll(".filter-btn");
    const targetSelector = group.dataset.filterGroup;
    const items = document.querySelectorAll(targetSelector);

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        buttons.forEach((b) => {
          b.classList.remove("is-active");
          b.setAttribute("aria-pressed", "false");
        });
        btn.classList.add("is-active");
        btn.setAttribute("aria-pressed", "true");

        const cat = btn.dataset.cat;
        let visibleCount = 0;

        items.forEach((item) => {
          const matches = cat === "all" || item.dataset.cat === cat;
          item.classList.toggle("is-hidden", !matches);
          if (matches) visibleCount++;
        });

        const emptyState = group
          .closest("section")
          ?.querySelector("[data-empty-state]");
        if (emptyState) {
          emptyState.hidden = visibleCount !== 0;
        }
      });
    });
  });
}

/* Gallery: same filter pattern already covered by initFilters, this only
   wires the "view" affordance if a lightbox class is present later. */
function initGallery() {
  // Reserved for lightbox behaviour once real photos are added.
}

/* Contact form ----------------------------------------------------------- */
function initContactForm() {
  const form = document.querySelector("[data-contact-form]");
  if (!form) return;
  const status = form.querySelector(".form-status");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    status.hidden = false;
    status.textContent =
      "This form isn't connected to a mail server yet — for now, please email kaafila@shivnadarschool.edu.in directly. (To activate this form, connect it to Formspree, Google Forms, or the school's mail service.)";
    form.reset();
  });
}

/* Home: "Read More" theme expander --------------------------------------- */
function initReadMore() {
  const btn = document.querySelector("[data-read-more]");
  const panel = document.querySelector("[data-read-more-panel]");
  if (!btn || !panel) return;

  btn.addEventListener("click", () => {
    const isOpen = panel.classList.toggle("is-open");
    btn.setAttribute("aria-expanded", String(isOpen));
    btn.textContent = isOpen ? "Read Less" : "Read More";
  });
}

/* -------------------------------------------------------------------------
   Woven poster placeholder — reused for gallery-style tiles, poster cards,
   and the full event poster until real artwork is uploaded.
   ------------------------------------------------------------------------- */
function posterPlaceholderSVG(hexColor) {
  return `
    <svg viewBox="0 0 200 150" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Poster placeholder">
      <rect width="200" height="150" fill="var(--band-surface)"/>
      <g stroke="${hexColor}" stroke-width="1" opacity="0.4">
        ${[15, 35, 55, 75, 95, 115, 135].map((y) => `<line x1="0" y1="${y}" x2="200" y2="${y}"/>`).join("")}
      </g>
      <g stroke="${hexColor}" stroke-width="1" opacity="0.25">
        ${[20, 45, 70, 95, 120, 145, 170].map((x) => `<line x1="${x}" y1="0" x2="${x}" y2="150"/>`).join("")}
      </g>
    </svg>`;
}

/* -------------------------------------------------------------------------
   Category page — renders poster grid for document.body.dataset.category
   ------------------------------------------------------------------------- */
function renderCategoryPage() {
  const category = document.body.dataset.category;
  if (!category || typeof KAAFILA_EVENTS === "undefined") return;

  const meta = KAAFILA_CATEGORIES[category];
  if (!meta) return;

  document.documentElement.style.setProperty("--thread-current", meta.thread);
  document.title = `${meta.label} | Kaafila 2026 — Shiv Nadar School`;

  const titleEl = document.querySelector("[data-category-title]");
  const taglineEl = document.querySelector("[data-category-tagline]");
  if (titleEl) titleEl.textContent = meta.label.toUpperCase();
  if (taglineEl) taglineEl.textContent = meta.tagline;

  const grid = document.querySelector("[data-poster-grid]");
  const emptyState = document.querySelector("[data-category-empty]");
  if (!grid) return;

  const events = KAAFILA_EVENTS.filter((ev) => ev.category === category);

  if (events.length === 0) {
    if (emptyState) emptyState.hidden = false;
    return;
  }

  grid.innerHTML = events
    .map(
      (ev) => `
      <a class="poster-card" href="event.html?id=${encodeURIComponent(ev.id)}">
        <span class="poster-art">${posterPlaceholderSVG(meta.thread)}</span>
        <span class="poster-info">
          <span class="poster-title">${ev.title}</span>
          ${ev.subtitle ? `<span class="poster-subtitle">${ev.subtitle}</span>` : ""}
        </span>
      </a>`
    )
    .join("");
}

/* -------------------------------------------------------------------------
   Event detail page — renders from ?id= query param
   ------------------------------------------------------------------------- */
function renderEventPage() {
  const root = document.querySelector("[data-event-page]");
  if (!root || typeof KAAFILA_EVENTS === "undefined") return;

  const id = new URLSearchParams(window.location.search).get("id");
  const event = KAAFILA_EVENTS.find((ev) => ev.id === id);
  const notFound = document.querySelector("[data-event-not-found]");
  const content = document.querySelector("[data-event-content]");

  if (!event) {
    if (content) content.hidden = true;
    if (notFound) notFound.hidden = false;
    return;
  }

  const meta = KAAFILA_CATEGORIES[event.category];
  document.documentElement.style.setProperty("--thread-current", meta.thread);
  document.title = `${event.title} | Kaafila 2026 — Shiv Nadar School`;

  const backLink = document.querySelector("[data-event-back]");
  if (backLink) {
    backLink.href = meta.page;
    backLink.textContent = `← Back to ${meta.label}`;
  }

  const titleEl = document.querySelector("[data-event-title]");
  if (titleEl) titleEl.textContent = event.title;

  const subtitleEl = document.querySelector("[data-event-subtitle]");
  if (subtitleEl) {
    subtitleEl.textContent = event.subtitle || "";
    subtitleEl.hidden = !event.subtitle;
  }

  const posterEl = document.querySelector("[data-event-poster]");
  if (posterEl) posterEl.innerHTML = posterPlaceholderSVG(meta.thread);

  const dateEl = document.querySelector("[data-event-date]");
  if (dateEl) dateEl.textContent = event.date;

  const descEl = document.querySelector("[data-event-description]");
  if (descEl) descEl.textContent = event.description;

  renderPdfButton("[data-event-details-pdf]", event.detailsPdf, "Event Details");
  renderPdfButton("[data-event-guidelines-pdf]", event.guidelinesPdf, "Event Guidelines");
}

function renderPdfButton(selector, url, label) {
  const el = document.querySelector(selector);
  if (!el) return;

  const icon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 3h9l4 4v14a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z"/><path d="M14 3v5h5"/></svg>`;

  if (url) {
    el.outerHTML = `<a class="pdf-btn" href="${url}" target="_blank" rel="noopener">${icon}<span class="pdf-label">${label}<span class="pdf-status">Download PDF</span></span></a>`;
  } else {
    el.outerHTML = `<span class="pdf-btn" role="button" aria-disabled="true">${icon}<span class="pdf-label">${label}<span class="pdf-status">Not uploaded yet</span></span></span>`;
  }
}

/* -------------------------------------------------------------------------
   Scroll reveal — progressive enhancement, respects prefers-reduced-motion.
   Grid children (category cards, poster cards, gallery tiles) fade + rise
   in with a small stagger as they enter the viewport. If JS or
   IntersectionObserver is unavailable, content simply stays visible —
   .reveal-pending is only ever added here, never present by default.
   ------------------------------------------------------------------------- */
function initScrollReveal() {
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  if (reduceMotion || !("IntersectionObserver" in window)) return;

  document.querySelectorAll("[data-reveal-group]").forEach((group) => {
    [...group.children].forEach((item, i) => {
      item.classList.add("reveal-pending");
      item.style.transitionDelay = `${Math.min(i, 6) * 40}ms`;
    });
  });

  const targets = document.querySelectorAll(".reveal-pending");
  if (!targets.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
  );

  targets.forEach((el) => observer.observe(el));
}
