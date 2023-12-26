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
    "Sohoj sorol assignment korte deri holo bari te ammu ar choto vi osustho silo but alhumdulillah sob tai korte parsi ..but somoy lagse commit sob somoy kori nai requirement fill up hoise kina seta jni na asa korbo consider korben."
  );
});

export default app;
