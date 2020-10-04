import express from "express";
import config from "./utils/Config";

import apiRoutes from "./routes/api";
const app = express();
const port = config.getAsNumber("PORT", 3001);
const hostname = config.get("HOSTNAME", "localhost");

// Serve static files
app.use(express.static("public"));

// Load routes
app.use(apiRoutes);

// Start app
app.listen(port, () => {
    console.log(`NATS Sniffer listening at http://${hostname}:${port}`);
});
