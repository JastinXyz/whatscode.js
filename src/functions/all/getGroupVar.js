module.exports = async (d) => {
  const inside = d.inside;
  const { decodeJid, sender } = require("../../models/functions.js");
  if (!inside) {
    d.isError = true;
    return d.error(
      `❌ WhatscodeError: Usage: $getGroupVar[name;group jid (optional)]!`
    );
  } else {
    const [
      name,
      groupJid = d.msg.key.remoteJid.endsWith("@g.us")
        ? decodeJid(d.msg.key.remoteJid)
        : undefined,
    ] = inside.split(";");

    if (!name) {
      d.isError = true;
      return d.error(
        `❌ WhatscodeError: Usage: $getGroupVar[name;group jid (optional)]!`
      );
    }

    if (!await d.db.has(name)) {
      d.isError = true;
      return d.error(`❌ WhatscodeError: variable ${name} not found!`);
    }

    return await d.db.has(`${name}_${groupJid}`) === false
      ? await d.db.get(name)
      : await d.db.get(`${name}_${groupJid}`);
  }
};
