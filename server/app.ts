import env from "dotenv";
import express from 'express';
import path from 'path';
env.config();
import indexRouter from "./routes/index";
import apiRouter from "./routes/api";


const app = express();

app.set('views', './view')
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/uploads", (req, res, next)=>{
    res.redirect(`${process.env.API_URL}/uploads${req.url}`);
    next();
})
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', apiRouter);

export default app;
