module.exports = async (d) => {
  const inside = d.inside;
  const { decodeJid, sender } = require("../../models/functions.js");
  var n = inside == "" ? decodeJid(sender(d)) : decodeJid(inside)

  try {
    var pp = await d.client.profilePictureUrl(
      n,
      "image"
    );
  } catch (err) {
    pp = ""
  }

  return pp.trim() === "" ? "https://imgdb.jstnlt.my.id/img/profile.png" : pp;
};
