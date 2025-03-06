#!/usr/bin/env node
const { program } = require("commander");
const pkg = require("../package.json");

// 检查更新
(async () => {
  const updateNotifier = await import("update-notifier");
  // 使用 updateNotifier
  updateNotifier.default({ pkg }).notify();
})();

program
  .name(Object.keys(pkg.bin)[0])
  .description("A CLI tool for managing React projects")
  .version(pkg.version)
  .showHelpAfterError(); // 启用错误后显示帮助信息

// 定义 create 子命令
program
  .command("create <project-name>")
  .description("Create a new project")
  .option(
    "-t, --template <template-name>",
    "Specify a template (default: default)",
    "default"
  )
  .option("--typescript", "Use TypeScript for the project")
  .action((projectName, options) => {
    console.log("log", projectName, options);
    require("../src/commands/create")(projectName, options);
  });

// 定义 init 子命令
program
  .command("init")
  .description("Initialize a configuration file")
  .action(() => {
    console.log("Initializing configuration file...");
  });

program.parse(process.argv);
