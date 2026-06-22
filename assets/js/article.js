// Article Page Handler
// Fetch and render markdown articles

// Configure marked.js with KaTeX support for math formulas
function configureMarked() {
  // Configure marked options
  marked.setOptions({
    breaks: false,
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
    // Check if paragraph is ONLY a block math formula (with optional whitespace)
    const blockMathMatch = text.match(/^\s*\$\$([\s\S]*?)\$\$\s*$/);
    if (blockMathMatch) {
      const formula = blockMathMatch[1].trim();
      try {
        const rendered = katex.renderToString(formula, { 
          throwOnError: false,
          output: 'html'
        });
        return `<div class="katex-block">${rendered}</div>`;
      } catch (e) {
        return originalParagraph(text);
      }
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

function processBlockMathInDOM(container) {
  // Find all paragraphs and check for block math
  const paragraphs = container.querySelectorAll('p');
  
  paragraphs.forEach(p => {
    const text = p.innerHTML;
    
    // Check if paragraph contains block math: $$...$$
    const blockMathRegex = /\$\$([\s\S]*?)\$\$/g;
    let match;
    let hasBlockMath = false;
    
    while ((match = blockMathRegex.exec(text)) !== null) {
      hasBlockMath = true;
      const formula = match[1];
      try {
        const rendered = katex.renderToString(formula, { 
          throwOnError: false,
          output: 'html'
        });
        
        // Replace only the formula part, keeping surrounding text
        const replacement = `<div class="katex-block">${rendered}</div>`;
        p.innerHTML = p.innerHTML.replace(match[0], replacement);
      } catch (e) {
        console.error('Failed to render math:', e);
      }
    }
  });
}

function slugifyHeading(text) {
  const base = text
    .toLowerCase()
    .trim()
    .replace(/[\s]+/g, "-")
    .replace(/[^\w\u4e00-\u9fa5-]/g, "");
  return base || "section";
}

function buildArticleToc(container) {
  const tocEl = document.getElementById("toc");
  const tocMobileEl = document.getElementById("toc-mobile");
  const tocPanel = document.querySelector(".toc-panel");
  const tocMobile = document.querySelector(".toc-mobile");
  if (!tocEl || !tocMobileEl) return;

  const headings = Array.from(container.querySelectorAll("h1, h2, h3, h4, h5, h6"));
  if (!headings.length) {
    const emptyText = document.documentElement.lang === "en" ? "No headings" : "暂无目录";
    tocEl.innerHTML = `<p class="toc-empty">${emptyText}</p>`;
    tocMobileEl.innerHTML = `<p class="toc-empty">${emptyText}</p>`;
    if (tocPanel) tocPanel.style.display = "";
    if (tocMobile) tocMobile.style.display = "";
    return;
  }

  const usedSlugs = new Set();
  const list = document.createElement("ul");
  list.className = "toc-list";

  headings.forEach((heading) => {
    const text = heading.textContent.trim();
    if (!text) return;
    const level = Number(heading.tagName.replace("H", ""));
    let slug = heading.id || slugifyHeading(text);
    let uniqueSlug = slug;
    let index = 1;
    while (usedSlugs.has(uniqueSlug)) {
      uniqueSlug = `${slug}-${index}`;
      index += 1;
    }
    usedSlugs.add(uniqueSlug);
    heading.id = uniqueSlug;

    const item = document.createElement("li");
    item.className = `toc-item level-${level}`;
    const link = document.createElement("a");
    link.className = "toc-link";
    link.href = `#${uniqueSlug}`;
    link.textContent = text;
    link.dataset.tocTarget = uniqueSlug;
    item.appendChild(link);
    list.appendChild(item);
  });

  tocEl.innerHTML = "";
  tocMobileEl.innerHTML = "";
  tocEl.appendChild(list.cloneNode(true));
  tocMobileEl.appendChild(list.cloneNode(true));

  const tocLinks = document.querySelectorAll(".toc-link");
  const setActive = (id) => {
    tocLinks.forEach((link) => {
      link.classList.toggle("active", link.dataset.tocTarget === id);
    });
  };

  tocLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.dataset.tocTarget;
      const target = targetId ? document.getElementById(targetId) : null;
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", `#${targetId}`);
      setActive(targetId);
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActive(entry.target.id);
        }
      });
    },
    { rootMargin: "0px 0px -70% 0px", threshold: 0.1 }
  );

  headings.forEach((heading) => observer.observe(heading));
  if (headings[0]) {
    setActive(headings[0].id);
  }
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
    document.title = `${title} | 元衍极`;
    contentEl.innerHTML = cleanHtml;
    
    // Process block math formulas in the DOM
    processBlockMathInDOM(contentEl);
    buildArticleToc(contentEl);
    requestAnimationFrame(updateReadingProgress);
    
    // Extract date from URL or markdown
    const dateMatch = markdown.match(/\*更新于\s+(.+)\*/);
    if (!dateParam && dateMatch) {
      dateEl.textContent = dateMatch[1];
    }
  } catch (error) {
    contentEl.innerHTML = `<div class="article-error">加载失败: ${error.message}</div>`;
  }
}

function updateReadingProgress() {
  const progress = document.getElementById("reading-progress");
  const article = document.querySelector(".article-page");
  if (!progress || !article) return;
  const rect = article.getBoundingClientRect();
  const articleTop = window.scrollY + rect.top;
  const total = Math.max(article.offsetHeight - window.innerHeight, 1);
  const current = Math.min(Math.max(window.scrollY - articleTop, 0), total);
  progress.style.transform = `scaleX(${current / total})`;
}

window.addEventListener("scroll", updateReadingProgress, { passive: true });
window.addEventListener("resize", updateReadingProgress);

// Initialize on page load
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", displayArticle);
  document.addEventListener("DOMContentLoaded", updateReadingProgress);
} else {
  displayArticle();
  updateReadingProgress();
}
