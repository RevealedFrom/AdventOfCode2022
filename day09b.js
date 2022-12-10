const fs = require("fs").promises;

fs.readFile("./inputs/day09.txt", "utf8").
  then(data => {
    data = data.split("\n")

    let x = 0, y = 0, maxL = 0, maxR = 0, maxU = 0, maxD = 0;
    data.forEach(c => {
      let dir, steps;
      [dir, steps] = c.split(" ");
      steps = Number(steps);
      if (dir === "U") {
        y+= steps;
        if (y>maxU) maxU = y;
      } else 
      if (dir === "D") {
        y-= steps;
        if (y<maxD) maxD = y;
      } else 
      if (dir === "R") {
        x+= steps;
        if (x>maxR) maxR = x;
      } else 
      if (dir === "L") {
        x-= steps;
        if (x<maxL) maxL = x;
      }; 
    });
    console.log("Width:", maxL, maxR, "Height:", maxU, maxD, "End:", x, y);
    let offsetX = maxL<0 ? maxL : 0;
    let offsetY = maxD<0 ? maxD : 0;
    let visited = [...Array(maxU - maxD + 1)].map(() => Array(maxR - maxL + 1).fill(false));
    
    const headsX = Array(11).fill(-offsetX);
    const headsY = Array(11).fill(-offsetY);
    let xT = -offsetX ; let yT = -offsetY;
    data.forEach(c => {
      let dir, steps;
      [dir, steps] = c.split(" ");
      steps = Number(steps);
      for (let i=0; i<steps; i++) {
        if (dir === "L") headsX[0]--;
        else if (dir === "R") headsX[0]++;
        else if (dir === "U") headsY[0]++;
        else if (dir === "D") headsY[0]--;
        for (let k=0; k<10; k++) {
          [ headsX[k+1], headsY[k+1]] = catchUp(headsX[k], headsY[k], headsX[k+1], headsY[k+1]); 
          if (error(headsX[k], headsY[k], headsX[k + 1], headsY[k + 1])) {
            console.error(dir, steps, i, xH, yH, xT, yT);
            throw new Error("dead");
          }
        };
        visited[headsY[9]][headsX[9]] = true;
      }
    });
    let answer = 0;
    visited.forEach(row => {
      row.forEach(v => {
        if (v) answer++;
      })
    })
    console.log("Answer:", answer); // 2376

  });

const catchUp = (xH, yH, xT, yT) => {
  // assuming never too far away
  if (!needToMove(xH, yH, xT, yT)) return [ xT, yT];
  const deltaX = xH - xT;
  const deltaY = yH - yT;
  if (deltaY === 0) { // on same row
    if (deltaX > 0)
      xT++
    else
      xT--;
  } else 
  if (deltaX === 0) {
    if (deltaY > 0) yT++; else yT--;
  } else {
    // diagonal move
    if (deltaX > 0) xT++; else xT--;
    if (deltaY > 0) yT++; else yT--;
  };
  return [ xT, yT];
};

const needToMove = (x1, y1, x2, y2) => {
  let s = (x1 - x2)**2 + (y1 - y2)**2;
  return s>2;
}

const error = (xH, yH, xT, yT) => {
  let s = (xH - xT)**2 + (yH - yT)**2;
  return s>2;
}