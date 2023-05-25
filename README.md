<div align="center"> 
<h1>vuepress-theme-sidebar</h1>

<!-- 简体中文 | [English](./README-en.md) -->

![](https://img.shields.io/badge/vuepress_theme_sidebar-v0.0.1-brightgreen)
<br> <br>
vuepress-theme-sidebar 一款用于vuepress2.x的自动生成导航栏的主题。     


![img](https://github.com/dingshaohua-cn/vuepress-theme-sidebar/blob/main/preview/img.png?raw=true)

</div>

## 说明
仅仅基于官方默认主题之上扩展了一些功能：生成左右侧导航目录的功能。   
会根据你docs目录下的md文件或文件夹，自动生成左侧侧边栏。   
并且会像Docusaurus一样，将页面内的导航移动到文档阅读区域的右侧。   

## 🔨 使用

先安装

```shell
npm install vuepress-theme-sidebar
```

再引入你的项目

```js
// docs/.vuepress/config.js
import themeSidebar from 'vuepress-theme-sidebar';

export default  {
  ...,
  theme: themeSidebar()
  // themeSidebar({ // 这里可以传入官方默认主题的配置项 })
};
```

### 扩展功能
默认情况下 文件夹会被作为折叠菜单，并以文件夹的名字作为右侧导航的名字。      
如果你不想这么做，可以在文件夹里新增一个`_category_.json`   
```js
{
    "label":"后端开发规范"  // 覆盖以文件夹的名字默认的生成的菜单名
}
```


## 🤝 谢谢
如果这个项目对你有帮助，请帮忙点一个 Star。    
作者想进大厂需要有好的项目，期望您的一个赞帮我筑梦成功！   
或者赞助我一点点钱也行，多少都可以，毕竟我需要动力是不是?       
![img](https://github.com/dingshaohua-cn/vuepress-theme-sidebar/blob/main/preview/money.png?raw=true)


## ❤️ 后续    
另外如果是1.x的版本  我本来就不支持    
然后还是有问题，出不来的加QQ群：589063088    
![img](https://github.com/dingshaohua-cn/vuepress-theme-sidebar/blob/main/preview/qq.png?raw=true)

  