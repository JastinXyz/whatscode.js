module.exports = async (d) => {
  const { decodeJid, sender } = require('../../models/functions.js');
  const split = d.code.split("$getGroupVar").length - 1;
  const after = d.code.split("$getGroupVar")[split];

  if (after.startsWith("[")) {
    const inside = d.code.split("$getGroupVar[")[1].split("]")[0];
    const [name, groupJid = d.msg.key.remoteJid.endsWith("@g.us")? decodeJid(d.msg.key.remoteJid) : undefined] = inside.split(";");

    if (!inside || !name) {
      d.isError = true;
      return d.error(`❌ WhatscodeError: Usage: $getGroupVar[name;group jid (optional)]!`);
    }

    if(!d.db.has(name)) {
      d.isError = true;
      return d.error(`❌ WhatscodeError: variable ${name} not found!`)
    }

    return d.db.has(`${name}_${groupJid}`) === false ? d.db.get(name) : d.db.get(`${name}_${groupJid}`);
  } else {
    d.isError = true;
    return d.error(`❌ WhatscodeError: Usage: $getGroupVar[name;group jid (optional)]!`);
  }
};
