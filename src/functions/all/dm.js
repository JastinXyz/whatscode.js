module.exports = async (d) => {
  const inside = d.inside;
  const { decodeJid, sender } = require("../../models/functions.js");

  if (d.code.split("$dm").length >= 3) {
    d.isError = true;
    return d.error(`❌ Can't use more than one $dm!`);
  }

  d.jid(inside == ""? decodeJid(sender(d)) : decodeJid(inside))
  return ""
};
