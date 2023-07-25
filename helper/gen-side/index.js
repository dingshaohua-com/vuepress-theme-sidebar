import fs from "fs";
import path from "path";
import coreFn from "./core.js";

export default (params) => {
  const sidebar = coreFn(path.resolve(`./${params.sourceDir}`), params);
  // const content = `export default ${JSON.stringify(sidebar, null, 2)}`;
  // fs.writeFile("./utils/sidebar.ts", content, { encoding: "utf8" }, (err) => {});
  return sidebar;
};
