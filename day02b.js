const fs = require("fs").promises;

const Scores = {
  "AX": 3, "AY": 4, "AZ": 8,
  "BX": 1, "BY": 5, "BZ": 9,
  "CX": 2, "CY": 6, "CZ": 7,
};
let score = 0;
fs.readFile("./inputs/day02.txt", "utf8").
  then(data => {
    data = data.split("\n");
    data.forEach(d => {
      d = d.replace(" ", "");
      score += Scores[d];
    });
    console.log(score); // 14204s
  });
