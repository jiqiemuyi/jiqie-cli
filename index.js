#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const { program } = require("commander");

// 从package.json中获取版本号
const packageJson = require("./package.json");

// 将回调函数转换为 Promise
const mkdir = promisify(fs.mkdir);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

// 模板路径
const templateDir = path.join(__dirname, "./templates");

// 创建项目的函数
async function createProject(projectName) {
  const projectDir = path.join(process.cwd(), projectName);

  // 创建项目目录
  await mkdir(projectDir, { recursive: true });

  // 复制模板文件
  const copyTemplate = async (src, dest) => {
    const content = await readFile(src, "utf8");
    await writeFile(dest, content);
  };

  // 递归复制文件夹
  const copyDir = async (src, dest) => {
    await mkdir(dest, { recursive: true });
    const files = fs.readdirSync(src);
    for (const file of files) {
      const srcFile = path.join(src, file);
      const destFile = path.join(dest, file);
      if (fs.lstatSync(srcFile).isDirectory()) {
        await copyDir(srcFile, destFile);
      } else {
        await copyTemplate(srcFile, destFile);
      }
    }
  };

  // 复制模板到项目目录
  await copyDir(templateDir, projectDir);

  console.log(`Success! Created ${projectName} at ${projectDir}`);
  console.log("Inside that directory, you can run the following commands:");
  console.log("  npm install");
  console.log("  npm start");
}

program
  .name(Object.keys(packageJson.bin)[0])
  .description("A CLI tool for managing React projects")
  .version(packageJson.version)
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
    createProject(projectName);
  });

// 定义 init 子命令
program
  .command("init")
  .description("Initialize a configuration file")
  .action(() => {
    console.log("Initializing configuration file...");
  });

program.parse(process.argv);
