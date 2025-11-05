---
title: 导出sy.zip文件
date: 2024-08-22T14:24:30Z
lastmod: 2024-08-22T14:31:45Z
---

# 导出sy.zip文件

导出为`.sy.zip`​文件涉及到将思源笔记的文档和相关资源打包成一个压缩文件。思源笔记本身并没有直接提供导出为`.sy.zip`文件的API，但可以通过组合使用API和JavaScript来实现这一功能。

### 实现步骤

1. **获取文档内容和资源路径**：通过思源笔记的API获取文档内容和相关资源的路径。
2. **下载资源文件**：使用`fetch`函数下载资源文件。
3. **打包成压缩文件**：使用JavaScript库（如`jszip`​）将文档内容和资源文件打包成一个`.zip`文件。
4. **下载压缩文件**：将生成的`.zip`文件提供给用户下载。

### 使用fetch和jszip实现导出为sy.zip文件

以下是一个使用`fetch`​和`jszip`​库实现导出为`.sy.zip`文件的示例代码：

#### 示例代码

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>导出思源笔记为sy.zip</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.7.1/jszip.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.5/FileSaver.min.js"></script>
</head>
<body>
    <button id="exportBtn">导出为sy.zip</button>
    <script>
        document.getElementById('exportBtn').addEventListener('click', async () => {
            const noteId = "20210914223645-oj2vnx2"; // 替换为你的笔记ID
            const apiUrl = "http://localhost:6806/api/export/exportMdContent";
            const requestBody = { id: noteId };

            try {
                // 获取笔记内容
                const noteResponse = await fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(requestBody)
                });

                if (!noteResponse.ok) {
                    throw new Error('获取笔记内容失败');
                }

                const noteData = await noteResponse.json();
                const noteContent = noteData.data.content;

                // 创建一个JSZip实例
                const zip = new JSZip();
                zip.file("note.md", noteContent);

                // 假设有一些资源文件需要下载
                const resourcePaths = ["/data/assets/image-20230523085812-k3o9t32.png", "/data/assets/image-20230523085812-k3o9t32.webp"];
                for (const path of resourcePaths) {
                    const resourceResponse = await fetch(`http://localhost:6806/api/file/getFile`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ path: path })
                    });

                    if (!resourceResponse.ok) {
                        throw new Error(`获取资源文件 ${path} 失败`);
                    }

                    const resourceBuffer = await resourceResponse.arrayBuffer();
                    zip.file(path.split('/').pop(), resourceBuffer);
                }

                // 生成zip文件并下载
                const content = await zip.generateAsync({ type: "blob" });
                saveAs(content, "note.sy.zip");
            } catch (error) {
                console.error("导出失败:", error);
            }
        });
    </script>
</body>
</html>
```

<div>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>导出思源笔记为sy.zip</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.7.1/jszip.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.5/FileSaver.min.js"></script>
</head>
<body>
    <button id="exportBtn">导出为sy.zip</button>
    <script>
        document.getElementById('exportBtn').addEventListener('click', async () => {
            const noteId = "20240821144928-jjxmfrz"; // 替换为你的笔记ID
            const apiUrl = "https://qsy.stevehfut.top:4343/api/export/exportMdContent";
            const requestBody = { id: noteId };
            try {
                // 获取笔记内容
                const noteResponse = await fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(requestBody)
                });
                if (!noteResponse.ok) {
                    throw new Error('获取笔记内容失败');
                }
                const noteData = await noteResponse.json();
                const noteContent = noteData.data.content;
                // 创建一个JSZip实例
                const zip = new JSZip();
                zip.file("note.md", noteContent);
                // 假设有一些资源文件需要下载
                const resourcePaths = ["/data/assets/21e2e88b75e5a4e88ff3ecf8772f05e9-20240802103113-ovoxde7.webp"];
                for (const path of resourcePaths) {
                    const resourceResponse = await fetch(`https://qsy.stevehfut.top:4343/api/file/getFile`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ path: path })
                    });
                    if (!resourceResponse.ok) {
                        throw new Error(`获取资源文件 ${path} 失败`);
                    }
                    const resourceBuffer = await resourceResponse.arrayBuffer();
                    zip.file(path.split('/').pop(), resourceBuffer);
                }
                // 生成zip文件并下载
                const content = await zip.generateAsync({ type: "blob" });
                saveAs(content, "note.sy.zip");
            } catch (error) {
                console.error("导出失败:", error);
            }
        });
    </script>
</body>
</html>
</div>

### 解释

1. **引入JSZip和FileSaver库**：

    ```html
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.7.1/jszip.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.5/FileSaver.min.js"></script>
    ```

    CopyInsert
2. **获取笔记内容**：

    ```javascript
    const noteResponse = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    });
    const noteData = await noteResponse.json();
    const noteContent = noteData.data.content;
    ```

    CopyInsert
3. **创建JSZip实例并添加笔记内容**：

    ```javascript
    const zip = new JSZip();
    zip.file("note.md", noteContent);
    ```

    CopyInsert
4. **下载资源文件并添加到zip中**：

    ```javascript
    for (const path of resourcePaths) {
        const resourceResponse = await fetch(`http://localhost:6806/api/file/getFile`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ path: path })
        });
        const resourceBuffer = await resourceResponse.arrayBuffer();
        zip.file(path.split('/').pop(), resourceBuffer);
    }
    ```

    CopyInsert
5. **生成zip文件并下载**：

    ```javascript
    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, "note.sy.zip");
    ```

    CopyInsert

通过以上方法，可以实现将思源笔记的文档和相关资源打包成一个`.sy.zip`文件，并提供给用户下载。

### 参考资料

- [JSZip文档](https://stuk.github.io/jszip/)
- [FileSaver.js文档](https://github.com/eligrey/FileSaver.js/)
- [思源社区文档 - 内核API](https://docs.siyuan-note.club/zh-Hans/reference/api/kernel/) [1]
- [插件开发入门](https://docs.siyuan-note.club/zh-Hans/guide/plugin/startup.html) [2]
