module.exports = async (d) => {
  const { decodeJid, sender } = require("../../models/functions.js");
  const split = d.code.split("$getUserVar").length - 1;
  const after = d.code.split("$getUserVar")[split];

  if (after.startsWith("[")) {
    const inside = d.code.split("$getUserVar[")[1].split("]")[0];
    if (!inside) {
      d.isError = true;
      return d.error(
        `❌ WhatscodeError: Usage: $getUserVar[name;group jid (optional if you in groups);user jid (optional)]!`
      );
    }

    const [name, groupJid = d.msg.key.remoteJid.endsWith("@g.us")? decodeJid(d.msg.key.remoteJid) : undefined, jid = decodeJid(sender(d))] = inside.split(";");

    if (!name || !groupJid) {
      d.isError = true;
      return d.error(
        `❌ WhatscodeError: Usage: $getUserVar[name;group jid (optional if you in groups);user jid (optional)]!`
      );
    }

    if (!d.db.has(name)) {
      d.isError = true;
      return d.error(`❌ WhatscodeError: variable ${name} not found!`);
    }

    return d.db.has(`${name}_${groupJid}_${jid}`) === false ? d.db.get(name) : d.db.get(`${name}_${groupJid}_${jid}`);

  } else {
    d.isError = true;
    return d.error(
      `❌ WhatscodeError: Usage: $getUserVar[name;group jid (optional if you in groups);user jid (optional)]!`
    );
  }
};
