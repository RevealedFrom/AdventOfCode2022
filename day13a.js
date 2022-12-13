const fs = require("fs").promises;

fs.readFile("./inputs/day13.txt", "utf8").
  then(data => {
    data = data.split("\n")

    const pairs = [];
    for (let i = 0; i < data.length; i=i+3) {
      pairs.push([ JSON.parse(data[i]), JSON.parse(data[i+1])]);
    };

    let answer = 0;
    pairs.forEach((pair, index) => {
      let res = compare(pair[0], pair[1]);
      console.log(res, pair[0], pair[1]);
      if (res == 0) throw { message: "All equal!"}
      if (res < 0) answer += index + 1;
    })
    console.log("Answer:", answer); // 6369

  });

const compare = (left, right) => {
  if (typeof left == "number" && typeof right == "number") return left-right;
  // at least one side is a list
  if (typeof left == "number") left = [ left ];
  if (typeof right == "number") right = [ right ];
  const limit = Math.min(left.length, right.length);
  for (let i=0; i<limit; i++) {
    const L = left[i]; const R = right[i];
    if (typeof L === "number" && typeof R === "number") {
      if (L != R) return L - R;
      // equal
      continue;
    } 
    // at least one is a list
    let res = compare(L, R);
    if (res !=0) return res;
  };
  // all equal so far
  return left.length - right.length;
}