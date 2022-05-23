module.exports = async(d) => {
  const { decodeJid, sender } = require('../../models/functions.js')
  const inside = d.inside;
  if(!inside) {
    return await decodeJid(sender(d)).split("@s.whatsapp.net").join("")
  } else {
    const res = await decodeJid(inside.includes('@s.whatsapp.net')? inside : inside + "@s.whatsapp.net")
    return res.includes("@s.whatsapp.net")? res.split("@s.whatsapp.net").join("") : res
  }
};
