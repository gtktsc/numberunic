import useValue from "controller/value-context";
import { useEffect, useRef } from "react";
import { saveAs } from "file-saver";

import { shapes, grid, baseline } from "./constants";
import {
  DrawInterface,
  DrawConstructor,
  DecimalValue,
  DrawLine,
  DrawLines,
  DrawShapes,
  Decimals,
} from "./types";

const transformValue = (value: number): DecimalValue => {
  // downlevel iteration to spread string into array
  const rawValuesArray = [...value.toString()];
  const transformedArray: Array<keyof typeof shapes | void> = Array(
    4 - rawValuesArray.length
  )
    .fill(undefined)
    .concat(rawValuesArray)
    .map((string) => (string === "0" ? undefined : string));

  return {
    ones: transformedArray[3],
    tens: transformedArray[2],
    hundreds: transformedArray[1],
    thousands: transformedArray[0],
  };
};

const Draw: DrawConstructor = class Draw implements DrawInterface {
  constructor(private ctx: CanvasRenderingContext2D) {}
  line: DrawLine = ({ start, end }) => {
    this.ctx.beginPath();
    this.ctx.moveTo(start.x, start.y);
    this.ctx.lineTo(end.x, end.y);
    this.ctx.stroke();
  };
  lines: DrawLines = (shape) => {
    shape.forEach((line) => this.line(line));
  };
  shape: DrawShapes = (shape, variant) => {
    switch (shape) {
      case "tens": {
        this.ctx.translate(grid.maxWidth, 0);
        this.ctx.scale(-1, 1);
        break;
      }
      case "hundreds": {
        this.ctx.translate(0, grid.maxHeight);
        this.ctx.scale(1, -1);
        break;
      }
      case "thousands": {
        this.ctx.translate(grid.maxWidth, grid.maxHeight);
        this.ctx.scale(-1, -1);
        break;
      }
      case "ones":
      default: {
        this.ctx.translate(0, 0);
        this.ctx.scale(1, 1);
        break;
      }
    }

    this.lines(shapes[variant]);
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
  };
};

export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [{ value }] = useValue();

  useEffect(() => {
    const { current: canvas } = canvasRef;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const draw = new Draw(ctx);
    ctx.clearRect(0, 0, grid.maxWidth, grid.maxHeight);
    draw.line(baseline);

    const transformedValue = transformValue(value);
    for (const [key, value] of Object.entries(transformedValue)) {
      if (value) {
        draw.shape(key as Decimals, value);
      }
    }
  }, [value]);

  const onClick = () => {
    const { current: canvas } = canvasRef;
    if (!canvas) return;

    canvas.toBlob(function (blob) {
      if (blob) {
        saveAs(blob, "runic.png");
      }
    });
  };

  return (
    <canvas
      onClick={onClick}
      width={grid.maxWidth}
      height={grid.maxHeight}
      ref={canvasRef}
    ></canvas>
  );
}
