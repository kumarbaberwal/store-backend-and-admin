import express, { type Request, type Response } from "express"
import path from "path"
import { ENV } from "./config/env";


const app = express();


const __dirname = path.resolve();


app.get("/", (req: Request, res: Response) => {
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


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
})