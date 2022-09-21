import { checkSubmitCommit } from "../checkSubmitCommit";

describe("checkSubmitCommit", () => {
  it("should return false if the answer is null", () => {
    const submitCommit = null;
    const result = checkSubmitCommit(submitCommit);
    expect(result).toBe(false);
  });
  it("should return false if the submitCommit is undefined", () => {
    const submitCommit = undefined;
    const result = checkSubmitCommit({ submitCommit });
    expect(result).toBe(false);
  });
  it("should return false if the submitCommit is not a boolean", () => {
    const submitCommit = "string";
    const result = checkSubmitCommit({ submitCommit });
    expect(result).toBe(false);
  });
  it("should return true if the submitCommit is a boolean", () => {
    const submitCommit = true;
    const result = checkSubmitCommit({ submitCommit });
    expect(result).toBe(true);
  });
});
