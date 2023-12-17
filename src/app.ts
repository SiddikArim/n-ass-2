import express, { Application, Request, Response } from "express";
import cors from "cors";
import { StudentRoutes } from "./app/modules/user/user.route";
const port = 3000;
const app: Application = express();

// parsers
app.use(express.json()); // for parsing application/json
app.use(cors());

// application routes
app.use("/POST/api/users", StudentRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

export default app;
