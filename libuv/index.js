const crypto = require("node:crypto");

let start = Date.now()

crypto.pbkdf2("password", "salt", 4000, 512, "shab512", ()=>{
    console.log(Date.now() - start);
});