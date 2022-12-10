const { nextTick } = require("process");
const { text } = require("stream/consumers");

const fs = require("fs").promises;

fs.readFile("./inputs/day08.txt", "utf8").
  then(data => {
    data = data.split("\n")
    const cols = data[0].length, rows = data.length;
    let VISIBLE = [...Array(rows)].map(() => Array(cols).fill(true));

    for (let i = 1; i < rows - 1; i++) {
      const row = data[i];
      for (let j = 1; j < cols - 1; j++) {
        let blockedL = blockedR = blockedA = blockedB = false;
        const tree = row[j];
        for (let left = 0; left < j; left++) {
          if (row[left] >= tree) {
            console.log("left", i, j);
            blockedL = true;
            break;
          };
        }
        for (let right = j + 1; right < cols; right++) {
          if (row[right] >= tree) {
            console.log("right", i, j);
            blockedR = true;
            break;
          }
        };
        for (let above = i - 1; above >= 0; above--) {
          if (data[above][j] >= tree) {
            console.log("above", i, j);
            blockedA = true;
            break;
          }
        }
        if (!VISIBLE[i][j]) continue;
        for (let below = i + 1; below < rows; below++) {
          if (data[below][j] >= tree) {
            console.log("below", i, j);
            blockedB = true;
            break;
          }
        };
        if (blockedL && blockedR && blockedA && blockedB) VISIBLE[i][j] = false;
      };
    };
    let visibles = 0;
    VISIBLE.forEach(row => {
      row.forEach(v => {
        if (v) visibles++;
      })
    })
    console.log("Answer", visibles); // 1763

  });

