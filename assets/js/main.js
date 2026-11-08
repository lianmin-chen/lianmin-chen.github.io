const root = document.documentElement;
const siteHeader = document.querySelector(".site-header");
const themeToggle = document.getElementById("theme-toggle");
const langButtons = document.querySelectorAll(".lang-switch button");

const translations = {
  zh: {
    "brand.name": "元衍极",
    "nav.about": "关于我",
    "nav.news": "近期动态",
    "nav.papers": "精选论文",
    "nav.contact": "联系方式",
    "hero.role": "博士研究生 · 计算机科学与技术",
    "hero.cta.papers": "查看精选论文",
    "hero.cta.email": "发送邮件",
    "about.profile.desc": "你好，我是 Lianmin Chen，目前是华中科技大学计算机科学与技术学院的博士研究生。我的研究兴趣包括大模型后训练、强化学习与零阶优化，也关注轨迹预测中的交互建模。研究之外，我喜欢漫步和听音乐，欢迎与我交流。",
    "about.interests": "研究兴趣",
    "about.status": "学习中 · 探索中",
    "about.school": "学校",
    "about.major": "专业",
    "about.hust": "华中科技大学",
    "about.cs": "计算机科学与技术",
    "profile.role": "计算机科学 · 博士研究生",
    "profile.zhihu": "知乎",
    "index.subtitle": "多少事，从来急；天地转，光阴迫。一万年太久，只争朝夕！",
    "news.heading": "近期动态",
    "news.item1": "论文《The Cost of Mismatch: Noise Amplification in Zeroth-Order Reinforcement Learning》被 NeurIPS 2026 接收为 Poster。",
    "news.item2": "HeLoFusion 在 NeurIPS Workshop UrbanAI 2025 展示。",
    "education.heading": "教育经历",
    "education.present": "至今",
    "education.phd": "博士研究生",
    "education.bachelor": "本科生",
    "papers.heading": "精选论文",
    "paper1.desc": "研究零阶强化学习中扰动估计与策略优化之间的不匹配问题，并分析噪声放大对学习过程的影响。",
    "paper2.desc": "面向轨迹预测中的异构、多尺度交互建模，构建高效且可扩展的场景编码器。",
    "contact.heading": "欢迎交流研究、合作与想法。",
    "contact.desc": "如果你对我的研究感兴趣，或希望讨论相关方向，欢迎通过邮件与我联系。",
    "contact.copy": "复制邮箱",
    "contact.copied": "已复制",
    "contact.zhihu": "知乎 · 元衍极",
    "footer.note": "始于一元，衍至无极。",
    "footer.visitor": "访客地图与统计",
    "footer.pv": "总访问量",
    "footer.uv": "访客数",
    "footer.top": "返回顶部",
    "footer.copyright": "本站内容与设计未经允许，不得以任何形式转载或用于商业目的。",
    "a11y.skip": "跳到主要内容"
  },
  en: {
    "brand.name": "OriginX",
    "nav.about": "About",
    "nav.news": "News",
    "nav.papers": "Selected Papers",
    "nav.contact": "Contact",
    "hero.role": "Ph.D. Student · Computer Science and Technology",
    "hero.cta.papers": "View selected papers",
    "hero.cta.email": "Send an email",
    "about.profile.desc": "Hello, I'm Lianmin Chen, a Ph.D. student at the School of Computer Science and Technology, Huazhong University of Science and Technology. My research interests include LLM post-training, reinforcement learning, and zeroth-order optimization, as well as interaction modeling for trajectory prediction. Outside research, I enjoy walking and listening to music. Feel free to get in touch.",
    "about.interests": "Research interests",
    "about.status": "Learning · Exploring",
    "about.school": "University",
    "about.major": "Major",
    "about.hust": "Huazhong University of Science and Technology",
    "about.cs": "Computer Science and Technology",
    "profile.role": "Computer Science · Ph.D. Student",
    "profile.zhihu": "Zhihu",
    "index.subtitle": "So many deeds cry out to be done; the world rolls on, time presses. Ten thousand years are too long; seize the day, seize the hour.",
    "news.heading": "Recent Updates",
    "news.item1": "Our paper “The Cost of Mismatch: Noise Amplification in Zeroth-Order Reinforcement Learning” was accepted to NeurIPS 2026 as a Poster.",
    "news.item2": "HeLoFusion was presented at the NeurIPS Workshop UrbanAI 2025.",
    "education.heading": "Education",
    "education.present": "Present",
    "education.phd": "Ph.D. Student",
    "education.bachelor": "Undergraduate",
    "papers.heading": "Selected Papers",
    "paper1.desc": "Investigates the mismatch between perturbation estimation and policy optimization in zeroth-order reinforcement learning, with a focus on how noise amplification affects learning.",
    "paper2.desc": "An efficient and scalable scene encoder for heterogeneous and multi-scale interaction modeling in trajectory prediction.",
    "contact.heading": "Let's discuss research, collaboration, and ideas.",
    "contact.desc": "If you are interested in my work or would like to discuss a related topic, please feel free to contact me by email.",
    "contact.copy": "Copy email",
    "contact.copied": "Copied",
    "contact.zhihu": "Zhihu · OriginX",
    "footer.note": "From the one, toward the infinite.",
    "footer.visitor": "Visitor map & statistics",
    "footer.pv": "Total visits",
    "footer.uv": "Visitors",
    "footer.top": "Back to top",
    "footer.copyright": "Content and design may not be reproduced or used commercially without permission.",
    "a11y.skip": "Skip to content"
  }
};

