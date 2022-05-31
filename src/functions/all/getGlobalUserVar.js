module.exports = async (d) => {
  const inside = d.inside;
  const { decodeJid, sender } = require("../../models/functions.js");
  if (!inside) {
    d.isError = true;
    return d.error(
      `❌ WhatscodeError: Usage: $getGlobalUserVar[name;user jid (optional)]!`
    );
  } else {
    const [name, jid = decodeJid(sender(d))] = inside.split(";");

    if (!await d.db.has(name)) {
      d.isError = true;
      return d.error(`❌ WhatscodeError: variable ${name} not found!`);
    }

    return await d.db.has(`${name}_${jid}`) === false
      ? await d.db.get(name)
      : await d.db.get(`${name}_${jid}`);
  }
};
