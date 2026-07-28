// Kaafila 2026 — shared event data.
// This is the single source of truth for the Events hub, the five category
// pages, and the event detail page. Replace with the real event list when
// it's confirmed — every page that lists or links to an event reads from
// this file, so nothing else needs to change.
//
// poster / detailsPdf / guidelinesPdf: leave as null until real files exist.
// Plain script (not a module) so it also works when pages are opened
// directly from disk via file://, where module scripts are blocked by CORS.

const KAAFILA_CATEGORIES = {
  music:   { label: "Music",        page: "music.html",         thread: "#8b4441", tagline: "Explore the music events of Kaafila" },
  dance:   { label: "Dance",        page: "dance.html",         thread: "#e0993d", tagline: "Explore the dance events of Kaafila" },
  visual:  { label: "Visual Arts",  page: "visual-arts.html",   thread: "#5c7a63", tagline: "Explore the visual arts events of Kaafila" },
  theatre: { label: "Theatre",      page: "theatre.html",       thread: "#4a3428", tagline: "Explore the theatre events of Kaafila" }
};

const KAAFILA_EVENTS = [
  {
    id: "waveline-sound-art",
    title: "Waveline (Sound Art)",
    subtitle: "",
    category: "music",
    date: "22nd August",
    description: "An open sound-art showcase — original compositions, found-sound pieces, and live mixing. Open to solo acts and bands.",
    poster: null,
    detailsPdf: null,
    guidelinesPdf: null
  },
  {
    id: "solo-singing",
    title: "Solo Singing",
    subtitle: "",
    category: "music",
    date: "22nd August",
    description: "Solo vocal performances, any genre or language, 2–3 minutes.",
    poster: null,
    detailsPdf: null,
    guidelinesPdf: null
  },
  {
    id: "western-group-dance",
    title: "Western Group Dance",
    subtitle: "Rhythm Ringers",
    category: "dance",
    date: "24th August",
    description: "Group choreography, 4–12 dancers, 4–6 minute sets. Judged on synchrony, formation, and stage presence.",
    poster: null,
    detailsPdf: null,
    guidelinesPdf: null
  },
  {
    id: "contemporary-dance",
    title: "Contemporary Dance",
    subtitle: "",
    category: "dance",
    date: "24th August",
    description: "Solo and duet contemporary pieces exploring the Tanahbana theme through movement.",
    poster: null,
    detailsPdf: null,
    guidelinesPdf: null
  },
  {
    id: "folk-dance",
    title: "Folk Dance",
    subtitle: "",
    category: "dance",
    date: "24th August",
    description: "Traditional folk forms from across regions, performed in costume with live or recorded accompaniment.",
    poster: null,
    detailsPdf: null,
    guidelinesPdf: null
  },
  {
    id: "solo-dance",
    title: "Solo Dance",
    subtitle: "",
    category: "dance",
    date: "24th August",
    description: "Open-style solo dance, any genre, 2–3 minutes. Judged on technique and expression.",
    poster: null,
    detailsPdf: null,
    guidelinesPdf: null
  },
  {
    id: "canvas-painting",
    title: "Canvas Painting",
    subtitle: "",
    category: "visual",
    date: "23rd August",
    description: "Live, on-the-spot canvas painting judged for technique and interpretation of the Tanahbana theme.",
    poster: null,
    detailsPdf: null,
    guidelinesPdf: null
  },
  {
    id: "on-the-spot-sketching",
    title: "On-the-Spot Sketching",
    subtitle: "",
    category: "visual",
    date: "23rd August",
    description: "Timed sketching challenge responding to a prompt revealed on the day.",
    poster: null,
    detailsPdf: null,
    guidelinesPdf: null
  },
  {
    id: "short-film",
    title: "Short Film",
    subtitle: "",
    category: "theatre",
    date: "22nd August",
    description: "Student-directed short films, 5–8 minutes, screened to the full house and judged on story, craft, and performance.",
    poster: null,
    detailsPdf: null,
    guidelinesPdf: null
  },
  {
    id: "nukkad-natak",
    title: "Nukkad Natak (Street Play)",
    subtitle: "",
    category: "theatre",
    date: "23rd August",
    description: "Short-form street theatre performed without a formal stage, judged on message and audience engagement.",
    poster: null,
    detailsPdf: null,
    guidelinesPdf: null
  }
];
