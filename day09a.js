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
    
    let xH = -offsetX;  let yH = -offsetY;  // start point
    let xT = xH; let yT = yH;
    data.forEach(c => {
      let dir, steps;
      [dir, steps] = c.split(" ");
      steps = Number(steps);
      for (let i=0; i<steps; i++) {
        if (dir === "L") [xH, xT, yT] = moveLeft(xH, yH, xT, yT);
        else if (dir === "R") [xH, xT, yT] = moveRight(xH, yH, xT, yT);
        else if (dir === "U") [yH, xT, yT] = moveUp(xH, yH, xT, yT);
        else if (dir === "D") [yH, xT, yT] = moveDown(xH, yH, xT, yT);
        if (error(xH, yH, xT, yT)) {
          console.error(dir, steps, i, xH, yH, xT, yT);
          throw new Error("dead");
        }
        visited[yT][xT] = true;
      }
    })
    let answer = 0;
    visited.forEach(row => {
      row.forEach(v => {
        if (v) answer++;
      })
    })
    console.log("Answer:", answer); // 5619

  });

const moveRight = (xH, yH, xT, yT) => {
  xH++;
  if (yH === yT) { // H&T on same row
    if (xH === xT + 2) xT++;
  } else {
    if (xH === xT + 2) {
      xT++;
      yT = yH;
    }
  };
  return [xH , xT, yT];
};

const moveLeft = (xH, yH, xT, yT) => {
  xH--;
  if (yH === yT) {
    if (xH === xT - 2) xT--;
  } else {
    if (xH === xT - 2) { // diagonal move
      xT--;
      yT = yH;
    }
  }
  return [ xH, xT, yT ];
};

const moveUp = (xH, yH, xT, yT) => {
  yH++;
  if (xH === xT) {
    if (yH === yT + 2) yT++;
  } else {
    if (yH === yT + 2) {
      yT++;
      xT = xH;
    }
  };
  return [ yH, xT, yT ];
};

const moveDown = (xH, yH, xT, yT) => {
  yH--;
  if (xH === xT) {
    if (yH === yT - 2) yT--;
  } else {
    if (yH === yT - 2) {
      yT--;
      xT = xH;
    }
  }
  return [ yH, xT, yT ];
};

const error = (xH, yH, xT, yT) => {
  let s = (xH - xT)**2 + (yH - yT)**2;
  return s>2;
}