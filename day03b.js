const fs = require("fs").promises;

let priority = 0;
fs.readFile("./inputs/day03.txt", "utf8").
  then(data => {
    data = data.split("\n");
    for (let i = 0; i < data.length; i += 3) {
      const first = data[i];
      const second = data[i + 1];
      const third = data[i + 2];
      for (let j = 0; j < first.length; j++) {
        const c = first[j];
        if (second.indexOf(c)>=0 && third.indexOf(c)>=0) {
          priority += getPriority(c);
          break;
        };
      };
    };
    console.log(priority);  // 2668
  });

const getPriority = c => {
  const a = "a".charCodeAt(0) - 1;
  const A = "A".charCodeAt(0) - 1 - 26;
  const n = c.charCodeAt(0);
  return c > "Z" ? n - a : n - A;
}