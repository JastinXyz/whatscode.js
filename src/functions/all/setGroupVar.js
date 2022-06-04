module.exports = async (d) => {
  const inside = d.inside;
  const { decodeJid, sender } = require("../../models/functions.js");
  if (!inside) {
    d.isError = true;
    return d.error(
      `❌ WhatscodeError: Usage: $setGroupVar[name;value;group jid (optional)]!`
    );
  } else {
    const [
      name,
      value,
      groupJid = d.msg.key.remoteJid.endsWith("@g.us")
        ? decodeJid(d.msg.key.remoteJid)
        : undefined,
    ] = inside.split(";");

    if (!inside || !name || !value || !groupJid) {
      d.isError = true;
      return d.error(
        `❌ WhatscodeError: Usage: $setGroupVar[name;value;group jid (optional)]!`
      );
    }

    if (!await d.db.has(name)) {
      d.isError = true;
      return d.error(`❌ WhatscodeError: variable ${name} not found!`);
    }

    await d.db.set(`${name}_${groupJid}`, value);
    return "";
  }
};
