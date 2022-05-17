module.exports = async (d) => {
  const { decodeJid, sender } = require("../../models/functions.js");
  const split = d.code.split("$dm").length - 1;
  const after = d.code.split("$dm")[split];

  if (d.code.split("$dm").length >= 3) {
    d.isError = true;
    return d.error(`❌ Can't use more than one $dm!`)
  }

  if (after.startsWith("[")) {
    var inside = d.code.split("$dm[")[1].split("]")[0];
    d.jid(decodeJid(inside))
    return ""
  } else {
    d.jid(decodeJid(sender(d)))
    return ""
  }
};
