module.exports = async (d) => {
  const inside = d.inside;
  const { decodeJid, sender } = require("../../models/functions.js");
  if(!inside) {
    d.isError = true;
    return d.error('❌ WhatscodeError: Usage: $add[jid]')
  } else {
    const [...num] = inside.split(";");
    const s = await decodeJid(sender(d));
    try {
      await d.client.groupParticipantsUpdate(
        d.msg.key.remoteJid,
        inside == "" ? s : num,
        "add"
      );
    } catch (err) {
      d.isError = true;
      return d.error("❌ WhatscodeError: Failed to add " + inside == "" ? s : num.join(", "));
    }
    return "";
  }
};
