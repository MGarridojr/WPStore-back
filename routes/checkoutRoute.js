import { Router } from "express";

import {validateToken} from "../middlewares/validateAuthMiddleware.js";
import confirmPayment from "../controllers/checkoutController.js";

const checkoutRouter = Router();

checkoutRouter.use(validateToken);

checkoutRouter.post("/checkout", confirmPayment);

export default checkoutRouter;