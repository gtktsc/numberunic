export const grid = {
  size: 25,
  middle: 25 * 2,
  max: 25 * 4,
};

const corners = {
  topLeft: { x: grid.middle, y: 0 },
  topRight: { x: grid.max, y: 0 },
  bottomLeft: { x: grid.middle, y: grid.size },
  bottomRight: { x: grid.max, y: grid.size },
};

// could be typed as Point interface but ts uses structural typing so it will be compatible anyway
export const shapes = {
  "1": [
    {
      start: corners.topLeft,
      end: corners.topRight,
    },
  ],
  "2": [
    {
      start: corners.bottomLeft,
      end: corners.bottomRight,
    },
  ],
  "3": [
    {
      start: corners.topLeft,
      end: corners.bottomRight,
    },
  ],
  "4": [
    {
      start: corners.bottomLeft,
      end: corners.topRight,
    },
  ],
  "5": [
    {
      start: corners.bottomLeft,
      end: corners.topRight,
    },
    {
      start: corners.topLeft,
      end: corners.topRight,
    },
  ],
  "6": [
    {
      start: corners.topRight,
      end: corners.bottomRight,
    },
  ],
  "7": [
    {
      start: corners.topLeft,
      end: corners.topRight,
    },
    {
      start: corners.topRight,
      end: corners.bottomRight,
    },
  ],
  "8": [
    {
      start: corners.topRight,
      end: corners.bottomRight,
    },
    {
      start: corners.bottomLeft,
      end: corners.bottomRight,
    },
  ],
  "9": [
    {
      start: corners.topRight,
      end: corners.bottomRight,
    },
    {
      start: corners.bottomLeft,
      end: corners.bottomRight,
    },
    {
      start: corners.topLeft,
      end: corners.topRight,
    },
  ],
};

export const base = {
  start: { x: grid.size * 2, y: grid.max },
  end: corners.topLeft,
};
