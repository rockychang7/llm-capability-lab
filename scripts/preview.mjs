import { localServer } from "./browser-tools.mjs";
const server = await localServer();
console.log(`Preview: ${server.url}/`);
process.on("SIGINT", async () => { await server.close(); process.exit(0); });
