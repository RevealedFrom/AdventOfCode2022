const fs = require("fs").promises;

let maxX = 0, minX = Number.MAX_SAFE_INTEGER; let maxY = 0, minY = Number.MAX_SAFE_INTEGER;
let MAP = [];
let overflow = false;

fs.readFile("./inputs/day14.txt", "utf8").
  then(data => {
    data = data.split("\n")

    // Verifying that only vertical or horizontal lines, and getting boundaries
    data.forEach((row, i) => {
      let prevX, prevY;
      row.split(" -> ").forEach(coord => {
        let currentX, currentY;
        [currentX, currentY] = coord.split(",");
        const x = Number(currentX); const y = Number(currentY);
        if (x > maxX) maxX = x; if (minX > x) minX = x;
        if (y > maxY) maxY = y; if (minY > y) minY = y;
        if (prevX) {
          if (![prevX, prevY].includes(x) && ![prevX, prevY].includes(y)) console.error("!!!!!!! Row", i, currentX, currentY, prevX, prevY);
        }
        prevX = x; prevY = y;
      });
    });
    console.log(minX, maxX, minY, maxY);

    MAP = [...Array(maxY + 2)].map(() => Array(maxX-minX+3).fill("."));

    data.forEach((row, i) => {
      let prevX, prevY;
      row.split(" -> ").forEach(coord => {
        let x,y;
        [x, y] = coord.split(",");
        x = X(Number(x)); y = Number(y);
        if (prevX) {
          const fromX = Math.min(x, prevX); const fromY = Math.min(y, prevY);
          const toX = Math.max(x, prevX); const toY = Math.max(y, prevY);
          for (let i=fromX; i<=toX; i++)
            for (let j=fromY; j<=toY; j++) {
              MAP[j][i] = "#";
            }
        };
        prevX = x, prevY = y;
      });
    });
    MAP.forEach(r => { console.log(r.join("")); });

    while (!overflow) newDrop();
    console.log("Answer:", answer - 1); // 698

  });

const X = x => x - minX + 1;
const inverseX = X => X +minX -1;

let answer = 0;
const newDrop = () => {
  let x = X(500), y = 0;
  answer++;
  [ restX, restY ] = drop(x, y);
  // console.log("Grains overflowing", answer);
  // MAP.forEach(r => console.log(r.join("")));
  if (overflow) {
    console.log("Grains overflowing", answer);
    return;
  }
};

const drop = (x, y) => {
  const iX = inverseX(x);
  if (iX<minX || y>maxY || iX>maxX) {
    overflow = true;
    MAP[y][x] = "o";
    return [x, y];
  };
  if (MAP[y+1][x] === ".") {
    return drop(x, y+1);
  };
  if (MAP[y+1][x-1] === ".") {
    return drop(x-1, y+1);
  };
  if (MAP[y + 1][x + 1] === ".") {
    return drop(x + 1, y + 1);
  };
  MAP[y][x] = answer.toString().slice(-1);
  return [x, y];
}