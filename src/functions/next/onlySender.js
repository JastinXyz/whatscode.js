module.exports = async (d) => {
  const { decodeJid } = require('../../models/functions.js')
  const inside = d.code.split("$onlySender[")[1].split("]")[0];
  const [error = "You can't use this command because only a few people can use it.", ...num] = inside.split(
    ";"
  );

  console.log("num: " + num)

  if (!num) return d.client.sendMessage(
      d.msg.key.remoteJid,
      { text: `\`\`\`❌ [whatscode.js] | Usage: $onlySender[error (optional);123@s.whatsapp.net]!\`\`\`` },
      { quoted: d.msg }
    );

  const decoded = await decodeJid(d.msg.key.fromMe ? d.client.user.jid : d.msg.participant ? d.msg.participant : d.msg.key.participant ? d.msg.key.participant : d.msg.key.remoteJid)
  console.log("decoded: " + decoded)
  const c = num.includes(decoded)
console.log("check: " + c)
  if(!c) {
    // return {
    //   error: true,
    //   text: error
    // }
    return d.client.sendMessage(
      d.msg.key.remoteJid,
      { text: error },
      { quoted: d.msg }
    )
  } else {
    return ""
  }
};
