module.exports = async(d) => {
  return d.db.has(d.inside);
};
