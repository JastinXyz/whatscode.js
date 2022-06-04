module.exports = async(d) => {
  const inside = d.inside;
  const { decodeJid } = require("../../models/functions.js");
  const isGroup = d.msg.key.remoteJid.endsWith("@g.us");
  let [jid = decoded(d.msg.key.remoteJid), s = ", "] = inside.split(";");

  if(!inside || !jid) {
    jid = decodeJid(d.msg.key.remoteJid);
    s = ", "
  }

    if(isGroup) {
      const metadata = await d.client.groupMetadata(jid).catch((e) => {});
      const participants = await metadata.participants;
      let decoded = [];

      for (let i of participants) {
        decoded.push(decodeJid(i.id))
      }

      return decoded.join(s);
    } else {
      return [jid, decodeJid(d.client.user.id)].join(s)
    }
};
