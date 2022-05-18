module.exports = async (d) => {
  const { decodeJid, sender } = require('../../models/functions.js')

  const split = d.code.split("$kick").length - 1;
  const after = d.code.split("$kick")[split];

  if (after.startsWith("[")) {
    const inside = d.code.split("$kick[")[1].split("]")[0];
    const [...num] = inside.split(";")

    if(!num) {
      d.isError = true;
      d.error('❌ Usage: $kick[123@s.whatsapp.net;...]')
    }

    try {
      await d.client.groupParticipantsUpdate(d.msg.key.remoteJid, num, 'remove')
    } catch(err) {
      d.isError = true;
      d.error('❌ Failed to kick ' + num.join(", "))
    }

    return ""
  } else {
    const s = await decodeJid(sender(d))
    await d.client.groupParticipantsUpdate(d.msg.key.remoteJid, [s], 'remove')
    return ""
  }
};
