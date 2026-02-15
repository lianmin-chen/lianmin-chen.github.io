const root = document.documentElement;
const themeToggle = document.getElementById("theme-toggle");
const langButtons = document.querySelectorAll(".lang-switch button");

const translations = {
  zh: {
    "brand.name": "元衍极",
    "brand.tagline": "始于一元，衍至无极",
    "nav.home": "首页",
    "nav.about": "关于我",
    "nav.blog": "博客文章",
    "nav.academic": "学术",
    "nav.life": "生活",
    "nav.contact": "联系方式",
    "footer.note": "始于一元，衍至无极",

    "index.eyebrow": "Minimal Core",
    "index.title": "多少事，从来急；<br>天地转，光阴迫。<br>一万年太久，只争朝夕！",
    "index.subtitle": "元衍极 · 始于一元，衍至无极",
    "index.pill1": "一元：最小假设",
    "index.pill2": "推演：结构化过程",
    "index.pill3": "无极：持续扩展",
    "index.figure": "思考中的人物形象占位",
    "index.method.eyebrow": "Method",
    "index.method.title": "品牌方法论缩影",
    "index.method.card1.title": "一元",
    "index.method.card1.desc": "从最小、最本质的假设出发，确保问题可被清晰定义。",
    "index.method.card2.title": "推演",
    "index.method.card2.desc": "结构化、可复现的推理过程，让观点可验证、可迭代。",
    "index.method.card3.title": "无极",
    "index.method.card3.desc": "体系可持续扩展，不封闭、不僵化。",
    "index.map.eyebrow": "Sections",
    "index.map.title": "栏目入口",
    "index.map.about": "关于我",
    "index.map.aboutDesc": "一个学生",
    "index.map.blog": "博客文章",
    "index.map.blogDesc": "不断积累~",
    "index.map.academic": "学术",
    "index.map.academicDesc": "可被严肃引用的输出。",
    "index.map.life": "生活",
    "index.map.lifeDesc": "首先，好好生活",
    "index.map.contact": "联系方式",
    "index.map.contactDesc": "开放而克制的连接方式。",
    "constraints.title": "统一设计约束",
    "constraints.item1": "留白优先，装饰最小化。",
    "constraints.item2": "色彩分工：蓝=结构，红=观点。",
    "constraints.item3": "先结构，后细节；先推理，后结论。",
    "summary.title": "给未来自己的话",
    "summary.desc": "这个网站不是为了展示“我很厉害”，而是为了让时间证明：我的思考是连贯的、可复用的、在持续生长的。",

    "about.eyebrow": "我是谁",
    "about.title": "一个学生",
    "about.subtitle": "学习研究人工智能中",
    "about.profile.title": "个人简介",
    "about.profile.desc": "你好呀！欢迎访问我的个人网站-元衍极，我是Lianmin Chen，一个来自华中科技大学计算机科学与技术学院的本科生。我的研究兴趣主要聚焦在机器学习领域，包括大模型、强化学习、零阶优化等方向。欢迎和我交流哇~",
    "about.mindset.title": "思维方式",
    "about.mindset.item1": "表示：先定义，再命名，让抽象可被共享。",
    "about.mindset.item2": "性质：寻找不变量，围绕核心构建。",
    "about.mindset.item3": "推演：以最小假设为起点，层层扩展。",
    "about.experience.title": "经历",
    "about.experience.desc": "每一段经历都回答一个问题：我学到了怎样组织结构，让问题变得可讨论。",
    "about.honor.title": "荣誉与成果",
    "about.honor.desc": "少而关键，只保留改变思考方向的节点。",

    "blog.eyebrow": "Blog",
    "blog.title": "不断积累~",
    "blog.subtitle": "分享自己的认识和思考。",
    "blog.topic.title": "专题 / 文章集合",
    "blog.topic.desc": "每个专题包含写作动机、总体脉络说明与有顺序的文章列表。",
    "blog.topic.list1": "写作动机：问题为何重要。",
    "blog.topic.list2": "总体脉络：从最小假设出发。",
    "blog.topic.list3": "顺序列表：推理路径可追踪。",
    "blog.single.title": "单篇文章结构",
    "blog.single.desc": "强调逻辑层级，重点句用红色竖线标注，数学与代码排版清晰。",
    "blog.single.item1": "支持 Markdown 与数学公式。",
    "blog.single.item2": "读者先看到结构，再看到结论。",
    "blog.list.title": "近期文章 / 独立文章",
    "blog.list.item1": "如何定义最小假设：结构化思考的起点",
    "blog.list.item2": "推理路径的可复现性：从方法到系统",
    "blog.list.item3": "复杂问题拆解：找到不变量与边界",

    "academic.eyebrow": "Academic",
    "academic.title": "可被学术与工业界严肃对待的输出",
    "academic.subtitle": "清晰胜过华丽，引用胜过堆叠。",
    "academic.idea.title": "总括",
    "academic.idea.desc": "以可复现、可引用、可扩展为最低标准，持续累积可被检验的成果。",
    "academic.paper.title": "论文列表",
    "academic.paper.item1": "结构化推理框架：从假设到系统 (2025)",
    "academic.paper.item2": "认知结构的可扩展性研究 (2024)",
    "academic.project.title": "项目列表",
    "academic.project.item1": "推理路径可视化工具",
    "academic.project.item2": "知识结构化的写作流程",

    "life.eyebrow": "Life",
    "life.title": "首先，好好生活。",
    "life.subtitle": "记录短而收敛的观察，不追热点。",
    "life.note": "这是一个让读者看到人的地方，但不喧宾夺主。",
    "life.item1": "在安静里复盘一周的结构性问题。",
    "life.item2": "把复杂问题写成可以分享的日常。",
    "life.item3": "让表达比情绪更清晰。",

    "contact.eyebrow": "Contact",
    "contact.title": "开放而克制的连接方式",
    "contact.subtitle": "如果你对我的文章或思考方式有共鸣，欢迎联系我。",
    "contact.email": "LianminChen@outlook.com",
    "contact.github": "https://github.com/lianmin-chen",
    "contact.media.wechat": "知乎",
    "contact.media.bilibili": "哔哩哔哩",
    "contact.media.linkedin": "微信公众号"
  },
  en: {
      "brand.name": "OriginX",
      "brand.tagline": "One Origin. Infinite Derivation.",
    "nav.home": "Home",
    "nav.about": "About",
    "nav.blog": "Blog",
    "nav.academic": "Academic",
    "nav.life": "Life",
    "nav.contact": "Contact",
    "footer.note": "From the One, Toward the Infinite",

    "index.eyebrow": "Minimal Core",
    "index.title": "So many deeds cry out to be done, and always urgently ; <br>the world rolls on, time presses.<br>Ten thousand years are too long ; seize the day, seize the hour!",
    "index.subtitle": "OriginX · One Origin. Infinite Derivation.",
    "index.pill1": "One: minimal assumptions",
    "index.pill2": "Derive: structured reasoning",
    "index.pill3": "Infinite: continuous expansion",
    "index.figure": "A calm, contemplative portrait placeholder",
    "index.method.eyebrow": "Method",
    "index.method.title": "Method in three moves",
    "index.method.card1.title": "One",
    "index.method.card1.desc": "Start from the smallest, most essential premise to define the problem clearly.",
    "index.method.card2.title": "Derive",
    "index.method.card2.desc": "Use repeatable, structured reasoning so ideas can be validated and iterated.",
    "index.method.card3.title": "Infinite",
    "index.method.card3.desc": "Keep the system expandable, open-ended, and alive.",
    "index.map.eyebrow": "Sections",
    "index.map.title": "Entry Points",
    "index.map.about": "About",
    "index.map.aboutDesc": "A student",
    "index.map.blog": "Blog",
    "index.map.blogDesc": "A place for continuous accumulation.",
    "index.map.academic": "Academic",
    "index.map.academicDesc": "Outputs that can be cited.",
    "index.map.life": "Life",
    "index.map.lifeDesc": "First, live well.",
    "index.map.contact": "Contact",
    "index.map.contactDesc": "Open yet restrained connections.",
    "constraints.title": "Design Constraints",
    "constraints.item1": "Whitespace first, minimal decoration.",
    "constraints.item2": "Color roles: blue for structure, red for viewpoints.",
    "constraints.item3": "Structure before detail; reasoning before conclusion.",
    "summary.title": "A note to my future self",
    "summary.desc": "This site is not to prove I'm impressive, but to let time show that my thinking is coherent, reusable, and growing.",

    "about.eyebrow": "Who am I",
    "about.title": "A student",
    "about.subtitle": "Studying and researching artificial intelligence",
    "about.profile.title": "Profile",
    "about.profile.desc": "Hello! Welcome to my personal website-OriginX. I'm Lianmin Chen, an undergraduate student from the School of Computer Science and Technology at Huazhong University of Science and Technology. My research interests mainly focus on machine learning, including large language models, reinforcement learning, and zeroth-order optimization. Feel free to reach out and chat with me!",
    "about.mindset.title": "Thinking Pattern",
    "about.mindset.item1": "Representation: define first, then name.",
    "about.mindset.item2": "Invariants: build around what does not change.",
    "about.mindset.item3": "Derivation: expand layer by layer from minimal assumptions.",
    "about.experience.title": "Experience",
    "about.experience.desc": "Every transition answers: how to organize structure so complexity is discussable.",
    "about.honor.title": "Honors",
    "about.honor.desc": "Few but pivotal milestones that reshaped my thinking path.",

    "blog.eyebrow": "Blog",
    "blog.title": "A place for continuous accumulation",
    "blog.subtitle": "Sharing my understanding and thoughts",
    "blog.topic.title": "Topics / Series",
    "blog.topic.desc": "Each topic includes motivation, a clear map, and ordered essays.",
    "blog.topic.list1": "Motivation: why the problem matters.",
    "blog.topic.list2": "Map: start from minimal assumptions.",
    "blog.topic.list3": "Order: traceable reasoning path.",
    "blog.single.title": "Single Article Structure",
    "blog.single.desc": "Emphasize logic layers, mark key lines in red, and present math/code clearly.",
    "blog.single.item1": "Markdown and math support.",
    "blog.single.item2": "Readers see structure before conclusions.",
    "blog.list.title": "Recent / Independent Essays",
    "blog.list.item1": "Defining minimal assumptions: the start of structured thinking",
    "blog.list.item2": "Reproducible reasoning paths: from method to system",
    "blog.list.item3": "Decomposing complexity: invariants and boundaries",

    "academic.eyebrow": "Academic",
    "academic.title": "Outputs that can be taken seriously",
    "academic.subtitle": "Clarity beats decoration; citation beats accumulation.",
    "academic.idea.title": "Overview",
    "academic.idea.desc": "Set reproducibility, citation, and extensibility as the baseline, and accumulate verifiable results over time.",
    "academic.paper.title": "Papers",
    "academic.paper.item1": "A framework for structured reasoning (2025)",
    "academic.paper.item2": "Expandable cognitive architectures (2024)",
    "academic.project.title": "Projects",
    "academic.project.item1": "Reasoning path visualization",
    "academic.project.item2": "Structured writing workflow",

    "life.eyebrow": "Life",
    "life.title": "First, live well.",
    "life.subtitle": "Short, quiet notes with no trend chasing.",
    "life.note": "A place to reveal the person without taking over the site.",
    "life.item1": "Reviewing the week's structural questions in silence.",
    "life.item2": "Turning complexity into shareable daily notes.",
    "life.item3": "Letting clarity speak louder than emotion.",

    "contact.eyebrow": "Contact",
    "contact.title": "Open yet restrained",
    "contact.subtitle": "If my writing or thinking resonates with you, feel free to reach out.",
    "contact.email": "LianminChen@outlook.com",
    "contact.github": "https://github.com/lianmin-chen",
    "contact.media.wechat": "Zhihu",
    "contact.media.bilibili": "Bilibili",
    "contact.media.linkedin": "WeChat Official Account"
  }
};

