import { httpServer } from "../http_server/index.js";

export const finishServerWork = async () => {
    console.log("\nServer stopped")
    httpServer.close();
    process.exit();
  };