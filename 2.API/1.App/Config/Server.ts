import express from "express";
import cors from "cors";
import { json, urlencoded } from "body-parser";
import Routes from "./Routes";

var app = express();
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors());

new Routes(app);

app.listen(3001);
console.log("Api - OK !!!");