const themeLabels = {
  light: { zh: "日", en: "Light" },
  dark: { zh: "夜", en: "Dark" }
};

function setTheme(theme) {
  root.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  const currentLang = localStorage.getItem("lang") || "zh";
  if (themeToggle) {
    themeToggle.textContent = themeLabels[theme][currentLang];
  }
  // Update figure image based on theme
  updateFigureImage(theme);
}

function updateFigureImage(theme) {
  const figureImg = document.getElementById("figure-img");
  if (figureImg) {
    const filename = theme === "light" ? "light_figure3-4.png" : "dark_figure3-4.png";
    figureImg.src = `assets/images/${filename}`;
  }
}

function setLanguage(lang) {
  localStorage.setItem("lang", lang);
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (translations[lang] && translations[lang][key]) {
      el.innerHTML = translations[lang][key];
    }
  });
  langButtons.forEach((btn) => btn.classList.toggle("active", btn.dataset.lang === lang));
  const currentTheme = root.getAttribute("data-theme") || "light";
  if (themeToggle) {
    themeToggle.textContent = themeLabels[currentTheme][lang];
  }
  document.documentElement.lang = lang === "zh" ? "zh" : "en";
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const nextTheme = root.getAttribute("data-theme") === "light" ? "dark" : "light";
    setTheme(nextTheme);
  });
}

