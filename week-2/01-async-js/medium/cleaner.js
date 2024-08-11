const fs = require('fs');
fs.readFile("./a.txt", "utf-8", (err,data)=>{
  if(err){
    console.log(err);
    return
  }
let c = 0
let newdata = ""
for(let i = 0; i<data.length;i++){
  if (data[i] === " " && c === 0) {
    c = 1
    newdata+=data[i]
  }else if (data[i] !== " " && c === 1){
    newdata+=data[i]
    c = 0
  }else if(data[i] !== " " && c === 0){
    newdata+=data[i]
  }
}
fs.writeFile("./a.txt",newdata,(err,data)=>{
  console.log(err,data);
})          
})
