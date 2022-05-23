module.exports = async (d) => {
  const inside = d.inside;
  const { decodeJid, sender } = require("../../models/functions.js");
  if(!inside) {
    d.isError = true;
    d.error('❌ WhatscodeError: Usage: $kick[id]')
  } else {
    const [...num] = inside.split(";");
    const s = await decodeJid(sender(d));

    try {
      await d.client.groupParticipantsUpdate(
        d.msg.key.remoteJid,
        inside == "" ? s : num,
        "remove"
      );
    } catch (err) {
      d.isError = true;
      return d.error("❌ WhatscodeError: Failed to kick " + inside == "" ? s : num.join(", "));
    }

    return "";
  }
};
