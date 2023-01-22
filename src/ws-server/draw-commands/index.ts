import {
  mouse,
  left,
  right,
  up,
  down,
  getActiveWindow,
  centerOf,
  randomPointIn,
  sleep,
  Point,
  straightTo,
  Region,
} from '@nut-tree/nut-js';

export const drawCommands = {
  draw_circle: async (position: Point, pixels: number) => {
    for (let i = 0; i <= Math.PI * 2 + 0.1; i += 0.03) {
      const x = position.x + pixels * Math.cos(i);
      const y = position.y + pixels * Math.sin(i);
      const point1 = new Point(x, y);
      const point2 = new Point(x, y);

      await mouse.drag([point1, point2]);
    }
  },
};
