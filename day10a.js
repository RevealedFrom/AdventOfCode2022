const fs = require("fs").promises;

fs.readFile("./inputs/day10.txt", "utf8").
  then(data => {
    data = data.split("\n")

    let X =1, cycle = 0;
    for (let i = 0; i < data.length; i++) {
      const c = data[i];
      if (c.startsWith("noop")) {
        cycle++;
        hit(cycle, X, i, c);
        if (cycle === 220) {
          console.log("NOP", i, c, X);
          break;
        };
      } else {
        let v = Number(c.split(" ")[1]);
        cycle++;
        hit(cycle, X, i, c);
        if (cycle===220) { 
          console.log("First half", i, c, X);
          break; 
        };
        cycle++;
        hit(cycle, X, i, c, true);
        X += v;
        if (cycle===220) { 
          console.log("Second half", i, c, X);
          break; 
        };
      }
    };
    console.log("Answer:", answer); // 13820

  });

let answer = 0;
let next = 0;
const hit = (cycle, x, line, cmd, b) => {
  const marks = [ 20, 60, 100, 140, 180, 220];
  if (cycle === marks[next]) {
    next++;
    console.log("Cycle", cycle, 'x', x, "at line", line, cmd, "product", cycle*x, b? "B" : "");
    answer += cycle * x;
  }
}