module.exports = async (d) => {
  const { decodeJid } = require('../../models/functions.js')

  const split = d.code.split("$isAdmin").length - 1;
  const after = d.code.split("$isAdmin")[split];

  const isGroup = d.msg.key.remoteJid.endsWith("@g.us")
  const groupMetadata = isGroup ? await d.client.groupMetadata(d.msg.key.remoteJid).catch(e => {}) : ''
  const participants = isGroup ? await groupMetadata.participants : ''

    let admins = [];
    for (let i of participants) {
      i.admin === "superadmin"
        ? admins.push(i.id)
        : i.admin === "admin"
        ? admins.push(i.id)
        : "";
    }

  if (after.startsWith("[")) {
    const inside = d.code.split("$isAdmin[")[1].split("]")[0];

    return admins.includes(inside) || ""
  } else {
    return admins.includes(await decodeJid(d.client.user.id)) || ""
  }
};
