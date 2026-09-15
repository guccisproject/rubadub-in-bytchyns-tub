// checkout.js — checkout form validation + order capture.
//
// processPayment() below is the ONE swap-in point for a real payment
// processor (e.g. Stripe). Right now it does NOT talk to any bank or
// processor — it validates the card fields locally (Luhn check only,
// which just confirms the number is a plausible card number, not that
// it is real, funded, or authorized) and then simulates a successful
// capture so the rest of the checkout flow can be built and tested.
// No money moves and no charge is ever actually attempted.

const US_STATES = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN",
  "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV",
  "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN",
  "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY", "DC",
];

function luhnCheck(cardNumber) {
  const digits = cardNumber.replace(/\D/g, "");
  if (digits.length < 13 || digits.length > 19) return false;
  let sum = 0;
  let shouldDouble = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits[i], 10);
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  return sum % 10 === 0;
}

// ---------------------------------------------------------------------
// >>> SWAP-IN POINT FOR A REAL PAYMENT PROCESSOR (e.g. Stripe) <<<
//
// To go live with real payments:
//   1. Add the processor's client-side SDK (e.g. Stripe.js) to
//      checkout.html and collect a payment method / token with it
//      instead of (or alongside) the raw card fields below.
//   2. Replace the body of this function with a call to your backend
//      (Stripe requires a server to create a PaymentIntent/charge —
//      never put a secret API key in this static front-end code).
//   3. Resolve with { status: "paid", transactionId } on success, or
//      throw/reject with a user-facing message on failure, and leave
//      the rest of the checkout flow (order storage, redirect to the
//      confirmation page) exactly as-is.
// ---------------------------------------------------------------------
function processPayment(order) {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (order.paymentMethod === "pickup") {
        resolve({ status: "awaiting-pickup-payment", transactionId: null });
      } else {
        // Simulated capture only — no processor is actually contacted.
        resolve({ status: "paid", transactionId: `SIMULATED-${order.orderNumber}` });
      }
    }, 500);
  });
}

function setFieldError(fieldEl, message) {
  const wrapper = fieldEl.closest(".form-field");
  if (!wrapper) return;
  wrapper.classList.toggle("has-error", !!message);
  const errorEl = wrapper.querySelector(".field-error");
  if (errorEl) errorEl.textContent = message || "";
}

function validateRequired(fieldEl, label) {
  const value = fieldEl.value.trim();
  if (!value) {
    setFieldError(fieldEl, `${label} is required.`);
    return false;
  }
  setFieldError(fieldEl, "");
  return true;
}

function validateEmail(fieldEl) {
  const value = fieldEl.value.trim();
  const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  setFieldError(fieldEl, ok ? "" : "Enter a valid email address.");
  return ok;
}

function validatePhone(fieldEl) {
  const digits = fieldEl.value.replace(/\D/g, "");
  const ok = digits.length >= 7;
  setFieldError(fieldEl, ok ? "" : "Enter a valid phone number.");
  return ok;
}

function validateZip(fieldEl) {
  const ok = /^\d{5}(-\d{4})?$/.test(fieldEl.value.trim());
  setFieldError(fieldEl, ok ? "" : "Enter a valid 5-digit ZIP code.");
  return ok;
}

function validateCardNumber(fieldEl) {
  const ok = luhnCheck(fieldEl.value);
  setFieldError(fieldEl, ok ? "" : "Enter a valid card number.");
  return ok;
}

function validateExpiry(fieldEl) {
  const match = fieldEl.value.trim().match(/^(\d{2})\s*\/\s*(\d{2})$/);
  if (!match) {
    setFieldError(fieldEl, "Use MM/YY format.");
    return false;
  }
  const month = parseInt(match[1], 10);
  const year = 2000 + parseInt(match[2], 10);
  if (month < 1 || month > 12) {
    setFieldError(fieldEl, "Enter a valid month.");
    return false;
  }
  const now = new Date();
  const expiryDate = new Date(year, month); // first day of month AFTER expiry
  if (expiryDate <= now) {
    setFieldError(fieldEl, "This card has expired.");
    return false;
  }
  setFieldError(fieldEl, "");
  return true;
}

function validateCVC(fieldEl) {
  const ok = /^\d{3,4}$/.test(fieldEl.value.trim());
  setFieldError(fieldEl, ok ? "" : "Enter a valid security code.");
  return ok;
}

