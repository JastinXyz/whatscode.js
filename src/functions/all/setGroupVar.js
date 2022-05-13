module.exports = async (d) => {
  const { decodeJid, sender } = require('../../models/functions.js');
  const split = d.code.split("$setGroupVar").length - 1;
  const after = d.code.split("$setGroupVar")[split];

  if (after.startsWith("[")) {
    const inside = d.code.split("$setGroupVar[")[1].split("]")[0];
    const [name, value, groupJid = d.msg.key.remoteJid.endsWith("@g.us")? decodeJid(d.msg.key.remoteJid) : undefined] = inside.split(";");

    if (!inside || !name || !value || !groupJid) {
      d.isError = true;
      return d.error(`❌ WhatscodeError: Usage: $setGroupVar[name;value;group jid (optional)]!`);
    }

    if(!d.db.has(name)) {
      d.isError = true;
      return d.error(`❌ WhatscodeError: variable ${name} not found!`)
    }

    await d.db.set(`${name}_${groupJid}`, value);
    return "";
  } else {
    d.isError = true;
    return d.error(`❌ WhatscodeError: Usage: $setGroupVar[name;value;group jid (optional)]!`);
  }
};
