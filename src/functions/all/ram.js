module.exports = async (d) => {
  return (process.memoryUsage().rss / 1024 / 1024).toFixed(2)
};
