import { bumpBuildNumber } from "./release/buildNumber/bumpBuildNumber";
import { bumpVersionNumber } from "./release/buildNumber/bumpVersionNumber";
import { createAlphaBranch } from "./release/createAlphaBranch";
import { patch } from "./release/patch";
import { release } from "./release/release";
import { print } from "./utils/print";

export async function run() {
  try {
    if (process.argv.includes("release")) {
      await release();
      return;
    }
    if (process.argv.includes("alpha-patch")) {
      await patch();
      return;
    }
    if (process.argv.includes("create-alpha-branch")) {
      await createAlphaBranch();
      return;
    }
    if (process.argv.includes("build-version-script")) {
      await bumpVersionNumber();
      return;
    }
    if (process.argv.includes("build-number-script")) {
      await bumpBuildNumber();
      return;
    }
    print({
      message:
        'You need to pass a argument to the script. For example: "release" "patch" "create-alpha-branch" "build-version-script" "build-number-script"',
      type: "error",
    });
  } catch (e) {
    console.error(e);
  }
}
