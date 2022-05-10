module.exports = async(d) => {
  const { decodeJid } = require('../../models/functions.js')

  const split = d.code.split("$decodeJid").length - 1;
  const after = d.code.split("$decodeJid")[split];

  if (after.startsWith("[")) {
    const inside = d.code.split("$decodeJid[")[1].split("]")[0];

    return await decodeJid(inside)
  } else {
    return await decodeJid(d.msg.key.fromMe ? d.client.user.jid : d.msg.participant ? d.msg.participant : d.msg.key.participant ? d.msg.key.participant : d.msg.key.remoteJid)
  }
}
