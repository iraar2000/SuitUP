import { verifyAccessToken } from "../utils/jwt.js";

// the authentication middleware
export default async function Authentication(req, res, next) {
    try {
        const auth = req.headers.authorization;
        if (!auth || !auth.startsWith("Bearer ")) return res.status(401).json({ message: "Missing access token." });

        const token = auth.split(" ")[1];
        req.user = verifyAccessToken(token);
        next();
    } catch {
        return res.status(401).json({ message: "Invalid or expired access token." });
    }
}