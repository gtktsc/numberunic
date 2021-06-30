import { shapes } from "./constants";

export type Decimals = "ones" | "tens" | "hundreds" | "thousands";

export type DecimalValue = {
  [key in Decimals]: keyof typeof shapes | void;
};

export interface Point {
  x: number;
  y: number;
}

export interface Line {
  start: Point;
  end: Point;
}

export type ShapeRotation = (shape: Decimals) => {
  translate: [number, number];
  scale: [number, number];
};

export type DrawLine = (line: Line) => void;
export type DrawLines = (shape: Array<Line>) => void;
export type DrawShapes = (
  shape: Decimals,
  variant: keyof typeof shapes
) => void;

export interface DrawInterface {
  line: DrawLine;
  shape: DrawShapes;
}
export interface DrawConstructor {
  new (ctx: CanvasRenderingContext2D): DrawInterface;
}
