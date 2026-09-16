// gallery.js — renders the gallery grid + a simple lightbox on galleries.html.
// Swap in real photos later by replacing the files in images/gallery/ (or by
// changing the `image` path below) and updating captions to match.

const GALLERY_ITEMS = [
  { image: "images/gallery/gal-01.svg", caption: "Rub-a-dub-dub — bath time is the best time." },
  { image: "images/gallery/gal-02.svg", caption: "Our signature rubber duck, floating on the job." },
  { image: "images/gallery/gal-03.svg", caption: "The grooming station, freshly stocked." },
  { image: "images/gallery/gal-04.svg", caption: "An evening stroll with a reflective leash." },
  { image: "images/gallery/gal-05.svg", caption: "A cozy corner for post-bath naps." },
  { image: "images/gallery/gal-06.svg", caption: "Dinner is served, no tipping bowls allowed." },
  { image: "images/gallery/gal-07.svg", caption: "The toy basket, restocked and ready." },
  { image: "images/gallery/gal-08.svg", caption: "Bundled up and looking sharp." },
  { image: "images/gallery/gal-09.svg", caption: "Packed up for a weekend road trip." },
  { image: "images/gallery/gal-10.svg", caption: "Suds are up and towels are warm." },
  { image: "images/gallery/gal-11.svg", caption: "Our home base, packed and ready to ship." },
  { image: "images/gallery/gal-12.svg", caption: "The post-bath shake-off — every single time." },
];

function renderGallery() {
  const grid = document.getElementById("gallery-grid");
  if (!grid) return;
  grid.innerHTML = GALLERY_ITEMS.map(
    (item, i) => `
    <button type="button" class="gallery-tile" data-index="${i}" aria-label="View larger: ${item.caption}">
      <img src="${item.image}" alt="${item.caption}" loading="lazy">
    </button>`
  ).join("");

  grid.querySelectorAll(".gallery-tile").forEach((tile) => {
    tile.addEventListener("click", () => openLightbox(parseInt(tile.dataset.index, 10)));
  });
}

function openLightbox(index) {
  const lightbox = document.getElementById("lightbox");
  const img = document.getElementById("lightbox-img");
  const caption = document.getElementById("lightbox-caption");
  const item = GALLERY_ITEMS[index];
  img.src = item.image;
  img.alt = item.caption;
  caption.textContent = item.caption;
  lightbox.classList.add("open");
}

function closeLightbox() {
  document.getElementById("lightbox").classList.remove("open");
}

document.addEventListener("DOMContentLoaded", () => {
  renderGallery();
  const lightbox = document.getElementById("lightbox");
  if (!lightbox) return;
  document.getElementById("lightbox-close").addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
  });
});
