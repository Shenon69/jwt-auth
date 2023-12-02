import Express from "express";
import User from "../schemas/user";

export const validateAccessToken = async (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    //check if cookie exists
    const cookie = req.cookies

    if(!cookie.AUTH_COOKIE) {
        return res.status(401).json({message: "Unauthorized"})
    }

    const userExistsWithAccessToken = await User.findOne({"authentication.accessToken": cookie.AUTH_COOKIE}); 

    if(!userExistsWithAccessToken) {
        return res.status(401).json({message: "Unauthorized"})
    }

    next()
}