/* -------------------------------- packages -------------------------------- */
import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
/* ------------------------------- middlewares ------------------------------ */
const app = express();
app.use(morgan("dev"));
app.use(express.json());
/* --------------------------------- routes --------------------------------- */
import authRoutes from "./routes/authRoutes";
app.use("/auth", authRoutes);
/* ---------------------------------database and server --------------------------------- */
app.use("/", (req: any, res: any) => {
  res.json({ message: "hello world! " });
});
mongoose
  .connect("mongodb://127.0.0.1:27017/db")
  .then((res: any) => {
    app.listen(3000, () => {
      console.log("server:3000");
    });
  })
  .catch((err: any) => {
    console.log(err);
  });
