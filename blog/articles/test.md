# Markdown 语法测试文章

这是一篇全面测试 Markdown 和其他特性的文章。

## 基础文本格式

**粗体文本** 和 *斜体文本* 以及 ***粗斜体***。

~~删除线文本~~

使用 `inline code` 插入行内代码。

## 链接和图片

[这是一个链接](https://www.yuanyanji.com)

![另一个示例](https://picsum.photos/400/300?random=1)

## 列表

### 无序列表
- 项目一
- 项目二
  - 嵌套项目 2.1
  - 嵌套项目 2.2
- 项目三

### 有序列表
1. 首先做这个
2. 然后做那个
   1. 子步骤 2.1
   2. 子步骤 2.2
3. 最后完成

## 代码块

### JavaScript 示例
```javascript
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10)); // 输出: 55
```

### Python 示例
```python
def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    result.extend(left[i:])
    result.extend(right[j:])
    return result
```

### SQL 示例
```sql
SELECT u.id, u.name, COUNT(o.id) as order_count
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE u.created_at > '2025-01-01'
GROUP BY u.id
ORDER BY order_count DESC;
```

## 表格

| 特性 | 支持情况 | 备注 |
|------|--------|------|
| 标题 | ✅ | H1-H6 都支持 |
| 链接 | ✅ | 支持内部和外部链接 |
| 图片 | ✅ | 支持 URL 图片 |
| 代码块 | ✅ | 支持语法高亮 |
| 表格 | ✅ | GitHub Flavored Markdown |
| 数学公式 | ❓ | 需要额外配置 |
| 任务列表 | ✅ | GitHub Flavored Markdown |

## 任务列表

- [x] 完成 Markdown 语法测试
- [x] 测试图片加载
- [ ] 配置数学公式支持
- [ ] 性能优化

## 引用块

> 这是一个引用块。引用块可以用来强调重要信息或引用他人的观点。

> 这是一个多行引用。
> 它可以包含多个段落。
>
> 就像这样！

## 分隔线

---

上面是一条水平分隔线。

## 混合内容

这一段展示如何将多种元素混合在一起。我们有 **粗体** 和 *斜体*，还有 [链接](https://example.com) 和 `代码`，甚至 emoji 等。

### 嵌套结构示例

这让我想起了以下几点：

1. **第一个重要点**
   - 支持细节 1
   - 支持细节 2
   
2. **第二个重要点**
   ```
   code example
   for nested content
   ```

3. **第三个重要点**
   > 可以include引用内容

## 数学公式测试

由于 marked.js 默认不支持 LaTeX 数学公式，以下公式将显示为代码：

内联公式示例：$E = mc^2$

块级公式示例：
$$
\int_0^{\infty} e^{-x^2} dx = \frac{\sqrt{\pi}}{2}
$$

二次方程公式：
$$
x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}
$$

如需完整支持数学公式，则需要：
1. 添加 KaTeX 或 MathJax 库
2. 配置 marked.js 扩展以识别数学语法
3. 在 article.html 中引入数学库脚本

## 总结

这篇文章测试了 marked.js 原生支持的所有主要 Markdown 特性：

✅ **已支持**：标题、文本格式、链表、代码块、表格、链接、图片、引用块
❌ **需要扩展**：数学公式（需要 KaTeX/MathJax）

*更新于 2026-02-15*
