module.exports = async (d) => {
  const a = d.msg.messageTimestamp * 1000
  const r = Date.now() - a;
  return r;
};
