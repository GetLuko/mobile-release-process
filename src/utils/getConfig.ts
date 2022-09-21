import fs from "fs";
import path from "path";
import invariant from "./invariant";
import { isValidConfiguration } from "./isValidConfiguration";
import { print } from "./print";
import { throwError } from "./throwError";

export const getConfig = () => {
  try {
    const baseDir = process.cwd();
    const configPath = path.join(baseDir, ".mobile-release-process.config.json");
    const configuration = JSON.parse(fs.readFileSync(configPath, "utf8"));

    invariant(isValidConfiguration(configuration), "configuration", "invalid configuration file");

    return configuration;
  } catch (error) {
    print({
      message: 'Config file ".mobile-release-process.config.json" is not found',
      type: "error",
    });
    process.exit(1);
  }
};
