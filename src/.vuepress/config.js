import themeSidebar from "vuepress-theme-sidebar";


const isDev = process.env.NODE_ENV === 'development';
export default {
  // base: isDev ? '/' : '/docs/',
  dest: 'docs',
  theme: themeSidebar(),
};
