import express from "express";
import cors from "cors";
import routes from "./src/routes/index";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true,
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", routes);

export default app;