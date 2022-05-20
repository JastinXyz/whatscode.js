module.exports = async (d) => {
  const { decodeJid, sender } = require("../../models/functions.js");
  const inside = d.inside;
  return inside == "" ? await decodeJid(sender(d)) : await decodeJid(inside);
};
