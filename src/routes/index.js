import { Router } from "express";
import AuthRouter from "./api/auth.router.js";
import CustomerRouter from "./api/customer.router.js";
import ProductRouter from "./api/product.router.js";
import QuoteRouter from "./api/quote.router.js";




const router = Router()
const auth_router = new AuthRouter()
const customer_router = new CustomerRouter()
const product_router = new ProductRouter()
const quote_router = new QuoteRouter()


router.use("/api/auth", auth_router.getRouter())
router.use("/api/customer", customer_router.getRouter())
router.use("/api/product", product_router.getRouter())
router.use("/api/quote", quote_router.getRouter())

export default router