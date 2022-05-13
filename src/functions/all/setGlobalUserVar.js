module.exports = async (d) => {
  const { decodeJid, sender } = require('../../models/functions.js');
  const split = d.code.split("$setGlobalUserVar").length - 1;
  const after = d.code.split("$setGlobalUserVar")[split];

  if (after.startsWith("[")) {
    const inside = d.code.split("$setGlobalUserVar[")[1].split("]")[0];
    const [name, value, jid = decodeJid(sender(d))] = inside.split(";");

    if (!inside || !name || !value) {
      d.isError = true;
      return d.error(`❌ WhatscodeError: Usage: $setGlobalUserVar[name;value;user jid (optional)]!`);
    }

    if(!d.db.has(name)) {
      d.isError = true;
      return d.error(`❌ WhatscodeError: variable ${name} not found!`)
    }

    await d.db.set(`${name}_${jid}`, value);
    return "";
  } else {
    d.isError = true;
    return d.error(`❌ WhatscodeError: Usage: $setGlobalUserVar[name;value;user jid (optional)]!`);
  }
};
