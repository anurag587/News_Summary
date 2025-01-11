import express from "express";
import connectDb from "./config/database.js";
import authRouter from "./routes/auth.js";
import cors from "cors";
const app = express();

import cookieParser from "cookie-parser";
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);

connectDb()
  .then(() => {
    console.log("DataBase Successfully Connected");
    app.listen(3000, () => {
      console.log("Server Started");
    });
  })
  .catch((err) => {
    console.log("Database not connected");
  });
