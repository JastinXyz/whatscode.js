module.exports = async (d) => {
  const bool = [true, false]
  return bool[Math.floor(Math.random() * bool.length)];
};
