import { Router } from "express";
import { validateToken } from "../middlewares/validateAuthMiddleware.js";
import { addProduct } from "../controllers/productController.js";
import { getProducts } from "../controllers/productController.js";

const productsRoute = Router();

productsRoute.use(validateToken)

productsRoute.post("/products", addProduct)

productsRoute.get("/products", getProducts)

export default productsRoute
