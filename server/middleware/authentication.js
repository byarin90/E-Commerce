import Jwt from "jsonwebtoken";
import secret from "../config/secret.js";
import { RefreshTokenModel } from "../models/refreshTokenModel.js";
import { createToken } from "../utils/jwt.js";

// Function to clear both access and refresh tokens
export const clearCookies = (res) => {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
}

// ! Middleware to authenticate users
export const authUser = async(req, res, next) => {
    try {
        // * Get accessToken and refreshToken from cookies
        const accessToken = req.cookies.accessToken;
        const refreshToken = req.cookies.refreshToken;

        // ? No access or refresh token, send Unauthorized response
        if (!accessToken && !refreshToken) {
            return res.status(401).json({ msg: "Unauthorized. Refresh token required.", errorCode: "MW401" });
        }

        try {
            // * Verify accessToken
            const decoded = Jwt.verify(accessToken, secret.JWT_SECRET);

            req.tokenData = decoded;
            // ? If accessToken is valid, continue
            next();
        } catch (error) {
            if (error instanceof Jwt.TokenExpiredError) {
                // TODO: Handle case when accessToken is expired, try to refresh it
                try {
                    // ? Verify refreshToken expired or not exist
                    if (!refreshToken) {
                        return res.json({ msg: "Unauthorized. Refresh token required.", errorCode: "MW401" });
                    }

                    // * Verify refreshToken if not expired
                    const decodedRefreshToken = Jwt.verify(refreshToken, secret.JWT_SECRET);

                    // ? Check if refreshToken in cookie matches database
                    const refreshTokenDB = await RefreshTokenModel.findOne({ user: decodedRefreshToken._id });

                    // ? If refreshToken in cookie does not match database, clear cookies and return error
                    if (!refreshTokenDB || refreshTokenDB.token !== refreshToken) {
                        clearCookies(res);
                        return res.json({ msg: "Unauthorized. Refresh token required.", errorCode: "MW401" });
                    }

                    // ! If refreshToken is valid, create new accessToken and refreshToken
                    await RefreshTokenModel.deleteMany({ user: decodedRefreshToken._id });
                    const newAccessToken = createToken({ _id: decodedRefreshToken._id, role: decodedRefreshToken.role }, secret.ACCESS_TOKEN_TTL);
                    const newRefreshToken = createToken({ _id: decodedRefreshToken._id, role: decodedRefreshToken.role }, secret.REFRESH_TOKEN_TTL);

                    // * Save new refreshToken in database
                    refreshTokenDB.token = newRefreshToken;
                    await refreshTokenDB.save();

                    // ? Send new accessToken and refreshToken to cookies
                    res.cookie('accessToken', newAccessToken, { httpOnly: true, sameSite: "lax" });
                    res.cookie('refreshToken', newRefreshToken, { httpOnly: true, sameSite: "lax" });

                    req.tokenData = decodedRefreshToken;
                    next();

                } catch (error) {
                    // TODO: Handle case when refreshToken is invalid, clear cookies and return error
                    if (error instanceof Jwt.TokenExpiredError) {
                        clearCookies(res);
                        return res.json({ msg: "Unauthorized. Refresh token required.", errorCode: "MW401" });
                    }

                    // ! Log the error and return internal server error response
                    console.error(error);
                    return res.status(500).json({ message: "Internal Server Error", errorCode: "MW500" });
                }
            }
        }
    } catch (error) {
        // ! Log the error and return internal server error response
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error", errorCode: "MW500" });
    }
}

// ! Middleware to authenticate admins
export const authAdmin = async(req, res, next) => {
    await authUser(req, res, async() => {
        try {
            // * Get role from token data
            const { role } = req.tokenData;

            // ? If user is not admin, send Forbidden response
            if (role !== 'admin') {
                return res.status(403).json({ message: 'Forbidden. You are not allowed to access this endpoint.', errorCode: "MW403" });
            }

            // * If user is admin, continue
            next();
        } catch (error) {
            // ! Log the error and return internal server error response
            console.error(error);
            return res.status(500).json({ message: "Internal Server Error", errorCode: "MW500" });
        }
    });
}