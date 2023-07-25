import { getDirname, path, fs } from "@vuepress/utils";
import { defaultTheme } from "@vuepress/theme-default";
import genSider from "./helper/gen-side/index.js";


// 创建一个基于默认主题的page文件 并作出修改 是为在右侧放入页面内部导航部分
const __dirname = getDirname(import.meta.url);
const newPageFile = path.resolve(__dirname, "./components/Page.vue");
const pageFile = path.resolve('node_modules/@vuepress/theme-default/lib/client/components/Page.vue');
let pageFileContent = fs.readFileSync(pageFile, "utf8");
pageFileContent = pageFileContent.replace(`<script setup lang="ts">`, `<script setup lang="ts">\nimport AnchorRight from './anchor-right/index.vue'`);
pageFileContent = pageFileContent.replace(`<div class="theme-default-content">`, `<div class="theme-default-content">\n<anchor-right/>`);
fs.writeFileSync(newPageFile, pageFileContent);

const newSidebarItemFile = path.resolve(__dirname, "./components/SidebarItem.vue");
const sidebarItemFile = "node_modules/@vuepress/theme-default/lib/client/components/SidebarItem.vue";
let sidebarItemFileContent = fs.readFileSync(sidebarItemFile, "utf8");
sidebarItemFileContent = sidebarItemFileContent.replace(`'../../shared/index.js'`, `'@vuepress/theme-default/lib/shared/index.js'`);
sidebarItemFileContent = sidebarItemFileContent.replace(`'../utils/index.js'`, `'@vuepress/theme-default/lib/client/utils/index.js'`);
sidebarItemFileContent = sidebarItemFileContent.replace(`<SidebarItem`, `<SidebarItem \n v-show="depth<2"`);
fs.writeFileSync(newSidebarItemFile, sidebarItemFileContent);


// 最终导出
export default (options) => {
  // 动态创建右侧菜单目录
  const sidebar = genSider();
  const handel = (app) => {
    const defaultThemeCfg = { ...options, sidebar};
    if (options?.sidebarType === "right") {
      delete defaultThemeCfg.sidebar;
    } else if (options?.sidebarType === "left") {
      delete defaultThemeCfg.sidebarDepth;
    }

    const config = {
      name: "vuepress-theme-sidebar",
      extends: defaultTheme(defaultThemeCfg), // sidebarDepth设置为0，页面内部的导航全部挪动的右侧
      alias: {
        // 覆盖组件别名
        "@theme/Page.vue": newPageFile,
        "@theme/SidebarItem.vue": newSidebarItemFile,
      },
    };
    options?.sidebarType === "left" && delete config.alias;
    return config;
  };
  return handel;
};