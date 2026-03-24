import express from "express";
import session from "express-session";
import cors from "cors";
import connectDB from "./config/database.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

connectDB();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:4200",
    credentials: true,
  })
);

app.use(
  session({
    secret: "secretKey",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60,
    },
  })
);

app.use("/api", authRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});