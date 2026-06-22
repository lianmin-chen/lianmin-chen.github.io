const root = document.documentElement;
const themeToggle = document.getElementById("theme-toggle");
const langButtons = document.querySelectorAll(".lang-switch button");
const siteHeader = document.querySelector(".site-header");

function initNavigation() {
  if (!siteHeader) return;
  const nav = siteHeader.querySelector(".nav");
  const actions = siteHeader.querySelector(".header-actions");
  if (!nav || !actions || siteHeader.querySelector(".nav-toggle")) return;

  nav.id = nav.id || "site-navigation";
  const toggle = document.createElement("button");
  toggle.className = "nav-toggle";
  toggle.type = "button";
  toggle.setAttribute("aria-controls", nav.id);
  toggle.setAttribute("aria-expanded", "false");
  toggle.setAttribute("aria-label", "打开导航菜单");
  toggle.innerHTML = "<span></span><span></span><span></span>";
  siteHeader.insertBefore(toggle, actions);

  const closeMenu = () => {
    siteHeader.classList.remove("nav-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "打开导航菜单");
  };

  toggle.addEventListener("click", () => {
    const isOpen = siteHeader.classList.toggle("nav-open");
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    toggle.setAttribute("aria-label", isOpen ? "关闭导航菜单" : "打开导航菜单");
  });

  nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) closeMenu();
  });
}

function syncFixedHeader() {
  if (!siteHeader) return;
  root.style.setProperty("--site-header-height", `${siteHeader.offsetHeight}px`);
  siteHeader.classList.toggle("is-scrolled", window.scrollY > 12);
}

