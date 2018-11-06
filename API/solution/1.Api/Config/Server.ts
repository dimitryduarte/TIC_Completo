import express from "express";
import { json, urlencoded } from "body-parser";
import Routes from "./Routes";

var app = express();
app.use(json());
app.use(urlencoded({ extended: true }));

new Routes(app);

app.listen(3001);
console.log("Api - OK !!!");
