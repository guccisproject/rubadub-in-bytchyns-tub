// cart.js — shared cart storage + pricing logic, loaded on every page
// (needs products.js loaded first for getProductById()).

const CART_STORAGE_KEY = "rubadub_cart_v1";

// --- Shipping & tax settings -------------------------------------------
// Flat-rate shipping under the free-shipping threshold; free above it.
const SHIPPING_FLAT_RATE = 6.95;
const FREE_SHIPPING_THRESHOLD = 60;

// North Carolina's statewide sales tax rate is 4.75%. Combined with a
// typical county rate that lands most NC jurisdictions in the 6.75%-7.5%
// range. "Gadsden, NC" does not correspond to a documented county/city
// combination we could verify, so this uses a reasonable approximate
// combined rate — THE BUSINESS OWNER SHOULD CONFIRM THE EXACT COMBINED
// STATE + COUNTY (+ any local transit) RATE FOR THEIR ACTUAL FILING
// ADDRESS WITH THE NC DEPARTMENT OF REVENUE before going live.
const SALES_TAX_RATE = 0.0675;

function getCart() {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  renderCartBadge();
}

function addToCart(id, qty = 1) {
  const cart = getCart();
  const existing = cart.find((line) => line.id === id);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ id, qty });
  }
  saveCart(cart);
}

function removeFromCart(id) {
  saveCart(getCart().filter((line) => line.id !== id));
}

function setQty(id, qty) {
  const cart = getCart();
  const line = cart.find((l) => l.id === id);
  if (!line) return;
  if (qty <= 0) {
    saveCart(cart.filter((l) => l.id !== id));
  } else {
    line.qty = qty;
    saveCart(cart);
  }
}

function clearCart() {
  saveCart([]);
}

function getCartCount() {
  return getCart().reduce((total, line) => total + line.qty, 0);
}

// Joins stored {id, qty} lines with full product data and drops any
// lines whose product id no longer exists in the catalog.
function getCartLines() {
  return getCart()
    .map((line) => {
      const product = getProductById(line.id);
      if (!product) return null;
      return {
        id: line.id,
        qty: line.qty,
        product,
        lineTotal: Math.round(product.price * line.qty * 100) / 100,
      };
    })
    .filter(Boolean);
}

function calcTotals(lines) {
  const subtotal = Math.round(lines.reduce((t, l) => t + l.lineTotal, 0) * 100) / 100;
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FLAT_RATE;
  const tax = Math.round(subtotal * SALES_TAX_RATE * 100) / 100;
  const total = Math.round((subtotal + shipping + tax) * 100) / 100;
  return { subtotal, shipping, tax, total };
}

function formatMoney(amount) {
  return "$" + amount.toFixed(2);
}

function renderCartBadge() {
  const count = getCartCount();
  document.querySelectorAll("[data-cart-count]").forEach((el) => {
    el.textContent = String(count);
    el.style.display = count > 0 ? "" : "none";
  });
}

document.addEventListener("DOMContentLoaded", renderCartBadge);
