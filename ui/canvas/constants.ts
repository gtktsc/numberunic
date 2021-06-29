const GRID_SIZE = 25;

export const grid = {
  center: { x: GRID_SIZE * 2, y: GRID_SIZE * 2 },
  maxWidth: GRID_SIZE * 4,
  maxHeight: GRID_SIZE * 4,
};

const shapePoints = {
  topLeft: { x: grid.center.x, y: 0 },
  topRight: { x: grid.maxWidth, y: 0 },
  bottomLeft: { x: grid.center.y, y: GRID_SIZE },
  bottomRight: { x: grid.maxWidth, y: GRID_SIZE },
};

export const baseline = {
  start: { x: GRID_SIZE * 2, y: grid.maxWidth },
  end: shapePoints.topLeft,
};

export const shapes = {
  "1": [
    {
      start: shapePoints.topLeft,
      end: shapePoints.topRight,
    },
  ],
  "2": [
    {
      start: shapePoints.bottomLeft,
      end: shapePoints.bottomRight,
    },
  ],
  "3": [
    {
      start: shapePoints.topLeft,
      end: shapePoints.bottomRight,
    },
  ],
  "4": [
    {
      start: shapePoints.bottomLeft,
      end: shapePoints.topRight,
    },
  ],
  "5": [
    {
      start: shapePoints.bottomLeft,
      end: shapePoints.topRight,
    },
    {
      start: shapePoints.topLeft,
      end: shapePoints.topRight,
    },
  ],
  "6": [
    {
      start: shapePoints.topRight,
      end: shapePoints.bottomRight,
    },
  ],
  "7": [
    {
      start: shapePoints.topLeft,
      end: shapePoints.topRight,
    },
    {
      start: shapePoints.topRight,
      end: shapePoints.bottomRight,
    },
  ],
  "8": [
    {
      start: shapePoints.topRight,
      end: shapePoints.bottomRight,
    },
    {
      start: shapePoints.bottomLeft,
      end: shapePoints.bottomRight,
    },
  ],
  "9": [
    {
      start: shapePoints.topRight,
      end: shapePoints.bottomRight,
    },
    {
      start: shapePoints.bottomLeft,
      end: shapePoints.bottomRight,
    },
    {
      start: shapePoints.topLeft,
      end: shapePoints.topRight,
    },
  ],
};
