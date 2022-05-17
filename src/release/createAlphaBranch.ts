import { alpha } from '../git/git.config';
import { createBranch, push } from '../git/git.utils';
import { print } from '../script.utils';
import { getCurrentAppVersion } from './release.utils';

(async () => {
  print({ message: 'Create next alpha branch for the release' });
  try {
    const currentAppVersion = getCurrentAppVersion();
    const branchName = alpha(currentAppVersion);
    await createBranch(branchName);
    await push(branchName);
    print({ message: `✅ ${branchName} was created` });
  } catch (error) {
    print({
      message: `❌ ${error?.message ?? 'Failed to create alpha branch'}`,
      type: 'error',
    });
  }
})();
