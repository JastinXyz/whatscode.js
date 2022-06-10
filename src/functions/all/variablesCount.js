module.exports = async(d) => {
  return Object.keys(d.db.all()).length
};
