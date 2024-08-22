import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

import mainRouter from "./routes/index";
app.use("/api/v1", mainRouter);

app.listen(3002, () => console.log(`Express server started at ${3002}`));
