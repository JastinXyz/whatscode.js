module.exports = async (d) => {
  try {
    await d.client.groupLeave(d.msg.key.remoteJid);
  } catch (err) {
    d.isError = true;
    return d.error(`❌ [whatscode.js] | Something error on $botLeave: ${err}!`);
  }

  return "";
};
