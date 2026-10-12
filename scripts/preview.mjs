import { localServer } from "./browser-tools.mjs";
const server = await localServer({ port: Number(process.env.PORT ?? 0) });
console.log(`Preview: ${server.url}/`);
process.on("SIGINT", async () => { await server.close(); process.exit(0); });
