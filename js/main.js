// main.js — shared chrome behavior: mobile nav, active link, footer year,
// and the cookie consent banner / preferences modal (backed by localStorage).

const COOKIE_CONSENT_KEY = "rubadub_cookie_consent_v1";

function getCookieConsent() {
  try {
    const raw = localStorage.getItem(COOKIE_CONSENT_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

function saveCookieConsent(consent) {
  localStorage.setItem(
    COOKIE_CONSENT_KEY,
    JSON.stringify({ ...consent, essential: true, decidedAt: new Date().toISOString() })
  );
}

function applyConsentToUI(consent) {
  const analyticsToggle = document.getElementById("pref-analytics");
  const marketingToggle = document.getElementById("pref-marketing");
  if (analyticsToggle) analyticsToggle.checked = !!(consent && consent.analytics);
  if (marketingToggle) marketingToggle.checked = !!(consent && consent.marketing);
}

function initCookieConsent() {
  const banner = document.getElementById("cookie-banner");
  const prefsBtn = document.getElementById("cookie-prefs-btn");
  const modal = document.getElementById("cookie-modal");
  if (!banner || !prefsBtn || !modal) return;

  const acceptAllBtn = document.getElementById("cookie-accept-all");
  const rejectBtn = document.getElementById("cookie-reject");
  const openPrefsLinks = document.querySelectorAll("[data-open-cookie-prefs]");
  const savePrefsBtn = document.getElementById("cookie-save-prefs");
  const modalAcceptAllBtn = document.getElementById("cookie-modal-accept-all");
  const closeModalBtn = document.getElementById("cookie-modal-close");

  function showBanner() {
    banner.classList.add("open");
    prefsBtn.classList.remove("visible");
  }

  function hideBanner() {
    banner.classList.remove("open");
    prefsBtn.classList.add("visible");
  }

  function openModal() {
    applyConsentToUI(getCookieConsent() || { analytics: false, marketing: false });
    modal.classList.add("open");
  }

  function closeModal() {
    modal.classList.remove("open");
  }

  const existing = getCookieConsent();
  if (existing && existing.decidedAt) {
    hideBanner();
  } else {
    showBanner();
  }

  if (acceptAllBtn) {
    acceptAllBtn.addEventListener("click", () => {
      saveCookieConsent({ analytics: true, marketing: true });
      hideBanner();
    });
  }

  if (rejectBtn) {
    rejectBtn.addEventListener("click", () => {
      saveCookieConsent({ analytics: false, marketing: false });
      hideBanner();
    });
  }

  openPrefsLinks.forEach((link) => link.addEventListener("click", (e) => {
    e.preventDefault();
    openModal();
  }));

  prefsBtn.addEventListener("click", openModal);

  if (savePrefsBtn) {
    savePrefsBtn.addEventListener("click", () => {
      const analytics = document.getElementById("pref-analytics").checked;
      const marketing = document.getElementById("pref-marketing").checked;
      saveCookieConsent({ analytics, marketing });
      hideBanner();
      closeModal();
    });
  }

  if (modalAcceptAllBtn) {
    modalAcceptAllBtn.addEventListener("click", () => {
      saveCookieConsent({ analytics: true, marketing: true });
      hideBanner();
      closeModal();
    });
  }

  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", closeModal);
  }

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
}

function initNavToggle() {
  const toggle = document.getElementById("nav-toggle");
  const links = document.getElementById("nav-links");
  if (!toggle || !links) return;
  toggle.addEventListener("click", () => {
    const isOpen = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
}

function initActiveNavLink() {
  const current = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach((link) => {
    const href = link.getAttribute("href");
    if (href === current) {
      link.setAttribute("aria-current", "page");
    }
  });
}

function initFooterYear() {
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = String(new Date().getFullYear());
  });
}

let toastTimer = null;
function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
}

document.addEventListener("DOMContentLoaded", () => {
  initNavToggle();
  initActiveNavLink();
  initFooterYear();
  initCookieConsent();
});
