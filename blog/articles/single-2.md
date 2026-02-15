# 大模型微调最佳实践

## 引言

大语言模型（LLM）的出现改变了自然语言处理领域的格局。预训练模型如 GPT、BERT 等展现了在各种任务上的强大能力。然而，直接使用通用模型并不总是最优选择。**微调（Fine-tuning）**允许我们在特定任务或领域上适配这些模型，通常能获得更好的性能。本文分享大模型微调的最佳实践。

## 什么是大模型微调

### 微调的概念

微调是指：在预训练模型的基础上，使用特定任务的数据进行进一步训练，使模型适应特定任务或领域的过程。

```
通用预训练模型
    ↓
[微调过程 - 用任务特定数据训练]
    ↓
任务适配模型
```

### 微调 vs 其他方法

| 方法 | 成本 | 性能 | 适用场景 |
|------|------|------|---------|
| **Prompt 工程** | 低 | 中等 | 通用任务、快速原型 |
| **RAG** | 中等 | 中高 | 知识密集型任务 |
| **微调** | 高 | 最高 | 特定领域、大规模应用 |
| **从头训练** | 非常高 | 最高 | 特殊需求、无训练数据限制 |

## 微调前的准备

### 1. 评估是否需要微调

并不是所有任务都需要微调。考虑这些问题：

```
□ 预训练模型在我的任务上表现不足吗？
  (通过 prompt 工程已经达到了上限？)

□ 我有足够的特定任务数据吗？
  (通常需要数百到数千个示例)

□ 性能提升是否能抵消微调的成本？
  (时间、计算资源、工程复杂度)

□ 我能管理微调后的模型吗？
  (部署、版本控制、A/B 测试)

如果对以上问题大多数回答"是"，微调是值得的。
```

### 2. 数据准备

高质量的数据是微调成功的关键。

**数据标注标准**

```
原始文本 + 标注 = 训练数据

例子 1：情感分类
输入："这家餐厅的食物很好吃"
标注：正面

例子 2：命名实体识别
输入："Apple 的 CEO 是 Tim Cook"
标注：{Apple: 公司, Tim Cook: 人名}

例子 3：摘要生成
输入："很长的文章..."
标注："生成的摘要..."
```

**数据清理**

- 移除重复数据
- 修正明显错误
- 检查标注一致性
- 移除低质量或模糊的样本

**数据分割**

```
总数据集（100%）
├── 训练集（70%）- 用于训练
├── 验证集（15%）- 用于选择超参数
└── 测试集（15%）- 用于最终评估

注意：要确保三个集合来自相同分布
```

### 3. 确定微调策略

**全面微调 (Full Fine-tuning)**

微调模型的所有参数。

优点：
- 性能提升最大
- 逻辑清晰

缺点：
- 计算成本高
- 容易过拟合（尤其是数据较少时）
- 需要存储完整的梯度和优化器状态

**参数高效微调 (PEFT)**

只微调少数参数。

常见方法：
- LoRA (Low-Rank Adaptation)：冻结原参数，添加低秩矩阵
- Prefix Tuning：在输入前添加可学习的前缀
- 适配器层 (Adapter)：在模型层间添加小的适配器模块

优点：
- 计算成本低
- 内存占用少
- 减少过拟合风险

缺点：
- 性能提升相对有限
- 推理可能略微变慢

## 微调过程的最佳实践

### 1. 超参数选择

```python
# 关键超参数

学习率 (Learning Rate)
  └─ LoRA: 1e-4 ~ 1e-3
  └─ 全微调: 2e-5 ~ 5e-5
  └─ 建议：先从较小值开始，逐步增加

批处理大小 (Batch Size)
  └─ 小数据集: 8, 16, 32
  └─ 大数据集: 64, 128
  └─ 内存限制: GPU 显存决定

训练轮数 (Epochs)
  └─ 数据充足: 3 ~ 5
  └─ 数据不足: 5 ~ 20（容易过拟合，需监控）

衰减策略 (Learning Rate Scheduling)
  └─ 线性衰减
  └─ 余弦衰减
  └─ 热重启 (Warm Restart)
  
正则化
  └─ Dropout: 0.1 ~ 0.3
  └─ Weight Decay: 1e-5 ~ 1e-2
```

### 2. 监控和早停

在训练过程中持续监控验证集性能：

```python
# 伪代码示例
best_val_loss = float('inf')
patience = 3
patience_counter = 0

for epoch in range(num_epochs):
    train_loss = train(model, train_data)
    val_loss = validate(model, val_data)
    
    if val_loss < best_val_loss:
        best_val_loss = val_loss
        save_checkpoint(model)  # 保存最好的模型
        patience_counter = 0
    else:
        patience_counter += 1
        if patience_counter >= patience:
            break  # 早停
            
    print(f"Epoch {epoch}: train_loss={train_loss:.3f}, "
          f"val_loss={val_loss:.3f}")
```

