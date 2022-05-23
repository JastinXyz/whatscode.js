module.exports = async (d) => {
  const inside = d.inside;
  const { decodeJid, sender } = require("../../models/functions.js");
  if (!inside) {
    d.isError = true;
    return d.error(`❌ WhatscodeError: Usage: $sendDm[text;jid (optional)].`);
  } else {
    const [text, jid = decodeJid(sender(d))] = inside.split(";");

    if (!inside || !text) {
      d.isError = true;
      return d.error(`❌ WhatscodeError: Usage: $sendDm[text;jid (optional)].`);
    }

    // ugly way to run this function lmao
    const code = `${text}\n$dm[${jid}]`;
    await require("../../interpreter.js")(
      code,
      d.msg,
      d.client,
      d.args,
      d.cmd,
      d.db
    );
    return "";
  }
};
