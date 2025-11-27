// ========= DATA =========

// Add your unlisted YouTube video IDs here
// Newest = first in this array
const videos = [
  // Example:
  // { id: "dQw4w9WgXcQ", title: "My Secret Video" },
  { 
    id: "IfATR3YBmS8", title: "Sivaganga Vlog ✨",
    isFeatured: true
  },
  { id: "4LuqJ9QotTM", title: "Vignesh Birthday 🎂😂",
    isShowcase: true
  },
  { id: "fx0XD_CwIzg", title: "Survey Camp at Yelagiri 🌄",
    isFeatured: true
  },
  { id: "-z49GCaGbT8", title: "Amusement Park Salem"},
  { id: "iT3xDiaILT0", title: "MGM Dizzee World Adventures 🎡",
    isShowcase: true
  },
  { id: "6fh8sNpGnFs", title: "Ghost in Our Hostel 😱👻"},
  { id: "b3HBDtYIWoM", title: "Maggie in hostel PART 2 🔥"},
  { id: "piQ6umXzIyc", title: "Nexus Vijaya Mall Vlog! 🪄"},
  { id: "px1Z4dYauvw", title: "RECharge 2025 ✨"},
  { id: "xvWBRFkLf2A", title: "Hostel farewell for Habitat guys 🏠",
    isShowcase: true
  },
  { id: "_z9vy_g0m4E", title: "Behind The Scenes 🎬| Ziggurat'25 🏗️",
    isShowcase: true
  },
  { id: "_Sqn90GyoWw", title: "Vidamuyarchi - Not a Vlog"},
  { id: "fhLq6sHqI5U", title: "Vasanth Hospitalised 🤒"},
  { id: "3LkhhxhLwLA", title: "RECharge 25 announcement",
    isShowcase: true
  },
  { id: "cYLy_pdvpO4", title: "What if I am alone? 🫣"},
  { id: "yyrBux7QV_E", title: "Making hostel maggie 🍜| Chef Vignesh 🧑🏻‍🍳"},
  { id: "Rt7KApy7caw", title: "Chennai to Salem 🧳| GOAT 🎬"},
  { id: "rZfx80qTRm4", title: "Yercaud Vlog 🏞️🚗",
    isShowcase: true
  },
  { id: "0VD963OmaoQ", title: "Project Vlog 😮🦾"},
  { id: "n4Yfr80B2ak", title: "Mission courier 📦"},
];

// Add your photos here
// Newest = first in this array
const photos = [
  // Example:
  // { src: "images/pic1.jpg", title: "Evening lights" },
  // { src: "images/pic2.jpg", title: "Study desk" },
  { src: "Images/Jason_and_Lucia_01_landscape.jpg", title: "GTA VI wallpaper" },
  { src: "Images/ben-10-dfrk2fyznplocesa.jpg", title: "Ben 10 Alien Force wallpaper" },
  { src: "Images/NFS x BMW_2.jpg", title: "BMW M3- NFS:MW" },
];

