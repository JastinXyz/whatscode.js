module.exports = async(d) => {
  const { decodeJid } = require('../../models/functions.js')

  const split = d.code.split("$block").length - 1;
  const after = d.code.split("$block")[split];
  const sender = d.msg.key.fromMe
    ? d.client.user.jid
    : d.msg.participant
    ? d.msg.participant
    : d.msg.key.participant
    ? d.msg.key.participant
    : d.msg.key.remoteJid;

  if (after.startsWith("[")) {
    const inside = d.code.split("$block[")[1].split("]")[0];

    const a = await decodeJid(inside)
    await d.client.updateBlockStatus(a, "block")
    return ""
  } else {
    const num = await decodeJid(sender)
    await d.client.updateBlockStatus(num, "block")
    return ""
  }
};
