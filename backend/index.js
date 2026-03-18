import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mainRouter from "./routes/main.routes.js";
import bodyparser from "body-parser";

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true
  })
);

app.use("/api/v1", mainRouter);
app.listen(PORT);
console.log("Server is running on port " + PORT);
