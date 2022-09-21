import { isStringList } from "../isStringList";

describe("isStringList", () => {
  it("should return true when list is a string list", () => {
    const list = [""];
    const result = isStringList(list);
    expect(result).toBe(true);
  });

  it("should return true when list is not an array", () => {
    const list = ["random string"];
    const result = isStringList(list);
    expect(result).toBe(true);
  });

  it("should return false when list is not string array", () => {
    const list: string[] = [];
    const result = isStringList(list);
    expect(result).toBe(false);
  });
});
