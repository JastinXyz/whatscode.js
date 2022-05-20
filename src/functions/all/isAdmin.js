module.exports = async (d) => {
  const inside = d.inside;
  const { decodeJid } = require("../../models/functions.js");
  const botid = await decodeJid(d.client.user.id)

  const isGroup = d.msg.key.remoteJid.endsWith("@g.us");
  const groupMetadata = isGroup
    ? await d.client.groupMetadata(d.msg.key.remoteJid).catch((e) => {})
    : "";
  const participants = isGroup ? await groupMetadata.participants : "";

  let admins = [];
  for (let i of participants) {
    i.admin === "superadmin"
      ? admins.push(i.id)
      : i.admin === "admin"
      ? admins.push(i.id)
      : "";
  }

  return inside == ""
    ? admins.includes(botid)
    : admins.includes(inside);
};
