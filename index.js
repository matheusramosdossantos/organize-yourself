import express from "express";
import tasksRoutes from "./backend/src/routes/tasksRoute.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/", [tasksRoutes]);

app.listen(4000);
