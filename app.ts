import express, { json } from 'express';
import bodyParser from 'body-parser';
import cors from "cors";
import userRoutes from './routes/user.routes';
import authRoutes from "./routes/auth.routes";
import policyRoutes from "./routes/policy.routes";
import authMiddleware from './middleware/auth.middleware';
import errorResponseMiddleware from './middleware/errorResponse.middleware';

const app = express();

app.use(cors());

app.use(json());

app.use(bodyParser.json());

app.use('/users',authMiddleware, userRoutes);
app.use("/auth", authRoutes);
app.use("/",policyRoutes);//policies path is included in policyroute

app.use(errorResponseMiddleware);

export default app;