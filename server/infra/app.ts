import env from "dotenv";
import express from 'express';
import path from 'path';
env.config();
import { RouterFactory } from "./shared/routes/RouterFactory";
import * as cors from "cors";

const commandRouter = RouterFactory.CommandRouter().getRouterInstance();
const queryRouter = RouterFactory.QueryRouter().getRouterInstance();

const corsMiddleware = cors.default({
    origin: ["http://localhost:4200"]
})
const app = express();
app.set('views', './infra/view');
app.set("view engine", "ejs");
app.use(corsMiddleware)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/uploads", (req, res, next)=>{
    res.redirect(`${process.env.API_URL}/uploads${req.url}`);
    next();
})
app.use(express.static(path.join(__dirname, 'public')));

app.use('', queryRouter);
app.use('/api', commandRouter);

export default app;
