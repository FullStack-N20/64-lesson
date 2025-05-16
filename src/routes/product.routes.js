import { Router } from "express";
import { ProductController } from "../controllers/products.controller.js";

const router = Router();
const controller = new ProductController();

router
    .post('/', controller.createProduct)
    .get('/', controller.getAllProduct)
    .get('/:id', controller.getProductById)
    .put('/:id', controller.updateProduct)
    .delete('/:id', controller.deleteProduct)

export default router;
