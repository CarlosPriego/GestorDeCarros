import { config } from "dotenv";
config();

import { initServer, main } from "./configs/server.js";
initServer();
main();