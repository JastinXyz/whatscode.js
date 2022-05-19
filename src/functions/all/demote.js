module.exports = async(d) => {
  const { decodeJid, sender } = require('../../models/functions.js')
  const inside = d.inside;
  if(inside == "") {
    const s = await decodeJid(sender(d))
    await d.client.groupParticipantsUpdate(d.msg.key.remoteJid, [s], 'demote')
    return ""
  } else {
    const [...num] = inside.split(";")

    if(!num) {
      d.isError = true;
      d.error('❌ Usage: $demote[123@s.whatsapp.net;...]')
    }

    try {
      await d.client.groupParticipantsUpdate(d.msg.key.remoteJid, num, 'demote')
    } catch(err) {
      d.isError = true;
      d.error('❌ Failed to demote ' + num.join(", "))
    }

    return ""
  }
};
