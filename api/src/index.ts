import app from "./app.js";
import { config } from "./config";
import { logger } from "./utils/logger.js";

const PORT = config.port

app.listen(PORT, () => {
  logger.info({message:`✅ Server running at http://localhost:${PORT}/api/v1`});
});
