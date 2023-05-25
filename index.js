import { getDirname, path, fs } from "@vuepress/utils";
import { defaultTheme } from "@vuepress/theme-default";
import genSider from "./helper/gen-side";
const __dirname = getDirname(import.meta.url);

// 创建一个基于默认主题的page文件 并作出修改 是为在右侧放入页面内部导航部分
// （当然如果你觉得node操作文件得读写查有点笨拙 也可以使用shelljs）
const newPageFile = path.resolve(__dirname, "./components/Page.vue");
const soucePageFile = "node_modules/@vuepress/theme-default/lib/client/components/Page.vue";
let soucePageFileContent = fs.readFileSync(soucePageFile, "utf8");
soucePageFileContent = soucePageFileContent.replace(`<script setup lang="ts">`, `<script setup lang="ts">\nimport AnchorRight from './anchor-right/index.vue'`);
soucePageFileContent = soucePageFileContent.replace(`<div class="theme-default-content">`, `<div class="theme-default-content">\n<anchor-right/>`);
fs.writeFileSync(newPageFile, soucePageFileContent);

// 动态创建右侧菜单目录
const sidebar = genSider();

// 最终导出
export default (options) => {
  const handel = (app) => {
    return {
      name: "vuepress-theme-sidebar",
      extends: defaultTheme({ ...options, sidebar, sidebarDepth: [0] }), // sidebarDepth设置为0，页面内部的导航全部挪动的右侧
      alias: {
        // 覆盖组件别名
        "@theme/Page.vue": newPageFile,
      }
    };
  };
  return handel;
};
