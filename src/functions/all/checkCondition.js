module.exports = async (d) => {
  const inside = d.inside;
  if (!inside) {
    d.isError = true;
    return d.error(
      `❌ WhatscodeError: Usage: $checkCondition[condition]!`
    );
  } else {
    if (inside.includes("$")) {
      inside = await require("../../interpreter.js")(
        inside,
        d.msg,
        d.client,
        d.args,
        d.cmd,
        d.db,
        "",
        true
      );
    }

    const operators = () => {
      for (const op of ["<=", ">=", "==", "!=", "<", ">"]) {
        if (inside.includes(op)) return op;
      }
    };

    const op = operators();
    if (!operators) {
      d.isError = true;
      return d.error(
        `❌ WhatscodeError: Usage: $checkCondition[value1(<=/>=/==/!=/</>)value2]!`
      );
    }

    const fields = inside.split(op);

    let pass = true;
    if (op === "<=") {
      if (Number(fields[0]) > Number(fields[1])) pass = false;
    } else if (op === ">=") {
      if (Number(fields[0]) < Number(fields[1])) pass = false;
    } else if (op === "==") {
      if (fields[0] !== fields[1]) pass = false;
    } else if (op === "<") {
      if (Number(fields[0]) >= Number(fields[1])) pass = false;
    } else if (op === ">") {
      if (Number(fields[0]) <= Number(fields[1])) pass = false;
    } else if (op === "!=") {
      if (fields[0] === fields[1]) pass = false;
    }

    return pass
  }
};
