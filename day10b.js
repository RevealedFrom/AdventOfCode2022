const { cp } = require("fs");

const fs = require("fs").promises;

fs.readFile("./inputs/day10.txt", "utf8").
  then(data => {
    data = data.split("\n")

    let X =1, cycle = 0;
    for (let i = 0; i < data.length; i++) {
      const c = data[i];
      if (c.startsWith("noop")) {
        cycle++;
        draw(cycle, X, i, c);
      } else {
        let v = Number(c.split(" ")[1]);
        cycle++;
        draw(cycle, X, i, c);
        cycle++;
        draw(cycle, X, i, c, true);
        X += v;
      }
    };
    pixels.forEach(row =>  console.log(row.join(""))) // GKGRKGRK
  });

  let pixels = [...Array(6)].map(() => Array(40).fill(" "));

  const draw = (cycle, x, line, cmd, b) => {
    cycle--;
    const col = cycle % 40;
    if (col > x-2 && col < x+2) {
      const row = Math.floor(cycle / 40);
      pixels[row][col] = "#";
    }
}