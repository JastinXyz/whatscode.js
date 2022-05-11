module.exports = async (d) => {
  const split = d.code.split("$onlyIf").length - 1;
  const inside = d.code.split("$onlyIf[")[split].split("]")[0];
  const [cond, error = "You can't use this command!"] = inside.split(";");

  const operators = () => {
    for (const op of ["<=", ">=", "==", "!=", "<", ">"]) {
      if (cond.includes(op)) return op;
    }
  };

  const op = operators();
  if (!operators)
    return d.client.sendMessage(
      d.msg.key.remoteJid,
      {
        text: `\`\`\`❌ [whatscode.js] | Usage: $onlyIf[condition;error message (optional)]!\`\`\``,
      },
      { quoted: d.msg }
    );

  const fields = cond.split(op);

  let pass = true;
  if (op === "<=") {
    if (Number(fields[0]) <= Number(fields[1])) pass = false;
  } else if (op === ">=") {
    if (Number(fields[0]) >= Number(fields[1])) pass = false;
  } else if (op === "==") {
    if (fields[0] === Number(fields[1])) pass = false;
  } else if (op === "<") {
    if (Number(fields[0]) < Number(fields[1])) pass = false;
  } else if (op === ">") {
    if (Number(fields[0]) > Number(fields[1])) pass = false;
  } else if (op === "!=") {
    if (fields[0] != fields[1]) pass = false;
  }

  if (!pass) {
    d.isError = true;

    return d.client.sendMessage(
      d.msg.key.remoteJid,
      { text: error },
      { quoted: d.msg }
    );
  } else {
    return "";
  }
};