langButtons.forEach((btn) => {
  btn.addEventListener("click", () => setLanguage(btn.dataset.lang));
});

const savedTheme = localStorage.getItem("theme") || "light";
const savedLang = localStorage.getItem("lang") || ((navigator.language || "zh").startsWith("zh") ? "zh" : "en");
setTheme(savedTheme);
setLanguage(savedLang);

// Initialize figure image based on saved theme
updateFigureImage(savedTheme);
// ========== Blog System ==========
// Blog data structure
const blogData = {
  topics: [
    {
      id: "topic-1",
      title: "结构化思维基础",
      description: "深入理解结构化思维的核心概念",
      date: "2026-02-14",
      articles: [
        { id: "article-1", title: "定义最小假设", date: "2026-02-14", path: "blog/topics/topic-1/article-1.md" },
        { id: "article-2", title: "识别不变量", date: "2026-02-13", path: "blog/topics/topic-1/article-2.md" },
        { id: "article-3", title: "构建推理框架", date: "2026-02-12", path: "blog/topics/topic-1/article-3.md" }
      ]
    },
    {
      id: "topic-2",
      title: "推理系统设计",
      description: "从推理方法到完整系统的构建",
      date: "2026-02-10",
      articles: [
        { id: "article-4", title: "推理可复现性", date: "2026-02-10" },
        { id: "article-5", title: "系统扩展性", date: "2026-02-09" }
      ]
    },
    {
      id: "topic-3",
      title: "复杂问题拆解",
      description: "实用的拆解方法和工具",
      date: "2026-02-05",
      articles: [
        { id: "article-6", title: "边界识别", date: "2026-02-05" },
        { id: "article-7", title: "变量设计", date: "2026-02-04" }
      ]
    }
  ],
  articles: [
    { id: "single-test", title: "Markdown 语法测试文章", date: "2026-02-15", category: "Test", path: "blog/articles/test.md" },
    { id: "single-1", title: "机器学习最新进展", date: "2026-02-11", category: "ML", path: "./blog/articles/single-1.md" },
    { id: "single-2", title: "大模型微调最佳实践", date: "2026-02-08", category: "LLM", path: "blog/articles/single-2.md" },
    { id: "single-3", title: "强化学习基础回顾", date: "2026-02-03", category: "RL", path: "blog/articles/single-3.md" },
    { id: "single-4", title: "零阶优化算法浅析", date: "2026-01-28", category: "Optimization", path: "blog/articles/single-4.md" },
    { id: "single-5", title: "测试文章", date: "2026-03-28", category: "Test", path: "blog/articles/single-5.md" }
  ]
};

