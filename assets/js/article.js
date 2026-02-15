// Article Page Handler
// Fetch and render markdown articles

// Configure marked.js with KaTeX support for math formulas
function configureMarked() {
  // Configure marked options
  marked.setOptions({
    breaks: true,
    gfm: true
  });

  // Override the code renderer to handle inline math
  const renderer = marked.renderer || new marked.Renderer();
  
  // Store original text renderer
  const originalText = renderer.text ? renderer.text.bind(renderer) : (text) => text;
  
  // Override text to handle inline math
  renderer.text = function(text) {
    // Handle inline math: $...$
    text = text.replace(/\$(?!\$)(.*?)\$/g, (match, formula) => {
      try {
        return katex.renderToString(formula, { 
          throwOnError: false,
          output: 'html'
        });
      } catch (e) {
        return match;
      }
    });
    return originalText(text);
  };

  // Override paragraph to handle block math: $$...$$
  const originalParagraph = renderer.paragraph ? renderer.paragraph.bind(renderer) : (text) => `<p>${text}</p>`;
  
  renderer.paragraph = function(text) {
    // Handle block math: $$...$$
    if (text.includes('$$')) {
      text = text.replace(/\$\$([\s\S]*?)\$\$/g, (match, formula) => {
        try {
          return `<div class="katex-block">${katex.renderToString(formula, { 
            throwOnError: false,
            output: 'html'
          })}</div>`;
        } catch (e) {
          return match;
        }
      });
      return text;
    }
    return originalParagraph(text);
  };

  marked.use({ renderer });
}

// Initialize marked with KaTeX support
configureMarked();

async function loadArticle(articlePath) {
  try {
    const url = new URL(articlePath, window.location.href);
    const response = await fetch(url);
    if (!response.ok) throw new Error("文章加载失败");
    
    const markdown = await response.text();
    return markdown;
  } catch (error) {
    console.error("Error loading article:", error);
    throw error;
  }
}

function parseMarkdownTitle(markdown) {
  const match = markdown.match(/^#\s+(.+)$/m);
  return match ? match[1] : "未命名文章";
}

function renderMarkdownToHtml(markdown) {
  return marked.parse(markdown);
}

// Get article path from URL parameter
function getArticlePathFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("path");
}

async function displayArticle() {
  const params = new URLSearchParams(window.location.search);
  const articlePath = params.get("path");
  const dateParam = params.get("date");
  const categoryParam = params.get("category");
  const sourceParam = params.get("source");
  const titleEl = document.getElementById("article-title");
  const contentEl = document.getElementById("article-content");
  const dateEl = document.getElementById("article-date");
  const categoryEl = document.getElementById("article-category");
  const backEl = document.getElementById("article-back");
  
  if (!articlePath) {
    contentEl.innerHTML = '<div class="article-error">文章路径无效</div>';
    return;
  }

  if (backEl) {
    if (sourceParam === "life") {
      backEl.href = "life.html";
      backEl.textContent = "← 返回生活";
    } else {
      backEl.href = "blog.html";
      backEl.textContent = "← 返回博客";
    }
  }

  const navLinks = document.querySelectorAll(".nav a");
  navLinks.forEach((link) => link.classList.remove("active"));
  const activeHref = sourceParam === "life" ? "life.html" : "blog.html";
  const activeLink = document.querySelector(`.nav a[href="${activeHref}"]`);
  if (activeLink) {
    activeLink.classList.add("active");
  }

  if (window.location.protocol === "file:") {
    contentEl.innerHTML = '<div class="article-error">当前使用 file:// 打开页面，浏览器会阻止读取本地 md 文件。请通过本地服务器访问站点。</div>';
    return;
  }
  
  if (dateEl) {
    dateEl.textContent = dateParam || "--";
  }
  if (categoryEl) {
    categoryEl.textContent = categoryParam || "未分类";
  }

  try {
    const markdown = await loadArticle(articlePath);
    const title = parseMarkdownTitle(markdown);
    const html = renderMarkdownToHtml(markdown);
    
    // Sanitize HTML
    const cleanHtml = DOMPurify.sanitize(html);
    
    titleEl.textContent = title;
    contentEl.innerHTML = cleanHtml;
    
    // Extract date from URL or markdown
    const dateMatch = markdown.match(/\*更新于\s+(.+)\*/);
    if (!dateParam && dateMatch) {
      dateEl.textContent = dateMatch[1];
    }
  } catch (error) {
    contentEl.innerHTML = `<div class="article-error">加载失败: ${error.message}</div>`;
  }
}

// Initialize on page load
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", displayArticle);
} else {
  displayArticle();
}
