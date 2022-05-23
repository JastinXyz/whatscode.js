module.exports = async(d) => {
  const { decodeJid, sender } = require('../../models/functions.js')
  const inside = d.inside;
  if(!inside) {
    const s = await decodeJid(sender(d))
    await d.client.groupParticipantsUpdate(d.msg.key.remoteJid, [s], 'promote')
    return ""
  } else {
    const [...num] = inside.split(";")

    try {
      await d.client.groupParticipantsUpdate(d.msg.key.remoteJid, num, 'promote')
    } catch(err) {
      d.isError = true;
      return d.error('❌ Failed to promote ' + num.join(", "))
    }

    return ""
  }
};
