// === Configurações ===
// 👉 Coloca aqui o URL base do teu repositório GitHub:
const GITHUB_REPO = "https://github.com/Francisc0Lopes/francisc0lopes.github.io/blob/main/posts/";


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
      card.addEventListener("click", () => openArticle(art.file, art.title));
      container.appendChild(card);
    }
  } catch (err) {
    console.error("Erro ao carregar artigos:", err);
  }
}


// === Abrir artigo no modal ===
async function openArticle(file, title) {
  const modal = document.getElementById("modal");
  const content = document.getElementById("article-content");

  try {
    const res = await fetch(`posts/${file}`);
    const text = await res.text();

    // Gerar link direto para o ficheiro no GitHub
    const githubLink = `${GITHUB_REPO}${file}`;
    const articleHeader = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem;">
        <h2 style="margin:0;">${title}</h2>
        <a href="${githubLink}" target="_blank" style="color:#58a6ff; text-decoration:none; font-weight:bold;">
          🔗 Ver no GitHub
        </a>
      </div>
      <hr style="border:none; border-top:1px solid #444; margin-bottom:1rem;">
    `;

    content.innerHTML = articleHeader + marked.parse(text);
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
