import jwt from 'jsonwebtoken';
import { config } from '../config/config.js';
import { OAuth2Client } from 'google-auth-library';
const client = new OAuth2Client(config.googleClientId);

export const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided' });
    }

    try {
        const decoded = jwt.verify(token, config.jwtSecret);
        req.user = decoded;
        console.log("JWT verification successful");
        return next();
    } catch (jwtError) {
        console.log("JWT verification failed, trying Google verification");
    }

    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: config.googleClientId,  
        });
        const payload = ticket.getPayload();
        req.user = { id: payload.sub, email: payload.email };  
        console.log("Google verification successful");
        return next();
    } catch (googleError) {
        console.log("Google token verification failed:", googleError);
        return res.status(401).json({ message: 'Invalid token' });
    }
};


export const optionalAuthMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        req.user = undefined;
        return next();
    }

    try {
        const decoded = jwt.verify(token, config.jwtSecret);
        req.user = decoded;
        console.log("JWT verification successful");
        return next();
    } catch (jwtError) {
        console.log("JWT verification failed, trying Google verification");
    }

    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: config.googleClientId,
        });
        const payload = ticket.getPayload();
        req.user = { id: payload.sub, email: payload.email };
        console.log("Google verification successful");
        return next();
    } catch (googleError) {
        console.log("Google token verification failed:");
        return res.status(401).json({ message: 'Invalid token' });
    }
};

