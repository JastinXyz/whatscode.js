module.exports = async (d) => {
  const { decodeJid } = require("../../models/functions.js");
  const inside = d.inside;

  var re =
    inside == ""
      ? await d.client.fetchStatus(await decodeJid(d.client.user.id))
      : await d.client.fetchStatus(inside);
  return re.status;

  // if (inside == "") {
  //   const num = await decodeJid(d.client.user.id)
  //   const re = await d.client.fetchStatus(num);
  //   return re.status;
  // } else {
  //   const r = await d.client.fetchStatus(inside);
  //   return r.status
  // }
};
