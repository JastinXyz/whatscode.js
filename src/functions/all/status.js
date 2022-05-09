module.exports = async (d) => {
  const { decodeJid } = require('../../models/functions.js')

  const split = d.code.split("$status").length - 1;
  const after = d.code.split("$status")[split];

  if (after.startsWith("[")) {
    const inside = d.code.split("$status[")[1].split("]")[0];
    const r = await d.client.fetchStatus(inside);
    return r.status
  } else {
    const num = await decodeJid(d.client.user.id)
    const re = await d.client.fetchStatus(num);
    return re.status;
  }

  // const inside = d.code.split("$status[")[1].split("]")[0]
  // const r = await d.client.fetchStatus(inside)
  // return r.status
};
