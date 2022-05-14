import { Router } from "express";

import { choosePayment } from "../controllers/paymentController.js";



const paymentRoute = Router();

paymentRoute.put("/payment", choosePayment)

export default paymentRoute