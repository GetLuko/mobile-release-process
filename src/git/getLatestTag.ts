import { splitByLines } from "../utils/splitByLines";
import { tag } from "./commands";

/**
 * Get the latest tag.
 * Tags are sorted by version number,
 * the highest version number will be the latest tag
 *
 * git tag --sort=<type>
 * "version:refname" or "v:refname" (tag names are treated as versions).
 * @returns
 */

export const getLatestTag = async () => {
  const tagOutput = await tag(`--sort=-version:refname`);

  if (tagOutput === undefined) {
    return;
  }

  const tagList = splitByLines(tagOutput);

  return tagList[0];
};
