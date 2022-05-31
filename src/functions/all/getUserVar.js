module.exports = async (d) => {
  const inside = d.inside;
  const { decodeJid, sender } = require("../../models/functions.js");
  if (!inside) {
    d.isError = true;
    return d.error(
      `❌ WhatscodeError: Usage: $getUserVar[name;group jid (optional if you in groups);user jid (optional)]!`
    );
  } else {
    const [
      name,
      groupJid = d.msg.key.remoteJid.endsWith("@g.us")
        ? decodeJid(d.msg.key.remoteJid)
        : undefined,
      jid = decodeJid(sender(d)),
    ] = inside.split(";");

    if (!name || !groupJid) {
      d.isError = true;
      return d.error(
        `❌ WhatscodeError: Usage: $getUserVar[name;group jid (optional if you in groups);user jid (optional)]!`
      );
    }

    if (!await d.db.has(name)) {
      d.isError = true;
      return d.error(`❌ WhatscodeError: variable ${name} not found!`);
    }

    return await d.db.has(`${name}_${groupJid}_${jid}`) === false
      ? await d.db.get(name)
      : await d.db.get(`${name}_${groupJid}_${jid}`);
  }
};
