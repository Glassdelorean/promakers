/* ============================================================
   ProMakers — main.js
   UI: sticky header, mobile menu, scroll reveal, stat counters,
   card glow tracking, contact form, footer year.
   ============================================================ */

/* URL HTTP-триггера Yandex Cloud Function (прокси формы → Lark Bitable).
   Подставьте реальный адрес после создания функции (см. function/README.md). */
const FORM_ENDPOINT = "https://functions.yandexcloud.net/d4el0gcapklb2jk5gsj3";

document.addEventListener("DOMContentLoaded", () => {
  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Sticky header ---------- */
  const header = document.getElementById("header");
  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 10);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Mobile burger ---------- */
  const burger = document.getElementById("burger");
  const nav = document.getElementById("nav");
  burger.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    burger.classList.toggle("is-open", open);
    burger.setAttribute("aria-expanded", String(open));
  });
  nav.querySelectorAll(".nav__link").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      burger.classList.remove("is-open");
      burger.setAttribute("aria-expanded", "false");
    });
  });

  /* ---------- Scroll reveal ---------- */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  document.querySelectorAll(".reveal").forEach((el, i) => {
    el.style.transitionDelay = `${Math.min(i % 6, 4) * 70}ms`;
    revealObserver.observe(el);
  });

  /* ---------- Animated stat counters ---------- */
  const animateValue = (el) => {
    const target = Number(el.dataset.count);
    const suffix = el.dataset.suffix || "";
    const duration = 1600;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const statObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateValue(entry.target);
          statObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.6 }
  );
  document.querySelectorAll(".stat__value[data-count]").forEach((el) => statObserver.observe(el));

  /* ---------- Card glow follows cursor ---------- */
  document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("pointermove", (e) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      card.style.setProperty("--my", `${e.clientY - rect.top}px`);
    });
  });

  /* ---------- Contact form → Yandex Cloud Function (Lark Bitable) ---------- */
  const form = document.getElementById("contact-form");
  const success = document.getElementById("form-success");
  const errorBox = document.getElementById("form-error");
  const submitBtn = form.querySelector('button[type="submit"]');

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    success.hidden = true;
    errorBox.hidden = true;

    const dict = I18N[window.PM_LANG] || I18N.ru;
    const originalLabel = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = dict["form.sending"];

    const fd = new FormData(form);
    const payload = {
      fields: {
        "Имя": (fd.get("name") || "").toString().trim(),
        "Компания": (fd.get("company") || "").toString().trim(),
        "E-mail": (fd.get("email") || "").toString().trim(),
        "Телефон": (fd.get("phone") || "").toString().trim(),
        "Задача": (fd.get("message") || "").toString().trim(),
      },
    };

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      success.hidden = false;
      form.reset();
      setTimeout(() => { success.hidden = true; }, 8000);
    } catch (err) {
      console.error("Form submit failed:", err);
      errorBox.hidden = false;
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalLabel;
    }
  });
});
