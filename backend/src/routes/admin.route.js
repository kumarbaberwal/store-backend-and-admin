import { Router } from "express";
import { adminOnly, protectRoute } from "../middleware/auth.middleware.js";
import { createProduct, getAllCustomers, getAllOrders, getAllProducts, getDashboardStats, updateOrderStatus, updateProduct } from "../controllers/admin.controller.js";
import { upload } from "../middleware/multer.middleware.js";

const router = Router();

// optimization - DRY (Do not Repeat Yourself)
router.use(protectRoute, adminOnly)

router.get("/products", getAllProducts);
router.post("/products", upload.array("images", 3), createProduct);
router.put("/products:id", upload.array("images", 3), updateProduct);

router.get("/orders", getAllOrders);
router.patch("/orders/:orderId/status", updateOrderStatus);


router.get("/customers", getAllCustomers);

router.get("/stats", getDashboardStats);

// put: used for full resource replacement, updating the entire resource
// patch: used for particial resource update, updating a specific part of the resource

export default router;