const lifeData = {
  topics: [
    {
      id: "life-topic-1",
      title: "安静复盘",
      description: "低频但完整的结构性回顾",
      date: "2026-02-10",
      articles: [
        { id: "life-article-1", title: "在安静里复盘一周的结构性问题", date: "2026-02-14", path: "life-articles/week-review.md" },
        { id: "life-article-2", title: "把复杂问题写成可以分享的日常", date: "2026-01-28", path: "life-articles/daily-notes.md" }
      ]
    }
  ],
  articles: [
    { id: "life-single-1", title: "让表达比情绪更清晰", date: "2025-12-12", category: "Life", path: "life-articles/clarity.md" }
  ]
};

// Helper function to render topics
function renderBlogContent(searchTerm = "", sortBy = "latest") {
  const searchLower = searchTerm.toLowerCase();
  
  // Filter and sort
  let filteredTopics = blogData.topics.filter(t => 
    t.title.toLowerCase().includes(searchLower) || 
    t.articles.some(a => a.title.toLowerCase().includes(searchLower))
  );
  
  let filteredArticles = blogData.articles.filter(a =>
    a.title.toLowerCase().includes(searchLower)
  );
  
  // Sort
  const sortFn = (a, b) => {
    if (sortBy === "latest") {
      return new Date(b.date) - new Date(a.date);
    } else {
      return new Date(a.date) - new Date(b.date);
    }
  };
  
  filteredTopics.sort(sortFn);
  filteredArticles.sort(sortFn);
  
  renderTopics(filteredTopics);
  renderArticles(filteredArticles);
}

