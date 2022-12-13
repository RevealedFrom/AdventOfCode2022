const fs = require("fs").promises;

let supermod = 1;
fs.readFile("./inputs/day11.txt", "utf8").
  then(data => {
    data = data.split("\n")

    const monkeys = [];
    for (let i = 0; i < data.length; i=i+7) {
      const monkey = Number(data[i].split(" ")[1].slice(0, -1));
      let items = data[i+1].split(": ")[1].split(", ");
      items = items.map(e => Number(e));
      [ op, operand] = data[i+2].split("= old ")[1].split(" ");
      const divisor = Number(data[i+3].split("by ")[1]);
      supermod *= divisor;
      const ifTrue = Number(data[i+4].split("monkey ")[1]);
      const ifFalse = Number(data[i+5].split("monkey ")[1]);
      monkeys[monkey] = { items: items, op: op, operand: Number(operand), divisor: divisor, ifTrue: ifTrue, ifFalse: ifFalse, inspections: 0};
    };

    for (let round=0; round<10000; round++) {
      for (let j=0; j<monkeys.length; j++) {
        const monkey = monkeys[j];
        const items = monkey.items.slice(); // need to clone a copy
        const itemQty = items.length;
        for (let k=0; k<itemQty; k++) {
          monkey.inspections++;
          let worry = items[k] % supermod; // this is the magic line
          if (monkey.op === "*")
            worry = worry * (isNaN(monkey.operand) ? worry : monkey.operand);
          else
            worry = worry + monkey.operand;
          const receiver = worry % monkey.divisor === 0 ? monkey.ifTrue : monkey.ifFalse;
          monkeys[receiver].items.push(worry);
          monkey.items.shift();
        };
      };
      if (round===0 || round === 19 || round === 999 || round === 1999 || round === 2999 || round === 3999 || round === 4999 || round === 5999 || round === 6999 || round === 79999 || round === 8999 || round === 9999)
        console.log(round+1, monkeys[0].inspections, monkeys[1].inspections, monkeys[2].inspections, monkeys[3].inspections);
    }
    const inspections = monkeys.map(m => m.inspections).sort((a,b) => b-a);
    console.log("Answer:", inspections[0] * inspections[1]); // 21800916620

  });

  /* 

   The only significant operation on the worry number is to test whether it is divisible by one of the 8 divisors (the number of monkeys in your input).
   Let's call the product of all those divisors `supermod`.
   It is thus only necessary to store the worry value by taking its modulo of `supermod`, when it gets too big.

  */
