module.exports = async (d) => {
  const inside = d.inside;
  const { decodeJid, sender } = require("../../models/functions.js");

  inside == ""
    ? await d.client.updateBlockStatus(decodeJid(sender(d)), "unblock")
    : await d.client.updateBlockStatus(decodeJid(inside), "unblock");
  return "";
};
