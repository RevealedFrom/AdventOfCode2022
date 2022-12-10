const { execFile } = require("child_process");

const fs = require("fs").promises;

const calories = [];
const Scores = {
  "AX": 4, "AY": 8, "AZ": 3,
  "BX": 1, "BY": 5, "BZ": 9,
  "CX": 7, "CY": 2, "CZ": 6,
};
let score = 0;
fs.readFile("./inputs/day02.txt", "utf8").
  then(data => {
    data = data.split("\n");
    data.forEach(d => {
      d = d.replace(" ", "");
      score += Scores[d];
    });
    console.log(score); // 13526
  });
