const fs = require("fs")

fs.writeFile("./a.txt","ok",(err,data)=>{
  console.log(err,data);
})