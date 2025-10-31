// === Carregar artigos ===
async function loadArticles() {
  try {
    const res = await fetch("posts/index.json");
    const articles = await res.json();
    const container = document.getElementById("articles-container");

    container.innerHTML = "";
    for (const art of articles) {
      const card = document.createElement("div");
      card.className = "article-card";
      card.innerHTML = `
        <h3>${art.title}</h3>
        <p class="tags">${art.tags.join(" · ")}</p>
        <p><small>${new Date(art.date).toLocaleDateString("pt-PT")}</small></p>
      `;
      card.addEventListener("click", () => openArticle(art.file));
      container.appendChild(card);
    }
  } catch (err) {
    console.error("Erro ao carregar artigos:", err);
  }
}

// === Abrir artigo no modal ===
async function openArticle(file) {
  const modal = document.getElementById("modal");
  const content = document.getElementById("article-content");

  try {
    const res = await fetch(`posts/${file}`);
    const text = await res.text();
    content.innerHTML = marked.parse(text);
    modal.style.display = "flex";
  } catch (err) {
    content.innerHTML = "<p>Erro ao carregar artigo.</p>";
  }
}

// === Fechar modal ===
document.getElementById("close").addEventListener("click", () => {
  document.getElementById("modal").style.display = "none";
});
window.addEventListener("click", (e) => {
  if (e.target.id === "modal") document.getElementById("modal").style.display = "none";
});

// === Tema claro/escuro ===
const toggleButton = document.getElementById("theme-toggle");
const root = document.documentElement;

// Aplicar tema guardado
if (localStorage.getItem("theme") === "light") {
  root.classList.add("light");
  toggleButton.textContent = "🌙";
} else {
  root.classList.remove("light");
  toggleButton.textContent = "☀️";
}

// Alternar tema
toggleButton.addEventListener("click", () => {
  const isLight = root.classList.toggle("light");
  toggleButton.textContent = isLight ? "🌙" : "☀️";
  localStorage.setItem("theme", isLight ? "light" : "dark");
});

// === Inicialização ===
loadArticles();
