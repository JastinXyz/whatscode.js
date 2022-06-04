module.exports = async (d) => {
  const inside = d.inside;
  const { decodeJid, sender } = require("../../models/functions.js");
  if (!inside) {
    d.isError = true;
    return d.error(
      `❌ WhatscodeError: Usage: $setUserVar[name;value;group jid (optional if you in groups);user jid (optional)]!`
    );
  } else {
    const [
      name,
      value,
      groupJid = d.msg.key.remoteJid.endsWith("@g.us")
        ? decodeJid(d.msg.key.remoteJid)
        : undefined,
      jid = decodeJid(sender(d)),
    ] = inside.split(";");

    if (!name || !value || !groupJid) {
      d.isError = true;
      return d.error(
        `❌ WhatscodeError: Usage: $setUserVar[name;value;group jid (optional if you in groups);user jid (optional)]!`
      );
    }

    if (!await d.db.has(name)) {
      d.isError = true;
      return d.error(`❌ WhatscodeError: variable ${name} not found!`);
    }

    await d.db.set(`${name}_${groupJid}_${jid}`, value);
    return ""
  }
};
