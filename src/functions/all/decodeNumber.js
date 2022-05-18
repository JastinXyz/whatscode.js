module.exports = async(d) => {
  const { decodeJid } = require('../../models/functions.js')

  const split = d.code.split("$decodeNumber").length - 1;
  const after = d.code.split("$decodeNumber")[split];

  if (after.startsWith("[")) {
    const inside = d.code.split("$decodeNumber[")[1].split("]")[0];

    const res = await decodeJid(inside.includes('@s.whatsapp.net')? inside : inside + "@s.whatsapp.net")
    return res.includes("@s.whatsapp.net")? res.split("@s.whatsapp.net").join("") : res
  } else {
    return await decodeJid(d.msg.key.fromMe ? d.client.user.jid : d.msg.participant ? d.msg.participant : d.msg.key.participant ? d.msg.key.participant : d.msg.key.remoteJid).split("@s.whatsapp.net").join("")
  }
}
