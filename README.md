# 元衍极 | 学术主页

一个单页学术个人主页，展示个人简介、学习经历、精选论文与联系方式。

部署地址：https://lianmin-chen.github.io/

## 页面结构

- `index.html`：唯一页面，包含首屏、关于我、精选论文、联系方式与页脚
- `assets/css/style.css`：全站样式
- `assets/js/main.js`：主题切换、语言切换、访客统计等
- `assets/images/`：头像、校徽、论文配图与分享封面
- `sitemap.xml` / `robots.txt`：搜索引擎配置

## 常用修改

### 个人简介与经历

- 修改 `index.html` 中 About 区域的文案
- 同步更新 `assets/js/main.js` 中 `translations.zh/en` 的 `about.profile.desc`
- 经历条目位于 `.education-list` 中

### 精选论文

- 在 `index.html` 的「精选论文」区块复制一条 `.academic-paper`
- 修改会议、标题、作者、标签、链接与配图
- 配图放在 `assets/images/`，在 `.academic-paper-figure img` 中引用

### 联系方式

- 修改 `index.html` 底部 `.contact-primary` 中的四张卡片
- 邮箱、GitHub、知乎与学术入口均在对应卡片内

### 主题与语言

- 右上角切换明暗主题与中英文
- 翻译文案位于 `assets/js/main.js` 的 `translations.zh/en`

## 本地预览

```powershell
python -m http.server 8000
```

打开 http://localhost:8000/

## 版权

本站内容与设计未经允许，不得以任何形式转载或用于商业目的。
