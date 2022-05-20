module.exports = async (d) => {
  const inside = d.inside;
  const { decodeJid, sender } = require("../../models/functions.js");
  if (inside == "") {
    d.isError = true;
    return d.error(
      `❌ WhatscodeError: Usage: $getGlobalUserVar[name;user jid (optional)]!`
    );
  } else {
    const [name, jid = decodeJid(sender(d))] = inside.split(";");

    if (!d.db.has(name)) {
      d.isError = true;
      return d.error(`❌ WhatscodeError: variable ${name} not found!`);
    }

    return d.db.has(`${name}_${jid}`) === false
      ? d.db.get(name)
      : d.db.get(`${name}_${jid}`);
  }
};
