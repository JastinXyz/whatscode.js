module.exports = async (d) => {
  const inside = d.inside;
  if (!inside) {
    d.isError = true;
    return d.error(
      `❌ WhatscodeError: Usage: $argsCheck[condition;error message]!`
    );
  } else {
    const [condition, error] = inside.split(";");

    if (!condition) {
      d.isError = true;
      return d.error(
        `❌ WhatscodeError: Usage: $argsCheck[condition;error message]!`
      );
    }

    if (!error) {
      d.isError = true;
      return d.error(
        `❌ WhatscodeError: Usage: $argsCheck[${condition};error message]!`
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
  }
};
