// cart-page.js — renders the cart table + totals on cart.html.

function renderCartPage() {
  const lines = getCartLines();
  const tableWrap = document.getElementById("cart-table-wrap");
  const emptyState = document.getElementById("cart-empty-state");
  const summary = document.getElementById("cart-summary");

  if (lines.length === 0) {
    tableWrap.style.display = "none";
    summary.style.display = "none";
    emptyState.style.display = "";
    return;
  }

  tableWrap.style.display = "";
  summary.style.display = "";
  emptyState.style.display = "none";

  const tbody = document.getElementById("cart-table-body");
  tbody.innerHTML = lines
    .map(
      (l) => `
    <tr data-line-id="${l.id}">
      <td>
        <div class="cart-item-info">
          <img src="${l.product.image}" alt="${l.product.name}">
          <div>
            <strong>${l.product.name}</strong><br>
            <span class="text-muted">${formatMoney(l.product.price)} each</span>
          </div>
        </div>
      </td>
      <td>
        <input type="number" class="qty-input" min="1" max="99" value="${l.qty}" data-qty-for="${l.id}" aria-label="Quantity for ${l.product.name}">
      </td>
      <td>${formatMoney(l.lineTotal)}</td>
      <td><button type="button" class="remove-btn" data-remove="${l.id}">Remove</button></td>
    </tr>`
    )
    .join("");

  tbody.querySelectorAll("[data-qty-for]").forEach((input) => {
    input.addEventListener("change", () => {
      const qty = Math.max(0, Math.min(99, parseInt(input.value, 10) || 0));
      setQty(input.dataset.qtyFor, qty);
      renderCartPage();
    });
  });

  tbody.querySelectorAll("[data-remove]").forEach((btn) => {
    btn.addEventListener("click", () => {
      removeFromCart(btn.dataset.remove);
      renderCartPage();
    });
  });

  const totals = calcTotals(lines);
  document.getElementById("cart-subtotal").textContent = formatMoney(totals.subtotal);
  document.getElementById("cart-shipping").textContent =
    totals.shipping === 0 ? "Free" : formatMoney(totals.shipping);
  document.getElementById("cart-shipping-note").textContent =
    totals.subtotal >= FREE_SHIPPING_THRESHOLD || totals.subtotal === 0
      ? "You've unlocked free shipping!"
      : `Add ${formatMoney(FREE_SHIPPING_THRESHOLD - totals.subtotal)} more for free shipping.`;
  document.getElementById("cart-tax").textContent = formatMoney(totals.tax);
  document.getElementById("cart-total").textContent = formatMoney(totals.total);
}

document.addEventListener("DOMContentLoaded", renderCartPage);
