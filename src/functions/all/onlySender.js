module.exports = async (d) => {
  const inside = d.inside;
  const { decodeJid, sender } = require("../../models/functions.js");
  if (!inside) {
    d.isError = true;
    return d.error(
      `❌ WhatscodeError: Usage: $onlySender[error (optional);123@s.whatsapp.net;...]!`
    );
  } else {
    const [
      error = "You can't use this command because only a few people can use it.",
      ...num
    ] = inside.split(";");

    const decoded = await decodeJid(sender(d));
    const c = num.includes(decoded);
    if (!c) {
      d.isError = true;

      return d.client.sendMessage(
        d.msg.key.remoteJid,
        { text: error },
        { quoted: d.msg }
      );
    } else {
      return "";
    }
  }
};
