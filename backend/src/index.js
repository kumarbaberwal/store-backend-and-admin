import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";
import { clerkMiddleware } from "@clerk/express";
import { serve } from "inngest/express";
import { inngest, functions } from "./config/inngest.js";
import adminRoutes from "../src/routes/admin.route.js";
import userRoutes from "../src/routes/user.route.js";
import orderRoutes from "../src/routes/order.route.js";
import reviewRoutes from "../src/routes/review.route.js";
import productRoutes from "../src/routes/product.route.js";
import cartRoutes from "../src/routes/cart.route.js";
import cors from "cors"

const app = express();
app.use(express.json());
app.use(clerkMiddleware());
app.use("/api/inngest", serve({ client: inngest, functions }));


app.use(cors({
  origin: ENV.CLIENT_URL,
  credentials: true, // credentials = true allows the browser to send the cookies to the server with the request
}))


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);

app.get("/api/health", (req, res) => {
  res.status(200).json({ message: "Hello Kumar" });
});

const PORT = ENV.PORT;

if (ENV.NODE_ENV === "production") {
  const adminDist = path.join(__dirname, "../../admin/dist");

  app.use(express.static(adminDist));

  app.get("/{*any}", (req, res) => {
    res.sendFile(path.join(adminDist, "index.html"));
  });
}

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};

startServer();