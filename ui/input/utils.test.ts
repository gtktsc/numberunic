import { validate } from "./utils";

describe("Input component", () => {
  describe("validate", () => {
    test("Number must be greater than 0", () => {
      expect(validate(0)).toBe(false);
    });
    test("Number must be less than 10000", () => {
      expect(validate(10000)).toBe(false);
    });
    test("Number must be integer", () => {
      expect(validate(0.5)).toBe(false);
    });
    test("value must be number type", () => {
      //@ts-ignore for test purpose
      expect(validate("come on barbie")).toBe(false);
    });
    test("proper values must be handled", () => {
      expect(validate(5555)).toBe(true);
      expect(validate(9999)).toBe(true);
      expect(validate(1)).toBe(true);
      expect(validate(12)).toBe(true);
      expect(validate(123)).toBe(true);
      expect(validate(1234)).toBe(true);
    });
  });
});
