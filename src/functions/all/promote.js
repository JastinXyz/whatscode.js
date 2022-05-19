module.exports = async(d) => {
  const { decodeJid, sender } = require('../../models/functions.js')
  const inside = d.inside;
  if(inside == "") {
    const s = await decodeJid(sender(d))
    await d.client.groupParticipantsUpdate(d.msg.key.remoteJid, [s], 'promote')
    return ""
  } else {
    const [...num] = inside.split(";")

    if(!num) {
      d.isError = true;
      d.error('❌ Usage: $promote[123@s.whatsapp.net;...]')
    }

    try {
      await d.client.groupParticipantsUpdate(d.msg.key.remoteJid, num, 'promote')
    } catch(err) {
      d.isError = true;
      d.error('❌ Failed to promote ' + num.join(", "))
    }

    return ""
  }
};
