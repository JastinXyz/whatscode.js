module.exports = async(d) => {
  const { decodeJid } = require('../../models/functions.js')

  const split = d.code.split("$unBlock").length - 1;
  const after = d.code.split("$unBlock")[split];
  const sender = d.msg.key.fromMe
    ? d.client.user.jid
    : d.msg.participant
    ? d.msg.participant
    : d.msg.key.participant
    ? d.msg.key.participant
    : d.msg.key.remoteJid;

  if (after.startsWith("[")) {
    const inside = d.code.split("$unBlock[")[1].split("]")[0];

    const a = await decodeJid(inside)
    await d.client.updateBlockStatus(a, "unblock")
    return ""
  } else {
    const num = await decodeJid(sender)
    await d.client.updateBlockStatus(num, "unblock")
    return ""
  }
};
