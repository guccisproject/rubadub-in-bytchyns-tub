// orders.js — shared order storage, used by both checkout.js (to save an
// order) and confirmation.js (to read one back). Loaded on every page so
// the confirmation page doesn't need checkout.js's form-handling code.

const ORDERS_STORAGE_KEY = "rubadub_orders_v1";

function generateOrderNumber() {
  const stamp = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `RIB-${stamp}-${rand}`;
}

function getOrders() {
  try {
    const raw = localStorage.getItem(ORDERS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

function saveOrder(order) {
  const orders = getOrders();
  orders[order.orderNumber] = order;
  localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
}

function getOrder(orderNumber) {
  return getOrders()[orderNumber] || null;
}
