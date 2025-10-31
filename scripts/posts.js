// POSTS.JS — lista e carregamento de artigos Markdown
document.addEventListener("DOMContentLoaded", async () => {
  const root = document.documentElement;
  const saved = localStorage.getItem("theme");
  if (saved === "light") root.classList.add("light");

  const container = document.getElementById("posts-container");
  const articleView = document.getElementById("article-view");

  if (!container) return;

  try {
    const res = await fetch("./posts/index.json");
    const posts = await res.json();

    container.innerHTML = posts
      .map(
        (p) => `
        <div class="post-card">
          <h2>${p.title}</h2>
          <p>${p.description}</p>
          <a href="?post=${encodeURIComponent(p.file)}">Ler artigo →</a>
        </div>
      `
      )
      .join("");

    // Verifica se foi selecionado um artigo
    const params = new URLSearchParams(window.location.search);
    const postFile = params.get("post");

    if (postFile && articleView) {
      const resp = await fetch(`./posts/${postFile}`);
      const md = await resp.text();
      const html = marked.parse(md);
      articleView.innerHTML = `<div class="article-content">${html}</div>`;
      container.style.display = "none";
    }
  } catch (err) {
    container.innerHTML = "<p>Não foi possível carregar os artigos.</p>";
  }
});