if (siteHeader) {
  syncFixedHeader();
  window.addEventListener("scroll", syncFixedHeader, { passive: true });
  window.addEventListener("resize", syncFixedHeader);

  if ("ResizeObserver" in window) {
    const headerObserver = new ResizeObserver(syncFixedHeader);
    headerObserver.observe(siteHeader);
  }
}

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

    "index.eyebrow": "个人研究与写作",
    "index.title": "始于一元，<span>衍至无极</span>",
    "index.subtitle": "多少事，从来急；天地转，光阴迫。<br>一万年太久，只争朝夕！",
    "index.intro": "我是 Lianmin Chen，关注机器学习、大模型、强化学习与优化，在这里持续记录研究、思考与生活。",
    "index.cta.research": "探索研究",
    "index.cta.blog": "阅读文章",
    "index.figure.note": "观察 · 理解 · 洞察",
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
    "index.map.eyebrow": "探索",
    "index.map.title": "从这里继续探索",
    "index.map.note": "研究、写作与生活，共同构成持续生长的知识系统。",
    "index.map.about": "关于我",
    "index.map.aboutDesc": "一个学生",
    "index.map.blog": "技术博客",
    "index.map.blogDesc": "记录清晰、可追踪的学习与推理路径。",
    "index.map.academic": "学术研究",
    "index.map.academicDesc": "论文、项目与可被检验的研究成果。",
    "index.map.life": "生活札记",
    "index.map.lifeDesc": "首先，好好生活；然后认真观察。",
    "index.map.contact": "联系我",
    "index.map.contactDesc": "开放而克制的连接方式。",
    "constraints.title": "统一设计约束",
    "constraints.item1": "留白优先，装饰最小化。",
    "constraints.item2": "色彩分工：蓝=结构，红=观点。",
    "constraints.item3": "先结构，后细节；先推理，后结论。",
    "summary.title": "给未来自己的话",
    "summary.desc": "这个网站不是为了展示“我很厉害”，而是为了让时间证明：我的思考是连贯的、可复用的、在持续生长的。",

    "about.eyebrow": "ABOUT · 个人档案",
    "about.title": "一个学生",
    "about.subtitle": "计算机科学本科生，正在学习与研究人工智能",
    "about.statement": "我关注机器学习中的模型、决策与优化问题，也在持续寻找一种更清晰、更可复现的方式组织研究与表达。",
    "about.status": "学习中 · 探索中",
    "about.identity.school": "学校",
    "about.identity.major": "专业",
    "about.identity.status": "身份",
    "about.pill1": "华中科技大学",
    "about.pill2": "本科生",
    "about.pill3": "计算机科学与技术",
    "about.profile.title": "个人简介",
    "about.profile.lead": "保持好奇，认真研究，也认真生活。",
    "about.profile.desc": "你好呀！欢迎访问我的个人网站-元衍极，我是Lianmin Chen，一个来自华中科技大学计算机科学与技术学院的本科生。我的研究兴趣主要聚焦在机器学习领域，包括大模型、强化学习、零阶优化等方向。欢迎和我交流哇~",
    "about.mindset.title": "思维方式",
    "about.mindset.item1": "表示：先定义，再命名，让抽象可被共享。",
    "about.mindset.item2": "性质：寻找不变量，围绕核心构建。",
    "about.mindset.item3": "推演：以最小假设为起点，层层扩展。",
    "about.focus.title": "研究兴趣",
    "about.focus.llm": "大模型与智能系统",
    "about.focus.rl": "强化学习与决策",
    "about.focus.opt": "零阶优化与学习算法",
    "about.focus.link": "查看学术与项目",
    "about.experience.title": "经历",
    "about.experience.desc": "每一段经历都在拓宽问题的边界，也让研究方向逐渐清晰。",
    "about.experience.summer": "夏季",
    "about.experience.present": "现在",
    "about.experience.internship": "暑期实习",
    "about.honor.title": "荣誉与成果",
    "about.honor.desc": "少而关键，只保留推动自己继续前进的节点。",
    "about.honor.label": "综合荣誉",
    "about.honor.item": "三好学生 · 多次获得",

    "blog.eyebrow": "BLOG · 知识索引",
    "blog.title": "记录思考，<br><span>持续生长。</span>",
    "blog.subtitle": "围绕机器学习、人工智能与结构化思考，记录可以被追踪、复用和继续推演的知识。",
    "blog.manifesto.label": "写作原则",
    "blog.manifesto.quote": "先建立结构，再填充细节；先记录路径，再给出结论。",
    "blog.sort.label": "排序",
    "blog.sort.latest": "最新",
    "blog.sort.oldest": "最早",
    "blog.topic.heading": "专题系列",
    "blog.topic.intro": "围绕一个核心问题持续展开，保留文章之间的推演关系。",
    "blog.article.heading": "独立文章",
    "blog.article.intro": "不依赖专题的单篇记录，按时间形成持续更新的思想索引。",
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

    "academic.eyebrow": "ACADEMIC · 研究档案",
    "academic.title": "研究需要被<br><span>清晰地检验。</span>",
    "academic.subtitle": "从问题定义、实验设计到结果表达，记录那些能够被讨论、复现与继续推进的研究工作。",
    "academic.status": "探索问题，构建方法，验证结论。",
    "academic.idea.title": "总括",
    "academic.idea.desc": "以可复现、可引用、可扩展为最低标准，持续累积可被检验的成果。",
    "academic.paper.title": "论文与成果",
    "academic.paper.item1": "结构化推理框架：从假设到系统 (2025)",
    "academic.paper.item2": "认知结构的可扩展性研究 (2024)",
    "academic.project.title": "项目列表",
    "academic.project.intro": "把研究中的方法、工具与知识组织方式沉淀成可持续迭代的系统。",
    "academic.project.state": "研究原型 · 持续迭代",
    "academic.project.item1": "推理路径可视化工具",
    "academic.project.item2": "知识结构化的写作流程",
    "academic.links.title": "学术入口",
    "academic.links.scholar": "论文引用与研究概览",
    "academic.links.dblp": "计算机领域文献索引",
    "academic.links.openreview": "评审与学术讨论平台",

    "life.eyebrow": "LIFE · 日常观察",
    "life.title": "首先，<br><span>好好生活。</span>",
    "life.subtitle": "阅读、运动、音乐、城市与人的细节，构成研究之外的另一套知识系统。这里收集缓慢发生、值得记住的日常。",
    "life.quote": "生活不是研究之外的空白，它是所有思考最终需要返回的地方。",
    "life.series.title": "缓慢展开的系列",
    "life.series.desc": "不追逐更新频率，只记录值得回看的变化与问题。",
    "life.notes.title": "独立札记",
    "life.notes.desc": "一些短而收敛的表达，保存当时真实的观察。",
    "life.note": "这是一个让读者看到人的地方，但不喧宾夺主。",
    "life.item1": "在安静里复盘一周的结构性问题。",
    "life.item2": "把复杂问题写成可以分享的日常。",
    "life.item3": "让表达比情绪更清晰。",

    "contact.eyebrow": "CONTACT · 建立连接",
    "contact.title": "开放交流，<br><span>保持真诚。</span>",
    "contact.subtitle": "欢迎讨论研究、技术与写作，也欢迎交换尚未成熟的想法。请选择最适合当前话题的连接方式。",
    "contact.status": "开放交流与合作",
    "contact.email": "LianminChen@outlook.com",
    "contact.github": "https://github.com/lianmin-chen",
    "contact.note": "常用邮箱",
    "contact.open": "公开协作",
    "contact.media": "内容平台",
    "contact.email.desc": "学术合作、项目邀约与长期交流均可通过邮件联系。",
    "contact.github.desc": "代码、实验与文档的最新更新会同步在这里。",
    "contact.media.desc": "不同媒介承载不同密度的表达，也留下持续更新的路径。",
    "contact.media.wechat": "知乎",
    "contact.media.bilibili": "哔哩哔哩",
    "contact.media.linkedin": "微信公众号",
    "contact.media.zhihu.title": "知乎长文",
    "contact.media.zhihu.desc": "用于发布结构化思考、研究笔记与延展阅读。",
    "contact.media.zhihu.link": "打开知乎主页",
    "contact.media.bilibili.title": "视频讲解",
    "contact.media.bilibili.desc": "公开视频、概念拆解与实验演示会同步在这里。",
    "contact.media.bilibili.link": "打开哔哩哔哩主页",
    "contact.media.xiaohongshu": "小红书",
    "contact.media.xiaohongshu.title": "笔记更新",
    "contact.media.xiaohongshu.desc": "轻量分享、灵感记录与日常观察会发布在这里。",
    "contact.media.xiaohongshu.link": "打开小红书主页",
    "contact.media.wechat.title": "微信公众号",
    "contact.media.wechat.desc": "简短更新与系列文章发布。",
    "contact.media.wechat.tip": "微信搜索「元衍极」或扫描右侧二维码",

    "footer.copyright": "本站内容与设计未经允许，不得以任何形式转载或用于商业目的。",
    "article.toc": "目录",
    "article.end": "感谢阅读。愿每一次记录都让思考更清晰。"
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

    "index.eyebrow": "PERSONAL RESEARCH & WRITING",
    "index.title": "One Origin. <span>Infinite Derivation.</span>",
    "index.subtitle": "So many deeds cry out to be done; the world rolls on, time presses.<br>Ten thousand years are too long; seize the day, seize the hour.",
    "index.intro": "I'm Lianmin Chen. I study machine learning, large language models, reinforcement learning, and optimization, while documenting research, ideas, and life.",
    "index.cta.research": "Explore research",
    "index.cta.blog": "Read articles",
    "index.figure.note": "Observe · Understand · Discover",
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
    "index.map.eyebrow": "EXPLORE",
    "index.map.title": "Continue exploring",
    "index.map.note": "Research, writing, and life form a knowledge system that keeps growing.",
    "index.map.about": "About",
    "index.map.aboutDesc": "A student",
    "index.map.blog": "Technical Blog",
    "index.map.blogDesc": "Clear, traceable paths through learning and reasoning.",
    "index.map.academic": "Research",
    "index.map.academicDesc": "Papers, projects, and work that can be examined.",
    "index.map.life": "Life Notes",
    "index.map.lifeDesc": "Live well first, then observe carefully.",
    "index.map.contact": "Contact Me",
    "index.map.contactDesc": "Open yet restrained connections.",
    "constraints.title": "Design Constraints",
    "constraints.item1": "Whitespace first, minimal decoration.",
    "constraints.item2": "Color roles: blue for structure, red for viewpoints.",
    "constraints.item3": "Structure before detail; reasoning before conclusion.",
    "summary.title": "A note to my future self",
    "summary.desc": "This site is not to prove I'm impressive, but to let time show that my thinking is coherent, reusable, and growing.",

    "about.eyebrow": "ABOUT · PROFILE",
    "about.title": "A student",
    "about.subtitle": "Computer science undergraduate studying and researching artificial intelligence",
    "about.statement": "I focus on models, decision-making, and optimization in machine learning, while seeking clearer and more reproducible ways to organize research and communication.",
    "about.status": "LEARNING · EXPLORING",
    "about.identity.school": "School",
    "about.identity.major": "Major",
    "about.identity.status": "Status",
    "about.pill1": "Huazhong University",
    "about.pill2": "Undergraduate",
    "about.pill3": "Computer Science and Technology",
    "about.profile.title": "Profile",
    "about.profile.lead": "Stay curious, take research seriously, and live well.",
    "about.profile.desc": "Hello! Welcome to my personal website-OriginX. I'm Lianmin Chen, an undergraduate student from the School of Computer Science and Technology at Huazhong University of Science and Technology. My research interests mainly focus on machine learning, including large language models, reinforcement learning, and zeroth-order optimization. Feel free to reach out and chat with me!",
    "about.mindset.title": "Thinking Pattern",
    "about.mindset.item1": "Representation: define first, then name.",
    "about.mindset.item2": "Invariants: build around what does not change.",
    "about.mindset.item3": "Derivation: expand layer by layer from minimal assumptions.",
    "about.focus.title": "Research Interests",
    "about.focus.llm": "Large models and intelligent systems",
    "about.focus.rl": "Reinforcement learning and decision-making",
    "about.focus.opt": "Zeroth-order optimization and learning algorithms",
    "about.focus.link": "View research and projects",
    "about.experience.title": "Experience",
    "about.experience.desc": "Each experience expands the boundary of the questions I ask and gradually clarifies my research direction.",
    "about.experience.summer": "Summer",
    "about.experience.present": "Present",
    "about.experience.internship": "Summer Internship",
    "about.honor.title": "Honors",
    "about.honor.desc": "A small set of milestones that keeps me moving forward.",
    "about.honor.label": "General Honor",
    "about.honor.item": "Outstanding Student · Multiple Awards",

    "blog.eyebrow": "BLOG · KNOWLEDGE INDEX",
    "blog.title": "Document ideas.<br><span>Keep growing.</span>",
    "blog.subtitle": "Notes on machine learning, artificial intelligence, and structured thinking—written to be traced, reused, and extended.",
    "blog.manifesto.label": "WRITING PRINCIPLE",
    "blog.manifesto.quote": "Build the structure before filling in details; preserve the path before presenting the conclusion.",
    "blog.sort.label": "SORT",
    "blog.sort.latest": "Latest",
    "blog.sort.oldest": "Oldest",
    "blog.topic.heading": "Topic Series",
    "blog.topic.intro": "Continuous explorations of core questions, preserving the reasoning between articles.",
    "blog.article.heading": "Independent Articles",
    "blog.article.intro": "Standalone notes that form a continuously updated index of ideas over time.",
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

    "academic.eyebrow": "ACADEMIC · RESEARCH ARCHIVE",
    "academic.title": "Research should be<br><span>clearly testable.</span>",
    "academic.subtitle": "From problem framing and experimental design to communication, this archive records work that can be discussed, reproduced, and advanced.",
    "academic.status": "Explore questions, build methods, verify conclusions.",
    "academic.idea.title": "Overview",
    "academic.idea.desc": "Set reproducibility, citation, and extensibility as the baseline, and accumulate verifiable results over time.",
    "academic.paper.title": "Papers & Results",
    "academic.paper.item1": "A framework for structured reasoning (2025)",
    "academic.paper.item2": "Expandable cognitive architectures (2024)",
    "academic.project.title": "Projects",
    "academic.project.intro": "Turn research methods, tools, and knowledge organization into systems that can keep evolving.",
    "academic.project.state": "Research prototype · In progress",
    "academic.project.item1": "Reasoning path visualization",
    "academic.project.item2": "Structured writing workflow",
    "academic.links.title": "Academic Profiles",
    "academic.links.scholar": "Citations and research overview",
    "academic.links.dblp": "Computer science bibliography",
    "academic.links.openreview": "Reviews and scholarly discussion",

    "life.eyebrow": "LIFE · DAILY OBSERVATIONS",
    "life.title": "First,<br><span>live well.</span>",
    "life.subtitle": "Reading, movement, music, cities, and people form another knowledge system beyond research—slow moments worth keeping.",
    "life.quote": "Life is not the blank space outside research; it is where every line of thinking eventually returns.",
    "life.series.title": "Slow Series",
    "life.series.desc": "No race for frequency—only changes and questions worth revisiting.",
    "life.notes.title": "Independent Notes",
    "life.notes.desc": "Short, focused pieces preserving honest observations from a moment in time.",
    "life.note": "A place to reveal the person without taking over the site.",
    "life.item1": "Reviewing the week's structural questions in silence.",
    "life.item2": "Turning complexity into shareable daily notes.",
    "life.item3": "Letting clarity speak louder than emotion.",

    "contact.eyebrow": "CONTACT · CONNECT",
    "contact.title": "Open exchange,<br><span>genuine intent.</span>",
    "contact.subtitle": "Conversations about research, technology, writing, and unfinished ideas are welcome. Choose the channel that best fits the topic.",
    "contact.status": "OPEN FOR IDEAS & COLLABORATION",
    "contact.email": "LianminChen@outlook.com",
    "contact.github": "https://github.com/lianmin-chen",
    "contact.note": "Primary inbox",
    "contact.open": "Open collaboration",
    "contact.media": "Content Platforms",
    "contact.email.desc": "For academic collaboration, project invitations, and long-term exchanges.",
    "contact.github.desc": "Latest code, experiments, and documentation updates are mirrored here.",
    "contact.media.desc": "Different media support different densities of expression and ongoing updates.",
    "contact.media.wechat": "Zhihu",
    "contact.media.bilibili": "Bilibili",
    "contact.media.linkedin": "WeChat Official Account",
    "contact.media.zhihu.title": "Zhihu essays",
    "contact.media.zhihu.desc": "Structured thinking, research notes, and extended reading.",
    "contact.media.zhihu.link": "Open Zhihu profile",
    "contact.media.bilibili.title": "Video explainers",
    "contact.media.bilibili.desc": "Public videos, concept breakdowns, and demos are synced here.",
    "contact.media.bilibili.link": "Open Bilibili channel",
    "contact.media.xiaohongshu": "Xiaohongshu",
    "contact.media.xiaohongshu.title": "Notes",
    "contact.media.xiaohongshu.desc": "Lightweight notes, inspirations, and daily observations appear here.",
    "contact.media.xiaohongshu.link": "Open Xiaohongshu profile",
    "contact.media.wechat.title": "WeChat Official Account",
    "contact.media.wechat.desc": "Short updates and series posts appear here.",
    "contact.media.wechat.tip": "Search “元衍极” in WeChat or scan the QR code",

    "footer.copyright": "Content and design of this site must not be reproduced or used for commercial purposes without permission.",
    "article.toc": "Table of contents",
    "article.end": "Thank you for reading. May every note make the thinking clearer."
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
  requestAnimationFrame(syncFixedHeader);
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
    { id: "single-toc", title: "目录测试文章", date: "2026-02-15", category: "Test", path: "blog/articles/toc-test.md" },
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
  
  container.innerHTML = topics.map((topic, index) => `
    <article class="blog-topic-card reveal">
      <button class="blog-topic-trigger" type="button" onclick="toggleTopic('${topic.id}', this)" aria-expanded="false">
        <span class="blog-topic-index">${String(index + 1).padStart(2, "0")}</span>
        <span class="blog-topic-heading">
          <span class="blog-topic-label">TOPIC SERIES</span>
          <strong>${topic.title}</strong>
        </span>
        <span class="blog-topic-toggle" aria-hidden="true">＋</span>
      </button>
      <p class="blog-topic-desc">${topic.description}</p>
      <div class="blog-topic-footer">
        <span>${topic.articles.length} 篇文章</span>
        <time>${topic.date}</time>
      </div>
      <div class="blog-topic-articles" id="articles-${topic.id}">
        ${topic.articles.map(article => `
          <button class="blog-topic-article" type="button" onclick="openArticle('${article.id}')">
            <span>${article.title}</span>
            <time>${article.date}</time>
            <span aria-hidden="true">↗</span>
          </button>
        `).join("")}
      </div>
    </article>
  `).join("");
}

