### 代理配置

如果你的网络环境需要代理，请运行以下命令：
如果是全局添加或查看 git config 命令后需跟 --global

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
