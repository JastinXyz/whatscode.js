module.exports = async (d) => {
  const inside = d.inside;
  if (!inside) {
    d.isError = true;
    return d.error(
      `❌ WhatscodeError: Usage: $onlyIf[condition;error message (optional)]!`
    );
  } else {
    var [cond, error = "You can't use this command!"] = inside.split(";");

    if (cond.includes("$")) {
      cond = await require("../../interpreter.js")(
        cond,
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
        if (cond.includes(op)) return op;
      }
    };

    const op = operators();
    if (!operators) {
      d.isError = true;
      return d.error(
        `❌ WhatscodeError: Usage: $onlyIf[value1(<=/>=/==/!=/</>)value2;error message (optional)]!`
      );
    }

    const fields = cond.split(op);

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

    if (!pass) {
      d.isError = true;
      return d.client.sendMessage(
        d.msg.key.remoteJid,
        {
          text: `${error}`,
        },
        { quoted: d.msg }
      );
    } else {
      return "";
    }
  }
};
