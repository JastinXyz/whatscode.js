module.exports = async (d) => {
  const inside = d.inside;
  const { decodeJid, sender } = require("../../models/functions.js");
  if (!inside) {
    d.isError = true;
    return d.error(
      `❌ WhatscodeError: Usage: $setGlobalUserVar[name;value;user jid (optional)]!`
    );
  } else {
    const [name, value, jid = decodeJid(sender(d))] = inside.split(";");

    if (!inside || !name || !value) {
      d.isError = true;
      return d.error(
        `❌ WhatscodeError: Usage: $setGlobalUserVar[name;value;user jid (optional)]!`
      );
    }

    if (!await d.db.has(name)) {
      d.isError = true;
      return d.error(`❌ WhatscodeError: variable ${name} not found!`);
    }

    await d.db.set(`${name}_${jid}`, value);
    return "";
  }
};
