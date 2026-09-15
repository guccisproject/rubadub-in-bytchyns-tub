// contact.js — builds a mailto: link from the contact form so messages go
// straight to the visitor's own email client. No backend/server involved.

const CONTACT_EMAIL = "contact@rubadubinbytchynstub.shop";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const nameField = document.getElementById("c-name");
  const emailField = document.getElementById("c-email");
  const messageField = document.getElementById("c-message");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let valid = true;
    if (!nameField.value.trim()) {
      setFieldError(nameField, "Please enter your name.");
      valid = false;
    } else {
      setFieldError(nameField, "");
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value.trim())) {
      setFieldError(emailField, "Please enter a valid email address.");
      valid = false;
    } else {
      setFieldError(emailField, "");
    }

    if (!messageField.value.trim()) {
      setFieldError(messageField, "Please enter a message.");
      valid = false;
    } else {
      setFieldError(messageField, "");
    }

    if (!valid) return;

    const subject = document.getElementById("c-subject").value;
    const name = nameField.value.trim();
    const email = emailField.value.trim();
    const message = messageField.value.trim();

    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    const mailtoUrl =
      `mailto:${CONTACT_EMAIL}` +
      `?subject=${encodeURIComponent(`[Website] ${subject}`)}` +
      `&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoUrl;
  });
});

// setFieldError is shared with checkout.js's shape but that file isn't
// loaded on this page, so provide a small local copy.
function setFieldError(fieldEl, message) {
  const wrapper = fieldEl.closest(".form-field");
  if (!wrapper) return;
  wrapper.classList.toggle("has-error", !!message);
  const errorEl = wrapper.querySelector(".field-error");
  if (errorEl) errorEl.textContent = message || "";
}
