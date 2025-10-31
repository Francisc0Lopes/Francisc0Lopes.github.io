async function loadArticles() {
  const container = document.getElementById("articles");
  const res = await fetch("posts/index.json");
  const articles = await res.json();

  container.innerHTML = "<h2>Escolhe um artigo:</h2>";
  for (const art of articles) {
    const div = document.createElement("div");
    div.className = "article-card";
    div.innerHTML = `
      <h3>${art.title}</h3>
      <p>${art.tags.join(" · ")}</p>
      <button data-file="${art.file}">Ler Artigo</button>
    `;
    container.appendChild(div);
  }

  document.querySelectorAll("button[data-file]").forEach(btn => {
    btn.addEventListener("click", () => loadArticle(btn.dataset.file));
  });
}

async function loadArticle(file) {
  const res = await fetch(`posts/${file}`);
  const text = await res.text();
  document.getElementById("articles").style.display = "none";
  document.getElementById("viewer").style.display = "block";
  document.getElementById("content").innerHTML = marked.parse(text);
}

document.getElementById("back").addEventListener("click", () => {
  document.getElementById("viewer").style.display = "none";
  document.getElementById("articles").style.display = "block";
});

loadArticles();

