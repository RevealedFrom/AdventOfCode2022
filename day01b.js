const fs = require("fs").promises;

const calories = [];
let max1 = max2 = max3 = elves = 0;
fs.readFile("./inputs/day01.txt", "utf8").
  then(data => {
    data += "\n"; // input file ends after last number
    data = data.split("\n");
    let calories = 0;
    data.forEach((c,i) => {
      if (c === "") {
        console.log(i, elves++, calories);
        if (calories > max1) {
          max3 = max2;
          max2 = max1;
          max1 = calories;
        } else if (calories>max2) {
          max3 = max2;
          max2 = calories;
        } else if (calories>max3) max3 = calories;
        calories = 0;
      } else {
        calories += Number(c);
      }
    });
    console.log(max1 + max2 + max3);  // 213089
  })