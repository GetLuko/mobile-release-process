import * as git from "../commands";
import { getLatestTag } from "../getLatestTag";

describe("getLastestTag", () => {
  const tagList = `v0.3.991
    v0.3.990
    v0.3.980
    v0.3.971
    v0.3.970
    v0.3.962
    v0.3.961
    v0.3.960
    v0.3.951
    v0.3.950`;

  it("should return the latest tag", async () => {
    jest.spyOn(git, "tag").mockResolvedValue(tagList);

    const latestTag = await getLatestTag();

    expect(latestTag).toBe("v0.3.991");
  });
  it("should return undefined when git tag return nothing", async () => {
    jest.spyOn(git, "tag").mockResolvedValue(undefined);

    const latestTag = await getLatestTag();

    expect(latestTag).toBeUndefined();
  });
});