### 3. 防止过拟合

微调特别容易过拟合，因为：
- 数据量通常较小
- 模型参数众多
- 训练轮数可能较多

**防止策略**

```
1. 增加数据多样性
   - 数据增强（paraphrase, back-translation）
   - 混合多个数据源
   - 合成数据生成

2. 使用正则化
   - Dropout
   - Weight decay
   - Mixup 或 Cutmix

3. 限制训练强度
   - 早停
   - 降低学习率
   - 减少训练轮数

4. 使用验证集指导
   - 密集监控验证指标
   - 基于验证性能做决策

5. 选择参数高效方法
   - LoRA 等方法的正则化效果好
```

### 4. 梯度累积和混合精度

处理内存限制的技巧：

```python
# 梯度累积：用较小的 batch size 多次反向传播
# 累积梯度，每几步更新一次

accumulation_steps = 4  # 相当于 batch_size * 4
optimizer.zero_grad()

for i, batch in enumerate(dataloader):
    logits = model(batch)
    loss = criterion(logits, batch.labels)
    loss.backward()  # 梯度累积
    
    if (i + 1) % accumulation_steps == 0:
        optimizer.step()
        optimizer.zero_grad()

# 混合精度：用 float16 加速，保留 float32 用于关键计算
from torch.cuda.amp import autocast, GradScaler

scaler = GradScaler()
with autocast():
    logits = model(batch)
    loss = criterion(logits, batch.labels)

scaler.scale(loss).backward()
scaler.step(optimizer)
scaler.update()
```

## 微调后的评估和优化

### 1. 全面评估

不要只看单一指标。使用多维度评估：

```
定量指标：
  ├─ 准确率 (Accuracy)
  ├─ F1 分数
  ├─ 精确率/召回率
  └─ BLEU / ROUGE (对生成任务)

定性评估：
  ├─ 随机抽样检查输出质量
  ├─ 错误分析（model 在哪类例子上失败？）
  ├─ 与基准模型对比
  └─ 用户满意度反馈

性能开销：
  ├─ 推理延迟
  ├─ 内存占用
  └─ 吞吐量
```

### 2. 错误分析

系统地分析失败案例：

```python
# 识别模型表现最差的样本类别

results = evaluate(model, test_data)
errors = [(sample, pred, true_label) 
          for sample, pred, true_label in results 
          if pred != true_label]

# 按错误类型分组
error_by_category = group_by(errors, 'category')

# 识别最常见的错误类型
for category, error_list in error_by_category.items():
    print(f"{category}: {len(error_list)} errors")
    for error in error_list[:3]:  # 显示前3个
        print(f"  Input: {error[0]}, Pred: {error[1]}, True: {error[2]}")

# 这可能指向需要更多训练数据或特殊处理的领域
```

### 3. A/B 测试

在真实环境中对比原模型和微调模型：

```
对照组：原始模型
实验组：微调模型
用户：随机分配

监控指标：
  ├─ 用户满意度
  ├─ 任务完成率
  ├─ 用户留存
  └─ 业务指标（如转化率）

周期：至少 1-2 周
样本量：足够的统计效力（通常 >1000 用户）
```

## 常见问题和解决方案

### 问题 1：模型性能打不过原始模型

**可能原因和解决方案**

```
1. 学习率过高
   → 降低学习率，从 5e-5 开始

2. 训练不充分
   → 增加训练轮数或调整早停条件

3. 数据质量差
   → 审查数据标注，过滤低质量样本

4. 数据量不足
   → 进行数据增强
   
5. 任务复杂度高
   → 尝试多任务学习或更复杂的微调方法
```

### 问题 2：训练过程崩溃（loss 变成 NaN）

**原因和解决**

```
1. 学习率过高
   → 降低学习率

2. 梯度爆炸
   → 启用梯度裁剪：
     torch.nn.utils.clip_grad_norm_(model.parameters(), 1.0)

3. 数据问题
   → 检查输入数据是否包含异常值或 NaN
```

## 最佳实践总结

1. **数据为王**：投入时间在数据准备、清理和标注
2. **增量调整**：从小改动开始，逐步增加复杂性
3. **持续监控**：在训练过程中密切监视验证指标
4. **灵活策略**：根据数据量和性能选择全微调或参数高效方法
5. **系统评估**：不只看单一指标，进行多维度评估
6. **文档记录**：记录超参数、数据版本、结果，便于复现和改进

微调是一门艺术和科学的结合。理论指导方向，但实验和迭代是通往最优解的路径。
