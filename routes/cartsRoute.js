import { Router } from "express";

import {validateToken} from "../middlewares/validateAuthMiddleware.js";
import { addToCart, updateQuantity, removeFromCart, getCart } from "../controllers/cartsControllers.js";

const cartsRouter = Router();

cartsRouter.use(validateToken);

cartsRouter.post("/carts", addToCart);
cartsRouter.put("/carts", updateQuantity);
cartsRouter.delete("/carts/:name", removeFromCart);
cartsRouter.get("/carts", getCart);

export default cartsRouter;