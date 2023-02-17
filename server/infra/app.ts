import env from "dotenv";
import express from 'express';
import path from 'path';
env.config();

import { RouterFactory } from "./shared/routes/RouterFactory";


const app = express();

app.set('views', './infra/view');
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/uploads", (req, res, next)=>{
    res.redirect(`${process.env.API_URL}/uploads${req.url}`);
    next();
})
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', RouterFactory.QueryRouter().getRouterInstance());
app.use('/api', RouterFactory.CommandRouter().getRouterInstance());

export default app;
