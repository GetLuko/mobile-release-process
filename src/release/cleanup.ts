import Listr from 'listr';
import { pipe } from 'lodash/fp';

import { alpha } from '../git/git.config';
import { deleteLocalBranch, deleteRemoteBranch } from '../git/git.utils';
import { print } from '../script.utils';

async function cleanup(releaseNumber: string) {
  print({ message: 'Housekeeping 🧹' });
  const tasks = new Listr([
    {
      title: 'Delete local alpha branch',
      task: () => pipe(alpha, deleteLocalBranch)(releaseNumber),
    },
    {
      title: 'Delete local remote branch',
      task: () => pipe(alpha, deleteRemoteBranch)(releaseNumber),
    },
  ]);

  await tasks.run();
}

export default cleanup;
