import fs from "fs";
import path from "path";
import os from 'os';

const isWindows = os.type() === 'Windows_NT';
const baseStr = isWindows ? "\\" : "/";

// 生成json对象
function generateJson(url) {

    // 递归扫描目录
    function scanDir(dir) {
        // 枚举所有文件和目录
        let files = fs.readdirSync(dir);

        // 读取配置文件
        const categoryJson = path.join(dir, '_category_.json');

        // 判断是不是根目录
        const isroot = (url === dir);

        // 目录配置信息
        let categoryData = {};

        // 配置文件如果存在就读取
        if (fs.existsSync(categoryJson)) {
            const categoryContent = fs.readFileSync(categoryJson, 'utf8');
            categoryData = JSON.parse(categoryContent);
        }

        // 子项，可以是文件(string)，也可是目录(object)
        const children = [];

        // 判断要不要搞优先级排序
        if (categoryData.priority && Array.isArray(categoryData.priority)) {
            // 为文件构建含优先级的数组
            files = files.map(file => {
                // 为每个文件创建对象
                const priorityObj = categoryData.priority.find(obj => obj.hasOwnProperty(file));
                // 默认优先级为1，如果在priority中找到对应文件名，则设置相应优先级
                const priority = priorityObj ? priorityObj[file] : 1;
                return { name: file, priority: priority };
            });

            // 按优先级降序排序
            files.sort((a, b) => b.priority - a.priority);

            // 只保留文件名
            files = files.map(file => file.name);
        }

        // 遍历一遍文件列表
        for (const file of files) {

            // 如果是根目录下，那么忽略`.vuepress`文件夹和`README.md`
            // 然后不管什么情况下都需要忽略`_category_.json`
            if ((isroot && (file === '.vuepress' || file === 'README.md')) || file === '_category_.json') {
                continue;
            }

            // 如果正确配置了隐藏项，就检查当前文件/目录是否被设置为隐藏
            if (categoryData.hidden && Array.isArray(categoryData.hidden) && categoryData.hidden.includes(file)) {
                continue;
            }

            // 合成全路径
            let filePath = path.join(dir, file);

            // 路径对应的状态
            const stats = fs.statSync(filePath);

            // 判断是不是目录
            if (stats.isDirectory()) {
                // 如果是目录直接压入目录的节点对象，这样子就自动完成了dfs遍历目录树
                children.push(scanDir(filePath));
            } else {
                // 说明是文件，需要把根路径删除
                filePath = filePath.replace(url, '');

                // 把Windows下的`\`换成`/`，如果是Linux就是`/`换`/`没影响
                filePath = filePath.replaceAll(baseStr, '/');

                // 压入字符串
                children.push(filePath);
            }
        }

        // 构造本目录的node对象
        const node = {
            id: path.basename(dir),
            text: categoryData.label ? categoryData.label : path.basename(dir),
            collapsible: true,
            children: children
        };

        // 返回本目录的node对象
        return node;
    }

    // 获取根目录的node对象
    const result = scanDir(url);

    // `id`之类的属性不需要，只需要`children`的数组
    return result.children;
}

export default (rootUrl) => {
    return generateJson(rootUrl);
};