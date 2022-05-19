module.exports = async (d) => {
  const { decodeJid, sender } = require('../../models/functions.js')

  const split = d.code.split("$promote").length - 1;
  const after = d.code.split("$promote")[split];

  if (after.startsWith("[")) {
    const inside = d.code.split("$promote[")[1].split("]")[0];
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
  } else {
    const s = await decodeJid(sender(d))
    await d.client.groupParticipantsUpdate(d.msg.key.remoteJid, [s], 'promote')
    return ""
  }
};
