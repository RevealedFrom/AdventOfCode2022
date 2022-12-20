const fs = require("fs").promises;

const LINE = 2000000; // 10 for sample set
const pairs = [];

fs.readFile("./inputs/day15.txt", "utf8").
  then(data => {
    data = data.split("\n")

    data.forEach((row, i) => {
      let prevX, prevY;
      [ sensor, beacon] = row.split("r at x=")[1].split(": closest beacon is at x=");
      [ sx, sy ] = sensor.split(", y=");
      [ bx, by ] = beacon.split(", y=");
      sx = Number(sx); sy = Number(sy);
      bx = Number(bx); by = Number(by);
      const d = Math.abs(sx-bx) + Math.abs(sy-by);
      pairs.push([sx, sy, bx, by, d]);
    });
    pairs.forEach(r => console.log(r));

    
    const overlaps = [];
    let existingBeacons = [];
    pairs.forEach(p => {
      overlap = interset(LINE, p[0], p[1], p[2], p[3]);
      if (overlap) overlaps.push(overlap);
      if (p[3] === LINE) existingBeacons.push(p[2] + "," + p[3]);
    });
    existingBeacons = new Set(existingBeacons).size;

    overlaps.sort((a,b) => a[0]-b[0]);
    let answer = overlaps[0][1] - overlaps[0][0] + 1;
    let rightmost = overlaps[0][1];
    for (let i=1; i<overlaps.length; i++) {
      const a = overlaps[i];
      if (a[0] > rightmost) {
        answer += a[1] - a[0] + 1;
      } else {
        if (a[1] > rightmost)
          answer += a[1] - rightmost;
      }
      if (a[1] > rightmost) rightmost = a[1];
    };

    console.log("Answer:", answer - existingBeacons); // 4919281

  });


const interset = (y, sx, sy, bx, by) => {
  const d = Math.abs(sx - bx) + Math.abs(sy - by);
  if (Math.abs(sy - y) > d) return undefined;
  const vert = Math.abs(sy - y); const horiz = d - vert;
  let left;
  left = sx - horiz;
  console.log("Overlap (", sx, sy, ")(", bx, by, ") range:", left, left + 2*horiz);
  return [ left, left + 2 * horiz];
}