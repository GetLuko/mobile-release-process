import { createBranch, push } from "../git/commands";
import { alpha } from "../git/git.config";
import { print } from "../utils/print";
import { throwError } from "../utils/throwError";
import { getCurrentAppVersion } from "./utils/getCurrentAppVersion";

(async () => {
  print({ message: "Create next alpha branch for the release" });
  try {
    const currentAppVersion = getCurrentAppVersion();
    if (!currentAppVersion) {
      throw throwError("Can not get current app version");
    }
    const branchName = alpha(currentAppVersion);
    await createBranch(branchName);
    await push(branchName);
    print({ message: `✅ ${branchName} was created` });
  } catch (error: any) {
    print({
      message: `❌ ${error?.message ?? "Failed to create alpha branch"}`,
      type: "error",
    });
  }
})();
