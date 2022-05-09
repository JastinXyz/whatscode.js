module.exports = async (d) => {
  return require('../../models/functions.js').runtime(process.uptime())
};
