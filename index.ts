import express, { Express } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import adminRouter from "./src/routes/adminRoutes";
import gestorRouter from "./src/routes/authRoutes";
import bookingRouter from "./src/routes/bookingRoutes";
import patientRouter from "./src/routes/patientsRoutes";
import logger from './logs/logger';
import errorLogger from './logs/errorLogger';
dotenv.config();
const app: Express = express();
const port = process.env.PORT;

app.use(logger);
app.use(errorLogger);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/admin", adminRouter);
app.use("/auth", gestorRouter);
app.use("/bookings", bookingRouter);
app.use("/patients", patientRouter);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});