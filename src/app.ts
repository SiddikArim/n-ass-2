import express, { Application, Request, Response } from "express";
import cors from "cors";
import { userRoutes } from "./app/modules/user/user.route";
const port = 3000;
const app: Application = express();

// parsers
app.use(express.json()); // for parsing application/json
app.use(cors());

// application routes
app.use("/api/users", userRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send(
    "Sohoj sorol assignment korte deri holo bari te ammu ar choto vi osustho silo"
  );
});

export default app;
