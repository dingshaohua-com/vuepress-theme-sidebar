import fs from "fs";
import path from "path";
import os from 'os';

const isWindows = os.type() === 'Windows_NT';
const baseStr = isWindows?"\\":"/";


/**
 * 根据文件路径 获取文件目录结构
 * @param {*} url
 * @returns
 */
export const getDirInfo = (url, params) => {
  let dirInfo = fs.readdirSync(url);
  // 根目录要忽略.vuepress和README.md文件
  const regexString1= `.*\\\\${params.sourceDir}$`;
  const regexString2 =   `.*\\/${params.sourceDir}$`;
  const regex = new RegExp(isWindows?regexString1:regexString2);
  // const isRootUrl = isWindows?/.*\\docs$/.test(url):/.*\/docs$/.test(url);
  const isRootUrl = regex.test(url);
  console.log(url, isRootUrl);
  if (isRootUrl) {
    dirInfo = dirInfo.filter((it) => it !== ".vuepress" && it !== "README.md");
  }
  // 也要忽略配置文件
  dirInfo = dirInfo.filter((it) => it !== "_category_.json");
  return dirInfo;
};

/**
 * 根据文件路径 切割成数组
 * @exmple D://文件/测试.md 切割为['D', '文件', '测试.md']
 */
export const splitUrl = (url) => {
  return url.split(baseStr).filter((it) => it !== ""); // 文件或文件夹的相对路径 转换为数组
};

/**
 * 生成目录的core.js一些必要的参数
 */
export const computeParams = (url, item, params) => {
  const absolutePath = path.join(url, item); // 文件或文件夹的绝对路径
  const relativePath = absolutePath.replace(path.resolve(`./${params.sourceDir}/`), ""); // 文件或文件夹的相对路径
  const relativePathArr = splitUrl(relativePath); // 文件或文件夹的相对路径 转换为数组
  const isDir = fs.statSync(absolutePath).isDirectory(); // 判断是文件夹或文件
  return { absolutePath, relativePath, relativePathArr, isDir };
};

/**
 * 生成目录对应json文件信息json
 */
export const genDirMenu = (url) => {
  // 扩充_category_.json文件，用来配置文件夹本身作为菜单展示的基本信息 模拟docusaurus
  const lastDirName = url.slice(url.lastIndexOf(baseStr) + 1);
  const checkFile = fs.existsSync(url + baseStr +"_category_.json");
  if (checkFile) {
    const categoryContent = fs.readFileSync(url + baseStr +"_category_.json", "utf-8") || "{}";
    let categoryJson = JSON.parse(categoryContent);
    return {
      id: lastDirName,
      text: categoryJson.label ? categoryJson.label : lastDirName,
      collapsible: true,
      children: [],
      ...categoryJson,
    };
  } else {
    return {
      id: lastDirName,
      text: lastDirName,
      collapsible: true,
      children: [],
    };
  }
};
