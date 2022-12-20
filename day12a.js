const fs = require("fs");

const grid = [];
let width, height;
const solutions = [];

const data = fs.readFileSync("./inputs/day12.txt", "utf8");
data.split("\n").forEach(row => {
  grid.push(row.split(""));
});

width = grid[0].length;
height = grid.length;
const visited = [...Array(height)].map(() => Array(width).fill(false));

const walk = (x, y, dir, steps, oldVisited, path) => {
  try {
  if (path.length % 50 === 0) console.log(path);
  } catch (err) {
    console.log(x,y,dir,steps, path);
  }
  const visited = clone(oldVisited);
  visited[y][x] = true;
  // console.log(x, y, dir, steps);
  const current = grid[y][x];
  let newX = x; let newY = y;
  if (dir === ">" || dir === "<") {
    newX = x + (dir === ">" ? 1 : -1);
    if (newX < 0 || newX >= width) return;
  } else {
    newY = y + (dir === "v" ? 1 : -1);
    if (newY < 0 || newY >= height) return;
  };
  if (visited[newY][newX]) { //console.log("Visited", y,x,newY,newX,current, path, dir); 
    return};
  const next = grid[newY][newX];
  if (next.charCodeAt(0) - current.charCodeAt(0) > 1) { //console.log("   ", y,x,newY,newX,current, next, path, dir); 
    return};
  steps++;
  if (next === "E") {
    if (current >= "y") {
      console.log(steps, path + dir);
      solutions.push(steps);
      return;
    } else return;
  };
  walk(newX, newY, ">", steps, visited, path+dir);
  walk(newX, newY, "<", steps, visited, path+dir);
  walk(newX, newY, "^", steps, visited, path+dir);
  walk(newX, newY, "v", steps, visited, path+dir);
};

let start = data.indexOf("S");
const startX = start % (width + 1);
const startY = Math.floor(start / (width + 1));
grid[startY][startX] = "a";

const v1 = clone(visited), v2=clone(visited), v3=clone(visited);
walk(startX, startY, ">", 0, visited, "S");
console.log("=========================");
walk(startX, startY, "<", 0, v1, "S");
console.log("=========================");
walk(startX, startY, "^", 0, v2, "S");
console.log("=========================");
walk(startX, startY, "v", 0, v3, "S");

console.log("Answer:", solutions.sort()[0]);

function clone(A) {
  return JSON.parse(JSON.stringify(A));
}
