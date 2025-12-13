import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";
import { clerkMiddleware } from "@clerk/express";
import { serve } from "inngest/express";
import { inngest, functions } from "./config/inngest.js";

const app = express();
app.use(express.json());
app.use(clerkMiddleware());
app.use("/api/inngest", serve({ client: inngest, functions }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

export default app;