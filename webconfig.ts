import { exec } from "child_process";

// Starting WEBs
console.log("Starting WEB...");
exec(`npm start`);

// Starting APIs
console.log("Starting API...");
exec(`ts-node "${__dirname}\\2.API\\1.Api\\Config\\Server.js"`);
