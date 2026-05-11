const header = document.querySelector("[data-header]");
const floatingCta = document.querySelector("[data-floating-cta]");
const countdown = document.querySelector("[data-countdown]");
const reveals = document.querySelectorAll(".reveal");

const lineUrl =
  "https://liff.line.me/1656771573-3yz5OnDE/landing?follow=%40918qfpmk&liff_id=1656771573-3yz5OnDE&lp=riUDQX";

document.querySelectorAll('a[href^="https://liff.line.me"]').forEach((link) => {
  link.href = lineUrl;
  link.rel = "noopener";
});

const updateChrome = () => {
  const isScrolled = window.scrollY > 24;
  header?.classList.toggle("is-scrolled", isScrolled);
  floatingCta?.classList.toggle("is-visible", window.scrollY > window.innerHeight * 0.55);
};

window.addEventListener("scroll", updateChrome, { passive: true });
updateChrome();

if (countdown) {
  const storageKey = "sunspirits_lp_first_visit_at";
  const stored = localStorage.getItem(storageKey);
  const firstVisit = stored ? Number(stored) : Date.now();

  if (!stored) {
    localStorage.setItem(storageKey, String(firstVisit));
  }

  const deadline = firstVisit + 5 * 24 * 60 * 60 * 1000;

  const updateCountdown = () => {
    const remaining = Math.max(0, deadline - Date.now());
    const days = Math.floor(remaining / 86400000);
    const hours = Math.floor((remaining % 86400000) / 3600000);
    const minutes = Math.floor((remaining % 3600000) / 60000);

    countdown.textContent =
      remaining > 0 ? `残り ${days}日 ${hours}時間 ${minutes}分` : "公開期間は終了しました";
  };

  updateCountdown();
  window.setInterval(updateCountdown, 60000);
}

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  reveals.forEach((el) => observer.observe(el));
} else {
  reveals.forEach((el) => el.classList.add("is-visible"));
}
