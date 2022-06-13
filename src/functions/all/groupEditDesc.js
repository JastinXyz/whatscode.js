module.exports = async(d) => {
  const inside = d.inside;
  const { decodeJid } = require("../../models/functions");
  if(!inside) {
    d.isError = true;
    return d.error(`❌ WhatscodeError: Usage: $groupEditDesc[new desc;group jid (optional)]!`);
  } else {
    const [n, i = decodeJid(d.msg.key.remoteJid)] = inside.split(";");
    try {
      await d.client.groupUpdateDescription(i, n)
    } catch(err) {
      d.isError = true;
      return d.error('❌ Failed to edit group desc')
    }
    return ""
  }
};
