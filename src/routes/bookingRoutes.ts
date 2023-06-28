import express, { Router } from "express";
import getBooking from "../controllers/bookings/getBookingsController";
import createBooking from "../controllers/bookings/createBookingController";
import { roleVerifier } from "../middlewares/roleVerifier";

const bookingRouter: Router = express.Router();
bookingRouter.use(roleVerifier);
bookingRouter.route("/")
    .get(getBooking)
    .post(createBooking);

export default bookingRouter;