import { useState } from "react";

import { useEffect, useRef } from "react";
import { saveAs } from "file-saver";

import useValue from "controllers/current-value-controller";
import ErrorMessage from "ui/common/error";

import styles from "./canvas.module.css";
import { grid, base } from "./constants";
import { Decimals } from "./types";
import messages from "./messages";
import { transformValue, Drawable } from "./utils";

const Canvas = () => {
  const [{ value }] = useValue();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const { current: canvas } = canvasRef;
    if (!canvas) {
      setErrorMessage(messages.error);
      return;
    }
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      setErrorMessage(messages.error);
      return;
    }
    setErrorMessage(null);

    const draw = new Drawable(ctx);
    ctx.clearRect(0, 0, grid.max, grid.max);
    draw.line(base);

    const transformedValue = transformValue(value);
    for (const [key, value] of Object.entries(transformedValue)) {
      if (value) {
        draw.shape(key as Decimals, value);
      }
    }
  }, [value]);

  const onClick = () => {
    const { current: canvas } = canvasRef;
    if (!canvas) {
      setErrorMessage(messages.error);
      return;
    }
    setErrorMessage(null);

    canvas.toBlob(function (blob) {
      if (blob) {
        saveAs(blob, "runic.png");
      }
    });
  };

  return (
    <div className={styles.wrapper}>
      <canvas
        onClick={onClick}
        width={grid.max}
        height={grid.max}
        ref={canvasRef}
      ></canvas>
      <ErrorMessage message={errorMessage} />
    </div>
  );
};

export default Canvas;
