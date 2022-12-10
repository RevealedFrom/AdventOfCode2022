const fs = require("fs").promises;

let totalStacks, separator;
fs.readFile("./inputs/day06.txt", "utf8").
  then(data => {
    data.split("\n").forEach(d => {
    if (unique(d.substring(0, 14))) {
      console.log("Answer: 14");
      return;
    }
    for (let i=1; i<d.length; i++) {
      let s = d.substring(i, i + 14);
      if (unique(s)) {
        console.log("Answer:", i + 14); // 2334
        break;
      };
    }
    });
  });

  const unique = s => {
    return new Set(s).size === 14;
  }

