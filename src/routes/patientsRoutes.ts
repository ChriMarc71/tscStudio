import * as express from "express";
import { roleVerifier } from "../middlewares/roleVerifier";
import getPatients from "../controllers/patients/getPatientController";
import updatePatients from "../controllers/patients/updatePatientController";

const patientRouter = express.Router();
patientRouter.use(roleVerifier);
patientRouter.route("/")
    .get(getPatients)
    .put(updatePatients);

export default patientRouter;