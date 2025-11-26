console.log("Website loaded successfully!");
/* ========= EDIT ONLY THIS ARRAY ============ */
const VIDEO_IDS = [
  "_z9vy_g0m4E",
  "xvWBRFkLf2A",
  "3LkhhxhLwLA"
];
/* =========================================== */

// Thumbnail helpers
function maxThumb(id) { return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`; }
function hqThumb(id)  { return `https://img.youtube.com/vi/${id}/hqdefault.jpg`; }

// Test if maxres exists (maxres absent → returns 120x90)
function checkMaxRes(url) {
  return new Promise(resolve => {
    const img = new Image();
    img.onload = () => {
      if (img.naturalWidth <= 120) resolve(false); // fallback size
      else resolve(true);
    };
    img.onerror = () => resolve(false);
    img.src = url + "?cb=" + Date.now(); // avoid cache
  });
}

// Build a video card
function createCard(id, thumb) {
  const grid = document.getElementById("video-grid");

  const card = document.createElement("div");
  card.className = "video-card";

  card.innerHTML = `
    <a href="https://www.youtube.com/watch?v=${id}" target="_blank" rel="noopener">
      <img src="${thumb}" alt="Thumbnail">
      <div class="video-title">Watch on YouTube</div>
    </a>
  `;

  grid.appendChild(card);
}

// Main load function
async function loadVideos() {
  const grid = document.getElementById("video-grid");
  grid.innerHTML = "";

  for (const id of VIDEO_IDS) {
    const maxURL = maxThumb(id);
    const hqURL = hqThumb(id);

    const hasMax = await checkMaxRes(maxURL);
    const finalThumb = hasMax ? maxURL : hqURL;

    createCard(id, finalThumb);
  }
}

document.addEventListener("DOMContentLoaded", loadVideos);