let currentLanguage = "zh";
let copyFeedbackTimer;

function readStorage(key) {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    return null;
  }
}

function writeStorage(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    // The site remains functional when storage is unavailable.
  }
}

function syncHeader() {
  if (!siteHeader) return;
  siteHeader.classList.toggle("is-scrolled", window.scrollY > 12);
}

function updateThemeControl() {
  if (!themeToggle) return;
  const isDark = root.dataset.theme === "dark";
  const label = currentLanguage === "zh"
    ? (isDark ? "切换到浅色模式" : "切换到深色模式")
    : (isDark ? "Switch to light mode" : "Switch to dark mode");
  themeToggle.setAttribute("aria-label", label);
  themeToggle.title = label;
  const themeColor = document.querySelector('meta[name="theme-color"]');
  if (themeColor) themeColor.content = isDark ? "#0e141e" : "#f5f6f8";
}

function setTheme(theme) {
  const nextTheme = theme === "dark" ? "dark" : "light";
  root.dataset.theme = nextTheme;
  writeStorage("theme", nextTheme);
  updateThemeControl();
}

function setLanguage(lang) {
  currentLanguage = lang === "en" ? "en" : "zh";
  const dictionary = translations[currentLanguage];
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    if (dictionary[key]) element.innerHTML = dictionary[key];
  });

  langButtons.forEach((button) => {
    const isActive = button.dataset.lang === currentLanguage;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  root.lang = currentLanguage === "zh" ? "zh-CN" : "en";
  document.title = currentLanguage === "zh"
    ? "Lianmin Chen | 元衍极 · 学术主页"
    : "Lianmin Chen | Academic Homepage";
  writeStorage("lang", currentLanguage);
  updateThemeControl();
  requestAnimationFrame(syncHeader);
}

function initNavigation() {
  if (!siteHeader) return;
  const nav = siteHeader.querySelector(".nav");
  const actions = siteHeader.querySelector(".header-actions");
  if (!nav || !actions || siteHeader.querySelector(".nav-toggle")) return;

  nav.id = "site-navigation";
  const toggle = document.createElement("button");
  toggle.className = "nav-toggle";
  toggle.type = "button";
  toggle.setAttribute("aria-controls", nav.id);
  toggle.setAttribute("aria-expanded", "false");
  toggle.setAttribute("aria-label", "打开导航菜单");
  toggle.innerHTML = "<span></span><span></span><span></span>";
  siteHeader.querySelector(".header-inner").insertBefore(toggle, actions);

  const closeMenu = () => {
    siteHeader.classList.remove("nav-open");
    toggle.setAttribute("aria-expanded", "false");
  };

  toggle.addEventListener("click", () => {
    const isOpen = siteHeader.classList.toggle("nav-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
  nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) closeMenu();
  });
}

function initSectionNav() {
  const links = document.querySelectorAll('.nav a[href^="#"]');
  if (!links.length || !("IntersectionObserver" in window)) return;
  const items = [];
  links.forEach((link) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (target) items.push({ link, target });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      items.forEach(({ link, target }) => {
        link.classList.toggle("active", target === entry.target);
      });
    });
  }, { rootMargin: "-22% 0px -66% 0px" });
  items.forEach(({ target }) => observer.observe(target));
}

function initReveal() {
  const elements = document.querySelectorAll(".reveal");
  if (!elements.length || !("IntersectionObserver" in window)) return;
  document.body.classList.add("reveal-enabled");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.08, rootMargin: "0px 0px -30px" });
  elements.forEach((element) => observer.observe(element));
}

async function copyEmail(button) {
  const email = button.dataset.copyEmail;
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(email);
    } else {
      const textarea = document.createElement("textarea");
      textarea.value = email;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      textarea.remove();
    }
    button.textContent = translations[currentLanguage]["contact.copied"];
    clearTimeout(copyFeedbackTimer);
    copyFeedbackTimer = setTimeout(() => {
      button.textContent = translations[currentLanguage]["contact.copy"];
    }, 1800);
  } catch (error) {
    window.location.href = `mailto:${email}`;
  }
}

function initUtilities() {
  document.querySelectorAll("[data-back-to-top]").forEach((button) => {
    button.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  });
  document.querySelectorAll("[data-copy-email]").forEach((button) => {
    button.addEventListener("click", () => copyEmail(button));
  });
  document.querySelectorAll("[data-current-year]").forEach((element) => {
    element.textContent = String(new Date().getFullYear());
  });

  const host = window.location.hostname;
  const isLocal = window.location.protocol === "file:" || ["localhost", "127.0.0.1", "[::1]"].includes(host);
  if (isLocal) {
    document.querySelectorAll(".site-stats").forEach((element) => {
      element.style.display = "none";
    });
  }
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    setTheme(root.dataset.theme === "dark" ? "light" : "dark");
  });
}
langButtons.forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.dataset.lang));
});

const savedLanguage = readStorage("lang");
const browserLanguage = (navigator.language || "zh").toLowerCase().startsWith("zh") ? "zh" : "en";
setLanguage(savedLanguage === "en" || savedLanguage === "zh" ? savedLanguage : browserLanguage);
setTheme(root.dataset.theme);

function initialize() {
  initNavigation();
  initSectionNav();
  initReveal();
  initUtilities();
  syncHeader();
  window.addEventListener("scroll", syncHeader, { passive: true });
  window.addEventListener("resize", syncHeader);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initialize);
} else {
  initialize();
}
