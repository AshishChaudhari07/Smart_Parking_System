import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    let token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ message: "Access denied. Token required." });
    }

    try {
        // If token starts with "Bearer ", remove it
        if (token.startsWith("Bearer ")) {
            token = token.split(" ")[1];
        }

        const decoded = jwt.verify(token, "my_secret_key"); // Verify token
        req.user = decoded; // Attach user to request
        next();
    } catch (error) {
        console.error("JWT Verification Error:", error.message);
        return res.status(400).json({ message: "Invalid token." });
    }
};

export default authMiddleware;
