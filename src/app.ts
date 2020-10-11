import express, { Request, Response } from "express";
import path from "path";

// import cors from "cors";
const app = express();

// app.use(cors());



app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

export default app;
