import { finishServerWork } from './utils/finish-server-work.js';
import { httpServer } from './http_server/index.js';
import { startWS } from './ws-server/index.js';

const HTTP_PORT = 8181;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

startWS();

process.on('SIGINT', async () => {
    finishServerWork();
  });
  
  process.on('SIGTSTP', async () => {
    finishServerWork();
  });
  