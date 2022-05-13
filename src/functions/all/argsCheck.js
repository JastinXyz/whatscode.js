module.exports = async (d) => {
  const split = d.code.split("$argsCheck").length - 1;
  const after = d.code.split("$argsCheck")[split];

  if (after.startsWith("[")) {
    const inside = d.code.split("$argsCheck[")[split].split("]")[0];
    const [condition, error] = inside.split(";");

    if (!condition) {
      d.isError = true;
      return d.error(
        `❌ [whatscode.js] | Usage: $argsCheck[condition;error message]!`
      );
    }

    if (!error) {
      d.isError = true;
      return d.error(
        `❌ [whatscode.js] | Usage: $argsCheck[${condition};error message]!`
      );
    }

    const operator = ["<", ">"].find((e) => condition.includes(e));
    let pass = true;
    const n = Number(condition.replace(operator || "", ""));

    if (operator === "<") {
      if (d.args[n] !== undefined) pass = false;
    } else if (operator === ">") {
      if (d.args[n - 1] === undefined) pass = false;
    } else {
      if (d.args.length !== n) pass = false;
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
  } else {
    d.isError = true;
    return d.error(
      `❌ [whatscode.js] | Usage: $argsCheck[condition;error message]!`
    );
  }
};
