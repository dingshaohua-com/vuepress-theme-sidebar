import fs from "fs";
import path from "path";
import coreFn from "./core.js";

export default (params) => {
  const sidebar = coreFn(path.resolve(`./${params.sourceDir}`));
  return sidebar;
};
