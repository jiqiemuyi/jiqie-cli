### 代理配置

如果你的网络环境需要代理，请运行以下命令：

```bash
git config http.proxy http://127.0.0.1:7890
git config https.proxy https://127.0.0.1:7890
```

或者编辑 .git/config 文件，添加以下内容：
[http]
proxy = http://127.0.0.1:7890
[https]
proxy = https://127.0.0.1:7890
