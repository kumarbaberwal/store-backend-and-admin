import express, { type Request, type Response } from "express"
import path from "path"
import { ENV } from "./config/env";
import { connectDB } from "./config/db";
import { clerkMiddleware } from '@clerk/express'
import { serve } from "inngest/express";
import { inngest, functions } from "./config/inngest"


const app = express();
app.use(express.json());
app.use(clerkMiddleware());
app.use("/api/inngest", serve({ client: inngest, functions }));


const __dirname = path.resolve();


app.get("/api/health", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Hello Kumar",
  })
})

const PORT = ENV.PORT;


if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../admin/dist")));

  app.get("/{*any}", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../admin", "dist", "index.html"));
  })
}


const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  })
}

startServer();


export default app;