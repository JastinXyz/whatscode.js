module.exports = async (d) => {
  const { decodeJid, sender } = require("../../models/functions.js");
  const split = d.code.split("$setUserVar").length - 1;
  const after = d.code.split("$setUserVar")[split];

  if (after.startsWith("[")) {
    const inside = d.code.split("$setUserVar[")[1].split("]")[0];
    if (!inside) {
      d.isError = true;
      return d.error(
        `❌ WhatscodeError: Usage: $setUserVar[name;value;group jid (optional if you in groups);user jid (optional)]!`
      );
    }

    const [name, value, groupJid = d.msg.key.remoteJid.endsWith("@g.us")? decodeJid(d.msg.key.remoteJid) : undefined, jid = decodeJid(sender(d))] = inside.split(";");

    if (!name || !value || !groupJid) {
      d.isError = true;
      return d.error(
        `❌ WhatscodeError: Usage: $setUserVar[name;value;group jid (optional if you in groups);user jid (optional)]!`
      );
    }

    if (!d.db.has(name)) {
      d.isError = true;
      return d.error(`❌ WhatscodeError: variable ${name} not found!`);
    }

    return d.db.set(`${name}_${groupJid}_${jid}`, value);

  } else {
    d.isError = true;
    return d.error(
      `❌ WhatscodeError: Usage: $setUserVar[name;value;group jid (optional if you in groups);user jid (optional)]!`
    );
  }
};
