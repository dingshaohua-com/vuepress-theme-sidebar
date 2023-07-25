import themeSidebar from "vuepress-theme-sidebar";


const isDev = process.env.NODE_ENV === 'development';
export default {
  base: isDev ? '/' : '/vuepress-theme-sidebar',
  dest: 'docs',
  theme: themeSidebar(),
};
