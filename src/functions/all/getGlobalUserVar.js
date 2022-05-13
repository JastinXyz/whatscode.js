module.exports = async (d) => {
  const { decodeJid, sender } = require('../../models/functions.js');
  const split = d.code.split("$getGlobalUserVar").length - 1;
  const after = d.code.split("$getGlobalUserVar")[split];

  if (after.startsWith("[")) {
    const inside = d.code.split("$getGlobalUserVar[")[1].split("]")[0];
    const [name, jid = decodeJid(sender(d))] = inside.split(";");

    if (!inside) {
      d.isError = true;
      return d.error(`❌ WhatscodeError: Usage: $getGlobalUserVar[name;user jid (optional)]!`);
    }

    if(!d.db.has(name)) {
      d.isError = true;
      return d.error(`❌ WhatscodeError: variable ${name} not found!`)
    }

    return d.db.has(`${name}_${jid}`) === false ? d.db.get(name) : d.db.get(`${name}_${jid}`);
  } else {
    d.isError = true;
    return d.error(`❌ WhatscodeError: Usage: $getGlobalUserVar[name;user jid (optional)]!`);
  }
};
