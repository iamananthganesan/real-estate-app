import Jwt from "jsonwebtoken";


export const verifyToken = (request, response, next) => {
    const token = request.cookies.token;

    if (!token) return response.status(401).json({ message: "Not authenticated" });

    Jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
        if (err) return response.status(403).json({ message: "Token is invalid!!!" });
        request.userId = payload.id;
        next();
    });
}