function renderArticles(articles) {
  const container = document.getElementById("articles-container");
  if (!container) return;
  
  container.innerHTML = articles.map((article, index) => `
    <button class="blog-article-row reveal" type="button" onclick="openArticle('${article.id}')">
      <span class="blog-article-number">${String(index + 1).padStart(2, "0")}</span>
      <span class="blog-article-copy">
        <span class="blog-article-category">${article.category}</span>
        <strong>${article.title}</strong>
      </span>
      <time>${article.date}</time>
      <span class="blog-article-arrow" aria-hidden="true">↗</span>
    </button>
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

  container.innerHTML = topics.map((topic, index) => `
    <article class="life-topic-card reveal">
      <button class="life-topic-trigger" type="button" onclick="toggleTopic('${topic.id}', this)" aria-expanded="false">
        <span class="life-topic-index">${String(index + 1).padStart(2, "0")}</span>
        <span class="life-topic-copy">
          <span>SLOW SERIES</span>
          <strong>${topic.title}</strong>
        </span>
        <span class="life-topic-toggle topic-toggle" aria-hidden="true">＋</span>
      </button>
      <p class="life-topic-desc">${topic.description}</p>
      <div class="life-topic-meta"><span>${topic.articles.length} 篇札记</span><time>${topic.date}</time></div>
      <div class="life-topic-articles topic-articles" id="articles-${topic.id}">
        ${topic.articles.map(article => `
          <button class="life-topic-article" type="button" onclick="openLifeArticle('${article.id}')">
            <span>${article.title}</span><time>${article.date}</time><span aria-hidden="true">↗</span>
          </button>
        `).join("")}
      </div>
    </article>
  `).join("");
}

function renderLifeArticles(articles) {
  const container = document.getElementById("life-articles-container");
  if (!container) return;

  container.innerHTML = articles.map((article, index) => `
    <button class="life-note-row reveal" type="button" onclick="openLifeArticle('${article.id}')">
      <span class="life-note-number">${String(index + 1).padStart(2, "0")}</span>
      <span class="life-note-copy"><small>${article.category || "LIFE"}</small><strong>${article.title}</strong></span>
      <time>${article.date}</time><span class="life-note-arrow" aria-hidden="true">↗</span>
    </button>
  `).join("");
}

function toggleTopic(topicId, trigger) {
  const container = document.getElementById(`articles-${topicId}`);
  if (container) {
    container.classList.toggle("open");
    const isOpen = container.classList.contains("open");
    if (trigger) {
      trigger.setAttribute("aria-expanded", isOpen ? "true" : "false");
      const toggle = trigger.querySelector(".topic-toggle, .blog-topic-toggle");
      if (toggle) {
        toggle.classList.toggle("open", isOpen);
        if (toggle.classList.contains("blog-topic-toggle") || toggle.classList.contains("life-topic-toggle")) {
          toggle.textContent = isOpen ? "−" : "＋";
        }
      }
    }
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

function initSiteStats() {
  const stats = document.querySelector(".site-stats");
  if (!stats) return;
  const host = window.location.hostname;
  const protocol = window.location.protocol;
  const isLocal = protocol === "file:" || host === "localhost" || host === "127.0.0.1" || host === "[::1]";
  if (isLocal) {
    stats.style.display = "none";
  }
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
  document.addEventListener("DOMContentLoaded", initNavigation);
  document.addEventListener("DOMContentLoaded", initBlogPage);
  document.addEventListener("DOMContentLoaded", initLifePage);
  document.addEventListener("DOMContentLoaded", initSiteStats);
  document.addEventListener("DOMContentLoaded", initContactMediaToggles);
} else {
  initNavigation();
  initBlogPage();
  initLifePage();
  initSiteStats();
  initContactMediaToggles();
}
