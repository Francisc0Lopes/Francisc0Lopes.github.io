document.addEventListener("DOMContentLoaded", async () => {
  const list = document.getElementById("articles");
  const viewer = document.getElementById("viewer");
  const content = document.getElementById("content");
  const backBtn = document.getElementById("back");

  try {
    const res = await fetch("./posts/index.json");
    if (!res.ok) throw new Error("Erro ao carregar a lista de artigos.");
    const posts = await res.json();

    // Lista de artigos
    list.innerHTML = posts
      .map(
        (p) => `
        <div class="post-card">
          <h2>${p.title}</h2>
          <p>${p.description}</p>
          <button data-file="${p.file}">Ler artigo</button>
        </div>
      `
      )
      .join("");

    // Abrir artigo
    list.addEventListener("click", async (e) => {
      if (!e.target.matches("button[data-file]")) return;
      const file = e.target.getAttribute("data-file");
      const resp = await fetch(`./posts/${file}`);
      if (!resp.ok) throw new Error("Erro ao carregar o artigo.");
      const md = await resp.text();
      content.innerHTML = marked.parse(md);
      list.style.display = "none";
      viewer.style.display = "block";
    });

    // Voltar
    backBtn.addEventListener("click", () => {
      viewer.style.display = "none";
      list.style.display = "grid";
      content.innerHTML = "";
    });
  } catch (err) {
    console.error(err);
    list.innerHTML = "<p>❌ Não foi possível carregar os artigos.</p>";
  }
});
