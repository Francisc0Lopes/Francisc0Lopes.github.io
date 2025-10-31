// ==========================
// MAIN.JS — Funções globais
// ==========================

// Aplica tema salvo
(function () {
  const root = document.documentElement;
  const saved = localStorage.getItem("theme");
  if (saved === "light") root.classList.add("light");
})();

// Botão de alternância do tema (se existir)
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("theme-toggle");
  if (!btn) return;

  const root = document.documentElement;
  const applyIcon = () =>
    (btn.textContent = root.classList.contains("light") ? "🌙" : "☀️");
  applyIcon();

  btn.addEventListener("click", () => {
    const light = root.classList.toggle("light");
    localStorage.setItem("theme", light ? "light" : "dark");
    applyIcon();
  });
});
