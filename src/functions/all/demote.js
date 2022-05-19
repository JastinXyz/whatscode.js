module.exports = async (d) => {
  const { decodeJid, sender } = require('../../models/functions.js')

  const split = d.code.split("$demote").length - 1;
  const after = d.code.split("$demote")[split];

  if (after.startsWith("[")) {
    const inside = d.code.split("$demote[")[1].split("]")[0];
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
  } else {
    const s = await decodeJid(sender(d))
    await d.client.groupParticipantsUpdate(d.msg.key.remoteJid, [s], 'demote')
    return ""
  }
};
