module.exports = async (d) => {
  const { decodeJid } = require('../../models/functions.js')
  return await decodeJid(d.client.user.id);
};
