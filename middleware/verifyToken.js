const jwt = require('jwt');
const Logger = require('../utils/Logger');

const maxAge = '70h' 

const verifyToken = async (req, res, next) => {
    Logger.debug("VerifyToken middleware is being called");
    
    // Extract the token from cookies or headers
    console.log(req.headers);

    const tokenFromCookies = req.cookies?.token;
    const tokenFromHeaders = req.headers['authorization'];
    
    let token = tokenFromCookies || tokenFromHeaders;

    console.log("Token from cookies:", tokenFromCookies);
    console.log("Token from headers:", tokenFromHeaders);

    if (!token) {
        console.log("Token is null");
        return next(new ApiError(401, "Token is required"));
    }

    // Check if token starts with "Bearer " and remove the prefix
    if (token.startsWith("Bearer ")) {
        token = token.slice(7);
    }

    console.log("Extracted Token:", token);

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET, { maxAge : maxAge });

        Logger.debug("Token verified");
        Logger.debug(decoded);

        const user = await prisma.user.findUnique({
            where: { email: decoded.email }
        });

        if (!user) {
            Logger.error("User not found");
            return next(new ApiError(404, "User not found"));
        }

        req.user = user;
        console.log("Token verified successfully");
        next();

    } catch (err) {
        console.log("Error during token verification:", err);
        if (err.name === 'TokenExpiredError') {
            console.log("Token has expired");
            return next(new ApiError(403, "Unauthorized: Token has expired", err));
        } else if (err.name === 'JsonWebTokenError') {
            console.log("Invalid token");
            return next(new ApiError(401, "Forbidden: Invalid token", err));
        } else {
            console.log("Unexpected error");
            return next(new ApiError(500, "Internal Server Error", err));
        }
    }
};

module.exports = { verifyToken };
