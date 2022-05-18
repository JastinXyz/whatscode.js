module.exports = async (d) => {
  return require('../../models/functions.js').sender(d).split("@s.whatsapp.net").join("")
};
