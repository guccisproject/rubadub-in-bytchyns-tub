// confirmation.js — reads a placed order back out of localStorage by its
// order number (passed as a ?order= query param) and displays it.

function initConfirmationPage() {
  const params = new URLSearchParams(window.location.search);
  const orderNumber = params.get("order");
  const foundEl = document.getElementById("confirmation-found");
  const notFoundEl = document.getElementById("confirmation-not-found");

  const order = orderNumber ? getOrder(orderNumber) : null;

  if (!order) {
    if (notFoundEl) notFoundEl.style.display = "";
    if (foundEl) foundEl.style.display = "none";
    return;
  }

  if (notFoundEl) notFoundEl.style.display = "none";
  if (foundEl) foundEl.style.display = "";

  document.getElementById("conf-order-number").textContent = order.orderNumber;
  document.getElementById("conf-order-date").textContent = new Date(order.createdAt).toLocaleString(
    "en-US",
    { dateStyle: "long", timeStyle: "short" }
  );

  const statusLabels = {
    paid: "Paid",
    "awaiting-pickup-payment": "Reserved — Pay In-Store at Pickup",
    processing: "Processing",
  };
  document.getElementById("conf-status").textContent = statusLabels[order.status] || order.status;

  const paymentLabel =
    order.paymentMethod === "card"
      ? `Credit/Debit Card ending in ${order.cardLast4}`
      : "Pay In-Store / Local Pickup";
  document.getElementById("conf-payment-method").textContent = paymentLabel;

  const c = order.customer;
  document.getElementById("conf-customer").innerHTML = `
    ${c.fullName}<br>
    ${c.address1}${c.address2 ? ", " + c.address2 : ""}<br>
    ${c.city}, ${c.state} ${c.zip}<br>
    ${c.email} &middot; ${c.phone}
  `;

  document.getElementById("conf-items").innerHTML = order.items
    .map(
      (item) => `
      <div class="summary-row">
        <span>${item.name} × ${item.qty}</span>
        <span>${formatMoney(item.lineTotal)}</span>
      </div>`
    )
    .join("");

  document.getElementById("conf-subtotal").textContent = formatMoney(order.totals.subtotal);
  document.getElementById("conf-shipping").textContent =
    order.totals.shipping === 0 ? "Free" : formatMoney(order.totals.shipping);
  document.getElementById("conf-tax").textContent = formatMoney(order.totals.tax);
  document.getElementById("conf-total").textContent = formatMoney(order.totals.total);
}

document.addEventListener("DOMContentLoaded", initConfirmationPage);
