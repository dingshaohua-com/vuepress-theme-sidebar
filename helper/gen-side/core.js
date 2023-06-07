import { getDirInfo, computeParams, genDirMenu } from "./helper.js";
import os from 'os';

const isWindows = os.type() === 'Windows_NT';

export default (rootUrl) => {
  const sidebar = [];
  const readDir = (url) => {
    // 获取传入进来的目录结构
    const dirInfo = getDirInfo(url);
    // 遍历目录
    dirInfo.map((item) => {
      // 一些下边使用基本参数
      const { absolutePath, relativePath, relativePathArr, isDir } = computeParams(url, item);
      const isRootFile = relativePathArr.length === 1; // 是否根路径下的文件或文件夹
      const dirMenu = isDir ? genDirMenu(absolutePath) : null;
      if (isRootFile) {
        // 如果只有一层 则直接赋值sidebar
        sidebar.push(isDir ? dirMenu : (isWindows?relativePath.replaceAll("\\", "/"):relativePath));
      } else {
        // 如果文件或文件夹的路径有很多层 则通过reduce来赋值到sidebar对应的位置
        relativePathArr.reduce((prev, cur, index, arr) => {
          // 最后一层的时候再做赋值sidebar操作
          if (index === arr.length - 1) {
            prev.children.push(isDir ? dirMenu :(isWindows?relativePath.replaceAll("\\", "/"):relativePath));
          } else {
            // 否则继续递归到最后一层
            const prevItem = index === 0 ? prev : prev.children;
            for (let index = 0; index < prevItem.length; index++) {
              const element = prevItem[index];
              if (element.id === cur) return element;
            }
          }
        }, sidebar);
      }
      // 如果是目录 继续递归
      isDir && readDir(absolutePath);
    });
  };
  readDir(rootUrl);
  return sidebar;
};
