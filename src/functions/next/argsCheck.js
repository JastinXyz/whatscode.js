module.exports = async(d) => {
  const split = d.code.split("$argsCheck").length - 1;
  const inside = d.code.split("$argsCheck[")[split].split("]")[0];

  const [condition, error = `Minimum args required.`] = inside.split(";");

  if(!condition) return d.client.sendMessage(
    d.msg.key.remoteJid,
    {
      text: `\`\`\`❌ [whatscode.js] | Usage: $argsCheck[condition;error message (optional)]!\`\`\``,
    },
    { quoted: d.msg }
  );

  const operator = ["<", ">"].find((e) => condition.includes(e));
  let pass = true;
  const n = Number(condition.replace(operator || "", ""));

  if (operator === "<") {
  if (d.args[n] !== undefined) pass = false;
  //if(d.args.length < n - 1) pass = false;
  } else if (operator === ">") {
    if (d.args[n - 1] === undefined) pass = false;
  //if(d.args.length > n - 1) pass = false;
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
};
