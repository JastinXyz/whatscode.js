module.exports = async (d) => {
  const { decodeJid } = require("../../models/functions.js");
  const inside = d.inside;

  var re =
    inside == ""
      ? await d.client.fetchStatus(await decodeJid(d.client.user.id))
      : await d.client.fetchStatus(inside);
  return re.status;
};