function renderTopics(topics) {
  const container = document.getElementById("topics-container");
  if (!container) return;
  
  container.innerHTML = topics.map(topic => `
    <div class="topic-card reveal">
      <div class="topic-header" onclick="toggleTopic('${topic.id}')">
        <h4 class="topic-title">${topic.title}</h4>
        <div class="topic-toggle">▼</div>
      </div>
      <p class="topic-desc">${topic.description}</p>
      <div class="topic-count">${topic.articles.length} 篇文章</div>
      <div class="topic-articles" id="articles-${topic.id}">
        ${topic.articles.map(article => `
          <div class="article-item" onclick="openArticle('${article.id}')">
            <div class="article-item-title">${article.title}</div>
            <div class="article-item-meta">${article.date}</div>
          </div>
        `).join("")}
      </div>
    </div>
  `).join("");
}

function renderArticles(articles) {
  const container = document.getElementById("articles-container");
  if (!container) return;
  
  container.innerHTML = articles.map(article => `
    <div class="article-card reveal" onclick="openArticle('${article.id}')">
      <h4 class="article-card-title">${article.title}</h4>
      <div class="article-card-meta">${article.date} · ${article.category}</div>
    </div>
  `).join("");
}

function renderLifeContent(searchTerm = "", sortBy = "latest") {
  const searchLower = searchTerm.toLowerCase();

  let filteredTopics = lifeData.topics.filter(t =>
    t.title.toLowerCase().includes(searchLower) ||
    t.articles.some(a => a.title.toLowerCase().includes(searchLower))
  );

  let filteredArticles = lifeData.articles.filter(a =>
    a.title.toLowerCase().includes(searchLower)
  );

  const sortFn = (a, b) => {
    if (sortBy === "latest") {
      return new Date(b.date) - new Date(a.date);
    }
    return new Date(a.date) - new Date(b.date);
  };

  filteredTopics.sort(sortFn);
  filteredArticles.sort(sortFn);

  renderLifeTopics(filteredTopics);
  renderLifeArticles(filteredArticles);
}

function renderLifeTopics(topics) {
  const container = document.getElementById("life-topics-container");
  if (!container) return;

  container.innerHTML = topics.map(topic => `
    <div class="topic-card reveal">
      <div class="topic-header" onclick="toggleTopic('${topic.id}')">
        <h4 class="topic-title">${topic.title}</h4>
        <div class="topic-toggle">▼</div>
      </div>
      <p class="topic-desc">${topic.description}</p>
      <div class="topic-count">${topic.articles.length} 篇文章</div>
      <div class="topic-articles" id="articles-${topic.id}">
        ${topic.articles.map(article => `
          <div class="article-item" onclick="openLifeArticle('${article.id}')">
            <div class="article-item-title">${article.title}</div>
            <div class="article-item-meta">${article.date}</div>
          </div>
        `).join("")}
      </div>
    </div>
  `).join("");
}

function renderLifeArticles(articles) {
  const container = document.getElementById("life-articles-container");
  if (!container) return;

  container.innerHTML = articles.map(article => `
    <div class="article-card reveal" onclick="openLifeArticle('${article.id}')">
      <h4 class="article-card-title">${article.title}</h4>
      <div class="article-card-meta">${article.date} · ${article.category || "生活"}</div>
    </div>
  `).join("");
}

function toggleTopic(topicId) {
  const container = document.getElementById(`articles-${topicId}`);
  const toggle = event.currentTarget.querySelector(".topic-toggle");
  if (container) {
    container.classList.toggle("open");
    toggle.classList.toggle("open");
  }
}

