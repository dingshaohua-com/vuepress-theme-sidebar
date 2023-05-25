// import fs from "fs";
// import path from "path";

// const sidebar = [];
// const readDir = (url) => {
//   // 获取传入进来的目录信息
//   const dirInfo = fs
//     .readdirSync(url)
//     .filter((it) => it !== ".vuepress" && it !== "README.md");
//   // 遍历目录
//   dirInfo.map((item) => {
//     const absolutePath = path.join(url, item); // 文件或文件夹的绝对路径
//     const relativePath = absolutePath.replace(path.resolve("./docs"), ""); // 文件或文件夹的相对路径
//     const relativePathArr = relativePath.split("\\").filter((it) => it !== ""); // 文件或文件夹的相对路径 转换为数组
//     const isDir = fs.statSync(absolutePath).isDirectory();
//     // 目录信息
//     let dirMenu = {};
//     if (isDir) {
//       // 扩充_category_.json文件，用来配置文件夹本身作为菜单展示的基本信息 模拟docusaurus
//       const categoryFile = JSON.parse(
//         fs.readFileSync(absolutePath + "\\_category_.json", "utf-8")
//       );
//       console.log(item);
//       dirMenu = {
//         id: item, // 扩充字段 为了生成sidebar
//         text: categoryFile.label,
//         collapsible: true,
//         children: [],
//         order: categoryFile.order, // 扩充字段 为了排序
//       };
//     }
//     if (relativePathArr.length === 1) {
//       // 如果只有一层 则直接赋值sidebar
//       let fileMenu = relativePath.replaceAll("\\", "/");
//       let mdFrontmatter = {}; // 获取md文件的frontmatter信息
//       if (!isDir) {
//         const mdFile = fs.readFileSync(absolutePath, "utf-8");
//         const regex = /---([\s\S]+?)---/;
//         const match = mdFile.match(regex);
//         if (match && match.length > 1) {
//           mdFrontmatter = yaml.load(match[1]);
//         }
//       }

//       // 根据order排序设置到sidebar中
   
//       if (dirMenu.order && isDir) {
//         sidebar[dirMenu.order] = dirMenu;
//       } else if (mdFrontmatter.order && !isDir) {
//         sidebar[mdFrontmatter.order] = fileMenu;
//       } else {
//         sidebar.push(isDir ? dirMenu : fileMenu);
//       }
//     } else {
//       // 如果文件或文件夹的路径有很多层 则通过reduce来赋值到sidebar对应的位置
//       relativePathArr.reduce(function (prev, cur, index, arr) {
//         // 第一层的时候 直接返回出去当前元素
//         if (index === 0) {
//           console.log('arr', arr);
//           for (let index = 0; index < prev.length; index++) {
//             const element = prev[index];
            
//             if (element.id === cur) {
//               return element;
//             }
//           }
//         } else {
//           // 最后一层的时候再做赋值sidebar操作
//           if (index === arr.length - 1) {
//             if (isDir) {
//               if (dirMenu.order) {
//                 prev.children[dirMenu.order] = dirMenu;
//               } else {
//                 prev.children.push(dirMenu);
//               }
//             } else {
//               const fileMenu = relativePath.replaceAll("\\", "/");
//               if (item !== "_category_.json" && item !== "index.md") {
//                 let mdFrontmatter = {}; // 获取md文件的frontmatter信息
//                 const mdFile = fs.readFileSync(absolutePath, "utf-8");
//                 const regex = /---([\s\S]+?)---/;
//                 const match = mdFile.match(regex);
//                 if (match && match.length > 1) {
//                   mdFrontmatter = yaml.load(match[1]);
//                 }
//                 if (mdFrontmatter.order && !isDir) {
//                   prev.children[mdFrontmatter.order] = fileMenu;
//                 } else {
//                   prev.children.push(fileMenu);
//                 }
//               }
//             }
//           } else {
//             // 中间层的时候 继续通过reduce链式定位
//             for (let index = 0; index < prev.children.length; index++) {
//               const element = prev.children[index];
//               if (element.id === cur) {
//                 return element;
//               }
//             }
//           }
//         }
//       }, sidebar);
//     }
//     // 如果是目录 继续递归
//     isDir && readDir(absolutePath);
//   });
// };
// readDir(path.resolve("./docs"));
// console.log(sidebar);
// const content = `export default ${JSON.stringify(sidebar, null, 2)}`;
// fs.writeFile("./utils/sidebar.ts", content, { encoding: "utf8" }, (err) => {});
