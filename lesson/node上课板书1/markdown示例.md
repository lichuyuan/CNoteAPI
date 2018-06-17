# 示例

# 标题

**粗体**

- 缩进
  - 缩进

行内高亮： `markdown`

按键：<kbd>CTRL</kbd>

> 多层引用
> > 多层引用

————

> 单层引用
> 单层引用

| 表格 | 表格 |
| -    |  -   |
| 表格 | 表格 |


图片： ![图片](https://vip.kybmig.cc/uploads/avatar/74.jpg)



代码高亮：
```
def dict_recursion(dict_all):
    if isinstance(dict_all, dict):
        for x in dict_all:
            dict_key = x
            dict_value = dict_all[dict_key]
            print("{}:{}".format(dict_key, dict_value))
            dict_recursion(dict_value)
    else:
        return
```
