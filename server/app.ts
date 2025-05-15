import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import todoRoutes from "./routes/todoRoutes";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("", authRoutes);
app.use("/api/todos", todoRoutes);

export default app;
