import { checkCommitList } from "../checkCommitList";

describe("checkCommitList", () => {
  it("should return false if the commitList is null", () => {
    const commitList = null;
    const result = checkCommitList(commitList);
    expect(result).toBe(false);
  });
  it("should return false if the commitList is undefined", () => {
    const commitList = undefined;
    const result = checkCommitList(commitList);
    expect(result).toBe(false);
  });
  it("should return false if the commitList is not a string list", () => {
    const commitList = [1, 2, 3];
    const result = checkCommitList(commitList);
    expect(result).toBe(false);
  });
  it("should return true if the commitList is a string list", () => {
    const commitList = ["085e5eeb1", "085e5eeb1", "085e5eeb1"];
    const result = checkCommitList(commitList);
    expect(result).toBe(true);
  });
});
