const { nextTick } = require("process");
const { text } = require("stream/consumers");

const fs = require("fs").promises;

let totalStacks, separator;
fs.readFile("./inputs/day06.txt", "utf8").
  then(data => {
    data.split("\n").forEach(d => {
    if (unique(d.substring(0, 4))) {
      console.log("Answer: 4");
      return;
    }
    for (let i=1; i<d.length; i++) {
      let s = d.substring(i, i + 4);
      if (unique(s)) {
        console.log("Answer:", i + 4); // 1920
        break;
      };
    }
    });
  });

  const unique = s => {
    return new Set(s).size === 4;
  }

