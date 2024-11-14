import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import dbConnection from "../Server/Database/dbconnection.js";
import userRoutes from "./Routes/user.route.js";
import otpRoutes from "./Routes/otp.route.js";
import categoryRoutes from "./Routes/category.route.js";
import woLoginRoutes from "./Routes/woLogin.route.js";
import transactionRoutes from "./Routes/transaction.route.js";
import { errorMiddleware } from "./Middlewares/error.js";
import path from "path";
import { fileURLToPath } from 'url';

const app = express();
dotenv.config();

app.use(cors({
    origin: [process.env.FRONTEND_URL],
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    credentials: true
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/',woLoginRoutes);
app.use("/otp", otpRoutes);
app.use("/user", userRoutes);
app.use("/category", categoryRoutes);
app.use("/transaction", transactionRoutes);

dbConnection();
app.use(errorMiddleware);

export default app;
