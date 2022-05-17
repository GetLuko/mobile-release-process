import { asyncExec } from '../script.utils';

export const checkout = (branch: string) => asyncExec(`git checkout ${branch}`);

export const createBranch = (branch: string) =>
  asyncExec(`git branch ${branch}`);

export const pull = (branch: string) => asyncExec(`git pull origin ${branch}`);

export const fetch = () => asyncExec('git fetch --tags -f');

export const changelog = () => asyncExec('yarn changelog');

export const commit = ({
  message,
  noVerify = false,
}: {
  message: string;
  noVerify?: boolean;
}) => asyncExec(`git commit -am "${message}" ${noVerify ? '--no-verify' : ''}`);

export const push = (branch: string) => asyncExec(`git push origin ${branch}`);

export const merge = (branch: string) => asyncExec(`git merge ${branch}`);

export const tag = (tagNumber: string) => asyncExec(`git tag v${tagNumber}`);

export const deleteLocalBranch = (branch: string) => {
  asyncExec(`git branch -D ${branch}`);
};

export const deleteRemoteBranch = (branch: string) => {
  asyncExec(`git push origin --delete ${branch}`);
};
