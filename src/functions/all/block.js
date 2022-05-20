module.exports = async (d) => {
  const inside = d.inside;
  const { decodeJid, sender } = require("../../models/functions.js");

  inside == ""
    ? await d.client.updateBlockStatus(decodeJid(sender(d)), "block")
    : await d.client.updateBlockStatus(decodeJid(inside), "block");
  return "";
};
