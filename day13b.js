const fs = require("fs").promises;

fs.readFile("./inputs/day13.txt", "utf8").
  then(data => {
    data = data.split("\n")

    const packets = [];
    for (let i = 0; i < data.length; i=i+3) {
      packets.push(JSON.parse(data[i]));
      packets.push(JSON.parse(data[i+1]));
    };
    packets.push([[2]]);
    packets.push([[6]]);

    packets.sort((a, b) => compare(a, b));


    let answer = 1;

    packets.forEach((packet, index) => {
      let p = JSON.stringify(packet);
      if (p === "[[2]]" || p === "[[6]]")
        answer *= (index + 1);
    })
    console.log("Answer:", answer); // 25800

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