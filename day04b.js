const fs = require("fs").promises;

let subsumed = 0;
fs.readFile("./inputs/day04.txt", "utf8").
  then(data => {
    data = data.split("\n");
    data.forEach(d => {
      const [first, second] = d.split(",");
      let [F1, F2] = first.split("-");
      let [S1, S2] = second.split("-");
      F1 = Number(F1); F2 = Number(F2);
      S1 = Number(S1); S2 = Number(S2);
      if (!(F2 < S1 || S2 < F1)) subsumed++;
    })
    console.log(subsumed);  // 536
  });
