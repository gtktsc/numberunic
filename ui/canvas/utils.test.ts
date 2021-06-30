import { transformValue, shapeRotation } from "./utils";

const prepareTransformValueOutput = (
  thousands: string | void,
  hundreds: string | void,
  tens: string | void,
  ones: string | void
) => ({
  ones,
  tens,
  hundreds,
  thousands,
});

const prepareShapeRotationOutput = (
  tx: number,
  ty: number,
  sx: number,
  sy: number
) => ({ translate: [tx, ty], scale: [sx, sy] });

describe("Canvas component", () => {
  describe("transformValue", () => {
    test("doesn't add any additional values if one digit number is present", () => {
      expect(transformValue(1)).toStrictEqual(
        prepareTransformValueOutput(undefined, undefined, undefined, "1")
      );
    });
    test("properly transform values", () => {
      expect(transformValue(1234)).toStrictEqual(
        prepareTransformValueOutput("1", "2", "3", "4")
      );
    });
    test("properly transform values when zeros are present", () => {
      expect(transformValue(1010)).toStrictEqual(
        prepareTransformValueOutput("1", undefined, "1", undefined)
      );
    });
    test("Fill missing values when provided value is less than thousand", () => {
      expect(transformValue(42)).toStrictEqual(
        prepareTransformValueOutput(undefined, undefined, "4", "2")
      );
    });
    test("Silently handle invalid format in runtime", () => {
      //@ts-ignore for test purpose
      expect(transformValue("42")).toStrictEqual(
        prepareTransformValueOutput(undefined, undefined, "4", "2")
      );
    });
  });

  describe("shapeRotation", () => {
    test("tens values are provided properly", () => {
      expect(shapeRotation("tens")).toStrictEqual(
        prepareShapeRotationOutput(100, 0, -1, 1)
      );
    });
    test("hundreds values are provided properly", () => {
      expect(shapeRotation("hundreds")).toStrictEqual(
        prepareShapeRotationOutput(0, 100, 1, -1)
      );
    });
    test("thousands values are provided properly", () => {
      expect(shapeRotation("thousands")).toStrictEqual(
        prepareShapeRotationOutput(100, 100, -1, -1)
      );
    });
    test("ones values are provided properly", () => {
      expect(shapeRotation("ones")).toStrictEqual(
        prepareShapeRotationOutput(0, 0, 1, 1)
      );
    });
    test("expect to use default values when shape is invalid", () => {
      //@ts-ignore for test purpose
      expect(shapeRotation(`¡Ay, caramba!`)).toStrictEqual(
        prepareShapeRotationOutput(0, 0, 1, 1)
      );
    });
  });
});
