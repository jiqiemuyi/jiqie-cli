#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const readline = require("readline");

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

// 读取用户输入
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Enter project name: ", (projectName) => {
  rl.close();
  createProject(projectName);
});
