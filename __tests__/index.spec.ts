import {add} from "./../src/index";

describe("Add Function", () => {
  it("Should add 2 numbers together", () => {
    expect(add(1, 2)).toBe(3);
    expect(add(2, 5)).toBe(7);
  });
});
