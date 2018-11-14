import express from "express";
import cors from "cors";
import { json, urlencoded } from "body-parser";
import Routes from "./Routes";

var app = express();
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cors());

// app.use(function (req, res, next)
// {
// 	res.setHeader("Access-Control-Allow-Origin", "*");
// 	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
// 	res.setHeader("Acess-Control-Allow-Headers", "Content-type");        
// 	res.setHeader("Access-Control-Allow-Credentials", 'true');

// 	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
	
// 	next();
// });

new Routes(app);

app.listen(3001);
console.log("Api - OK !!!");
