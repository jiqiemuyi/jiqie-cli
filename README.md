### git 代理不走全局或规则需要单独配置

如果你的网络环境需要代理，请运行以下命令：

> 全局添加或移除 git config 命令后需跟 --global

```bash
git config http.proxy http://127.0.0.1:7890
git config https.proxy https://127.0.0.1:7890
```

或者编辑 .git/config 文件，添加以下内容：

```ini
[http]
    proxy = http://127.0.0.1:7890
[https]
    proxy = https://127.0.0.1:7890
```

运行以下命令，检查当前项目的 Git 配置：

> 查看全局配置 --local 替换为 --global

```bash
git config --local --list
```

你会看到类似以下的输出：

```js
http.proxy=http://127.0.0.1:7890
https.proxy=https://127.0.0.1:7890
```

如果后续不需要代理，可以移除当前项目的代理配置：

```bash
git config --unset http.proxy
git config --unset https.proxy
```

### .npmrc(公司源会导致发布 npm 失败)

自定义配置 npm 源，在项目根目录下创建 .npmrc 文件，添加以下内容：

```ini
registry=https://registry.npmjs.org/
```

### .yarnrc

自定义配置 yarn 源，在项目根目录下创建 .yarnrc 文件，添加以下内容：

```ini
registry "https://registry.npmjs.org/"
```
