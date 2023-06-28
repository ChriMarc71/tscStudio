import * as express from "express";
import { roleVerifier } from "../middlewares/roleVerifier";
import getDoctors from "../controllers/admin/adminGetDoctorsController";
import updateDoctors from "../controllers/admin/adminUpdateDoctorController";
import postNewDoctor from "../controllers/admin/adminPostNewDoctorController";

const adminRouter: express.Router = express.Router();
adminRouter.use(roleVerifier);
adminRouter.route("/")
    .get(getDoctors)
    .put(updateDoctors)
    .post(postNewDoctor);

export default adminRouter;