import express from 'express';
import path from 'path';

import indexRouter from "./routes/index";
import apiRouter from "./routes/api";

const app = express();

app.set('views', './view')
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', apiRouter);

export default app;
