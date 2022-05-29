module.exports = async(d) => {
  const start = Date.now();
  await d.db.all();
  return Date.now() - start;
};