function openArticle(articleId) {
  // Find article path from blog data
  let articlePath = null;
  let articleDate = null;
  let articleCategory = null;
  
  // Search in topics
  for (const topic of blogData.topics) {
    const article = topic.articles.find(a => a.id === articleId);
    if (article) {
      articlePath = article.path;
      articleDate = article.date;
      articleCategory = topic.title;
      break;
    }
  }
  
  // Search in standalone articles
  if (!articlePath) {
    const article = blogData.articles.find(a => a.id === articleId);
    if (article) {
      articlePath = article.path;
      articleDate = article.date;
      articleCategory = article.category;
    }
  }
  
  // Navigate to article page
  if (articlePath) {
    const params = new URLSearchParams();
    params.set("path", articlePath);
    params.set("source", "blog");
    if (articleDate) params.set("date", articleDate);
    if (articleCategory) params.set("category", articleCategory);
    window.location.href = `article.html?${params.toString()}`;
  } else {
    console.error("Article not found: " + articleId);
  }
}

function openLifeArticle(articleId) {
  let articlePath = null;
  let articleDate = null;
  let articleCategory = null;

  for (const topic of lifeData.topics) {
    const article = topic.articles.find(a => a.id === articleId);
    if (article) {
      articlePath = article.path;
      articleDate = article.date;
      articleCategory = topic.title;
      break;
    }
  }

  if (!articlePath) {
    const article = lifeData.articles.find(a => a.id === articleId);
    if (article) {
      articlePath = article.path;
      articleDate = article.date;
      articleCategory = article.category || "生活";
    }
  }

  if (articlePath) {
    const params = new URLSearchParams();
    params.set("path", articlePath);
    params.set("source", "life");
    if (articleDate) params.set("date", articleDate);
    if (articleCategory) params.set("category", articleCategory);
    window.location.href = `article.html?${params.toString()}`;
  } else {
    console.error("Life article not found: " + articleId);
  }
}

// Initialize blog page
function initBlogPage() {
  // Check if we're on blog page
  if (!document.getElementById("topics-container")) return;
  
  // Set up search
  const searchInput = document.getElementById("blog-search");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const sortBtn = document.querySelector(".sort-btn.active");
      const sortBy = sortBtn ? sortBtn.dataset.sort : "latest";
      renderBlogContent(e.target.value, sortBy);
    });
  }
  
  // Set up sort buttons
  const sortBtns = document.querySelectorAll(".sort-btn");
  sortBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      sortBtns.forEach(b => b.classList.remove("active"));
      e.target.classList.add("active");
      const searchInput = document.getElementById("blog-search");
      const searchTerm = searchInput ? searchInput.value : "";
      renderBlogContent(searchTerm, e.target.dataset.sort);
    });
  });
  
  // Initial render
  renderBlogContent("", "latest");
}

function initLifePage() {
  if (!document.getElementById("life-topics-container")) return;

  const searchInput = document.getElementById("life-search");
  const controls = document.querySelector(".life-controls");
  const sortBtns = controls ? controls.querySelectorAll(".sort-btn") : [];

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const activeBtn = controls ? controls.querySelector(".sort-btn.active") : null;
      const sortBy = activeBtn ? activeBtn.dataset.sort : "latest";
      renderLifeContent(e.target.value, sortBy);
    });
  }

  sortBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      sortBtns.forEach(b => b.classList.remove("active"));
      e.target.classList.add("active");
      const searchTerm = searchInput ? searchInput.value : "";
      renderLifeContent(searchTerm, e.target.dataset.sort);
    });
  });

  renderLifeContent("", "latest");
}

function initContactMediaToggles() {
  const toggles = document.querySelectorAll("[data-toggle-target]");
  if (!toggles.length) return;
  toggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const targetId = toggle.getAttribute("data-toggle-target");
      const target = targetId ? document.getElementById(targetId) : null;
      if (!target) return;
      const isVisible = target.classList.toggle("is-visible");
      toggle.setAttribute("aria-expanded", isVisible ? "true" : "false");
    });
  });
}

// Initialize on page load
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initBlogPage);
  document.addEventListener("DOMContentLoaded", initLifePage);
  document.addEventListener("DOMContentLoaded", initContactMediaToggles);
} else {
  initBlogPage();
  initLifePage();
  initContactMediaToggles();
}