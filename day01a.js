const fs = require("fs").promises;

const calories = [];
let max = 0;
fs.readFile("./inputs/day01.txt", "utf8").
  then(data => {
    data = data.split("\n");
    let thisElf = 0;
    data.forEach(c => {
      if (c === "") {
        if (thisElf>max) max = thisElf;
        thisElf = 0;
      } else {
        thisElf += Number(c);
      }
    });
    console.log(max); // 72718  
  })