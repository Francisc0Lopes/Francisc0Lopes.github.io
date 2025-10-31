// scripts/about.js

// === Tema claro/escuro (aplica no load e permite alternância se existir um botão) ===
(function () {
  const root = document.documentElement;
  const saved = localStorage.getItem('theme'); // 'light' ou 'dark'

  // Aplica tema guardado (light = classe 'light' no :root)
  if (saved === 'light') root.classList.add('light');
  else root.classList.remove('light');

  // Se existir um botão com id "theme-toggle" na página, liga comportamento
  const themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) {
    // Atualiza ícone/label inicial
    themeBtn.textContent = root.classList.contains('light') ? '🌙' : '☀️';

    themeBtn.addEventListener('click', () => {
      const isLight = root.classList.toggle('light');
      themeBtn.textContent = isLight ? '🌙' : '☀️';
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
    });
  }
})();

// === Botão "Copiar email" — adiciona ao lado de qualquer link mailto: na página ===
(function () {
  // Procura primeiro link mailto na página
  const mailLink = document.querySelector('a[href^="mailto:"]');
  if (!mailLink) return;

  // Criar botão de copiar
  const copyBtn = document.createElement('button');
  copyBtn.type = 'button';
  copyBtn.textContent = 'Copiar email';
  copyBtn.style.marginLeft = '8px';
  copyBtn.style.padding = '6px 10px';
  copyBtn.style.borderRadius = '8px';
  copyBtn.style.border = 'none';
  copyBtn.style.cursor = 'pointer';
  // Estilos inline simples para garantir visibilidade (podes mover para CSS)
  copyBtn.style.background = 'var(--accent)';
  copyBtn.style.color = 'white';
  copyBtn.style.fontWeight = '600';

  // Inserir o botão após o link
  mailLink.insertAdjacentElement('afterend', copyBtn);

  // Ao clicar copia o endereço para a área de transferência e dá feedback
  copyBtn.addEventListener('click', async () => {
    const href = mailLink.getAttribute('href'); // ex: mailto:franciscolopes...
    const email = href.replace(/^mailto:/i, '');
    try {
      await navigator.clipboard.writeText(email);
      const original = copyBtn.textContent;
      copyBtn.textContent = 'Copiado ✅';
      setTimeout(() => (copyBtn.textContent = original), 1500);
    } catch (err) {
      // Fallback: selecionar texto e tentar execCommand (antigo)
      const ta = document.createElement('textarea');
      ta.value = email;
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand('copy');
        copyBtn.textContent = 'Copiado ✅';
        setTimeout(() => (copyBtn.textContent = 'Copiar email'), 1500);
      } catch (e) {
        alert('Não foi possível copiar o email automaticamente. Seleciona e copia manualmente: ' + email);
      }
      document.body.removeChild(ta);
    }
  });
})();
