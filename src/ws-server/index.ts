import { WebSocketServer } from 'ws';
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
import { drawCommands } from './draw-commands/index.js';

const PORT = 8080;

export const startWS = (): void => {
  const wsServer: WebSocketServer = new WebSocketServer({
    port: PORT,
  });

  wsServer.on('connection', ws => {
    ws.on('open', function open() {
      ws.send('WS server opened');
    });

    ws.on('message', async (message: string) => {
      const command: string[] = message.toString().split(' ');
      console.log(command);
      const pixels = Number(command[1]);
      const position = await mouse.getPosition();

      switch (command[0]) {
        case 'draw_circle':
          await drawCommands.draw_circle(position, pixels);

          ws.send(command[0]);
          break;

        case 'mouse_position':
          ws.send(`mouse_position ${position.x},${position.y}`);
          break;

        case 'mouse_right':
          await mouse.move(right(pixels));
          ws.send(command[0]);
          break;

        case 'mouse_left':
          await mouse.move(left(pixels));
          ws.send(command[0]);
          break;

        case 'mouse_up':
          await mouse.move(up(pixels));
          ws.send(command[0]);
          break;

        case 'mouse_down':
          await mouse.move(down(pixels));
          ws.send(command[0]);
          break;

        default:
          break;
      }
    });

    ws.on('close', (message: string) => {
      console.log(`WS server closed`);
    });
  });
};
