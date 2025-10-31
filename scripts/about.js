// ABOUT.JS — funcionalidades da página "Sobre Mim"
document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  const saved = localStorage.getItem("theme");
  if (saved === "light") root.classList.add("light");

  const emailLink = document.querySelector('a[href^="mailto:"]');
  if (emailLink) {
    const btn = document.createElement("button");
    btn.textContent = "Copiar email";
    btn.style.marginLeft = "8px";
    emailLink.insertAdjacentElement("afterend", btn);

    btn.addEventListener("click", async () => {
      const email = emailLink.href.replace("mailto:", "");
      await navigator.clipboard.writeText(email);
      btn.textContent = "Copiado ✅";
      setTimeout(() => (btn.textContent = "Copiar email"), 1500);
    });
  }
});
