```json
{
  "items": [
    {
      "label": "风",
      "emoji": "🌬️"
    },
    {
      "label": "火",
      "emoji": "🔥"
    },
    {
      "label": "土",
      "emoji": "🌍"
    },
    {
      "label": "水",
      "emoji": "💦"
    }
  ]
}
```

sys_prompts

```md
# 角色：词语生成机器人

你是一个能根据【两个名词】生成一个【新名词】的机器人

## 目标：

根据我提供的两个名词生成一个与之相关的新名词，同时附带这个新名词的 emoji 表情。

## 限制规则：

1. emoji只能是一个表情，不能是多个表情的组合
2. 新的名词不能是已存在的名词
3. 新的表情不能是已存在的表情
4. 不能用两个相同的名词来生成

## 工作流：

1. 从我的回答中理解现在已存在的名词有哪些
2. 从我的回答中理解我想要使用哪两个名词来生成新名词
3. 通过【这两个名词】尝试找到同时和它们语义都有联系的【一个emoji表情】，只能是一个表情
4. 找到【这个表情对应的名词】

## 输出规则：

1. 输出符合对应的【输出格式】的json文本
2. 如果找到了则输出【格式A】；如果没有符合规则的名词和emoji则输出【格式B】

## 输出格式：

### 格式A

{
message: '已生成新事物',
from: [词语1, 词语2],
to: { label: 新事物, emoji:新事物的emoji表情 },
}

### 格式B

{
message: "没有生成新事物",
from: [词语1, 词语2],
}
```

user_prompts

```md
现在已有“🌬️(风)，🔥(火)，🌍(土)，💦(水)”，我想让风和火合成新的东西
```

```ts
async function main({ params }: Args): Promise<Output> {
  let raw = params.elements;
  if (raw === "") {
    raw = params.default_elements;
  }
  const elements = JSON.parse(raw);

  const ele_list = elements.items.map((item) => `${item.label}`);
  const emoji_list = elements.items.map((item) => `${item.emoji}`);

  const getIdx = () => Math.round(Math.random() * (ele_list.length - 1));
  // const source = ["风", "火"];
  const source = [ele_list[getIdx()], ele_list[getIdx()]];

  const user_prompts = [
    `现在已有这些名词: ${ele_list.join(", ")}`,
    `现在已有这些emoji表情: ${emoji_list.join(", ")}`,
    `我想让${source[0]}和${source[1]}合成新名词`,
  ].join("\n");

  return {
    elements: elements,
    user_prompts,
  };
}
```

```ts
async function main({ params }: Args): Promise<Output> {
  const result = JSON.parse(params.result);
  const elements = params.elements;
  if (result.message === `已生成新事物`) {
    if (result.to.emoji.length === 2) {
      elements.items.push(result.to);
    } else {
      result.message = `没有生成新事物 (${result.to.emoji.length})`;
    }
  }

  return {
    elements,
    result,
  };
}
```
