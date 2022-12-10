const fs = require("fs").promises;

let priority = 0;
fs.readFile("./inputs/day03.txt", "utf8").
  then(data => {
    data = data.split("\n");
    data.forEach(d => {
      const half = d.length >> 1;
      const left = d.substring(0,  half);
      const right = d.slice(-half);
      for (let i=0; i<left.length; i++) {
        const c = left[i];
        if (right.indexOf(c) >=0) {
          priority += getPriority(c);
          break;
        }
      }
    });
    console.log(priority); // 14204s
  });

const getPriority = c => {
  const a = "a".charCodeAt(0) - 1;
  const A = "A".charCodeAt(0) - 1 - 26;
  const n = c.charCodeAt(0);
  return c > "Z" ? n - a : n - A;
}