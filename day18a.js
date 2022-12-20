const fs = require("fs").promises;

const cubes = [[[]]];

fs.readFile("./inputs/day18.txt", "utf8").
  then(data => {
    data = data.split("\n")

    data.forEach(row => {
      let [x,y,z] = row.split(",");
      x = Number(x); y = Number(y); z = Number(z);
      if (!cubes[x]) cubes[x] = [];
      if (!cubes[x][y]) cubes[x][y] = [];
      cubes[x][y][z] = true;
    });

    let answer = 0;
    cubes.forEach((X,x) => X.forEach((Y, y) => Y.forEach((Z, z) => {
      if (cubes[x][y][z]) {
        let sides = 6;
        if (behind(x,y,z)) sides--;
        if (front(x,y,z)) sides--;
        if (left(x,y,z)) sides--;
        if (right(x,y,z)) sides--;
        if (above(x,y,z)) sides--;
        if (below(x,y,z)) sides--;
        answer += sides;
      }
    })))

    console.log("Answer:", answer); // 4348

  });

const behind = (x, y, z) => {
  return cubes[x]?.[y+1]?.[z];
}
const front = (x, y, z) => {
  return cubes[x]?.[y-1]?.[z];
}
const right = (x, y, z) => {
  return cubes[x+1]?.[y]?.[z];
}
const left = (x, y, z) => {
  return cubes[x-1]?.[y]?.[z];
}
const above = (x, y, z) => {
  return cubes[x]?.[y]?.[z+1];
}
const below = (x, y, z) => {
  return cubes[x]?.[y]?.[z-1];
}