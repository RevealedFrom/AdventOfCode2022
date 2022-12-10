const { nextTick } = require("process");

const fs = require("fs").promises;

let totalStacks, separator;
fs.readFile("./inputs/day05.txt", "utf8").
  then(data => {
    data = data.split("\n");
    for (let i=0; i<data.length; i++) {
      if (data[i] === "") {
        totalStacks = data[i-2].split("[").length - 1;
        separator = i;
        console.log("Stacks:", totalStacks,"Break at row", separator);
        break;
      }
    };
    for (let i=0; i<separator-1; i++) {
      readCrates(data[i]);
    }
    data.forEach(d => {
    });
    for (let i = separator + 1; i < data.length; i++) moveCrates(data[i]);
    let answer = "";
    for (let i = 1; i < Stacks.length; i++) answer += Stacks[i][0];
    console.log(answer);  // JCMHLVGMG
  });

const Stacks = [ undefined];
const readCrates = row => {
  let stack = 0; // left most is 1
  for (let i = 0; i < row.length; i = i + 4) {
    stack++;
    if (!Stacks[stack]) Stacks[stack] = [];
    if (row[i] !== "[") continue;
    const crate = row[i+1]
    Stacks[stack].push(crate)
  };
};

const moveCrates = row => {
  let qty, from, to;
  [ qty, from, to ] = row.replace("move ","").replace("from ", "").replace("to ", "").split(" ");
  qty = Number(qty), from = Number(from), to = Number(to);
  for (let i=0; i<qty; i++) {
    const crate = Stacks[from].shift();
    Stacks[to].unshift(crate);
  }
}