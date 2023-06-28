import * as express from "express";
import login from "../controllers/auth/authLoginController";
import register from "../controllers/auth/authRegisterController";
import resetPassword from "../controllers/auth/authResetPasswordController";
import forgottenPassword from "../controllers/auth/authForgottenPasswordController";

const gestorRouter = express.Router();

gestorRouter.get("/login", login);
gestorRouter.post("/register", register);
gestorRouter.put("/forgottenPassword", forgottenPassword);
gestorRouter.put("/resetPassword", resetPassword);

export default gestorRouter;