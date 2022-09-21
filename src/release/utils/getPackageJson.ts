import fs from "fs";
import path from "path";

import { files } from "../constants";

export const getPackageJson = () => {
  const baseDir = process.cwd();
  return fs.readFileSync(path.join(baseDir, files.packageJson), "utf8");
};
