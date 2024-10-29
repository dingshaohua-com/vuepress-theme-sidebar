

<div align="center"> 
<h1>vuepress-theme-sidebar</h1>

[ 推荐使用[vitePress](https://vitepress.dev/zh)，自带右侧小导航吗，比vuepress更好用 ]

<!-- 简体中文 | [English](./README-en.md) -->

![](https://img.shields.io/badge/vuepress_theme_sidebar-v0.0.1-brightgreen)
<br> <br>
[点击这里查看预览](https://dingshaohua-com.github.io/vuepress-theme-sidebar)    
[这里切换并查看预览分支的源码](https://github.com/dingshaohua-cn/vuepress-theme-sidebar/tree/example)  
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

### 配置参数
| 名称        | 类型   | 值         | 说明                                       |
| ----------- | ------ | ---------- | ------------------------------------------ |
| sidebarType | string | left/right | 需要生成左边还是右边，如果不传默认生成两侧 |


### 扩展功能
默认情况下 文件夹会被作为折叠菜单，并以文件夹的名字作为右侧导航的名字。除了根目录的`README.md`和`.vuepress`，其它文件/文件夹都会被解析进侧边栏。侧边栏的内容是按照文件名排序的。
如果你不想这么做，可以在文件夹里新增一个`_category_.json`以自定义这些行为
```json
{
  "label" : "博客", /* 自定义菜单名字。如果没有设置这个，默认情况下菜单名字是文件夹名字 */
  "hidden" : [ "404.md", "test" ], /* 自定义额外的屏蔽项，屏蔽文件或目录。直接写名字就行，不用写斜杆。 */
  "priority" : [ {"HOME.md" : 5}, {"blog" : 3}, {"tools.md" : 2} ] /* 自定义排序优先级，优先级高的会被排到上面。没配置优先级的话默认都是1。 */
}
```
因为手写json容易错，建议使用一些json在线校验工具检验你的json是否合法


## 🤝 谢谢
如果这个项目对你有帮助，请帮忙点一个 Star。    
作者想进大厂需要有好的项目，期望您的一个赞帮我筑梦成功！   
或者赞助我一点点钱也行，多少都可以，毕竟我需要动力是不是?       
![img](https://github.com/dingshaohua-cn/vuepress-theme-sidebar/blob/main/preview/money.png?raw=true)


## ❤️ 后续    
另外如果是1.x的版本  我本来就不支持    
然后还是有问题，出不来的加QQ群：589063088    
![img](https://github.com/dingshaohua-cn/vuepress-theme-sidebar/blob/main/preview/qq.png?raw=true)

  
