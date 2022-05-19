module.exports = async(d) => {
  const { decodeJid, sender } = require('../../models/functions.js')
  const inside = d.inside;
  if(inside == "") {
    return await decodeJid(sender(d))
  } else {
    return await decodeJid(inside)
  }
};
