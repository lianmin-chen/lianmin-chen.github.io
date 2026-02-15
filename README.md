# 元衍极 | 个人网站（GitHub Pages）

✨ 一个结构化思考与长期积累的个人站点

🚀 部署地址: https://lianmin-chen.github.io/

## 📌 项目简介

这是一个用于展示个人思考、学术与生活记录的静态网站，基于原生 HTML/CSS/JavaScript 构建，并运行在 GitHub Pages 上。

核心内容:

- 🧠 博客系统: 话题系列 + 独立文章，支持搜索与排序
- 🌿 生活系统: 与博客结构一致的低频记录
- 🧾 文章详情页: Markdown 渲染 + KaTeX 数学公式支持
- 🌓 主题与语言: 明暗主题切换 + 中英文切换
- 🧭 页面结构: 首页、关于、学术、生活、联系

## ✍️ 添加文章

只需要两步: 创建 Markdown 文件，然后更新数据列表。

### 1) 创建 Markdown 文件

- 话题文章: blog/topics/<topic-id>/<article-id>.md
- 独立文章: blog/articles/<article-id>.md
- 生活文章: life-articles/<article-id>.md

建议: 第一行使用标题, 例如 `# 文章标题`, 文章页将自动读取该标题。

### 2) 更新文章列表

编辑 assets/js/main.js, 按类型添加到对应的数据结构:

- 博客话题文章: blogData.topics[x].articles
- 博客独立文章: blogData.articles
- 生活文章: lifeData.topics[x].articles 或 lifeData.articles

示例 (博客独立文章):

```js
{ id: "single-6", title: "新文章", date: "2026-02-15", category: "Notes", path: "blog/articles/single-6.md" }
```

示例 (博客话题文章):

```js
{ id: "article-8", title: "话题新文章", date: "2026-02-15", path: "blog/topics/topic-1/article-8.md" }
```

示例 (生活文章):

```js
{ id: "life-single-2", title: "生活笔记", date: "2026-02-15", category: "Life", path: "life-articles/life-note.md" }
```

## 🖥️ 本地预览

Markdown 文件需要通过本地服务器加载, 不要使用 file:// 直接打开 HTML。

```powershell
python -m http.server 8000
```

打开: http://localhost:8000/

## 📄 版权声明

本站内容与设计由作者本人所有与维护。除非另有说明, 未经允许不得转载或用于商业用途。

---

# OriginX | Personal Website (GitHub Pages)

✨ A personal space for structured thinking and long-term growth

🚀 Deployment: https://lianmin-chen.github.io/

## 📌 Overview

This is a personal static website built with vanilla HTML/CSS/JavaScript and deployed on GitHub Pages. It showcases structured writing, academic outputs, and low-frequency life notes.

Core features:

- 🧠 Blog system: topic series + standalone essays with search/sort
- 🌿 Life system: mirrored structure for personal notes
- 🧾 Article page: Markdown rendering + KaTeX math support
- 🌓 Theme & language: light/dark mode + zh/en switch
- 🧭 Pages: Home, About, Academic, Life, Contact

## ✍️ Add Articles

Two steps: create a Markdown file, then update the data list.

### 1) Create the Markdown file

- Topic article: blog/topics/<topic-id>/<article-id>.md
- Standalone article: blog/articles/<article-id>.md
- Life article: life-articles/<article-id>.md

Tip: Use a title on the first line, e.g. `# Article Title`. The article page uses it as the display title.

### 2) Update the article list

Edit assets/js/main.js and add an entry to the correct data structure:

- Blog topic article: blogData.topics[x].articles
- Blog standalone article: blogData.articles
- Life article: lifeData.topics[x].articles or lifeData.articles

Example (blog standalone article):

```js
{ id: "single-6", title: "New Article", date: "2026-02-15", category: "Notes", path: "blog/articles/single-6.md" }
```

Example (blog topic article):

```js
{ id: "article-8", title: "New Topic Article", date: "2026-02-15", path: "blog/topics/topic-1/article-8.md" }
```

Example (life article):

```js
{ id: "life-single-2", title: "Life Note", date: "2026-02-15", category: "Life", path: "life-articles/life-note.md" }
```

## 🖥️ Local Preview

Markdown must be loaded via a local server. Do not open HTML with file://.

```powershell
python -m http.server 8000
```

Open: http://localhost:8000/

## 📄 Copyright

All content and design are owned and maintained by the author. Unless otherwise stated, redistribution or commercial use is not permitted.
