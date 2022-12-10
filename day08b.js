const { nextTick } = require("process");
const { text } = require("stream/consumers");

const fs = require("fs").promises;

fs.readFile("./inputs/day08.txt", "utf8").
  then(data => {
    data = data.split("\n")
    const cols = data[0].length, rows = data.length;
    let maxScore = 0;
    let SCORES = [...Array(rows)].map(() => Array(cols).fill(0));

    for (let i = 1; i < rows - 1; i++) {
      const row = data[i];
      for (let j = 1; j < cols - 1; j++) {
        let scoreL, scoreR, scoreA, scoreB;
        scoreL = scoreR = scoreA = scoreB = 0;
        const tree = row[j];
        for (let left = j - 1; left>=0; left--) {
          const neighbor = row[left];
          if (tree >= neighbor) {
            scoreL++;
            if (neighbor == tree) { break;};
          } else { scoreL++; break;};
        };
        for (let right = j + 1; right < cols; right++) {
          const neighbor = row[right];
          if (tree >= neighbor) {
            scoreR++;
            if (neighbor === tree) { break;};
          } else { scoreR++; break;};
        };
        for (let above = i - 1; above >= 0; above--) {
          const neighbor = data[above][j];
          if (tree >= neighbor) {
            scoreA++;
            if (neighbor === tree) { break; };
          } else { scoreA++; break;};
        }
        for (let below = i + 1; below < rows; below++) {
          const neighbor = data[below][j];
          if (tree >= neighbor) {
            scoreB++;
            if (neighbor === tree) { break;};
          } else { scoreB++; break;};
        };
        let score = scoreL * scoreR * scoreA * scoreB;
        if (score > maxScore) {
          console.log(i, j, score);
          maxScore = score;
          SCORES[i][j] = score;
        }
      };
    };
    console.log("Answer", maxScore); // 671160

  });

