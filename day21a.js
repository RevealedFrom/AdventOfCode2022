const fs = require("fs").promises;
const assert = require("assert");
const { monitorEventLoopDelay } = require("perf_hooks");

const monkeys = [];

fs.readFile("./inputs/day21.txt", "utf8").
  then(data => {
    data = data.split("\n")
    data.forEach(m => {
      const [monkey, right] = m.split(": ");
      const ops = right.split(/ ? /);
      if (ops.length === 1) {
        monkeys[monkey] = Number(ops);
      } else {
        const op = ops[1];
        assert(op === "+" || op === "-" || op === "*" || op === "/", "Operator is ${op}");
        monkeys[monkey] = { left: ops[0], op: op, right: ops[2] };
      }
    });

    let answer = evaluate("root");
    console.log("Answwer", answer);
  });

const evaluate = (monkey) => {
  const expression = monkeys[monkey];
  if (Number(expression)) return expression;
  const { left, op, right } = expression;
  if (!Number(left)) expression.left = evaluate(left);
  if (!Number(right)) expression.right = evaluate(right);
  const result = asmd(expression);
  monkeys[monkey] = result;
  return result;
};

const asmd = expression => {
  const { left, op, right } = expression;
  if (Number(left) && Number(right)) 
    return op === "+" ? left + right :
      op === "-" ? left - right :
        op === "*" ? left * right : left / right;
  console.log("asmd operands not all numeric", left, right)
  return undefined;
}