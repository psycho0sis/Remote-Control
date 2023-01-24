import fs from 'fs';
import { WebSocketServer } from 'ws';

import {
  mouse,
  left,
  right,
  up,
  down,
  screen,
  Region,
  FileType,
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

        case 'prnt_scrn':
          const x = position.x - 100;
          const y = position.y - 100;
          const region = new Region(x, y, 200, 200);
          const pathToImg = await screen.captureRegion(
            'image',
            region,
            FileType.PNG,
          );

          fs.readFile(pathToImg, (err, data) => {
            if (err) {
              throw err;
            }
            const base64ImageStr = Buffer.from(data).toString('base64');

            ws.send(`prnt_scrn ${base64ImageStr}`);
          });

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
