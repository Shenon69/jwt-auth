import { Router } from "express";
import { getAllUsers, loginUser, logoutUser, registerUser } from "../controllers/auth";
import { validateAccessToken } from "../middlewares/validateAccessToken";

const authRouter = Router();

authRouter.post("/signup", registerUser);
authRouter.post("/login", loginUser);
authRouter.post("/logout", logoutUser);
authRouter.get("/get-all-users", validateAccessToken, getAllUsers);

export default authRouter;