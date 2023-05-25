import fs from "fs";
import path from "path";
import coreFn from "./core.js";

export default () => {
  const sidebar = coreFn(path.resolve("./docs"));
  // const content = `export default ${JSON.stringify(sidebar, null, 2)}`;
  // fs.writeFile("./utils/sidebar.ts", content, { encoding: "utf8" }, (err) => {});
  return sidebar;
};
