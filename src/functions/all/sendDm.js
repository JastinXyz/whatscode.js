module.exports = async (d) => {
  const { decodeJid, sender } = require("../../models/functions.js");
  const split = d.code.split("$sendDm").length - 1;
  const after = d.code.split("$sendDm")[split];

  if (after.startsWith("[")) {
    var inside = d.code.split("$sendDm[")[1].split("]")[0];
    const [text, jid = decodeJid(sender(d))] = inside.split(';')

    if (!inside || !text) {
      d.isError = true;
      return d.error(`❌ WhatscodeError: Usage: $sendDm[text;jid (optional)].`);
    }

    // ugly way to run this function lmao
    const code = `${text}\n$dm[${jid}]`
    await require("../../interpreter.js")(code, d.msg, d.client, d.args, d.cmd, d.db)
    return ""
  } else {
    d.isError = true;
    return d.error(`❌ WhatscodeError: Usage: $sendDm[text;jid (optional)].`);
  }
};
