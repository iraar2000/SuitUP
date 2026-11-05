import fs from "fs";
import path from "path";

// monitor the request url to the server and prints them in terminal and make log file
const LOG_DIR = path.join(process.cwd(), "logs");
const LOG_FILE = path.join(LOG_DIR, "requests.log");

export async function monitorEndpointRequest(req, res, next) {
    try {
        // Create logs directory if it doesn't exist
        if (!fs.existsSync(LOG_DIR)) {
            fs.mkdirSync(LOG_DIR, { recursive: true });
        }

        const timestamp = new Date().toISOString();
        const ip =
            req.headers["x-forwarded-for"] ||
            req.socket.remoteAddress ||
            "unknown";

        const log = `[${timestamp}] ${req.method} ${req.originalUrl} | IP: ${ip}\n`;

        // Print to terminal
        console.log(log.trim());

        // Append to log file
        fs.appendFile(LOG_FILE, log, (err) => {
            if (err) {
                console.error("Failed to write request log:", err);
            }
        });
    } catch (err) {
        console.error("Request monitor error:", err);
    }

    next();
}