// ========= SMOOTH SCROLL (Home page buttons) =========
function setupSmoothScroll() {
  document.querySelectorAll("[data-scroll]").forEach(btn => {
    btn.addEventListener("click", () => {
      const targetSel = btn.getAttribute("data-scroll");
      const target = document.querySelector(targetSel);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}

// ========= VIDEOS PAGE =========

function createVideoCard(video) {
  const id = video.id;
  const title = video.title || "Untitled Video";

  const thumbMax = `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;
  const thumbFallback = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

  const card = document.createElement("a");
  card.href = `https://www.youtube.com/watch?v=${id}`;
  card.target = "_blank";
  card.rel = "noopener noreferrer";
  card.className = "card"; // same layout everywhere
  card.dataset.search = title.toLowerCase();

  card.innerHTML = `
    <div class="card-media">
      <img src="${thumbMax}"
           loading="lazy"
           onerror="this.onerror=null;this.src='${thumbFallback}';" />
      <div class="card-overlay-gradient"></div>
      <div class="card-badge">YouTube</div>
      <div class="play-icon"><span></span></div>
    </div>
    <div class="card-body">
      <div class="card-title">${title}</div>
    </div>
  `;

  return card;
}

function loadVideos() {
  const featuredContainer = document.getElementById("featured-video");
  const showcaseGrid = document.getElementById("showcase-grid");
  const videoGrid = document.getElementById("video-grid");

  // Not on videos page? skip.
  if (!featuredContainer && !showcaseGrid && !videoGrid) return;

  if (!videos.length) {
    if (featuredContainer) {
      featuredContainer.innerHTML = `<p style="color:#aaa;font-size:0.9rem;">
        No videos yet. Add some inside <code>videos</code> array in <code>script.js</code>.
      </p>`;
    }
    if (showcaseGrid) showcaseGrid.innerHTML = "";
    if (videoGrid) videoGrid.innerHTML = "";
    return;
  }

  // ---------- Newest videos (can be 1 or many) ----------
  let featuredVideos = videos.filter(v => v.isFeatured);

  // If none flagged as isFeatured, fall back to the very first video
  if (!featuredVideos.length) {
    featuredVideos = [videos[0]];
  }

  if (featuredContainer) {
    featuredContainer.innerHTML = "";
    featuredVideos.forEach(v => {
      const card = createVideoCard(v);
      featuredContainer.appendChild(card);
    });
  }

  // ---------- Showcase videos ----------
  if (showcaseGrid) {
    showcaseGrid.innerHTML = "";

    const showcaseVideos = videos.filter(v => v.isShowcase);

    if (showcaseVideos.length) {
      showcaseVideos.forEach(v => {
        const card = createVideoCard(v);
        card.classList.add("showcase-card");
        showcaseGrid.appendChild(card);
      });
    } else {
      showcaseGrid.innerHTML = `<p style="color:#aaa;font-size:0.85rem;">
        Mark any video with <code>isShowcase: true</code> in <code>videos</code> to show it here.
      </p>`;
    }
  }

  // ---------- All videos (includes everything) ----------
  if (videoGrid) {
    videoGrid.innerHTML = "";
    videos.forEach(v => {
      const card = createVideoCard(v);
      videoGrid.appendChild(card);
    });
  }
}

// ========= PHOTOS PAGE + LIGHTBOX =========

let lightboxControls = null;
let currentPhotoIndex = 0;

function setupLightbox() {
  const lightbox = document.getElementById("lightbox");
  if (!lightbox) return; // not on photos page

  const imgEl = document.getElementById("lightbox-image");
  const captionEl = document.getElementById("lightbox-caption");
  const closeBtn = document.querySelector(".lightbox-close");
  const prevBtn = document.querySelector(".lightbox-prev");
  const nextBtn = document.querySelector(".lightbox-next");

  function showPhoto(index) {
    if (!photos.length) return;
    if (index < 0) index = photos.length - 1;
    if (index >= photos.length) index = 0;
    currentPhotoIndex = index;

    const p = photos[index];
    imgEl.src = p.src;
    imgEl.alt = p.title || "";
    captionEl.textContent = p.title || "";
  }

  function openLightbox(index) {
    if (!photos.length) return;
    lightbox.classList.add("visible");
    showPhoto(index);
  }

  function closeLightbox() {
    lightbox.classList.remove("visible");
  }

  closeBtn.addEventListener("click", closeLightbox);
  prevBtn.addEventListener("click", () => showPhoto(currentPhotoIndex - 1));
  nextBtn.addEventListener("click", () => showPhoto(currentPhotoIndex + 1));

  lightbox.addEventListener("click", e => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", e => {
    if (!lightbox.classList.contains("visible")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") showPhoto(currentPhotoIndex - 1);
    if (e.key === "ArrowRight") showPhoto(currentPhotoIndex + 1);
  });

  lightboxControls = { open: openLightbox };
}

function createPhotoCard(photo, index) {
  const title = photo.title || "";

  const card = document.createElement("article");
  card.className = "card"; // same layout for featured + grid
  card.dataset.search = title.toLowerCase();

  card.innerHTML = `
    <div class="card-media">
      <img src="${photo.src}" loading="lazy" alt="${title}" />
      <div class="card-overlay-gradient"></div>
    </div>
    <div class="card-body">
      <div class="card-title">${title || "Untitled photo"}</div>
    </div>
  `;

  if (lightboxControls) {
    card.addEventListener("click", () => lightboxControls.open(index));
  }

  return card;
}

function loadPhotos() {
  const photoGrid = document.getElementById("photo-grid");
  const featuredContainer = document.getElementById("featured-photo");

  if (!photoGrid && !featuredContainer) return; // not on photos page

  if (!photos.length) {
    if (featuredContainer) {
      featuredContainer.innerHTML = `<p style="color:#aaa;font-size:0.9rem;">
        No photos yet. Add some inside <code>photos</code> array in <code>script.js</code>.
      </p>`;
    }
    if (photoGrid) photoGrid.innerHTML = "";
    return;
  }

  // Featured = newest photo
  if (featuredContainer) {
    featuredContainer.innerHTML = "";
    const featuredCard = createPhotoCard(photos[0], 0);
    featuredContainer.appendChild(featuredCard);
  }

  // Remaining gallery
  if (photoGrid) {
    photoGrid.innerHTML = "";
    const startIndex = photos.length > 1 ? 1 : 0;
    for (let i = startIndex; i < photos.length; i++) {
      const card = createPhotoCard(photos[i], i);
      photoGrid.appendChild(card);
    }
  }
}

// ========= SEARCH (Videos / Photos pages) =========

function setupGlobalSearch() {
  const input = document.getElementById("global-search");
  if (!input) return;

  input.addEventListener("input", () => {
    const term = input.value.trim().toLowerCase();
    const cards = document.querySelectorAll(".card");
    if (!term) {
      cards.forEach(c => c.classList.remove("hidden-by-search"));
      return;
    }
    cards.forEach(c => {
      const haystack = (c.dataset.search || "").toLowerCase();
      if (haystack.includes(term)) {
        c.classList.remove("hidden-by-search");
      } else {
        c.classList.add("hidden-by-search");
      }
    });
  });
}

// ========= INIT =========

document.addEventListener("DOMContentLoaded", () => {
  setupSmoothScroll();
  setupLightbox();      // only active on photos.html
  loadVideos();         // only renders on videos.html
  loadPhotos();         // only renders on photos.html
  setupGlobalSearch();

  // Counts wherever they exist
  const videoCountEl = document.getElementById("video-count");
  if (videoCountEl) videoCountEl.textContent = videos.length;

  const photoCountEl = document.getElementById("photo-count");
  if (photoCountEl) photoCountEl.textContent = photos.length;

  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
