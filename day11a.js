const { receiveMessageOnPort } = require("worker_threads");

const fs = require("fs").promises;

fs.readFile("./inputs/day11s.txt", "utf8").
  then(data => {
    data = data.split("\n")

    const monkeys = [];
    for (let i = 0; i < data.length; i=i+7) {
      const monkey = Number(data[i].split(" ")[1].slice(0, -1));
      let items = data[i+1].split(": ")[1].split(", ");
      items = items.map(e => Number(e));
      [ op, operand] = data[i+2].split("= old ")[1].split(" ");
      const divisor = Number(data[i+3].split("by ")[1]);
      const ifTrue = Number(data[i+4].split("monkey ")[1]);
      const ifFalse = Number(data[i+5].split("monkey ")[1]);
      monkeys[monkey] = { items: items, op: op, operand: Number(operand), divisor: divisor, ifTrue: ifTrue, ifFalse: ifFalse, inspections: 0};
      console.log("Monkey", monkey, "Worry lvels:", items, "divisible", divisor, "If true", ifTrue, "If false", ifFalse);
    };

    for (let round=0; round<20; round++) {
      for (let j=0; j<monkeys.length; j++) {
        const monkey = monkeys[j];
        const items = monkey.items.slice(); // need to clone a copy
        const itemQty = items.length;
        for (let k=0; k<itemQty; k++) {
          monkey.inspections++;
          let worry = items[k];
          if (monkey.op === "*")
            worry = worry * (isNaN(monkey.operand) ? worry : monkey.operand);
          else
            worry += monkey.operand;
          worry = Math.floor(worry / 3);
          const receiver = worry % monkey.divisor === 0 ? monkey.ifTrue : monkey.ifFalse;
          monkeys[receiver].items.push(worry);
          monkey.items.shift();
        }
      }
    }
    const inspections = monkeys.map(m => m.inspections).sort((a,b) => b-a);
    console.log("Answer:", inspections[0] * inspections[1]); // 66802

  });
