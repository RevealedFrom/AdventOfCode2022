const fs = require("fs").promises;

let maxX = 0, minX = Number.MAX_SAFE_INTEGER; let maxY = 0, minY = Number.MAX_SAFE_INTEGER;
let MAP = [];
let blocked = false;

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
    minX = minX - maxY;  maxX +=maxY; // sand can go as far left/right only as much as height

    MAP = [...Array(maxY + 3)].map(() => Array(maxX-minX+3).fill("."));

    console.log("Dimensions, rows:", MAP.length, "columns:", MAP[0].length);

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
    MAP[MAP.length-1].forEach((e, i) => MAP[MAP.length-1][i] = "#")
    // MAP.forEach(r => { console.log(r.join("")); });

    while (!blocked) newDrop();
    console.log("Answer:", answer - 1); // 28594

  });

const X = x => x - minX + 1;
const inverseX = X => X +minX -1;

let answer = 0;
const newDrop = () => {
  let x = X(500), y = 0;
  answer++;
  if (MAP[y][x] != ".") {
    console.log("No more room for grain", answer);
    blocked = true;
    return;
  }
  [ restX, restY ] = drop(x, y);
  // console.log(answer)
  // MAP.forEach(r => console.log(r.join("")));
};

const drop = (x, y) => {
  if (MAP[y+1][x] === ".") {
    return drop(x, y+1);
  };

  if (x<=0) throw new Error("Left bound hit " + answer + inverseX(x) + "(" + x + ")," + y); 
  if (x>=MAP[0].length) throw new Error("Right bound hit " + answer + inverseX(x) + "(" + x + ")," + y);

  if (MAP[y+1][x-1] === ".") {
    return drop(x-1, y+1);
  };
  if (MAP[y + 1][x + 1] === ".") {
    return drop(x + 1, y + 1);
  };
  MAP[y][x] = answer.toString().slice(-1);
  return [x, y];
}