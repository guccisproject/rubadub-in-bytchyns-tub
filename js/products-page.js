// products-page.js — renders the catalog grid with category filter chips
// on products.html.

function allCatalogItems() {
  return [...PRODUCTS, ...BUNDLES];
}

function productCardHTML(item) {
  const isBundle = !!item.items;
  const category = CATEGORIES.find((c) => c.slug === item.category);
  const savings = isBundle ? getBundleSavings(item) : 0;
  return `
    <div class="product-card" data-category="${item.category}">
      <img src="${item.image}" alt="${item.name}" loading="lazy">
      <div class="product-card-body">
        ${isBundle ? '<span class="bundle-badge">Bundle & Save</span>' : ""}
        <span class="product-cat">${isBundle ? "Curated Bundle" : category ? category.label : ""}</span>
        <h3>${item.name}</h3>
        <p class="product-desc">${item.description}</p>
        <div class="product-price">
          ${formatMoney(item.price)}
          ${savings > 0 ? `<span class="save">You save ${formatMoney(savings)}</span>` : ""}
        </div>
        <button type="button" class="btn btn-primary btn-block" data-add-to-cart="${item.id}">Add to Cart</button>
      </div>
    </div>`;
}

function renderChips(activeSlug) {
  const chipRow = document.getElementById("category-chips");
  if (!chipRow) return;
  const chips = [
    { slug: "all", label: "All Products", icon: null },
    ...CATEGORIES.map((c) => ({ slug: c.slug, label: c.label, icon: c.icon })),
    { slug: "bundles", label: "Bundles", icon: null },
  ];
  chipRow.innerHTML = chips
    .map(
      (c) => `
      <button type="button" class="chip${c.slug === activeSlug ? " active" : ""}" data-filter="${c.slug}">
        ${c.icon ? `<img src="${c.icon}" alt="">` : ""}${c.label}
      </button>`
    )
    .join("");

  chipRow.querySelectorAll(".chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      renderProductGrid(chip.dataset.filter);
      renderChips(chip.dataset.filter);
      const grid = document.getElementById("product-grid");
      if (grid) grid.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

function renderProductGrid(filter) {
  const grid = document.getElementById("product-grid");
  if (!grid) return;
  let items;
  if (filter === "all" || !filter) {
    items = allCatalogItems();
  } else if (filter === "bundles") {
    items = BUNDLES;
  } else {
    items = PRODUCTS.filter((p) => p.category === filter);
  }

  grid.innerHTML = items.map(productCardHTML).join("");

  grid.querySelectorAll("[data-add-to-cart]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = getProductById(btn.dataset.addToCart);
      addToCart(item.id, 1);
      showToast(`Added "${item.name}" to your cart.`);
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const initialFilter = params.get("category") || "all";
  renderChips(initialFilter);
  renderProductGrid(initialFilter);
});