function initCheckoutForm() {
  const form = document.getElementById("checkout-form");
  if (!form) return;

  const lines = getCartLines();
  if (lines.length === 0) {
    window.location.href = "cart.html";
    return;
  }

  renderCheckoutSummary(lines);

  const paymentRadios = form.querySelectorAll('input[name="paymentMethod"]');
  const cardFields = document.getElementById("card-fields");
  const pickupNote = document.getElementById("pickup-note");
  const payBtnLabel = document.getElementById("pay-btn-label");

  function syncPaymentMethodUI() {
    const method = form.querySelector('input[name="paymentMethod"]:checked').value;
    const isCard = method === "card";
    cardFields.style.display = isCard ? "" : "none";
    pickupNote.style.display = isCard ? "none" : "";
    cardFields.querySelectorAll("input").forEach((input) => {
      input.required = isCard;
    });
    if (payBtnLabel) {
      payBtnLabel.textContent = isCard ? "Place Order & Pay" : "Reserve Order for Pickup";
    }
  }

  paymentRadios.forEach((radio) => radio.addEventListener("change", syncPaymentMethodUI));
  syncPaymentMethodUI();

  const fullName = document.getElementById("fullName");
  const email = document.getElementById("email");
  const phone = document.getElementById("phone");
  const address1 = document.getElementById("address1");
  const city = document.getElementById("city");
  const state = document.getElementById("state");
  const zip = document.getElementById("zip");
  const cardName = document.getElementById("cardName");
  const cardNumber = document.getElementById("cardNumber");
  const cardExpiry = document.getElementById("cardExpiry");
  const cardCVC = document.getElementById("cardCVC");

  cardNumber.addEventListener("input", () => {
    cardNumber.value = cardNumber.value
      .replace(/\D/g, "")
      .slice(0, 19)
      .replace(/(.{4})/g, "$1 ")
      .trim();
  });

  cardExpiry.addEventListener("input", () => {
    let v = cardExpiry.value.replace(/\D/g, "").slice(0, 4);
    if (v.length > 2) v = v.slice(0, 2) + "/" + v.slice(2);
    cardExpiry.value = v;
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const method = form.querySelector('input[name="paymentMethod"]:checked').value;

    let valid = true;
    valid = validateRequired(fullName, "Full name") && valid;
    valid = validateEmail(email) && valid;
    valid = validatePhone(phone) && valid;
    valid = validateRequired(address1, "Address") && valid;
    valid = validateRequired(city, "City") && valid;
    valid = validateRequired(state, "State") && valid;
    valid = validateZip(zip) && valid;

    if (method === "card") {
      valid = validateRequired(cardName, "Name on card") && valid;
      valid = validateCardNumber(cardNumber) && valid;
      valid = validateExpiry(cardExpiry) && valid;
      valid = validateCVC(cardCVC) && valid;
    }

    if (!valid) {
      const firstError = form.querySelector(".has-error input, .has-error select");
      if (firstError) firstError.focus();
      return;
    }

    const currentLines = getCartLines();
    const totals = calcTotals(currentLines);
    const submitBtn = document.getElementById("submit-order-btn");
    submitBtn.disabled = true;
    submitBtn.textContent = "Processing…";

    const order = {
      orderNumber: generateOrderNumber(),
      createdAt: new Date().toISOString(),
      customer: {
        fullName: fullName.value.trim(),
        email: email.value.trim(),
        phone: phone.value.trim(),
        address1: address1.value.trim(),
        address2: document.getElementById("address2").value.trim(),
        city: city.value.trim(),
        state: state.value,
        zip: zip.value.trim(),
      },
      paymentMethod: method,
      cardLast4: method === "card" ? cardNumber.value.replace(/\D/g, "").slice(-4) : null,
      items: currentLines.map((l) => ({
        id: l.id,
        name: l.product.name,
        price: l.product.price,
        qty: l.qty,
        lineTotal: l.lineTotal,
      })),
      totals,
      status: "processing",
    };

    processPayment(order).then((result) => {
      order.status = result.status;
      order.transactionId = result.transactionId;
      saveOrder(order);
      clearCart();
      window.location.href = `confirmation.html?order=${encodeURIComponent(order.orderNumber)}`;
    });
  });
}

function renderCheckoutSummary(lines) {
  const container = document.getElementById("checkout-summary-items");
  if (!container) return;
  container.innerHTML = lines
    .map(
      (l) => `
      <div class="summary-row">
        <span>${l.product.name} × ${l.qty}</span>
        <span>${formatMoney(l.lineTotal)}</span>
      </div>`
    )
    .join("");

  const totals = calcTotals(lines);
  document.getElementById("checkout-subtotal").textContent = formatMoney(totals.subtotal);
  document.getElementById("checkout-shipping").textContent =
    totals.shipping === 0 ? "Free" : formatMoney(totals.shipping);
  document.getElementById("checkout-tax").textContent = formatMoney(totals.tax);
  document.getElementById("checkout-total").textContent = formatMoney(totals.total);
}

function populateStateOptions() {
  const select = document.getElementById("state");
  if (!select) return;
  US_STATES.forEach((abbr) => {
    const opt = document.createElement("option");
    opt.value = abbr;
    opt.textContent = abbr;
    if (abbr === "NC") opt.selected = true;
    select.appendChild(opt);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  populateStateOptions();
  initCheckoutForm();
});
