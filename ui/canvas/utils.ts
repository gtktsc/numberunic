import { DecimalValue } from "./types";
import { shapes, grid } from "./constants";
import {
  DrawInterface,
  DrawConstructor,
  DrawLine,
  DrawLines,
  DrawShapes,
  ShapeRotation,
} from "./types";

// transformation from value provided by the user to internal interpretation that supports 4 digits stored as an DecimalValue interface
export const transformValue = (value: number): DecimalValue => {
  // downlevel iteration to spread string into array
  const rawValuesArray = [...value.toString()];

  const transformedArray: Array<keyof typeof shapes | void> = Array(
    4 - rawValuesArray.length
  )
    .fill(undefined)
    .concat(rawValuesArray)
    // shape for 0 was not provided, this is mapping to keyof shapes | void
    .map((string) => (string === "0" ? undefined : string));

  return {
    ones: transformedArray[3],
    tens: transformedArray[2],
    hundreds: transformedArray[1],
    thousands: transformedArray[0],
  };
};

// higher 'dimensions' are just flips of primitive shapes
// tens -> vertical flip
// hundreds -> horizontal flip
// thousands -> vertical and horizontal flip
export const shapeRotation: ShapeRotation = (shape) => {
  switch (shape) {
    case "tens": {
      return { translate: [grid.max, 0], scale: [-1, 1] };
    }
    case "hundreds": {
      return { translate: [0, grid.max], scale: [1, -1] };
    }
    case "thousands": {
      return { translate: [grid.max, grid.max], scale: [-1, -1] };
    }
    case "ones":
    default: {
      return { translate: [0, 0], scale: [1, 1] };
    }
  }
};

export const Drawable: DrawConstructor = class Draw implements DrawInterface {
  constructor(private ctx: CanvasRenderingContext2D) {}

  line: DrawLine = ({ start, end }) => {
    this.ctx.beginPath();
    this.ctx.moveTo(start.x, start.y);
    this.ctx.lineTo(end.x, end.y);
    this.ctx.stroke();
  };

  private lines: DrawLines = (shape) => {
    shape.forEach(this.line);
  };

  shape: DrawShapes = (shape, variant) => {
    // rotate shape according to it's type
    const { translate, scale } = shapeRotation(shape);
    this.ctx.translate(...translate);
    this.ctx.scale(...scale);

    // draw shape
    this.lines(shapes[variant]);

    // cleanup
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
  };
};
