import { checkCommitList } from "../../utils/checkCommitList";

describe("preparePatch", () => {
  describe("preparePatch", () => {
    it("should return false when commitList is empty", () => {
      const anwser = { commitList: [] };
      const result = checkCommitList(anwser.commitList);
      expect(result).toBe(false);
    });
    it("should return false when commitList is null", () => {
      const anwser = { commitList: null };
      const result = checkCommitList(anwser?.commitList);
      expect(result).toBe(false);
    });
    it("should return false when commitList is undefined", () => {
      const anwser = { commitList: undefined };
      const result = checkCommitList(anwser?.commitList);
      expect(result).toBe(false);
    });
    it("should return false when anwser is empty", () => {
      const result = checkCommitList({});
      expect(result).toBe(false);
    });
    it("should return true when anwser contain a list of string", () => {
      const anwser = { commitList: ["sha1", "sha2"] };
      const result = checkCommitList(anwser?.commitList);
      expect(result).toBe(true);
    });
  });
});
