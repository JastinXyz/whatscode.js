module.exports = async (d) => {
  let inside = d.inside;
  let { bytesToSize } = require("../../models/functions");

  return inside? inside === "usage"? bytesToSize(process.memoryUsage().rss) : bytesToSize(require('os').totalmem()) : bytesToSize(process.memoryUsage().rss)
};
